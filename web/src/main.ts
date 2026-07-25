import "./style.css";
import { Camera } from "./starfield/camera";
import { hitTestStar } from "./starfield/hitTest";
import {
  buildLayout,
  renderSky,
  beginMorph,
  type StarsJson,
  type AsterismsJson,
  type SkyLayout,
} from "./starfield/renderer";
import { project } from "./starfield/projection";
import { MeteorShower } from "./starfield/meteors";
import { enterFallback } from "./ui/fallback";
import { initCursor } from "./ui/cursor";
import { detectSupport } from "./starfield/support";
import { registerChapter, startScrollManager } from "./scroll/scrollManager";
import { defaultView, type SkyView } from "./scroll/view";
import { updatePrologue, resetPrologue } from "./chapters/prologue";
import { initAtlasDom, updateAtlas } from "./chapters/atlas";
import { initGnomon, updateGnomon } from "./chapters/gnomon";
import { updateZiwei } from "./chapters/ziwei";
import { initEastWest, updateEastWest } from "./chapters/eastwest";
import { initGlobe, updateGlobe, leaveGlobe, tickGlobe, drawGlobeOverlay } from "./chapters/globe";
import { initEpoch, updateEpoch, leaveEpoch, drawEpochOverlay, tickEpoch } from "./chapters/epoch";
import {
  initFocus,
  enterFocus,
  exitFocus,
  focusActive,
  tickFocus,
  applyFocusView,
  drawFocusOverlay,
} from "./chapters/focus";

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

const meteors = new MeteorShower();

/** 主星图的渲染模式：平面投影 / 天球仪 / 岁差时间机 */
type RenderMode = "flat" | "globe" | "epoch";
let mode: RenderMode = "flat";
let currentChapterId = "";

function setChapter(id: string): void {
  currentChapterId = id;
  const next: RenderMode = id === "ch-globe" ? "globe" : id === "ch-epoch" ? "epoch" : "flat";
  if (next !== mode) {
    mode = next;
    // 从球仪/时间机切回平面：星点飞回原位（globe/epoch 的入场 morph 由各自模块触发）
    if (mode === "flat" && layout) beginMorph(layout, project, performance.now());
    lastFrame = 0;
  }
  if (id !== "ch-globe") leaveGlobe();
  if (id !== "ch-epoch") leaveEpoch();
  if (id !== "ch-prologue") resetPrologue();
  // 聚焦态在换章时退出
  if (focusActive()) exitFocus(performance.now());
  // 章节文字入场动画
  document.querySelectorAll(".chapter").forEach((el) => el.classList.remove("inview"));
  document.getElementById(id)?.classList.add("inview");
}

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
  initGlobe(canvas, layout, camera, view, card);
  initEpoch(layout, () => { lastFrame = 0; });
  void initEastWest(layout, starsJson);
  initFocus(layout, () => {
    // 聚焦退出完成后，让滚动管理器重推一次视图状态
    window.dispatchEvent(new Event("scroll"));
  });

  registerChapter("ch-prologue", (p) => { updatePrologue(view, camera, p); });
  registerChapter("ch-atlas", (p) => {
    atlasActive = true;
    if (layout && fullFit && p < 0.05 && !view.freeExplore) {
      // 从紫微垣章节滚回时恢复全景
      camera.k = fullFit.k; camera.tx = fullFit.tx; camera.ty = fullFit.ty;
    }
    updateAtlas(view, layout!, camera, p);
  });
  registerChapter("ch-gnomon", () => { updateGnomon(view); });
  registerChapter("ch-ziwei", (p) => { updateZiwei(view, layout!, camera, p); });
  registerChapter("ch-globe", () => { updateGlobe(view, camera); });
  registerChapter("ch-epoch", () => { updateEpoch(view, camera); });
  registerChapter("ch-eastwest", () => { updateEastWest(view); });
  registerChapter("ch-credits", () => { /* 尾声：静态章节 */ });

  startScrollManager(
    () => { lastFrame = 0; },
    (id) => { setChapter(id); },
  );
  requestAnimationFrame(tick);
}

function tick(nowMs: number): void {
  requestAnimationFrame(tick);
  if (!layout) return;
  // morph 动画完成判定
  const morphing = layout.morph !== null;
  if (morphing && nowMs - layout.morph!.t0 >= layout.morph!.dur) layout.morph = null;
  const globeDirty = mode === "globe" && tickGlobe(nowMs);
  const epochDirty = mode === "epoch" && tickEpoch(nowMs);
  const focusDirty = tickFocus(camera, nowMs);
  if (focusActive()) applyFocusView(view, nowMs);
  if (!globeDirty && !epochDirty && !focusDirty && !morphing && nowMs - lastFrame < 33) return;
  lastFrame = nowMs;
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.classList.toggle("interactive", (view.freeExplore && atlasActive) || mode === "globe");
  const globeMode = mode === "globe";
  if (globeMode) {
    ctx.clearRect(0, 0, W, H);
    drawGlobeOverlay(ctx, camera, W, H);
  }
  renderSky(ctx, camera, layout, nowMs / 1000, W, H, {
    highlightIndices: view.highlight,
    rotation: view.rotation,
    revealAlpha: view.revealAlpha ?? undefined,
    dimStarAlpha: view.dimStarAlpha,
    visibleAsterisms: view.visible,
    labelIndices: view.labels,
    showLines: view.showLines,
    skipClear: globeMode,
  });
  if (mode === "epoch") drawEpochOverlay(ctx, camera, layout);
  drawFocusOverlay(ctx, camera, layout, nowMs, view.rotation);
  meteors.update(nowMs / 1000, W, H);
  meteors.draw(ctx, nowMs / 1000);
}

/* ---------- 自由探索交互（仅星野漫游章节末段开放） ---------- */

// 以下交互与渲染循环依赖 Canvas 2D 上下文，检测失败时整体跳过。
if (ctxNull) {
  let dragging = false;
  let downX = 0;
  let downY = 0;
  let moved = 0;

  function interactive(): boolean {
    return view.freeExplore && atlasActive && layout !== null && !focusActive();
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
    if (!dragging && !focusActive()) return;
    dragging = false;
    canvas.classList.remove("dragging");
    if (!layout) return;
    // 聚焦态下轻击：返回星野（聚焦中不响应拖拽，pointerdown 未启动）
    if (focusActive()) {
      exitFocus(performance.now());
      return;
    }
    if (!interactive()) return;
    if (moved < 4) {
      const w = camera.toWorld(e.clientX, e.clientY);
      const idx = hitTestStar(
        layout.stars, w.x, w.y, 10 / camera.k,
        (s) => layout!.starAsterism.has(s.hip),
      );
      if (idx >= 0) {
        const ai = layout.starAsterism.get(layout.stars[idx].hip);
        if (ai !== undefined) {
          // 步入星官：相机飞入，成员星逐一点名
          enterFocus(ai, view, camera, performance.now());
          lastFrame = 0;
          return;
        }
      }
      view.highlight = null;
      view.labels = [];
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

  window.addEventListener("scroll", () => {
    atlasActive = false;
    if (focusActive()) exitFocus(performance.now());
  }, { passive: true, capture: true });
  window.addEventListener("resize", () => { resize(); lastFrame = 0; });

  initCursor();
  // dev 调试钩子：测试脚本用来精确定位星点
  if (import.meta.env.DEV) {
    (window as unknown as { __btg: unknown }).__btg = {
      get layout() { return layout; },
      camera,
      view,
    };
  }
  void boot();
}
