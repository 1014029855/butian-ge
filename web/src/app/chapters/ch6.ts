/**
 * ch6 一万年：岁差时间机。相机球外 r≈3R（CameraRig.CHAPTER_KEYS[5]，不在本章控制）。
 *
 * 交互模型：
 *   - update(p) 把章内进度线性映射为岁差年数 years = lerp(-10000, +14000, p)，
 *     调 SkyApp.setSkyRotation(0, years)——整球绕黄极刚体旋转由 sky3d/coords
 *     .precessionMat3 在 SkyApp 内部完成，本章只给年数（绝对设置、幂等）。
 *   - 场景根固定一枚金色小环在世界北极 (0, 1.01R, 0)（rotateWithSky:false，
 *     不随天球转）：岁差推进时星空在固定极下转动，哪颗星接近北极一目了然。
 *   - DOM：下方居中的大号年份读数（「公元前 8000 年 / 公元后 13700 年」格式，
 *     仅整数年变化时重写文本，避免 scrub 高频重排）+ 时间刻度尺
 *     （−10000…0…+14000，标注三颗历代北极星：帝星≈−1000、勾陈一=今、
 *     织女一≈+13700，附当前年份指针）。
 *   - 文案面板靠左上，内容一律取自 ctx.copy。
 *   - exit：setSkyRotation(0, 0) 归零、removeSkyObject 并 dispose 金环。
 *
 * 注意：岁差旋转非零时星点拾取坐标未同步旋转，本章不开启拾取（球外本来也不拾取）。
 */
import * as THREE from "three";
import type { Chapter, ChapterCtx } from "../chapters";
import { R } from "../SkyApp";

/** 行程两端：距 J2000 的年数（setSkyRotation 的第二参数） */
const YEARS_START = -10000;
const YEARS_END = 14000;
const YEARS_SPAN = YEARS_END - YEARS_START;

/** 刻度尺上标注的三颗「历代北极星」（岁差偏移年 + 副注） */
const POLE_STAR_MARKS = [
  { name: "帝星", years: -1000, note: "−1000" },
  { name: "勾陈一", years: 0, note: "今" },
  { name: "织女一", years: 13700, note: "+13700" },
] as const;

/** 刻度尺端点/零点数字标注 */
const END_LABELS = [
  { years: YEARS_START, text: "−10000", cls: "ch6-endlab--start" },
  { years: 0, text: "0", cls: "" },
  { years: YEARS_END, text: "+14000", cls: "ch6-endlab--end" },
] as const;

/** 细分刻度间隔（年） */
const TICK_STEP = 2000;

/** 金环：半径≈1.5 世界单位，细管 */
const RING_RADIUS = 1.5;
const RING_TUBE = 0.07;

