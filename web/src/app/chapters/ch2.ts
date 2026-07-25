/**
 * ch2 星野漫游（重构版）：「点亮 = 被命名」三段叙事 + 循诗寻星游戏。
 *
 * 三段结构（章内局部进度 p，总行程不变）：
 *
 *   段1 诗亮星空  p∈[0, 0.35)
 *     - enter/回滚到本段时全部星官组归零（无名星空），标签开，不开拾取（防误触）；
 *     - p∈[0,0.05) 标题/旁白面板（copy.body[0]）；
 *     - p∈[0.05,0.30) 《步天歌》五句逐句浮现（竖排居中大字，一句一屏），
 *       每句对应星官随句生长点亮（SEG1_LINES，诗句为简体转写，出处见各行注释）；
 *     - p∈[0.30,0.35) 三垣四象全部组拉满（全景齐亮）+ 点题句（copy.body[1]）。
 *
 *   段2 循诗寻星  p∈[0.35, 0.80)（游戏段，题目见 copy.ts 的 CH2_QUESTS）
 *     - 题目卡固定底部中央；进入每题：目标组熄灭（setGroupProgress 0），拾取开；
 *     - 点对（PickPayload.info.name === target）：目标组生长点亮 + bloom 短促脉冲
 *       （1.6 → 0.78，0.8s gsap 缓回）+ 题目卡翻页（诗句 text/出处 from 运行时
 *       查 /data/poem.json，白话释义 plain 来自 CH2_QUESTS）→ 1.2s 后切下一题；
 *     - 点错 1 次：屏幕边缘出现方向箭头（目标质心投影，越界钳在边缘，atan2 指向）；
 *     - 点错 2 次或 20s 无操作：目标质心处浮现淡金光圈（Sprite 环，
 *       addSkyObject 挂载、rotateWithSky 默认）；
 *     - 「跳过」小字按钮（pointer-events:auto）：点亮目标并直接进下一题；
 *     - 提前滚过 0.80 未答完：剩余题目自动点亮，题目卡显示「星空已全部为你点亮」。
 *
 *   段3 自由探索  p∈[0.80, 1]
 *     - 全图点亮（未亮组补 1），「现在，把星空交给你」面板 + 回顾小字，拾取开，
 *       保留 atlas-hint。
 *
 * 状态机与滚动进度 p 的关系（幂等、双向回滚正确）：
 *   - update(p) 只做段归属判断（ch2SegmentOf）与段内连续量（段1 的生长进度、
 *     DOM 显隐微调）；答题推进全部走事件（onPick / 跳过 / 计时器）；
 *   - 段切换（onSegEnter）负责一次性现场重建：进答题段按「已答亮 / 当前灭」
 *     重放星空与卡片；离开答题段暂停计时、答对翻页中的题立即结算；
 *   - enter() 以最近一次 p 调 applyProgress 重放现场（ScrollTrigger 随后
 *     还会补一次 onUpdate），exit() 置 seg=-1 强制重进时重建。
 *
 * 相机：段1 用 frame(dt) 钩子做脚本注视巡游（当前句星官方向，权重阻尼到
 *   0.85、朝向 slerp 平滑切换，离开段1 自动归零释放）。frame 钩子由 app.ts
 *   主循环在 applyCameraState 之后调用，故不会被 rig 每帧覆写（早期版本的
 *   「setGazeBlend 被冲掉」问题由此解决）。段2/段3 相机完全归用户。
 * 防泄题：答题段关闭星官名标签（setLabelsEnabled false）与悬停星名提示条
 *   （setHoverTipEnabled false，高亮环保留作拾取反馈），探索段与 exit 恢复。
 *
 * 目标质心（赤经/赤纬，度；硬编码，推算方式）：
 *   由 public/data/asterisms.json 各星官成员 HIP 查 public/data/stars.json 的
 *   ra/dec，做单位矢量平均（避免赤经环绕问题）再转回球坐标：
 *     北斗 7星 ra≈186.0 dec≈56.5   勾陈 6星 ra≈269.6 dec≈86.5
 *     天狼 1星 ra≈101.3 dec≈-16.7  织女 3星 ra≈280.5 dec≈38.7
 *     北极 5星 ra≈218.6 dec≈76.8   心宿 3星 ra≈247.2 dec≈-26.8
 *     河鼓 3星 ra≈297.7 dec≈8.6
 *
 * 样式：模块内注入 <style>（Labels.ts 同款守卫），类名 ch2- 前缀；
 * 面板描金双细线（外框 + ::before 内压 hairline）对齐 app.css 的 .chapter-panel。
 */
import * as THREE from "three";
import { gsap } from "gsap";
import type { Chapter, ChapterCtx } from "../chapters";
import { gazeQuat } from "../CameraRig";
import { CH2_QUESTS } from "../copy";
import { radecToVec3 } from "../../sky3d/coords";
import { dataUrl } from "../../sky3d/dataUrl";
import type { PickPayload } from "../SkyApp";

// ---------------------------------------------------------------- 纯逻辑（导出供单测）

/** 段边界：段1 [0, SEG1_END) · 段2 [SEG1_END, SEG2_END) · 段3 [SEG2_END, 1] */
export const CH2_SEG1_END = 0.35;
export const CH2_SEG2_END = 0.8;

