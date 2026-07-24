import type { Camera } from "./camera";

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export interface CamState { k: number; tx: number; ty: number }

export function snapshot(c: Camera): CamState {
  return { k: c.k, tx: c.tx, ty: c.ty };
}

/** 在两组相机状态间插值并写回 cam。t ∈ [0,1]，内部做 easeInOut。 */
export function lerpCamera(cam: Camera, from: CamState, to: CamState, t: number): void {
  const e = easeInOut(Math.min(1, Math.max(0, t)));
  cam.k = from.k + (to.k - from.k) * e;
  cam.tx = from.tx + (to.tx - from.tx) * e;
  cam.ty = from.ty + (to.ty - from.ty) * e;
}

/** 由世界坐标包围盒计算目标相机：内容占视口短边的 frac。 */
export function camForBBox(
  minX: number, minY: number, maxX: number, maxY: number,
  viewportW: number, viewportH: number, frac = 0.72,
): CamState {
  const w = Math.max(1e-6, maxX - minX);
  const h = Math.max(1e-6, maxY - minY);
  const k = Math.min(viewportW, viewportH) * frac / Math.max(w, h);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return { k, tx: viewportW / (2 * k) - cx, ty: viewportH / (2 * k) - cy };
}
