import "./style.css";
import { Camera } from "./starfield/camera";
import { hitTestStar } from "./starfield/hitTest";
import {
  buildLayout,
  renderSky,
  type StarsJson,
  type AsterismsJson,
  type SkyLayout,
} from "./starfield/renderer";
import { showDetailCard, hideDetailCard } from "./ui/detailCard";

const canvas = document.getElementById("sky") as HTMLCanvasElement;
const card = document.getElementById("detail-card") as HTMLElement;
const ctx = canvas.getContext("2d")!;

const camera = new Camera();
let layout: SkyLayout | null = null;
let highlight: number | null = null;
let lastFrame = 0;

function resize(): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

async function boot(): Promise<void> {
  resize();
  camera.fit(Math.PI, window.innerWidth, window.innerHeight, 48);
  const [starsRes, asterismsRes] = await Promise.all([
    fetch("data/stars.json"),
    fetch("data/asterisms.json"),
  ]);
  layout = buildLayout(
    (await starsRes.json()) as StarsJson,
    (await asterismsRes.json()) as AsterismsJson,
  );
  requestAnimationFrame(tick);
}

function tick(nowMs: number): void {
  requestAnimationFrame(tick);
  if (!layout || nowMs - lastFrame < 33) return; // 闪烁 30fps 足够，省 CPU
  lastFrame = nowMs;
  renderSky(ctx, camera, layout, nowMs / 1000, highlight, window.innerWidth, window.innerHeight);
}

/* ---------- 交互：拖拽 / 缩放 / 点击 ---------- */

let dragging = false;
let downX = 0;
let downY = 0;
let moved = 0;

canvas.addEventListener("pointerdown", (e) => {
  dragging = true;
  moved = 0;
  downX = e.clientX;
  downY = e.clientY;
  canvas.classList.add("dragging");
  canvas.setPointerCapture(e.pointerId);
});

canvas.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - downX;
  const dy = e.clientY - downY;
  moved += Math.abs(dx) + Math.abs(dy);
  camera.pan(dx, dy);
  downX = e.clientX;
  downY = e.clientY;
});

canvas.addEventListener("pointerup", (e) => {
  dragging = false;
  canvas.classList.remove("dragging");
  if (!layout) return;
  if (moved < 4) {
    // 视为点击
    const w = camera.toWorld(e.clientX, e.clientY);
    const idx = hitTestStar(layout.stars, w.x, w.y, 10 / camera.k);
    if (idx >= 0) {
      const ai = layout.starAsterism.get(layout.stars[idx].hip);
      if (ai !== undefined) {
        highlight = ai;
        showDetailCard(card, layout.asterisms[ai], { x: e.clientX, y: e.clientY });
        lastFrame = 0;
        return;
      }
    }
    highlight = null;
    hideDetailCard(card);
    lastFrame = 0;
  }
});

canvas.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    camera.zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.001));
    lastFrame = 0;
  },
  { passive: false },
);

window.addEventListener("resize", () => {
  resize();
  lastFrame = 0;
});

void boot();
