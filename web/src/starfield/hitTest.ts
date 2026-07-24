/** 在世界坐标系中找距 (wx, wy) 最近的星，超过 maxDist（世界单位）返回 -1。 */
export function hitTestStar(
  stars: { x: number; y: number }[],
  wx: number,
  wy: number,
  maxDist: number,
): number {
  let best = -1;
  let bestD2 = maxDist * maxDist;
  for (let i = 0; i < stars.length; i++) {
    const dx = stars[i].x - wx;
    const dy = stars[i].y - wy;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      bestD2 = d2;
      best = i;
    }
  }
  return best;
}
