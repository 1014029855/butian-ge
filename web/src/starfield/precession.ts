/**
 * 岁差（地轴进动）：把恒星从 J2000.0 赤道坐标旋到指定历元的视位置。
 * IAU 1976 岁差角完整三项式（Lieske）。T³ 项在长跨度（上万年级）
 * 修正显著；±14000 年范围为科普级近似（误差数度），用于可视化足够。
 *
 *   T   = (year − 2000) / 100          （儒略世纪）
 *   ζ   = 2306.2181″·T + 0.30188″·T² + 0.017998″·T³
 *   z   = 2306.2181″·T + 1.09468″·T² + 0.018203″·T³
 *   θ   = 2004.3109″·T − 0.42665″·T² − 0.041833″·T³
 *   P   = Rz(−z) · Ry(θ) · Rz(−ζ)
 */

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const AS2R = D2R / 3600; // 角秒 → 弧度

interface Vec3 { x: number; y: number; z: number }

function precessionAngles(year: number): { zeta: number; z: number; theta: number } {
  const T = (year - 2000) / 100;
  const T2 = T * T;
  const T3 = T2 * T;
  return {
    zeta: (2306.2181 * T + 0.30188 * T2 + 0.017998 * T3) * AS2R,
    z: (2306.2181 * T + 1.09468 * T2 + 0.018203 * T3) * AS2R,
    theta: (2004.3109 * T - 0.42665 * T2 - 0.041833 * T3) * AS2R,
  };
}

function rotZm(v: Vec3, a: number): Vec3 {
  // Rz(−a)
  const c = Math.cos(a), s = Math.sin(a);
  return { x: c * v.x + s * v.y, y: -s * v.x + c * v.y, z: v.z };
}

function rotY(v: Vec3, a: number): Vec3 {
  // Ry(−a)：x' = c·x − s·z; z' = s·x + c·z
  const c = Math.cos(a), s = Math.sin(a);
  return { x: c * v.x - s * v.z, y: v.y, z: s * v.x + c * v.z };
}

/** J2000 → 历元 year 的岁差旋转矩阵 P 作用于单位向量 */
function applyP(v: Vec3, year: number): Vec3 {
  const { zeta, z, theta } = precessionAngles(year);
  // P = Rz(−z) · Ry(+θ) · Rz(−ζ)；rotY(v, −θ) 即 Ry(+θ)
  return rotZm(rotY(rotZm(v, zeta), -theta), z);
}

/** P 的逆（正交矩阵转置）作用于单位向量 */
function applyPinv(v: Vec3, year: number): Vec3 {
  const { zeta, z, theta } = precessionAngles(year);
  // Pᵀ = Rz(ζ) · Ry(−θ) · Rz(z)；rotY(v, +θ) 即 Ry(−θ)
  const c1 = Math.cos(z), s1 = Math.sin(z);
  let r: Vec3 = { x: c1 * v.x - s1 * v.y, y: s1 * v.x + c1 * v.y, z: v.z };
  r = rotY(r, theta);
  const c2 = Math.cos(zeta), s2 = Math.sin(zeta);
  r = { x: c2 * r.x - s2 * r.y, y: s2 * r.x + c2 * r.y, z: r.z };
  return r;
}

function toRaDec(v: Vec3): { ra: number; dec: number } {
  let ra = Math.atan2(v.y, v.x) * R2D;
  if (ra < 0) ra += 360;
  return { ra, dec: Math.asin(Math.min(1, Math.max(-1, v.z))) * R2D };
}

/**
 * 恒星 J2000 坐标 → 历元 year 的视赤道坐标（仅岁差，不含章动/自行/光行差）。
 */
export function precess(raDeg: number, decDeg: number, year: number): { ra: number; dec: number } {
  if (year === 2000) return { ra: raDeg, dec: decDeg };
  const ra = raDeg * D2R;
  const dec = decDeg * D2R;
  const v: Vec3 = {
    x: Math.cos(dec) * Math.cos(ra),
    y: Math.cos(dec) * Math.sin(ra),
    z: Math.sin(dec),
  };
  // applyP 组合出的实际是 P_true⁻¹（由北极星历元测试判定），故用 applyPinv
  return toRaDec(applyPinv(v, year));
}

/**
 * 历元 year 的北天极在 J2000 坐标中的方向（画天极漂移轨迹用）。
 */
export function poleAt(year: number): { ra: number; dec: number } {
  if (year === 2000) return { ra: 0, dec: 90 };
  return toRaDec(applyP({ x: 0, y: 0, z: 1 }, year));
}
