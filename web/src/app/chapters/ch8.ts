/**
 * ch8 尾声：居中面板（标题 + 朱砂印 + hook + body + 致谢名单）。
 * 相机 r≈6R 渐远成天外一点（CameraRig.CHAPTER_KEYS[7]，本章不碰相机）。
 *
 * 面板随章内进度渐入（p∈[0,0.3]，opacity + 上浮），致谢名单稍晚跟上
 * （p∈[0.12,0.45]）。致谢数据 CREDITS 由文案代理在 ../copy 提供，
 * 形状：{ heading: string; groups: { title: string; lines: string[] }[] }；
 * 行内 http(s) URL 渲染为可点击链接（CC BY-SA 署名要求附许可链接）。
 *
 * 本章不改变任何天空状态：相机在 6R 球外，标签随距离自动隐藏，
 * 拾取在 ch2 离场时已关闭，无需清理。
 */
import type { Chapter, ChapterCtx } from "../chapters";
import { CREDITS } from "../copy";

const CH8_CSS = `
.ch8-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7vh 6vw;
}
.ch8-panel {
  width: 100%;
  max-width: 34em;
  max-height: 86vh;
  overflow: hidden;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 30px 34px;
  backdrop-filter: blur(4px);
  text-align: center;
  opacity: 0;
}
.ch8-eyebrow {
  font-size: 11px;
  letter-spacing: 0.42em;
  color: #fce1b6;
  opacity: 0.55;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.ch8-head {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;
  margin-bottom: 12px;
}
.ch8-title {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.14em;
  color: #c9a227;
}
.ch8-seal {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  color: #f6e8d8;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(142, 47, 34, 0.45), inset 0 0 6px rgba(0, 0, 0, 0.25);
  user-select: none;
}
.ch8-hook {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.08em;
  color: #fce1b6;
  opacity: 0.9;
  margin-bottom: 8px;
}
.ch8-body p {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.06em;
  color: #fce1b6;
  opacity: 0.88;
}
.ch8-credits {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(175, 145, 95, 0.22);
  opacity: 0;
}
.ch8-credits-heading {
  font-size: 12px;
  letter-spacing: 0.34em;
  color: #af915f;
}
.ch8-credit-group {
  margin-top: 12px;
}
.ch8-credit-group h3 {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #c9a227;
}
.ch8-credit-group p {
  font-size: 13px;
  line-height: 2;
  letter-spacing: 0.05em;
  color: #fce1b6;
  opacity: 0.82;
}
.ch8-credit-group a {
  color: #c9a227;
  text-decoration: underline;
  text-underline-offset: 3px;
  word-break: break-all;
  pointer-events: auto; /* .chapter 层 pointer-events:none，链接需单独放开 */
}
.ch8-credit-group a:hover { color: #ffffff; }
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch8 = "";
  el.textContent = CH8_CSS;
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

/** 行内 http(s) URL 包成可点击链接（新窗口、noopener），其余文本纯转义 */
function linkify(line: string): string {
  return line
    .split(/(https?:\/\/\S+)/g)
    .map((part) =>
      /^https?:\/\//.test(part)
        ? `<a href="${escapeHtml(part)}" target="_blank" rel="noopener">${escapeHtml(part)}</a>`
        : escapeHtml(part),
    )
    .join("");
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

  const wrap = document.createElement("div");
  wrap.className = "ch8-wrap";
  wrap.innerHTML = `
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${escapeHtml(copy.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${escapeHtml(copy.title)}</h2>
        ${copy.seal ? `<div class="ch8-seal">${escapeHtml(copy.seal)}</div>` : ""}
      </div>
      <p class="ch8-hook">${escapeHtml(copy.hook)}</p>
      <div class="ch8-body">${copy.body.map((b) => `<p>${escapeHtml(b)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${escapeHtml(CREDITS.heading)}</p>
        ${CREDITS.groups
          .map(
            (g) => `
          <div class="ch8-credit-group">
            <h3>${escapeHtml(g.title)}</h3>
            ${g.lines.map((l) => `<p>${linkify(l)}</p>`).join("")}
          </div>`,
          )
          .join("")}
      </div>
    </div>
  `;
  pin.appendChild(wrap);

  const panelEl = wrap.querySelector<HTMLElement>(".ch8-panel")!;
  const creditsEl = wrap.querySelector<HTMLElement>(".ch8-credits")!;

  // update(p) 高频调用：记录上次取值，变化量过小则跳过 DOM 写
  let lastPanel = -1;
  let lastCredits = -1;

  return {
    enter() {
      // 无天空状态需要切换：6R 球外标签自动隐藏，拾取早已关闭
    },
    update(p) {
      const rp = ramp(p, 0, 0.3);
      if (lastPanel < 0 || Math.abs(rp - lastPanel) >= 1e-4) {
        lastPanel = rp;
        panelEl.style.opacity = rp.toFixed(3);
        panelEl.style.transform = `translateY(${((1 - rp) * 26).toFixed(2)}px)`;
      }
      const rc = ramp(p, 0.12, 0.45);
      if (lastCredits < 0 || Math.abs(rc - lastCredits) >= 1e-4) {
        lastCredits = rc;
        creditsEl.style.opacity = rc.toFixed(3);
        creditsEl.style.transform = `translateY(${((1 - rc) * 14).toFixed(2)}px)`;
      }
    },
    exit() {
      // 无状态需要还原（相机衔接由 CameraRig 关键帧保证连续）
    },
  };
}
