import type { SkyView } from "../scroll/view";
import type { Camera } from "../starfield/camera";

/**
 * 序章：cinematic 开场。
 * 镜头从北天极深处（6 倍放大）随滚动缓缓拉升，到整片星野尽收眼底；
 * 星空缓慢自转，连线渐显。
 */
let baseK: number | null = null;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function updatePrologue(view: SkyView, camera: Camera, p: number): void {
  // 拉升镜头：前 55% 进度内从 5.2 倍近景拉到 coverFit 全景
  if (baseK === null) baseK = camera.k; // 进入时为 coverFit 值
  const pull = easeOutCubic(Math.min(1, p / 0.55));
  camera.k = baseK * (5.2 - (5.2 - 1) * pull);
  camera.tx = window.innerWidth / (2 * camera.k);
  camera.ty = window.innerHeight / (2 * camera.k);

  view.rotation = p * 0.4 + (1 - pull) * 0.35; // 近景时转得稍快，有穿越感
  view.showLines = p > 0.18;
  view.dimStarAlpha = 1;
  view.revealAlpha = () => Math.min(0.45, Math.max(0, (p - 0.18) * 0.8));
  view.highlight = null;
  view.visible = null;
  view.labels = [];
  view.freeExplore = false;

  const cue = document.getElementById("scroll-cue");
  if (cue) cue.style.opacity = String(Math.max(0, 1 - p * 4));

  // 巨幅书法：滚动时缓慢推近放大，尾段淡出；文字块向左漂移
  const hero = document.getElementById("hero-brush");
  if (hero) {
    hero.style.transform = `scale(${(1 + p * 0.16).toFixed(4)}) translateY(${(-p * 4).toFixed(2)}vh)`;
    hero.style.opacity = String(Math.max(0, 0.94 * (1 - Math.max(0, (p - 0.72) / 0.28))));
  }
  const center = document.querySelector<HTMLElement>(".prologue-center");
  if (center) {
    const drift = Math.max(0, (p - 0.55) / 0.45);
    center.style.transform = `translateX(${(-drift * 7).toFixed(2)}vw)`;
    center.style.opacity = String(1 - drift);
  }
}

/** 离开序章后 baseK 作废，回章时重新采样。 */
export function resetPrologue(): void {
  baseK = null;
}
