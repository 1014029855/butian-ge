import type { SkyView } from "../scroll/view";
import type { SkyLayout } from "../starfield/renderer";
import { reprojectLayout, beginMorph } from "../starfield/renderer";
import { makeOrthoProjector } from "../starfield/projection";
import { hitTestStar } from "../starfield/hitTest";
import { showDetailCard, hideDetailCard } from "../ui/detailCard";
import type { Camera } from "../starfield/camera";

/**
 * 揽星为球：把平面星图团成一颗可以上手转动的天球（正射投影）。
 * - 拖拽：转动投影中心；松手带惯性滑行
 * - 空闲 2 秒后恢复自动慢转
 * - 入场时给一记角速度冲击，星图甩成球
 */

let centerRa = 0;
let centerDec = 20;
let velRa = 0;   // 度/秒
let velDec = 0;
let dragging = false;
let lastX = 0;
let lastY = 0;
let lastT = 0;
let lastInteract = 0;
let entered = false;
let active = false;
let layoutRef: SkyLayout | null = null;
let viewRef: SkyView | null = null;
let cameraRef: Camera | null = null;
let cardRef: HTMLElement | null = null;
let dirty = true;
let zoomK = 1; // 用户滚轮缩放系数（相对 fit）
let dragMoved = 0;

const AUTO_SPIN = 3.5; // 自动慢转角速度（度/秒）

export function initGlobe(
  canvas: HTMLCanvasElement,
  layout: SkyLayout,
  camera: Camera,
  view: SkyView,
  card: HTMLElement,
): void {
  layoutRef = layout;
  cameraRef = camera;
  viewRef = view;
  cardRef = card;

  canvas.addEventListener("pointerdown", (e) => {
    if (!active) return;
    dragging = true;
    dragMoved = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = performance.now();
    velRa = 0;
    velDec = 0;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!dragging || !active) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastT) / 1000;
    const dRa = (e.clientX - lastX) * 0.18;
    const dDec = (e.clientY - lastY) * 0.18;
    dragMoved += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
    centerRa = (centerRa + dRa + 360) % 360;
    centerDec = Math.min(89, Math.max(-89, centerDec + dDec));
    velRa = dRa / dt;
    velDec = dDec / dt;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
    lastInteract = now;
    dirty = true;
  });

  const end = (e?: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    lastInteract = performance.now();
    // 惯性限速，避免甩飞
    velRa = Math.min(240, Math.max(-240, velRa));
    velDec = Math.min(180, Math.max(-180, velDec));
    // 轻击（几乎没拖动）→ 点击星官看详情（只命中星官成员星）
    if (e && dragMoved < 5 && active && layoutRef && cameraRef && viewRef) {
      const w = cameraRef.toWorld(e.clientX, e.clientY);
      const idx = hitTestStar(
        layoutRef.stars, w.x, w.y, 10 / cameraRef.k,
        (s) => layoutRef!.starAsterism.has(s.hip),
      );
      if (idx >= 0) {
        const ai = layoutRef.starAsterism.get(layoutRef.stars[idx].hip);
        if (ai !== undefined) {
          viewRef.highlight = new Set([ai]);
          viewRef.labels = [ai];
          if (cardRef) showDetailCard(cardRef, layoutRef.asterisms[ai], { x: e.clientX, y: e.clientY });
          dirty = true;
          return;
        }
      }
      viewRef.highlight = null;
      viewRef.labels = [];
      if (cardRef) hideDetailCard(cardRef);
      dirty = true;
    }
  };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", () => end());

  // 滚轮缩放（仅在球仪章节拦截）
  canvas.addEventListener(
    "wheel",
    (e) => {
      if (!active) return;
      e.preventDefault();
      zoomK = Math.min(3, Math.max(0.55, zoomK * Math.exp(-e.deltaY * 0.001)));
      lastInteract = performance.now();
      dirty = true;
    },
    { passive: false },
  );
}

