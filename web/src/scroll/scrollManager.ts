/** 滚动叙事管理：每个章节注册一个 update(progress)，progress ∈ [0,1]。 */
export interface Chapter {
  id: string;
  el: HTMLElement;
  update(p: number): void;
  /** 章节是否占据视口中心（用于切换背景渲染与交互开关） */
  isActive?: boolean;
}

const chapters: Chapter[] = [];

export function registerChapter(id: string, update: (p: number) => void): Chapter | null {
  const el = document.getElementById(id);
  if (!el) return null;
  const ch: Chapter = { id, el, update };
  chapters.push(ch);
  return ch;
}

/** 高过视口的章节（内部 sticky）：progress = -top / (height - vh)。 */
function sectionProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const span = rect.height - vh;
  if (span <= 0) return rect.top < vh / 2 ? 1 : 0;
  return Math.min(1, Math.max(0, -rect.top / span));
}

/**
 * 单激活模型：任意时刻只有「占据视口中线」的那个章节是激活章节。
 * 上下两个章节交界正好穿过视口中心时才切换，天然带迟滞，
 * 不会出现卡在边界时两章反复争抢激活态的抖动。
 */
function centerChapter(): Chapter | null {
  const mid = window.innerHeight * 0.5;
  for (const ch of chapters) {
    const r = ch.el.getBoundingClientRect();
    if (r.top < mid && r.bottom > mid) return ch;
  }
  return null;
}

export function startScrollManager(onFrame: () => void, onActive?: (id: string) => void): void {
  let activeId: string | null = null;
  const onScroll = () => {
    const center = centerChapter();
    for (const ch of chapters) ch.isActive = ch === center;
    if (center) {
      center.update(sectionProgress(center.el));
      if (center.id !== activeId) {
        activeId = center.id;
        onActive?.(center.id);
      }
    }
    onFrame();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

export function activeChapterId(): string | null {
  for (const ch of chapters) if (ch.isActive) return ch.id;
  return null;
}
