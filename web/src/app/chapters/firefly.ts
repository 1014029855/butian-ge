/**
 * firefly 流萤星使：「唤星之旅」的引路小精灵——一点暖米金柔光，拖着短短
 * 的萤尾，在星官之间缓行引路；抵达目标后绕目标小圆慢转（盘旋待命）。
 *
 * 契约（旅程代理调用）：
 *   const f = createFirefly(); skyRoot.add(f.group);
 *   f.setVisible(true);   // ~0.6s 淡入（非瞬切）
 *   f.flyTo({x, y, z});   // 设定目标（skyRoot 局部坐标，星面 |p|≈100）
 *   f.pulse(0..1);        // 呼吸亮度/缩放的强度（0=平稳常亮，1=深度呼吸）
 *   f.update(dt);         // 主循环每帧驱动（秒；与帧率无关）
 *   f.dispose();          // geometry/material/纹理全释放（幂等）
 *
 * 视觉：
 *   - 本体：柔光 Sprite——程序生成径向渐变纹理（亮白芯 → 暖米金 #ffe9b8 →
 *     透明），AdditiveBlending + depthTest:false（恒浮于星点之上——指引物
 *     「必须能被看见」，与 SkyApp.hoverRing 同一约定）；
 *   - 尾迹：THREE.Points 拖尾 FIREFLY_TRAIL_COUNT=14 点（契约 12~16），
 *     自定义 ShaderMaterial 逐点 aSize/aFade——头新尾旧，逐帧衰减缩小；
 *     加色混合下暗即透明，深度同关。
 *
 * 运动（basePos 物理位置 + 渲染层低频正弦漂移，两不相扰）：
 *   - 趋近（travel）：速度 = min(上限, 距离×增益)——远处限速 FIREFLY_MAX_SPEED、
 *     近处随距离衰减，指数式缓行靠近；
 *   - 盘旋（orbit）：距目标 ≤ 8% 天球半径（FIREFLY_ORBIT_ENTER_DIST=8，R=100）
 *     时切换——以当前偏移方向为轨道基矢 u、目标径向叉积出 w，轨道角从 0 起算，
 *     故入场瞬间位置严格连续；半径按精确指数收敛到 FIREFLY_ORBIT_RADIUS，
 *     角速度 FIREFLY_ORBIT_OMEGA 慢转；
 *   - 漂移：renderPos = basePos + fireflyDrift(t)，三路低频正弦（周期约
 *     11~20s），振幅 FIREFLY_DRIFT_AMP，漂浮感；t 为累计时间，天然帧率无关；
 *   - dt 钳到 [0, FIREFLY_DT_MAX]：后台标签切回的长 dt 不造成瞬移/过冲
 *     （趋近增益×钳后 dt < 1，欧拉积分恒稳定）。
 *
 * 呼吸：pulse(v) 设强度 v∈[0,1]（越界钳制）；亮度/缩放按
 *   factor = 1 + 振幅 × v × sin(2πt / FIREFLY_BREATH_PERIOD) 起伏，v=0 平稳。
 * 显隐：fade 以 1/FIREFLY_FADE_SECONDS 速率线性走向 0/1（帧率无关、精确
 *   0.6s、不越界），fade=0 时 group.visible=false 省绘制。
 * 尾迹：历史环形缓冲（稳态零分配），每帧头写当前渲染位置、逐点重写
 *   position/aSize/aFade（DynamicDrawUsage）。
 *
 * 纯函数（fireflyApproachSpeed / fireflyInOrbitRange / fireflyOrbitRadiusStep /
 *   fireflyFadeStep / fireflyBreath / fireflyDrift / fireflyTrailFade /
 *   fireflyTrailSize）与参数常量导出供单测；无 DOM 环境（vitest node）纹理
 *   回退 null，对象行为不受影响。
 */
import * as THREE from "three";

// ---------------------------------------------------------------- 契约

