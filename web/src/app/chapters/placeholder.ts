/**
 * 占位章节工厂：为尚未做专属交互的章节渲染标准文案面板。
 *
 * 面板结构：eyebrow 眉题 + 章节标题（可带朱砂印）+ hook 引子 + body 正文段。
 * 进入视口加 .inview 触发 CSS 渐入；update 默认无事可做
 * （相机已由 CameraRig 按章节进度自动驱动）。
 */
import type { Chapter, ChapterCtx } from "../chapters";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** side 控制面板停靠侧（CSS 类 .chapter-panel--left / --right / --center） */
export function createPlaceholderChapter(
  ctx: ChapterCtx,
  opts: { side?: "left" | "right" | "center" } = {},
): Chapter {
  const side = opts.side ?? "left";
  const { copy } = ctx;

  const el = document.createElement("div");
  el.className = `chapter-panel chapter-panel--${side}`;
  el.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="hook">${escapeHtml(copy.hook)}</p>
    ${copy.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
  `;
  ctx.root.querySelector(".pin")!.appendChild(el);

  return {
    enter() {
      ctx.root.classList.add("inview");
    },
    update() {
      // 占位章：相机动画由 CameraRig 负责，文案由 .inview 渐入负责
    },
    exit() {
      ctx.root.classList.remove("inview");
    },
  };
}
