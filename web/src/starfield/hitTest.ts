/** 在世界坐标系中找距 (wx, wy) 最近的星，超过 maxDist（世界单位）返回 -1。
 *  可选 filter：只考虑通过的星（如只命中星官成员星）。 */
export function hitTestStar<T extends { x: number; y: number }>(
  stars: T[],
  wx: number,
  wy: number,
  maxDist: number,
  filter?: (s: T) => boolean,
): number {
  let best = -1;
  let bestD2 = maxDist * maxDist;
  for (let i = 0; i < stars.length; i++) {
    if (filter && !filter(stars[i])) continue;
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
