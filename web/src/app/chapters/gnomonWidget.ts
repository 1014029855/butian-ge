/**
 * ch3 观象授时 · 圭表测影组件：canvas 2D 侧视圭表 + 日行滑杆 + 读数。
 *
 * 物理模型（提取自旧版 src/chapters/gnomon.ts，纯函数导出以便日后单测）：
 *   登封观星台 φ = 34.7°N；太阳赤纬 Cooper 近似
 *   δ(day) = −23.44°·cos(2π(day+10)/365.25)；正午太阳高度 α = 90°−|φ−δ|；
 *   八尺之表，正午影长 L = 8 / tan(α)。
 * 节气序列以冬至（约年第 355 天）为起点，每 15.22 天一气。
 *
 * 视觉（墨蓝底金线，向古铜/石料质感靠拢）：
 *   石圭——石料渐变圭面 + 尺/寸刻度 + 预生成石纹；
 *   表杆——古铜渐变 + 铜绿锈斑 + 铜帽基座 + 竖排铭「表高八尺」；
 *   日影——正午太阳居南（画面左）、影指北（右），日轮位于
 *   「表顶→影端」光线延长线上（几何自洽），圭面暗影 + 金标影端。
 *
 * 动画：setDayTarget 只写目标天数，组件内部 rAF 以 lerp 逐帧逼近，
 * 每次显示天数变化经 onDayChange 上报（ch3 据此驱动天空季节旋转）。
 * 样式由本模块注入（参考 sky3d/Labels.ts），不改 app.css。
 */

// ---------------------------------------------------------------- 数学

const D2R = Math.PI / 180;

/** 登封观星台纬度（°N） */
export const DENG_FENG_LAT = 34.7;
/** 表高（尺） */
export const BIAO_HEIGHT_CHI = 8;
/** 冬至约在年第 355 天（节气序列起点） */
export const DONGZHI_DAY = 355;
/** 二十四节气（冬至起，每 15.22 天一气） */
export const SOLAR_TERMS: readonly string[] = [
  "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
  "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露",
  "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",
];

/** 太阳赤纬（度），Cooper 近似 */
export function sunDeclinationDeg(day: number): number {
  return -23.44 * Math.cos((2 * Math.PI * (day + 10)) / 365.25);
}
/** 正午太阳高度角（度）：α = 90°−|φ−δ| */
export function noonAltitudeDeg(day: number): number {
  return 90 - Math.abs(DENG_FENG_LAT - sunDeclinationDeg(day));
}
/** 八尺之表的正午影长（尺）：L = 8 / tan(α) */
export function shadowLengthChi(day: number): number {
  return BIAO_HEIGHT_CHI / Math.tan(noonAltitudeDeg(day) * D2R);
}

export interface SolarTermHit {
  name: string;
  index: number;
  /** 该节气在年中的日序（可为小数） */
  day: number;
  /** 有符号偏差：>0 表示已过节气 N 天，<0 表示距节气 N 天 */
  offset: number;
}

/** 距某日最近的节气（环绕年处理） */
export function nearestSolarTerm(day: number): SolarTermHit {
  let best = 0;
  let bestAbs = 999;
  let bestSigned = 0;
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const td = (DONGZHI_DAY + i * 15.22) % 365;
    let d = day - td;
    if (d > 182.5) d -= 365;
    else if (d < -182.5) d += 365;
    if (Math.abs(d) < bestAbs) {
      bestAbs = Math.abs(d);
      best = i;
      bestSigned = d;
    }
  }
  return {
    name: SOLAR_TERMS[best],
    index: best,
    day: (DONGZHI_DAY + best * 15.22) % 365,
    offset: Math.round(bestSigned),
  };
}

/** 年日序（1~365）→ 月/日（平年） */
export function dayOfYearToMonthDay(day: number): { month: number; day: number } {
  const ML = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let d = Math.min(Math.max(Math.round(day), 1), 365);
  let m = 0;
  while (m < 11 && d > ML[m]) {
    d -= ML[m];
    m++;
  }
  return { month: m + 1, day: d };
}

// ---------------------------------------------------------------- 内部工具

