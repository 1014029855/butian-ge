import type { SkyView } from "../scroll/view";

/** 序章：星空缓慢自转，连线渐显，标题由 CSS/DOM 承担。 */
export function updatePrologue(view: SkyView, p: number): void {
  view.rotation = p * 0.4;
  view.showLines = p > 0.18;
  view.dimStarAlpha = 1;
  view.revealAlpha = () => Math.min(0.45, Math.max(0, (p - 0.18) * 0.8));
  view.highlight = null;
  view.visible = null;
  view.labels = [];
  view.freeExplore = false;

  const cue = document.getElementById("scroll-cue");
  if (cue) cue.style.opacity = String(Math.max(0, 1 - p * 4));
}
