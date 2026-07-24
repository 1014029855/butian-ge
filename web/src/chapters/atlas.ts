import type { SkyView } from "../scroll/view";
import type { SkyLayout } from "../starfield/renderer";
import { resolveGroups } from "../data/groups";
import { Camera } from "../starfield/camera";

const INTRO_END = 0.05;
const GROUP_SPAN = 0.105; // 每组窗口宽度
const FREE_START = INTRO_END + GROUP_SPAN * 7; // 0.785

let panelEls: HTMLElement[] = [];
let hintEl: HTMLElement | null = null;

export function initAtlasDom(): void {
  panelEls = Array.from(document.querySelectorAll<HTMLElement>(".atlas-panel"));
  hintEl = document.getElementById("explore-hint");
}

export function updateAtlas(
  view: SkyView, layout: SkyLayout, camera: Camera, p: number,
): void {
  const groups = resolveGroups(layout);
  view.rotation = 0;
  view.showLines = true;
  view.visible = null;
  view.labels = [];
  view.dimStarAlpha = 1;

  if (p >= FREE_START) {
    // 自由探索：全量连线，开放交互
    view.revealAlpha = () => 0.45;
    view.highlight = null;
    view.freeExplore = true;
    if (hintEl) hintEl.style.opacity = "1";
    setActivePanel(panelEls.length - 1);
    return;
  }
  view.freeExplore = false;
  if (hintEl) hintEl.style.opacity = "0";

  if (p < INTRO_END) {
    view.revealAlpha = () => 0;
    view.highlight = null;
    setActivePanel(0);
    return;
  }

  const gi = Math.min(groups.length - 1, Math.floor((p - INTRO_END) / GROUP_SPAN));
  const sub = (p - INTRO_END - gi * GROUP_SPAN) / GROUP_SPAN;

  const revealed = new Set<number>();
  groups.slice(0, gi).forEach((g) => g.indices.forEach((i) => revealed.add(i)));
  const current = new Set(groups[gi].indices);

  view.revealAlpha = (ai: number) => {
    if (current.has(ai)) return 0.4 + 0.55 * Math.min(1, sub * 1.6);
    if (revealed.has(ai)) return 0.4;
    return 0;
  };
  view.highlight = current;
  view.labels = groups[gi].indices.slice(0, 3); // 当前组最多标 3 个名
  setActivePanel(gi + 1);
}

function setActivePanel(idx: number): void {
  panelEls.forEach((el, i) => el.classList.toggle("active", i === idx));
}
