/**
 * 翻页器：右下角固定的章节导航（上一章 / 下一章 + 当前章指示）。
 * 桌面与手机通用：按钮 ≥44px 触控面、墨蓝描金胶囊、不挡画布交互
 * （容器 pointer-events:none，仅按钮本体 auto）。自挂载、自注入样式。
 *
 * 滚动用原生 scrollIntoView({behavior:"smooth"})——ScrollTrigger 的
 * scrub 随平滑滚动自然驱动全部章节动画，无需额外插件。
 */

export interface PagerOptions {
  /** 章节容器（ch1..ch8 的 section 元素，顺序即页序） */
  sections: readonly HTMLElement[];
  /** 章节短名（与 sections 同序，用于指示条，如 序/星野/授时…） */
  names: readonly string[];
}

const CSS = `
.app-pager {
  position: fixed; right: 20px; bottom: 20px; z-index: 50;
  display: flex; align-items: center; gap: 10px;
  pointer-events: none; user-select: none;
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
}
.app-pager-btn {
  pointer-events: auto;
  min-width: 44px; height: 44px; padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.55);
  background: rgba(13, 13, 17, 0.72);
  backdrop-filter: blur(6px);
  color: #fce1b6; font-size: 22px; line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
}
.app-pager-btn:hover:not(:disabled) { border-color: #c9a227; box-shadow: 0 0 12px rgba(201, 162, 39, 0.35); }
.app-pager-btn:active:not(:disabled) { transform: scale(0.94); }
.app-pager-btn:disabled { opacity: 0.28; cursor: default; }
.app-pager-idx {
  pointer-events: none;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(13, 13, 17, 0.72);
  backdrop-filter: blur(6px);
  color: #c9a227;
  font-size: 13px; letter-spacing: 0.22em; white-space: nowrap;
  text-shadow: 0 0 8px rgba(201, 162, 39, 0.4);
}
@media (max-width: 640px) {
  .app-pager { right: 12px; bottom: 12px; gap: 8px; }
  .app-pager-idx { font-size: 12px; padding: 7px 10px; letter-spacing: 0.14em; }
}
`;

export function createPager({ sections, names }: PagerOptions): { setCurrent(i: number): void } {
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.className = "app-pager";
  const prev = document.createElement("button");
  prev.className = "app-pager-btn";
  prev.type = "button";
  prev.setAttribute("aria-label", "上一章");
  prev.textContent = "‹";
  const idx = document.createElement("span");
  idx.className = "app-pager-idx";
  const next = document.createElement("button");
  next.className = "app-pager-btn";
  next.type = "button";
  next.setAttribute("aria-label", "下一章");
  next.textContent = "›";
  root.append(prev, idx, next);
  document.body.appendChild(root);

  const last = sections.length - 1;
  let current = 0;

  function render(): void {
    idx.textContent = names[current] ? `${names[current]} · ${current + 1}/${sections.length}` : `${current + 1}/${sections.length}`;
    // 翻页步长 = 一屏；到顶/到底禁用
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    prev.disabled = window.scrollY <= 2;
    next.disabled = window.scrollY >= maxY - 2;
  }
  function go(dir: number): void {
    // 一屏一翻：滚动吸附到最近整屏，避免半屏错位累积
    const vh = window.innerHeight;
    const target = Math.round(window.scrollY / vh) * vh + dir * vh;
    window.scrollTo({ top: Math.min(Math.max(target, 0), document.documentElement.scrollHeight - vh), behavior: "smooth" });
  }
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  window.addEventListener("scroll", render, { passive: true });

  render();
  return {
    setCurrent(i: number): void {
      const c = Math.min(Math.max(Math.round(i), 0), last);
      if (c === current) return;
      current = c;
      render();
    },
  };
}
