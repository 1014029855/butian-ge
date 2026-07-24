import type { SkyView } from "../scroll/view";
import type { SkyLayout } from "../starfield/renderer";
import { reprojectLayout, beginMorph } from "../starfield/renderer";
import { project } from "../starfield/projection";
import { precess, poleAt } from "../starfield/precession";
import type { Camera } from "../starfield/camera";

/**
 * 一万年 · 岁差时间机。
 * 拖动年份滑块：把整片星空 precess 到该历元，看天极在星间漂移、
 * 北极星一代代更替。天极轨迹（金色虚线圈）始终过视图中心——
 * 因为投影中心就是"当年的天极"。
 */

export const EPOCH_MIN = -3000;
export const EPOCH_MAX = 14000;

/** 历代北极星（hip 来自 HYG，对应历元区间为叙事近似） */
const ERAS = [
  { hip: 68756, star: "右枢", label: "右枢 · 三代之北极", from: -3000, to: -1200 },
  { hip: 72607, star: "帝", label: "帝 · 秦汉之北极", from: -1200, to: 700 },
  { hip: 11767, star: "勾陈一", label: "勾陈一 · 今日北极星", from: 700, to: 4500 },
  { hip: 91262, star: "织女一", label: "织女一 · 未来北极星", from: 11000, to: 14000 },
];

let year = 2026;
let layoutRef: SkyLayout | null = null;
let active = false;
let entered = false;
let sliderEl: HTMLInputElement | null = null;
let yearEl: HTMLElement | null = null;
let eraEl: HTMLElement | null = null;
let playEl: HTMLButtonElement | null = null;
let playing = false;
let redraw: (() => void) | null = null;
let lastRebuild = 0;

function epochProjector(y: number) {
  return (ra: number, dec: number) => {
    const q = precess(ra, dec, y);
    return project(q.ra, q.dec);
  };
}

function fmtYear(y: number): string {
  const r = Math.round(y);
  if (r < 0) return `公元前 ${-r} 年`;
  if (r <= 2026) return `公元 ${r} 年`;
  return `公元 ${r} 年 · 未来`;
}

function currentEra(y: number): (typeof ERAS)[number] | null {
  for (const e of ERAS) if (y >= e.from && y < e.to) return e;
  return null;
}

function refreshDom(): void {
  if (yearEl) yearEl.textContent = fmtYear(year);
  const era = currentEra(year);
  if (eraEl) eraEl.textContent = era ? era.label : "此间数千年，天穹没有北极星";
}

export function initEpoch(layout: SkyLayout, onRedraw?: () => void): void {
  layoutRef = layout;
  redraw = onRedraw ?? null;
  sliderEl = document.getElementById("epoch-slider") as HTMLInputElement | null;
  yearEl = document.getElementById("epoch-year");
  eraEl = document.getElementById("epoch-era");
  playEl = document.getElementById("epoch-play") as HTMLButtonElement | null;
  if (playEl) {
    playEl.addEventListener("click", () => {
      playing = !playing;
      if (playing && year >= EPOCH_MAX) year = EPOCH_MIN; // 播完了再按就重头
      updatePlayBtn();
    });
  }
  if (sliderEl) {
    sliderEl.min = String(EPOCH_MIN);
    sliderEl.max = String(EPOCH_MAX);
    sliderEl.value = String(year);
    sliderEl.addEventListener("input", () => {
      playing = false;
      updatePlayBtn();
      year = Number(sliderEl!.value);
      // 拖动时节流重投影（33ms）
      const now = performance.now();
      if (now - lastRebuild > 33 && layoutRef) {
        lastRebuild = now;
        reprojectLayout(layoutRef, epochProjector(year));
      }
      refreshDom();
      redraw?.();
    });
    sliderEl.addEventListener("change", () => {
      if (layoutRef) reprojectLayout(layoutRef, epochProjector(year));
      redraw?.();
    });
  }
}

function updatePlayBtn(): void {
  if (playEl) playEl.textContent = playing ? "⏸ 停在这一年" : "▶ 播放一万七千年";
}

