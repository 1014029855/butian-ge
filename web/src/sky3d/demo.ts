/**
 * POC 入口：滚动驱动相机从天球内部穿出球外。
 *
 * 相机曲线（t = 滚动进度 0→1，经 lerp 阻尼平滑）：
 *   半径 r(t) = max(0.5, 3R · t^1.6) —— t≈0.5 时 r≈R，恰好穿出球面；t=1 时 r=3R。
 *   方向 dir(t)：从北天极 +Y 逐渐倾斜到 (0.28, 0.92, 0.26)，避免与 up 向量退化。
 *   FOV：78°（球内沉浸广角）→ 50°（球外收拢），随 t 平滑过渡。
 *   滚动只驱动「位置 + FOV」，绝不插值/重置视线方向。
 *
 * 朝向状态流（完全自由视角，脚本不锁北极）：
 *   朝向的唯一所有者是用户，两份状态互不干扰，脚本只读不写：
 *     gazeYaw / gazePitch —— 球内环视（持久弧度，YXZ 欧拉：先世界 Y 偏航、再本地 X 俯仰，
 *       无滚转、±89° 钳制防翻转）；初始对准北天极附近（ra=0, dec=80°）仅是开场构图。
 *     orbitQ —— 球外绕球轨道四元数。
 *   显示朝向按半径分三段（blendK = smoothstep(r, 0.8R, 1.2R)，每帧由 updateCamera 刷新）：
 *     球内 k=0      ：显示朝向 = gazeQ（用户视线原样呈现）。
 *     过渡 0<k<1    ：显示朝向 = slerp(用户当前视线, 望向球心的朝向, k)，平滑让位；
 *                     拖拽输入按 (1-k)/k 加权分别写入环视/轨道状态，不会打架或跳变。
 *     球外 k=1      ：显示朝向 = 望向球心（由相机位置与 +Y 即时 lookAt 构建），拖拽驱动轨道。
 *   滚回球内时 gazeYaw/gazePitch 原封不动，用户之前的视角原样恢复。
 * 拖拽统一「抓天」约定：内容跟随光标（往左拖，星空往左移），球内环视与球外轨道一致。
 * 渲染循环每帧推进星点闪烁时钟（uTime）；临时用滚动进度 t 顺序点亮星官组，
 * 验证连线的按组生长动画（后续由章节叙事系统接管 setGroupProgress）。
 *
 * P1 集成：
 *   - post.ts 后处理（半分辨率 UnrealBloom）替代直接 renderer.render；
 *   - quality.ts 三档画质自适应（DPR / bloom 强度），DPR 变化联动 pipeline.setSize
 *     与星点 shader 的 uPixelRatio；
 *   - Labels.ts 星官名标签：相机 r < 1.2R 时显示（[R, 1.2R] 区间渐隐），球外隐藏；
 *   - hitTest.ts + detailCard.ts：球内点击（位移 < 5px）拾取星点 → 所属星官详情卡；
 *   - 视觉调优：球外由 uDistBoost 放大提亮星点、经纬网格球随 r 微提亮、bloom 参数
 *     调到亮星有辉光而连线（亮度低于 threshold）不糊。
 */
import * as THREE from "three";
import { radecToVec3 } from "./coords";
import { dataUrl } from "./dataUrl";
import {
  loadStarField,
  distBoost,
  buildHipToAsterismMap,
  type StarField,
} from "./StarField";
import type { AsterismRec } from "./ConstellationLines";
import { createPostPipeline } from "./post";
import { createQualityMonitor, type QualityTier } from "./quality";
import { createLabels, type LabelsHandle } from "./Labels";
import { pickStar } from "./hitTest";
import { createDetailCard } from "./detailCard";

const R = 100; // 天球半径
const FAR_R = 3 * R; // 球外终点距离

/** bloom 调优终值（tier0 全量；tier1 半强度；tier2 由 setEnabled 关闭） */
const BLOOM = { strength: 0.9, radius: 0.55, threshold: 0.5 } as const;
/** 标签可见的相机半径上限：r ∈ [R, 1.2R] 渐隐，之外隐藏 */
const LABEL_FADE_OUT_R = 1.2 * R;
/** 点击判定：pointerdown/up 间位移小于该像素数才算点击（区分拖拽） */
const CLICK_SLOP_PX = 5;

/** demo 侧只用 stars.json 的这几个字段（拾取索引 ↔ 星名/HIP 查询） */
interface DemoStarRec {
  hip: number;
  ra: number;
  dec: number;
  name: string | null;
}