export interface Firefly {
  /** 场景对象（由调用方 add 到 skyRoot；group 恒在原点，子对象用 skyRoot 绝对坐标） */
  group: THREE.Group;
  /** 设定飞行目标（skyRoot 局部坐标）；非有限输入忽略 */
  flyTo(p: { x: number; y: number; z: number }): void;
  /** 呼吸强度 v∈[0,1]（越界钳制；0=平稳常亮） */
  pulse(v: number): void;
  /** 显隐（~0.6s 淡入淡出，非瞬切） */
  setVisible(b: boolean): void;
  /** 推进 dt 秒（内部钳到 [0, FIREFLY_DT_MAX]；帧率无关） */
  update(dt: number): void;
  /** 释放 geometry/material/纹理（幂等） */
  dispose(): void;
}

// ---------------------------------------------------------------- 参数（导出供单测守护）

/** 天球半径（世界单位），与 SkyApp.R 一致；为让本模块可独立单测而不引入 SkyApp 依赖，此处本地取值 */
export const FIREFLY_SKY_R = 100;
/** 进入盘旋的距离阈值（相对天球半径比例）：契约「约 8% 天球半径」 */
export const FIREFLY_ORBIT_ENTER_K = 0.08;
/** 进入盘旋的距离阈值（世界单位）：0.08 × 100 = 8 */
export const FIREFLY_ORBIT_ENTER_DIST = FIREFLY_SKY_R * FIREFLY_ORBIT_ENTER_K;
/** 盘旋半径（世界单位）：绕目标的小圆 */
export const FIREFLY_ORBIT_RADIUS = 1.6;
/** 盘旋角速度（弧度/秒）：约 7s 一圈，慢转 */
export const FIREFLY_ORBIT_OMEGA = 0.9;
/** 盘旋半径收敛速率（1/秒，精确指数） */
export const FIREFLY_ORBIT_SETTLE = 2.2;
/** 趋近最远限速（世界单位/秒；跨半个天球约 7s，引路的从容感） */
export const FIREFLY_MAX_SPEED = 26;
/** 趋近增益（1/秒）：近处速度 = 距离×增益，随距离衰减 */
export const FIREFLY_APPROACH_GAIN = 1.6;
/** 淡入淡出时长（秒）：契约 ~0.6s */
export const FIREFLY_FADE_SECONDS = 0.6;
/** 尾迹点数：契约 12~16 */
export const FIREFLY_TRAIL_COUNT = 14;
/** 呼吸周期（秒） */
export const FIREFLY_BREATH_PERIOD = 2.6;
/** 漂移振幅（世界单位，各轴上限） */
export const FIREFLY_DRIFT_AMP = 0.5;
/** 单帧 dt 上限（秒）：防后台切回瞬移，同时保证趋近欧拉积分稳定 */
export const FIREFLY_DT_MAX = 0.1;

/** 本体基础不透明度（fade=1、呼吸中值时） */
const BASE_OPACITY = 0.9;
/** 本体基础尺寸（世界单位，呼吸中值时的Sprite边长） */
const BASE_SCALE = 3.2;
/** 呼吸不透明度振幅（v=1 时 ±35%） */
const PULSE_OPACITY = 0.35;
/** 呼吸尺寸振幅（v=1 时 ±22%，尾迹点径同步呼吸） */
const PULSE_SCALE = 0.22;
/** 尾迹头点径（世界单位，sizeAttenuation 随距离透视） */
const TRAIL_HEAD_SIZE = 1.15;
/** 尾迹缩小比例：尾端点径 = 头 × (1-0.65) */
const TRAIL_SHRINK = 0.65;
/** 尾迹透明度衰减幂次：fade(i) = (1 - i/(n-1))^1.7 */
const TRAIL_FADE_POW = 1.7;

/** 漂移：三路低频正弦（弧度/秒，周期约 14s/20s/11s） */
const DRIFT_W: readonly [number, number, number] = [0.45, 0.32, 0.58];
const DRIFT_PHI: readonly [number, number, number] = [0, 1.7, 3.9];
const DRIFT_AXIS: readonly [number, number, number] = [1, 0.8, 0.9];

/** 出生点（天球内侧 |p|≈91；初始隐藏，靠 setVisible(true) 登场） */
const SPAWN = new THREE.Vector3(14, 8, -90);