/** 段1 内部节奏：标题/旁白 [0, 0.05) · 五句点亮 [0.05, 0.30) · 齐亮点题 [0.30, 0.35) */
const SEG1_INTRO_END = 0.05;
const SEG1_LINES_END = 0.3;
/** 五句行数（与 SEG1_LINES 一致，单测守护） */
export const CH2_SEG1_LINE_COUNT = 5;

/** 无操作多少秒后升级为光圈提示 */
export const CH2_IDLE_HINT_SECONDS = 20;

const SEG_POEM = 0;
const SEG_QUIZ = 1;
const SEG_EXPLORE = 2;

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

/** 段归属：0=诗亮星空 1=循诗寻星 2=自由探索（越界输入自动钳制） */
export function ch2SegmentOf(p: number): 0 | 1 | 2 {
  if (p < CH2_SEG1_END) return SEG_POEM;
  if (p < CH2_SEG2_END) return SEG_QUIZ;
  return SEG_EXPLORE;
}

/** 提示升级计数：点错 1 次 → 方向箭头；点错 2 次或 20s 无操作 → 淡金光圈 */
export function ch2HintLevel(misses: number, idleSeconds: number): 0 | 1 | 2 {
  if (misses >= 2 || idleSeconds >= CH2_IDLE_HINT_SECONDS) return 2;
  if (misses >= 1) return 1;
  return 0;
}

/**
 * 段1 各句生长状态（纯函数，update 高频调用的唯一依据）：
 *   - lines[i]：第 i 句对应星官的生长进度 [0,1]（前句全亮、后句未点）；
 *   - active：当前屏显示的诗句下标（标题区为 -1）；
 *   - finale：齐亮收尾进度 [0,1]（驱动三垣四象全部组）。
 */
export function ch2Seg1LineStates(p: number): { active: number; lines: number[]; finale: number } {
  const slice = (SEG1_LINES_END - SEG1_INTRO_END) / CH2_SEG1_LINE_COUNT;
  const lines: number[] = [];
  for (let i = 0; i < CH2_SEG1_LINE_COUNT; i++) {
    lines.push(clamp01((p - (SEG1_INTRO_END + i * slice)) / slice));
  }
  const active =
    p < SEG1_INTRO_END
      ? -1
      : Math.min(Math.floor((p - SEG1_INTRO_END) / slice), CH2_SEG1_LINE_COUNT - 1);
  const finale = clamp01((p - SEG1_LINES_END) / (CH2_SEG1_END - SEG1_LINES_END));
  return { active, lines, finale };
}

// ---------------------------------------------------------------- 静态数据

/** 天球半径（世界单位），与 SkyApp.R 一致；为让本模块纯逻辑可独立单测而不引入 SkyApp 依赖，此处本地取值 */
const SKY_R = 100;

/** bloom 调优基线（与 SkyApp.BLOOM.strength 终值一致；答对脉冲由此值升起并缓回） */
const BLOOM_BASE = 0.78;
/** 答对 bloom 脉冲峰值 */
const BLOOM_PEAK = 1.6;
/** 答对翻页停留时长（ms），随后切下一题 */
const REVEAL_HOLD_MS = 1200;
/** 滚过 0.80 自动补亮后，完成卡停留时长（ms） */
const DONE_CARD_HOLD_MS = 3000;

/** 段1 五句：text 为简体转写（poem.json 原文为繁体），groups 为该句点亮的星官 */
const SEG1_LINES: readonly { text: string; label: string; groups: readonly string[] }[] = [
  // poem.json「北斗」（三垣 · 紫微宫）：「北斗之宿七星明，第一主帝名樞精……」
  { text: "北斗之宿七星明", label: "北斗", groups: ["北斗"] },
  // poem.json「北极」（三垣 · 紫微宫）：「中元北極紫微宮，北極五星在其中……」
  { text: "北极五星在其中", label: "北极", groups: ["北极"] },
  // poem.json「心宿」（东方苍龙 · 心宿）：「三星中央色最深……」
  { text: "三星中央色最深", label: "心宿", groups: ["心宿"] },
  // poem.json「河鼓」「织女」（北方玄武 · 牛宿）：「牛上直建三河鼓，鼓上三星號織女」
  { text: "牛上直建三河鼓，鼓上三星号织女", label: "河鼓 · 织女", groups: ["河鼓", "织女"] },
  // poem.json「天狼」（南方朱雀 · 井宿）：「邱下一狼光蓬茸」
  { text: "邱下一狼光蓬茸", label: "天狼", groups: ["天狼"] },
];

/** 段1 各句的脚本注视目标（与 SEG1_LINES 同序；ra/dec 与文件头质心表一致） */
const SEG1_GAZE_TARGETS: readonly THREE.Quaternion[] = (() => {
  // 河鼓·织女句取两质心的矢量平均中点
  const [x1, y1, z1] = radecToVec3(297.7, 8.6);
  const [x2, y2, z2] = radecToVec3(280.5, 38.7);
  const mx = x1 + x2;
  const my = y1 + y2;
  const mz = z1 + z2;
  const len = Math.hypot(mx, my, mz);
  const midRa = (Math.atan2(mz, mx) * 180) / Math.PI; // 与 radecToVec3 约定互逆
  const midDec = (Math.asin(my / len) * 180) / Math.PI;
  return [
    gazeQuat(186.0, 56.5), // 北斗
    gazeQuat(218.6, 76.8), // 北极
    gazeQuat(247.2, -26.8), // 心宿
    gazeQuat(midRa, midDec), // 河鼓 · 织女（中点）
    gazeQuat(101.3, -16.7), // 天狼
  ];
})();

