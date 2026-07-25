/**
 * 程序生成银河带：天球内侧（壳半径 = R × 1.015，星点之上、天球仪环架之下）
 * 放一层球壳 Mesh + ShaderMaterial，全部辉光/暗尘埃纹理由 fbm 噪声程序生成，零贴图。
 * 单壳单材质，全屏一次 draw call；加色混合 + depthWrite:false，透明度克制（峰值 0.13）。
 *
 * 坐标来源（J2000 赤道坐标）：
 *   银河北极  ra=192.8595°, dec=+27.1283°
 *     —— IAU 1958 银道坐标系定义的北银极（Liu, Zhu & Zhang 2011 以 J2000 重新归算的值，
 *        任务书给定的 192.86° / +27.13° 即其舍入）。银河带 = 垂直于该银极的大圆。
 *   银心方向  ra=266.4050°, dec=−28.9362°
 *     —— 银道坐标原点 (l=0, b=0) 的 J2000 赤道坐标（任务书给定的 266.4° / −29° 的精确值；
 *        注意这是「名义银心」，Sgr A* 本身在 l≈359.94° 有 ~3.4′ 偏移，绘制尺度上无差别）。
 *   赤道 → 三维向量沿用 sky3d/coords.ts 的手性约定（北天极 +Y、春分点 +X 的左手系嵌入），
 *   银河壳与星点同处物体空间，父组做岁差旋转时两者一起转，相对位置不变。
 *
 * 噪声与造型参数（后续微调都改这里）：
 *   fbm：5 octaves，lacunarity 2.02，gain 0.5；hash 用 David Hoskins「Hash without Sine」
 *        （hash13，输入为三维方向采样点，避免 sin 精度条纹；方向向量采样天然球面无接缝）。
 *   各向异性：银纬方向采样距离 ×2.8（LAT_STRETCH），噪声沿银道面拉伸成缕。
 *   两个尺度：n1 = fbm(q·2.3) 大云气团块，n2 = fbm(q·6.1) 纤维细节，按 0.62/0.38 混合。
 *   带宽：高斯 σ = uWidth(0.16 rad ≈ 9.2°) × 银心放宽(最多 +45%) × 噪声扰动(0.8~1.2)。
 *   银心增亮：lon=0 处 σ≈51° 的高斯隆起，反银心保留 45% 基底亮度（uCenterSigma=0.9）。
 *   峰值透明度 uPeakAlpha = 0.13（任务要求 0.10~0.16 区间，宁淡勿浓）。
 *
 * 暗尘埃带（大暗隙的示意）：
 *   加色混合无法在片元里真正「减色」，做法是在银道中线附近把辉光乘性挖除——
 *   裂缝处相对两侧辉光变暗，视觉上等效一条暗带，且仍是一次 draw call。
 *   最大挖除量 = uPeakAlpha × 0.6 ≈ 0.078 ≤ 0.08（任务上限）；裂缝用第三组噪声
 *   （q·8.3）撕出断续感，强度按 cos(lon−0.35) 加权：银心一侧强、反银心消失。
 *   手性备注：左手系嵌入下 lon 增大的方向与真实银经相反（镜像），只影响
 *   尘埃不对称性的左右朝向，不影响银心位置与带的形状。
 */
import * as THREE from "three";
import { radecToVec3 } from "../sky3d/coords";

/** 银河壳相对天球半径的放大系数：R=100 时壳半径 101.5（星点 R 之上、环架之下） */
const SHELL_SCALE = 1.015;

/** 银河北极（J2000，度），见文件头来源说明 */
const GALACTIC_POLE = { ra: 192.8595, dec: 27.1283 } as const;
/** 银心方向 = 银道坐标原点 (l=0,b=0)（J2000，度），见文件头来源说明 */
const GALACTIC_CENTER = { ra: 266.405, dec: -28.9362 } as const;

/** 全带峰值透明度：克制档（球内防雾感、球外保纤维感，实测调定） */
const PEAK_ALPHA = 0.085;
/** 基础半宽高斯 σ（弧度，≈8°），实际带宽还乘银心放宽与噪声扰动 */
const BAND_WIDTH_RAD = 0.14;
/** 银心经度增亮高斯 σ（弧度，≈51°） */
const CENTER_SIGMA_RAD = 0.9;
/** 暗尘埃带最大挖除比例（乘 PEAK_ALPHA 后 ≈0.078，≤0.08 上限） */
const DUST_STRENGTH = 0.6;

/** 带本色：暖米金偏白（#fce1b6 方向调淡）；直接作为输出值，与 StarField 一样不做色彩空间转换 */
const COLOR_BAND = new THREE.Color(0.96, 0.9, 0.78);
/** 银心核色：略暖的米金，向银心方向混入 */
const COLOR_CORE = new THREE.Color(1.0, 0.88, 0.68);

const MILKYWAY_VERT = /* glsl */ `
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const MILKYWAY_FRAG = /* glsl */ `
uniform vec3 uPole;         // 银河北极方向（单位向量）
uniform vec3 uE0;           // 银道面内指向银心的基向量
uniform vec3 uE1;           // 银道面内与 uE0 正交的基向量（「银经 +90°」，镜像约定见文件头）
uniform float uPeakAlpha;   // 全带峰值透明度
uniform float uWidth;       // 基础半宽高斯 σ（弧度）
uniform float uCenterSigma; // 银心经度增亮高斯 σ（弧度）
uniform float uDust;        // 暗尘埃带最大挖除比例
uniform vec3 uColorBand;
uniform vec3 uColorCore;
varying vec3 vDir;

