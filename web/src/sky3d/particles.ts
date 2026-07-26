/**
 * sky3d/particles.ts：一次性粒子特效（寻星令「加厚」阶段的 3D 反馈层）。
 *
 * 由 SkyApp.spawnBurst / spawnMeteors 转发创建，实例统一挂在 skyRoot 下
 * （随天球刚体旋转），每帧在渲染循环里 update(dt)——dt 已被 setTimeScale
 * 缩放，慢镜下粒子同步变慢。
 *
 *   - createBurst：星点爆发（答对反馈）。金色加色 THREE.Points 一次性喷溅：
 *     初速 = 球面法向分量（0.55~1.0 × speed）+ 随机切向分量（≤0.7 × speed）；
 *     速度按 exp(-0.9·dt) 指数阻尼衰减（契约「0.9 重力衰减」）；
 *     透明度 1.2s 线性衰减到 0 后自动 dispose。
 *   - createMeteor：流星（星雨氛围）。从球壳随机方向出发沿大圆斜掠：
 *     Line 长尾（24 段顶点色由头到尾衰减到黑——加色混合下即透明）+
 *     头部亮点；寿命 1~1.5s，批内个体有 ≤0.35s 错落入场延迟，消散自清理。
 *
 * 生命周期约定（ParticleEffect）：update(dt) 返回 false 表示寿命结束——
 * 此刻实例已自行 dispose（含 removeFromParent），调用方丢弃引用即可；
 * 提前销毁（章节退场等）直接调 dispose()，幂等。
 *
 * 纯函数（burstAlpha / burstDamp / meteorFade / greatCirclePoint）导出供单测。
 */
import * as THREE from "three";

/** 一次性粒子特效句柄（SkyApp 特效表元素） */
export interface ParticleEffect {
  /** 场景对象（由调用方 add 到 skyRoot） */
  readonly object: THREE.Object3D;
  /** 推进 dt 秒；返回 false = 寿命结束（内部已 dispose 并 removeFromParent） */
  update(dt: number): boolean;
  /** 提前销毁（幂等；寿命正常结束时也会内部调用） */
  dispose(): void;
}

// ---------------------------------------------------------------- 星点爆发

/** 爆发寿命（秒）：透明度线性 1→0，到点自动 dispose */
export const BURST_LIFE_S = 1.2;
/** 默认粒子数 */
export const BURST_COUNT = 90;
/** 速度阻尼系数（1/秒）：v *= exp(-BURST_DRAG·dt) —— 契约「0.9 重力衰减」 */
export const BURST_DRAG = 0.9;
/** 默认初速（世界单位/秒；天球半径 100 下喷溅张角约 4°/s） */
export const BURST_SPEED = 7;
/** 切向速度上限（相对初速比例）：方向散开但不压过法向主轴 */
const BURST_TANGENT_MAX = 0.7;
/** 法向速度下界（相对初速比例）：全部向外，快慢有别 */
const BURST_NORMAL_MIN = 0.55;
/** 点径（世界单位，sizeAttenuation 随距离透视；R=100 处约 10px） */
const BURST_POINT_SIZE = 1.5;

export interface BurstOptions {
  /** 粒子数（默认 BURST_COUNT=90，至少 1） */
  count?: number;
  /** 初速基准（世界单位/秒，默认 BURST_SPEED=7） */
  speed?: number;
  /** 随机源（测试注入确定性序列；默认 Math.random） */
  rand?: () => number;
}

/** 爆发透明度：t∈[0, BURST_LIFE_S] 线性 1→0（越界钳制） */
export function burstAlpha(t: number): number {
  return THREE.MathUtils.clamp(1 - t / BURST_LIFE_S, 0, 1);
}

/** 速度阻尼因子：v(t+dt) = v(t)·burstDamp(dt)（「0.9 重力衰减」的指数形式） */
export function burstDamp(dt: number): number {
  return Math.exp(-BURST_DRAG * dt);
}

const UP = new THREE.Vector3(0, 1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);

/** 软点纹理（程序生成径向渐变，无外部素材）；无 DOM 环境（单测）回退 null */
let sparkTex: THREE.CanvasTexture | null | undefined;
function getSparkTexture(): THREE.CanvasTexture | null {
  if (sparkTex !== undefined) return sparkTex;
  if (typeof document === "undefined") return (sparkTex = null);
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255, 252, 244, 1)");
  grad.addColorStop(0.35, "rgba(255, 240, 205, 0.85)");
  grad.addColorStop(1, "rgba(255, 240, 205, 0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return (sparkTex = new THREE.CanvasTexture(c));
}

