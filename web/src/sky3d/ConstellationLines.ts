/**
 * 星官连线渲染：单次 draw call 绘制全部星官折线，支持按组「生长」点亮。
 *
 * 数据流：
 *   每个线段端点携带 aGroup（星官组序号）与 aAlong（组内归一化位置，按数据 lines 顺序展开）。
 *   每组进度 v∈[0,1] 存放在一张 groupCount×1 的 R8 数据纹理（R 通道，1/255 量化），
 *   顶点着色器查纹理 → varying 进片元：vAlong > vProgress 的片元丢弃（只显示折线前 v 段），
 *   组亮度随 v 提升，生长尖附近轻微提亮。
 *
 * 取舍：为什么用数据纹理而不是 uniform 数组——
 *   309 组的 uniform float 数组在 GLSL ES 1.0 里按 vec4 对齐要占 309 个 uniform 向量，
 *   超过低阶设备保证的上限（片元 16 / 顶点 128 vec4）；数据纹理只占 1 个 sampler，
 *   大小随组数线性扩展，且仍然一次 draw call。代价是依赖顶点纹理采样
 *   （WebGL1 起主流 GPU 均支持），进度被量化为 1/255（对生长动画足够细腻）。
 */
import * as THREE from "three";

export interface AsterismRec {
  id: string;
  name: string;
  stars: number[];
  lines: [number, number][];
}

export type HipPositions = ReadonlyMap<number, readonly [number, number, number]>;

export interface LineVertexData {
  positions: Float32Array;
  /** 每顶点的星官组序号（0 ~ groupCount-1） */
  groups: Float32Array;
  /** 每顶点在组内折线上的归一化位置 [0,1] */
  alongs: Float32Array;
  vertexCount: number;
  segmentCount: number;
}

/**
 * 把各星官的 lines（hip 点对）展开成 LineSegments 顶点流。
 * aAlong 定义：组内第 j 条线段（共 m 条）的两端点取 j/m 与 (j+1)/m，
 * 即生长动画按数据 lines 的书写顺序逐段点亮（主线在前、分叉列后，由数据编排）。
 * 缺坐标的 hip 线段跳过；该星官组仍保留组序号（进度对它无副作用）。
 */
export function buildLineVertices(asterisms: AsterismRec[], hipPos: HipPositions): LineVertexData {
  let segTotal = 0;
  for (const a of asterisms) {
    for (const [ha, hb] of a.lines) {
      if (hipPos.has(ha) && hipPos.has(hb)) segTotal++;
    }
  }
  const positions = new Float32Array(segTotal * 6);
  const groups = new Float32Array(segTotal * 2);
  const alongs = new Float32Array(segTotal * 2);
  let v = 0;
  asterisms.forEach((a, gi) => {
    const m = a.lines.length;
    a.lines.forEach(([ha, hb], j) => {
      const pa = hipPos.get(ha);
      const pb = hipPos.get(hb);
      if (!pa || !pb) return;
      positions[v * 3] = pa[0];
      positions[v * 3 + 1] = pa[1];
      positions[v * 3 + 2] = pa[2];
      positions[v * 3 + 3] = pb[0];
      positions[v * 3 + 4] = pb[1];
      positions[v * 3 + 5] = pb[2];
      groups[v] = gi;
      groups[v + 1] = gi;
      alongs[v] = j / m;
      alongs[v + 1] = (j + 1) / m;
      v += 2;
    });
  });
  return { positions, groups, alongs, vertexCount: v, segmentCount: v / 2 };
}

const LINE_VERT = /* glsl */ `
attribute float aGroup;
attribute float aAlong;
uniform sampler2D uProgress;
uniform float uGroupCount;
varying float vAlong;
varying float vProgress;
void main() {
  // 同组两顶点查到相同进度，vProgress 跨段插值仍为常量；vAlong 沿线段线性插值
  vProgress = texture2D(uProgress, vec2((aGroup + 0.5) / uGroupCount, 0.5)).r;
  vAlong = aAlong;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LINE_FRAG = /* glsl */ `
