import type { Camera } from "../starfield/camera";
import type { SkyLayout } from "../starfield/renderer";
import type { SkyView } from "../scroll/view";
import { snapshot, lerpCamera, camForBBox, easeInOut, type CamState } from "../starfield/tween";

/**
 * 步入星官：自由探索中点击星官，相机飞入其中——
 * 背景星海压暗，其余连线退场，该星官金亮，
 * 成员星名随飞行进度逐一亮起，左侧竖排大字点名。
 * ESC / 点击空白 / 滚动 返回星野。
 */

type Phase = "in" | "hold" | "out";

interface FocusState {
  ai: number;
  phase: Phase;
  t0: number;
  from: CamState;
  to: CamState;
  /** 进入前的相机，退出时飞回 */
  returnCam: CamState;
  /** 进入时章节的连线透明度函数，退出时平滑交还 */
  baseReveal: ((ai: number) => number) | null;
}

const FLY_MS = 1150;
const DIM_BG = 0.16;

let st: FocusState | null = null;
let layoutRef: SkyLayout | null = null;
let panel: HTMLElement | null = null;
let onExitHook: (() => void) | null = null;

function memberBBox(layout: SkyLayout, ai: number): { minX: number; minY: number; maxX: number; maxY: number } {
  const hips = new Set(layout.asterisms[ai].memberHips);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const s of layout.stars) {
    if (!hips.has(s.hip)) continue;
    if (s.x < minX) minX = s.x;
    if (s.y < minY) minY = s.y;
    if (s.x > maxX) maxX = s.x;
    if (s.y > maxY) maxY = s.y;
  }
  // 单星星官：给一个最小视野
  if (maxX - minX < 0.02) { minX -= 0.01; maxX += 0.01; }
  if (maxY - minY < 0.02) { minY -= 0.01; maxY += 0.01; }
  return { minX, minY, maxX, maxY };
}

export function initFocus(layout: SkyLayout, onExit: () => void): void {
  layoutRef = layout;
  onExitHook = onExit;

  panel = document.createElement("div");
  panel.id = "focus-panel";
  panel.innerHTML = `
    <div class="focus-name"></div>
    <div class="focus-meta"></div>
    <ul class="focus-members"></ul>
    <button type="button" class="focus-close">返回星野</button>
  `;
  document.body.appendChild(panel);
  panel.querySelector(".focus-close")!.addEventListener("click", () => exitFocus(performance.now()));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && st) exitFocus(performance.now());
  });
}

export function focusActive(): boolean {
  return st !== null;
}

export function focusAsterism(): number | null {
  return st ? st.ai : null;
}

export function enterFocus(ai: number, view: SkyView, camera: Camera, nowMs: number): void {
  if (!layoutRef || !panel) return;
  const a = layoutRef.asterisms[ai];
  const bb = memberBBox(layoutRef, ai);
  const target = camForBBox(
    bb.minX, bb.minY, bb.maxX, bb.maxY,
    window.innerWidth, window.innerHeight, 0.52,
  );
  // 星官偏向视口右侧，左侧留给竖排面板
  target.tx -= window.innerWidth * 0.09 / target.k;
  st = {
    ai,
    phase: "in",
    t0: nowMs,
    from: snapshot(camera),
    to: target,
    returnCam: snapshot(camera),
    baseReveal: view.revealAlpha,
  };
  panel.querySelector(".focus-name")!.textContent = a.name;
  panel.querySelector(".focus-meta")!.textContent =
    `${a.memberNames.length} 颗成员星 · 星官 #${a.id}`;
  panel.querySelector(".focus-members")!.innerHTML =
    a.memberNames.map((n) => `<li>${n}</li>`).join("");
  panel.classList.add("on");
  document.body.classList.add("focusing");
}

export function exitFocus(nowMs: number): void {
  if (!st) return;
  st.phase = "out";
  st.t0 = nowMs;
  panel?.classList.remove("on");
  document.body.classList.remove("focusing");
}

function progress(nowMs: number): number {
  if (!st) return 0;
  return Math.min(1, (nowMs - st.t0) / FLY_MS);
}

/** 每帧驱动相机飞行；返回是否仍有聚焦态需要持续渲染。 */
export function tickFocus(camera: Camera, nowMs: number): boolean {
  if (!st) return false;
  const t = progress(nowMs);
  if (st.phase !== "hold") lerpCamera(camera, st.from, st.to, t);
  if (t >= 1) {
    if (st.phase === "in") {
      st.phase = "hold";
    } else if (st.phase === "out") {
      st = null;
      onExitHook?.();
      return false;
    }
  }
  return true;
}

/**
 * 覆写视图状态：背景星压暗、其余星官退场、本星官金亮。
 * 在章节 update 之后、渲染之前调用（只读 t，不改相机）。
 */
export function applyFocusView(view: SkyView, nowMs: number): void {
  if (!st) return;
  const ai = st.ai;
  const e = easeInOut(progress(nowMs));
  const dim = st.phase === "out" ? DIM_BG + (1 - DIM_BG) * (1 - e) : 1 - (1 - DIM_BG) * e;
  view.dimStarAlpha = dim;
  view.highlight = new Set([ai]);
  view.labels = [ai];
  view.freeExplore = false;
  const baseReveal = st.baseReveal;
  view.revealAlpha = (i: number) => {
    if (i === ai) return 0.95;
    const other = baseReveal ? baseReveal(i) : 0.45;
    return st!.phase === "out" ? other * (0.06 + 0.94 * (1 - easeInOut(progress(nowMs)))) : other * 0.06;
  };
}

/** 成员星名随飞行进度逐一亮起（错峰 90ms）。 */
export function drawFocusOverlay(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  layout: SkyLayout,
  nowMs: number,
  rotation: number,
): void {
  if (!st || !layoutRef) return;
  const a = layout.asterisms[st.ai];
  const elapsed = nowMs - st.t0 - FLY_MS * 0.55; // 飞行过半后开始点名
  if (elapsed <= 0) return;
  const hips = new Set(a.memberHips);
  const c = Math.cos(rotation), s = Math.sin(rotation);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = '12px "STSong", "SimSun", "Songti SC", serif';
  let idx = 0;
  for (const star of layout.stars) {
    if (!hips.has(star.hip) || star.hidden) continue;
    const local = Math.max(0, Math.min(1, (elapsed - idx * 90) / 320));
    idx++;
    if (local <= 0) continue;
    const wx = star.x * c - star.y * s;
    const wy = star.x * s + star.y * c;
    const p = camera.toScreen(wx, wy);
    ctx.globalAlpha = local * 0.92;
    ctx.fillStyle = "#fce1b6";
    ctx.fillText(star.name ?? "", p.x + 9, p.y - 7);
    // 名字引出线
    ctx.globalAlpha = local * 0.4;
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x + 4, p.y - 3);
    ctx.lineTo(p.x + 7, p.y - 6);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
