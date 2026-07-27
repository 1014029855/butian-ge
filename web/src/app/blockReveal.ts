/**
 * Block Reveal 页面过渡（v3 · 逐项逆向 obsidianassembly.com 的原版配方）。
 *
 * 从原站 CSS（default.*.css）完整反推出的参数，配色映射到步天歌的夜空×宣纸：
 *   结构：全屏罩 = 暗场底 + 4 条横贯色块（各 25% 高）+ 中央遮罩文字行。
 *   盖上（enter）：
 *     · 暗场 #0a0d18 由透明淡入 1.2s，cubic-bezier(0.35,0.35,0,1)——旧页先「暗下去」；
 *     · 宣纸色块 transform-origin 左缘，scaleX 0→1，四条同时起跑、时长递增
 *       0.75 / 0.90 / 1.05 / 1.20s，cubic-bezier(0.69,0,0,1)——右端形成平滑斜切前缘
 *       （ stagger 延迟是阶梯感，时长递增才是原站的斜切感 ）；
 *     · 章节名墨色宋体，逐字 translateY 110%→0（overflow 遮罩），
 *       时长同规则递增，字升起时背后恰好是扫满的宣纸。
 *   揭开（leave）：
 *     · 色块 transform-origin 右缘，scaleX→0，时长逆序 1.50 / 1.35 / 1.20 / 1.05s
 *       （左条最慢，斜切方向与盖上相反）；
 *     · 文字 translateY→110% 滑回遮罩，0.85s 起逐字递增；
 *     · 暗场 1.5s 淡出。全程约 2.9s，从容不迫。
 *   材质：色块 #f1eade（宣纸米白）+ 极轻纸纹颗粒 + box-shadow 0 0 0 1px 同色消缝；
 *         文字 #1a1720 墨色，压在宣纸上——夜幕里翻过一页纸。
 * 音效：一声克制的低吟拨弦（懒建 AudioContext，首次手势后生效，增益 0.06）。
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
// 原站两条曲线：色块/文字用「慢启动后猛然挥到位」，暗场用温和对称加速
CustomEase.create("oaIn", "0.69, 0, 0, 1");
CustomEase.create("oaDim", "0.35, 0.35, 0, 1");

const BLOCKS = 4;
/** 盖上：四条同时起跑，时长递增 → 右端斜切 */
const COVER_DUR = [0.75, 0.9, 1.05, 1.2];
/** 揭开：左条最慢（逆序）→ 左端斜切 */
const REVEAL_DUR = [1.5, 1.35, 1.2, 1.05];
const DIM_COVER_S = 1.2;
const DIM_REVEAL_S = 1.5;
/** mid() 调用时点：最慢色块扫满 + 缓冲 */
const MID_AT = 1.3;
/** 揭开开始时点（mid 后留 0.15s 让新内容就位） */
const REVEAL_AT = 1.45;

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CSS = `
.br-overlay { position: fixed; inset: 0; z-index: 90; pointer-events: none; visibility: hidden; }
.br-dim { position: absolute; inset: 0; background: #0a0d18; opacity: 0; will-change: opacity; }
.br-blocks { position: absolute; inset: 0; display: flex; flex-direction: column; }
.br-block {
  display: block; width: 100%; height: 25%;
  background: #f1eade;
  box-shadow: 0 0 0 1px #f1eade; /* 原站手法：消去横条间的子像素缝隙 */
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
.br-block::before {
  content: ""; position: absolute; inset: 0;
  background-image: ${NOISE_SVG};
  opacity: 0.045; mix-blend-mode: multiply;
}
.br-label {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; overflow: hidden;
  padding: 0.08em 0; /* 给撇捺留出行高内的呼吸位 */
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
  font-weight: 600;
  font-size: clamp(40px, 7vw, 96px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  color: #1a1720;
  white-space: nowrap;
}
.br-char { display: inline-block; will-change: transform; }
`;

let overlay: HTMLDivElement | null = null;
let dimEl: HTMLDivElement | null = null;
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
  dimEl = document.createElement("div");
  dimEl.className = "br-dim";
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
  overlay.append(dimEl, blocksWrap, labelEl);
  document.body.appendChild(overlay);
}