const CN_DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
/** 0~99 的汉字数字（尺数/寸数用） */
function cnNum(n: number): string {
  if (n < 10) return CN_DIGITS[n];
  if (n < 20) return "十" + (n % 10 ? CN_DIGITS[n % 10] : "");
  const tens = Math.floor(n / 10);
  return CN_DIGITS[tens] + "十" + (n % 10 ? CN_DIGITS[n % 10] : "");
}

function frac(x: number): number {
  return x - Math.floor(x);
}

function roundRectPath(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** 日轮光晕预制成 sprite，避免逐帧创建径向渐变 */
function createGlowSprite(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  if (g) {
    const rg = g.createRadialGradient(32, 32, 2, 32, 32, 32);
    rg.addColorStop(0, "rgba(252, 225, 182, 0.9)");
    rg.addColorStop(0.3, "rgba(252, 225, 182, 0.25)");
    rg.addColorStop(1, "rgba(252, 225, 182, 0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 64, 64);
  }
  return c;
}

// ---------------------------------------------------------------- 样式

const SLAB_TOP = 8; // 圭面厚度（px）
const SLAB_H = 15; // 圭面 + 侧面总厚（px）

const GNOMON_CSS = `
.gw {
  width: min(560px, 44vw);
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 16px 18px 10px;
  backdrop-filter: blur(4px);
  pointer-events: auto;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.9s var(--ease-sig) 0.12s, transform 0.9s var(--ease-sig) 0.12s;
}
.chapter.inview .gw { opacity: 1; transform: none; }
.gw-canvas { display: block; width: 100%; height: 300px; }
.gw-readout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 18px;
  margin: 10px 2px 12px;
}
.gw-cell { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.gw-k { flex: none; font-size: 11px; letter-spacing: 0.2em; color: rgba(175, 145, 95, 0.85); }
.gw-v {
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.06em;
  color: #fce1b6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gw-slider-wrap { position: relative; padding: 0 2px; }
.gw-slider {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 22px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.gw-slider:focus-visible { outline: 1px solid rgba(201, 162, 39, 0.6); outline-offset: 2px; }
.gw-slider::-webkit-slider-runnable-track {
  height: 2px;
  background: linear-gradient(90deg, rgba(175, 145, 95, 0.25), rgba(201, 162, 39, 0.65), rgba(175, 145, 95, 0.25));
}
.gw-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fce1b6, #c9a227 60%, #8a6f2c);
  border: 1px solid rgba(252, 225, 182, 0.7);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.55);
}
.gw-slider::-moz-range-track { height: 2px; background: rgba(175, 145, 95, 0.45); }
.gw-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #c9a227;
  border: 1px solid rgba(252, 225, 182, 0.7);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.55);
}
.gw-marks { position: relative; height: 30px; margin-top: 1px; }
.gw-tick {
  position: absolute;
  top: 0;
  width: 1px;
  height: 6px;
  background: rgba(175, 145, 95, 0.55);
  transform: translateX(-50%);
}
.gw-mark {
  position: absolute;
  top: 8px;
  transform: translateX(-50%);
  background: none;
  border: none;
  padding: 2px 3px;
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(252, 225, 182, 0.6);
  cursor: pointer;
}
.gw-mark:hover, .gw-mark:focus-visible {
  color: #fce1b6;
  outline: none;
  text-shadow: 0 0 8px rgba(252, 225, 182, 0.4);
}
.gw-mark--start { transform: none; }
.gw-mark--end { transform: translateX(-100%); }
.gw-fallback { font-size: 13px; color: rgba(252, 225, 182, 0.7); padding: 24px 8px; text-align: center; }
@media (max-width: 960px) {
  .gw { padding: 12px 14px 8px; }
  .gw-canvas { height: 230px; }
  .gw-readout { margin: 8px 0 10px; }
  .gw-v { font-size: 13px; }
}
`;

let gnomonStyleInjected = false;
function injectGnomonStyle(): void {
  if (gnomonStyleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.gnomonWidget = "";
  el.textContent = GNOMON_CSS;
  document.head.appendChild(el);
  gnomonStyleInjected = true;
}

// ---------------------------------------------------------------- 组件

export interface GnomonWidgetOptions {
  /** 显示天数每次变化时回调（lerp 逐帧 / 拖拽 / 点击节气标记），参数可为小数 */
  onDayChange?: (day: number) => void;
}

export interface GnomonWidget {
  /** 组件根元素（含画框样式，直接挂入章节布局即可） */
  el: HTMLElement;
  /** 当前显示天数（lerp 进行中为小数） */
  readonly day: number;
  /** 设置目标天数（自动钳制到 1~365）；日影经 lerp 平滑过渡 */
  setDayTarget(day: number): void;
}

export function createGnomonWidget(opts: GnomonWidgetOptions = {}): GnomonWidget {
  injectGnomonStyle();

  const el = document.createElement("div");
  el.className = "gw";
  el.setAttribute("role", "group");
  el.setAttribute("aria-label", "圭表测影：拖动滑杆查看一年中正午日影变化");

  const canvas = document.createElement("canvas");
  canvas.className = "gw-canvas";
  el.appendChild(canvas);

  const readout = document.createElement("div");
  readout.className = "gw-readout";
  readout.innerHTML = `
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`;
  el.appendChild(readout);
  const rDate = readout.querySelector<HTMLElement>('[data-r="date"]')!;
  const rTerm = readout.querySelector<HTMLElement>('[data-r="term"]')!;
  const rShadow = readout.querySelector<HTMLElement>('[data-r="shadow"]')!;
  const rAlt = readout.querySelector<HTMLElement>('[data-r="alt"]')!;

  const sliderWrap = document.createElement("div");
  sliderWrap.className = "gw-slider-wrap";
  const slider = document.createElement("input");
  slider.className = "gw-slider";
  slider.type = "range";
  slider.min = "1";
  slider.max = "365";
  slider.step = "1";
  slider.value = String(DONGZHI_DAY);
  slider.setAttribute("aria-label", "一年中的第几天");
  sliderWrap.appendChild(slider);

  // 轨道标记：二分二至（点击可跳至该节气）
  const marks = document.createElement("div");
  marks.className = "gw-marks";
  for (const name of ["冬至", "春分", "夏至", "秋分"]) {
    const i = SOLAR_TERMS.indexOf(name);
    const td = (DONGZHI_DAY + i * 15.22) % 365;
    const pct = (td - 1) / 364;
    const pos = `calc(7px + (100% - 14px) * ${pct.toFixed(4)})`;
    const tick = document.createElement("i");
    tick.className = "gw-tick";
    tick.style.left = pos;
    marks.appendChild(tick);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "gw-mark" + (pct < 0.08 ? " gw-mark--start" : pct > 0.92 ? " gw-mark--end" : "");
    btn.style.left = pos;
    btn.textContent = name;
    btn.title = `跳至${name}（第 ${Math.round(td)} 天）`;
    btn.addEventListener("click", () => setDayTarget(Math.round(td)));
    marks.appendChild(btn);
  }
  sliderWrap.appendChild(marks);
  el.appendChild(sliderWrap);

  // ---- 绘图上下文（不可用时降级为提示，读数仍可用） ----
  const g2d = canvas.getContext("2d");
  if (!g2d) {
    const note = document.createElement("p");
    note.className = "gw-fallback";
    note.textContent = "当前浏览器无法创建绘图上下文，圭表测影演示不可用。";
    canvas.replaceWith(note);
  }
  const glow = createGlowSprite();

  // 预生成石纹与铜锈（确定性伪随机，避免逐帧闪烁）
  const streaks = Array.from({ length: 14 }, (_, i) => ({
    rx: frac(Math.sin(i * 12.9898) * 43758.5453),
    ry: frac(Math.sin(i * 78.233) * 12543.217),
    len: 0.1 + 0.25 * frac(Math.sin(i * 3.7) * 9876.543),
    dark: i % 2 === 0,
  }));
  const patina = Array.from({ length: 5 }, (_, i) => ({
    dx: -0.3 + 0.6 * frac(Math.sin(i * 5.13) * 3210.7),
    ry: 0.12 + 0.76 * frac(Math.sin(i * 9.31) * 7777.7),
    h: 0.08 + 0.12 * frac(Math.sin(i * 2.17) * 5555.5),
  }));

  // ---- 状态与 lerp 循环（仅在逼近目标或需重绘时占用 rAF） ----
  let currentDay = DONGZHI_DAY;
  let targetDay = DONGZHI_DAY;
  let dragging = false;
  let dirty = true;
  let rafId = 0;
  let cssW = 0;
  let cssH = 0;

  function setDayTarget(day: number): void {
    targetDay = Math.min(Math.max(day, 1), 365);
    poke();
  }

  function poke(): void {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick(): void {
    rafId = 0;
    const prev = currentDay;
    const diff = targetDay - currentDay;
    currentDay = Math.abs(diff) < 0.04 ? targetDay : currentDay + diff * 0.2;
    const moved = currentDay !== prev;
    if (moved || dirty) {
      updateReadout();
      paint();
      dirty = false;
    }
    if (moved) opts.onDayChange?.(currentDay);
    if (currentDay !== targetDay) rafId = requestAnimationFrame(tick);
  }

  function updateReadout(): void {
    const dayInt = Math.min(Math.max(Math.round(currentDay), 1), 365);
    const md = dayOfYearToMonthDay(dayInt);
    rDate.textContent = `${md.month} 月 ${md.day} 日 · 第 ${dayInt} 天`;
    const t = nearestSolarTerm(dayInt);
    rTerm.textContent =
      t.offset === 0
        ? `正值【${t.name}】`
        : t.offset > 0
          ? `【${t.name}】后 ${t.offset} 天`
          : `距【${t.name}】 ${-t.offset} 天`;
    const L = shadowLengthChi(currentDay);
    let chi = Math.floor(L);
    let cun = Math.round((L - chi) * 10);
    if (cun === 10) {
      chi += 1;
      cun = 0;
    }
    rShadow.textContent = `${cnNum(chi)}尺${cun > 0 ? cnNum(cun) + "寸" : "整"} · ${L.toFixed(2)} 尺`;
    rAlt.textContent = `${noonAltitudeDeg(currentDay).toFixed(1)}°`;
    // 拖拽/键盘聚焦时滑杆归用户，其余情况Thumb跟随显示天数
    if (!dragging && document.activeElement !== slider) slider.value = String(dayInt);
  }

  function paint(): void {
    if (!g2d || cssW < 60 || cssH < 60) return;
    const g = g2d;
    const W = cssW;
    const H = cssH;
    g.clearRect(0, 0, W, H);

    // 背景天光：上深下近墨，真实星空可微微透出
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "rgba(22, 38, 56, 0.5)");
    bg.addColorStop(0.6, "rgba(13, 13, 17, 0.12)");
    bg.addColorStop(1, "rgba(13, 13, 17, 0.4)");
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    const L = shadowLengthChi(currentDay);
    const altDeg = noonAltitudeDeg(currentDay);
    const altRad = Math.min(Math.max(altDeg, 6), 82) * D2R;

    const groundY = H - 62;
    const chiPx = Math.min((W - 150) / 14.2, (groundY - 92) / 8); // 1 尺的像素长（纵横同尺）
    const biaoH = BIAO_HEIGHT_CHI * chiPx;
    const rulerW = 13.6 * chiPx;
    const biaoX = (W - rulerW - 110) / 2 + 100; // 左侧留给太阳约 100px
    const topY = groundY - biaoH;
    const tipX = biaoX + L * chiPx;
    const guiX0 = biaoX - 12;
    const guiX1 = biaoX + rulerW;

    // 地平线处的暖色微光（随太阳高度呼吸）
    const hg = g.createRadialGradient(biaoX - 60, groundY, 0, biaoX - 60, groundY, 220);
    hg.addColorStop(0, `rgba(252, 225, 182, ${(0.05 + 0.04 * Math.sin(altRad)).toFixed(3)})`);
    hg.addColorStop(1, "rgba(252, 225, 182, 0)");
    g.fillStyle = hg;
    g.fillRect(0, groundY - 160, W, 200);

    // 大地
    g.strokeStyle = "rgba(175, 145, 95, 0.35)";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(14, groundY + SLAB_H);
    g.lineTo(W - 14, groundY + SLAB_H);
    g.stroke();

    // ---- 石圭 ----
    const topGrad = g.createLinearGradient(0, groundY, 0, groundY + SLAB_TOP);
    topGrad.addColorStop(0, "#3b4552");
    topGrad.addColorStop(1, "#252d38");
    g.fillStyle = topGrad;
    roundRectPath(g, guiX0, groundY, guiX1 - guiX0, SLAB_TOP, 2.5);
    g.fill();
    const frontGrad = g.createLinearGradient(0, groundY + SLAB_TOP, 0, groundY + SLAB_H);
    frontGrad.addColorStop(0, "#1a212b");
    frontGrad.addColorStop(1, "#10151d");
    g.fillStyle = frontGrad;
    g.fillRect(guiX0, groundY + SLAB_TOP, guiX1 - guiX0, SLAB_H - SLAB_TOP);
    g.strokeStyle = "rgba(252, 225, 182, 0.14)"; // 圭面上沿高光
    g.beginPath();
    g.moveTo(guiX0 + 2, groundY + 0.5);
    g.lineTo(guiX1 - 2, groundY + 0.5);
    g.stroke();
    for (const s of streaks) {
      const sx = guiX0 + 6 + s.rx * (guiX1 - guiX0 - 12);
      const sy = groundY + 1.5 + s.ry * (SLAB_H - 3);
      g.strokeStyle = s.dark ? "rgba(0, 0, 0, 0.16)" : "rgba(252, 225, 182, 0.05)";
      g.beginPath();
      g.moveTo(sx, sy);
      g.lineTo(sx + s.len * 40, sy);
      g.stroke();
    }

    // 刻度（尺 / 半尺 / 寸，密度自适应）
    const showCun = chiPx >= 26;
    g.lineWidth = 1;
    for (let c = 0; c <= 136; c++) {
      const isChi = c % 10 === 0;
      if (!isChi && !showCun && c % 5 !== 0) continue;
      const x = biaoX + (c * chiPx) / 10;
      if (x > guiX1 - 1.5) break;
      const h = isChi ? 6 : c % 5 === 0 ? 4 : 2.5;
      g.strokeStyle = isChi ? "rgba(8, 10, 14, 0.9)" : "rgba(8, 10, 14, 0.6)";
      g.beginPath();
      g.moveTo(x, groundY + 1);
      g.lineTo(x, groundY + 1 + h);
      g.stroke();
    }
    g.font = '9px "STSong", "SimSun", "Songti SC", serif';
    g.fillStyle = "rgba(175, 145, 95, 0.9)";
    g.textAlign = "center";
    g.textBaseline = "top";
    for (let chi = 0; chi <= 13; chi++) {
      const x = biaoX + chi * chiPx;
      if (x > guiX1 - 2) break;
      g.fillText(cnNum(chi), x, groundY + SLAB_H + 4);
    }

    // ---- 正午日影（圭面暗影 + 金标影端） ----
    const shGrad = g.createLinearGradient(biaoX, 0, tipX, 0);
    shGrad.addColorStop(0, "rgba(3, 5, 9, 0.78)");
    shGrad.addColorStop(0.75, "rgba(3, 5, 9, 0.55)");
    shGrad.addColorStop(1, "rgba(3, 5, 9, 0.15)");
    g.fillStyle = shGrad;
    g.fillRect(biaoX, groundY + 1, Math.max(tipX - biaoX, 1.5), SLAB_TOP - 1);
    g.strokeStyle = "#c9a227";
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(tipX, groundY - 4);
    g.lineTo(tipX, groundY + SLAB_H);
    g.stroke();
    g.save();
    g.translate(tipX, groundY - 7);
    g.rotate(Math.PI / 4);
    g.fillStyle = "#c9a227";
    g.fillRect(-2.4, -2.4, 4.8, 4.8);
    g.restore();

    // ---- 古铜表杆 ----
    const pw = Math.max(6, chiPx * 0.38);
    const bronze = g.createLinearGradient(biaoX - pw / 2, 0, biaoX + pw / 2, 0);
    bronze.addColorStop(0, "#3f2e1a");
    bronze.addColorStop(0.35, "#a87f3d");
    bronze.addColorStop(0.5, "#dcba68");
    bronze.addColorStop(0.65, "#a87f3d");
    bronze.addColorStop(1, "#372812");
    g.fillStyle = bronze;
    g.fillRect(biaoX - pw / 2, topY, pw, biaoH);
    for (const p of patina) {
      g.fillStyle = "rgba(112, 148, 126, 0.14)";
      g.fillRect(biaoX + p.dx * pw - 0.75, topY + p.ry * biaoH, 1.5, p.h * biaoH);
    }
    // 表顶铜帽
    g.fillStyle = "#8a6a35";
    g.beginPath();
    g.moveTo(biaoX - pw * 0.85, topY);
    g.lineTo(biaoX - pw * 0.42, topY - 6);
    g.lineTo(biaoX + pw * 0.42, topY - 6);
    g.lineTo(biaoX + pw * 0.85, topY);
    g.closePath();
    g.fill();
    g.strokeStyle = "rgba(252, 225, 182, 0.35)";
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(biaoX - pw * 0.42, topY - 6);
    g.lineTo(biaoX + pw * 0.42, topY - 6);
    g.stroke();
    // 基座
    const baseGrad = g.createLinearGradient(0, groundY - 11, 0, groundY);
    baseGrad.addColorStop(0, "#5a4423");
    baseGrad.addColorStop(1, "#2c2010");
    g.fillStyle = baseGrad;
    g.beginPath();
    g.moveTo(biaoX - pw * 0.8, groundY - 11);
    g.lineTo(biaoX + pw * 0.8, groundY - 11);
    g.lineTo(biaoX + pw * 1.7, groundY);
    g.lineTo(biaoX - pw * 1.7, groundY);
    g.closePath();
    g.fill();
    // 竖排铭「表高八尺」
    g.font = '10px "STSong", "SimSun", "Songti SC", serif';
    g.fillStyle = "rgba(201, 162, 39, 0.8)";
    g.textAlign = "center";
    g.textBaseline = "top";
    const labelX = biaoX - pw / 2 - 11;
    "表高八尺".split("").forEach((ch, i) => {
      g.fillText(ch, labelX, topY + 18 + i * 13);
    });

    // ---- 正午太阳：居南（画面左），位于表顶—影端光线延长线上 ----
    const dirX = -Math.cos(altRad);
    const dirY = -Math.sin(altRad);
    let sunD = Math.min(170, (topY - 28) / Math.sin(altRad), (biaoX - 30) / Math.cos(altRad));
    sunD = Math.max(sunD, 26);
    const sunX = biaoX + dirX * sunD;
    const sunY = topY + dirY * sunD;
    g.drawImage(glow, sunX - 30, sunY - 30, 60, 60);
    g.fillStyle = "#fce1b6";
    g.beginPath();
    g.arc(sunX, sunY, 8.5, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgba(201, 162, 39, 0.75)";
    g.lineWidth = 1;
    g.beginPath();
    g.arc(sunX, sunY, 11.5, 0, Math.PI * 2);
    g.stroke();
    // 光线：日轮 → 表顶 → 影端
    g.strokeStyle = "rgba(252, 225, 182, 0.4)";
    g.beginPath();
    g.moveTo(sunX - dirX * 12, sunY - dirY * 12);
    g.lineTo(biaoX, topY);
    g.stroke();
    g.setLineDash([3, 4]);
    g.strokeStyle = "rgba(252, 225, 182, 0.22)";
    g.beginPath();
    g.moveTo(biaoX, topY);
    g.lineTo(tipX, groundY);
    g.stroke();
    g.setLineDash([]);
  }

  // ---- 事件 ----
  slider.addEventListener("input", () => {
    const v = Number(slider.value);
    targetDay = v;
    if (!dragging) currentDay = v; // 键盘步进即时响应；拖拽走 lerp 平滑过渡
    poke();
  });
  slider.addEventListener("pointerdown", () => {
    dragging = true;
  });
  window.addEventListener("pointerup", () => {
    dragging = false;
  });
  window.addEventListener("pointercancel", () => {
    dragging = false;
  });

  function resize(): void {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === cssW && h === cssH) return;
    cssW = w;
    cssH = h;
    if (g2d && w > 0 && h > 0) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      g2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    dirty = true;
    poke();
  }
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  resize();

  return {
    el,
    get day() {
      return currentDay;
    },
    setDayTarget,
  };
}
