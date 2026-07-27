/**
 * Block Reveal 页面过渡（v2 · 对齐 obsidianassembly 的惊艳感）。
 *
 * 从原站提炼的四条「高级感」原则，落进我们的墨蓝金语汇：
 *   1. 巨大而自信的展示字体：章节名 12vw 级宋体，逐字带微旋与字距收拢
 *      （editorial 式排版气场，而非小字标签）；
 *   2. 节奏的预期感：盖上 0.65s → 屏息一拍（0.35s 静止）→ 揭开 0.7s，
 *      hop(0.9,0,0.1,1) 弹感曲线；
 *   3. 材质细节：墨蓝渐变 + 纸纹颗粒 + 前缘金色辉光（盖上前缘在右、
 *      揭开前缘在左）+ 色块间投影；
 *   4. 揭开即「降生」：色块收起的同时，底层星空轻微放大归位
 *      （#sky-canvas scale 1.015→1 + 微透明度过渡），不生硬切换。
 *
 * 拆分自实现（SplitText 为 Club 插件，不引入）：逐字 span + overflow 遮罩。
 * 音效：一声克制的低吟拨弦（懒建 AudioContext，首次手势后生效，增益 0.06）。
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("brHop", "0.9, 0, 0.1, 1");

const BLOCKS = 4;
const COVER_S = 0.65;
const HOLD_S = 0.35;
const REVEAL_S = 0.7;
const STAGGER = 0.06;

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CSS = `
.br-overlay { position: fixed; inset: 0; z-index: 90; pointer-events: none; visibility: hidden; }
.br-blocks { position: absolute; inset: 0; display: flex; }
.br-block {
  position: relative;
  flex: 1 1 25%; height: 100%;
  background: linear-gradient(168deg, #15223a 0%, #101826 45%, #0b0d14 100%);
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
.br-block::before {
  content: ""; position: absolute; inset: 0;
  background-image: ${NOISE_SVG};
  opacity: 0.05; mix-blend-mode: overlay;
}
/* 前缘金色辉光：盖住时在右缘，揭开时在左缘（由 JS 切类控制） */
.br-blocks.cover .br-block { box-shadow: 10px 0 26px -8px rgba(201, 162, 39, 0.35), 4px 0 40px rgba(0, 0, 0, 0.5); border-right: 1px solid rgba(201, 162, 39, 0.34); }
.br-blocks.reveal .br-block { box-shadow: -10px 0 26px -8px rgba(201, 162, 39, 0.3), -4px 0 40px rgba(0, 0, 0, 0.5); border-left: 1px solid rgba(201, 162, 39, 0.3); }
.br-label {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; overflow: hidden;
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
  font-weight: 700;
  font-size: clamp(64px, 12vw, 160px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  color: #e8c86a;
  text-shadow: 0 0 34px rgba(201, 162, 39, 0.55), 0 0 90px rgba(201, 162, 39, 0.3);
  white-space: nowrap;
}
.br-char { display: inline-block; will-change: transform; }
`;

let overlay: HTMLDivElement | null = null;
let blocksWrap: HTMLDivElement | null = null;
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
  blocksWrap = document.createElement("div");
  blocksWrap.className = "br-blocks";
  blocks = [];
  for (let i = 0; i < BLOCKS; i++) {
    const b = document.createElement("div");
    b.className = "br-block";
    blocksWrap.appendChild(b);
    blocks.push(b);
  }
  labelEl = document.createElement("div");
  labelEl.className = "br-label";
  overlay.append(blocksWrap, labelEl);
  document.body.appendChild(overlay);
}

/** 文案拆字（逐字 span，配合外层 overflow:hidden 遮罩上滑） */
function setLabel(text: string): void {
  if (!labelEl) return;
  labelEl.innerHTML = "";
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "br-char";
    s.textContent = ch === " " ? " " : ch;
    labelEl.appendChild(s);
  }
  gsap.set(labelEl.children, { y: "115%", rotate: 5 });
}

function chars(): HTMLSpanElement[] {
  return labelEl ? (Array.from(labelEl.children) as HTMLSpanElement[]) : [];
}

/** 克制的低吟一记（懒建 AudioContext；无手势场景静默失败不抛错） */
let actx: AudioContext | null = null;
function lowNote(): void {
  try {
    actx ??= new AudioContext();
    if (actx.state === "suspended") void actx.resume();
    const t0 = actx.currentTime;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, t0);
    osc.frequency.exponentialRampToValueAtTime(65, t0 + 0.55);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.06, t0 + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
    osc.connect(gain).connect(actx.destination);
    osc.start(t0);
    osc.stop(t0 + 0.62);
  } catch {
    /* 音频不可用时静默 */
  }
}

/** 底层星空「降生」：揭开时轻微放大归位 + 透明度归位（只对画布做视觉变换） */
function skySettle(on: boolean): void {
  const canvas = document.getElementById("sky-canvas");
  if (!canvas) return;
  if (on) {
    gsap.fromTo(
      canvas,
      { scale: 1.015, opacity: 0.55 },
      { scale: 1, opacity: 1, duration: 0.75, ease: "power2.out", overwrite: "auto" },
    );
  }
}

/** 盖上：色块左阶梯展开 + 大文案旋升；屏息一拍后调 mid()，再揭开（右阶梯收起 + 星空降生） */
export function playTransition(label: string, mid: () => void): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";
  blocksWrap!.className = "br-blocks cover";
  lowNote();

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    tl.set(blocks, { transformOrigin: "left center" })
      // 盖上：色块左阶梯展开
      .to(blocks, { scaleX: 1, duration: COVER_S, ease: "brHop", stagger: STAGGER }, 0)
      // 大文案：逐字旋升 + 字距收拢（0.3em → 0.18em）
      .to(cs, { y: "0%", rotate: 0, duration: 0.5, ease: "brHop", stagger: 0.04 }, `-=${STAGGER * 1.5}`)
      .to(labelEl, { letterSpacing: "0.18em", textIndent: "0.18em", duration: 0.5, ease: "power2.out" }, "<")
      // 屏息一拍（预期感）→ 换内容
      .add(() => {
        mid();
        skySettle(true);
      }, `+=${HOLD_S}`)
      // 揭开：文案散下（微旋），色块右阶梯收起
      .to(cs, { y: "-115%", rotate: -3, duration: 0.36, ease: "power2.in", stagger: 0.024 }, "+=0.12")
      .set(blocks, { transformOrigin: "right center" })
      .add(() => {
        blocksWrap!.className = "br-blocks reveal";
      }, "<")
      .to(blocks, { scaleX: 0, duration: REVEAL_S, ease: "brHop", stagger: STAGGER }, "-=0.06");
  });
}

/** 开屏揭开：色块全盖 → 品牌名大文案升起 → 停顿凝住一拍 → 色块右收，星空降生 */
export function playIntro(label: string): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";
  blocksWrap!.className = "br-blocks reveal";
  gsap.set(blocks, { scaleX: 1, transformOrigin: "right center" });

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    tl.to(cs, { y: "0%", rotate: 0, duration: 0.55, ease: "brHop", stagger: 0.05 }, 0.12)
      .to(labelEl, { letterSpacing: "0.18em", textIndent: "0.18em", duration: 0.55, ease: "power2.out" }, "<")
      // 凝住一拍（品牌露出足够久）
      .to(cs, { y: "-115%", rotate: -3, duration: 0.36, ease: "power2.in", stagger: 0.026 }, "+=1.1")
      .add(() => {
        skySettle(true);
        lowNote();
      }, "<")
      .to(blocks, { scaleX: 0, duration: REVEAL_S, ease: "brHop", stagger: STAGGER }, "-=0.06");
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
      s.textContent = ch === " " ? " " : ch;
      el.appendChild(s);
    }
  }
  gsap.fromTo(
    el.children,
    { y: "115%" },
    { y: "0%", duration: 0.55, ease: "brHop", stagger: 0.028, overwrite: "auto" },
  );
}
