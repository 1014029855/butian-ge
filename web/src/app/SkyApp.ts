/**
 * SkyApp：正式站 3D 天球应用壳。
 *
 * 由 sky3d/demo.ts 的全部 POC 能力提炼为可复用类：
 *   renderer/scene/camera + post bloom + quality 三档 + StarField
 *   + ConstellationLines（按组生长点亮）+ Labels（CSS2D 星官名）
 *   + hitTest 点击拾取 + detailCard 详情卡 + 渲染循环 + resize。
 *
 * 相机权属约定（继承 demo.ts，不可破坏）：
 *   - gazeYaw / gazePitch（球内环视）与 orbitQ（球外轨道）永远归用户所有，
 *     脚本（CameraRig / 章节）只读不写；
 *   - 脚本注视通过 gazeBlend + gazeTargetQ 对用户视线做 slerp 让位，
 *     让位期间拖拽输入按 (1 - gazeBlend) 衰减，不回写用户状态；
 *   - 球内→球外过渡沿用 blendK = smoothstep(r, 0.8R, 1.2R) 的
 *     「用户视线 slerp 望向球心」机制，滚回球内用户视角原样恢复。
 *
 * 章节系统消费方式：
 *   - 每帧由 app 主循环调用 applyCameraState(rig.sampleGlobal(g))；
 *   - 章节模块用 setGroupProgress / setLabelsEnabled / setPickingEnabled /
 *     setBloom / onPick 等高层 API。
 */
import * as THREE from "three";
import { radecToVec3, precessionMat3 } from "../sky3d/coords";
import { dataUrl } from "../sky3d/dataUrl";
import {
  loadStarField,
  distBoost,
  buildHipToAsterismMap,
  type StarField,
} from "../sky3d/StarField";
import type { AsterismRec } from "../sky3d/ConstellationLines";
import { createPostPipeline, type BloomParams, type PostPipeline } from "../sky3d/post";
import { createQualityMonitor, type QualityMonitor, type QualityTier } from "../sky3d/quality";
import { createLabels, type LabelsHandle } from "../sky3d/Labels";
import { pickStar } from "../sky3d/hitTest";
import { createDetailCard, type DetailCardHandle, type DetailInfo } from "../sky3d/detailCard";
import { gazeQuat, type CameraState } from "./CameraRig";

/** 天球半径（世界单位） */
export const R = 100;

/** bloom 调优终值（tier0 全量；tier1 半强度；tier2 由 setEnabled 关闭）。
 *  P3 收敛：threshold 0.5→0.58、strength 0.9→0.78（ch2 亮星光球偏大反馈） */
const BLOOM = { strength: 0.78, radius: 0.55, threshold: 0.58 } as const;
/** 标签可见的相机半径上限：r ∈ [R, 1.2R] 渐隐，之外隐藏 */
const LABEL_FADE_OUT_R = 1.2 * R;
/** 点击判定：pointerdown/up 间位移小于该像素数才算点击（区分拖拽） */
const CLICK_SLOP_PX = 5;
/** 环视灵敏度（弧度/像素），约 0.2°/px（满权下 500px 拖拽 ≈ 100°，跟手不发飘） */
const GAZE_RAD_PER_PX = (0.2 * Math.PI) / 180;
/** 俯仰钳制 ±89°，防翻转 */
const GAZE_PITCH_LIMIT = (89 * Math.PI) / 180;
/** 穿越过渡区：r ∈ [0.8R, 1.2R] 内从「用户自由视线」slerp 到「望向球心」 */
const TRANSITION_MIN_R = 0.8 * R;
const TRANSITION_MAX_R = 1.2 * R;
/** 球外轨道惯性：松手后角速度按 2^(−t/半衰期) 指数衰减（秒） */
const ORBIT_INERTIA_HALFLIFE = 0.4;
/** 轨道惯性停止阈值（rad/s，低于则归零停住） */
const ORBIT_INERTIA_STOP = 0.05;
/** 松手前静默超过该毫秒数视为「按住不动」，不触发惯性 */
const ORBIT_INERTIA_HOLD_MS = 120;
/** 角速度 EMA 系数：每帧事件按 0.35 收敛，取最近若干帧的平滑速度 */
const ORBIT_INERTIA_EMA = 0.35;