const canvas = document.getElementById("sky-canvas") as HTMLCanvasElement;
const phaseEl = document.getElementById("phase") as HTMLDivElement;
const loadingEl = document.getElementById("loading") as HTMLDivElement;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // 透明，透出页面墨蓝渐变底色

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(78, 1, 0.1, 2000);

// ---------- 后处理管线 ----------
const pipeline = createPostPipeline(renderer, scene, camera, BLOOM);

// ---------- 画质自适应 ----------
// 档位语义：0 = DPR≤2 + bloom 全开；1 = DPR≤1.5 + bloom 半强度；2 = DPR 1 + bloom 关
function tierDpr(tier: QualityTier): number {
  const cap = tier === 0 ? 2 : tier === 1 ? 1.5 : 1;
  return Math.min(window.devicePixelRatio || 1, cap);
}

const quality = createQualityMonitor((tier) => {
  pipeline.setEnabled(tier < 2);
  pipeline.setBloom({ strength: tier === 0 ? BLOOM.strength : BLOOM.strength * 0.5 });
  resize(); // DPR cap 变了：重设 pixelRatio，并同步 pipeline 与星点 uPixelRatio
});

let sky: StarField | null = null;
let labels: LabelsHandle | null = null;
let labelsShown = false;
// 拾取数据（星空加载完成后就绪）：starPositions 与 starList 同下标
let starPositions: Float32Array | null = null;
let starList: DemoStarRec[] = [];
let nameByHip = new Map<number, string | null>();
let hipToAsterism = new Map<number, AsterismRec>();

// CSS2D 标签层容器：fixed 铺满视口（body 高 400vh，不能直接当容器，否则标签层随滚动跑偏）
const labelLayerEl = document.createElement("div");
labelLayerEl.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:5;";
document.body.appendChild(labelLayerEl);

// 星官详情卡（position: fixed，挂在 body 下不受滚动影响）
const card = createDetailCard(document.body);

// ---------- 滚动进度（带阻尼） ----------
function scrollTarget(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
}
let t = scrollTarget(); // 平滑后的进度

// ---------- 拖拽状态 ----------
// 朝向状态完全归用户所有（脚本在任何滚动位置都不改写这两份状态，只读取）：
//   gazeYaw / gazePitch —— 球内环视，持久弧度。YXZ 欧拉：先绕世界 +Y 偏航、再绕本地 X 俯仰，
//     无滚转。初始对准北天极附近（ra=0°, dec=80°，yaw=-90°/pitch=80°），仅是开场构图，
//     用户一旦拖动就是他自己的视角。
//   orbitQ —— 球外绕球轨道四元数。
let gazeYaw = -Math.PI / 2;
let gazePitch = (80 * Math.PI) / 180;
/** 环视灵敏度（弧度/像素），与旧版一致约 0.12°/px */
const GAZE_RAD_PER_PX = (0.12 * Math.PI) / 180;
/** 俯仰钳制 ±89°，防翻转 */
const GAZE_PITCH_LIMIT = (89 * Math.PI) / 180;
const orbitQ = new THREE.Quaternion();
/** 过渡混合因子：0=球内（显示用户视线），1=球外（望向球心）。
 *  每帧由 updateCamera 按相机半径刷新；拖拽据此在环视/轨道间加权让位。 */
let blendK = 0;
let dragging = false;
let lastX = 0;
let lastY = 0;
let downX = 0;
let downY = 0;

canvas.addEventListener("pointerdown", (e) => {
  dragging = true;
  lastX = downX = e.clientX;
  lastY = downY = e.clientY;
  canvas.setPointerCapture(e.pointerId);
  canvas.classList.add("dragging");
});
canvas.addEventListener("pointerup", (e) => {
  dragging = false;
  canvas.releasePointerCapture(e.pointerId);
  canvas.classList.remove("dragging");
  // 位移足够小视为点击而非拖拽：球内做星点拾取
  if (Math.hypot(e.clientX - downX, e.clientY - downY) < CLICK_SLOP_PX) {
    handleClick(e.clientX, e.clientY);
  }
});
canvas.addEventListener("pointercancel", () => {
  dragging = false;
  canvas.classList.remove("dragging");
});
canvas.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  // 「抓天」约定：内容跟随光标（往左拖，星空往左移），球内环视与球外轨道手感一致。
  // 过渡区按 blendK 加权让位：k=0 纯环视、k=1 纯轨道，中间两份输入各乘权重写入
  // 各自独立的状态，因此不会打架，也不会在模式切换处跳变。
  if (blendK < 1) {
    const w = 1 - blendK;
    gazeYaw += dx * GAZE_RAD_PER_PX * w;
    gazePitch += dy * GAZE_RAD_PER_PX * w;
    gazePitch = THREE.MathUtils.clamp(gazePitch, -GAZE_PITCH_LIMIT, GAZE_PITCH_LIMIT);
  }
  if (blendK > 0) {
    // 球外：绕原点轨道旋转
    const odx = dx * blendK * 0.005;
    const ody = dy * blendK * 0.005;
    const posDir = camera.position.clone().normalize();
    const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -odx);
    const pitchAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), posDir).normalize();
    const qPitch = new THREE.Quaternion().setFromAxisAngle(pitchAxis, ody);
    const candidate = qYaw.clone().multiply(qPitch).multiply(orbitQ);
    // 不允许轨道贴到极轴上（lookAt 的 up 会退化）
    const testDir = posDir.clone().applyQuaternion(qYaw).applyQuaternion(qPitch);
    if (Math.abs(testDir.y) < 0.985) {
      orbitQ.copy(candidate);
    } else {
      orbitQ.premultiply(qYaw);
    }
  }
});

