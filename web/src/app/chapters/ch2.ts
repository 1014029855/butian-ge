/**
 * ch2 星野漫游（重构版）：「点亮 = 被命名」三段叙事 + 段2「寻星令」游戏。
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
 *   段2 寻星令  p∈[0.35, 0.80)（游戏段，题库见 copy.ts 的 CH2_QUESTS）
 *     一局 13 题 = copy 题库 12（寻星4/闪现3/四选一3/点星选名2）+ ch2 合成的
 *     闪电快答 1（题库落地原生 blitz 条目后自动让位），每局开局洗牌重排：
 *       a) 寻星 seek：题卡给提示，目标组熄灭待寻（setGroupProgress 0），点到即答对；
 *       b) 闪现 flash：目标组高亮 1.5s 后熄灭（拉回 0），凭记忆点回；
 *       c) 四选一 choice：卡面给星官名 + 四个选项文本（诗句/描述混搭，
 *          选项按钮 pointer-events:auto），点正确项；天空点击本题不判定；
 *       d) 点星选名 name：天空中目标星官金环常亮（复用 ensureRing），卡面给
 *          4 个星官名选 1（复用选项按钮）；天空点击本题不判定；
 *       e) 闪电快答 blitz：一题展开为连续 3 道寻星小题（默认 北斗/天狼/织女，
 *          copy 可用 targets 覆盖），每题仅 3s 限时、快速连发；小题答错/超时
 *          不扣心、不计入主连击（单独 blitzStreak 计分倍率），全对才算本题答对。
 *     生命：3 心（右上 HUD，朱砂小方块）。答错（点错星/点错选项）或超时扣 1，
 *       心尽提前结算（未点亮的星官保持熄灭——星空只留你赢下的）。
 *     倒计时：每题独立，前 5 题 12s、其后 8s，闪电小题 3s（题卡顶部细条，
 *       金→朱砂随时间变色）；超时此题作废扣 1 心、不得分、断连击，直接进下一题。
 *     连击：连续答对倍率 1→1.5→2→3（第 4 连击起封顶 ×3）；答对得分 =
 *       1000×倍率（星雨双倍期间再 ×2）。满 5 连击触发「星雨」10s：bloom 提升
 *       （0.78→1.35）+ 分数双倍 + 一颗 CSS 流星掠过 + 大字「星雨」；之后每再
 *       满 5 连击（10）复触发。闪电快答的连击独立计数，不打断主连击。
 *     即时反馈：答对=金环爆闪放大（Sprite 环 gsap 放大淡出）+ 分数飘字（+N，
 *       DOM 上浮消散）+ 慢镜（契约 setTimeScale 0.5 定格 0.4s 后缓回 1）+
 *       目标星官世界坐标粒子金雨（契约 spawnBurst ×100）；答错/超时=画面四角
 *       红闪 0.3s。SFX 四层音高拨弦：答对 A5 / 连击 D6 / 答错超时 E3 / 落印 A3
 *       （懒建 AudioContext + Karplus-Strong，总增益 0.12 ≤0.15，与环境音开关
 *       无关；exit 时 suspend）。
 *     提示升级（保留旧行为）：点错 1 次出方向箭头（目标质心投影，越界钳边缘，
 *       atan2 指向）；点错 2 次或濒临超时（剩余 ≤4s）出淡金光圈（Sprite 环，
 *       addSkyObject 挂载）；choice/name/blitz 题型不出天空提示（name 的金环
 *       即题面，blitz 3s 小题不升级光圈防泄题）。
 *     镜头暗示：寻星/闪现题开场把 gaze 短暂偏向目标天区（约 15° 偏移——给方向
 *       不给答案），1.4s 内权重 0.5 渐衰归零；复用 frame 钩子 + gazeQuat + 质心表。
 *     「跳过」小字按钮：点亮目标直接进下一题——不得分、不扣心、不断连击
 *       （闪电快答中跳过当前小题）。
 *     结算卡：卷轴展开（scaleY 12%→100%）+ 段位朱砂大印盖下（评级大字 + 段位名，
 *       0.25s 落印 + 纸震 keyframes）+ 总分/用时/正确数/评级（甲乙丙）/一句评语/
 *       段位进程（CH2_RANKS 总分→童生…探花，localStorage 记最高段位与累计局数，
 *       「第 N 局 · 史上段位 X」）/错题回顾（答错超时题的星官名 + copy hintWrong
 *       一句）/localStorage 最高分对比（新纪录标记「史上最佳」）/「再来一局」
 *       （洗牌重置全部状态开新局）/「进入星野」（平滑滚到段3）。提前滚过 0.80
 *       未打完：剩余题目自动补亮并直接结算，结算卡在探索段停留 4.5s 后自动让位。
 *     答对翻页卡三层：诗句（poem.json 繁体原文）/ 档案行（目标星官最亮成员星的
 *       视星等 · 光谱 O/B/A/F/G/K/M（ci 映射）· 光年，stars.json + asterisms.json
 *       运行时加载）/ 故事（copy 的 story 字段，缺省回退白话释义 plain）。
 *
 *   段3 自由探索  p∈[0.80, 1]
 *     - 全图点亮（未亮组补 1），「现在，把星空交给你」面板 + 回顾小字，拾取开，
 *       保留 atlas-hint。
 *
 * 状态机与滚动进度 p 的关系（幂等、双向回滚正确）：
 *   - update(p) 只做段归属判断（ch2SegmentOf）与段内连续量（段1 的生长进度、
 *     DOM 显隐微调）；答题推进全部走事件（onPick / 选项 / 跳过 / 倒计时）；
 *   - 段切换（onSegEnter）负责一次性现场重建：进答题段按「已答亮 / 当前灭」
 *     重放星空与卡片、按 remainMs 恢复倒计时；离开答题段暂停倒计时与闪现、
 *     答对翻页中的题立即结算（settleReveal）、星雨收束；
 *   - enter() 以最近一次 p 调 applyProgress 重放现场（ScrollTrigger 随后
 *     还会补一次 onUpdate），exit() 全清理（计时器/飘字/特效/AudioContext
 *     挂起）并置 seg=-1 强制重进时重建。
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
 *     河鼓 3星 ra≈297.7 dec≈8.6    昴宿 7星 ra≈56.6 dec≈24.2
 *     北落师门 1星 ra≈344.4 dec≈-29.6   老人 1星 ra≈96.0 dec≈-52.7
 *     参宿 7星 ra≈84.0 dec≈-1.1    轩辕 17星 ra≈146.9 dec≈24.5（点星选名用）
 *
 * 样式：模块内注入 <style>（Labels.ts 同款守卫），类名 ch2- 前缀；
 * 面板描金双细线（外框 + ::before 内压 hairline）对齐 app.css 的 .chapter-panel；
 * 朱砂色取自 app.css 的 .seal 渐变（#b1402f → #8e2f22）。
 */
import * as THREE from "three";
import { gsap } from "gsap";
import type { Chapter, ChapterCtx } from "../chapters";
import { gazeQuat } from "../CameraRig";
import { CH2_QUESTS, CH2_RANKS, CH2_VERDICTS, type Ch2Quest } from "../copy";
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

/** copy 题库是否已有原生闪电快答条目（有则 ch2 不再合成，自动让位） */
const CH2_HAS_NATIVE_BLITZ = CH2_QUESTS.some((q) => (q.type as string) === "blitz");
/** 一局题数：copy 题库题数 +（题库暂无原生 blitz 时）ch2 合成的闪电快答 1 题（单测守护） */
export const CH2_ROUND_SIZE = CH2_QUESTS.length + (CH2_HAS_NATIVE_BLITZ ? 0 : 1);
/** 生命上限（朱砂小方块数） */
export const CH2_MAX_HEARTS = 3;
/** 每题倒计时：前 5 题 12s、其后 8s（闪电小题另计 3s，见 CH2_BLITZ_SECONDS） */
export const CH2_TIME_LIMIT_EARLY_S = 12;
export const CH2_TIME_LIMIT_LATE_S = 8;
/** 12s 早段题数（前 5 题），其后一律 8s */
export const CH2_TIME_LIMIT_EARLY_COUNT = 5;
/** 濒临超时阈值：剩余 ≤ 4s 升级为淡金光圈提示（seek/flash 题型） */
export const CH2_URGENT_HINT_SECONDS = 4;
/** 评级阈值（总分）：甲 ≥ 20000 · 乙 ≥ 12000 · 丙 未及乙等 */
export const CH2_GRADE_JIA = 20000;
export const CH2_GRADE_YI = 12000;

const SEG_POEM = 0;
const SEG_QUIZ = 1;
const SEG_EXPLORE = 2;

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

/** 段归属：0=诗亮星空 1=寻星令 2=自由探索（越界输入自动钳制） */
export function ch2SegmentOf(p: number): 0 | 1 | 2 {
  if (p < CH2_SEG1_END) return SEG_POEM;
  if (p < CH2_SEG2_END) return SEG_QUIZ;
  return SEG_EXPLORE;
}

/**
 * 提示升级计数：点错 1 次 → 方向箭头；点错 2 次或濒临超时（剩余 ≤4s）→ 淡金光圈。
 * remainingSeconds 传本题倒计时剩余秒数。
 */
export function ch2HintLevel(misses: number, remainingSeconds: number): 0 | 1 | 2 {
  if (misses >= 2 || remainingSeconds <= CH2_URGENT_HINT_SECONDS) return 2;
  if (misses >= 1) return 1;
  return 0;
}

/** 第 index 题（0 起）的倒计时秒数：前 5 题 12s、其后 8s（闪电小题 3s 另计） */
export function ch2TimeLimit(index: number): number {
  return index < CH2_TIME_LIMIT_EARLY_COUNT ? CH2_TIME_LIMIT_EARLY_S : CH2_TIME_LIMIT_LATE_S;
}

/**
 * 连击倍率：本次答对后的连击数 streak（≥1）→ 1 / 1.5 / 2 / 3（第 4 连击起封顶）。
 */
export function ch2ComboMultiplier(streak: number): number {
  if (streak <= 1) return 1;
  if (streak === 2) return 1.5;
  if (streak === 3) return 2;
  return 3;
}

/** 答对得分：1000 × 连击倍率（星雨双倍期间再 ×2） */
export function ch2ScoreFor(streak: number, rainActive: boolean): number {
  return Math.round(1000 * ch2ComboMultiplier(streak)) * (rainActive ? 2 : 1);
}

/** 评级：甲 ≥ CH2_GRADE_JIA · 乙 ≥ CH2_GRADE_YI · 丙 未及乙等 */
export function ch2Grade(score: number): "甲" | "乙" | "丙" {
  if (score >= CH2_GRADE_JIA) return "甲";
  if (score >= CH2_GRADE_YI) return "乙";
  return "丙";
}

/** 闪电快答：每小题限时（秒） */
export const CH2_BLITZ_SECONDS = 3;
/** 闪电快答默认小题目标（copy 题库可用 targets 字段覆盖；均在 TARGET_DIRS 质心表内） */
export const CH2_BLITZ_DEFAULT_TARGETS: readonly string[] = ["北斗", "天狼", "织女"];

