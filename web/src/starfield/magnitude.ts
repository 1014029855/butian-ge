/** 星等 → 渲染半径（px，世界坐标缩放前基准值），单调不增，clamp [0.9, 2.6]。 */
export function magToRadius(mag: number): number {
  const r = 2.6 * Math.pow(10, -0.09 * (mag + 1));
  return Math.min(2.6, Math.max(0.9, r));
}

/** 星等 → 基准透明度，亮星更实，区间 [0.35, 1]。 */
export function magToAlpha(mag: number): number {
  const a = 1 - 0.65 * ((mag + 1) / 7.2);
  return Math.min(1, Math.max(0.35, a));
}
