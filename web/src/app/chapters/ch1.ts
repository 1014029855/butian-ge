/**
 * ch1 序章：全屏居中主视觉。相机：球内 r≈1，drift 缓慢自转
 * （见 CameraRig.CHAPTER_KEYS[0]，相机由 CameraRig 插值，本章不碰）。
 *
 * 布局：eyebrow 眉题 + 描金渐变大标题（background-clip:text + drop-shadow，
 * 写法取自旧 style.css 的 #app-title）+ hook 引子 + body 正文 + 朱砂印
 * （copy.seal）+ 底部「向下滚动 · 步入夜空」浮动提示。
 *
 * update(p) 驱动标题浮现：p∈[0, TITLE_END] 内 opacity / letter-spacing /
 * 模糊渐进，之后保持终态；hook / body / 印章以更晚的窗口渐次跟上，
 * 滚动提示随滚动淡出。enter 关闭星官名标签（序章不出标签），exit 恢复。
 */
import type { Chapter, ChapterCtx } from "../chapters";

/** 标题浮现窗口：p∈[0, TITLE_END]，之后保持终态 */
const TITLE_END = 0.6;
/** 标题终态字距 em（与旧站 #app-title 一致） */
const TITLE_TRACKING_EM = 0.22;
/** 标题起态字距 em（由宽排收拢到终态） */
const TITLE_TRACKING_START_EM = 0.55;
/** 标题起态模糊半径 px */
const TITLE_BLUR_START_PX = 14;

const CH1_CSS = `
.ch1-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  padding: 0 6vw;
}
.ch1-eyebrow {
  font-size: 11px;
  letter-spacing: 0.42em;
  color: #fce1b6;
  opacity: 0.55;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.ch1-title {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: clamp(56px, 9vw, 110px);
  font-weight: 700;
  letter-spacing: ${TITLE_TRACKING_EM}em;
  background: linear-gradient(160deg, #f2dd9a 15%, #c9a227 55%, #8f7019 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  margin-bottom: 24px;
  will-change: opacity, letter-spacing, filter, transform;
}
.ch1-hook {
  font-size: 17px;
  letter-spacing: 0.2em;
  line-height: 2;
  color: #fce1b6;
  max-width: 34em;
  margin-bottom: 14px;
  opacity: 0;
}
.ch1-body {
  max-width: 34em;
  opacity: 0;
}
.ch1-body p {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.06em;
  color: #fce1b6;
  opacity: 0.88;
}
.ch1-seal {
  margin-top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  color: #f6e8d8;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(142, 47, 34, 0.45), inset 0 0 6px rgba(0, 0, 0, 0.25);
  opacity: 0;
}
.ch1-cue {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  letter-spacing: 0.3em;
  color: #fce1b6;
  white-space: nowrap;
  opacity: 0;
  animation: ch1-cue-float 2.4s ease-in-out infinite;
}
@keyframes ch1-cue-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch1 = "";
  el.textContent = CH1_CSS;
  document.head.appendChild(el);
  styleInjected = true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/** 局部窗口 [start,end] 内的 smoothstep 缓动进度 */
function ramp(p: number, start: number, end: number): number {
  const x = clamp01((p - start) / (end - start));
  return x * x * (3 - 2 * x);
}

export function createChapter(ctx: ChapterCtx): Chapter {
  injectStyle();
  const pin = ctx.root.querySelector(".pin")!;
  const { copy } = ctx;

  const stage = document.createElement("div");
  stage.className = "ch1-stage";
  stage.innerHTML = `
    <p class="ch1-eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <h1 class="ch1-title">${escapeHtml(copy.title)}</h1>
    <p class="ch1-hook">${escapeHtml(copy.hook)}</p>
    <div class="ch1-body">${copy.body.map((b) => `<p>${escapeHtml(b)}</p>`).join("")}</div>
    ${copy.seal ? `<div class="ch1-seal">${escapeHtml(copy.seal)}</div>` : ""}
  `;
  pin.appendChild(stage);

  const cue = document.createElement("div");
  cue.className = "ch1-cue";
  cue.textContent = "向下滚动 · 步入夜空";
  pin.appendChild(cue);

  const titleEl = stage.querySelector<HTMLElement>(".ch1-title")!;
  const hookEl = stage.querySelector<HTMLElement>(".ch1-hook")!;
  const bodyEl = stage.querySelector<HTMLElement>(".ch1-body")!;
  const sealEl = stage.querySelector<HTMLElement>(".ch1-seal");

  // update(p) 高频调用：记录上次取值，变化量过小则跳过 DOM 写
  let lastTitle = -1;
  let lastCue = -1;
  const lastReveal = new Map<HTMLElement, number>();

  function applyTitle(t: number): void {
    if (Math.abs(t - lastTitle) < 1e-4) return;
    lastTitle = t;
    titleEl.style.opacity = t.toFixed(3);
    titleEl.style.letterSpacing =
      (TITLE_TRACKING_START_EM - (TITLE_TRACKING_START_EM - TITLE_TRACKING_EM) * t).toFixed(3) +
      "em";
    titleEl.style.filter = `blur(${((1 - t) * TITLE_BLUR_START_PX).toFixed(2)}px) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45))`;
    titleEl.style.transform = `translateY(${((1 - t) * 26).toFixed(2)}px)`;
  }

  /** 通用浮现：opacity + 上浮，带写跳过 */
  function reveal(el: HTMLElement, r: number, risePx = 18): void {
    const prev = lastReveal.get(el);
    if (prev !== undefined && Math.abs(prev - r) < 1e-4) return;
    lastReveal.set(el, r);
    el.style.opacity = r.toFixed(3);
    el.style.transform = `translateY(${((1 - r) * risePx).toFixed(2)}px)`;
  }

  return {
    enter() {
      ctx.sky.setLabelsEnabled(false); // 序章不显示星官名标签
    },
    update(p) {
      applyTitle(ramp(p, 0, TITLE_END));
      reveal(hookEl, ramp(p, 0.15, 0.45));
      reveal(bodyEl, ramp(p, 0.3, 0.6));
      if (sealEl) {
        // 印章最后落章：上浮 + 轻微缩放收定
        const r = ramp(p, 0.45, 0.75);
        const prev = lastReveal.get(sealEl);
        if (prev === undefined || Math.abs(prev - r) >= 1e-4) {
          lastReveal.set(sealEl, r);
          sealEl.style.opacity = r.toFixed(3);
          sealEl.style.transform = `translateY(${((1 - r) * 10).toFixed(2)}px) scale(${(1.3 - 0.3 * r).toFixed(3)})`;
        }
      }
      const cueA = 0.65 * (1 - ramp(p, 0, 0.35));
      if (Math.abs(cueA - lastCue) >= 1e-4 || lastCue < 0) {
        lastCue = cueA;
        cue.style.opacity = cueA.toFixed(3);
      }
    },
    exit() {
      ctx.sky.setLabelsEnabled(true); // 恢复标签总开关（后续章节自行决定显隐）
    },
  };
}