precision mediump float;
uniform vec3 uColor;
uniform float uBaseAlpha;
varying float vAlong;
varying float vProgress;
void main() {
  // 未点亮（v=0）整组隐藏；只显示折线前 v 段，生长尖位置是精确截断
  if (vProgress < 0.002 || vAlong > vProgress) discard;
  float glow = 0.25 + 0.75 * vProgress; // 组亮度随进度提升
  // 生长尖附近轻微提亮，接近全长（v→1）时平滑消退，避免完成瞬间跳变
  float tip = 1.0
    + 0.5 * (1.0 - smoothstep(0.0, 0.06, vProgress - vAlong))
    * (1.0 - smoothstep(0.97, 1.0, vProgress));
  gl_FragColor = vec4(uColor * tip, uBaseAlpha * glow);
}
`;

export interface ConstellationLines {
  /** 全部星官折线（单次 draw call），name = "asterisms" */
  object: THREE.LineSegments;
  /** 星官组数 */
  groupCount: number;
  /** 有效线段总数（缺坐标的 hip 对已剔除） */
  segmentCount: number;
  /** 组序号 → 数据 id（如 "001"）；越界返回 "" */
  idOf(index: number): string;
  /** 组序号 → 星官名；越界返回 "" */
  nameOf(index: number): string;
  /** 数据 id 或星官名 → 组序号；未找到返回 -1 */
  indexOf(ref: string): number;
  /** 设置组生长进度 v∈[0,1]（自动钳制；序号越界静默忽略） */
  setGroupProgress(index: number, v: number): void;
  /** 读回组进度（量化到 1/255） */
  groupProgress(index: number): number;
}

/** 由星官数据与恒星坐标构建连线渲染器（初始全组进度 0，即全部隐藏）。 */
export function buildConstellationLines(
  asterisms: AsterismRec[],
  hipPos: HipPositions,
): ConstellationLines {
  const groupCount = asterisms.length;
  const data = buildLineVertices(asterisms, hipPos);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
  geo.setAttribute("aGroup", new THREE.BufferAttribute(data.groups, 1));
  geo.setAttribute("aAlong", new THREE.BufferAttribute(data.alongs, 1));

  // 每组一个字节存进度（R 通道）；宽度取 max(1, n) 兜底空数据
  const w = Math.max(groupCount, 1);
  const texData = new Uint8Array(w * 4);
  const tex = new THREE.DataTexture(texData, w, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.needsUpdate = true;

  const mat = new THREE.ShaderMaterial({
    vertexShader: LINE_VERT,
    fragmentShader: LINE_FRAG,
    uniforms: {
      uProgress: { value: tex },
      uGroupCount: { value: w },
      uColor: { value: new THREE.Color(0xd8b56a) }, // 淡金色，沿用旧版配色
      uBaseAlpha: { value: 0.5 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const object = new THREE.LineSegments(geo, mat);
  object.name = "asterisms";

  const ids = asterisms.map((a) => a.id);
  const names = asterisms.map((a) => a.name);
  const refIndex = new Map<string, number>();
  asterisms.forEach((a, i) => {
    if (!refIndex.has(a.id)) refIndex.set(a.id, i);
    if (!refIndex.has(a.name)) refIndex.set(a.name, i);
  });

  return {
    object,
    groupCount,
    segmentCount: data.segmentCount,
    idOf: (i) => ids[i] ?? "",
    nameOf: (i) => names[i] ?? "",
    indexOf: (ref) => refIndex.get(ref) ?? -1,
    setGroupProgress(index, v) {
      if (index < 0 || index >= groupCount) return;
      const b = Math.round(THREE.MathUtils.clamp(v, 0, 1) * 255);
      if (texData[index * 4] === b) return; // 避免无变化的重复上传
      texData[index * 4] = b;
      tex.needsUpdate = true;
    },
    groupProgress: (index) => (index < 0 || index >= groupCount ? 0 : texData[index * 4] / 255),
  };
}
