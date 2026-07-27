/**
 * 点击拾取后的星官详情卡。
 *
 * 古籍金泥风格，参考旧版 web/src/ui/detailCard.ts 的结构（h2 标题、
 * .meta 副信息、成员星列表），样式由本模块注入（.sky3d-detail-card），
 * 与全局 style.css 解耦，POC 页面也能直接使用。
 *
 * 内容：星官名、星数、成员星名（无中文名则回退 HIP 编号）、
 * 《步天歌》引文（quote 缺省时显示占位句；quoteFrom 为引文出处章节）。
 */

export interface DetailStar {
  /** 中文星名；无则 null，展示时回退为 HIP 编号 */
  name: string | null;
  hip: number;
}

export interface DetailInfo {
  /** 星官名 */
  name: string;
  /** 成员星总数 */
  starCount: number;
  /** 成员星（用于列名，最多展示 MAX_LISTED 颗） */
  stars: DetailStar[];
  /** 《步天歌》引文；缺省时显示占位句 */
  quote?: string;
  /** 引文出处（所属垣/宿章节名，如「西方白虎 · 参宿」）；仅 quote 存在时展示 */
  quoteFrom?: string;
}

export interface DetailCardHandle {
  el: HTMLDivElement;
  /** 在屏幕坐标 (x, y) 旁展示详情卡，自动防出屏 */
  show(info: DetailInfo, x: number, y: number): void;
  hide(): void;
  dispose(): void;
}

/** 列表最多展示的星名数 */
export const MAX_LISTED = 8;
/** 《步天歌》引文占位 */
export const QUOTE_PLACEHOLDER = "《步天歌》引文待辑——「星宿之列，俟考原歌」。";

const CARD_CSS = `
.sky3d-detail-card {
  position: fixed;
  min-width: 240px;
  max-width: 320px;
  padding: 18px 20px;
  background: linear-gradient(160deg, rgba(22, 38, 56, 0.96) 0%, rgba(13, 13, 17, 0.96) 100%);
  border: 1px solid rgba(201, 162, 39, 0.45);
  border-radius: 6px;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55), inset 0 0 18px rgba(201, 162, 39, 0.06);
  color: #fce1b6;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
  z-index: 20;
  pointer-events: none;
  opacity: 0;
  transform: translateY(6px) scale(0.985);
  transition: opacity 0.26s ease-out, transform 0.26s ease-out;
}
.sky3d-detail-card.on { opacity: 1; transform: none; }
/* 描金双线：与章节面板、提示条同一语言 */
.sky3d-detail-card::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.2);
  border-radius: 3px;
  pointer-events: none;
}
.sky3d-detail-card[hidden] { display: none; }
.sky3d-detail-card h2 {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #c9a227;
  text-shadow: 0 0 8px rgba(201, 162, 39, 0.3);
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.28);
}
.sky3d-detail-card .meta {
  margin-top: 6px;
  font-size: 12px;
  letter-spacing: 0.1em;
  opacity: 0.7;
}
.sky3d-detail-card ul {
  margin-top: 10px;
  list-style: none;
  font-size: 13px;
  line-height: 1.9;
}
.sky3d-detail-card ul.cols { columns: 2; column-gap: 18px; }
.sky3d-detail-card li::before {
  content: "·";
  color: #af915f;
  margin-right: 6px;
}
/* 《步天歌》引文：左侧金竖线引文块，宋体大一号 */
.sky3d-detail-card .quote {
  margin-top: 12px;
  padding: 2px 0 2px 11px;
  border-left: 2px solid rgba(201, 162, 39, 0.65);
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 13px;
  letter-spacing: 0.12em;
  line-height: 2;
  color: #d9b96a;
}
.sky3d-detail-card .quote-src {
  margin-top: 6px;
  padding-left: 11px;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 11px;
  letter-spacing: 0.14em;
  line-height: 1.6;
  color: #af915f;
  opacity: 0.65;
  text-align: right;
}
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected) return;
  const el = document.createElement("style");
  el.dataset.sky3dDetailCard = "";
  el.textContent = CARD_CSS;
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

function starLabel(s: DetailStar): string {
  return s.name ?? `HIP ${s.hip}`;
}

export function createDetailCard(container: HTMLElement = document.body): DetailCardHandle {
  injectStyle();

  const el = document.createElement("div");
  el.className = "sky3d-detail-card";
  el.hidden = true;
  container.appendChild(el);

  function show(info: DetailInfo, x: number, y: number): void {
    const listed = info.stars.slice(0, MAX_LISTED);
    el.innerHTML = `
      <h2>${escapeHtml(info.name)}</h2>
      <p class="meta">${info.starCount} 颗成员星</p>
      <ul class="${listed.length > 4 ? "cols" : ""}">${listed.map((s) => `<li>${escapeHtml(starLabel(s))}</li>`).join("")}</ul>
      ${info.starCount > MAX_LISTED ? `<p class="meta">… 等 ${info.starCount} 星</p>` : ""}
      <p class="quote">${escapeHtml(info.quote ?? QUOTE_PLACEHOLDER)}</p>
      ${info.quote && info.quoteFrom ? `<p class="quote-src">——《步天歌》 · ${escapeHtml(info.quoteFrom)}</p>` : ""}
    `;
    el.hidden = false;
    // 入场：先以无 transition 的终前态定位，再翻 .on 播 0.26s 浮起
    el.classList.remove("on");
    // 防出屏：默认放在指针右下，越界则翻到左侧/上移
    const rect = el.getBoundingClientRect();
    let left = x + 18;
    let top = y - 20;
    if (left + rect.width > window.innerWidth - 12) left = x - rect.width - 18;
    if (top + rect.height > window.innerHeight - 12) top = window.innerHeight - rect.height - 12;
    if (top < 12) top = 12;
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    requestAnimationFrame(() => el.classList.add("on"));
  }

  function hide(): void {
    el.classList.remove("on");
    el.hidden = true;
  }

  function dispose(): void {
    el.remove();
  }

  return { el, show, hide, dispose };
}
