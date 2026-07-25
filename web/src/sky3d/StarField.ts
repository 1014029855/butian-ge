/**
 * POC 星空渲染：恒星点云（自定义 ShaderMaterial：逐星确定性闪烁 + B-V 近似黑体色）
 * + 星官连线（ConstellationLines.ts，按组生长点亮）+ 经纬网格球。
 * 依赖 coords.ts 的 radecToVec3 把手性约定（北天极 +Y、春分点 +X、左手系嵌入）。
 */
import * as THREE from "three";
import { radecToVec3 } from "./coords";
import { dataUrl } from "./dataUrl";
import {
  buildConstellationLines,
  type AsterismRec,
  type ConstellationLines,
} from "./ConstellationLines";

interface StarRec {
  hip: number;
  ra: number;
  dec: number;
  mag: number;
  name: string | null;
  /** B-V 色指数（数据补全中，可为 null 或缺失；回退中性白） */
  ci?: number | null;
}

/** mag ≈ -1 的最亮星到 mag ≈ 6.5 的裸眼极限，映射到 [0,1] 亮度权重 */
function magWeight(mag: number): number {
  return THREE.MathUtils.clamp((6.5 - mag) / 7.0, 0, 1);
}

/** 可播种伪随机数（mulberry32）：同一 hip 每次加载生成完全一致的闪烁参数。 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface TwinkleParams {
  /** 相位（周期分数 0~1），逐星错峰 */
  phase: number;
  /** 频率 Hz = 1/周期，周期落在 2.4~7.6s */
  freq: number;
  /** 相对振幅（5%~18%）：透明度最多向下调制该比例 */
  amp: number;
}

/**
 * 由 hip 确定性生成逐星闪烁参数（周期区间沿用旧版 starfield/twinkle.ts 的 2.4~7.6s）。
 * 振幅克制在 18% 以内——只让星点「呼吸」，不做舞台灯效果；shader 里只调制透明度。
 */
export function twinkleParams(hip: number): TwinkleParams {
  const rand = mulberry32(hip);
  const period = 2.4 + rand() * 5.2;
  const phase = rand();
  const amp = 0.05 + rand() * 0.13;
  return { phase, freq: 1 / period, amp };
}

/**
 * B-V 色指数锚点（全饱和度 tint，线性 RGB）：-0.4 蓝白 → 0.65 白 → 2.0 橙红。
 * 是黑体轨迹的经验近似而非精确拟合——星点只有几像素，读出色温倾向即可。
 */
const CI_STOPS: readonly (readonly [number, readonly [number, number, number]])[] = [
  [-0.4, [0.55, 0.72, 1.0]],
  [0.0, [0.78, 0.87, 1.0]],
  [0.65, [1.0, 1.0, 1.0]],
  [1.2, [1.0, 0.8, 0.55]],
  [2.0, [1.0, 0.52, 0.3]],
];

/** 饱和度克制系数：tint 只混入 ~35%，其余为白，避免彩虹星空 */
const CI_SATURATION = 0.35;

/**
 * B-V 色指数 → 近似黑体色（线性 RGB，各通道 0~1）。
 * ci 为 null / undefined / 非有限数（数据未补全）时回退中性白；越界值钳制到 [-0.4, 2.0]。
 */
export function ciToColor(ci: number | null | undefined): [number, number, number] {
  if (ci == null || !Number.isFinite(ci)) return [1, 1, 1];
  const x = Math.min(2.0, Math.max(-0.4, ci));
  let r = 1;
  let g = 1;
  let b = 1;
  for (let i = 0; i < CI_STOPS.length - 1; i++) {
    const [x0, c0] = CI_STOPS[i];
    const [x1, c1] = CI_STOPS[i + 1];
    if (x <= x1 || i === CI_STOPS.length - 2) {
      const k = Math.min(1, Math.max(0, (x - x0) / (x1 - x0)));
      r = c0[0] + (c1[0] - c0[0]) * k;
      g = c0[1] + (c1[1] - c0[1]) * k;
      b = c0[2] + (c1[2] - c0[2]) * k;
      break;
    }
  }
  const s = CI_SATURATION;
  return [1 + (r - 1) * s, 1 + (g - 1) * s, 1 + (b - 1) * s];
}

