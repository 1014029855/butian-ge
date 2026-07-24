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

function isInView(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

export function startScrollManager(onFrame: () => void): void {
  const onScroll = () => {
    for (const ch of chapters) {
      ch.isActive = isInView(ch.el);
      if (ch.isActive) ch.update(sectionProgress(ch.el));
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
