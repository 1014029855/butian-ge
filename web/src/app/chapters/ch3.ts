/**
 * ch3 观象授时 · 圭表。
 *
 * 装配：左侧文案面板（ctx.copy，复用全局 .chapter-panel 样式与 .inview 入场），
 * 右侧圭表组件（gnomonWidget.ts）；窄屏（≤960px）退化为上下排布。
 * 布局样式由本模块注入（与 gnomonWidget 的组件样式分离），不改 app.css。
 *
 * 天空联动：滚动进度 p 映射为年日序 day = 1 + p·364 驱动组件（组件内部
 * lerp 平滑）；组件显示天数每次变化（含用户拖滑杆/点节气标记）→
 * ctx.sky.setSkyRotation(day/365·2π, 0)，背景星空随季节绕天极旋转。
 * exit 归零并恢复标签开关。本章不开拾取（旋转非零时拾取坐标不生效，
 * 见 SkyApp.setSkyRotation 注释）。
 *
 * 相机不进 enter/update：本章相机为 CameraRig.CHAPTER_KEYS[2]
 * （球内注视南天低空，作圭表背景）。
 */
import type { Chapter, ChapterCtx } from "../chapters";
import { createGnomonWidget } from "./gnomonWidget";

const LAYOUT_CSS = `
.gnomon-layout {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  padding: 0 6vw;
}
.gnomon-layout .chapter-panel {
  position: static;
  flex: 0 1 380px;
}
@media (max-width: 960px) {
  .gnomon-layout {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 2vh;
    padding: 0 5vw;
  }
  .gnomon-layout .chapter-panel { flex: none; max-width: none; padding: 16px 18px; }
  .gnomon-layout .chapter-panel h2 { font-size: 24px; }
  .gnomon-layout .chapter-panel p { font-size: 13px; line-height: 1.8; }
  .gnomon-layout .gw { width: 100%; }
}
`;

let layoutStyleInjected = false;
function injectLayoutStyle(): void {
  if (layoutStyleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.gnomonLayout = "";
  el.textContent = LAYOUT_CSS;
  document.head.appendChild(el);
  layoutStyleInjected = true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 显示天数 → 天空绕天极轴旋转弧度（一年一周） */
function skyRotationFor(day: number): number {
  return (day / 365) * Math.PI * 2;
}

export function createChapter(ctx: ChapterCtx): Chapter {
  const pin = ctx.root.querySelector(".pin")!;
  const { copy } = ctx;

  const layout = document.createElement("div");
  layout.className = "gnomon-layout";

  // 左：文案面板（结构同占位章，复用全局样式与 .inview 渐入）
  const panel = document.createElement("div");
  panel.className = "chapter-panel";
  panel.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="hook">${escapeHtml(copy.hook)}</p>
    ${copy.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
  `;
  layout.appendChild(panel);

  // 右：圭表组件。entered 门控回调，保证 exit 归零后不再写天空
  let entered = false;
  const widget = createGnomonWidget({
    onDayChange: (day) => {
      if (entered) ctx.sky.setSkyRotation(skyRotationFor(day), 0);
    },
  });
  layout.appendChild(widget.el);
  pin.appendChild(layout);
  injectLayoutStyle();

  return {
    enter() {
      entered = true;
      ctx.root.classList.add("inview");
      ctx.sky.setLabelsEnabled(false); // 聚焦圭表，星官标签让位
      ctx.sky.setSkyRotation(skyRotationFor(widget.day), 0);
    },
    update(p) {
      const t = Math.min(Math.max(p, 0), 1);
      widget.setDayTarget(1 + t * 364);
    },
    exit() {
      entered = false;
      ctx.root.classList.remove("inview");
      ctx.sky.setLabelsEnabled(true); // 恢复默认（其余章节依赖标签开启）
      ctx.sky.setSkyRotation(0, 0); // 绝对设置幂等，离开必须归零
    },
  };
}