/** 播放速度：约 18 秒流完全程 */
const PLAY_SPEED = (EPOCH_MAX - EPOCH_MIN) / 18; // 年/秒
let lastPlayTick = 0;

/** main tick 每帧调用；播放中推进年份，返回 true 表示需要重绘。 */
export function tickEpoch(nowMs: number): boolean {
  if (!active || !playing || !layoutRef) return false;
  const dt = lastPlayTick ? (nowMs - lastPlayTick) / 1000 : 0;
  lastPlayTick = nowMs;
  year = Math.min(EPOCH_MAX, year + PLAY_SPEED * dt);
  if (year >= EPOCH_MAX) {
    playing = false;
    updatePlayBtn();
  }
  const now = performance.now();
  if (now - lastRebuild > 40) {
    lastRebuild = now;
    reprojectLayout(layoutRef, epochProjector(year));
  }
  if (sliderEl) sliderEl.value = String(Math.round(year));
  refreshDom();
  return true;
}

export function updateEpoch(view: SkyView, camera: Camera): void {
  active = true;
  if (!entered) {
    entered = true;
    year = 2026;
    if (sliderEl) sliderEl.value = String(year);
    if (layoutRef) beginMorph(layoutRef, epochProjector(year), performance.now());
    refreshDom();
  }
  camera.coverFit(Math.PI, window.innerWidth, window.innerHeight, 1.02);

  view.rotation = 0;
  view.showLines = true;
  view.visible = null;
  view.highlight = null;
  view.labels = [];
  view.freeExplore = false;
  view.dimStarAlpha = 1;
  view.revealAlpha = () => 0.4;
}

export function leaveEpoch(): void {
  active = false;
  entered = false;
  playing = false;
  lastPlayTick = 0;
  updatePlayBtn();
}

/** 天极轨迹 + 北极星标注叠加（renderSky 之后画）。 */
export function drawEpochOverlay(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  layout: SkyLayout,
): void {
  if (!active) return;

  // 天极漂移轨迹：历元序列的北天极（J2000 方向）转到当前历元后投影
  ctx.save();
  ctx.strokeStyle = "rgba(201,162,39,0.55)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  let pen = false;
  for (let y = EPOCH_MIN; y <= EPOCH_MAX; y += 85) {
    const pole = poleAt(y);
    const q = precess(pole.ra, pole.dec, year);
    const p = project(q.ra, q.dec);
    const s = camera.toScreen(p.x, p.y);
    if (!pen) { ctx.moveTo(s.x, s.y); pen = true; } else ctx.lineTo(s.x, s.y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // 北极星标注：当前历元所处时代的那颗"北极星"
  const era = currentEra(year);
  if (era && layoutRef) {
    const star = layout.stars.find((s) => s.hip === era.hip);
    if (star) {
      const s = camera.toScreen(star.x, star.y);
      ctx.save();
      // 双圈光環
      ctx.strokeStyle = "rgba(201,162,39,0.9)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(201,162,39,0.4)";
      ctx.beginPath();
      ctx.arc(s.x, s.y, 16, 0, Math.PI * 2);
      ctx.stroke();
      // 星名
      ctx.fillStyle = "#fce1b6";
      ctx.font = '16px "STSong", "SimSun", "Songti SC", serif';
      ctx.textAlign = "center";
      ctx.fillText(era.star, s.x, s.y - 26);
      ctx.restore();
    }
  }

  // 视图中心：当年天极标记
  const c = camera.toScreen(0, 0);
  ctx.save();
  ctx.strokeStyle = "rgba(252,225,182,0.75)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(c.x - 8, c.y); ctx.lineTo(c.x + 8, c.y);
  ctx.moveTo(c.x, c.y - 8); ctx.lineTo(c.x, c.y + 8);
  ctx.stroke();
  ctx.fillStyle = "rgba(252,225,182,0.6)";
  ctx.font = '11px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = "left";
  ctx.fillText("当年天极", c.x + 12, c.y - 8);
  ctx.restore();
}