/**
 * 在 p（天球面星点，skyRoot 局部坐标）处创建一次性金色爆发。
 * 初速沿球面法向（normalize(p)）+ 切平面随机分量；切向取法由法向与
 * 世界轴叉积构建正交基（法向贴近 +Y 时换 X 轴防退化）。
 */
export function createBurst(
  p: { x: number; y: number; z: number },
  opts: BurstOptions = {},
): ParticleEffect {
  const count = Math.max(1, Math.floor(opts.count ?? BURST_COUNT));
  const speed = opts.speed ?? BURST_SPEED;
  const rand = opts.rand ?? Math.random;

  const n = new THREE.Vector3(p.x, p.y, p.z);
  if (n.lengthSq() < 1e-8) n.set(0, 1, 0); // 原点兜底：法向任取
  n.normalize();
  const t1 = new THREE.Vector3().crossVectors(n, Math.abs(n.y) < 0.99 ? UP : X_AXIS).normalize();
  const t2 = new THREE.Vector3().crossVectors(n, t1);

  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    const vn = speed * (BURST_NORMAL_MIN + (1 - BURST_NORMAL_MIN) * rand());
    const vt = speed * BURST_TANGENT_MAX * rand();
    const a = rand() * Math.PI * 2;
    const ca = Math.cos(a) * vt;
    const sa = Math.sin(a) * vt;
    velocities[i * 3] = n.x * vn + t1.x * ca + t2.x * sa;
    velocities[i * 3 + 1] = n.y * vn + t1.y * ca + t2.y * sa;
    velocities[i * 3 + 2] = n.z * vn + t1.z * ca + t2.z * sa;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
  const mat = new THREE.PointsMaterial({
    size: BURST_POINT_SIZE,
    sizeAttenuation: true,
    map: getSparkTexture() ?? null,
    color: 0xffe9b8, // 暖米金（additive 下叠亮）
    transparent: true,
    opacity: 1,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.name = "burst";

  let t = 0;
  let dead = false;
  const effect: ParticleEffect = {
    object: points,
    update(dt) {
      if (dead) return false;
      t += dt;
      if (t >= BURST_LIFE_S) {
        effect.dispose();
        return false;
      }
      const damp = burstDamp(dt);
      for (let i = 0; i < velocities.length; i++) {
        velocities[i] *= damp;
        positions[i] += velocities[i] * dt;
      }
      posAttr.needsUpdate = true;
      mat.opacity = burstAlpha(t);
      return true;
    },
    dispose() {
      if (dead) return;
      dead = true;
      points.removeFromParent();
      geo.dispose();
      mat.dispose();
    },
  };
  return effect;
}

// ---------------------------------------------------------------- 流星

/** 流星寿命区间（秒）：契约「1~1.5s」 */
export const METEOR_LIFE_MIN_S = 1.0;
export const METEOR_LIFE_MAX_S = 1.5;
/** 掠过弧长区间（弧度，约 34°~66°） */
const METEOR_ARC_MIN = 0.6;
const METEOR_ARC_MAX = 1.15;
/** 长尾角长度（弧度，约 12°）：尾端顶点色衰减到 0（加色混合下即透明） */
const METEOR_TAIL_LEN = 0.21;
/** 尾部分段数（Line 顶点数 = 分段 + 1，逐段顶点色渐隐） */
const METEOR_TAIL_SEGS = 24;
/** 批内个体入场延迟上限（秒）：错落起飞如阵雨，不成排齐发 */
const METEOR_DELAY_MAX = 0.35;
/** 头部亮点点径（世界单位） */
const METEOR_HEAD_SIZE = 1.8;

/** 流星亮度包络：u∈[0,1] → 快入缓出 0→1→0（沿用旧站 2D 流星波形） */
export function meteorFade(u: number): number {
  return Math.sin(Math.PI * Math.min(1, Math.max(0, u) * 1.15));
}

/** 大圆插值：p(θ) = a·cosθ + t·sinθ（a⊥t 皆单位矢量），写入 out 并返回 */
export function greatCirclePoint(
  a: THREE.Vector3,
  t: THREE.Vector3,
  theta: number,
  out: THREE.Vector3,
): THREE.Vector3 {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return out.set(a.x * c + t.x * s, a.y * c + t.y * s, a.z * c + t.z * s);
}

/** 均匀随机单位矢量（球面均匀分布：y = 2r-1，方位角 2πr） */
function randomUnitVector(rand: () => number, out: THREE.Vector3): THREE.Vector3 {
  const y = rand() * 2 - 1;
  const phi = rand() * Math.PI * 2;
  const s = Math.sqrt(Math.max(0, 1 - y * y));
  return out.set(s * Math.cos(phi), y, s * Math.sin(phi));
}

/**
 * 创建一颗流星：起点为天球壳（半径 shellR）上的随机方向，沿随机大圆
 * 斜掠 METEOR_ARC_MIN~MAX 弧度——从观者视角即「从随机边缘掠入」。
 * shellR 建议略小于星面（如 0.97R），避免与星点 z-fight。
 */
export function createMeteor(
  shellR: number,
  opts: { rand?: () => number } = {},
): ParticleEffect {
  const rand = opts.rand ?? Math.random;

  const a = randomUnitVector(rand, new THREE.Vector3());
  const w = randomUnitVector(rand, new THREE.Vector3());
  // 行进方向：随机矢量去掉法向分量；与 a 几乎平行时换正交基兜底
  const dir = w.addScaledVector(a, -w.dot(a));
  if (dir.lengthSq() < 1e-6) dir.crossVectors(a, Math.abs(a.y) < 0.99 ? UP : X_AXIS);
  dir.normalize();

  const arc = METEOR_ARC_MIN + (METEOR_ARC_MAX - METEOR_ARC_MIN) * rand();
  const life = METEOR_LIFE_MIN_S + (METEOR_LIFE_MAX_S - METEOR_LIFE_MIN_S) * rand();
  const delay = METEOR_DELAY_MAX * rand();

  // 长尾：SEGS+1 个顶点沿大圆排在头部之后，顶点色由头到尾衰减到黑
  const linePositions = new Float32Array((METEOR_TAIL_SEGS + 1) * 3);
  const lineColors = new Float32Array((METEOR_TAIL_SEGS + 1) * 3);
  for (let k = 0; k <= METEOR_TAIL_SEGS; k++) {
    const f = Math.pow(1 - k / METEOR_TAIL_SEGS, 0.75); // 头部最亮，尾部趋黑
    lineColors[k * 3] = f;
    lineColors[k * 3 + 1] = f * 0.92;
    lineColors[k * 3 + 2] = f * 0.72; // 暖金色调
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
  const linePosAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
  const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const line = new THREE.Line(lineGeo, lineMat);

  const headGeo = new THREE.BufferGeometry();
  headGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
  const headPosAttr = headGeo.getAttribute("position") as THREE.BufferAttribute;
  const headMat = new THREE.PointsMaterial({
    size: METEOR_HEAD_SIZE,
    sizeAttenuation: true,
    map: getSparkTexture() ?? null,
    color: 0xfff3d6,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const head = new THREE.Points(headGeo, headMat);

  const group = new THREE.Group();
  group.name = "meteor";
  group.add(line);
  group.add(head);
  group.visible = false; // 入场延迟期间不可见

  let t = 0;
  let dead = false;
  const tmp = new THREE.Vector3();
  const effect: ParticleEffect = {
    object: group,
    update(dt) {
      if (dead) return false;
      t += dt;
      const u = (t - delay) / life;
      if (u >= 1) {
        effect.dispose();
        return false;
      }
      if (u < 0) return true; // 入场延迟中
      group.visible = true;
      const fade = meteorFade(u);
      const theta = arc * u;
      for (let k = 0; k <= METEOR_TAIL_SEGS; k++) {
        const phi = Math.max(0, theta - METEOR_TAIL_LEN * (k / METEOR_TAIL_SEGS));
        greatCirclePoint(a, dir, phi, tmp).multiplyScalar(shellR);
        linePositions[k * 3] = tmp.x;
        linePositions[k * 3 + 1] = tmp.y;
        linePositions[k * 3 + 2] = tmp.z;
      }
      linePosAttr.needsUpdate = true;
      lineMat.opacity = fade * 0.9;
      greatCirclePoint(a, dir, theta, tmp).multiplyScalar(shellR);
      headPosAttr.setXYZ(0, tmp.x, tmp.y, tmp.z);
      headPosAttr.needsUpdate = true;
      headMat.opacity = fade;
      return true;
    },
    dispose() {
      if (dead) return;
      dead = true;
      group.removeFromParent();
      lineGeo.dispose();
      lineMat.dispose();
      headGeo.dispose();
      headMat.dispose();
    },
  };
  return effect;
}