const CH6_CSS = `
.ch6-panel { left: 6vw; top: 8vh; bottom: auto; }
.ch6-time {
  position: absolute;
  left: 50%;
  bottom: 6vh;
  transform: translateX(-50%);
  width: min(76vw, 880px);
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s var(--ease-sig, ease);
}
.chapter.inview .ch6-time { opacity: 1; }
.ch6-year {
  font-family: var(--font-display, "STSong", "SimSun", serif);
  color: var(--gold, #c9a227);
  font-size: clamp(30px, 4.6vw, 58px);
  letter-spacing: 0.1em;
  text-shadow: 0 0 26px rgba(201, 162, 39, 0.35);
  margin-bottom: 20px;
  white-space: nowrap;
}
.ch6-year .ch6-era,
.ch6-year .ch6-suffix {
  font-size: 0.42em;
  color: var(--cream, #fce1b6);
  opacity: 0.85;
  letter-spacing: 0.28em;
}
.ch6-year .ch6-era { display: inline-block; min-width: 3.2em; text-align: right; margin-right: 0.6em; }
.ch6-year .ch6-suffix { margin-left: 0.5em; }
.ch6-year .ch6-num {
  display: inline-block;
  min-width: 4.6ch;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.ch6-ruler { position: relative; height: 64px; }
.ch6-ruler-line {
  position: absolute;
  left: 0; right: 0; top: 34px;
  height: 1px;
  background: linear-gradient(90deg, rgba(175, 145, 95, 0.15), rgba(175, 145, 95, 0.75), rgba(175, 145, 95, 0.15));
}
.ch6-tick {
  position: absolute;
  top: 31px; width: 1px; height: 7px;
  background: rgba(175, 145, 95, 0.4);
}
.ch6-tick--major {
  top: 28px; height: 13px;
  background: rgba(201, 162, 39, 0.7);
}
.ch6-endlab {
  position: absolute;
  top: 46px;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--gold-dim, #af915f);
  font-variant-numeric: tabular-nums;
}
.ch6-endlab--start { transform: none; }
.ch6-endlab--end { transform: translateX(-100%); }
.ch6-mark { position: absolute; top: 0; transform: translateX(-50%); text-align: center; }
.ch6-mark .ch6-mark-name {
  display: block;
  font-family: var(--font-display, "STSong", "SimSun", serif);
  font-size: 14px;
  letter-spacing: 0.22em;
  color: var(--cream, #fce1b6);
  white-space: nowrap;
}
.ch6-mark .ch6-mark-yr {
  display: block;
  margin-top: 1px;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--gold-dim, #af915f);
  font-variant-numeric: tabular-nums;
}
.ch6-mark .ch6-mark-dot {
  position: absolute;
  left: 50%; top: 31px;
  width: 7px; height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.8);
}
.ch6-pointer {
  position: absolute;
  top: 23px; left: 0;
  width: 0; height: 0;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid var(--gold, #c9a227);
  filter: drop-shadow(0 0 6px rgba(201, 162, 39, 0.9));
}
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch6 = "";
  el.textContent = CH6_CSS;
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

/** 年数（J2000 偏移）→ 刻度尺上的水平位置百分比 */
function rulerPct(years: number): number {
  return ((years - YEARS_START) / YEARS_SPAN) * 100;
}

/** 格式化读数：公元前 8000 年 / 公元 2000 年 / 公元后 13700 年（无第 0 年） */
function formatYear(yearsFromJ2000: number): { era: string; num: number } {
  const cal = 2000 + yearsFromJ2000;
  if (cal <= 0) return { era: "公元前", num: 1 - cal };
  return { era: cal < 3000 ? "公元" : "公元后", num: cal };
}

export function createChapter(ctx: ChapterCtx): Chapter {
  injectStyle();
  const pin = ctx.root.querySelector(".pin")!;

  // ---- 文案面板（靠左上，复用全局 .chapter-panel 基础样式，本章样式只改定位） ----
  const panel = document.createElement("div");
  panel.className = "chapter-panel ch6-panel";
  panel.innerHTML = `
    <p class="eyebrow">${escapeHtml(ctx.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(ctx.copy.title)}</h2>
      ${ctx.copy.seal ? `<div class="seal">${escapeHtml(ctx.copy.seal)}</div>` : ""}
    </div>
    <p class="hook">${escapeHtml(ctx.copy.hook)}</p>
    ${ctx.copy.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
  `;
  pin.appendChild(panel);

  // ---- 时间 UI：大号读数 + 刻度尺 ----
  const timeEl = document.createElement("div");
  timeEl.className = "ch6-time";

  const ticks: string[] = [];
  for (let y = YEARS_START; y <= YEARS_END; y += TICK_STEP) {
    const major = y === YEARS_START || y === 0 || y === YEARS_END;
    ticks.push(
      `<div class="ch6-tick${major ? " ch6-tick--major" : ""}" style="left:${rulerPct(y).toFixed(3)}%"></div>`,
    );
  }
  const endLabels = END_LABELS.map(
    (l) =>
      `<div class="ch6-endlab ${l.cls}" style="left:${rulerPct(l.years).toFixed(3)}%">${l.text}</div>`,
  );
  const marks = POLE_STAR_MARKS.map(
    (m) => `
    <div class="ch6-mark" style="left:${rulerPct(m.years).toFixed(3)}%">
      <span class="ch6-mark-name">${m.name}</span>
      <span class="ch6-mark-yr">${m.note}</span>
      <span class="ch6-mark-dot"></span>
    </div>`,
  );

  timeEl.innerHTML = `
    <div class="ch6-year"><span class="ch6-era">公元前</span><span class="ch6-num">8000</span><span class="ch6-suffix">年</span></div>
    <div class="ch6-ruler">
      <div class="ch6-ruler-line"></div>
      ${ticks.join("")}
      ${endLabels.join("")}
      ${marks.join("")}
      <div class="ch6-pointer"></div>
    </div>
  `;
  pin.appendChild(timeEl);

  const eraEl = timeEl.querySelector<HTMLElement>(".ch6-era")!;
  const numEl = timeEl.querySelector<HTMLElement>(".ch6-num")!;
  const pointerEl = timeEl.querySelector<HTMLElement>(".ch6-pointer")!;

  // ---- 北极金环（enter 挂载 / exit 移除并 dispose） ----
  let poleRing: THREE.Mesh | null = null;
  function mountPoleRing(): THREE.Mesh {
    const geo = new THREE.TorusGeometry(RING_RADIUS, RING_TUBE, 12, 96);
    const mat = new THREE.MeshBasicMaterial({ color: 0xc9a227 });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = Math.PI / 2; // 环面贴赤道面，环绕北极点
    ring.position.set(0, 1.01 * R, 0);
    return ring;
  }

  // ---- 状态：只在数值变化时碰 DOM ----
  let lastP = 0;
  let shownYear = Number.NaN;
  let shownPct = Number.NaN;

  function applyYears(years: number): void {
    ctx.sky.setSkyRotation(0, years);

    const y = Math.round(years);
    if (y !== shownYear) {
      shownYear = y;
      const { era, num } = formatYear(y);
      eraEl.textContent = era;
      numEl.textContent = String(num);
    }
    const pct = Math.round(rulerPct(years) * 100) / 100;
    if (pct !== shownPct) {
      shownPct = pct;
      pointerEl.style.left = `${pct}%`;
    }
  }

  return {
    enter() {
      ctx.root.classList.add("inview");
      poleRing = mountPoleRing();
      // 固定在世界北极，不随天球岁差旋转
      ctx.sky.addSkyObject(poleRing, { rotateWithSky: false });
      applyYears(YEARS_START + lastP * YEARS_SPAN); // 重进章时先恢复到上次进度
    },
    update(p) {
      lastP = p;
      applyYears(YEARS_START + p * YEARS_SPAN);
    },
    exit() {
      ctx.root.classList.remove("inview");
      ctx.sky.setSkyRotation(0, 0); // 岁差归零（幂等）
      if (poleRing) {
        ctx.sky.removeSkyObject(poleRing);
        poleRing.geometry.dispose();
        (poleRing.material as THREE.Material).dispose();
        poleRing = null;
      }
    },
  };
}