/** 星官质心方向（ra/dec 度）与提示光圈基础尺寸（世界单位）；推算方式见文件头注释 */
const TARGET_DIRS: Record<string, { ra: number; dec: number; ring: number }> = {
  北斗: { ra: 186.0, dec: 56.5, ring: 26 },
  勾陈: { ra: 269.6, dec: 86.5, ring: 12 },
  天狼: { ra: 101.3, dec: -16.7, ring: 6 },
  织女: { ra: 280.5, dec: 38.7, ring: 8 },
  北极: { ra: 218.6, dec: 76.8, ring: 10 },
  心宿: { ra: 247.2, dec: -26.8, ring: 8 },
  河鼓: { ra: 297.7, dec: 8.6, ring: 8 },
};

/** 题目序号展示（寻星 · 其一 …） */
const ORDINALS = ["其一", "其二", "其三", "其四"];

// ---------------------------------------------------------------- 样式（ch2- 前缀，Labels.ts 同款注入守卫）

const CH2_CSS = `
.ch2-card {
  position: absolute;
  max-width: 440px;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 22px 26px;
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.ch2-card::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 7px;
  pointer-events: none;
}
.ch2-card.on { opacity: 1; transform: translateY(0); }

/* ---- 段1：标题/旁白与点题句（居中） ---- */
.ch2-title, .ch2-finale {
  left: 50%; top: 50%;
  transform: translate(-50%, calc(-50% + 16px));
  text-align: center;
}
.ch2-title.on, .ch2-finale.on { transform: translate(-50%, -50%); }
.ch2-title { width: min(470px, 86vw); }
.ch2-finale { width: min(540px, 86vw); }
.ch2-title h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 34px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
}
.ch2-head { display: flex; align-items: flex-start; justify-content: center; gap: 14px; margin-bottom: 12px; }
.ch2-hook { font-size: 15px; line-height: 2; color: #fce1b6; }
.ch2-narr { font-size: 13px; line-height: 2; opacity: 0.8; margin-top: 6px; }
.ch2-finale-text {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(17px, 2.4vh, 22px);
  letter-spacing: 0.12em; line-height: 2.1; color: #fce1b6;
}

/* ---- 段1：竖排诗句（一句一屏，居中大字） ---- */
.ch2-lines { position: absolute; inset: 0; pointer-events: none; }
.ch2-line {
  position: absolute; left: 50%; top: 46%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 20px;
  opacity: 0; transition: opacity 0.7s ease;
}
.ch2-line.on { opacity: 1; }
.ch2-line-text {
  writing-mode: vertical-rl;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(20px, 3.4vh, 34px);
  letter-spacing: 0.3em;
  color: #fce1b6;
  text-shadow: 0 0 18px rgba(201, 162, 39, 0.35), 0 2px 10px rgba(13, 13, 17, 0.9);
}
.ch2-line-name {
  writing-mode: vertical-rl;
  margin-top: 8px;
  font-size: 13px; letter-spacing: 0.42em;
  color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.4); border-radius: 4px;
  padding: 12px 5px;
  background: rgba(13, 13, 17, 0.5);
}

/* ---- 段2：题目卡（底部中央，卡面不拦截点击，仅「跳过」可点） ---- */
.ch2-quest {
  left: 50%; bottom: 4.5vh;
  width: min(470px, 88vw);
  transform: translate(-50%, 16px);
}
.ch2-quest.on { transform: translate(-50%, 0); }
.ch2-quest.swap { animation: ch2QuestIn 0.45s ease; }
@keyframes ch2QuestIn {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.ch2-quest-meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.ch2-quest-no { font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55; }
.ch2-skip {
  pointer-events: auto;
  background: none; border: none; padding: 2px 4px;
  font-size: 12px; letter-spacing: 0.2em; color: #af915f;
  border-bottom: 1px solid rgba(175, 145, 95, 0.4);
  cursor: pointer;
}
.ch2-skip:hover { color: #c9a227; border-bottom-color: rgba(201, 162, 39, 0.7); }
.ch2-quest-hint { font-size: 15px; line-height: 1.9; color: #f6e8d8; }
.ch2-quest-verse { display: none; }
.ch2-verse-text {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; line-height: 2; color: #fce1b6;
}
.ch2-verse-from { font-size: 12px; letter-spacing: 0.14em; color: #c9a227; margin-top: 6px; }
.ch2-verse-plain { font-size: 13px; line-height: 1.9; opacity: 0.85; margin-top: 8px; }
.ch2-quest-done {
  display: none;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 16px; letter-spacing: 0.2em; color: #c9a227;
  text-align: center; padding: 6px 0 2px;
}
.ch2-quest.mode-verse .ch2-quest-hint { display: none; }
.ch2-quest.mode-verse .ch2-quest-verse { display: block; }
.ch2-quest.mode-verse .ch2-skip,
.ch2-quest.mode-done .ch2-skip { visibility: hidden; }
.ch2-quest.mode-done .ch2-quest-hint { display: none; }
.ch2-quest.mode-done .ch2-quest-done { display: block; }

/* ---- 段2：方向箭头（屏幕边缘指向目标） ---- */
.ch2-arrow {
  position: absolute; left: 0; top: 0;
  width: 40px; height: 40px;
  margin: -20px 0 0 -20px;
  opacity: 0; transition: opacity 0.4s ease;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(201, 162, 39, 0.55));
}
.ch2-arrow.on { opacity: 1; }
.ch2-arrow i {
  display: block; width: 100%; height: 100%;
  background: linear-gradient(135deg, #fce1b6, #c9a227);
  clip-path: polygon(100% 50%, 20% 0, 42% 50%, 20% 100%);
  animation: ch2ArrowPulse 1.2s ease-in-out infinite;
}
@keyframes ch2ArrowPulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
.ch2-recap { margin-top: 10px; font-size: 12px; letter-spacing: 0.12em; color: #fce1b6; opacity: 0.7; }
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch2 = "";
  el.textContent = CH2_CSS;
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

// ---------------------------------------------------------------- 章节工厂

export function createChapter(ctx: ChapterCtx): Chapter {
  injectStyle();
  const pin = ctx.root.querySelector(".pin")!;
  const { copy } = ctx;

  function el(tag: string, className: string): HTMLDivElement {
    const d = document.createElement(tag);
    d.className = className;
    pin.appendChild(d);
    return d as HTMLDivElement;
  }

  // ---- 段1：标题/旁白面板（body[0]）、五句竖排诗、点题面板（body[1]） ----
  const titlePanel = el("div", "ch2-card ch2-title");
  titlePanel.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="ch2-hook">${escapeHtml(copy.hook)}</p>
    <p class="ch2-narr">${escapeHtml(copy.body[0] ?? "")}</p>
  `;

  const lineBox = el("div", "ch2-lines");
  const lineEls = SEG1_LINES.map((l) => {
    const d = document.createElement("div");
    d.className = "ch2-line";
    d.innerHTML = `<span class="ch2-line-text">${escapeHtml(l.text)}</span><span class="ch2-line-name">${escapeHtml(l.label)}</span>`;
    lineBox.appendChild(d);
    return d;
  });

  const finalePanel = el("div", "ch2-card ch2-finale");
  finalePanel.innerHTML = `<p class="ch2-finale-text">${escapeHtml(copy.body[1] ?? "")}</p>`;

  // ---- 段2：题目卡 ----
  const questCard = el("div", "ch2-card ch2-quest");
  questCard.innerHTML = `
    <div class="ch2-quest-meta"><span class="ch2-quest-no"></span><button type="button" class="ch2-skip">跳过</button></div>
    <p class="ch2-quest-hint"></p>
    <div class="ch2-quest-verse">
      <p class="ch2-verse-text"></p>
      <p class="ch2-verse-from"></p>
      <p class="ch2-verse-plain"></p>
    </div>
    <p class="ch2-quest-done">星空已全部为你点亮</p>
  `;
  const questNo = questCard.querySelector<HTMLElement>(".ch2-quest-no")!;
  const questHint = questCard.querySelector<HTMLElement>(".ch2-quest-hint")!;
  const verseText = questCard.querySelector<HTMLElement>(".ch2-verse-text")!;
  const verseFrom = questCard.querySelector<HTMLElement>(".ch2-verse-from")!;
  const versePlain = questCard.querySelector<HTMLElement>(".ch2-verse-plain")!;
  const skipBtn = questCard.querySelector<HTMLButtonElement>(".ch2-skip")!;

  // ---- 段3：探索面板（body[2]）+ 回顾小字 + 提示 ----
  const explorePanel = el("div", "ch2-card ch2-explore");
  explorePanel.innerHTML = `
    <h2>现在，把星空交给你</h2>
    <p>${escapeHtml(copy.body[2] ?? "")}</p>
    <p class="ch2-recap">你已经认出了 ${CH2_QUESTS.map((q) => escapeHtml(q.key)).join(" · ")}</p>
  `;
  const hint = el("div", "atlas-hint");
  hint.textContent = "拖拽环视 · 点击星点查看星官";

  // ---- 方向箭头（位置/角度由每帧 tick 写入） ----
  const arrowEl = el("div", "ch2-arrow");
  arrowEl.appendChild(document.createElement("i"));

  // ---- 《步天歌》引文：运行时查 /data/poem.json（繁体原文，保持原样引用） ----
  interface PoemEntry {
    text: string;
    from: string;
  }
  let poem: Record<string, PoemEntry> | null = null;
  fetch(dataUrl("data/poem.json"))
    .then((r) => (r.ok ? (r.json() as Promise<Record<string, PoemEntry>>) : null))
    .then((j) => {
      poem = j;
      if (cardMode === "verse") fillVerse(); // 数据晚到时补填翻页卡
    })
    .catch(() => {
      /* 引文缺失不阻塞游戏（翻页卡退化为占位符） */
    });

  // ---------------------------------------------------------------- 状态

  let seg = -1; // 当前段（-1 = 未定位，下次 applyProgress 必触发 onSegEnter）
  let lastP = 0;

  let questIdx = 0; // 当前题（=== CH2_QUESTS.length 表示全部完成）
  const solvedFlags = CH2_QUESTS.map(() => false);
  let misses = 0; // 当前题点错次数
  let hintLevel: 0 | 1 | 2 = 0;
  let phase: "asking" | "revealed" | "done" = "asking";

  type CardMode = "hidden" | "ask" | "verse" | "done";
  let cardMode: CardMode = "hidden";

  let idleTimer: ReturnType<typeof setTimeout> | null = null;
  let advanceTimer: ReturnType<typeof setTimeout> | null = null;
  let doneHideTimer: ReturnType<typeof setTimeout> | null = null;
  let growthTween: gsap.core.Tween | null = null;
  let bloomTween: gsap.core.Tween | null = null;
  let unsubPick: (() => void) | null = null;
  let rafId = 0;

  // 段1 脚本注视（frame 钩子驱动；applyCameraState 后调用不被覆写）
  let gazeW = 0; // 注视权重当前值（向目标值阻尼趋近）
  let gazeActive = false; // 是否正在向 SkyApp 写注视
  const gazeCur = new THREE.Quaternion(); // 注视朝向当前值（向目标 slerp）

  let arrowOn = false;
  let ring: THREE.Sprite | null = null;
  let ringTarget = "";
  let ringBase = 8;
  let ringTex: THREE.CanvasTexture | null = null;

  // DOM 显隐缓存（update 高频路径只在变化时碰 classList）
  let titleOn = false;
  let finaleOn = false;
  let exploreOn = false;
  let hintOn = false;
  let activeLine = -2;
  let finaleWritten = false; // 段1 收尾已写过全体组（回滚离开时补一次归零）

  // ---------------------------------------------------------------- 小组件

  function lightAllGroups(v: number): void {
    const n = ctx.sky.groupCount;
    for (let i = 0; i < n; i++) ctx.sky.setGroupProgress(i, v);
  }

  function setTitleOn(on: boolean): void {
    if (titleOn === on) return;
    titleOn = on;
    titlePanel.classList.toggle("on", on);
  }
  function setFinaleOn(on: boolean): void {
    if (finaleOn === on) return;
    finaleOn = on;
    finalePanel.classList.toggle("on", on);
  }
  function setExploreOn(on: boolean): void {
    if (exploreOn === on) return;
    exploreOn = on;
    explorePanel.classList.toggle("on", on);
  }
  function setHintOn(on: boolean): void {
    if (hintOn === on) return;
    hintOn = on;
    hint.classList.toggle("on", on);
  }
  function setActiveLine(i: number): void {
    if (activeLine === i) return;
    activeLine = i;
    lineEls.forEach((d, j) => d.classList.toggle("on", j === i));
  }
  function setArrowOn(on: boolean): void {
    if (arrowOn === on) return;
    arrowOn = on;
    arrowEl.classList.toggle("on", on);
    if (!on) arrowEl.style.opacity = ""; // 清掉「目标在画面内」的内联退场
  }

  // ---- 题目卡 ----
  function setCardMode(mode: CardMode): void {
    cardMode = mode;
    questCard.classList.toggle("on", mode !== "hidden");
    questCard.classList.toggle("mode-verse", mode === "verse");
    questCard.classList.toggle("mode-done", mode === "done");
    if (mode !== "hidden") {
      // 翻页：重启入场动画（reflow 技巧，不占计时器；同模式换题也翻页）
      questCard.classList.remove("swap");
      void questCard.offsetWidth;
      questCard.classList.add("swap");
    }
  }
  function showAskCard(): void {
    const q = CH2_QUESTS[questIdx];
    if (!q) return;
    questNo.textContent = `寻星 · ${ORDINALS[questIdx] ?? `第${questIdx + 1}题`}`;
    questHint.textContent = q.hint;
    setCardMode("ask");
  }
  function fillVerse(): void {
    const q = CH2_QUESTS[questIdx];
    if (!q) return;
    const entry = poem?.[q.target];
    verseText.textContent = entry?.text ?? "……";
    verseFrom.textContent = entry ? `《步天歌》 · ${entry.from}` : "《步天歌》";
    versePlain.textContent = q.plain;
  }
  function showVerseCard(): void {
    fillVerse();
    setCardMode("verse");
  }

  // ---- 提示（箭头 / 淡金光圈） ----
  function getRingTexture(): THREE.CanvasTexture {
    if (ringTex) return ringTex;
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    g.strokeStyle = "rgba(240, 205, 110, 0.95)";
    g.lineWidth = 6;
    g.shadowColor = "rgba(201, 162, 39, 0.9)";
    g.shadowBlur = 14;
    g.beginPath();
    g.arc(64, 64, 48, 0, Math.PI * 2);
    g.stroke();
    ringTex = new THREE.CanvasTexture(c);
    return ringTex;
  }
  function ensureRing(target: string): void {
    const dir = TARGET_DIRS[target];
    if (!dir) return;
    if (ring && ringTarget === target) return;
    removeRing();
    const mat = new THREE.SpriteMaterial({
      map: getRingTexture(),
      transparent: true,
      depthTest: false, // 始终浮在星点之上，让目标「能被看见」（同 SkyApp 悬停环约定）
      depthWrite: false,
      opacity: 0.9,
    });
    const spr = new THREE.Sprite(mat);
    const [x, y, z] = radecToVec3(dir.ra, dir.dec, SKY_R);
    spr.position.set(x, y, z);
    spr.scale.set(dir.ring, dir.ring, 1);
    spr.renderOrder = 998; // 悬停环（999）之下
    ctx.sky.addSkyObject(spr); // rotateWithSky 默认 true；ch2 不开天球旋转，与拾取坐标一致
    ring = spr;
    ringTarget = target;
    ringBase = dir.ring;
  }
  function removeRing(): void {
    if (!ring) return;
    ctx.sky.removeSkyObject(ring);
    ring.material.dispose();
    ring = null;
    ringTarget = "";
  }
  function renderHints(): void {
    const inQuiz = seg === SEG_QUIZ && phase === "asking";
    const q = CH2_QUESTS[questIdx];
    setArrowOn(inQuiz && hintLevel >= 1);
    if (inQuiz && hintLevel >= 2 && q) ensureRing(q.target);
    else removeRing();
  }

  // ---- 计时器 ----
  function clearIdleTimer(): void {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }
  function resetIdleTimer(): void {
    clearIdleTimer();
    idleTimer = setTimeout(() => {
      idleTimer = null;
      if (seg === SEG_QUIZ && phase === "asking") {
        hintLevel = ch2HintLevel(misses, CH2_IDLE_HINT_SECONDS); // 20s 无操作 → 光圈
        renderHints();
      }
    }, CH2_IDLE_HINT_SECONDS * 1000);
  }
  function clearAdvanceTimer(): void {
    if (advanceTimer !== null) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }
  function clearDoneHideTimer(): void {
    if (doneHideTimer !== null) {
      clearTimeout(doneHideTimer);
      doneHideTimer = null;
    }
  }

  // ---- 动效 ----
  function lightTargetGradual(target: string, duration: number): void {
    growthTween?.kill();
    const proxy = { v: 0 };
    growthTween = gsap.to(proxy, {
      v: 1,
      duration,
      ease: "power1.out",
      onUpdate: () => ctx.sky.setGroupProgress(target, proxy.v),
    });
  }
  function pulseBloom(): void {
    bloomTween?.kill();
    const proxy = { v: BLOOM_PEAK };
    ctx.sky.setBloom({ strength: proxy.v });
    bloomTween = gsap.to(proxy, {
      v: BLOOM_BASE,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => ctx.sky.setBloom({ strength: proxy.v }),
      onComplete: () => {
        bloomTween = null;
      },
    });
  }

  // ---------------------------------------------------------------- 答题状态机（事件驱动）

  function startQuest(): void {
    const q = CH2_QUESTS[questIdx];
    phase = "asking";
    misses = 0;
    hintLevel = 0;
    if (q) ctx.sky.setGroupProgress(q.target, 0); // 熄灭待寻
    showAskCard();
    renderHints();
    if (seg === SEG_QUIZ) resetIdleTimer();
  }

  function solveQuest(): void {
    const q = CH2_QUESTS[questIdx];
    if (!q || phase !== "asking") return;
    phase = "revealed";
    solvedFlags[questIdx] = true;
    clearIdleTimer();
    hintLevel = 0;
    renderHints(); // 收起箭头/光圈
    lightTargetGradual(q.target, 1.1); // 生长点亮
    pulseBloom();
    showVerseCard(); // 翻页：诗句 + 出处 + 白话释义
    clearAdvanceTimer();
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      advanceQuest();
    }, REVEAL_HOLD_MS);
  }

  function advanceQuest(): void {
    clearAdvanceTimer();
    questIdx += 1;
    if (questIdx >= CH2_QUESTS.length) {
      questIdx = CH2_QUESTS.length;
      phase = "done";
      setCardMode("done");
      return;
    }
    startQuest();
  }

  /**
   * 答对翻页中的题立即结算（离开答题段 / exit 时调用）：
   * 生长动画直接补满、questIdx 推进，但不熄灭下一题目标、不碰卡片——
   * 现场由新段落（或下次 enter 的 applyProgress 重放）接管。
   */
  function settleReveal(): void {
    if (phase !== "revealed") return;
    clearAdvanceTimer();
    const q = CH2_QUESTS[questIdx];
    if (q) ctx.sky.setGroupProgress(q.target, 1);
    growthTween?.kill();
    growthTween = null;
    questIdx += 1;
    misses = 0;
    hintLevel = 0;
    if (questIdx >= CH2_QUESTS.length) {
      questIdx = CH2_QUESTS.length;
      phase = "done";
    } else {
      phase = "asking";
    }
  }

  function skipQuest(): void {
    if (seg !== SEG_QUIZ || phase !== "asking") return;
    const q = CH2_QUESTS[questIdx];
    if (!q) return;
    solvedFlags[questIdx] = true;
    clearIdleTimer();
    hintLevel = 0;
    lightTargetGradual(q.target, 0.6); // 跳过同样走生长点亮
    advanceQuest(); // 直接进下一题（不展示诗句卡）
  }

  /** 滚过 0.80 未答完：剩余题目自动点亮（不卡行程） */
  function finishAll(): void {
    clearIdleTimer();
    clearAdvanceTimer();
    CH2_QUESTS.forEach((q, i) => {
      if (!solvedFlags[i]) {
        ctx.sky.setGroupProgress(q.target, 1);
        solvedFlags[i] = true;
      }
    });
    questIdx = CH2_QUESTS.length;
    phase = "done";
    hintLevel = 0;
    renderHints();
    setCardMode("done"); // 「星空已全部为你点亮」
    clearDoneHideTimer();
    doneHideTimer = setTimeout(() => {
      doneHideTimer = null;
      if (phase === "done" && seg === SEG_EXPLORE) setCardMode("hidden"); // 让位给探索面板
    }, DONE_CARD_HOLD_MS);
  }

  /** 进答题段的一次性现场重建（双向回滚幂等）：全体点亮后仅当前题熄灭 */
  function renderQuestState(): void {
    lightAllGroups(1);
    CH2_QUESTS.forEach((q, i) => {
      if (phase !== "done" && i === questIdx) ctx.sky.setGroupProgress(q.target, 0);
    });
    if (phase === "done") setCardMode("done");
    else if (phase === "revealed") showVerseCard();
    else showAskCard();
    renderHints();
    if (phase === "asking") resetIdleTimer();
  }

  function onPickPayload(payload: PickPayload | null): void {
    if (seg !== SEG_QUIZ || phase !== "asking" || !payload) return; // 点空/散星不算点错
    resetIdleTimer(); // 有效点选即重置无操作计时
    const q = CH2_QUESTS[questIdx];
    if (!q) return;
    if (payload.info.name === q.target) {
      solveQuest();
    } else {
      misses += 1;
      hintLevel = ch2HintLevel(misses, 0);
      renderHints();
    }
  }

  skipBtn.addEventListener("click", skipQuest);

  // ---------------------------------------------------------------- 每帧 tick（箭头跟踪 + 光圈脉动）

  const tmpVec = new THREE.Vector3();
  function updateArrow(): void {
    const q = CH2_QUESTS[questIdx];
    const dir = q ? TARGET_DIRS[q.target] : undefined;
    if (!dir) {
      setArrowOn(false);
      return;
    }
    const [x, y, z] = radecToVec3(dir.ra, dir.dec, SKY_R);
    const cam = ctx.sky.camera;
    // 视空间 z > 0 = 目标在相机背后（three 相机朝 -z 看）
    const e = cam.matrixWorldInverse.elements;
    const vz = e[2] * x + e[6] * y + e[10] * z + e[14];
    tmpVec.set(x, y, z).project(cam);
    let nx = tmpVec.x;
    let ny = tmpVec.y;
    const behind = vz > 0;
    if (behind) {
      nx = -nx; // 背后目标：取「绕近路」的屏幕方向
      ny = -ny;
    }
    if (!behind && Math.abs(nx) <= 0.92 && Math.abs(ny) <= 0.92) {
      arrowEl.style.opacity = "0"; // 目标已在画面内：箭头暂时退场（保留 .on，回来时秒出）
      return;
    }
    arrowEl.style.opacity = "";
    const angle = (Math.atan2(-ny, nx) * 180) / Math.PI; // 屏幕 y 向下
    const m = 48;
    const px = Math.min(Math.max(((nx + 1) / 2) * window.innerWidth, m), window.innerWidth - m);
    const py = Math.min(Math.max(((1 - ny) / 2) * window.innerHeight, m), window.innerHeight - m);
    arrowEl.style.left = `${px}px`;
    arrowEl.style.top = `${py}px`;
    arrowEl.style.transform = `rotate(${angle}deg)`;
  }

  function tick(now: number): void {
    rafId = requestAnimationFrame(tick);
    if (arrowOn) updateArrow();
    if (ring) {
      const s = ringBase * (1 + 0.13 * Math.sin(now * 0.0024));
      ring.scale.set(s, s, 1);
      ring.material.opacity = 0.7 + 0.3 * Math.sin(now * 0.0024 + 1);
    }
  }

  // ---------------------------------------------------------------- 段驱动（update 高频路径）

  function onSegEnter(s: number, prev: number): void {
    // 离开答题段：暂停计时、生长动画不跨段残留、答对翻页中的题立即结算
    if (prev === SEG_QUIZ) {
      clearIdleTimer();
      if (phase !== "revealed") {
        growthTween?.kill(); // 跳过/点亮的生长动画同样不跨段（settleReveal 内已处理 revealed 情形）
        growthTween = null;
      }
      settleReveal();
    }
    if (s === SEG_POEM) {
      ctx.sky.setPickingEnabled(false); // 段1 不开拾取（防误触，段2 才开）
      ctx.sky.setLabelsEnabled(true);
      ctx.sky.setHoverTipEnabled(true);
      lightAllGroups(0); // 无名星空重开（finale 进度由 renderSeg1 接管）
      finaleWritten = false;
      setCardMode("hidden");
      setExploreOn(false);
      setHintOn(false);
      renderHints(); // 收起箭头/光圈（状态保留，回答题段时恢复）
    } else if (s === SEG_QUIZ) {
      ctx.sky.setPickingEnabled(true);
      ctx.sky.setLabelsEnabled(false); // 答题段隐藏星官名标签与悬停提示（防泄题）
      ctx.sky.setHoverTipEnabled(false);
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setExploreOn(false);
      setHintOn(false);
      renderQuestState();
    } else {
      ctx.sky.setPickingEnabled(true);
      ctx.sky.setLabelsEnabled(true); // 探索段恢复标签与悬停提示
      ctx.sky.setHoverTipEnabled(true);
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      if (phase !== "done") finishAll(); // 未答完：剩余自动点亮
      else setCardMode("hidden");
      setExploreOn(true);
      setHintOn(true);
    }
  }

  function renderSeg1(p: number): void {
    const st = ch2Seg1LineStates(p);
    // 三垣四象全部组：收尾段随 finale 齐亮；离开收尾段后补一次归零即可
    if (st.finale > 0 || finaleWritten) {
      lightAllGroups(st.finale);
      finaleWritten = st.finale > 0;
    }
    // 五句对应星官随句生长（覆盖在 finale 之上：句内进度恒 ≥ finale）
    st.lines.forEach((v, i) => {
      const line = SEG1_LINES[i];
      if (!line) return;
      for (const g of line.groups) ctx.sky.setGroupProgress(g, v);
    });
    setTitleOn(p < SEG1_INTRO_END);
    setActiveLine(p >= SEG1_INTRO_END && p < SEG1_LINES_END ? st.active : -1);
    setFinaleOn(p >= SEG1_LINES_END);
  }

  function applyProgress(p: number): void {
    lastP = p;
    const s = ch2SegmentOf(p);
    if (s !== seg) {
      const prev = seg;
      seg = s;
      onSegEnter(s, prev);
    }
    if (seg === SEG_POEM) renderSeg1(p);
    else if (seg === SEG_EXPLORE) lightAllGroups(1); // 未亮组补 1（幂等）
    // 答题段无连续量：星空/卡片由事件与 renderQuestState 驱动（幂等）
  }

  // ---------------------------------------------------------------- Chapter

  return {
    enter() {
      ctx.root.classList.add("inview");
      ctx.sky.setLabelsEnabled(true);
      unsubPick?.(); // 防御：enter/exit 严格成对，重复 enter 不泄漏监听
      unsubPick = ctx.sky.onPick(onPickPayload);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
      applyProgress(lastP); // 双向回滚：按当前 p 与已答状态重放正确现场
    },
    update(p) {
      applyProgress(p);
    },
    frame(dt) {
      // 段1 诗句巡游：脚本注视当前句星官方向。本钩子在主循环 applyCameraState
      // 之后调用（见 app.ts），注视不会被 rig 覆写；离开段1 权重阻尼归零后完全释放。
      const lineIdx =
        seg === SEG_POEM && lastP >= SEG1_INTRO_END && lastP < SEG1_LINES_END
          ? ch2Seg1LineStates(lastP).active
          : -1;
      const wantW = lineIdx >= 0 ? 0.85 : 0;
      gazeW += (wantW - gazeW) * (1 - Math.exp(-3 * dt));
      if (gazeW < 0.01) {
        if (gazeActive) {
          gazeActive = false;
          ctx.sky.setGazeBlend(0);
        }
        return;
      }
      const target = SEG1_GAZE_TARGETS[Math.max(lineIdx, 0)];
      if (!gazeActive) {
        gazeActive = true;
        gazeCur.copy(target);
      } else {
        gazeCur.slerp(target, 1 - Math.exp(-2.5 * dt));
      }
      ctx.sky.setGazeBlend(gazeW, gazeCur);
    },
    exit() {
      ctx.root.classList.remove("inview");
      cancelAnimationFrame(rafId);
      rafId = 0;
      unsubPick?.();
      unsubPick = null;
      clearIdleTimer();
      clearAdvanceTimer();
      clearDoneHideTimer();
      settleReveal(); // 翻页中的题先结算（生长补满、questIdx 推进），再统一清理
      growthTween?.kill();
      growthTween = null;
      if (bloomTween) {
        // 脉冲进行中才复位（已完成时 strength 已缓回基线，不碰 tier 档位的值）
        bloomTween.kill();
        bloomTween = null;
        ctx.sky.setBloom({ strength: BLOOM_BASE });
      }
      removeRing();
      ringTex?.dispose();
      ringTex = null;
      setArrowOn(false);
      gazeW = 0;
      gazeActive = false;
      ctx.sky.setGazeBlend(0); // 幂等释放脚本注视
      ctx.sky.setLabelsEnabled(true); // 恢复标签与悬停提示（答题段曾关闭防泄题）
      ctx.sky.setHoverTipEnabled(true);
      ctx.sky.setPickingEnabled(false); // 自带详情卡收起
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setCardMode("hidden");
      setExploreOn(false);
      setHintOn(false);
      seg = -1; // 强制下次 enter 重建段现场
      // 星官组保持点亮（ch3 背景用），不回滚
    },
  };
}
