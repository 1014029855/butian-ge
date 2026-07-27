/**
 * Block Reveal 页面过渡：四条墨蓝色块「盖上 → 升起文案 → 揭开」。
 *
 * 灵感与机制（对齐 obsidianassembly 的 Block Reveal 拆解）：
 *   - 4 条纵向色块 scaleX 0→1 从左侧阶梯盖住（hop 手感），遮罩期换内容；
 *   - 文案拆字、藏 mask 下方，盖满时逐字升起；
 *   - 原点换到右边，色块 scaleX 1→0 阶梯收起，文案落下，新页露出。
 * 拆分自实现（SplitText 为 Club 插件，不引入）：逐字 span + overflow 遮罩。
 *
 * 用法：
 *   import { playTransition, playIntro } from "./blockReveal";
 *   await playTransition("星野漫游", () => scrollTo(...));   // 翻页器跳转
 *   playIntro();                                            // 开屏揭开（页面加载完成后调）
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("brHop", "0.9, 0, 0.1, 1");

const BLOCKS = 4;
const COVER_S = 0.5;
const REVEAL_S = 0.55;
const STAGGER = 0.055;

const CSS = `
.br-overlay { position: fixed; inset: 0; z-index: 90; pointer-events: none; visibility: hidden; }
.br-blocks { position: absolute; inset: 0; display: flex; }
.br-block {
  flex: 1 1 25%; height: 100%;
  background: linear-gradient(180deg, #101826 0%, #0d0d11 100%);
  border-right: 1px solid rgba(201, 162, 39, 0.18);
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
.br-block:last-child { border-right: none; }
.br-label {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; overflow: hidden;
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
  font-size: clamp(34px, 5.2vw, 64px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  color: #c9a227;
  text-shadow: 0 0 22px rgba(201, 162, 39, 0.5);
  white-space: nowrap;
}
.br-char { display: inline-block; will-change: transform; }
`;

let overlay: HTMLDivElement | null = null;
let blocks: HTMLDivElement[] = [];
let labelEl: HTMLDivElement | null = null;
let busy = false;

function ensureOverlay(): void {
  if (overlay) return;
  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  overlay = document.createElement("div");
  overlay.className = "br-overlay";
  const wrap = document.createElement("div");
  wrap.className = "br-blocks";
  blocks = [];
  for (let i = 0; i < BLOCKS; i++) {
    const b = document.createElement("div");
    b.className = "br-block";
    wrap.appendChild(b);
    blocks.push(b);
  }
  labelEl = document.createElement("div");
  labelEl.className = "br-label";
  overlay.append(wrap, labelEl);
  document.body.appendChild(overlay);
}

/** 文案拆字（逐字 span，配合外层 overflow:hidden 遮罩上滑） */
function setLabel(text: string): void {
  if (!labelEl) return;
  labelEl.innerHTML = "";
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "br-char";
    s.textContent = ch === " " ? " " : ch;
    labelEl.appendChild(s);
  }
  gsap.set(labelEl.children, { y: "115%" });
}

function chars(): HTMLSpanElement[] {
  return labelEl ? (Array.from(labelEl.children) as HTMLSpanElement[]) : [];
}

/** 盖上：色块左阶梯展开 + 文案升起；播完调 mid()，再揭开（右阶梯收起 + 文案落下） */
export function playTransition(label: string, mid: () => void): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    // 盖上：色块从左阶梯展开
    tl.set(blocks, { transformOrigin: "left center" })
      .to(blocks, { scaleX: 1, duration: COVER_S, ease: "brHop", stagger: STAGGER }, 0)
      // 文案逐字升起（遮罩内）
      .to(cs, { y: "0%", duration: 0.45, ease: "brHop", stagger: 0.035 }, `-=${STAGGER * 1.5}`)
      // 遮罩期：换内容（瞬时滚动/切章）
      .add(() => mid(), "+=0.12")
      // 揭开：文案落下，色块从右阶梯收起
      .to(cs, { y: "-115%", duration: 0.32, ease: "power2.in", stagger: 0.02 }, "+=0.18")
      .set(blocks, { transformOrigin: "right center" })
      .to(blocks, { scaleX: 0, duration: REVEAL_S, ease: "brHop", stagger: STAGGER }, "-=0.05");
  });
}

/**
 * 开屏揭开：页面加载完成后调用。
 * 初始即全盖（进场黑幕感），文案升起 → 色块从右收起，星空露出。
 */
export function playIntro(label: string): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";
  gsap.set(blocks, { scaleX: 1, transformOrigin: "right center" });

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    tl.to(cs, { y: "0%", duration: 0.5, ease: "brHop", stagger: 0.04 }, 0.1)
      .to(cs, { y: "-115%", duration: 0.32, ease: "power2.in", stagger: 0.02 }, "+=0.6")
      .to(blocks, { scaleX: 0, duration: REVEAL_S, ease: "brHop", stagger: STAGGER }, "-=0.05");
  });
}

/** 章节标题拆字入场（h2 逐字上滑，overflow 遮罩；每元素只做一次拆分） */
export function riseIn(el: HTMLElement): void {
  if (!el.dataset.brSplit) {
    el.dataset.brSplit = "1";
    const text = el.textContent ?? "";
    el.textContent = "";
    el.style.overflow = "hidden";
    for (const ch of text) {
      const s = document.createElement("span");
      s.className = "br-char";
      s.style.display = "inline-block";
      s.textContent = ch === " " ? " " : ch;
      el.appendChild(s);
    }
  }
  gsap.fromTo(
    el.children,
    { y: "115%" },
    { y: "0%", duration: 0.55, ease: "brHop", stagger: 0.028, overwrite: "auto" },
  );
}