/** 题型判定（含「加厚」新题型；契约 id 与 copy.ts 题库一致：name=点星选名、blitz=闪电快答） */
export type Ch2QuestKind = "seek" | "flash" | "choice" | "name" | "blitz";

/**
 * 题型归一：未知题型回退按寻星处理（题库演进时的安全兜底——
 * 天空判定 + 题卡提示即可玩，不至于卡死一局）。
 */
export function ch2QuestKind(q: Ch2Quest): Ch2QuestKind {
  const t = q.type as string;
  if (t === "flash" || t === "choice" || t === "name" || t === "blitz") return t;
  return "seek";
}

/** 闪电快答的小题目标表：copy 的 targets 字段优先，缺省 北斗/天狼/织女 */
export function ch2BlitzTargets(q: Ch2Quest): string[] {
  const t = (q as Ch2Quest & { targets?: unknown }).targets;
  if (Array.isArray(t) && t.length > 0 && t.every((x): x is string => typeof x === "string" && x.length > 0)) {
    return t.slice();
  }
  return CH2_BLITZ_DEFAULT_TARGETS.slice();
}

/**
 * 合成闪电快答条目：copy 题库暂无原生 blitz 题（只有 name 点星选名）时的玩法侧补位——
 * 小题目标 北斗/天狼/织女 与文案字段均取自 CH2_QUESTS 既有条目（数据仍来自题库）。
 * 题库落地原生 blitz 条目（type:"blitz"，可带 targets）后，ch2BuildDeck 自动让位。
 */
const BLITZ_QUEST: Ch2Quest = (() => {
  const src = CH2_QUESTS.find((q) => q.target === CH2_BLITZ_DEFAULT_TARGETS[0]);
  const q: Ch2Quest & { targets: string[] } = {
    key: "闪电快答",
    type: "blitz" as unknown as Ch2Quest["type"], // 题型 id 契约（ch2QuestKind 识别）；Ch2QuestType 以 copy 为准
    target: CH2_BLITZ_DEFAULT_TARGETS[0] ?? "北斗", // 翻页/补亮兜底；小题判定走 targets
    hint: "三道寻星小题连发，每题只有三秒——北斗、天狼、织女，看你的了。",
    hintWrong: src?.hintWrong ?? "先认准方向再出手。",
    plain: "北斗、天狼、织女——三秒一题，连指三官。",
    story: src?.story ?? "",
    targets: CH2_BLITZ_DEFAULT_TARGETS.slice(),
  };
  return q;
})();

/** 本局牌堆（未洗牌）：copy 题库 +（无原生 blitz 时）合成的闪电快答 */
export function ch2BuildDeck(): readonly Ch2Quest[] {
  return CH2_HAS_NATIVE_BLITZ ? CH2_QUESTS : [...CH2_QUESTS, BLITZ_QUEST];
}

/** 段位：童生 → 探花（科举进程），min 为该段位最低总分 */
export interface Ch2Rank {
  name: string;
  min: number;
}

/**
 * 段位兜底表（copy.ts 的 CH2_RANKS 落地前使用；阈值对齐甲乙丙评级刻度：
 * 贡士 = 乙等线 12000、探花 = 甲等线 20000）。
 */
export const CH2_RANKS_FALLBACK: readonly Ch2Rank[] = [
  { name: "童生", min: 0 },
  { name: "秀才", min: 4000 },
  { name: "举人", min: 8000 },
  { name: "贡士", min: CH2_GRADE_YI },
  { name: "进士", min: 16000 },
  { name: "探花", min: CH2_GRADE_JIA },
];

/** 段位表归一：滤掉非法项、按 min 升序（接受任意来源的原始数据，空表表示不可用） */
export function ch2NormalizeRanks(raw: unknown): Ch2Rank[] {
  if (!Array.isArray(raw)) return [];
  const out: Ch2Rank[] = [];
  for (const r of raw) {
    if (!r || typeof r !== "object") continue;
    const name = (r as { name?: unknown }).name;
    const min = (r as { min?: unknown }).min;
    if (typeof name === "string" && name.length > 0 && typeof min === "number" && Number.isFinite(min)) {
      out.push({ name, min });
    }
  }
  out.sort((a, b) => a.min - b.min);
  return out;
}

/** 总分 → 段位名：取 min ≤ score 的最高档（ranks 须升序，ch2NormalizeRanks 产物） */
export function ch2RankOf(score: number, ranks: readonly Ch2Rank[]): string {
  if (ranks.length === 0) return "";
  let cur = ranks[0]!;
  for (const r of ranks) {
    if (score >= r.min) cur = r;
    else break;
  }
  return cur.name;
}

/** 档案行星数据最小形状（stars.json 子集） */
export interface Ch2StarLite {
  mag: number;
  ci: number | null;
  dist: number | null;
}

/**
 * 色指数 ci（B-V）→ 哈佛光谱型：
 *   O < -0.3 ≤ B < 0 ≤ A < 0.3 ≤ F < 0.6 ≤ G < 0.8 ≤ K < 1.4 ≤ M
 */
export function ch2SpectralClass(ci: number): "O" | "B" | "A" | "F" | "G" | "K" | "M" {
  if (ci < -0.3) return "O";
  if (ci < 0) return "B";
  if (ci < 0.3) return "A";
  if (ci < 0.6) return "F";
  if (ci < 0.8) return "G";
  if (ci < 1.4) return "K";
  return "M";
}

/** 成员星中取视星等最小（最亮）的一颗；空表返回 null */
export function ch2Brightest<T extends Ch2StarLite>(stars: readonly T[]): T | null {
  let best: T | null = null;
  for (const s of stars) {
    if (!best || s.mag < best.mag) best = s;
  }
  return best;
}

/** 档案行文案：视星等 · 光谱 X 型 · 约 N 光年（ci/dist 缺失的段自动省略） */
export function ch2ArchiveLine(star: Ch2StarLite | null): string {
  if (!star) return "";
  const parts = [`视星等 ${star.mag}`];
  if (star.ci !== null) parts.push(`光谱 ${ch2SpectralClass(star.ci)} 型`);
  if (star.dist !== null) parts.push(`约 ${star.dist} 光年`);
  return parts.join(" · ");
}

/** Fisher-Yates 洗牌（返回新数组，不动原数组；rand 可注入便于单测） */
export function ch2Shuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const a = out[i]!;
    out[i] = out[j]!;
    out[j] = a;
  }
  return out;
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
/** 星雨期间 bloom 提升到的强度 */
const RAIN_BLOOM = 1.35;
/** 星雨持续时长（ms）：bloom 提升 + 分数双倍 */
const RAIN_MS = 10_000;
/** 闪现题型：目标高亮时长（ms），随后拉回 0 */
const FLASH_MS = 1500;
/** 答对翻页停留时长（ms），随后切下一题 */
const REVEAL_HOLD_MS = 1200;
/** 滚过 0.80 自动结算后，结算卡在探索段停留时长（ms） */
const RESULT_CARD_HOLD_MS = 4500;
/** localStorage 最高分键 */
const BEST_KEY = "ch2-xunxingling-best";
/** localStorage 史上最高段位键（存段位名，比较时按当前段位表折算位次） */
const RANK_KEY = "ch2-xunxingling-rank";
/** localStorage 累计局数键 */
const ROUNDS_KEY = "ch2-xunxingling-rounds";

/** 寻星/闪现题开场镜头暗示：gaze 偏向目标天区的偏移角（弧度，约 15°——给方向不给答案） */
const Q_GAZE_OFFSET_RAD = (15 * Math.PI) / 180;
/** 镜头暗示持续时长（秒）：权重 0.5 → 0 线性渐衰 */
const Q_GAZE_SECS = 1.4;
/** 镜头暗示峰值权重（远小于段1 巡游的 0.85，用户可随时接管） */
const Q_GAZE_MAX_W = 0.5;

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

/** 段1 各句的高光金环目标（与 SEG1_LINES 同序；河鼓·织女句取河鼓——牵牛星最亮最醒目） */
const SEG1_RING_TARGETS: readonly string[] = ["北斗", "北极", "心宿", "河鼓", "天狼"];

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

/** 星官质心方向（ra/dec 度）与提示光圈基础尺寸（世界单位）；推算方式见文件头注释（导出供单测守护题面目标覆盖） */
export const TARGET_DIRS: Record<string, { ra: number; dec: number; ring: number }> = {
  北斗: { ra: 186.0, dec: 56.5, ring: 26 },
  勾陈: { ra: 269.6, dec: 86.5, ring: 12 },
  天狼: { ra: 101.3, dec: -16.7, ring: 6 },
  织女: { ra: 280.5, dec: 38.7, ring: 8 },
  北极: { ra: 218.6, dec: 76.8, ring: 10 },
  心宿: { ra: 247.2, dec: -26.8, ring: 8 },
  河鼓: { ra: 297.7, dec: 8.6, ring: 8 },
  昴宿: { ra: 56.6, dec: 24.2, ring: 10 },
  北落师门: { ra: 344.4, dec: -29.6, ring: 5 },
  老人: { ra: 96.0, dec: -52.7, ring: 5 },
  参宿: { ra: 84.0, dec: -1.1, ring: 20 }, // 点星选名（7 星，展幅 ~10°）
  轩辕: { ra: 146.9, dec: 24.5, ring: 34 }, // 点星选名（17 星，展幅 ~20°）
};

/** 题目序号展示（寻星令 · 其三 / 10） */
const CN_NUMERALS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

/** 题型徽标（题库可演进，未知题型回退「寻星」——与 ch2QuestKind 一致） */
const TYPE_LABELS: Record<string, string> = {
  seek: "寻星",
  flash: "闪现",
  choice: "四选一",
  name: "点星",
  blitz: "闪电",
};

/** 评级评语（结算卡一句） */
const GRADE_NOTES: Record<"甲" | "乙" | "丙", string> = {
  甲: "仰观天文，俯察地理——这片星野，你已得了古人真传。",
  乙: "星野渐熟。再循一遍歌，全天星官皆可指认。",
  丙: "莫急。抬头多看几夜，星星自会认你。",
};

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

