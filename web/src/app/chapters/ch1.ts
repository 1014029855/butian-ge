/**
 * ch1 序章：全屏居中主视觉。相机：球内 r≈1，drift 缓慢自转
 * （见 CameraRig.CHAPTER_KEYS[0]，相机由 CameraRig 插值，本章不碰）。
 *
 * 布局：eyebrow 眉题 + 描金渐变大标题（background-clip:text + drop-shadow，
 * 写法取自旧 style.css 的 #app-title）+ hook 引子 + body 正文 + 朱砂印
 * （copy.seal）+ 底部「向下滚动 · 步入夜空」浮动提示。
 *
 * 标题：开屏即现——只在页面加载时做一次入场动画（CSS keyframes，
 * 与滚动进度脱钩）；hook / body / 印章以滚动窗口渐次跟上，
 * 滚动提示随滚动淡出。enter 关闭星官名标签（序章不出标签），exit 恢复。
 */
import type { Chapter, ChapterCtx } from "../chapters";

/** 标题终态字距 em（与旧站 #app-title 一致） */
const TITLE_TRACKING_EM = 0.22;

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
  /* 鎏金：宽幅渐变 + background-size 放大两倍，入场后缓慢流动（金属呼吸感） */
  background: linear-gradient(160deg, #f2dd9a 12%, #c9a227 38%, #8f7019 52%, #c9a227 66%, #f2dd9a 88%);
  background-size: 240% 240%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
  margin-bottom: 18px;
  /* 开屏即现：标题只随页面加载做一次入场动画，与滚动进度脱钩；
     入场完毕后鎏金开始缓慢流动 */
  animation:
    ch1-title-in 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both,
    ch1-sheen 12s ease-in-out 1.8s infinite alternate;
}
@keyframes ch1-title-in {
  from {
    opacity: 0;
    letter-spacing: 0.55em;
    filter: blur(14px) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    letter-spacing: ${TITLE_TRACKING_EM}em;
    filter: blur(0) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
    transform: translateY(0);
  }
}
@keyframes ch1-sheen {
  from { background-position: 0% 30%; }
  to { background-position: 100% 70%; }
}
/* 英文副标：标题下的衬线小字（editorial 题签） */
.ch1-sub-en {
  font-family: "Times New Roman", "Noto Serif SC", serif;
  font-size: clamp(10px, 1vw, 13px);
  letter-spacing: 0.52em;
  text-indent: 0.52em;
  color: #af915f;
  opacity: 0;
  animation: ch1-sub-en-in 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) 1.0s both;
  margin-bottom: 22px;
  text-transform: uppercase;
}
@keyframes ch1-sub-en-in {
  from { opacity: 0; letter-spacing: 0.9em; text-indent: 0.9em; }
  to { opacity: 0.9; letter-spacing: 0.52em; text-indent: 0.52em; }
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
/* 滚动指引：下方一条渐隐金线 + 光点往复滑落 */
.ch1-cue::before {
  content: "";
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  width: 1px;
  height: 46px;
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.5), rgba(201, 162, 39, 0.06));
  transform: translateX(-50%);
}
.ch1-cue::after {
  content: "";
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #f2dd9a;
  box-shadow: 0 0 6px rgba(242, 221, 154, 0.9);
  transform: translateX(-50%);
  animation: ch1-cue-drop 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes ch1-cue-drop {
  0% { transform: translateX(-50%) translateY(0); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { transform: translateX(-50%) translateY(42px); opacity: 0; }
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
    <p class="ch1-sub-en">A Star Atlas of Three Thousand Years</p>
    <p class="ch1-hook">${escapeHtml(copy.hook)}</p>
    <div class="ch1-body">${copy.body.map((b) => `<p>${escapeHtml(b)}</p>`).join("")}</div>
    ${copy.seal ? `<div class="ch1-seal">${escapeHtml(copy.seal)}</div>` : ""}
  `;
  pin.appendChild(stage);

  const cue = document.createElement("div");
  cue.className = "ch1-cue";
  cue.textContent = "向下滚动 · 步入夜空";
  pin.appendChild(cue);

  const hookEl = stage.querySelector<HTMLElement>(".ch1-hook")!;
  const bodyEl = stage.querySelector<HTMLElement>(".ch1-body")!;
  const sealEl = stage.querySelector<HTMLElement>(".ch1-seal");

  // update(p) 高频调用：记录上次取值，变化量过小则跳过 DOM 写
  let lastCue = -1;
  const lastReveal = new Map<HTMLElement, number>();

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