const UP = new THREE.Vector3(0, 1, 0);
const ORIGIN = new THREE.Vector3(0, 0, 0);

function smooth(x: number): number {
  x = THREE.MathUtils.clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
}

/** 拾取回调负载：命中带星官信息，点空为 null（详情卡随之隐藏） */
export interface PickPayload {
  info: DetailInfo;
  x: number;
  y: number;
}
export type PickListener = (payload: PickPayload | null) => void;

/** 渲染循环钩子：每帧渲染前调用（app 在此阻尼并 applyCameraState） */
export type FrameHook = (dt: number) => void;

interface StarRec {
  hip: number;
  ra: number;
  dec: number;
  name: string | null;
}

/** poem.json 条目：星官名 → 《步天歌》引文与出处（data/build_poem.py 产物） */
interface PoemEntry {
  text: string;
  from: string;
}
type PoemMap = Record<string, PoemEntry>;

export class SkyApp {
  readonly canvas: HTMLCanvasElement;
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;

  private readonly pipeline: PostPipeline;
  private readonly quality: QualityMonitor;
  private readonly card: DetailCardHandle;
  private readonly labelLayerEl: HTMLDivElement;

  // ---- 悬停高亮（星图探索：鼠标经过显示星名） ----
  /** 悬停拾取状态：NDC 坐标 + 客户区像素（提示条定位用）；null = 未悬停 */
  private hoverNdc: { x: number; y: number; cx: number; cy: number } | null = null;
  /** 悬停高亮环（挂在 skyRoot，随天空刚体旋转；拾取坐标同为 skyRoot 局部系） */
  private readonly hoverRing: THREE.Sprite;
  /** 悬停星名提示条 */
  private readonly hoverTip: HTMLDivElement;

  private sky: StarField | null = null;
  private labels: LabelsHandle | null = null;
  private labelsShown = false;

  /**
   * 天空内容根：星点/连线/网格/标签/章节挂载的天体对象都归它管，
   * setSkyRotation 只旋转这一个 Group（岁差与季节都是整球刚体旋转）。
   * 注意：星点拾取基于未旋转坐标——旋转非零时章节不得开启拾取。
   */
  private readonly skyRoot = new THREE.Group();
  private readonly tmpSkyMat = new THREE.Matrix4();
  private readonly tmpSkyQ = new THREE.Quaternion();
  private readonly tmpSkyQY = new THREE.Quaternion();

  // 拾取数据（星空加载完成后就绪）：starPositions 与 starList 同下标
  private starPositions: Float32Array | null = null;
  private starList: StarRec[] = [];
  private nameByHip = new Map<number, string | null>();
  private hipToAsterism = new Map<number, AsterismRec>();
  private poem: PoemMap | null = null;
  private pickListeners = new Set<PickListener>();

  // ---- 用户拥有的朝向状态（脚本永不回写，见文件头约定） ----
  private gazeYaw = -Math.PI / 2;
  private gazePitch = (80 * Math.PI) / 180; // 开场构图：北天极附近
  private readonly orbitQ = new THREE.Quaternion();

  // ---- 脚本相机控制量（由 applyCameraState / 各 setter 写入，每帧消费） ----
  private ctlRadius = 1; // 世界单位
  private readonly ctlDir = new THREE.Vector3(0, 1, 0);
  private ctlFov = 78;
  private ctlGazeBlend = 0; // 0 = 用户自由环视，1 = 完全脚本注视
  private ctlGazeTargetQ: THREE.Quaternion | null = null;
  private ctlDrift = 0; // 弧度/秒
  private driftAngle = 0;
  private ctlOrbit = 0; // 球外轨道输入权重 0~1

  // ---- 开关 ----
  private pickingEnabled = false;
  private labelsEnabled = true;
  /** 悬停星名提示条开关（高亮环不受控——寻星游戏里只隐藏会泄题的文本） */
  private hoverTipEnabled = true;

  // ---- 拖拽状态 ----
  private blendK = 0; // 球内→球外过渡因子（每帧由半径刷新）
  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private downX = 0;
  private downY = 0;
  // 球外轨道惯性：odx/ody 参数空间的角速度 EMA（rad/s），松手后指数衰减
  private orbitVelX = 0;
  private orbitVelY = 0;
  private lastOrbitMoveT = 0; // 最近一次 orbit 分支 pointermove 的时间戳（ms）