/* ---- 段1：竖排诗句（一句一屏，靠左侧面板；天空留给对应星官高光） ---- */
.ch2-lines { position: absolute; inset: 0; pointer-events: none; }
.ch2-line {
  position: absolute; left: 5.5vw; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 18px;
  padding: 22px 18px;
  background: rgba(13, 13, 17, 0.55);
  border: 1px solid rgba(201, 162, 39, 0.28);
  border-radius: 8px;
  backdrop-filter: blur(4px);
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

/* ---- 段2 寻星令：HUD（右上描金小件，不拦截点击） ---- */
.ch2-hud {
  position: absolute; right: 3.2vw; top: 4.5vh;
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  opacity: 0; transition: opacity 0.5s ease;
  pointer-events: none;
}
.ch2-hud.on { opacity: 1; }
.ch2-hearts { display: flex; gap: 6px; padding: 2px; }
.ch2-hearts i {
  width: 14px; height: 14px; border-radius: 3px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 8px rgba(142, 47, 34, 0.55), inset 0 0 3px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
}
.ch2-hearts i.off {
  background: none;
  border: 1px solid rgba(142, 47, 34, 0.55);
  box-shadow: none;
  opacity: 0.45; transform: scale(0.85);
}
.ch2-hud-item {
  display: flex; align-items: baseline; gap: 8px;
  padding: 4px 10px;
  background: rgba(13, 13, 17, 0.55);
  border: 1px solid rgba(175, 145, 95, 0.28); border-radius: 6px;
  backdrop-filter: blur(3px);
}
.ch2-hud-item label { font-size: 10px; letter-spacing: 0.3em; color: #af915f; }
.ch2-hud-item b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 16px; font-weight: 400; color: #fce1b6;
}
.ch2-hud-combo.rain b { color: #c9a227; text-shadow: 0 0 10px rgba(201, 162, 39, 0.65); }

/* ---- 段2：题目卡（底部中央，卡面不拦截点击，仅跳过/选项/按钮可点） ---- */
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
.ch2-timer {
  position: absolute; top: 0; left: 12px; right: 12px; height: 3px;
  border-radius: 2px; background: rgba(252, 225, 182, 0.12);
  overflow: hidden; transition: opacity 0.4s ease;
}
.ch2-timer i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #c9a227, #e8c85a); }
.ch2-quest.mode-verse .ch2-timer,
.ch2-quest.mode-result .ch2-timer { opacity: 0; }
.ch2-quest-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
.ch2-quest-no { flex: 1; font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55; }
.ch2-quest-type {
  flex: none;
  font-size: 11px; letter-spacing: 0.3em; text-indent: 0.3em; color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 4px;
  padding: 2px 6px;
}
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
.ch2-quest.mode-verse .ch2-quest-hint { display: none; }
.ch2-quest.mode-verse .ch2-quest-verse { display: block; }
.ch2-quest.mode-verse .ch2-skip { visibility: hidden; }

/* ---- 段2：四选一选项（可点） ---- */
.ch2-options { display: none; flex-direction: column; gap: 8px; margin-top: 12px; }
.ch2-quest.mode-choice .ch2-options { display: flex; }
.ch2-opt {
  pointer-events: auto;
  text-align: left;
  background: rgba(252, 225, 182, 0.05);
  border: 1px solid rgba(175, 145, 95, 0.35); border-radius: 6px;
  padding: 9px 12px;
  font-family: var(--font-body, "PingFang SC", sans-serif);
  font-size: 13.5px; line-height: 1.7; color: #f6e8d8;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.15s ease;
}
.ch2-opt:hover:not(:disabled) {
  border-color: rgba(201, 162, 39, 0.75);
  background: rgba(201, 162, 39, 0.1);
  transform: translateX(2px);
}
.ch2-opt.wrong {
  border-color: rgba(142, 47, 34, 0.8);
  background: rgba(142, 47, 34, 0.12);
  color: rgba(246, 232, 216, 0.4);
  cursor: default;
}

/* ---- 段2：结算卡 ---- */
.ch2-result { display: none; text-align: center; }
.ch2-quest.mode-result .ch2-result { display: block; }
.ch2-quest.mode-result .ch2-quest-meta,
.ch2-quest.mode-result .ch2-quest-hint,
.ch2-quest.mode-result .ch2-options { display: none; }
.ch2-result h3 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; font-weight: 400; letter-spacing: 0.4em; text-indent: 0.4em;
  color: #fce1b6; opacity: 0.85; margin-bottom: 10px;
}
.ch2-result-grade {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 44px; line-height: 1.1; color: #c9a227;
  text-shadow: 0 0 22px rgba(201, 162, 39, 0.4);
}
.ch2-result-score { margin-top: 2px; font-size: 13px; letter-spacing: 0.2em; color: #fce1b6; }
.ch2-result-score b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; margin-left: 6px;
}
.ch2-result-line { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.14em; opacity: 0.85; }
.ch2-result-th { margin-top: 4px; font-size: 11px; letter-spacing: 0.12em; color: #af915f; }
.ch2-result-note { margin-top: 8px; font-size: 13px; line-height: 1.9; color: #f6e8d8; }
.ch2-result-best { margin-top: 8px; font-size: 12.5px; letter-spacing: 0.14em; color: #fce1b6; }
.ch2-result-best b { color: #c9a227; font-weight: 400; }
.ch2-best-badge {
  display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 4px;
  font-size: 11px; letter-spacing: 0.2em; color: #f6e8d8;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 12px rgba(142, 47, 34, 0.5);
}
.ch2-result-btns { margin-top: 14px; display: flex; justify-content: center; gap: 12px; }
.ch2-btn {
  pointer-events: auto;
  font-family: var(--font-body, "PingFang SC", sans-serif);
  font-size: 13px; letter-spacing: 0.24em; text-indent: 0.12em;
  padding: 8px 18px; border-radius: 6px; cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}
.ch2-btn-gold { background: rgba(201, 162, 39, 0.14); border: 1px solid rgba(201, 162, 39, 0.6); color: #fce1b6; }
.ch2-btn-gold:hover { background: rgba(201, 162, 39, 0.28); box-shadow: 0 0 16px rgba(201, 162, 39, 0.35); }
.ch2-btn-ghost { background: none; border: 1px solid rgba(175, 145, 95, 0.4); color: #af915f; }
.ch2-btn-ghost:hover { color: #fce1b6; border-color: rgba(201, 162, 39, 0.6); }

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

/* ---- 段2：答对分数飘字（上浮消散） ---- */
.ch2-floats { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ch2-float {
  position: absolute; left: 50%; bottom: 26vh;
  transform: translateX(-50%);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; color: #e8c85a;
  text-shadow: 0 0 14px rgba(201, 162, 39, 0.65), 0 2px 8px rgba(13, 13, 17, 0.9);
  animation: ch2FloatUp 1.15s ease-out forwards;
}
@keyframes ch2FloatUp {
  0% { opacity: 0; transform: translate(-50%, 10px) scale(0.85); }
  18% { opacity: 1; transform: translate(-50%, 0) scale(1.06); }
  100% { opacity: 0; transform: translate(-50%, -72px) scale(1); }
}

/* ---- 段2：答错四角红闪（0.3s） ---- */
.ch2-redflash {
  position: absolute; inset: 0; pointer-events: none; opacity: 0;
  background:
    radial-gradient(42vw 42vh at 0% 0%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 100% 0%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 0% 100%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 100% 100%, rgba(142, 47, 34, 0.5), transparent 70%);
}
.ch2-redflash.on { animation: ch2Red 0.3s ease-out; }
@keyframes ch2Red { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }

/* ---- 段2：星雨（流星 + 大字） ---- */
.ch2-meteor {
  position: absolute; top: 12vh; left: 78vw;
  width: 180px; height: 2px;
  background: linear-gradient(90deg, rgba(252, 225, 182, 0.95), transparent);
  transform: rotate(-32deg); transform-origin: left center;
  filter: drop-shadow(0 0 6px rgba(252, 225, 182, 0.8));
  opacity: 0; pointer-events: none;
}
.ch2-meteor.on { animation: ch2Meteor 1.15s cubic-bezier(0.3, 0.6, 0.6, 1) forwards; }
@keyframes ch2Meteor {
  0% { opacity: 0; transform: rotate(-32deg) translateX(0); }
  8% { opacity: 1; }
  100% { opacity: 0; transform: rotate(-32deg) translateX(-70vw); }
}
.ch2-rain-title {
  position: absolute; left: 50%; top: 34vh;
  transform: translate(-50%, -50%);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(40px, 7vh, 64px);
  letter-spacing: 0.5em; text-indent: 0.5em; color: #fce1b6;
  text-shadow: 0 0 30px rgba(201, 162, 39, 0.75), 0 0 60px rgba(201, 162, 39, 0.4);
  opacity: 0; pointer-events: none;
}
.ch2-rain-title.on { animation: ch2RainTitle 2.2s ease forwards; }
@keyframes ch2RainTitle {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -56%) scale(1.04); }
}

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
.ch2-recap { margin-top: 10px; font-size: 12px; letter-spacing: 0.12em; color: #fce1b6; opacity: 0.7; }

/* ---- 段2 结算卡加厚：卷轴展开（scaleY 12%→100%）+ 落印纸震 ---- */
.ch2-quest.unfold {
  transform-origin: 50% 0;
  animation:
    ch2ScrollOpen 0.65s cubic-bezier(0.22, 0.9, 0.3, 1) both,
    ch2Shake 0.3s ease-out 0.8s both;
}
@keyframes ch2ScrollOpen {
  0% { opacity: 0; transform: translate(-50%, 10px) scaleY(0.12); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: translate(-50%, 0) scaleY(1); }
}
@keyframes ch2Shake {
  0%, 100% { transform: translate(-50%, 0) scaleY(1); }
  25% { transform: translate(-50%, 2px) scaleY(1); }
  50% { transform: translate(-50%, -1px) scaleY(1); }
  75% { transform: translate(-50%, 1px) scaleY(1); }
}

/* ---- 段2 结算卡加厚：段位朱砂大印（评级大字 + 段位名，0.25s 落印） ---- */
.ch2-stamp {
  display: none;
  position: absolute; right: 16px; top: 14px;
  width: 92px; height: 92px;
  flex-direction: column; align-items: center; justify-content: center;
  border-radius: 10px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 18px rgba(142, 47, 34, 0.5), inset 0 0 0 2px rgba(252, 225, 182, 0.35);
  color: #fce1b6;
  transform: rotate(-8deg);
  opacity: 0;
  pointer-events: none;
}
.ch2-quest.mode-result .ch2-stamp {
  display: flex;
  animation: ch2SealStamp 0.25s cubic-bezier(0.2, 1.5, 0.4, 1) 0.55s both;
}
@keyframes ch2SealStamp {
  0% { opacity: 0; transform: rotate(-8deg) scale(2.4); }
  100% { opacity: 1; transform: rotate(-8deg) scale(1); }
}
.ch2-stamp b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 40px; font-weight: 400; line-height: 1;
  text-shadow: 0 1px 2px rgba(13, 13, 17, 0.5);
}
.ch2-stamp span {
  margin-top: 8px;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; letter-spacing: 0.3em; text-indent: 0.3em;
}
.ch2-result-rank { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.14em; color: #fce1b6; }
.ch2-result-rank b { color: #c9a227; font-weight: 400; }

/* ---- 段2 结算卡加厚：错题回顾（星官名 + hintWrong 一句） ---- */
.ch2-wrong { margin-top: 10px; max-height: 108px; overflow-y: auto; text-align: left; }
.ch2-wrong h4 {
  font-size: 11px; font-weight: 400; letter-spacing: 0.3em; text-indent: 0.3em;
  color: #af915f; text-align: center; margin-bottom: 6px;
}
.ch2-wrong ul { margin: 0; padding: 0; }
.ch2-wrong li {
  list-style: none;
  font-size: 12.5px; line-height: 1.8; color: rgba(246, 232, 216, 0.85);
}
.ch2-wrong li b { color: #c9a227; font-weight: 400; margin-right: 8px; }

/* ---- 段2 翻页卡加厚：档案行（视星等 · 光谱 · 光年） ---- */
.ch2-verse-arch { font-size: 12px; letter-spacing: 0.12em; color: #af915f; margin-top: 8px; }
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

// ---------------------------------------------------------------- 音效（懒建 AudioContext + Karplus-Strong 拨弦）

let actx: AudioContext | null = null;
let masterGain: GainNode | null = null;

/** 懒建音频管线：总增益 0.12（≤0.15，克制）；与环境音开关相互独立 */
function ensureAudio(): void {
  if (typeof window === "undefined") return;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  if (!actx) {
    actx = new AC();
    masterGain = actx.createGain();
    masterGain.gain.value = 0.12;
    masterGain.connect(actx.destination);
  }
  if (actx.state === "suspended") void actx.resume();
}

/**
 * Karplus-Strong 拨弦：噪声激励进环形缓冲，逐样本低通反馈出弦音衰减。
 * SFX 四层音高：答对 A5 / 连击 D6 / 答错超时 E3 / 落印 A3，一拨即收，不铺底。
 */
function pluck(freq: number, dur: number, gain: number): void {
  ensureAudio();
  if (!actx || !masterGain) return;
  const sr = actx.sampleRate;
  const period = Math.max(2, Math.round(sr / freq));
  const len = Math.floor(sr * dur);
  const buf = actx.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const ringBuf = new Float32Array(period);
  for (let i = 0; i < period; i++) ringBuf[i] = Math.random() * 2 - 1;
  let idx = 0;
  for (let i = 0; i < len; i++) {
    const cur = ringBuf[idx]!;
    const nxt = ringBuf[(idx + 1) % period]!;
    ringBuf[idx] = 0.996 * 0.5 * (cur + nxt);
    out[i] = cur * gain;
    idx = (idx + 1) % period;
  }
  const src = actx.createBufferSource();
  src.buffer = buf;
  src.connect(masterGain);
  src.start();
}

function pluckHigh(): void {
  pluck(880, 0.9, 0.9); // 答对：A5 高音拨弦
}
function pluckCombo(): void {
  pluck(1174.7, 0.7, 0.8); // 连击（≥2）：D6，更高更亮
}
function pluckSeal(): void {
  pluck(220, 0.5, 0.75); // 落印：A3 短促一拨（与大印盖下对齐）
}
function pluckLow(): void {
  pluck(164.8, 1.1, 1); // 答错/超时：E3 低音拨弦
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

  // ---- 段2 寻星令：HUD（心/得分/连击，右上） ----
  const hud = el("div", "ch2-hud");
  hud.innerHTML = `
    <div class="ch2-hearts"><i></i><i></i><i></i></div>
    <div class="ch2-hud-item ch2-hud-score"><label>得分</label><b>0</b></div>
    <div class="ch2-hud-item ch2-hud-combo"><label>连击</label><b>×1</b></div>
  `;
  const heartEls = Array.from(hud.querySelectorAll<HTMLElement>(".ch2-hearts i"));
  const hudScore = hud.querySelector<HTMLElement>(".ch2-hud-score b")!;
  const hudComboBox = hud.querySelector<HTMLElement>(".ch2-hud-combo")!;
  const hudCombo = hud.querySelector<HTMLElement>(".ch2-hud-combo b")!;

  // ---- 段2：题目卡（倒计时条 / 题干 / 选项 / 翻页诗句 / 结算） ----
  const questCard = el("div", "ch2-card ch2-quest");
  questCard.innerHTML = `
    <div class="ch2-timer"><i></i></div>
    <div class="ch2-quest-meta">
      <span class="ch2-quest-no"></span>
      <span class="ch2-quest-type"></span>
      <button type="button" class="ch2-skip">跳过</button>
    </div>
    <p class="ch2-quest-hint"></p>
    <div class="ch2-options"></div>
    <div class="ch2-quest-verse">
      <p class="ch2-verse-text"></p>
      <p class="ch2-verse-from"></p>
      <p class="ch2-verse-arch"></p>
      <p class="ch2-verse-plain"></p>
    </div>
    <div class="ch2-result">
      <div class="ch2-stamp"><b class="ch2-stamp-grade">丙</b><span class="ch2-stamp-rank">童生</span></div>
      <h3>寻星令 · 结算</h3>
      <p class="ch2-result-grade">丙</p>
      <p class="ch2-result-score">总分<b>0</b></p>
      <p class="ch2-result-line"></p>
      <p class="ch2-result-rank"></p>
      <p class="ch2-result-th"></p>
      <p class="ch2-result-note"></p>
      <div class="ch2-wrong"><h4>错题回顾</h4><ul></ul></div>
      <p class="ch2-result-best"></p>
      <div class="ch2-result-btns">
        <button type="button" class="ch2-btn ch2-btn-gold ch2-again">再来一局</button>
        <button type="button" class="ch2-btn ch2-btn-ghost ch2-goto-explore">进入星野</button>
      </div>
    </div>
  `;
  const timerFill = questCard.querySelector<HTMLElement>(".ch2-timer i")!;
  const questNo = questCard.querySelector<HTMLElement>(".ch2-quest-no")!;
  const questType = questCard.querySelector<HTMLElement>(".ch2-quest-type")!;
  const questHint = questCard.querySelector<HTMLElement>(".ch2-quest-hint")!;
  const optionsBox = questCard.querySelector<HTMLElement>(".ch2-options")!;
  const verseText = questCard.querySelector<HTMLElement>(".ch2-verse-text")!;
  const verseFrom = questCard.querySelector<HTMLElement>(".ch2-verse-from")!;
  const verseArch = questCard.querySelector<HTMLElement>(".ch2-verse-arch")!;
  const versePlain = questCard.querySelector<HTMLElement>(".ch2-verse-plain")!;
  const stampGrade = questCard.querySelector<HTMLElement>(".ch2-stamp-grade")!;
  const stampRank = questCard.querySelector<HTMLElement>(".ch2-stamp-rank")!;
  const resultGrade = questCard.querySelector<HTMLElement>(".ch2-result-grade")!;
  const resultScore = questCard.querySelector<HTMLElement>(".ch2-result-score b")!;
  const resultLine = questCard.querySelector<HTMLElement>(".ch2-result-line")!;
  const resultRank = questCard.querySelector<HTMLElement>(".ch2-result-rank")!;
  const resultTh = questCard.querySelector<HTMLElement>(".ch2-result-th")!;
  const resultNote = questCard.querySelector<HTMLElement>(".ch2-result-note")!;
  const wrongBox = questCard.querySelector<HTMLElement>(".ch2-wrong")!;
  const wrongList = questCard.querySelector<HTMLElement>(".ch2-wrong ul")!;
  const resultBest = questCard.querySelector<HTMLElement>(".ch2-result-best")!;
  const skipBtn = questCard.querySelector<HTMLButtonElement>(".ch2-skip")!;
  const againBtn = questCard.querySelector<HTMLButtonElement>(".ch2-again")!;
  const gotoExploreBtn = questCard.querySelector<HTMLButtonElement>(".ch2-goto-explore")!;

  // ---- 段2：特效层（飘字 / 红闪 / 流星 / 星雨大字） ----
  const floatLayer = el("div", "ch2-floats");
  const redflashEl = el("div", "ch2-redflash");
  const meteorEl = el("div", "ch2-meteor");
  const rainTitleEl = el("div", "ch2-rain-title");
  rainTitleEl.textContent = "星雨";

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

  // ---- 翻页卡档案行：星官最亮成员星的 视星等/光谱/光年 ----
  // stars.json（mag/ci/dist，按 hip 索引）+ asterisms.json（星官成员 HIP 表）运行时加载，
  // 各星官预生成一行档案文案；数据晚到时补填翻页卡（与引文同款兜底）。
  interface StarsJson {
    stars: { hip: number; mag: number; ci: number | null; dist: number | null }[];
  }
  interface AsterismsJson {
    asterisms: { name: string; stars: number[] }[];
  }
  let archiveByName: Record<string, string> = {};
  Promise.all([
    fetch(dataUrl("data/stars.json")).then((r) => (r.ok ? (r.json() as Promise<StarsJson>) : null)),
    fetch(dataUrl("data/asterisms.json")).then((r) => (r.ok ? (r.json() as Promise<AsterismsJson>) : null)),
  ])
    .then(([sj, aj]) => {
      if (!sj || !aj) return;
      const byHip = new Map(sj.stars.map((s) => [s.hip, s] as const));
      const map: Record<string, string> = {};
      for (const a of aj.asterisms) {
        const members = a.stars
          .map((h) => byHip.get(h))
          .filter((s): s is StarsJson["stars"][number] => s !== undefined);
        map[a.name] = ch2ArchiveLine(ch2Brightest(members));
      }
      archiveByName = map;
      if (cardMode === "verse") fillVerse(); // 数据晚到时补填翻页卡
    })
    .catch(() => {
      /* 档案行缺失不阻塞游戏（翻页卡该行为空） */
    });

  // ---------------------------------------------------------------- 状态

  let seg = -1; // 当前段（-1 = 未定位，下次 applyProgress 必触发 onSegEnter）
  let lastP = 0;

  // 一局状态（resetRound 全量重置；段间往返保留，回滚幂等）
  let deck: readonly Ch2Quest[] = ch2BuildDeck(); // 本局题序（开局洗牌）
  let questIdx = 0; // 当前题（=== deck.length 表示本局结束）
  let solvedFlags: boolean[] = deck.map(() => false); // 已点亮（答对/跳过/补亮）
  let hearts = CH2_MAX_HEARTS;
  let score = 0;
  let streak = 0; // 当前连击数（答对 +1，答错/超时归零，跳过不变）
  let correctCount = 0;
  let misses = 0; // 当前题点错次数（仅 seek/flash 的天空点错）
  let hintLevel: 0 | 1 | 2 = 0;
  let phase: "asking" | "revealed" | "over" = "asking";
  const wrongNotes: { name: string; note: string }[] = []; // 错题回顾（超时/心尽/闪电小题作废）

  // 闪电快答现场（blitz 题专用；主 streak 不动，单独 blitzStreak 计分）
  let blitzList: string[] = []; // 小题目标表（prepQuest 时从题库取）
  let blitzIdx = 0; // 当前小题
  let blitzStreak = 0; // 小题连击（倍率用，答错/超时归零）
  let blitzHits = 0; // 已答对小题数
  let blitzLit = false; // 本题是否有点亮的星官（答对/跳过小题置真）
  let blitzWaiting = false; // 小题间连发节拍中（此时天空点击/跳过不判定）

  // 当前题运行现场
  let optionOrder: number[] = []; // choice/name 选项展示序（原下标的洗牌）
  const wrongOpts = new Set<number>(); // choice/name 已点错的选项原下标
  let flashSeen = false; // flash 本题是否已完成首次高亮（回滚重进不重播）
  let timeLimitMs = CH2_TIME_LIMIT_EARLY_S * 1000; // 本题总时长
  let remainMs = timeLimitMs; // 剩余（暂停/恢复用）
  let deadlineMs = 0; // >0 = 倒计时进行中（performance.now() 刻度）

  // 一局计时与纪录
  let roundStarted = false;
  let roundStartMs = 0;
  let roundEndMs = 0;
  let bestSaved = false; // localStorage 每局只写一次（fillResult 可重复渲染）
  let roundRecorded = false; // 段位进程（局数/最高段位）每局只记一次
  let sealPlayed = false; // 落印音效每局只播一次（与 CSS 大印盖下对齐）

  // 星雨
  let rainActive = false;
  let rainTimer: ReturnType<typeof setTimeout> | null = null;

  type CardMode = "hidden" | "ask" | "choice" | "verse" | "result";
  let cardMode: CardMode = "hidden";

  let flashTimer: ReturnType<typeof setTimeout> | null = null;
  let advanceTimer: ReturnType<typeof setTimeout> | null = null;
  let doneHideTimer: ReturnType<typeof setTimeout> | null = null;
  let blitzTimer: ReturnType<typeof setTimeout> | null = null; // 闪电小题连发节拍
  let sealTimer: ReturnType<typeof setTimeout> | null = null; // 落印音效延迟（对齐 CSS 大印）
  let growthTween: gsap.core.Tween | null = null;
  let flashTween: gsap.core.Tween | null = null;
  let bloomTween: gsap.core.Tween | null = null;
  let ringBurstTween: gsap.core.Tween | null = null;
  let slowTween: gsap.core.Tween | null = null; // 答对慢镜缓回（setTimeScale 0.5 → 1）
  let unsubPick: (() => void) | null = null;
  let rafId = 0;
  const floats = new Set<HTMLElement>();

  // 段1 脚本注视（frame 钩子驱动；applyCameraState 后调用不被覆写）
  let gazeW = 0; // 注视权重当前值（向目标值阻尼趋近）
  let gazeActive = false; // 是否正在向 SkyApp 写注视
  const gazeCur = new THREE.Quaternion(); // 注视朝向当前值（向目标 slerp）

  // 段2 寻星/闪现题开场镜头暗示：gaze 短暂偏向目标天区（15° 偏移，给方向不给答案）
  let qGazeT = -1; // <0 = 未激活；≥0 = 暗示已进行秒数
  const qGazeQuat = new THREE.Quaternion(); // 暗示朝向（目标方向 + 15° 偏移）
  const qGazeOffset = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Q_GAZE_OFFSET_RAD,
  );

  let arrowOn = false;
  let ring: THREE.Sprite | null = null;
  let ringTarget = "";
  let ringBase = 8;
  let ringBursting = false; // 答对爆闪播放中（tick 脉动与 renderHints 都让位）
  let ringTex: THREE.CanvasTexture | null = null;

  // DOM 显隐缓存（update 高频路径只在变化时碰 classList）
  let titleOn = false;
  let finaleOn = false;
  let exploreOn = false;
  let hintOn = false;
  let hudOn = false;
  let activeLine = -2;
  let finaleWritten = false; // 段1 收尾已写过全体组（回滚离开时补一次归零）
  let timerBarCache = ""; // 倒计时条上次写入（去抖）

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
  function setHudOn(on: boolean): void {
    if (hudOn === on) return;
    hudOn = on;
    hud.classList.toggle("on", on);
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
  /** CSS 动画重触发（reflow 技巧，不占计时器） */
  function restartAnim(node: HTMLElement, cls: string): void {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
  }

  // ---- HUD ----
  function fmtMult(m: number): string {
    return `×${Number.isInteger(m) ? m : m.toFixed(1)}`;
  }
  function updateHUD(): void {
    hudScore.textContent = String(score);
    const cur = deck[questIdx];
    const inBlitz = phase === "asking" && !!cur && ch2QuestKind(cur) === "blitz";
    hudCombo.textContent = inBlitz
      ? `闪电 ${fmtMult(ch2ComboMultiplier(blitzStreak + 1))}` // 闪电快答：独立连击，不打断主连击
      : rainActive
        ? `${fmtMult(ch2ComboMultiplier(streak + 1))} · 星雨双倍`
        : fmtMult(ch2ComboMultiplier(streak + 1));
    hudComboBox.classList.toggle("rain", rainActive);
    heartEls.forEach((h, i) => h.classList.toggle("off", i >= hearts));
  }
  /** 倒计时条：宽度和色相随剩余比例（金 → 朱砂） */
  function updateTimerBar(f: number): void {
    const pct = (clamp01(f) * 100).toFixed(1);
    if (pct === timerBarCache) return;
    timerBarCache = pct;
    timerFill.style.width = `${pct}%`;
    const hue = Math.round(8 + 34 * clamp01(f)); // 42 金 → 8 朱砂
    timerFill.style.background = `linear-gradient(90deg, hsl(${hue} 62% 52%), hsl(${hue} 70% 62%))`;
  }

  // ---- 题目卡 ----
  function setCardMode(mode: CardMode): void {
    cardMode = mode;
    questCard.classList.toggle("on", mode !== "hidden");
    questCard.classList.toggle("mode-verse", mode === "verse");
    questCard.classList.toggle("mode-result", mode === "result");
    questCard.classList.toggle("mode-choice", mode === "choice");
    if (mode === "result") {
      restartAnim(questCard, "unfold"); // 结算卡：卷轴展开（scaleY 12%→100%）+ 落印纸震
    } else {
      questCard.classList.remove("unfold");
      if (mode !== "hidden") {
        // 翻页：重启入场动画（reflow 技巧，不占计时器；同模式换题也翻页）
        questCard.classList.remove("swap");
        void questCard.offsetWidth;
        questCard.classList.add("swap");
      }
    }
  }
  function fillQuestMeta(): void {
    questNo.textContent = `寻星令 · 其${CN_NUMERALS[questIdx] ?? questIdx + 1} / ${deck.length}`;
    const q = deck[questIdx];
    questType.textContent = q ? (TYPE_LABELS[q.type as string] ?? TYPE_LABELS[ch2QuestKind(q)]!) : "";
  }
  function showAskCard(): void {
    const q = deck[questIdx];
    if (!q) return;
    fillQuestMeta();
    if (ch2QuestKind(q) === "blitz") updateBlitzHint();
    else questHint.textContent = q.hint;
    setCardMode("ask");
  }
  /** 闪电快答小题面：「第 n/3 题 · 找到目标」快速连发 */
  function updateBlitzHint(): void {
    const mini = blitzList[blitzIdx];
    questHint.textContent = mini
      ? `第 ${blitzIdx + 1} / ${blitzList.length} 题 · 找到「${mini}」——快！`
      : "……";
  }
  /** 选项题卡（四选一 choice / 点星选名 name 共用；name 的天空金环由 renderHints 负责） */
  function showOptionsCard(): void {
    const q = deck[questIdx];
    if (!q) return;
    const kind = ch2QuestKind(q);
    if (kind !== "choice" && kind !== "name") return;
    fillQuestMeta();
    questHint.textContent = q.hint;
    optionsBox.innerHTML = "";
    for (const oi of optionOrder) {
      const text = q.options?.[oi];
      if (text === undefined) continue;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ch2-opt";
      b.textContent = text;
      if (wrongOpts.has(oi)) {
        b.classList.add("wrong");
        b.disabled = true;
      } else {
        b.addEventListener("click", () => onOptionPick(oi, b));
      }
      optionsBox.appendChild(b);
    }
    setCardMode("choice");
  }
  /** 翻页卡三层：诗句（poem.json）/ 档案行（stars.json 最亮成员星）/ 故事（copy story，缺省回退 plain） */
  function fillVerse(): void {
    const q = deck[questIdx];
    if (!q) return;
    const entry = poem?.[q.target];
    verseText.textContent = entry?.text ?? "……";
    verseFrom.textContent = entry ? `《步天歌》 · ${entry.from}` : "《步天歌》";
    verseArch.textContent = archiveByName[q.target] ?? "";
    versePlain.textContent = extOf(q).story ?? q.plain;
  }
  function showVerseCard(): void {
    fillVerse();
    setCardMode("verse");
  }
  function fmtDuration(ms: number): string {
    const s = Math.round(ms / 1000);
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}分${s % 60}秒` : `${s}秒`;
  }
  function fillResult(): void {
    const grade = ch2Grade(score);
    const ranks = activeRanks();
    const rank = ch2RankOf(score, ranks) || CH2_RANKS_FALLBACK[0]!.name;
    resultGrade.textContent = grade;
    stampGrade.textContent = grade; // 朱砂大印：评级大字
    stampRank.textContent = rank; // 朱砂大印：段位名
    resultScore.textContent = String(score);
    const used = roundStarted ? Math.max(0, roundEndMs - roundStartMs) : 0;
    resultLine.textContent = `用时 ${fmtDuration(used)} · 答对 ${correctCount} / ${deck.length}`;
    resultTh.textContent = `甲 ≥ ${CH2_GRADE_JIA} · 乙 ≥ ${CH2_GRADE_YI} · 丙 未及乙等`;
    const verdict = CH2_VERDICTS[rank]; // 各段位评语（copy 落地），缺省回退甲乙丙评语
    resultNote.textContent = verdict && verdict.length > 0 ? verdict.join("") : GRADE_NOTES[grade];
    // 段位进程：累计局数 + 史上最高段位（每局只记一次；fillResult 可重复渲染）
    let rounds = 0;
    let bestRank = "";
    try {
      rounds = Number(window.localStorage.getItem(ROUNDS_KEY) ?? 0) || 0;
      bestRank = window.localStorage.getItem(RANK_KEY) ?? "";
    } catch {
      /* 隐私模式等：无段位进程功能，不阻塞结算 */
    }
    if (!roundRecorded) {
      roundRecorded = true;
      rounds += 1;
      if (rankIndex(ranks, rank) >= rankIndex(ranks, bestRank)) bestRank = rank; // 段位表外旧值（-1）必然让位
      try {
        window.localStorage.setItem(ROUNDS_KEY, String(rounds));
        window.localStorage.setItem(RANK_KEY, bestRank);
      } catch {
        /* 同上 */
      }
    }
    if (!bestRank) bestRank = rank;
    resultRank.innerHTML = `段位 <b>${escapeHtml(rank)}</b> · 第 ${rounds} 局 · 史上段位 <b>${escapeHtml(bestRank)}</b>`;
    // 错题回顾：答错/超时作废题（星官名 + copy hintWrong 一句）
    if (wrongNotes.length === 0) {
      wrongBox.style.display = "none";
    } else {
      wrongBox.style.display = "";
      wrongList.innerHTML = wrongNotes
        .map((w) => `<li><b>${escapeHtml(w.name)}</b>${escapeHtml(w.note)}</li>`)
        .join("");
    }
    let prev = 0;
    try {
      prev = Number(window.localStorage.getItem(BEST_KEY) ?? 0) || 0;
    } catch {
      /* 隐私模式等：无最高分功能，不阻塞结算 */
    }
    const isRecord = score > prev;
    if (!bestSaved) {
      bestSaved = true;
      if (isRecord) {
        try {
          window.localStorage.setItem(BEST_KEY, String(score));
        } catch {
          /* 同上 */
        }
      }
    }
    const best = Math.max(prev, score);
    resultBest.innerHTML = isRecord
      ? `刷新纪录 <b>${best}</b><span class="ch2-best-badge">史上最佳</span>`
      : `史上最佳 <b>${best}</b>`;
    // 落印音效：与 CSS 大印盖下（0.55s 延迟 + 0.25s 落印）对齐，每局只播一次
    if (!sealPlayed) {
      sealPlayed = true;
      clearSealTimer();
      sealTimer = setTimeout(() => {
        sealTimer = null;
        pluckSeal();
      }, 800);
    }
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
    const q = deck[questIdx];
    const kind = q ? ch2QuestKind(q) : "seek";
    const skyJudged = kind === "seek" || kind === "flash"; // 仅天空判定题型出箭头/濒临超时光圈
    const inQuiz = seg === SEG_QUIZ && phase === "asking" && !!q;
    setArrowOn(inQuiz && skyJudged && hintLevel >= 1);
    // 点星选名 name：金环常亮即题面（复用 ensureRing）；寻星/闪现：提示升级到 2 级出淡金光圈
    const wantRing = inQuiz && ((skyJudged && hintLevel >= 2) || kind === "name");
    if (wantRing && q) ensureRing(q.target);
    else if (!ringBursting) removeRing(); // 爆闪播放中让位（爆闪结束自行 removeRing）
  }

  // ---- 计时器 ----
  function clearFlashTimer(): void {
    if (flashTimer !== null) {
      clearTimeout(flashTimer);
      flashTimer = null;
    }
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
  function clearRainTimer(): void {
    if (rainTimer !== null) {
      clearTimeout(rainTimer);
      rainTimer = null;
    }
  }
  function clearBlitzTimer(): void {
    if (blitzTimer !== null) {
      clearTimeout(blitzTimer);
      blitzTimer = null;
    }
  }
  function clearSealTimer(): void {
    if (sealTimer !== null) {
      clearTimeout(sealTimer);
      sealTimer = null;
    }
  }
  /** 离开答题段 / exit：暂停本题倒计时（剩余时间存 remainMs，回来接着走） */
  function pauseCountdown(): void {
    if (phase === "asking" && deadlineMs > 0) {
      remainMs = Math.max(0, deadlineMs - performance.now());
      deadlineMs = 0;
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
  /** bloom 统一出口：rain/脉冲共用一条 tween，互相接管不打架 */
  const bloom = { v: BLOOM_BASE };
  function bloomTo(target: number, dur: number): void {
    bloomTween?.kill();
    bloomTween = gsap.to(bloom, {
      v: target,
      duration: dur,
      ease: "power2.out",
      onUpdate: () => ctx.sky.setBloom({ strength: bloom.v }),
      onComplete: () => {
        bloomTween = null;
      },
    });
  }
  function pulseBloom(): void {
    if (rainActive) return; // 星雨期间 bloom 已处高位，不叠脉冲
    bloomTween?.kill();
    bloom.v = BLOOM_PEAK;
    ctx.sky.setBloom({ strength: bloom.v });
    bloomTo(BLOOM_BASE, 0.8);
  }
  /** 答对金环爆闪：环放大 2.4 倍并淡出（与提示环共用同一枚 Sprite） */
  function ringBurst(target: string): void {
    ensureRing(target);
    if (!ring) return;
    ringBurstTween?.kill();
    ringBursting = true;
    const proxy = { s: ringBase, o: 0.95 };
    ring.material.opacity = 0.95;
    ringBurstTween = gsap.to(proxy, {
      s: ringBase * 2.4,
      o: 0,
      duration: 0.75,
      ease: "power2.out",
      onUpdate: () => {
        if (!ring) return;
        ring.scale.set(proxy.s, proxy.s, 1);
        ring.material.opacity = proxy.o;
      },
      onComplete: () => {
        ringBurstTween = null;
        ringBursting = false;
        removeRing();
      },
    });
  }
  function spawnFloat(text: string): void {
    const s = document.createElement("span");
    s.className = "ch2-float";
    s.textContent = text;
    floatLayer.appendChild(s);
    floats.add(s);
    s.addEventListener("animationend", () => {
      floats.delete(s);
      s.remove();
    });
  }
  function clearFloats(): void {
    floats.forEach((s) => s.remove());
    floats.clear();
  }
  function startRain(): void {
    rainActive = true;
    clearRainTimer();
    rainTimer = setTimeout(() => {
      rainTimer = null;
      endRain();
    }, RAIN_MS);
    bloomTo(RAIN_BLOOM, 0.6);
    restartAnim(rainTitleEl, "on"); // 大字「星雨」
    restartAnim(meteorEl, "on"); // 一颗 CSS 流星掠过
    ctx.sky.spawnMeteors(6); // 契约：星雨流星
    updateHUD();
  }
  function endRain(): void {
    if (!rainActive && rainTimer === null) return;
    rainActive = false;
    clearRainTimer();
    rainTitleEl.classList.remove("on");
    bloomTo(BLOOM_BASE, 0.9);
    updateHUD();
  }

  // ---- 音效出口（拨弦；懒建 AudioContext） ----
  // pluckHigh / pluckCombo / pluckLow / pluckSeal 为模块级函数，直接调用即可。

  // ---- 演出契约（SkyApp 已落地，签名以此为准，直接类型化调用） ----
  //   setTimeScale(s)                时间缩放（答对慢镜）
  //   spawnBurst(pos, { count })     世界坐标粒子金雨
  //   spawnMeteors(n)                星雨流星

  /** 目标星官世界坐标粒子金雨（答对与满 5 连击时调用；count 契约定死 100） */
  function spawnBurstAt(target: string): void {
    const dir = TARGET_DIRS[target];
    if (!dir) return;
    const [x, y, z] = radecToVec3(dir.ra, dir.dec, SKY_R);
    ctx.sky.spawnBurst({ x, y, z }, { count: 100 });
  }

  /** 答对慢镜：setTimeScale(0.5) 定格 0.4s，随后 0.6s 缓回 1（gsap 单 tween 接管） */
  const slow = { v: 1 };
  function slowMo(): void {
    slowTween?.kill();
    slow.v = 0.5;
    ctx.sky.setTimeScale(0.5);
    slowTween = gsap.to(slow, {
      v: 1,
      delay: 0.4,
      duration: 0.6,
      ease: "power2.inOut",
      onUpdate: () => ctx.sky.setTimeScale(slow.v),
      onComplete: () => {
        slowTween = null;
      },
    });
  }
  /** 时间缩放复位（exit/resetRound 调用） */
  function resetTimeScale(): void {
    if (slowTween) {
      slowTween.kill();
      slowTween = null;
    }
    if (slow.v !== 1) {
      slow.v = 1;
      ctx.sky.setTimeScale(1);
    }
  }

  // ---- 段2 开场镜头暗示（寻星/闪现题；复用 frame 钩子 + gazeQuat + 质心表） ----
  function nudgeGaze(target: string): void {
    const dir = TARGET_DIRS[target];
    if (!dir) {
      qGazeT = -1;
      return;
    }
    qGazeQuat.copy(gazeQuat(dir.ra, dir.dec)).premultiply(qGazeOffset); // ~15° 偏移：给方向不给答案
    qGazeT = 0;
  }
  function stopQuizGaze(): void {
    if (qGazeT < 0) return;
    qGazeT = -1;
    ctx.sky.setGazeBlend(0);
  }

  // ---- 错题回顾与段位进程 ----
  /** copy「加厚」字段读取（hintWrong/story 已在题库落地为必填，此处保留回退兜底） */
  function extOf(q: Ch2Quest): { hintWrong?: string; story?: string } {
    return q as Ch2Quest & { hintWrong?: string; story?: string };
  }
  function recordWrong(name: string, note: string): void {
    if (wrongNotes.some((w) => w.name === name)) return; // 同一星官只记一次
    wrongNotes.push({ name, note });
  }
  /** 当前生效段位表：copy.ts 的 CH2_RANKS（降序）经归一化升序；异常时用兜底表 */
  function activeRanks(): readonly Ch2Rank[] {
    const n = ch2NormalizeRanks(CH2_RANKS);
    return n.length > 0 ? n : CH2_RANKS_FALLBACK;
  }
  function rankIndex(ranks: readonly Ch2Rank[], name: string): number {
    return ranks.findIndex((r) => r.name === name);
  }

  // ---------------------------------------------------------------- 答题状态机（事件驱动）

  /** 当前题初始化：重置每题现场（不碰天空与卡片，由 startQuest/renderQuestState 驱动） */
  function prepQuest(): void {
    const q = deck[questIdx];
    const kind = q ? ch2QuestKind(q) : "seek";
    misses = 0;
    hintLevel = 0;
    flashSeen = false;
    wrongOpts.clear();
    clearBlitzTimer();
    blitzWaiting = false;
    if (kind === "blitz" && q) {
      blitzList = ch2BlitzTargets(q);
      blitzIdx = 0;
      blitzStreak = 0;
      blitzHits = 0;
      blitzLit = false;
    }
    optionOrder =
      (kind === "choice" || kind === "name") && q
        ? ch2Shuffle((q.options ?? []).map((_, i) => i), Math.random)
        : [];
    timeLimitMs = (kind === "blitz" ? CH2_BLITZ_SECONDS : ch2TimeLimit(questIdx)) * 1000;
    remainMs = timeLimitMs;
    deadlineMs = 0;
  }

  /** 答题段内武装当前题：熄灭目标、上弦倒计时、闪现题起高亮、闪电题武装当前小题 */
  function armQuest(): void {
    if (seg !== SEG_QUIZ || phase !== "asking") return;
    const q = deck[questIdx];
    if (!q) return;
    const kind = ch2QuestKind(q);
    if (kind === "blitz") {
      armBlitzMini();
      return;
    }
    // 点星选名保持点亮（金环内的星形即题面），其余题型熄灭待寻
    ctx.sky.setGroupProgress(q.target, kind === "name" ? 1 : 0);
    deadlineMs = performance.now() + remainMs;
    timerBarCache = "";
    updateTimerBar(remainMs / timeLimitMs);
    if (kind === "flash" && !flashSeen) startFlash(q);
  }

  /** 闪电快答：武装当前小题——熄灭目标、3s 上弦（remainMs 暂停恢复友好） */
  function armBlitzMini(): void {
    const mini = blitzList[blitzIdx];
    if (!mini) return;
    ctx.sky.setGroupProgress(mini, 0); // 熄灭待寻
    timeLimitMs = CH2_BLITZ_SECONDS * 1000;
    if (remainMs <= 0 || remainMs > timeLimitMs) remainMs = timeLimitMs;
    deadlineMs = performance.now() + remainMs;
    timerBarCache = "";
    updateTimerBar(remainMs / timeLimitMs);
  }

  /** 闪电小题答对：生长点亮 + 金雨/金环爆闪 + 独立连击计分，快速连发下一小题 */
  function solveBlitzMini(): void {
    const q = deck[questIdx];
    if (!q || phase !== "asking" || blitzWaiting) return;
    const mini = blitzList[blitzIdx];
    if (!mini) return;
    deadlineMs = 0;
    remainMs = 0;
    blitzStreak += 1;
    blitzHits += 1;
    blitzLit = true;
    const gained = ch2ScoreFor(blitzStreak, rainActive); // 单独计连击（主 streak 不动）
    score += gained;
    lightTargetGradual(mini, 0.5);
    pulseBloom();
    ringBurst(mini);
    spawnBurstAt(mini); // 契约：粒子金雨（引擎代理）
    spawnFloat(`+${gained}`);
    pluckHigh();
    blitzIdx += 1;
    updateHUD();
    scheduleNextMini(300); // 快速连发
  }

  /** 闪电小题答错/超时：不扣心、不进错题主连击——记错题回顾、断闪电连击，连发下一小题 */
  function failBlitzMini(): void {
    const q = deck[questIdx];
    if (!q || phase !== "asking" || blitzWaiting) return;
    const mini = blitzList[blitzIdx];
    deadlineMs = 0;
    remainMs = 0;
    blitzStreak = 0;
    if (mini) recordWrong(mini, extOf(q).hintWrong ?? q.plain);
    restartAnim(redflashEl, "on");
    pluckLow();
    blitzIdx += 1;
    updateHUD();
    scheduleNextMini(450);
  }

  /** 小题间节拍（含小题尽头的收束）：blitzWaiting 期间天空点击/跳过不判定 */
  function scheduleNextMini(delay: number): void {
    clearBlitzTimer();
    blitzWaiting = true;
    blitzTimer = setTimeout(() => {
      blitzTimer = null;
      blitzWaiting = false;
      if (blitzIdx >= blitzList.length) {
        endBlitz();
        return;
      }
      remainMs = CH2_BLITZ_SECONDS * 1000;
      armBlitzMini();
      updateBlitzHint();
    }, delay);
  }

  /** 闪电快答收束：全对才算本题答对；不进翻页卡（保持连发节奏），直接进下一题 */
  function endBlitz(): void {
    solvedFlags[questIdx] = blitzLit;
    const full = blitzList.length > 0 && blitzHits === blitzList.length;
    if (full) correctCount += 1;
    spawnFloat(`闪电快答 ${blitzHits} / ${blitzList.length}`);
    if (full) pluckCombo();
    advanceQuest();
  }

  /** 闪现题型：目标高亮 FLASH_MS 后拉回 0（凭记忆点回） */
  function startFlash(q: Ch2Quest): void {
    ctx.sky.setGroupProgress(q.target, 1);
    clearFlashTimer();
    flashTimer = setTimeout(() => {
      flashTimer = null;
      flashSeen = true;
      flashTween?.kill();
      const proxy = { v: 1 };
      flashTween = gsap.to(proxy, {
        v: 0,
        duration: 0.5,
        ease: "power1.in",
        onUpdate: () => ctx.sky.setGroupProgress(q.target, proxy.v),
        onComplete: () => {
          flashTween = null;
        },
      });
    }, FLASH_MS);
  }
  function clearFlash(): void {
    clearFlashTimer();
    flashTween?.kill();
    flashTween = null;
  }

  function startQuest(): void {
    const q = deck[questIdx];
    if (!q) {
      settle();
      return;
    }
    phase = "asking";
    prepQuest();
    const kind = ch2QuestKind(q);
    if (kind === "choice" || kind === "name") showOptionsCard();
    else showAskCard();
    if (kind === "seek" || kind === "flash") nudgeGaze(q.target); // 开场镜头暗示：偏向目标天区 ~15°
    else stopQuizGaze();
    renderHints();
    armQuest();
    updateHUD();
  }

  function solveQuest(): void {
    const q = deck[questIdx];
    if (!q || phase !== "asking") return;
    phase = "revealed";
    stopQuizGaze();
    solvedFlags[questIdx] = true;
    deadlineMs = 0;
    remainMs = 0;
    clearFlash();
    streak += 1;
    correctCount += 1;
    const gained = ch2ScoreFor(streak, rainActive);
    score += gained;
    misses = 0;
    hintLevel = 0;
    renderHints(); // 收起箭头/光圈（爆闪前清场）
    if (ch2QuestKind(q) === "name") ctx.sky.setGroupProgress(q.target, 1); // 点星选名本已点亮，免生长闪烁
    else lightTargetGradual(q.target, 1.1); // 生长点亮
    pulseBloom();
    ringBurst(q.target); // 金环爆闪放大
    spawnBurstAt(q.target); // 契约：目标星官世界坐标粒子金雨（引擎代理）
    slowMo(); // 契约：慢镜 setTimeScale 0.5 定格 0.4s 后缓回 1
    spawnFloat(`+${gained}`); // 分数飘字
    if (streak >= 2) pluckCombo(); // SFX 分层：连击 D6
    else pluckHigh(); // 答对 A5
    if (streak > 0 && streak % 5 === 0) startRain(); // 满 5 连击触发星雨
    updateHUD();
    showVerseCard(); // 翻页三层：诗句 / 档案行 / 故事
    clearAdvanceTimer();
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      advanceQuest();
    }, REVEAL_HOLD_MS);
  }

  /** 答错（点错星 kind="pick" / 点错选项 kind="option"）：扣 1 心、断连击、红闪低音 */
  function registerMiss(kind: "pick" | "option"): void {
    if (phase !== "asking") return;
    hearts = Math.max(0, hearts - 1);
    streak = 0;
    if (kind === "pick") {
      misses += 1;
      hintLevel = ch2HintLevel(misses, remainMs / 1000);
      renderHints();
    }
    restartAnim(redflashEl, "on"); // 四角红闪 0.3s
    pluckLow(); // 低音拨弦
    updateHUD();
    if (hearts <= 0) {
      const q = deck[questIdx];
      if (q) recordWrong(q.target, extOf(q).hintWrong ?? q.plain); // 心尽当题作废：列入错题回顾
      settle(); // 心尽提前结算
    }
  }

  /** 超时：此题作废（扣 1 心、不得分、断连击），目标保持熄灭，直接进下一题（闪电小题例外：不扣心） */
  function onTimeout(): void {
    if (seg !== SEG_QUIZ || phase !== "asking") return;
    const q = deck[questIdx];
    if (!q) return;
    if (ch2QuestKind(q) === "blitz") {
      failBlitzMini(); // 闪电小题超时：不扣心，连发下一小题
      return;
    }
    deadlineMs = 0;
    remainMs = 0;
    clearFlash();
    ctx.sky.setGroupProgress(q.target, 0);
    recordWrong(q.target, extOf(q).hintWrong ?? q.plain); // 错题回顾
    hearts = Math.max(0, hearts - 1);
    streak = 0;
    restartAnim(redflashEl, "on");
    pluckLow();
    updateHUD();
    if (hearts <= 0) {
      settle();
      return;
    }
    advanceQuest();
  }

  function advanceQuest(): void {
    clearAdvanceTimer();
    questIdx += 1;
    if (questIdx >= deck.length) {
      settle();
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
    const q = deck[questIdx];
    if (q) ctx.sky.setGroupProgress(q.target, 1);
    growthTween?.kill();
    growthTween = null;
    questIdx += 1;
    misses = 0;
    hintLevel = 0;
    if (questIdx >= deck.length) {
      phase = "asking"; // 让 settle 能进入（其守卫 over 幂等）
      settle();
    } else {
      phase = "asking";
      prepQuest(); // 下一题现场由新段落/下次 enter 重建
    }
  }

  /** 跳过：点亮目标直接进下一题——不得分、不扣心、不断连击（闪电题：跳过当前小题） */
  function skipQuest(): void {
    if (seg !== SEG_QUIZ || phase !== "asking") return;
    const q = deck[questIdx];
    if (!q) return;
    stopQuizGaze();
    if (ch2QuestKind(q) === "blitz") {
      if (blitzWaiting) return;
      const mini = blitzList[blitzIdx];
      deadlineMs = 0;
      remainMs = 0;
      if (mini) {
        blitzLit = true;
        lightTargetGradual(mini, 0.5); // 跳过同样走生长点亮
      }
      blitzIdx += 1;
      scheduleNextMini(200);
      return;
    }
    solvedFlags[questIdx] = true;
    deadlineMs = 0;
    clearFlash();
    hintLevel = 0;
    if (ch2QuestKind(q) === "name") ctx.sky.setGroupProgress(q.target, 1); // 点星选名本已点亮
    else lightTargetGradual(q.target, 0.6); // 跳过同样走生长点亮
    advanceQuest(); // 直接进下一题（不展示诗句卡）
  }

  /** 一局结算（题尽/心尽/滚过补亮都会走到）：填结算卡、写最高分与段位进程 */
  function settle(): void {
    if (phase === "over") return;
    phase = "over";
    stopQuizGaze();
    clearBlitzTimer();
    blitzWaiting = false;
    deadlineMs = 0;
    remainMs = 0;
    clearAdvanceTimer();
    clearFlash();
    growthTween?.kill();
    growthTween = null;
    endRain();
    misses = 0;
    hintLevel = 0;
    renderHints();
    roundEndMs = performance.now();
    fillResult();
    setCardMode("result");
    updateHUD();
    if (seg === SEG_EXPLORE) scheduleResultHide(); // 探索段短暂停留后让位
  }

  /** 滚过 0.80 未打完：剩余题目自动点亮（不卡行程）并直接结算 */
  function finishAll(): void {
    clearAdvanceTimer();
    clearFlash();
    deck.forEach((q, i) => {
      if (!solvedFlags[i]) {
        if (ch2QuestKind(q) === "blitz") {
          for (const t of ch2BlitzTargets(q)) ctx.sky.setGroupProgress(t, 1); // 闪电题：小题目标全部补亮
        } else {
          ctx.sky.setGroupProgress(q.target, 1);
        }
        solvedFlags[i] = true;
      }
    });
    questIdx = deck.length;
    settle();
  }

  function scheduleResultHide(): void {
    clearDoneHideTimer();
    doneHideTimer = setTimeout(() => {
      doneHideTimer = null;
      if (phase === "over" && seg === SEG_EXPLORE) setCardMode("hidden"); // 让位给探索面板
    }, RESULT_CARD_HOLD_MS);
  }

  /** 重置全部状态开新局（再来一局）：洗牌、满心、分清零，段内立即重放 */
  function resetRound(): void {
    clearAdvanceTimer();
    clearDoneHideTimer();
    clearFlash();
    clearBlitzTimer();
    clearSealTimer();
    endRain();
    resetTimeScale(); // 慢镜 tween 清掉，时间缩放归 1
    stopQuizGaze();
    growthTween?.kill();
    growthTween = null;
    clearFloats();
    redflashEl.classList.remove("on");
    deck = ch2Shuffle(ch2BuildDeck(), Math.random);
    questIdx = 0;
    solvedFlags = deck.map(() => false);
    hearts = CH2_MAX_HEARTS;
    score = 0;
    streak = 0;
    correctCount = 0;
    phase = "asking";
    wrongNotes.length = 0;
    blitzWaiting = false;
    roundStarted = false;
    roundStartMs = 0;
    roundEndMs = 0;
    bestSaved = false;
    roundRecorded = false;
    sealPlayed = false;
    prepQuest();
    hintLevel = 0;
    removeRing();
    setArrowOn(false);
    updateHUD();
  }

  /** 平滑滚动到章内进度 p（ScrollTrigger scrub 区间线性映射） */
  function scrollToProgress(p: number): void {
    const sec = ctx.root;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    const span = Math.max(0, sec.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + span * p, behavior: "smooth" });
  }

  function restartRound(): void {
    if (phase !== "over") return;
    resetRound();
    if (seg === SEG_QUIZ) renderQuestState(); // 段内立即重开
    else scrollToProgress(0.5); // 探索段点再来一局：滚回答题段（enter 时重放新局）
  }

  function gotoExplore(): void {
    if (seg === SEG_EXPLORE) {
      setCardMode("hidden"); // 已在星野：收起结算卡即可
      return;
    }
    scrollToProgress(0.995); // 滚到段3（scrub 接管后续）
  }

  /** 进答题段的一次性现场重建（双向回滚幂等）：全体点亮后仅当前题熄灭 */
  function renderQuestState(): void {
    if (!roundStarted) {
      roundStarted = true;
      roundStartMs = performance.now();
    }
    lightAllGroups(1);
    if (phase !== "over") {
      const q = deck[questIdx];
      if (q) {
        const kind = ch2QuestKind(q);
        if (kind === "blitz") {
          const mini = blitzList[blitzIdx];
          if (mini) ctx.sky.setGroupProgress(mini, 0); // 闪电题：仅当前小题熄灭
        } else if (kind !== "name") {
          ctx.sky.setGroupProgress(q.target, 0); // 点星选名保持点亮（金环内星形即题面）
        }
      }
    }
    if (phase === "over") {
      fillResult();
      setCardMode("result");
    } else if (phase === "revealed") {
      showVerseCard();
    } else {
      const q = deck[questIdx];
      const kind = q ? ch2QuestKind(q) : "seek";
      if (kind === "choice" || kind === "name") showOptionsCard();
      else showAskCard(); // blitz 由 showAskCard 补小题面
    }
    renderHints();
    armQuest(); // asking 时恢复倒计时/闪现（remainMs 接着走）
    updateHUD();
  }

  function onPickPayload(payload: PickPayload | null): void {
    if (seg !== SEG_QUIZ || phase !== "asking" || !payload) return; // 点空/散星不算点错
    const q = deck[questIdx];
    if (!q) return;
    const kind = ch2QuestKind(q);
    if (kind === "choice" || kind === "name") return; // 选项题：天空点击不判定
    if (kind === "blitz") {
      if (blitzWaiting) return; // 小题连发节拍中不判定
      if (payload.info.name === blitzList[blitzIdx]) solveBlitzMini();
      else failBlitzMini();
      return;
    }
    if (payload.info.name === q.target) {
      solveQuest();
    } else {
      registerMiss("pick");
    }
  }

  function onOptionPick(oi: number, btn: HTMLButtonElement): void {
    if (seg !== SEG_QUIZ || phase !== "asking") return;
    const q = deck[questIdx];
    if (!q) return;
    const kind = ch2QuestKind(q);
    if ((kind !== "choice" && kind !== "name") || wrongOpts.has(oi)) return;
    if (oi === q.answer) {
      solveQuest();
    } else {
      wrongOpts.add(oi);
      btn.classList.add("wrong");
      btn.disabled = true;
      registerMiss("option");
    }
  }

  skipBtn.addEventListener("click", skipQuest);
  againBtn.addEventListener("click", restartRound);
  gotoExploreBtn.addEventListener("click", gotoExplore);

  // ---------------------------------------------------------------- 每帧 tick（倒计时 + 箭头跟踪 + 光圈脉动）

  const tmpVec = new THREE.Vector3();
  function updateArrow(): void {
    const q = deck[questIdx];
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
    // 本题倒计时：走条、濒临超时升级光圈、超时作废
    if (deadlineMs > 0 && seg === SEG_QUIZ && phase === "asking") {
      const rem = deadlineMs - now;
      if (rem <= 0) {
        onTimeout();
      } else {
        remainMs = rem;
        updateTimerBar(rem / timeLimitMs);
        const q = deck[questIdx];
        const kind = q ? ch2QuestKind(q) : "seek";
        // 濒临超时升级淡金光圈仅限寻星/闪现（choice/name 无天空提示；blitz 3s 小题升级即泄题）
        if ((kind === "seek" || kind === "flash") && hintLevel < 2 && rem <= CH2_URGENT_HINT_SECONDS * 1000) {
          hintLevel = 2; // 濒临超时：淡金光圈
          renderHints();
        }
      }
    }
    if (arrowOn) updateArrow();
    if (ring && !ringBursting) {
      const s = ringBase * (1 + 0.13 * Math.sin(now * 0.0024));
      ring.scale.set(s, s, 1);
      ring.material.opacity = 0.7 + 0.3 * Math.sin(now * 0.0024 + 1);
    }
  }

  // ---------------------------------------------------------------- 段驱动（update 高频路径）

  function onSegEnter(s: number, prev: number): void {
    // 离开答题段：暂停倒计时与闪现、星雨收束、生长动画不跨段残留、
    // 答对翻页中的题立即结算
    if (prev === SEG_QUIZ) {
      pauseCountdown();
      clearFlash();
      clearBlitzTimer(); // 闪电连发节拍暂停（重进时 armQuest 恢复当前小题）
      blitzWaiting = false;
      stopQuizGaze(); // 镜头暗示不跨段
      endRain();
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
      setHudOn(false);
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
      setHudOn(true);
      renderQuestState();
    } else {
      ctx.sky.setPickingEnabled(true);
      ctx.sky.setLabelsEnabled(true); // 探索段恢复标签与悬停提示
      ctx.sky.setHoverTipEnabled(true);
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setHudOn(false);
      if (phase !== "over") finishAll(); // 未打完：剩余自动点亮并结算
      else scheduleResultHide(); // 已结算：结算卡短暂停留后让位
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
    // 五句对应星官：当前句生长全亮，前句压暗（高光只给当前星官）；收尾随 finale 回亮
    st.lines.forEach((v, i) => {
      const line = SEG1_LINES[i];
      if (!line) return;
      const eff = Math.max(st.finale, i === st.active ? v : v * 0.15);
      for (const g of line.groups) ctx.sky.setGroupProgress(g, eff);
    });
    setTitleOn(p < SEG1_INTRO_END);
    const active = p >= SEG1_INTRO_END && p < SEG1_LINES_END ? st.active : -1;
    setActiveLine(active);
    // 高光金环指向当前句星官（离开诗句区即移除；与寻星提示共用同一枚环，分段不冲突）
    if (active >= 0) ensureRing(SEG1_RING_TARGETS[active] ?? "");
    else removeRing();
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

  // ---------------------------------------------------------------- 每帧注视（frame 钩子拆两段）

  /** 段1 诗句巡游：脚本注视当前句星官方向；离开段1 权重阻尼归零后完全释放 */
  function frameSeg1Gaze(dt: number): void {
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
  }

  /** 段2 寻星/闪现题开场镜头暗示：权重 0.5 渐衰归零（约 1.4s），用户拖拽随时接管 */
  function frameQuizGaze(dt: number): void {
    if (qGazeT < 0) return;
    if (seg !== SEG_QUIZ || phase !== "asking") {
      stopQuizGaze(); // 答题推进/离段：立即释放（防抖在 0 权重）
      return;
    }
    qGazeT += dt;
    const f = 1 - qGazeT / Q_GAZE_SECS;
    if (f <= 0) {
      qGazeT = -1;
      ctx.sky.setGazeBlend(0);
      return;
    }
    ctx.sky.setGazeBlend(Q_GAZE_MAX_W * f, qGazeQuat);
  }

  // ---------------------------------------------------------------- Chapter

  // 初始一局现场（不武装倒计时：seg=-1，待首次进答题段时由 renderQuestState 起表）
  resetRound();

  return {
    enter() {
      ctx.root.classList.add("inview");
      // 标签权属归 onSegEnter（段1/探索开、答题段关防泄题）。此处不得置位——
      // 若 ScrollTrigger 先 onUpdate 后 onEnter（瞬时跳转会发生），置 true 会
      // 盖掉答题段的 false 且 seg 已同步不会重进 onSegEnter，防泄题失效。
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
      // 本钩子在主循环 applyCameraState 之后调用（见 app.ts），注视不会被 rig
      // 覆写。段1 诗句巡游与段2 开场镜头暗示按段互斥，各自管理权重释放。
      frameSeg1Gaze(dt);
      frameQuizGaze(dt);
    },
    exit() {
      ctx.root.classList.remove("inview");
      cancelAnimationFrame(rafId);
      rafId = 0;
      unsubPick?.();
      unsubPick = null;
      pauseCountdown(); // 本题剩余时间留存，重进答题段接着走
      clearFlash();
      clearAdvanceTimer();
      clearDoneHideTimer();
      clearBlitzTimer(); // 闪电连发节拍挂起（重进时 armQuest 恢复当前小题）
      blitzWaiting = false;
      clearSealTimer(); // 落印音效延迟清掉
      settleReveal(); // 翻页中的题先结算（生长补满、questIdx 推进），再统一清理
      growthTween?.kill();
      growthTween = null;
      resetTimeScale(); // 慢镜 tween 清掉，时间缩放归 1
      endRain(); // 星雨收束（内部 bloom 缓回基线，随后统一复位）
      if (bloomTween) {
        // 脉冲/星雨进行中才复位（已完成时 strength 已缓回基线，不碰 tier 档位的值）
        bloomTween.kill();
        bloomTween = null;
        ctx.sky.setBloom({ strength: BLOOM_BASE });
      }
      ringBurstTween?.kill();
      ringBurstTween = null;
      ringBursting = false;
      removeRing();
      ringTex?.dispose();
      ringTex = null;
      setArrowOn(false);
      clearFloats(); // 分数飘字清场
      redflashEl.classList.remove("on");
      meteorEl.classList.remove("on");
      rainTitleEl.classList.remove("on");
      gazeW = 0;
      gazeActive = false;
      qGazeT = -1; // 段2 镜头暗示一并复位（setGazeBlend 随后统一归零）
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
      setHudOn(false);
      seg = -1; // 强制下次 enter 重建段现场
      void actx?.suspend(); // 音频挂起（下次拨弦时按需 resume）
      // 星官组保持点亮（ch3 背景用），不回滚
    },
  };
}