const STAR_VERT = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;
attribute float aPhase; // 闪烁相位（周期分数 0~1）
attribute float aFreq;  // 闪烁频率 Hz（周期 2.4~7.6s）
attribute float aAmp;   // 闪烁振幅（≤0.18，只调制透明度）
uniform float uPixelRatio;
uniform float uTime;    // 秒，由 setTime 每帧更新
uniform float uDistBoost; // 球外距离补偿（≥1，见 distBoost）：尺寸/透明度同比例放大
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = max(-mv.z, 0.001);
  // 以距天球面 100（=R）为参考距离做透视衰减，再乘 devicePixelRatio
  gl_PointSize = clamp(aSize * uPixelRatio * uDistBoost * (100.0 / dist), 0.75, 36.0 * uPixelRatio);
  vColor = aColor;
  // 呼吸式闪烁（余弦波形与旧版 twinkle.ts 一致）：在基础透明度下最多下调 aAmp
  float tw = 1.0 - aAmp * (0.5 - 0.5 * cos(6.2831853 * (uTime * aFreq + aPhase)));
  vAlpha = clamp(aAlpha * uDistBoost, 0.0, 1.0) * tw;
  gl_Position = projectionMatrix * mv;
}
`;

const STAR_FRAG = /* glsl */ `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv) * 2.0; // 0 = 圆心，1 = 边缘
  if (d > 1.0) discard;
  // 高斯亮核 + 一圈微弱光晕，圆形软边
  float core = exp(-d * d * 7.0);
  float halo = exp(-d * d * 2.5) * 0.4;
  float a = clamp(core + halo, 0.0, 1.0) * vAlpha;
  gl_FragColor = vec4(vColor, a);
}
`;

function buildStars(stars: StarRec[], R: number): THREE.Points {
  const n = stars.length;
  const positions = new Float32Array(n * 3);
  const sizes = new Float32Array(n);
  const colors = new Float32Array(n * 3);
  const alphas = new Float32Array(n);
  const phases = new Float32Array(n);
  const freqs = new Float32Array(n);
  const amps = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const s = stars[i];
    const [x, y, z] = radecToVec3(s.ra, s.dec, R);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const w = magWeight(s.mag);
    // 亮星显著大：mag -1 → ~6.8px，mag 6.2 → ~1.4px（参考距离处）
    sizes[i] = 1.3 + 5.5 * Math.pow(w, 1.8);
    alphas[i] = 0.45 + 0.55 * w;

    // B-V 近似黑体色（ci 缺失回退中性白，见 ciToColor）
    const [r, g, b] = ciToColor(s.ci);
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;

    // 逐星确定性闪烁：相位/频率/振幅由 hip 哈希
    const tw = twinkleParams(s.hip);
    phases[i] = tw.phase;
    freqs[i] = tw.freq;
    amps[i] = tw.amp;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geo.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
  geo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geo.setAttribute("aFreq", new THREE.BufferAttribute(freqs, 1));
  geo.setAttribute("aAmp", new THREE.BufferAttribute(amps, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: STAR_VERT,
    fragmentShader: STAR_FRAG,
    uniforms: {
      uPixelRatio: { value: 1 },
      uTime: { value: 0 },
      uDistBoost: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, mat);
  points.name = "stars";
  return points;
}

/** 极淡的经纬网格球：24 条经线 + 纬圈（±75°~0°，每 15°），帮助球外视角读出「天球」形体 */
function buildGridSphere(R: number): THREE.LineSegments {
  const verts: number[] = [];
  const r = R * 0.995; // 略小于星面，避免与星点 z-fighting 的视觉噪声
  const SEG = 72;
  const push = (ra1: number, dec1: number, ra2: number, dec2: number) => {
    const a = radecToVec3(ra1, dec1, r);
    const b = radecToVec3(ra2, dec2, r);
    verts.push(a[0], a[1], a[2], b[0], b[1], b[2]);
  };
  // 经线：每 15° 一条
  for (let ra = 0; ra < 360; ra += 15) {
    for (let i = 0; i < SEG; i++) {
      const d1 = -90 + (180 * i) / SEG;
      const d2 = -90 + (180 * (i + 1)) / SEG;
      push(ra, d1, ra, d2);
    }
  }
  // 纬圈：-75° ~ +75°，每 15° 一圈
  for (let dec = -75; dec <= 75; dec += 15) {
    for (let i = 0; i < SEG; i++) {
      const r1 = (360 * i) / SEG;
      const r2 = (360 * (i + 1)) / SEG;
      push(r1, dec, r2, dec);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
  const mat = new THREE.LineBasicMaterial({
    color: 0x3a5a8a,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });
  const grid = new THREE.LineSegments(geo, mat);
  grid.name = "grid";
  return grid;
}

export interface StarField {
  group: THREE.Group;
  /** 点材质（供运行时更新 uPixelRatio / uDistBoost） */
  starMaterial: THREE.ShaderMaterial;
  /** 经纬网格球材质（供球外视角微调透明度） */
  gridMaterial: THREE.LineBasicMaterial;
  /** 星官连线渲染器（按组生长点亮，单次 draw call） */
  lines: ConstellationLines;
  /** 更新星点闪烁时钟（秒），需在渲染循环中每帧调用 */
  setTime(tSec: number): void;
}

/** 球外距离补偿指数：克制档（r=3R 时 ×3^0.45 ≈ 1.64），避免球外星点糊成光斑 */
export const DIST_BOOST_K = 0.45;
/** 补偿上限：尺寸/透明度最多放大到该倍数 */
export const DIST_BOOST_MAX = 2.2;

/**
 * 球外视角的星点距离补偿系数：驱动星点 shader 的 uDistBoost。
 * 相机半径 r ≤ R（球内）恒为 1，不改变球内观感；
 * r > R 按 (r/R)^0.45 放大提亮，clamp 到 DIST_BOOST_MAX。
 */
export function distBoost(radius: number, R: number): number {
  if (!(radius > R) || R <= 0) return 1; // 含 NaN / 非法 R 防护
  return Math.min(Math.pow(radius / R, DIST_BOOST_K), DIST_BOOST_MAX);
}

/**
 * hip → 所属星官 的索引（demo 点击拾取详情卡用）。
 * 同一 hip 在数据中出现在多个星官时取数据序首个。
 */
export function buildHipToAsterismMap(
  asterisms: readonly AsterismRec[],
): Map<number, AsterismRec> {
  const m = new Map<number, AsterismRec>();
  for (const a of asterisms) {
    for (const hip of a.stars) {
      if (!m.has(hip)) m.set(hip, a);
    }
  }
  return m;
}

/** 拉取 stars.json / asterisms.json，构建整个天球场景组（半径 R）。 */
export async function loadStarField(R: number): Promise<StarField> {
  const [starsRes, astRes] = await Promise.all([
    fetch(dataUrl("data/stars.json")),
    fetch(dataUrl("data/asterisms.json")),
  ]);
  if (!starsRes.ok || !astRes.ok) {
    throw new Error(`数据加载失败：stars=${starsRes.status} asterisms=${astRes.status}`);
  }
  const starsData = (await starsRes.json()) as { stars: StarRec[] };
  const astData = (await astRes.json()) as { asterisms: AsterismRec[] };

  const hipPos = new Map<number, [number, number, number]>();
  for (const s of starsData.stars) {
    hipPos.set(s.hip, radecToVec3(s.ra, s.dec, R));
  }

  const stars = buildStars(starsData.stars, R);
  const lines = buildConstellationLines(astData.asterisms, hipPos);
  const starMaterial = stars.material as THREE.ShaderMaterial;
  const grid = buildGridSphere(R);

  const group = new THREE.Group();
  group.add(stars);
  group.add(lines.object);
  group.add(grid);

  return {
    group,
    starMaterial,
    gridMaterial: grid.material as THREE.LineBasicMaterial,
    lines,
    setTime: (tSec) => {
      starMaterial.uniforms.uTime.value = tSec;
    },
  };
}
