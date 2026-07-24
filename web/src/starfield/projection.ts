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

export interface Projector {
  (raDeg: number, decDeg: number): { x: number; y: number };
}

/**
 * 通用方位等距投影：以任意 (centerRa, centerDec) 为投影中心。
 * 拖动中心即"转动天球"。中心取北天极 (任意, 90°) 时退化为 project()。
 *
 * 公式：cos c = sinδ0·sinδ + cosδ0·cosδ·cos(α−α0)，k = c / sin c
 *   x =  k · cosδ·sin(α−α0)
 *   y =  k · (cosδ0·sinδ − sinδ0·cosδ·cos(α−α0))
 * （y 取屏幕向下为正，北天极中心时 y = −ρ·cosα，与 project() 一致）
 */
export function makeProjector(centerRaDeg: number, centerDecDeg: number): Projector {
  const a0 = centerRaDeg * D2R;
  const d0 = centerDecDeg * D2R;
  const sinD0 = Math.sin(d0);
  const cosD0 = Math.cos(d0);
  return (raDeg: number, decDeg: number) => {
    const da = raDeg * D2R - a0;
    const d = decDeg * D2R;
    const sinD = Math.sin(d);
    const cosD = Math.cos(d);
    const cosDa = Math.cos(da);
    let cosc = sinD0 * sinD + cosD0 * cosD * cosDa;
    cosc = Math.min(1, Math.max(-1, cosc));
    const c = Math.acos(cosc);
    const k = c < 1e-9 ? 1 : c / Math.sin(c);
    return {
      x: k * cosD * Math.sin(da),
      y: k * (cosD0 * sinD - sinD0 * cosD * cosDa),
    };
  };
}

/**
 * 正射投影（orthographic）：从无穷远处平视一个天球——
 * "转地球仪"的视觉。只显示朝向观察者的半球，背面由 visible=false 标出。
 * 世界坐标半径范围 [0, 1]。
 */
export interface OrthoPoint { x: number; y: number; visible: boolean }
export interface OrthoProjector {
  (raDeg: number, decDeg: number): OrthoPoint;
}

export function makeOrthoProjector(centerRaDeg: number, centerDecDeg: number): OrthoProjector {
  const a0 = centerRaDeg * D2R;
  const d0 = centerDecDeg * D2R;
  const sinD0 = Math.sin(d0);
  const cosD0 = Math.cos(d0);
  return (raDeg: number, decDeg: number): OrthoPoint => {
    const da = raDeg * D2R - a0;
    const d = decDeg * D2R;
    const sinD = Math.sin(d);
    const cosD = Math.cos(d);
    const cosDa = Math.cos(da);
    const cosc = sinD0 * sinD + cosD0 * cosD * cosDa;
    return {
      x: cosD * Math.sin(da),
      // 屏幕 y 向下为正：北半天（δ 高）的点应在上方，故取负
      y: -(cosD0 * sinD - sinD0 * cosD * cosDa),
      visible: cosc >= -0.02, // 边缘留一点 bleed，避免贴边星闪没
    };
  };
}
