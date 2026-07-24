import type { SupportReport } from "../starfield/support";

/**
 * Canvas 2D 不可用时的降级界面：
 * 隐藏所有依赖画布渲染的章节，显示静态说明页与诊断信息，
 * 保证评审/用户在极端环境下也能看到作品介绍与数据出处。
 */
export function enterFallback(support: SupportReport): void {
  const yn = (b: boolean): string => (b ? "✓" : "✗");

  const diag = document.getElementById("fallback-diag");
  if (diag) {
    diag.textContent =
      `环境诊断 — Canvas 2D ${yn(support.canvas2d)} · ` +
      `WebGL ${yn(support.webgl)} · WebGL2 ${yn(support.webgl2)} · WebGPU ${yn(support.webgpu)}`;
  }

  const sky = document.getElementById("sky");
  if (sky) sky.style.display = "none";
  document.querySelectorAll<HTMLElement>(".chapter").forEach((s) => {
    s.style.display = "none";
  });

  const el = document.getElementById("fallback");
  if (el) el.hidden = false;
}

/**
 * 子画布（圭表 / 东西对比）独立降级：
 * 主星图可用、但某个小画布上下文创建失败时，原地换成一句说明。
 */
export function fallbackNote(canvas: HTMLCanvasElement, text: string): void {
  const note = document.createElement("p");
  note.className = "canvas-fallback-note";
  note.textContent = text;
  canvas.replaceWith(note);
}