/** main tick 每帧调用；返回 true 表示本帧重投影过，需要重绘。 */
export function tickGlobe(nowMs: number): boolean {
  if (!active || !layoutRef) return false;
  if (!dragging) {
    const idle = (nowMs - lastInteract) / 1000;
    // 惯性衰减
    velRa *= 0.95;
    velDec *= 0.95;
    // 空闲 2 秒后缓缓恢复自动旋转
    const auto = idle > 2 ? AUTO_SPIN : 0;
    const effVel = velRa + auto;
    if (Math.abs(effVel) > 0.02 || Math.abs(velDec) > 0.02) {
      centerRa = (centerRa + effVel * 0.033 + 360) % 360;
      centerDec = Math.min(89, Math.max(-89, centerDec + velDec * 0.033));
      dirty = true;
    }
  }
  if (!dirty) return false;
  dirty = false;
  reprojectLayout(layoutRef, makeOrthoProjector(centerRa, centerDec));
  return true;
}

export function updateGlobe(view: SkyView, camera: Camera): void {
  active = true;
  if (!entered) {
    entered = true;
    // 入场冲击：甩一下天球；星点从平面投影飞成球面
    velRa = -160;
    lastInteract = performance.now();
    if (layoutRef) {
      beginMorph(layoutRef, makeOrthoProjector(centerRa, centerDec), performance.now());
      dirty = false; // morph 期间由 renderSky 补间，无需再重投影
    }
    view.highlight = null;
    view.labels = [];
  }
  camera.fit(1, window.innerWidth, window.innerHeight, 90);
  camera.k *= zoomK;
  camera.tx = window.innerWidth / (2 * camera.k);
  camera.ty = window.innerHeight / (2 * camera.k);

  view.rotation = 0;
  view.showLines = true;
  view.visible = null;
  view.freeExplore = false;
  view.dimStarAlpha = 1;
  view.revealAlpha = () => 0.5;
}

export function leaveGlobe(): void {
  active = false;
  entered = false;
  zoomK = 1;
  if (cardRef) hideDetailCard(cardRef);
}

/** 球缘与经纬网叠加（renderSky 之前画，垫在星点下面）。 */
export function drawGlobeOverlay(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  w: number,
  h: number,
): void {
  const proj = makeOrthoProjector(centerRa, centerDec);
  const c = camera.toScreen(0, 0);
  const R = camera.k; // 世界半径 1 → 屏幕半径 k

  // 球体暗底，让"球"从背景里浮出来
  const g = ctx.createRadialGradient(c.x, c.y, R * 0.1, c.x, c.y, R);
  g.addColorStop(0, "rgba(38, 62, 92, 0.55)");
  g.addColorStop(1, "rgba(13, 13, 17, 0.0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 1;
  // 赤纬圈：-60,-30,0,30,60
  ctx.strokeStyle = "rgba(175,145,95,0.14)";
  for (const dec of [-60, -30, 0, 30, 60]) {
    ctx.beginPath();
    let pen = false;
    for (let ra = 0; ra <= 360; ra += 4) {
      const p = proj(ra, dec);
      if (!p.visible) { pen = false; continue; }
      const s = camera.toScreen(p.x, p.y);
      if (!pen) { ctx.moveTo(s.x, s.y); pen = true; } else ctx.lineTo(s.x, s.y);
    }
    ctx.stroke();
  }
  // 赤经圈：每 30°
  for (let ra = 0; ra < 360; ra += 30) {
    ctx.beginPath();
    let pen = false;
    for (let dec = -90; dec <= 90; dec += 4) {
      const p = proj(ra, dec);
      if (!p.visible) { pen = false; continue; }
      const s = camera.toScreen(p.x, p.y);
      if (!pen) { ctx.moveTo(s.x, s.y); pen = true; } else ctx.lineTo(s.x, s.y);
    }
    ctx.stroke();
  }
  // 球缘描金
  ctx.strokeStyle = "rgba(201,162,39,0.4)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
  ctx.stroke();
  void w;
  void h;
}