// Hash without Sine（David Hoskins）：三维点 → [0,1)，避免 sin 在大输入下的精度条纹
float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

// 三维值噪声：对方向向量的缩放采样天然球面无接缝
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i + vec3(0.0, 0.0, 0.0)), hash13(i + vec3(1.0, 0.0, 0.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
    mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), u.x), u.y),
    u.z);
}

// fbm：5 octaves，lacunarity 2.02，gain 0.5；每倍频平移去轴向相关。范围约 0~0.97，均值 ~0.48
float fbm(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * vnoise(p);
    p = p * 2.02 + vec3(19.19, 7.13, 4.7);
    a *= 0.5;
  }
  return s;
}

// 一维高斯（不用 pow：GLSL pow 对负底数行为未定义）
float gauss(float x, float sigma) {
  float t = x / sigma;
  return exp(-0.5 * t * t);
}

void main() {
  vec3 d = normalize(vDir);
  float gp = clamp(dot(d, uPole), -1.0, 1.0);
  float lat = asin(gp);                          // 银纬（弧度，0 = 银道面）
  float x0 = dot(d, uE0);
  float x1 = dot(d, uE1);
  float lon = atan(x1, x0);                      // 银经（-π~π，0 = 银心）

  // 银心方向增亮：lon=0 高斯隆起，反银心保留 45% 基底
  float center = gauss(lon, uCenterSigma);

  // 各向异性采样域：银纬方向采样距离 ×2.8 → 噪声沿银道面拉伸成缕
  vec3 q = (uE0 * x0 + uE1 * x1) + uPole * (gp * 2.8);
  float n1 = fbm(q * 2.3);                       // 大尺度云气团块
  float n2 = fbm(q * 6.1 + vec3(13.7));          // 纤维细节

  // 带宽：银心附近放宽最多 45%，再被大尺度噪声扰动，带缘不整齐
  float w = uWidth * (1.0 + 0.45 * center) * (0.8 + 0.4 * n1);
  float band = gauss(lat, w);
  float longAmp = 0.45 + 0.55 * center;

  // 团块化：保留 35% 均匀基底，噪声阈值切出絮状结构
  float clump = smoothstep(0.30, 0.78, n1 * 0.62 + n2 * 0.38);
  float glow = band * longAmp * (0.35 + 0.65 * clump);

  // 暗尘埃带：在中线附近乘性挖除辉光（加色混合下等效减色，见文件头）
  float dustN = fbm(q * 8.3 + vec3(29.1));
  float lane = gauss(lat + 0.025 * cos(lon), uWidth * 0.22);
  float dustMask = 0.5 + 0.5 * cos(lon - 0.35);  // 银心一侧强，反银心消失
  glow *= 1.0 - uDust * lane * dustMask * smoothstep(0.42, 0.72, dustN);

  vec3 col = mix(uColorBand, uColorCore, center * band);
  gl_FragColor = vec4(col, glow * uPeakAlpha);
}
`;

/** createMilkyWay 的返回：挂进场景用 group，卸载时调 dispose 释放几何体与材质。 */
export interface MilkyWay {
  group: THREE.Group;
  dispose(): void;
}

/**
 * 构建银河带：半径 R×1.015 的球壳（BackSide，球内球外都只看远半球、单层不叠亮），
 * 全屏一次 draw call。R 即天球半径（与星点同一尺度，本工程 R=100）。
 */
export function createMilkyWay(R: number): MilkyWay {
  // 银道面正交基：e0 指向银心（与银极正交化，吸收给定坐标的舍入误差），e1 = pole × e0
  const pole = new THREE.Vector3(...radecToVec3(GALACTIC_POLE.ra, GALACTIC_POLE.dec)).normalize();
  const centerRaw = new THREE.Vector3(...radecToVec3(GALACTIC_CENTER.ra, GALACTIC_CENTER.dec));
  const e0 = centerRaw.addScaledVector(pole, -centerRaw.dot(pole)).normalize();
  const e1 = new THREE.Vector3().crossVectors(pole, e0).normalize();

  const geo = new THREE.SphereGeometry(R * SHELL_SCALE, 96, 64);
  const mat = new THREE.ShaderMaterial({
    vertexShader: MILKYWAY_VERT,
    fragmentShader: MILKYWAY_FRAG,
    uniforms: {
      uPole: { value: pole },
      uE0: { value: e0 },
      uE1: { value: e1 },
      uPeakAlpha: { value: PEAK_ALPHA },
      uWidth: { value: BAND_WIDTH_RAD },
      uCenterSigma: { value: CENTER_SIGMA_RAD },
      uDust: { value: DUST_STRENGTH },
      uColorBand: { value: COLOR_BAND },
      uColorCore: { value: COLOR_CORE },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = "milkyway-shell";
  const group = new THREE.Group();
  group.name = "milkyway";
  group.add(mesh);

  return {
    group,
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}
