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
import { enterFallback } from "./ui/fallback";
import { detectSupport } from "./starfield/support";
import { registerChapter, startScrollManager } from "./scroll/scrollManager";
import { defaultView, type SkyView } from "./scroll/view";
import { updatePrologue } from "./chapters/prologue";
import { initAtlasDom, updateAtlas } from "./chapters/atlas";
import { initGnomon, updateGnomon } from "./chapters/gnomon";
import { updateZiwei } from "./chapters/ziwei";
import { initEastWest, updateEastWest } from "./chapters/eastwest";

const canvas = document.getElementById("sky") as HTMLCanvasElement;
const card = document.getElementById("detail-card") as HTMLElement;

// 渲染能力检测：Canvas 2D 不可用（隐私模式/内存不足/老旧 WebView）时
// 进入静态降级页，不再启动交互逻辑。
const support = detectSupport();
const ctxNull = support.canvas2d ? canvas.getContext("2d") : null;
if (!ctxNull) enterFallback(support);
const ctx = ctxNull!;

const camera = new Camera();
const view: SkyView = defaultView();
let layout: SkyLayout | null = null;
let starsJson: StarsJson | null = null;
let atlasActive = false;
let lastFrame = 0;
let fullFit: { k: number; tx: number; ty: number } | null = null;

function resize(): void {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

async function boot(): Promise<void> {
  resize();
  camera.coverFit(Math.PI, window.innerWidth, window.innerHeight);
  fullFit = { k: camera.k, tx: camera.tx, ty: camera.ty };

  const [starsRes, asterismsRes] = await Promise.all([
    fetch("data/stars.json"),
    fetch("data/asterisms.json"),
  ]);
  starsJson = (await starsRes.json()) as StarsJson;
  layout = buildLayout(starsJson, (await asterismsRes.json()) as AsterismsJson);

  initAtlasDom();
  initGnomon();
  void initEastWest(layout, starsJson);

  registerChapter("ch-prologue", (p) => updatePrologue(view, p));
  registerChapter("ch-atlas", (p) => {
    atlasActive = true;
    if (layout && fullFit && p < 0.05 && !view.freeExplore) {
      // 从紫微垣章节滚回时恢复全景
      camera.k = fullFit.k; camera.tx = fullFit.tx; camera.ty = fullFit.ty;
    }
    updateAtlas(view, layout!, camera, p);
  });
  registerChapter("ch-gnomon", () => updateGnomon(view));
  registerChapter("ch-ziwei", (p) => updateZiwei(view, layout!, camera, p));
  registerChapter("ch-eastwest", () => updateEastWest(view));
  registerChapter("ch-credits", () => {});

  startScrollManager(() => { lastFrame = 0; });
  requestAnimationFrame(tick);
}

function tick(nowMs: number): void {
  requestAnimationFrame(tick);
  if (!layout || nowMs - lastFrame < 33) return;
  lastFrame = nowMs;
  canvas.classList.toggle("interactive", view.freeExplore && atlasActive);
  renderSky(ctx, camera, layout, nowMs / 1000, window.innerWidth, window.innerHeight, {
    highlightIndices: view.highlight,
    rotation: view.rotation,
    revealAlpha: view.revealAlpha ?? undefined,
    dimStarAlpha: view.dimStarAlpha,
    visibleAsterisms: view.visible,
    labelIndices: view.labels,
    showLines: view.showLines,
  });
}

/* ---------- 自由探索交互（仅星野漫游章节末段开放） ---------- */

// 以下交互与渲染循环依赖 Canvas 2D 上下文，检测失败时整体跳过。
if (ctxNull) {
  let dragging = false;
  let downX = 0;
  let downY = 0;
  let moved = 0;

  function interactive(): boolean {
    return view.freeExplore && atlasActive && layout !== null;
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (!interactive()) return;
    dragging = true;
    moved = 0;
    downX = e.clientX;
    downY = e.clientY;
    canvas.classList.add("dragging");
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!dragging || !interactive()) return;
    const dx = e.clientX - downX;
    const dy = e.clientY - downY;
    moved += Math.abs(dx) + Math.abs(dy);
    camera.pan(dx, dy);
    downX = e.clientX;
    downY = e.clientY;
    lastFrame = 0;
  });

  canvas.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove("dragging");
    if (!interactive() || !layout) return;
    if (moved < 4) {
      const w = camera.toWorld(e.clientX, e.clientY);
      const idx = hitTestStar(layout.stars, w.x, w.y, 10 / camera.k);
      if (idx >= 0) {
        const ai = layout.starAsterism.get(layout.stars[idx].hip);
        if (ai !== undefined) {
          view.highlight = new Set([ai]);
          view.labels = [ai];
          showDetailCard(card, layout.asterisms[ai], { x: e.clientX, y: e.clientY });
          lastFrame = 0;
          return;
        }
      }
      view.highlight = null;
      view.labels = [];
      hideDetailCard(card);
      lastFrame = 0;
    }
  });

  canvas.addEventListener(
    "wheel",
    (e) => {
      if (!interactive()) return; // 非探索态不拦截滚轮，正常滚动页面
      e.preventDefault();
      camera.zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.001));
      lastFrame = 0;
    },
    { passive: false },
  );

  window.addEventListener("scroll", () => { atlasActive = false; }, { passive: true, capture: true });
  window.addEventListener("resize", () => { resize(); lastFrame = 0; });

  void boot();
}