  private readonly clock = new THREE.Clock();
  private elapsed = 0; // 星点闪烁时钟（秒），星空加载完成后开始累计
  private frameHook: FrameHook | null = null;
  private started = false;

  // updateCamera 每帧复用的临时对象（避免逐帧分配）
  private readonly gazeEuler = new THREE.Euler(0, 0, 0, "YXZ");
  private readonly gazeQ = new THREE.Quaternion();
  private readonly insideQ = new THREE.Quaternion();
  private readonly centerLookQ = new THREE.Quaternion();
  private readonly centerLookMat = new THREE.Matrix4();
  private readonly driftQ = new THREE.Quaternion();
  private readonly tmpPos = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0); // 透明，透出页面墨蓝渐变底色
    this.scene = new THREE.Scene();
    this.scene.add(this.skyRoot);
    this.camera = new THREE.PerspectiveCamera(78, 1, 0.1, 2000);

    this.pipeline = createPostPipeline(this.renderer, this.scene, this.camera, BLOOM);
    this.quality = createQualityMonitor((tier) => {
      this.pipeline.setEnabled(tier < 2);
      this.pipeline.setBloom({ strength: tier === 0 ? BLOOM.strength : BLOOM.strength * 0.5 });
      this.resize(); // DPR cap 变了：重设 pixelRatio，并同步 pipeline 与星点 uPixelRatio
    });

    // CSS2D 标签层容器：fixed 铺满视口，不随滚动跑偏
    this.labelLayerEl = document.createElement("div");
    this.labelLayerEl.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:5;";
    document.body.appendChild(this.labelLayerEl);

    // 星官详情卡（position: fixed，挂在 body 下不受滚动影响）
    this.card = createDetailCard(document.body);
    // 默认拾取行为：显示详情卡（章节可用 onPick 追加自己的逻辑）
    this.onPick((payload) => {
      if (payload) this.card.show(payload.info, payload.x, payload.y);
      else this.card.hide();
    });

    // 悬停高亮环：程序生成的金色圆环纹理（无外部素材）
    const ringCanvas = document.createElement("canvas");
    ringCanvas.width = ringCanvas.height = 64;
    const rc = ringCanvas.getContext("2d")!;
    rc.strokeStyle = "rgba(240, 205, 110, 0.95)";
    rc.lineWidth = 5;
    rc.shadowColor = "rgba(201, 162, 39, 0.9)";
    rc.shadowBlur = 8;
    rc.beginPath();
    rc.arc(32, 32, 24, 0, Math.PI * 2);
    rc.stroke();
    const ringTex = new THREE.CanvasTexture(ringCanvas);
    this.hoverRing = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: ringTex,
        transparent: true,
        depthTest: false, // 始终浮在星点之上，让目标星「能被看见」
        depthWrite: false,
      }),
    );
    this.hoverRing.renderOrder = 999;
    this.hoverRing.visible = false;
    this.skyRoot.add(this.hoverRing);

    // 悬停星名提示条（样式在 app.css 的 .sky-tooltip）
    this.hoverTip = document.createElement("div");
    this.hoverTip.className = "sky-tooltip";
    this.hoverTip.style.display = "none";
    document.body.appendChild(this.hoverTip);

    this.bindPointer();
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  // ---------------------------------------------------------------- 加载

  /** 拉取星表并建场景；完成后星空开始闪烁。失败时异常上抛给 app 入口。 */
  async init(): Promise<void> {
    const [field, starsData, astData, poemData] = await Promise.all([
      loadStarField(R),
      fetch(dataUrl("data/stars.json")).then((r) => {
        if (!r.ok) throw new Error(`stars=${r.status}`);
        return r.json() as Promise<{ stars: StarRec[] }>;
      }),
      fetch(dataUrl("data/asterisms.json")).then((r) => {
        if (!r.ok) throw new Error(`asterisms=${r.status}`);
        return r.json() as Promise<{ asterisms: AsterismRec[] }>;
      }),
      fetch(dataUrl("data/poem.json")).then((r) => {
        if (!r.ok) throw new Error(`poem=${r.status}`);
        return r.json() as Promise<PoemMap>;
      }),
    ]);

    this.sky = field;
    field.starMaterial.uniforms.uPixelRatio.value = this.tierDpr();
    this.skyRoot.add(field.group);

    // 标签与拾取共用一份星表：位置（R=100 天球面）、星名、hip→星官索引
    this.starList = starsData.stars;
    const pos = new Float32Array(this.starList.length * 3);
    const hipToVec3 = new Map<number, THREE.Vector3>();
    this.starList.forEach((s, i) => {
      const [x, y, z] = radecToVec3(s.ra, s.dec, R);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      hipToVec3.set(s.hip, new THREE.Vector3(x, y, z));
      this.nameByHip.set(s.hip, s.name);
    });
    this.starPositions = pos;
    this.hipToAsterism = buildHipToAsterismMap(astData.asterisms);
    this.poem = poemData;

    this.labels = createLabels(this.labelLayerEl, astData.asterisms, hipToVec3);
    this.labels.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labels.setVisible(false); // 首帧由渲染循环按相机半径决定显隐
    this.skyRoot.add(this.labels.group);
  }

  /** 启动渲染循环；hook 每帧渲染前调用（阻尼 + applyCameraState 的地方） */
  start(hook?: FrameHook): void {
    this.frameHook = hook ?? null;
    if (this.started) return;
    this.started = true;
    this.renderer.setAnimationLoop(this.frame);
  }

  // ---------------------------------------------------------------- 相机 API

  /** 设置相机半径（单位：R 倍数） */
  setRadius(r: number): void {
    this.ctlRadius = Math.max(0.5, r * R);
  }
  /** 设置相机位置方向（由天球中心指向相机，无需单位长） */
  setPositionDir(dir: readonly [number, number, number] | THREE.Vector3): void {
    if (dir instanceof THREE.Vector3) this.ctlDir.copy(dir);
    else this.ctlDir.set(dir[0], dir[1], dir[2]);
    if (this.ctlDir.lengthSq() < 1e-8) this.ctlDir.set(0, 1, 0);
    this.ctlDir.normalize();
  }
  setFov(f: number): void {
    this.ctlFov = THREE.MathUtils.clamp(f, 10, 140);
  }
  /**
   * gaze 模式：mode = "free" 用户拥有 / "target" 脚本注视 target（赤道坐标，度）。
   * 平滑让位由 gazeBlend 完成——请优先用 setGazeBlend / applyCameraState 渐变，
   * 直接切模式等价于把权重一步置 0/1（硬切，仅用于初始化）。
   */
  setGazeMode(mode: "free" | "target", target?: { ra: number; dec: number }): void {
    if (mode === "target") {
      const t = target ?? { ra: 0, dec: 80 };
      this.ctlGazeTargetQ = gazeQuat(t.ra, t.dec);
    }
    this.ctlGazeBlend = mode === "target" ? 1 : 0;
  }
  /** 脚本注视权重：0 = 用户自由环视，1 = 完全脚本注视（永不回写用户 gaze） */
  setGazeBlend(w: number, targetQ?: THREE.Quaternion | null): void {
    this.ctlGazeBlend = THREE.MathUtils.clamp(w, 0, 1);
    if (targetQ !== undefined) this.ctlGazeTargetQ = targetQ;
  }
  /** 绕世界 +Y 的漂移角速度（弧度/秒；只作用于显示朝向，不回写用户状态） */
  setDrift(radPerSec: number): void {
    this.ctlDrift = radPerSec;
  }
  /** 球外轨道（orbitQ）是否接受用户拖拽（可给 0~1 权重做过渡） */
  setOrbitEnabled(on: boolean | number): void {
    this.ctlOrbit = typeof on === "number" ? THREE.MathUtils.clamp(on, 0, 1) : on ? 1 : 0;
  }

  /** 每帧由 app 主循环调用：应用 CameraRig 插值结果（半径单位 R 倍数） */
  applyCameraState(s: CameraState): void {
    this.setRadius(s.radius);
    this.setPositionDir(s.dir);
    this.setFov(s.fov);
    this.setGazeBlend(s.gazeBlend, s.gazeTargetQ);
    this.setDrift(s.drift);
    this.setOrbitEnabled(s.orbit);
  }

  /** 当前相机到天球中心的距离（世界单位） */
  get cameraRadius(): number {
    return this.camera.position.length();
  }

  // ---------------------------------------------------------------- 天空 API

  /** 星官组生长进度：ref 为组序号、数据 id 或星官名；v∈[0,1] 自动钳制 */
  setGroupProgress(ref: string | number, v: number): void {
    if (!this.sky) return;
    const i = typeof ref === "number" ? ref : this.sky.lines.indexOf(ref);
    this.sky.lines.setGroupProgress(i, v);
  }
  /** 数据 id 或星官名 → 组序号；未找到返回 -1 */
  groupIndex(ref: string): number {
    return this.sky ? this.sky.lines.indexOf(ref) : -1;
  }
  /** 星官组总数（数据未加载完为 0） */
  get groupCount(): number {
    return this.sky ? this.sky.lines.groupCount : 0;
  }
  /** 星官名标签总开关（与相机半径自动渐隐相与） */
  setLabelsEnabled(on: boolean): void {
    this.labelsEnabled = on;
  }
  /** 悬停星名提示条开关（循诗寻星段关闭防泄题；高亮环保持可用） */
  setHoverTipEnabled(on: boolean): void {
    this.hoverTipEnabled = on;
  }
  /** 点击拾取开关（仅球内生效；星野漫游章进入时打开，离开时关闭） */
  setPickingEnabled(on: boolean): void {
    this.pickingEnabled = on;
    if (!on) this.card.hide();
  }
  /** 隐藏详情卡 */
  hideDetailCard(): void {
    this.card.hide();
  }
  setBloom(params: BloomParams): void {
    this.pipeline.setBloom(params);
  }
  setBloomEnabled(on: boolean): void {
    this.pipeline.setEnabled(on);
  }
  /** 注册拾取回调，返回取消注册函数 */
  onPick(cb: PickListener): () => void {
    this.pickListeners.add(cb);
    return () => this.pickListeners.delete(cb);
  }

  /**
   * 章节挂载 3D 对象。rotateWithSky=true（默认）挂进 skyRoot——随岁差/季节
   * 一起刚体旋转（西方星座线、极点标记等天体对象用它）；false 挂场景根
   * （天球仪环架等「仪器」部件，不随天球旋转）。章节 exit 时务必 removeSkyObject。
   */
  addSkyObject(obj: THREE.Object3D, opts?: { rotateWithSky?: boolean }): void {
    if (opts?.rotateWithSky === false) this.scene.add(obj);
    else this.skyRoot.add(obj);
  }
  removeSkyObject(obj: THREE.Object3D): void {
    obj.removeFromParent();
  }

  /**
   * 天空整体刚体旋转（绝对设置、幂等，章节 exit 时记得归零）：
   *   rotationYRad    绕天极轴（+Y）的弧度——季节/周日演示（圭表章）；
   *   precessionYears 岁差——绕黄极旋转，J2000 起算年数（岁差章）。
   * 合成顺序：skyRoot.quaternion = Q岁差 · Q绕极。两者可同时非零。
   */
  setSkyRotation(rotationYRad = 0, precessionYears = 0): void {
    if (precessionYears !== 0) {
      const m = precessionMat3(precessionYears); // 行主序 3x3
      this.tmpSkyMat.set(
        m[0], m[1], m[2], 0,
        m[3], m[4], m[5], 0,
        m[6], m[7], m[8], 0,
        0, 0, 0, 1,
      );
      this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat);
    } else {
      this.tmpSkyQ.identity();
    }
    this.tmpSkyQY.setFromAxisAngle(UP, rotationYRad);
    this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY);
  }

  // ---------------------------------------------------------------- 内部

  private tierDpr(): number {
    const tier: QualityTier = this.quality.tier;
    const cap = tier === 0 ? 2 : tier === 1 ? 1.5 : 1;
    return Math.min(window.devicePixelRatio || 1, cap);
  }

  readonly resize = (): void => {
    const dpr = this.tierDpr();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.pipeline.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    if (this.sky) this.sky.starMaterial.uniforms.uPixelRatio.value = dpr;
    if (this.labels) this.labels.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  /**
   * 对 orbitQ 施加一次轨道增量（odx 水平 / ody 垂直，弧度）。
   * 极轴退化保护：候选朝向贴近天极（lookAt 的 up 退化）时只保留偏航分量。
   * 拖拽与松手惯性共用同一路径，规则一致。
   */
  private applyOrbitDelta(odx: number, ody: number): void {
    const posDir = this.camera.position.clone().normalize();
    const qYaw = new THREE.Quaternion().setFromAxisAngle(UP, -odx);
    const pitchAxis = new THREE.Vector3().crossVectors(UP, posDir);
    if (pitchAxis.lengthSq() < 1e-8) pitchAxis.set(1, 0, 0); // 相机恰在极轴：俯仰轴任取
    else pitchAxis.normalize();
    const qPitch = new THREE.Quaternion().setFromAxisAngle(pitchAxis, ody);
    const candidate = qYaw.clone().multiply(qPitch).multiply(this.orbitQ);
    // 不允许轨道贴到极轴上（lookAt 的 up 会退化）
    const testDir = posDir.clone().applyQuaternion(qYaw).applyQuaternion(qPitch);
    if (Math.abs(testDir.y) < 0.985) {
      this.orbitQ.copy(candidate);
    } else {
      this.orbitQ.premultiply(qYaw);
    }
  }

  private bindPointer(): void {
    const canvas = this.canvas;
    canvas.addEventListener("pointerdown", (e) => {
      this.dragging = true;
      this.lastX = this.downX = e.clientX;
      this.lastY = this.downY = e.clientY;
      this.orbitVelX = this.orbitVelY = 0; // 新拖拽立即停掉惯性
      this.lastOrbitMoveT = performance.now();
      this.hoverNdc = null; // 拖拽期间不做悬停高亮
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointerup", (e) => {
      this.dragging = false;
      canvas.releasePointerCapture(e.pointerId);
      // 按住不动后松手不触发惯性（EMA 已过时）；惯性本身由 updateCamera 衰减
      if (performance.now() - this.lastOrbitMoveT > ORBIT_INERTIA_HOLD_MS) {
        this.orbitVelX = this.orbitVelY = 0;
      }
      // 位移足够小视为点击而非拖拽：球内做星点拾取
      if (Math.hypot(e.clientX - this.downX, e.clientY - this.downY) < CLICK_SLOP_PX) {
        this.handleClick(e.clientX, e.clientY);
      }
    });
    canvas.addEventListener("pointercancel", () => {
      this.dragging = false;
      this.orbitVelX = this.orbitVelY = 0; // 手势被系统接管，不甩动
    });
    canvas.addEventListener("pointerleave", () => {
      this.hoverNdc = null;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.dragging) {
        // 未按下：记录悬停位置，由帧循环做星点悬停高亮（星图探索）
        this.hoverNdc = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
          cx: e.clientX,
          cy: e.clientY,
        };
        return;
      }
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      // 「抓天」约定：内容跟随光标。球内环视权重 = (1-blendK)·(1-gazeBlend)，
      // 球外轨道权重 = blendK·orbit——两份输入各乘权重写入各自独立的状态，
      // 模式切换处不打架、不跳变；gazeBlend=1 时用户输入完全不生效但不丢状态。
      const gazeW = (1 - this.blendK) * (1 - this.ctlGazeBlend);
      if (gazeW > 0) {
        this.gazeYaw += dx * GAZE_RAD_PER_PX * gazeW;
        this.gazePitch += dy * GAZE_RAD_PER_PX * gazeW;
        this.gazePitch = THREE.MathUtils.clamp(this.gazePitch, -GAZE_PITCH_LIMIT, GAZE_PITCH_LIMIT);
      }
      const orbitW = this.blendK * this.ctlOrbit;
      if (orbitW > 0) {
        const odx = dx * orbitW * 0.005;
        const ody = dy * orbitW * 0.005;
        this.applyOrbitDelta(odx, ody);
        // 记录角速度 EMA（rad/s），供松手后惯性续转；球内环视分支不记录（即手即止）
        const now = performance.now();
        const dtEv = Math.min((now - this.lastOrbitMoveT) / 1000, 0.1);
        this.lastOrbitMoveT = now;
        if (dtEv > 1e-4) {
          this.orbitVelX += (odx / dtEv - this.orbitVelX) * ORBIT_INERTIA_EMA;
          this.orbitVelY += (ody / dtEv - this.orbitVelY) * ORBIT_INERTIA_EMA;
        }
      }
    });
  }

  private handleClick(clientX: number, clientY: number): void {
    if (!this.pickingEnabled || !this.sky || !this.starPositions) return;
    // 仅球内模式启用拾取（球外星点过密，拾取无意义）
    if (this.camera.position.length() >= R) {
      this.emitPick(null);
      return;
    }
    const ndcX = (clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(clientY / window.innerHeight) * 2 + 1;
    const hit = pickStar(ndcX, ndcY, this.camera, this.starPositions, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if (!hit) {
      this.emitPick(null);
      return;
    }
    const star = this.starList[hit.index];
    const ast = this.hipToAsterism.get(star.hip);
    if (!ast) {
      this.emitPick(null); // 不属于任何星官的散星
      return;
    }
    // 成员星列表由 detailCard 内部截断到 MAX_LISTED（8）颗
    const poem = this.lookupPoem(ast.name);
    this.emitPick(
      {
        info: {
          name: ast.name,
          starCount: ast.stars.length,
          stars: ast.stars.map((hip) => ({ name: this.nameByHip.get(hip) ?? null, hip })),
          quote: poem?.text,
          quoteFrom: poem?.from,
        },
        x: clientX,
        y: clientY,
      },
    );
  }

  /** 查《步天歌》引文：按星官名精确查，失败去「(附…)」/「(…宿/垣)」后缀再查，再失败返回 undefined 走占位符 */
  private lookupPoem(astName: string): PoemEntry | undefined {
    if (!this.poem) return undefined;
    const hit = this.poem[astName];
    if (hit) return hit;
    const base = astName.replace(/[(（][^)）]*[)）]\s*$/, "");
    return base !== astName ? this.poem[base] : undefined;
  }

  private emitPick(payload: PickPayload | null): void {
    for (const cb of this.pickListeners) cb(payload);
  }

  /** 悬停拾取半径（px），比点击略宽容 */
  private static readonly HOVER_PICK_RADIUS_PX = 16;

  /**
   * 悬停高亮（每帧执行）：鼠标经过时圈出最近的星并显示星名 · 所属星官。
   * 仅在拾取开启（星图章）且球内、非拖拽时生效；其余情况隐藏环与提示条。
   */
  private updateHover(): void {
    const active =
      this.pickingEnabled &&
      !this.dragging &&
      this.hoverNdc !== null &&
      this.starPositions !== null &&
      this.camera.position.length() < R;
    if (!active) {
      if (this.hoverRing.visible) this.hoverRing.visible = false;
      if (this.hoverTip.style.display !== "none") this.hoverTip.style.display = "none";
      return;
    }
    const hit = pickStar(this.hoverNdc!.x, this.hoverNdc!.y, this.camera, this.starPositions!, {
      width: window.innerWidth,
      height: window.innerHeight,
    }, SkyApp.HOVER_PICK_RADIUS_PX);
    if (!hit) {
      if (this.hoverRing.visible) this.hoverRing.visible = false;
      if (this.hoverTip.style.display !== "none") this.hoverTip.style.display = "none";
      return;
    }
    // 高亮环：套住目标星；环尺寸随距离补偿，屏幕上保持约 19px
    const p = this.starPositions!;
    this.hoverRing.position.set(p[hit.index * 3], p[hit.index * 3 + 1], p[hit.index * 3 + 2]);
    const dist = this.camera.position.distanceTo(this.hoverRing.position);
    const s = Math.max(0.5, dist * 0.035);
    this.hoverRing.scale.set(s, s, 1);
    this.hoverRing.visible = true;
    // 提示条：星名（无中文名回退 HIP 编号）· 所属星官（寻星游戏段关闭防泄题，环保留）
    if (!this.hoverTipEnabled) {
      if (this.hoverTip.style.display !== "none") this.hoverTip.style.display = "none";
      return;
    }
    const star = this.starList[hit.index];
    const ast = this.hipToAsterism.get(star.hip);
    const name = star.name ?? `HIP ${star.hip}`;
    const text = ast && ast.name !== name ? `${name} · ${ast.name}` : name;
    if (this.hoverTip.textContent !== text) this.hoverTip.textContent = text;
    this.hoverTip.style.left = `${this.hoverNdc!.cx + 16}px`;
    this.hoverTip.style.top = `${this.hoverNdc!.cy + 14}px`;
    if (this.hoverTip.style.display !== "block") this.hoverTip.style.display = "block";
  }

  /** 每帧由脚本控制量 + 用户状态合成相机（脚本绝不改写用户 gaze/orbit 状态） */
  private updateCamera(dt: number): void {
    // 球外轨道惯性：松手后按 EMA 角速度续转，指数衰减（半衰期 ORBIT_INERTIA_HALFLIFE），
    // 低于阈值归零停住；新 pointerdown / pointercancel 已在事件里清零
    if (!this.dragging && (this.orbitVelX !== 0 || this.orbitVelY !== 0)) {
      this.applyOrbitDelta(this.orbitVelX * dt, this.orbitVelY * dt);
      const decay = Math.pow(0.5, dt / ORBIT_INERTIA_HALFLIFE);
      this.orbitVelX *= decay;
      this.orbitVelY *= decay;
      if (Math.hypot(this.orbitVelX, this.orbitVelY) < ORBIT_INERTIA_STOP) {
        this.orbitVelX = this.orbitVelY = 0;
      }
    }
    const pos = this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);
    this.camera.position.copy(pos);

    // 球内 → 球外过渡因子
    this.blendK = smooth((this.ctlRadius - TRANSITION_MIN_R) / (TRANSITION_MAX_R - TRANSITION_MIN_R));

    // 球内显示朝向：用户视线按 gazeBlend 向脚本目标让位（slerp，不回写用户状态）
    this.gazeEuler.set(this.gazePitch, this.gazeYaw, 0);
    this.gazeQ.setFromEuler(this.gazeEuler);
    this.insideQ.copy(this.gazeQ);
    if (this.ctlGazeTargetQ && this.ctlGazeBlend > 0) {
      this.insideQ.slerp(this.ctlGazeTargetQ, this.ctlGazeBlend);
    }
    // 漂移：只作用于球内显示朝向（不回写 gazeYaw/gazePitch）
    if (this.ctlDrift !== 0) {
      this.driftAngle += this.ctlDrift * dt;
      this.driftQ.setFromAxisAngle(UP, this.driftAngle);
      this.insideQ.premultiply(this.driftQ);
    }
    // 球外显示朝向：望向球心（由相机位置与 +Y 即时构建）
    this.centerLookMat.lookAt(pos, ORIGIN, UP);
    this.centerLookQ.setFromRotationMatrix(this.centerLookMat);
    this.camera.quaternion.slerpQuaternions(this.insideQ, this.centerLookQ, this.blendK);

    if (this.camera.fov !== this.ctlFov) {
      this.camera.fov = this.ctlFov;
      this.camera.updateProjectionMatrix();
    }
  }

  private readonly frame = (): void => {
    const dt = Math.min(this.clock.getDelta(), 0.1);
    this.quality.update(dt);
    this.frameHook?.(dt);
    this.updateCamera(dt);
    this.updateHover();

    const camR = this.camera.position.length();
    const sky = this.sky;
    if (sky) {
      this.elapsed += dt;
      sky.setTime(this.elapsed);
      // 视觉调优：球外放大提亮星点（r≤R 时恒为 1），经纬网格球随距离微提亮
      sky.starMaterial.uniforms.uDistBoost.value = distBoost(camR, R);
      sky.gridMaterial.opacity = 0.1 + 0.16 * THREE.MathUtils.clamp(camR / R - 1, 0, 1);
      // 滚出球外后收起详情卡
      if (camR >= R && !this.card.el.hidden) this.card.hide();
    }
    // 标签：总开关 ∧ 球内显示，r∈[R,1.2R] 整体渐隐，之外隐藏
    if (this.labels) {
      const alpha = this.labelsEnabled
        ? THREE.MathUtils.clamp((LABEL_FADE_OUT_R - camR) / (LABEL_FADE_OUT_R - R), 0, 1)
        : 0;
      const show = alpha > 0.01;
      if (show !== this.labelsShown) {
        this.labelsShown = show;
        this.labels.setVisible(show);
      }
      if (show) {
        this.labels.renderer.domElement.style.opacity = alpha.toFixed(3);
        this.labels.update(this.camera);
      }
    }
    this.pipeline.render();
    if (this.labels && this.labelsShown) this.labels.renderer.render(this.scene, this.camera);
  };
}
