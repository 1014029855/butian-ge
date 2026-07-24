/**
 * 流星粒子：随机划过天空的拖尾光痕。
 * 纯氛围层，不交互；spawn 间隔 3~9 秒，生命周期约 0.9 秒。
 */

interface Meteor {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  t0: number;
  dur: number;
}

export class MeteorShower {
  private meteors: Meteor[] = [];
  private nextAt = 2.5;
  private rngState = 20260724;

  private rand(): number {
    // xorshift32，避免依赖 Math.random 便于稳定性
    let x = this.rngState;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    this.rngState = x >>> 0;
    return this.rngState / 0xffffffff;
  }

  update(tSec: number, w: number, h: number): void {
    if (tSec >= this.nextAt) {
      const fromLeft = this.rand() < 0.5;
      const x0 = (fromLeft ? 0.1 + this.rand() * 0.5 : 0.4 + this.rand() * 0.5) * w;
      const y0 = this.rand() * 0.35 * h;
      const len = (0.18 + this.rand() * 0.22) * w;
      const dir = fromLeft ? 1 : -1;
      this.meteors.push({
        x0, y0,
        x1: x0 + dir * len,
        y1: y0 + len * (0.25 + this.rand() * 0.3),
        t0: tSec,
        dur: 0.7 + this.rand() * 0.5,
      });
      this.nextAt = tSec + 3 + this.rand() * 6;
    }
    this.meteors = this.meteors.filter((m) => tSec - m.t0 < m.dur);
  }

  /** 在 renderSky 之后调用（加色混合，拖尾渐隐）。 */
  draw(ctx: CanvasRenderingContext2D, tSec: number): void {
    if (!this.meteors.length) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const m of this.meteors) {
      const u = (tSec - m.t0) / m.dur;
      if (u < 0 || u > 1) continue;
      // 头部位置；拖尾占轨迹 22%
      const head = u;
      const tail = Math.max(0, u - 0.22);
      const hx = m.x0 + (m.x1 - m.x0) * head;
      const hy = m.y0 + (m.y1 - m.y0) * head;
      const tx = m.x0 + (m.x1 - m.x0) * tail;
      const ty = m.y0 + (m.y1 - m.y0) * tail;
      const fade = Math.sin(Math.PI * Math.min(1, u * 1.15)); // 渐入渐出
      const g = ctx.createLinearGradient(tx, ty, hx, hy);
      g.addColorStop(0, "rgba(252,225,182,0)");
      g.addColorStop(1, `rgba(252,235,200,${0.75 * fade})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(hx, hy);
      ctx.stroke();
      // 头部亮点
      ctx.fillStyle = `rgba(255,246,220,${0.9 * fade})`;
      ctx.beginPath();
      ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
