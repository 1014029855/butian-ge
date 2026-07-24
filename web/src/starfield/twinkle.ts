export interface TwinkleParams {
  duration: number;
  omin: number;
  omax: number;
  phase: number;
}

/** 每颗星独立的闪烁参数：周期 2.4–7.6s，暗亮区间随机，负相位错峰。 */
export function makeTwinkleParams(rand: () => number): TwinkleParams {
  const duration = 2.4 + rand() * 5.2;
  const omin = 0.05 + rand() * 0.21;
  const omax = Math.min(0.94, Math.max(0.13, omin + 0.08 + rand() * 0.7));
  return { duration, omin, omax, phase: rand() };
}

/** 余弦插值闪烁透明度，返回值 ∈ [omin, omax]。 */
export function twinkleOpacity(p: TwinkleParams, tSec: number): number {
  const k = 0.5 - 0.5 * Math.cos(2 * Math.PI * (tSec / p.duration + p.phase));
  return p.omin + (p.omax - p.omin) * k;
}