const UP = new THREE.Vector3(0, 1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

// ---------------------------------------------------------------- 纯逻辑（导出供单测）

/** 趋近速度：近处 距离×增益 随距离衰减，远处限速 FIREFLY_MAX_SPEED（负距离防御性归零） */
export function fireflyApproachSpeed(dist: number): number {
  return Math.min(FIREFLY_MAX_SPEED, Math.max(0, dist) * FIREFLY_APPROACH_GAIN);
}

/** 盘旋判定：距目标 ≤ 8% 天球半径（FIREFLY_ORBIT_ENTER_DIST=8）进入盘旋 */
export function fireflyInOrbitRange(dist: number): boolean {
  return dist <= FIREFLY_ORBIT_ENTER_DIST;
}

/** 盘旋半径一步收敛：精确指数趋近 FIREFLY_ORBIT_RADIUS（从小半径向外同样适用；帧率无关） */
export function fireflyOrbitRadiusStep(r: number, dt: number): number {
  return FIREFLY_ORBIT_RADIUS + (r - FIREFLY_ORBIT_RADIUS) * Math.exp(-FIREFLY_ORBIT_SETTLE * dt);
}

/**
 * 淡入淡出一步：fade 线性走向 target（0/1），速率 1/FIREFLY_FADE_SECONDS，
 * 不越界——线性故严格帧率无关（2×0.3s 与 1×0.6s 结果相同）。
 */
export function fireflyFadeStep(cur: number, target: number, dt: number): number {
  const c = clamp01(cur);
  const t = clamp01(target);
  if (dt <= 0 || c === t) return c;
  const step = dt / FIREFLY_FADE_SECONDS;
  return t > c ? Math.min(t, c + step) : Math.max(t, c - step);
}

/** 呼吸相位：v×sin(2πt/周期)∈[-v, v]；v 越界钳制、非有限归零（v=0 时平稳无呼吸） */
export function fireflyBreath(t: number, v: number): number {
  const vv = Number.isFinite(v) ? clamp01(v) : 0;
  return vv * Math.sin((2 * Math.PI * t) / FIREFLY_BREATH_PERIOD);
}

/** 低频正弦漂移（渲染层叠加，不入物理积分）：各轴 |·| ≤ FIREFLY_DRIFT_AMP */
export function fireflyDrift(t: number): readonly [number, number, number] {
  return [
    FIREFLY_DRIFT_AMP * DRIFT_AXIS[0] * Math.sin(DRIFT_W[0] * t + DRIFT_PHI[0]),
    FIREFLY_DRIFT_AMP * DRIFT_AXIS[1] * Math.sin(DRIFT_W[1] * t + DRIFT_PHI[1]),
    FIREFLY_DRIFT_AMP * DRIFT_AXIS[2] * Math.sin(DRIFT_W[2] * t + DRIFT_PHI[2]),
  ];
}

/** 尾迹第 i 点（0=头）透明度因子：头 1 → 尾 0，幂次衰减 */
export function fireflyTrailFade(i: number, n: number = FIREFLY_TRAIL_COUNT): number {
  if (n <= 1) return 1;
  const k = clamp01(i / (n - 1));
  return Math.pow(1 - k, TRAIL_FADE_POW);
}

/** 尾迹第 i 点（0=头）点径：头 TRAIL_HEAD_SIZE → 尾 ×(1-TRAIL_SHRINK)，逐点缩小 */
export function fireflyTrailSize(i: number, n: number = FIREFLY_TRAIL_COUNT): number {
  if (n <= 1) return TRAIL_HEAD_SIZE;
  const k = clamp01(i / (n - 1));
  return TRAIL_HEAD_SIZE * (1 - TRAIL_SHRINK * k);
}

// ---------------------------------------------------------------- 纹理（程序生成径向渐变；node 单测回退 null）

/** 柔光纹理：亮白芯 → 暖米金 #ffe9b8 → 透明；每实例独立持有（dispose 各自释放） */
function makeGlowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255, 252, 240, 1)");
  grad.addColorStop(0.25, "rgba(255, 233, 184, 0.95)"); // #ffe9b8 暖米金
  grad.addColorStop(0.6, "rgba(255, 233, 184, 0.28)");
  grad.addColorStop(1, "rgba(255, 233, 184, 0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// ---------------------------------------------------------------- 尾迹着色器（逐点大小/衰减）

const TRAIL_VERT = /* glsl */ `
attribute float aSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (320.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const TRAIL_FRAG = /* glsl */ `
uniform sampler2D uMap;
varying float vFade;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(tex.rgb, tex.a * vFade);
}
`;

// ---------------------------------------------------------------- 星使工厂

const MODE_IDLE = 0;
const MODE_TRAVEL = 1;
const MODE_ORBIT = 2;

export function createFirefly(): Firefly {
  const group = new THREE.Group();
  group.name = "firefly";

  // ---- 本体：柔光 Sprite（additive、depthTest:false 恒浮星点之上） ----
  const tex = makeGlowTexture();
  const spriteMat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    opacity: 0, // 初始隐藏
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(BASE_SCALE, BASE_SCALE, 1);
  // 出生即含 t=0 漂移相位：与首帧 renderPos 严格连续，淡入瞬间无跳变
  const drift0 = fireflyDrift(0);
  const startPos = new THREE.Vector3(SPAWN.x + drift0[0], SPAWN.y + drift0[1], SPAWN.z + drift0[2]);
  sprite.position.copy(startPos);
  sprite.frustumCulled = false;
  sprite.renderOrder = 9;
  group.add(sprite);

  // ---- 尾迹：THREE.Points 14 点，逐点 aSize/aFade 衰减缩小 ----
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(FIREFLY_TRAIL_COUNT * 3), 3).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  geo.setAttribute(
    "aSize",
    new THREE.BufferAttribute(new Float32Array(FIREFLY_TRAIL_COUNT), 1).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  geo.setAttribute(
    "aFade",
    new THREE.BufferAttribute(new Float32Array(FIREFLY_TRAIL_COUNT), 1).setUsage(
      THREE.DynamicDrawUsage,
    ),
  );
  const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
  const sizeAttr = geo.getAttribute("aSize") as THREE.BufferAttribute;
  const fadeAttr = geo.getAttribute("aFade") as THREE.BufferAttribute;
  const trailMat = new THREE.ShaderMaterial({
    uniforms: { uMap: { value: tex } },
    vertexShader: TRAIL_VERT,
    fragmentShader: TRAIL_FRAG,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });
  const trail = new THREE.Points(geo, trailMat);
  trail.frustumCulled = false;
  trail.renderOrder = 8;
  group.add(trail);

  // ---- 状态 ----
  const basePos = SPAWN.clone(); // 物理位置（漂移在渲染层叠加）
  const renderPos = startPos.clone();
  let target: THREE.Vector3 | null = null;
  let mode = MODE_IDLE;
  const orbitU = new THREE.Vector3(1, 0, 0); // 轨道基矢 u（入场时的偏移方向，保位置连续）
  const orbitW = new THREE.Vector3(0, 1, 0); // 轨道基矢 w
  let orbitR = FIREFLY_ORBIT_RADIUS;
  let orbitAngle = 0;
  let time = 0; // 累计时间（漂移/呼吸的相位源）
  let fade = 0; // 当前可见度
  let fadeTarget = 0; // setVisible 目标
  let pulseV = 0; // 呼吸强度
  const history: THREE.Vector3[] = []; // 尾迹环形缓冲（头新尾旧）
  let dead = false;

  /** 进入盘旋：以当前偏移方向为 u、目标径向叉积出 w；轨道角从 0 起算保位置连续 */
  function captureOrbit(t: THREE.Vector3, dist: number): void {
    _off.copy(basePos).sub(t);
    if (dist < 1e-3 || _off.lengthSq() < 1e-12) _off.set(1, 0, 0);
    orbitU.copy(_off).normalize();
    orbitR = Math.max(dist, 1e-3);
    if (t.lengthSq() < 1e-8) _radial.set(0, 1, 0);
    else _radial.copy(t).normalize();
    orbitW.crossVectors(orbitU, _radial);
    if (orbitW.lengthSq() < 1e-8) {
      orbitW.crossVectors(orbitU, Math.abs(orbitU.y) < 0.99 ? UP : X_AXIS);
    }
    orbitW.normalize();
    orbitAngle = 0;
    mode = MODE_ORBIT;
  }

  function flyTo(p: { x: number; y: number; z: number }): void {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || !Number.isFinite(p.z)) return;
    if (target === null) target = new THREE.Vector3();
    target.set(p.x, p.y, p.z);
    const dist = basePos.distanceTo(target);
    if (fireflyInOrbitRange(dist)) captureOrbit(target, dist);
    else mode = MODE_TRAVEL;
  }

  function pulse(v: number): void {
    pulseV = Number.isFinite(v) ? clamp01(v) : 0;
  }

  function setVisible(b: boolean): void {
    fadeTarget = b ? 1 : 0;
  }

  function update(dt: number): void {
    if (dead) return;
    const d = Number.isFinite(dt) ? Math.min(Math.max(dt, 0), FIREFLY_DT_MAX) : 0;
    time += d;

    // 显隐：线性淡入淡出（0.6s，非瞬切），全隐时摘掉 visible 省绘制
    fade = fireflyFadeStep(fade, fadeTarget, d);
    group.visible = fade > 1e-3;

    // 运动：趋近 → 到圈进盘旋；盘旋绕目标小圆慢转
    if (target !== null && mode === MODE_TRAVEL) {
      _off.copy(target).sub(basePos);
      const dist = _off.length();
      if (fireflyInOrbitRange(dist)) {
        captureOrbit(target, dist);
      } else {
        basePos.addScaledVector(_off.divideScalar(dist), fireflyApproachSpeed(dist) * d);
      }
    }
    if (target !== null && mode === MODE_ORBIT) {
      orbitR = fireflyOrbitRadiusStep(orbitR, d);
      orbitAngle += FIREFLY_ORBIT_OMEGA * d;
      basePos
        .copy(target)
        .addScaledVector(orbitU, Math.cos(orbitAngle) * orbitR)
        .addScaledVector(orbitW, Math.sin(orbitAngle) * orbitR);
    }

    // 渲染位置 = 物理位置 + 低频漂移（漂浮感）
    const drift = fireflyDrift(time);
    renderPos.set(basePos.x + drift[0], basePos.y + drift[1], basePos.z + drift[2]);

    // 呼吸：pulse(v) 控制亮度/缩放起伏强度；fade 整体调制
    const m = fireflyBreath(time, pulseV);
    spriteMat.opacity = BASE_OPACITY * (1 + PULSE_OPACITY * m) * fade;
    const s = BASE_SCALE * (1 + PULSE_SCALE * m);
    sprite.scale.set(s, s, 1);
    sprite.position.copy(renderPos);

    // 尾迹：头插当前渲染位置（稳态复用尾部向量，零分配），逐点衰减缩小重写
    const head = history.length < FIREFLY_TRAIL_COUNT ? new THREE.Vector3() : history.pop()!;
    head.copy(renderPos);
    history.unshift(head);
    const n = history.length;
    for (let i = 0; i < FIREFLY_TRAIL_COUNT; i++) {
      const hp = history[Math.min(i, n - 1)]!;
      posAttr.setXYZ(i, hp.x, hp.y, hp.z);
      fadeAttr.setX(i, fireflyTrailFade(i) * fade);
      sizeAttr.setX(i, fireflyTrailSize(i) * (1 + PULSE_SCALE * m));
    }
    posAttr.needsUpdate = true;
    fadeAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  }

  function dispose(): void {
    if (dead) return;
    dead = true;
    group.removeFromParent();
    spriteMat.dispose();
    tex?.dispose();
    geo.dispose();
    trailMat.dispose();
  }

  group.visible = false; // 初始隐藏，靠 setVisible(true) 淡入登场
  return { group, flyTo, pulse, setVisible, update, dispose };
}

/** 工厂内复用的临时向量（单线程同步 update 内安全） */
const _off = new THREE.Vector3();
const _radial = new THREE.Vector3();