/** 文案拆字（逐字 span，配合外层 overflow:hidden 遮罩升降） */
function setLabel(text: string): void {
  if (!labelEl) return;
  labelEl.innerHTML = "";
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "br-char";
    s.textContent = ch === " " ? " " : ch;
    labelEl.appendChild(s);
  }
  gsap.set(labelEl.children, { y: "110%" });
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
function skySettle(): void {
  const canvas = document.getElementById("sky-canvas");
  if (!canvas) return;
  gsap.fromTo(
    canvas,
    { scale: 1.015, opacity: 0.55 },
    { scale: 1, opacity: 1, duration: 1.0, ease: "power2.out", overwrite: "auto" },
  );
}

/**
 * 盖上：暗场淡入 + 宣纸横条左缘斜切扫满 + 章节名逐字升起；
 * 盖满后调 mid() 换内容，再揭开（右缘反向斜切收起 + 暗场淡出）。
 */
export function playTransition(label: string, mid: () => void): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";
  lowNote();

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    tl.set(blocks, { transformOrigin: "left center", scaleX: 0 })
      .set(dimEl, { opacity: 0 })
      // 盖上：旧页暗场 1.2s 淡入
      .to(dimEl, { opacity: 1, duration: DIM_COVER_S, ease: "oaDim" }, 0)
      // 盖上：四条宣纸同时起跑、时长递增 → 平滑斜切扫过
      .to(blocks, { scaleX: 1, duration: (i) => COVER_DUR[i] ?? 1.2, ease: "oaIn" }, 0)
      // 章节名逐字升起（同规则时长递增），字现身时背后恰好是宣纸
      .to(cs, { y: "0%", duration: (i) => 0.75 + i * 0.12, ease: "oaIn" }, 0.05)
      // 盖满 → 换内容
      .add(() => {
        mid();
        skySettle();
      }, MID_AT)
      // 揭开：文字滑回遮罩；色块右缘收起（左条最慢，反向斜切）；暗场淡出
      .to(cs, { y: "110%", duration: (i) => 0.85 + i * 0.1, ease: "oaIn" }, REVEAL_AT)
      .set(blocks, { transformOrigin: "right center" }, REVEAL_AT)
      .to(blocks, { scaleX: 0, duration: (i) => REVEAL_DUR[i] ?? 1.05, ease: "oaIn" }, REVEAL_AT)
      .to(dimEl, { opacity: 0, duration: DIM_REVEAL_S, ease: "oaDim" }, REVEAL_AT);
  });
}

/** 开屏揭开：宣纸满屏 + 品牌名升起 → 凝住一拍 → 右缘斜切揭开，星空降生 */
export function playIntro(label: string): Promise<void> {
  ensureOverlay();
  if (busy) return Promise.resolve();
  busy = true;
  setLabel(label);
  const cs = chars();
  overlay!.style.visibility = "visible";
  gsap.set(dimEl, { opacity: 1 });
  gsap.set(blocks, { scaleX: 1, transformOrigin: "right center" });

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        overlay!.style.visibility = "hidden";
        busy = false;
        resolve();
      },
    });
    // 品牌名逐字升起
    tl.to(cs, { y: "0%", duration: (i) => 0.75 + i * 0.12, ease: "oaIn" }, 0.35)
      // 凝住一拍（品牌露出足够久）
      .to(cs, { y: "110%", duration: (i) => 0.85 + i * 0.1, ease: "oaIn" }, "+=1.15")
      .add(() => {
        skySettle();
        lowNote();
      }, "<")
      .to(blocks, { scaleX: 0, duration: (i) => REVEAL_DUR[i] ?? 1.05, ease: "oaIn" }, "<")
      .to(dimEl, { opacity: 0, duration: DIM_REVEAL_S, ease: "oaDim" }, "<");
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
    { y: "110%" },
    { y: "0%", duration: 0.75, ease: "oaIn", stagger: 0.05, overwrite: "auto" },
  );
}
