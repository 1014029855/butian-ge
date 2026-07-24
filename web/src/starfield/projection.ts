const D2R = Math.PI / 180;

/**
 * 北天极方位等距投影（azimuthal equidistant, 北天极为原点）。
 * 与苏州石刻天文图同法：距角 ρ = 90° − δ，方位角即赤经（顺时针为正，
 * 仰观北天视角）。输出单位：弧度制角距，渲染缩放由 camera 负责。
 */
export function project(raDeg: number, decDeg: number): { x: number; y: number } {
  const rho = (90 - decDeg) * D2R;
  const theta = raDeg * D2R;
  return { x: rho * Math.sin(theta), y: -rho * Math.cos(theta) };
}