// ---------- 点击拾取 ----------
function handleClick(clientX: number, clientY: number): void {
  if (!sky || !starPositions) return;
  // 仅球内模式启用拾取（球外星点过密，拾取无意义）
  if (camera.position.length() >= R) {
    card.hide();
    return;
  }
  const ndcX = (clientX / window.innerWidth) * 2 - 1;
  const ndcY = -(clientY / window.innerHeight) * 2 + 1;
  const hit = pickStar(ndcX, ndcY, camera, starPositions, {
    width: window.innerWidth,
    height: window.innerHeight,
  });
  if (!hit) {
    card.hide();
    return;
  }
  const star = starList[hit.index];
  const ast = hipToAsterism.get(star.hip);
  if (!ast) {
    card.hide(); // 不属于任何星官的散星
    return;
  }
  // 成员星列表由 detailCard 内部截断到 MAX_LISTED（8）颗
  card.show(
    {
      name: ast.name,
      starCount: ast.stars.length,
      stars: ast.stars.map((hip) => ({ name: nameByHip.get(hip) ?? null, hip })),
    },
    clientX,
    clientY,
  );
}

// ---------- 相机曲线 ----------
const UP = new THREE.Vector3(0, 1, 0);
const DIR_END = new THREE.Vector3(0.28, 0.92, 0.26).normalize(); // 终点方位：偏离极轴的 3/4 侧视
const ORIGIN = new THREE.Vector3(0, 0, 0);

/** 穿越过渡区：r ∈ [0.8R, 1.2R] 内从「用户自由视线」slerp 到「望向球心」 */
const TRANSITION_MIN_R = 0.8 * R;
const TRANSITION_MAX_R = 1.2 * R;

function smooth(x: number): number {
  x = THREE.MathUtils.clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
}

// updateCamera 每帧复用的临时对象（避免逐帧分配）
const gazeEuler = new THREE.Euler(0, 0, 0, "YXZ");
const gazeQ = new THREE.Quaternion(); // 由 gazeYaw/gazePitch 即时构建的用户视线
const centerLookQ = new THREE.Quaternion(); // 望向球心的轨道朝向
const centerLookMat = new THREE.Matrix4();

function updateCamera(tt: number): void {
  // 半径：t^1.6 让穿越点（r=R）落在 t≈0.5
  const radius = Math.max(0.5, FAR_R * Math.pow(tt, 1.6));
  // 方位：从 +Y 缓倾到 DIR_END
  const dir = UP.clone().lerp(DIR_END, smooth(tt)).normalize();
  const pos = dir.multiplyScalar(radius).applyQuaternion(orbitQ);
  camera.position.copy(pos);

  // 朝向状态流（滚动绝不改写 gazeYaw/gazePitch/orbitQ，此处只读取）：
  //   blendK=0 球内：显示朝向 = 用户自由视线 gazeQ；
  //   0<blendK<1 过渡区：slerp(用户当前视线, 望向球心, blendK)，平滑让位；
  //   blendK=1 球外：显示朝向 = 望向球心（由相机位置与 +Y 即时构建）。
  blendK = smooth((radius - TRANSITION_MIN_R) / (TRANSITION_MAX_R - TRANSITION_MIN_R));

  gazeEuler.set(gazePitch, gazeYaw, 0); // YXZ：先世界 Y 偏航，再本地 X 俯仰
  gazeQ.setFromEuler(gazeEuler);
  centerLookMat.lookAt(pos, ORIGIN, UP);
  centerLookQ.setFromRotationMatrix(centerLookMat);
  camera.quaternion.slerpQuaternions(gazeQ, centerLookQ, blendK);

  // 球内沉浸用广角，球外收拢看清球体
  camera.fov = THREE.MathUtils.lerp(78, 50, smooth((tt - 0.35) / 0.65));
  camera.updateProjectionMatrix();

  const phase = blendK <= 0 ? "球内 · 自由环视" : blendK < 1 ? "正在穿出天球面" : "球外 · 俯瞰天球";
  if (phaseEl.textContent !== phase) phaseEl.textContent = phase;
}

