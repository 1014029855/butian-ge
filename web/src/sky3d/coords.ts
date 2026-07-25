/**
 * 天球坐标 → 三维向量，以及简化岁差旋转。
 * 纯函数、零依赖（不 import three），方便单测与复用。
 *
 * 手性约定（重要）：
 *   北天极 = +Y；ra=0°, dec=0°（春分点）= +X；ra=90°, dec=0° = +Z。
 *   这是一个左手系嵌入，是有意为之：相机在原点（球内）朝 +Y 北天极看时，
 *   赤经增大的方向为逆时针，与真实星空的周日视运动一致。
 *   （若用球外视角的常规右手系，赤经绕天极看起来反而是顺时针。）
 *
 *   x = cos(dec)·cos(ra)
 *   y = sin(dec)
 *   z = cos(dec)·sin(ra)
 */

const D2R = Math.PI / 180;
const AS2R = D2R / 3600; // 角秒 → 弧度

/** 黄赤交角 ε（J2000，度） */
const OBLIQUITY_DEG = 23.43928;
/** 岁差周期（年）：北天极绕北黄极一周 */
export const PRECESSION_PERIOD_YEARS = 25772;

/**
 * 赤道坐标（度）→ 三维向量。单位球半径默认为 1，radius 用于放到实际渲染尺度。
 */
export function radecToVec3(raDeg: number, decDeg: number, radius = 1): [number, number, number] {
  const ra = raDeg * D2R;
  const dec = decDeg * D2R;
  const c = Math.cos(dec) * radius;
  return [c * Math.cos(ra), Math.sin(dec) * radius, c * Math.sin(ra)];
}

/** 北黄极方向（J2000 赤道坐标 ra=270°, dec=90°−ε）对应的单位向量 */
function eclipticPole(): [number, number, number] {
  const [x, y, z] = radecToVec3(270, 90 - OBLIQUITY_DEG);
  const n = Math.hypot(x, y, z);
  return [x / n, y / n, z / n];
}

/**
 * 简化岁差矩阵：把整个天球绕北黄极匀速旋转，返回行主序 3x3（9 元素）。
 *
 *   转轴：北黄极（ra=270°, dec=90°−23.43928°）
 *   角速度：1296000″ / 25772 年 ≈ 50.287″/年（约 50.29″/年；周期取整 25772 年）
 *   方向：北天极沿黄纬圈向黄经减小方向漂移（约 13700 年后扫到织女一邻域）
 *   M(0) = 单位阵；M(25772) ≈ 单位阵。
 *
 * 仅岁差示意，不含章动/自行/光行差；长跨度为科普级近似。
 */
export function precessionMat3(yearsFromJ2000: number): number[] {
  const [kx, ky, kz] = eclipticPole();
  const theta = yearsFromJ2000 * (1296000 / PRECESSION_PERIOD_YEARS) * AS2R;
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const C = 1 - c;
  // Rodrigues 旋转公式（行主序）
  return [
    c + kx * kx * C, kx * ky * C - kz * s, kx * kz * C + ky * s,
    ky * kx * C + kz * s, c + ky * ky * C, ky * kz * C - kx * s,
    kz * kx * C - ky * s, kz * ky * C + kx * s, c + kz * kz * C,
  ];
}

/** 行主序 3x3 矩阵作用于向量 */
export function applyMat3(m: number[], v: [number, number, number]): [number, number, number] {
  const [x, y, z] = v;
  return [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
  ];
}
