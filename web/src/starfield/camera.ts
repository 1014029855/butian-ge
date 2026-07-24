/** 平移缩放相机。toScreen: s = (w + t) * k；k 即"世界弧度 → 屏幕 px"缩放。 */
export class Camera {
  k = 1;
  tx = 0;
  ty = 0;

  toScreen(wx: number, wy: number): { x: number; y: number } {
    return { x: (wx + this.tx) * this.k, y: (wy + this.ty) * this.k };
  }

  toWorld(sx: number, sy: number): { x: number; y: number } {
    return { x: sx / this.k - this.tx, y: sy / this.k - this.ty };
  }

  pan(dxScreen: number, dyScreen: number): void {
    this.tx += dxScreen / this.k;
    this.ty += dyScreen / this.k;
  }

  /** 以屏幕点 (sx, sy) 为锚缩放，锚点世界坐标保持不变。 */
  zoomAt(sx: number, sy: number, factor: number): void {
    const w = this.toWorld(sx, sy);
    this.k = Math.min(20000, Math.max(20, this.k * factor));
    this.tx = sx / this.k - w.x;
    this.ty = sy / this.k - w.y;
  }

  /** 让半径 radius 的世界圆盘完整入画并居中。 */
  fit(radius: number, viewportW: number, viewportH: number, padding: number): void {
    this.k = (Math.min(viewportW, viewportH) - 2 * padding) / (2 * radius);
    this.tx = viewportW / (2 * this.k);
    this.ty = viewportH / (2 * this.k);
  }

  /** "cover" 适配：天球铺满整个视口（宽屏两侧不留白），溢出边缘被裁掉。 */
  coverFit(radius: number, viewportW: number, viewportH: number, bleed = 1.08): void {
    this.k = (Math.max(viewportW, viewportH) * bleed) / (2 * radius);
    this.tx = viewportW / (2 * this.k);
    this.ty = viewportH / (2 * this.k);
  }
}