// ---------- 尺寸 ----------
function resize(): void {
  const dpr = tierDpr(quality.tier);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  pipeline.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (sky) sky.starMaterial.uniforms.uPixelRatio.value = dpr;
  if (labels) labels.renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize);
resize();

// ---------- 启动 ----------
const clock = new THREE.Clock();
let elapsed = 0; // 星点闪烁时钟（秒），星空加载完成后开始累计
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.1);
  quality.update(dt);
  // 阻尼趋近滚动目标
  t += (scrollTarget() - t) * (1 - Math.exp(-dt * 3.5));
  updateCamera(t);
  const camR = camera.position.length();
  if (sky) {
    elapsed += dt;
    sky.setTime(elapsed);
    // 临时验证：滚动进度 t 顺序点亮星官组（每组占 1/N 行程，组内生长由 shader 完成）
    const n = sky.lines.groupCount;
    const lit = t * n;
    for (let i = 0; i < n; i++) {
      sky.lines.setGroupProgress(i, THREE.MathUtils.clamp(lit - i, 0, 1));
    }
    // 视觉调优：球外放大提亮星点（r≤R 时恒为 1），经纬网格球随距离微提亮
    sky.starMaterial.uniforms.uDistBoost.value = distBoost(camR, R);
    sky.gridMaterial.opacity = 0.1 + 0.16 * THREE.MathUtils.clamp(camR / R - 1, 0, 1);
    // 滚出球外后收起详情卡
    if (camR >= R && !card.el.hidden) card.hide();
  }
  // 标签：球内显示，r∈[R,1.2R] 整体渐隐，之外隐藏（小球上标签只会糊成一团）
  if (labels) {
    const alpha = THREE.MathUtils.clamp((LABEL_FADE_OUT_R - camR) / (LABEL_FADE_OUT_R - R), 0, 1);
    const show = alpha > 0.01;
    if (show !== labelsShown) {
      labelsShown = show;
      labels.setVisible(show);
    }
    if (show) {
      labels.renderer.domElement.style.opacity = alpha.toFixed(3);
      labels.update(camera);
    }
  }
  pipeline.render();
  if (labels && labelsShown) labels.renderer.render(scene, camera);
});

Promise.all([
  loadStarField(R),
  fetch(dataUrl("data/stars.json")).then((r) => {
    if (!r.ok) throw new Error(`stars=${r.status}`);
    return r.json() as Promise<{ stars: DemoStarRec[] }>;
  }),
  fetch(dataUrl("data/asterisms.json")).then((r) => {
    if (!r.ok) throw new Error(`asterisms=${r.status}`);
    return r.json() as Promise<{ asterisms: AsterismRec[] }>;
  }),
])
  .then(([field, starsData, astData]) => {
    sky = field;
    field.starMaterial.uniforms.uPixelRatio.value = tierDpr(quality.tier);
    scene.add(field.group);

    // 标签与拾取共用一份星表：位置（R=100 天球面）、星名、hip→星官索引
    starList = starsData.stars;
    const pos = new Float32Array(starList.length * 3);
    const hipToVec3 = new Map<number, THREE.Vector3>();
    const names = new Map<number, string | null>();
    starList.forEach((s, i) => {
      const [x, y, z] = radecToVec3(s.ra, s.dec, R);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      hipToVec3.set(s.hip, new THREE.Vector3(x, y, z));
      names.set(s.hip, s.name);
    });
    starPositions = pos;
    nameByHip = names;
    hipToAsterism = buildHipToAsterismMap(astData.asterisms);

    labels = createLabels(labelLayerEl, astData.asterisms, hipToVec3);
    labels.renderer.setSize(window.innerWidth, window.innerHeight);
    labels.setVisible(false); // 首帧由渲染循环按相机半径决定显隐
    scene.add(labels.group);

    loadingEl.remove();
  })
  .catch((err: unknown) => {
    loadingEl.textContent = "星空数据加载失败，请检查开发服务器";
    console.error(err);
  });
