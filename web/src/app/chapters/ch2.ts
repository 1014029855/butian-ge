/**
 * ch2 唤星之旅（重写版）：「点亮 = 被唤醒」三段叙事 + 段2 星使引路的自由收集。
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
 *   段2 唤星之旅  p∈[0.35, 0.80)（先引后放、纯净体验：无题库/计分/倒计时）
 *     - 进场：309 星官全部压暗（setGroupProgress(i, CH2_SLEEP_DIM)），仅星点银河
 *       可见；存档（localStorage「ch2-awakened」）中已唤醒的星官随即重亮；
 *     - 引路（前 3 站固定 北斗→北极→天狼，CH2_GUIDE_STATIONS）：星使（firefly.ts
 *       契约，见下）flyTo 目标质心盘旋等待；玩家点击该星官任一成员星（onPick）
 *       或凝视（屏幕中心准星 DOM + 目标角距 < CH2_GAZE_ANGLE_DEG 持续
 *       CH2_GAZE_HOLD_S 秒）触发唤醒；
 *     - 唤醒演出：慢镜 setTimeScale(0.5) 定格 0.4s 后缓回、连线生长点亮、
 *       spawnBurst 90 粒金雨、bloom 短脉冲、《步天歌》诗句（poem.json 运行时查，
 *       取前两分句）描金竖排在星官旁浮现、随光上浮溶散（DOM+CSS）、拨弦泛音
 *       音高随最亮星等（ch2PluckFreq）；星官此后常亮并写入存档；
 *     - 第 3 站后：星使淡出 + 「星路已明，自去吧」；进入自由收集——点击/凝视
 *       任意沉睡星官均可唤醒；闲置 CH2_IDLE_PULSE_S 秒（无相机运动、无拾取）时
 *       最近的沉睡星官金环一闪（克制，一次）；
 *     - 收集卷（左下极简 DOM）：七分区（紫微/太微/天市/青龙/玄武/白虎/朱雀，
 *       归属由 poem.json 的 from 字段导出：「三垣 · 紫微宫」「东方苍龙 · X」等，
 *       ch2RegionOf）各随唤醒填充 + 右上 X/309；25%/50%/75% 触发银河逐档增亮
 *       （MilkyWay 无对外接口，以 bloom 基线逐档 +0.12 近似）与偶发流星渐密
 *       （spawnMeteors）；100% 落「三千年前的那首歌，你也唱完了」+
 *       spawnMeteors(8) + 卷轴化作纪念章（CSS 收拢为朱砂圆章「歌成」）；
 *     - 卷轴脚行常驻「你已唤醒 X 颗」与不显眼的「归隐」小字链接（清空存档重来）。
 *
 *   段3 自由探索  p∈[0.80, 1]
 *     - 沉睡星官保持压暗、已唤醒常亮（不再全体补亮）；收集卷延续，点击/凝视
 *       可继续唤醒；「现在，把星空交给你」面板 + atlas-hint，标签与悬停提示恢复。
 *
 * 状态机与滚动进度 p 的关系（幂等、双向回滚正确）：
 *   - update(p) 只做段归属判断（ch2SegmentOf）与段1 连续量；唤醒推进全部走事件
 *     （onPick / 凝视累积 / 归隐）；
 *   - 段切换（onSegEnter）负责一次性现场重建：段2/段3 进场一律 dimAllSleeping
 *     （全压暗 + 按存档重亮，幂等），段2 另同步星使引路（syncGuidance）；
 *   - enter() 以最近一次 p 调 applyProgress 重放现场，exit() 全清理（星使隐藏
 *     并摘下、准星/飘字/计时器/tween 清理、音效挂起、bloom 归基线，已唤醒组
 *     按存档重亮幂等）并置 seg=-1 强制重进时重建。
 *
 * 星使契约（firefly.ts，星使代理并行实现；签名以此为准）：
 *   createFirefly() → { group, flyTo(p:{x,y,z}), pulse(v:0..1), setVisible(b),
 *                       update(dt), dispose() }
 *   group 经 ctx.sky.addSkyObject 挂载（exit 时 removeSkyObject），update(dt)
 *   在章节 rAF tick 里调用。本文件的契约调用点：ensureFirefly（创建+挂载）、
 *   syncGuidance（flyTo/setVisible(true)）、guideDoneSequence（pulse(1)+淡出
 *   setVisible(false)）、awaken（pulse(1)）、tick（update + 待机呼吸 pulse）、
 *   exit（setVisible(false)+removeSkyObject）。章节无销毁钩子，dispose 由
 *   实例随章节常驻而不调用（enter/exit 只摘挂，不重建）。
 *
 * 相机：段1 用 frame(dt) 钩子做脚本注视巡游（当前句星官方向，权重阻尼到
 *   0.85、朝向 slerp 平滑切换，离开段1 自动归零释放）。段2/段3 相机完全归用户。
 * 段2 关闭星官名标签（沉睡夜空求纯净），悬停星名提示保留作辨识；段3 恢复。
 *
 * 星官质心：运行时由 asterisms.json 成员 HIP 查 stars.json 的 ra/dec，单位矢量
 *   平均（避免赤经环绕，ch2Centroid）再转回球坐标；金环尺寸由成员相对质心的
 *   最大角距推算。引路三站的硬编码质心仅作段1 高光/注视用（见 SEG1 表）。
 *
 * 样式：模块内注入 <style>（Labels.ts 同款守卫），类名 ch2- 前缀；
 * 面板描金双细线对齐 app.css 的 .chapter-panel；朱砂取自 .seal 渐变
 * （#b1402f → #8e2f22）。
 */
import * as THREE from "three";
import { gsap } from "gsap";
import type { Chapter, ChapterCtx } from "../chapters";
import { gazeQuat } from "../CameraRig";
import { radecToVec3 } from "../../sky3d/coords";
import { worldToScreen } from "../../sky3d/hitTest";
import { dataUrl } from "../../sky3d/dataUrl";
import type { PickPayload } from "../SkyApp";
import { createFirefly } from "./firefly";

// ---------------------------------------------------------------- 纯逻辑（导出供单测）

/** 段边界：段1 [0, SEG1_END) · 段2 [SEG1_END, SEG2_END) · 段3 [SEG2_END, 1] */
export const CH2_SEG1_END = 0.35;
export const CH2_SEG2_END = 0.8;

/** 段1 内部节奏：标题/旁白 [0, 0.05) · 五句点亮 [0.05, 0.30) · 齐亮点题 [0.30, 0.35) */
const SEG1_INTRO_END = 0.05;
const SEG1_LINES_END = 0.3;
/** 五句行数（与 SEG1_LINES 一致，单测守护） */
export const CH2_SEG1_LINE_COUNT = 5;

/** 沉睡压暗值（段2/段3 未唤醒星官的生长进度） */
export const CH2_SLEEP_DIM = 0.08;
/** 引路三站（固定顺序）：北斗 → 北极 → 天狼 */
export const CH2_GUIDE_STATIONS: readonly string[] = ["北斗", "北极", "天狼"];
/** 凝视唤醒：目标角距阈值（度）与持续时长（秒） */
export const CH2_GAZE_ANGLE_DEG = 4;
export const CH2_GAZE_HOLD_S = 0.8;
/** 自由收集闲置脉动：无交互多少秒后最近沉睡星官金环一闪 */
export const CH2_IDLE_PULSE_S = 20;
/** localStorage 唤醒集合键（JSON 字符串数组：星官名） */
export const CH2_STORAGE_KEY = "ch2-awakened";

const SEG_POEM = 0;
const SEG_JOURNEY = 1;
const SEG_EXPLORE = 2;

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}

/** 段归属：0=诗亮星空 1=唤星之旅 2=自由探索（越界输入自动钳制） */
export function ch2SegmentOf(p: number): 0 | 1 | 2 {
  if (p < CH2_SEG1_END) return SEG_POEM;
  if (p < CH2_SEG2_END) return SEG_JOURNEY;
  return SEG_EXPLORE;
}

/** 当前引路目标：首座尚未唤醒的引路站；三站俱醒 → null（进入自由收集） */
export function ch2GuideTarget(awakened: ReadonlySet<string>): string | null {
  for (const s of CH2_GUIDE_STATIONS) if (!awakened.has(s)) return s;
  return null;
}

/**
 * 唤醒判定：已唤醒不重复；引路中（guideTarget 非空）只认当前站，
 * 自由收集（guideTarget 为 null）认一切沉睡星官。
 */
export function ch2CanAwaken(
  name: string,
  guideTarget: string | null,
  awakened: ReadonlySet<string>,
): boolean {
  if (!name || awakened.has(name)) return false;
  return guideTarget === null || name === guideTarget;
}

/** 七分区键（三垣拆紫微/太微/天市，四象各一） */
export type Ch2Region =
  | "ziwei"
  | "taiwei"
  | "tianshi"
  | "qinglong"
  | "xuanwu"
  | "baihu"
  | "zhuque";

/** 收集卷七分区（展示名与顺序） */
export const CH2_REGIONS: readonly { key: Ch2Region; name: string }[] = [
  { key: "ziwei", name: "紫微" },
  { key: "taiwei", name: "太微" },
  { key: "tianshi", name: "天市" },
  { key: "qinglong", name: "青龙" },
  { key: "xuanwu", name: "玄武" },
  { key: "baihu", name: "白虎" },
  { key: "zhuque", name: "朱雀" },
];

/**
 * 分区归属：由 poem.json 的 from 字段导出——
 *   「三垣 · 紫微宫/太微宫/天市宫」→ 紫微/太微/天市；
 *   「东方苍龙 · X」→ 青龙，「北方玄武 · X」→ 玄武，
 *   「西方白虎 · X」→ 白虎，「南方朱雀 · X」→ 朱雀。
 * 无法归属返回 null（不计入收集卷）。
 */
export function ch2RegionOf(from: string): Ch2Region | null {
  if (from.includes("紫微")) return "ziwei";
  if (from.includes("太微")) return "taiwei";
  if (from.includes("天市")) return "tianshi";
  if (from.includes("苍龙") || from.includes("青龙")) return "qinglong";
  if (from.includes("玄武")) return "xuanwu";
  if (from.includes("白虎")) return "baihu";
  if (from.includes("朱雀")) return "zhuque";
  return null;
}

/** 解锁档位阈值：唤醒比例达 25%/50%/75%/100% 各升一档（返回 0~4） */
export const CH2_UNLOCKS: readonly number[] = [0.25, 0.5, 0.75, 1];

/** 唤醒比例 → 解锁档位（0=起步，1=25%，2=50%，3=75%，4=100% 歌成） */
export function ch2UnlockTier(awakenedCount: number, total: number): number {
  if (total <= 0 || awakenedCount <= 0) return 0;
  const f = awakenedCount / total;
  let t = 0;
  for (const u of CH2_UNLOCKS) if (f + 1e-9 >= u) t += 1;
  return t;
}

/**
 * 星官质心（赤经/赤纬，度）：成员方向单位矢量平均（避免赤经环绕问题）
 * 再转回球坐标；空表或矢量对抵消（和近零）返回 null。
 */
export function ch2Centroid(
  members: readonly { ra: number; dec: number }[],
): { ra: number; dec: number } | null {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const m of members) {
    const [vx, vy, vz] = radecToVec3(m.ra, m.dec);
    x += vx;
    y += vy;
    z += vz;
  }
  const len = Math.hypot(x, y, z);
  if (len < 1e-6) return null;
  return {
    ra: (Math.atan2(z, x) * 180) / Math.PI, // 与 radecToVec3 约定互逆
    dec: (Math.asin(y / len) * 180) / Math.PI,
  };
}

/** 两方向（赤经/赤纬，度）的角距（度） */
export function ch2AngularDistanceDeg(
  a: { ra: number; dec: number },
  b: { ra: number; dec: number },
): number {
  const [ax, ay, az] = radecToVec3(a.ra, a.dec);
  const [bx, by, bz] = radecToVec3(b.ra, b.dec);
  const d = Math.min(1, Math.max(-1, ax * bx + ay * by + az * bz));
  return (Math.acos(d) * 180) / Math.PI;
}

/**
 * 最近沉睡星官：以视线方向（赤经/赤纬，度）为锚，取未唤醒候选中角距最小者；
 * 全醒或无候选返回 null。
 */
export function ch2NearestSleeping(
  candidates: readonly { name: string; ra: number; dec: number }[],
  awakened: ReadonlySet<string>,
  view: { ra: number; dec: number },
): string | null {
  let best: string | null = null;
  let bestDeg = Infinity;
  for (const c of candidates) {
    if (awakened.has(c.name)) continue;
    const d = ch2AngularDistanceDeg(c, view);
    if (d < bestDeg) {
      bestDeg = d;
      best = c.name;
    }
  }
  return best;
}

/**
 * 拨弦泛音音高随最亮星等：越亮越高。A3（220Hz）起，每亮一等升 4 个半音，
 * 封顶 28 半音（天狼 mag≈-1.44 时约 D6）；暗于 5.5 等一律 A3。
 */
export function ch2PluckFreq(mag: number): number {
  const semis = Math.min(Math.max((5.5 - mag) * 4, 0), 28);
  return 220 * Math.pow(2, semis / 12);
}

/** 诗句摘句：取 poem.json 原文（繁体）前 n 个分句（以「，」分隔），供竖排飘字 */
export function ch2PoemExcerpt(text: string, clauses = 2): string {
  return text
    .split("，")
    .slice(0, Math.max(1, clauses))
    .join("，");
}

/** localStorage 唤醒集合解析（坏 JSON / 非数组 / 非字符串项一律容错为空） */
export function ch2ParseAwakened(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === "string" && x.length > 0);
  } catch {
    return [];
  }
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

/** bloom 调优基线（与 SkyApp.BLOOM.strength 终值一致；唤醒脉冲由此值升起并缓回） */
const BLOOM_BASE = 0.78;
/** 唤醒 bloom 脉冲峰值 */
const BLOOM_PEAK = 1.6;
/** 银河逐档增亮：每档 bloom 基线提升（无 MilkyWay 对外接口，以 bloom 近似） */
const BLOOM_TIER_STEP = 0.12;
/** 偶发流星间隔（ms）：按档位 25%/50%/75%/100% 渐密 */
const METEOR_INTERVAL_MS: readonly number[] = [30_000, 20_000, 12_000, 10_000];
/** 引路完毕「星路已明，自去吧」后星使淡出延迟（ms） */
const GUIDE_FADE_DELAY_MS = 1400;

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

/** 段1 各句的高光金环（与 SEG1_LINES 同序；ra/dec 度 + 环尺寸，推算方式见文件头） */
const SEG1_RINGS: readonly { ra: number; dec: number; ring: number }[] = [
  { ra: 186.0, dec: 56.5, ring: 26 }, // 北斗
  { ra: 218.6, dec: 76.8, ring: 10 }, // 北极
  { ra: 247.2, dec: -26.8, ring: 8 }, // 心宿
  { ra: 297.7, dec: 8.6, ring: 8 }, // 河鼓（河鼓·织女句取河鼓——牵牛星最亮最醒目）
  { ra: 101.3, dec: -16.7, ring: 6 }, // 天狼
];

/** 段1 各句的脚本注视目标（与 SEG1_LINES 同序） */
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

/** 引路站序号展示（第一站 / 第二站 / 第三站） */
const CN_NUMERALS = ["一", "二", "三"];

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

/* ---- 段2：引路题字（底部中央小字，不拦截点击） ---- */
.ch2-caption {
  position: absolute; left: 50%; bottom: 5vh;
  transform: translate(-50%, 8px);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; letter-spacing: 0.3em; text-indent: 0.3em;
  color: #fce1b6; text-shadow: 0 0 12px rgba(201, 162, 39, 0.4), 0 2px 8px rgba(13, 13, 17, 0.9);
  opacity: 0; transition: opacity 0.7s ease, transform 0.7s ease;
  pointer-events: none; white-space: nowrap;
}
.ch2-caption.on { opacity: 0.92; transform: translate(-50%, 0); }

/* ---- 段2/段3：屏幕中心准星（凝视唤醒；圆环进度由 JS 内联驱动） ---- */
.ch2-cross {
  position: absolute; left: 50%; top: 50%;
  width: 30px; height: 30px; margin: -15px 0 0 -15px;
  opacity: 0; transition: opacity 0.5s ease;
  pointer-events: none;
}
.ch2-cross.on { opacity: 0.5; }
.ch2-cross i {
  position: absolute; inset: 0;
  border: 1px solid rgba(252, 225, 182, 0.85); border-radius: 50%;
  box-shadow: 0 0 8px rgba(201, 162, 39, 0.25);
}
.ch2-cross b {
  position: absolute; left: 50%; top: 50%;
  width: 3px; height: 3px; margin: -1.5px 0 0 -1.5px;
  background: #fce1b6; border-radius: 50%;
}

/* ---- 段2：唤醒诗句飘字（描金竖排，随光上浮溶散） ---- */
.ch2-floats { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ch2-poemfloat {
  position: absolute; left: 50%; top: 42%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 12px;
  animation: ch2PoemFloat 2.4s ease-out forwards;
}
.ch2-poemfloat-text {
  writing-mode: vertical-rl;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(16px, 2.6vh, 24px);
  letter-spacing: 0.28em;
  color: #fce1b6;
  text-shadow:
    0 0 16px rgba(201, 162, 39, 0.6),
    0 0 3px rgba(201, 162, 39, 0.9),
    0 2px 8px rgba(13, 13, 17, 0.9);
}
.ch2-poemfloat-from {
  writing-mode: vertical-rl;
  margin-top: 6px;
  font-size: 11px; letter-spacing: 0.3em;
  color: #c9a227;
  text-shadow: 0 1px 6px rgba(13, 13, 17, 0.9);
}
@keyframes ch2PoemFloat {
  0% { opacity: 0; transform: translate(-50%, -36%); }
  16% { opacity: 1; }
  62% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -130%); }
}

/* ---- 段2：引路完毕与歌成结语（居中小字/大字，各一闪而过） ---- */
.ch2-guidedone, .ch2-complete {
  position: absolute; left: 50%; top: 42%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display, "Songti SC", serif);
  color: #fce1b6; pointer-events: none; opacity: 0;
  white-space: nowrap;
}
.ch2-guidedone {
  font-size: clamp(16px, 2.4vh, 20px);
  letter-spacing: 0.42em; text-indent: 0.42em;
  text-shadow: 0 0 14px rgba(201, 162, 39, 0.45);
}
.ch2-guidedone.on { animation: ch2LineLinger 3s ease forwards; }
.ch2-complete {
  top: 36%;
  font-size: clamp(24px, 4.6vh, 40px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  text-shadow: 0 0 26px rgba(201, 162, 39, 0.7), 0 0 60px rgba(201, 162, 39, 0.35);
}
.ch2-complete.on { animation: ch2LineLinger 6s ease forwards; }
@keyframes ch2LineLinger {
  0% { opacity: 0; transform: translate(-50%, calc(-50% + 10px)); }
  14% { opacity: 1; transform: translate(-50%, -50%); }
  72% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, calc(-50% - 12px)); }
}

/* ---- 段2/段3：收集卷（左下极简，描金细线；done 时收拢为纪念章） ---- */
.ch2-scroll {
  position: absolute; left: 3.2vw; bottom: 5vh;
  width: 208px;
  padding: 14px 16px 12px;
  background: rgba(13, 13, 17, 0.6);
  border: 1px solid rgba(175, 145, 95, 0.26);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.ch2-scroll.on { opacity: 1; transform: translateY(0); }
.ch2-scroll-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
}
.ch2-scroll-head span { font-size: 11px; letter-spacing: 0.4em; color: #af915f; }
.ch2-scroll-total {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; font-weight: 400; color: #fce1b6;
}
.ch2-scroll-body { transition: opacity 0.5s ease, max-height 0.6s ease; max-height: 220px; overflow: hidden; }
.ch2-region {
  display: flex; align-items: center; gap: 8px;
  padding: 2.5px 0;
  font-size: 11.5px; color: rgba(252, 225, 182, 0.85);
}
.ch2-region span { flex: none; width: 2.4em; letter-spacing: 0.1em; }
.ch2-region-bar {
  flex: 1; height: 2px; border-radius: 1px;
  background: rgba(252, 225, 182, 0.12);
  overflow: hidden;
}
.ch2-region-bar b {
  display: block; height: 100%; width: 0%;
  background: linear-gradient(90deg, #c9a227, #e8c85a);
  transition: width 0.8s ease;
}
.ch2-region em { flex: none; font-style: normal; font-size: 10.5px; color: #af915f; min-width: 3.6em; text-align: right; }
.ch2-scroll-foot {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-top: 8px; padding-top: 7px;
  border-top: 1px solid rgba(175, 145, 95, 0.18);
  font-size: 10.5px; color: rgba(252, 225, 182, 0.6); letter-spacing: 0.08em;
}
.ch2-retreat {
  pointer-events: auto;
  background: none; border: none; padding: 0;
  font-size: 10.5px; letter-spacing: 0.2em; color: rgba(175, 145, 95, 0.65);
  border-bottom: 1px solid rgba(175, 145, 95, 0.3);
  cursor: pointer;
}
.ch2-retreat:hover { color: #c9a227; border-bottom-color: rgba(201, 162, 39, 0.6); }
/* 歌成纪念章：卷轴收拢，朱砂圆章显现 */
.ch2-badge {
  display: none;
  width: 64px; height: 64px; margin: 6px auto 2px;
  border-radius: 50%;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 18px rgba(142, 47, 34, 0.5), inset 0 0 0 2px rgba(252, 225, 182, 0.35);
  align-items: center; justify-content: center;
}
.ch2-badge i {
  font-family: var(--font-display, "Songti SC", serif);
  font-style: normal; font-size: 19px; letter-spacing: 0.12em; text-indent: 0.12em;
  color: #fce1b6; writing-mode: vertical-rl;
}
.ch2-scroll.done { width: 148px; text-align: center; }
.ch2-scroll.done .ch2-scroll-body,
.ch2-scroll.done .ch2-scroll-foot { display: none; }
.ch2-scroll.done .ch2-badge { display: flex; animation: ch2BadgeIn 0.5s cubic-bezier(0.2, 1.4, 0.4, 1) both; }
@keyframes ch2BadgeIn {
  0% { opacity: 0; transform: scale(1.8); }
  100% { opacity: 1; transform: scale(1); }
}

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
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
 * 唤醒泛音音高随目标星官最亮星等（ch2PluckFreq），一拨即收，不铺底。
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

// ---------------------------------------------------------------- 章节工厂

/** 星使契约句柄（firefly.ts，星使代理并行实现；签名以本注释与导入为准） */
type FireflyHandle = ReturnType<typeof createFirefly>;

/** 星官图录条目：质心/世界坐标/金环尺寸/最亮星等/分区（运行时由数据推算） */
interface AtlasEntry {
  name: string;
  region: Ch2Region | null;
  ra: number;
  dec: number;
  x: number;
  y: number;
  z: number;
  /** 金环基础尺寸（世界单位，由成员最大角距推算） */
  ring: number;
  /** 最亮成员星视星等（拨弦泛音音高依据） */
  mag: number | null;
}

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

  // ---- 段2：引路题字 / 中心准星 / 诗句飘字层 / 引路完毕与歌成结语 ----
  const captionEl = el("div", "ch2-caption");
  const crossEl = el("div", "ch2-cross");
  const crossRing = document.createElement("i");
  crossEl.appendChild(crossRing);
  crossEl.appendChild(document.createElement("b"));
  const floatLayer = el("div", "ch2-floats");
  const guideDoneEl = el("div", "ch2-guidedone");
  guideDoneEl.textContent = "星路已明，自去吧";
  const completeEl = el("div", "ch2-complete");
  completeEl.textContent = "三千年前的那首歌，你也唱完了";

  // ---- 段2/段3：收集卷（七分区 + 总数 + 归隐；歌成收拢为朱砂纪念章） ----
  const scrollEl = el("div", "ch2-scroll");
  scrollEl.innerHTML = `
    <div class="ch2-scroll-head"><span>唤星</span><b class="ch2-scroll-total">0 / 309</b></div>
    <div class="ch2-scroll-body"></div>
    <div class="ch2-scroll-foot">
      <span class="ch2-scroll-count">你已唤醒 0 颗</span>
      <button type="button" class="ch2-retreat">归隐</button>
    </div>
    <div class="ch2-badge"><i>歌成</i></div>
  `;
  const scrollBody = scrollEl.querySelector<HTMLElement>(".ch2-scroll-body")!;
  const scrollTotal = scrollEl.querySelector<HTMLElement>(".ch2-scroll-total")!;
  const scrollCount = scrollEl.querySelector<HTMLElement>(".ch2-scroll-count")!;
  const retreatBtn = scrollEl.querySelector<HTMLButtonElement>(".ch2-retreat")!;
  const regionRows = new Map<
    Ch2Region,
    { bar: HTMLElement; num: HTMLElement }
  >();
  for (const r of CH2_REGIONS) {
    const row = document.createElement("div");
    row.className = "ch2-region";
    row.innerHTML = `<span>${r.name}</span><i class="ch2-region-bar"><b></b></i><em>0/0</em>`;
    scrollBody.appendChild(row);
    regionRows.set(r.key, {
      bar: row.querySelector<HTMLElement>(".ch2-region-bar b")!,
      num: row.querySelector<HTMLElement>("em")!,
    });
  }

  // ---- 段3：探索面板（body[2]）+ 提示 ----
  const explorePanel = el("div", "ch2-card ch2-explore");
  explorePanel.innerHTML = `
    <h2>现在，把星空交给你</h2>
    <p>${escapeHtml(copy.body[2] ?? "")}</p>
  `;
  const hint = el("div", "atlas-hint");
  hint.textContent = "拖拽环视 · 点击或凝视沉睡的星";

  // ---- 运行时数据：poem.json（引文/分区）+ stars.json/asterisms.json（质心/星等图录） ----
  interface PoemEntry {
    text: string;
    from: string;
  }
  interface StarsJson {
    stars: { hip: number; ra: number; dec: number; mag: number }[];
  }
  interface AsterismsJson {
    asterisms: { name: string; stars: number[] }[];
  }
  let poem: Record<string, PoemEntry> | null = null;
  let atlas: AtlasEntry[] = [];
  const atlasByName = new Map<string, AtlasEntry>();

  Promise.all([
    fetch(dataUrl("data/poem.json")).then((r) =>
      r.ok ? (r.json() as Promise<Record<string, PoemEntry>>) : null,
    ),
    fetch(dataUrl("data/stars.json")).then((r) => (r.ok ? (r.json() as Promise<StarsJson>) : null)),
    fetch(dataUrl("data/asterisms.json")).then((r) =>
      r.ok ? (r.json() as Promise<AsterismsJson>) : null,
    ),
  ])
    .then(([pj, sj, aj]) => {
      poem = pj;
      if (!sj || !aj) return; // 图录缺失：收集/引路退化（唤醒仍可用拾取名判定，质心特效缺席）
      const byHip = new Map(sj.stars.map((s) => [s.hip, s] as const));
      const entries: AtlasEntry[] = [];
      for (const a of aj.asterisms) {
        const members = a.stars
          .map((h) => byHip.get(h))
          .filter((s): s is StarsJson["stars"][number] => s !== undefined);
        const c = ch2Centroid(members);
        if (!c) continue;
        const [x, y, z] = radecToVec3(c.ra, c.dec, SKY_R);
        let extent = 3; // 成员相对质心的最大角距（度），决定金环尺寸
        let mag: number | null = null;
        for (const m of members) {
          extent = Math.max(extent, ch2AngularDistanceDeg(c, m));
          if (mag === null || m.mag < mag) mag = m.mag;
        }
        const ring = Math.max(6, SKY_R * Math.tan((extent * Math.PI) / 180) * 1.35);
        entries.push({
          name: a.name,
          region: pj?.[a.name] ? ch2RegionOf(pj[a.name]!.from) : null,
          ra: c.ra,
          dec: c.dec,
          x,
          y,
          z,
          ring,
          mag,
        });
      }
      atlas = entries;
      atlasByName.clear();
      for (const e of entries) atlasByName.set(e.name, e);
      updateScroll();
      if (seg === SEG_JOURNEY) syncGuidance(); // 数据晚到：补上引路
    })
    .catch(() => {
      /* 数据缺失不阻塞章节（引路/收集退化，段1 不受影响） */
    });

  // ---------------------------------------------------------------- 状态

  let seg = -1; // 当前段（-1 = 未定位，下次 applyProgress 必触发 onSegEnter）
  let lastP = 0;

  /** 已唤醒星官集合（localStorage「ch2-awakened」持久化，enter 时重亮） */
  const awakened = new Set<string>(loadAwakened());
  let guideDone = awakened.size > 0 && ch2GuideTarget(awakened) === null; // 引路三站俱醒
  let tier = 0; // 当前解锁档位（0~4，ch2UnlockTier）

  // 凝视唤醒现场
  let gazeHoldT = 0; // 当前目标已连续凝视秒数
  let gazeName: string | null = null; // 正在凝视的星官（目标变更时清零重计）

  // 自由收集闲置现场（相机四元数快照 + 闲置秒数）
  let idleS = 0;
  const lastCamQ = new THREE.Quaternion();
  let camQInit = false;
  let nextMeteorAt = 0; // 下一颗偶发流星时刻（performance.now() 刻度，0=未排程）

  // 星使（契约：createFirefly，见文件头）；实例随章节常驻，enter/exit 只摘挂
  let firefly: FireflyHandle | null = null;
  let fireflyMounted = false;

  let growthTweens: gsap.core.Tween[] = [];
  let bloomTween: gsap.core.Tween | null = null;
  let slowTween: gsap.core.Tween | null = null;
  let flashTween: gsap.core.Tween | null = null; // 闲置金环一闪
  let guideHideTimer: ReturnType<typeof setTimeout> | null = null;
  let unsubPick: (() => void) | null = null;
  let rafId = 0;
  let lastTickMs = 0;
  const floats = new Set<HTMLElement>();

  // 段1 脚本注视（frame 钩子驱动；applyCameraState 后调用不被覆写）
  let gazeW = 0;
  let gazeActive = false;
  const gazeCur = new THREE.Quaternion();

  // 金环（段1 高光 / 闲置脉动共用同一枚 Sprite）
  let ring: THREE.Sprite | null = null;
  let ringKey = "";
  let ringBase = 8;
  let ringFlash = false; // 闲置一闪播放中（tick 的呼吸脉动让位）
  let ringTex: THREE.CanvasTexture | null = null;

  // DOM 显隐缓存（update 高频路径只在变化时碰 classList）
  let titleOn = false;
  let finaleOn = false;
  let exploreOn = false;
  let hintOn = false;
  let captionOn = false;
  let crossOn = false;
  let scrollOn = false;
  let activeLine = -2;
  let finaleWritten = false; // 段1 收尾已写过全体组（回滚离开时补一次归零）

  // ---------------------------------------------------------------- 小组件

  function loadAwakened(): string[] {
    try {
      return ch2ParseAwakened(window.localStorage.getItem(CH2_STORAGE_KEY));
    } catch {
      return []; // 隐私模式等：无存档功能，不阻塞旅程
    }
  }
  function persistAwakened(): void {
    try {
      window.localStorage.setItem(CH2_STORAGE_KEY, JSON.stringify([...awakened]));
    } catch {
      /* 同上 */
    }
  }

  function totalGroups(): number {
    return atlas.length > 0 ? atlas.length : ctx.sky.groupCount;
  }

  function lightAllGroups(v: number): void {
    const n = ctx.sky.groupCount;
    for (let i = 0; i < n; i++) ctx.sky.setGroupProgress(i, v);
  }

  /** 沉睡夜空：全体压暗（仅星点银河可见），已唤醒的按存档重亮（幂等） */
  function dimAllSleeping(): void {
    const n = ctx.sky.groupCount;
    for (let i = 0; i < n; i++) ctx.sky.setGroupProgress(i, CH2_SLEEP_DIM);
    for (const name of awakened) ctx.sky.setGroupProgress(name, 1);
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
  function setCaption(text: string | null): void {
    const on = text !== null;
    if (on) captionEl.textContent = text;
    if (captionOn === on && !on) return;
    captionOn = on;
    captionEl.classList.toggle("on", on);
  }
  function setCrossOn(on: boolean): void {
    if (crossOn === on) return;
    crossOn = on;
    crossEl.classList.toggle("on", on);
    if (!on) setCrossProgress(0);
  }
  /** 准星凝视进度 [0,1]：圆环由素白渐染为金、微放大（内联驱动，不占计时器） */
  function setCrossProgress(p: number): void {
    const v = clamp01(p);
    crossRing.style.borderColor =
      v > 0 ? `rgba(201, 162, 39, ${0.55 + 0.45 * v})` : "";
    crossRing.style.transform = v > 0 ? `scale(${1 + 0.3 * v})` : "";
    crossRing.style.boxShadow = v > 0 ? `0 0 ${8 + 10 * v}px rgba(201, 162, 39, ${0.3 + 0.5 * v})` : "";
  }
  function setScrollOn(on: boolean): void {
    if (scrollOn === on) return;
    scrollOn = on;
    scrollEl.classList.toggle("on", on);
  }
  /** CSS 动画重触发（reflow 技巧，不占计时器） */
  function restartAnim(node: HTMLElement, cls: string): void {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
  }

  // ---- 收集卷 ----
  function updateScroll(): void {
    const done: Record<Ch2Region, number> = {
      ziwei: 0,
      taiwei: 0,
      tianshi: 0,
      qinglong: 0,
      xuanwu: 0,
      baihu: 0,
      zhuque: 0,
    };
    const total: Record<Ch2Region, number> = { ...done };
    for (const e of atlas) {
      if (!e.region) continue;
      total[e.region] += 1;
      if (awakened.has(e.name)) done[e.region] += 1;
    }
    for (const r of CH2_REGIONS) {
      const row = regionRows.get(r.key);
      if (!row) continue;
      const t = total[r.key];
      const d = done[r.key];
      row.bar.style.width = t > 0 ? `${((d / t) * 100).toFixed(1)}%` : "0%";
      row.num.textContent = `${d}/${t}`;
    }
    const tg = totalGroups();
    scrollTotal.textContent = tg > 0 ? `${awakened.size} / ${tg}` : `${awakened.size} / —`;
    scrollCount.textContent = `你已唤醒 ${awakened.size} 颗`;
  }

  // ---- 金环（段1 高光 / 闲置一闪共用） ----
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
  function ensureRingAt(x: number, y: number, z: number, size: number): void {
    const key = `${x.toFixed(1)},${y.toFixed(1)},${z.toFixed(1)},${size.toFixed(1)}`;
    if (ring && ringKey === key) return;
    removeRing();
    const mat = new THREE.SpriteMaterial({
      map: getRingTexture(),
      transparent: true,
      depthTest: false, // 始终浮在星点之上（同 SkyApp 悬停环约定）
      depthWrite: false,
      opacity: 0.9,
    });
    const spr = new THREE.Sprite(mat);
    spr.position.set(x, y, z);
    spr.scale.set(size, size, 1);
    spr.renderOrder = 998; // 悬停环（999）之下
    ctx.sky.addSkyObject(spr); // rotateWithSky 默认 true；ch2 不开天球旋转，与拾取坐标一致
    ring = spr;
    ringKey = key;
    ringBase = size;
  }
  function removeRing(): void {
    if (!ring) return;
    ctx.sky.removeSkyObject(ring);
    ring.material.dispose();
    ring = null;
    ringKey = "";
  }

  // ---- 计时器与 tween 清理 ----
  function clearGuideHideTimer(): void {
    if (guideHideTimer !== null) {
      clearTimeout(guideHideTimer);
      guideHideTimer = null;
    }
  }
  function killGrowth(): void {
    for (const t of growthTweens) t.kill();
    growthTweens = [];
  }

  // ---- 动效 ----
  /** 连线生长点亮（唤醒核心视觉；多组并发各持一条 tween，exit 统一清理） */
  function growGroup(name: string, duration: number): void {
    const proxy = { v: 0 };
    const tw = gsap.to(proxy, {
      v: 1,
      duration,
      ease: "power1.out",
      onUpdate: () => ctx.sky.setGroupProgress(name, proxy.v),
      onComplete: () => {
        growthTweens = growthTweens.filter((t) => t !== tw);
      },
    });
    growthTweens.push(tw);
  }
  /** 银河逐档增亮基线：无 MilkyWay 对外接口，以 bloom 基线逐档 +0.12 近似 */
  function bloomBase(): number {
    return BLOOM_BASE + BLOOM_TIER_STEP * Math.min(tier, 3);
  }
  /** bloom 统一出口：档位提升/脉冲共用一条 tween，互相接管不打架 */
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
  /** 唤醒 bloom 短脉冲：峰值 1.6 后 0.8s 缓回当前档位基线 */
  function pulseBloom(): void {
    bloomTween?.kill();
    bloom.v = BLOOM_PEAK;
    ctx.sky.setBloom({ strength: bloom.v });
    bloomTo(bloomBase(), 0.8);
  }
  /** 唤醒慢镜：setTimeScale(0.5) 定格 0.4s，随后 0.6s 缓回 1（gsap 单 tween 接管） */
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
  /** 时间缩放复位（exit 调用） */
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
  /** 诗句飘字：描金竖排在星官旁浮现，随光上浮溶散（DOM+CSS，animationend 自清） */
  function spawnPoemFloat(e: AtlasEntry): void {
    const entry = poem?.[e.name];
    const d = document.createElement("div");
    d.className = "ch2-poemfloat";
    const text = entry ? ch2PoemExcerpt(entry.text, 2) : e.name;
    const from = entry ? `《步天歌》 · ${entry.from}` : "";
    d.innerHTML = `<span class="ch2-poemfloat-text">${escapeHtml(text)}</span>${
      from ? `<span class="ch2-poemfloat-from">${escapeHtml(from)}</span>` : ""
    }`;
    const s = worldToScreen([e.x, e.y, e.z], ctx.sky.camera, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // 质心在屏外/相机背后时回退画面中偏右（飘字必须在场）
    const px = s ? s.x + 40 : window.innerWidth * 0.62;
    const py = s ? s.y : window.innerHeight * 0.42;
    d.style.left = `${Math.min(Math.max(px, 110), window.innerWidth - 110)}px`;
    d.style.top = `${Math.min(Math.max(py, 140), window.innerHeight - 140)}px`;
    floatLayer.appendChild(d);
    floats.add(d);
    d.addEventListener("animationend", () => {
      floats.delete(d);
      d.remove();
    });
  }
  function clearFloats(): void {
    floats.forEach((s) => s.remove());
    floats.clear();
  }
  /** 闲置脉动：最近沉睡星官金环一闪（淡入淡出一次，克制） */
  function flashRing(name: string): void {
    const e = atlasByName.get(name);
    if (!e || seg === SEG_POEM) return;
    ensureRingAt(e.x, e.y, e.z, e.ring);
    if (!ring) return;
    flashTween?.kill();
    ringFlash = true;
    const proxy = { o: 0 };
    ring.material.opacity = 0;
    flashTween = gsap.to(proxy, {
      o: 0.8,
      duration: 0.9,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      onUpdate: () => {
        if (ring) ring.material.opacity = proxy.o;
      },
      onComplete: () => {
        flashTween = null;
        ringFlash = false;
        removeRing();
      },
    });
  }

  // ---------------------------------------------------------------- 星使（契约调用点）

  /** 懒建星使并挂载（group 经 addSkyObject 挂进 skyRoot，随天球刚体旋转） */
  function ensureFirefly(): void {
    if (!firefly) firefly = createFirefly();
    if (!fireflyMounted) {
      ctx.sky.addSkyObject(firefly.group);
      fireflyMounted = true;
    }
  }

  // ---------------------------------------------------------------- 引路 / 收集状态机（事件驱动）

  /** 当前生效引路目标：仅段2 引路；段3 与自由收集一律 null（任意沉睡星官可唤醒） */
  function currentGuide(): string | null {
    if (seg !== SEG_JOURNEY) return null;
    return ch2GuideTarget(awakened);
  }

  /** 段2 引路现场同步：有目标则星使 flyTo 盘旋等待 + 题字；三站俱醒则收队 */
  function syncGuidance(): void {
    if (seg !== SEG_JOURNEY) return;
    const g = ch2GuideTarget(awakened);
    if (g) {
      const idx = CH2_GUIDE_STATIONS.indexOf(g);
      setCaption(`第${CN_NUMERALS[idx] ?? idx + 1}站 · 「${g}」——跟着星使：点它，或凝视它`);
      const e = atlasByName.get(g);
      if (e) {
        ensureFirefly();
        firefly!.setVisible(true);
        firefly!.flyTo({ x: e.x, y: e.y, z: e.z }); // 契约：星使飞往目标质心盘旋
      }
      // 图录未就绪时星使待命：atlas 加载完成后会回调本函数补齐
      return;
    }
    setCaption(null);
    if (!guideDone) {
      guideDone = true;
      guideDoneSequence();
    }
  }

  /** 第 3 站后：星使脉冲致意后淡出，留下一句「星路已明，自去吧」 */
  function guideDoneSequence(): void {
    restartAnim(guideDoneEl, "on");
    if (firefly) {
      firefly.pulse(1); // 契约：致意满脉冲
      clearGuideHideTimer();
      guideHideTimer = setTimeout(() => {
        guideHideTimer = null;
        firefly?.setVisible(false); // 契约：星使淡出（淡出曲线由星使自理）
      }, GUIDE_FADE_DELAY_MS);
    }
  }

  /**
   * 唤醒演出（点击/凝视共同的唯一出口）：
   * 慢镜 0.5 定格缓回 + 连线生长点亮 + 金雨 90 粒 + bloom 短脉冲 +
   * 《步天歌》摘句描金竖排上浮溶散 + 拨弦泛音（音高随最亮星等）+
   * 写入存档与收集卷、检查解锁档位、推进引路。
   */
  function awaken(name: string): void {
    if (!ch2CanAwaken(name, currentGuide(), awakened)) return;
    const e = atlasByName.get(name);
    awakened.add(name);
    persistAwakened();
    ctx.sky.hideDetailCard(); // 拾取默认详情卡让位于演出
    slowMo();
    growGroup(name, 1.1);
    if (e) {
      ctx.sky.spawnBurst({ x: e.x, y: e.y, z: e.z }, { count: 90 }); // 契约：质心金雨 90 粒
      spawnPoemFloat(e);
      pluck(ch2PluckFreq(e.mag ?? 4.5), 0.9, 0.85);
    }
    pulseBloom();
    if (firefly && seg === SEG_JOURNEY) firefly.pulse(1); // 契约：引路中唤醒，星使满脉冲
    gazeHoldT = 0;
    gazeName = null;
    idleS = 0;
    updateScroll();
    refreshTier();
    syncGuidance();
  }

  /** 解锁档位推进：25%/50%/75% 银河逐档增亮 + 偶发流星渐密；100% 歌成收束 */
  function refreshTier(): void {
    const t = ch2UnlockTier(awakened.size, totalGroups());
    if (t <= tier) return;
    tier = t;
    if (tier >= 4) {
      completeSequence();
      return;
    }
    bloomTo(bloomBase(), 1.5);
    ctx.sky.spawnMeteors(tier); // 1/2/3 颗致意，此后 tick 按档位偶发
  }

  /** 100%：「三千年前的那首歌，你也唱完了」+ 流星 8 颗 + 卷轴收拢为朱砂纪念章 */
  function completeSequence(): void {
    bloomTo(bloomBase(), 1.5);
    ctx.sky.spawnMeteors(8);
    restartAnim(completeEl, "on");
    scrollEl.classList.add("done");
    pluck(523.25, 1.4, 0.8); // C6 泛音收尾
  }

  /** 归隐：清空存档重来（全压暗、引路回第一站、卷轴归零、档位与 bloom 基线复位） */
  function retreat(): void {
    awakened.clear();
    persistAwakened();
    guideDone = false;
    tier = 0;
    clearGuideHideTimer();
    guideDoneEl.classList.remove("on");
    completeEl.classList.remove("on");
    scrollEl.classList.remove("done");
    killGrowth();
    bloomTo(BLOOM_BASE, 0.9);
    dimAllSleeping();
    gazeHoldT = 0;
    gazeName = null;
    idleS = 0;
    nextMeteorAt = 0;
    updateScroll();
    if (seg === SEG_JOURNEY) syncGuidance(); // 星使重返第一站
  }

  retreatBtn.addEventListener("click", retreat);

  // ---------------------------------------------------------------- 拾取

  function onPickPayload(payload: PickPayload | null): void {
    idleS = 0; // 有交互：闲置重计
    if (!payload) return; // 点空不干预
    if (seg !== SEG_JOURNEY && seg !== SEG_EXPLORE) return;
    const name = payload.info.name;
    if (ch2CanAwaken(name, currentGuide(), awakened)) awaken(name);
    // 其余拾取：SkyApp 默认详情卡行为，不干预
  }

  // ---------------------------------------------------------------- 每帧 tick（星使 update / 凝视 / 闲置 / 偶发流星 / 金环呼吸）

  const tmpDir = new THREE.Vector3();

  /** 当前视线方向（赤经/赤纬，度；ch2 不开天球旋转，世界向即赤道向） */
  function viewDir(): { ra: number; dec: number } {
    ctx.sky.camera.getWorldDirection(tmpDir);
    return {
      ra: (Math.atan2(tmpDir.z, tmpDir.x) * 180) / Math.PI,
      dec: (Math.asin(Math.min(1, Math.max(-1, tmpDir.y))) * 180) / Math.PI,
    };
  }

  function collecting(): boolean {
    return seg === SEG_JOURNEY || seg === SEG_EXPLORE;
  }

  /** 凝视唤醒：准星对准目标角距 <4° 持续 0.8s（引路中只认当前站，自由收集认最近沉睡） */
  function tickGaze(dt: number): void {
    if (!collecting() || atlas.length === 0 || dt <= 0) return;
    const v = viewDir();
    const g = currentGuide();
    const name = g ?? ch2NearestSleeping(atlas, awakened, v);
    const e = name ? atlasByName.get(name) : null;
    if (e && ch2AngularDistanceDeg(v, e) < CH2_GAZE_ANGLE_DEG) {
      if (gazeName !== e.name) {
        gazeName = e.name;
        gazeHoldT = 0;
      }
      gazeHoldT += dt;
      setCrossProgress(gazeHoldT / CH2_GAZE_HOLD_S);
      if (gazeHoldT >= CH2_GAZE_HOLD_S) {
        setCrossProgress(0);
        awaken(e.name);
      }
    } else if (gazeHoldT > 0 || gazeName !== null) {
      gazeHoldT = 0;
      gazeName = null;
      setCrossProgress(0);
    }
  }

  /** 自由收集闲置：无相机运动、无拾取满 20s，最近沉睡星官金环一闪 */
  function tickIdle(dt: number): void {
    if (!collecting() || currentGuide() !== null || atlas.length === 0) {
      idleS = 0;
      return;
    }
    const q = ctx.sky.camera.quaternion;
    if (!camQInit) {
      camQInit = true;
      lastCamQ.copy(q);
      return;
    }
    if (lastCamQ.angleTo(q) > 0.0004) {
      idleS = 0;
      lastCamQ.copy(q);
      return;
    }
    idleS += dt;
    if (idleS >= CH2_IDLE_PULSE_S) {
      idleS = 0;
      const name = ch2NearestSleeping(atlas, awakened, viewDir());
      if (name) flashRing(name);
    }
  }

  /** 偶发流星：按解锁档位渐密（30s/20s/12s/10s 一颗），100% 后延续最密档 */
  function tickMeteors(now: number): void {
    if (!collecting() || tier < 1) return;
    const interval = METEOR_INTERVAL_MS[Math.min(tier, 4) - 1]!;
    if (nextMeteorAt <= 0) {
      nextMeteorAt = now + interval;
      return;
    }
    if (now >= nextMeteorAt) {
      nextMeteorAt = now + interval;
      ctx.sky.spawnMeteors(1);
    }
  }

  function tick(now: number): void {
    rafId = requestAnimationFrame(tick);
    const dt = lastTickMs > 0 ? Math.min((now - lastTickMs) / 1000, 0.1) : 0;
    lastTickMs = now;
    if (firefly && fireflyMounted) {
      firefly.update(dt); // 契约：章节 tick 里驱动星使
      // 引路待机：星使呼吸脉冲（凝视累积时渐亮，满则唤醒）
      if (seg === SEG_JOURNEY && currentGuide() !== null) {
        const base = 0.35 + 0.2 * Math.sin(now * 0.003);
        firefly.pulse(Math.min(1, base + (gazeHoldT / CH2_GAZE_HOLD_S) * 0.5));
      }
    }
    tickGaze(dt);
    tickIdle(dt);
    tickMeteors(now);
    if (ring && !ringFlash) {
      const s = ringBase * (1 + 0.13 * Math.sin(now * 0.0024));
      ring.scale.set(s, s, 1);
      ring.material.opacity = 0.7 + 0.3 * Math.sin(now * 0.0024 + 1);
    }
  }

  // ---------------------------------------------------------------- 段驱动（update 高频路径）

  function onSegEnter(s: number): void {
    if (s === SEG_POEM) {
      ctx.sky.setPickingEnabled(false); // 段1 不开拾取（防误触，段2 才开）
      ctx.sky.setLabelsEnabled(true);
      ctx.sky.setHoverTipEnabled(true);
      lightAllGroups(0); // 无名星空重开（finale 进度由 renderSeg1 接管）
      finaleWritten = false;
      setCaption(null);
      setCrossOn(false);
      setScrollOn(false);
      setExploreOn(false);
      setHintOn(false);
      firefly?.setVisible(false);
      removeRing();
    } else if (s === SEG_JOURNEY) {
      ctx.sky.setPickingEnabled(true);
      ctx.sky.setLabelsEnabled(false); // 沉睡夜空求纯净：隐藏星官名标签（悬停提示保留作辨识）
      ctx.sky.setHoverTipEnabled(true);
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setExploreOn(false);
      setHintOn(false);
      removeRing();
      // 进场：309 星官压暗，仅星点银河可见；存档中已唤醒的重亮
      dimAllSleeping();
      tier = ch2UnlockTier(awakened.size, totalGroups()); // 静默重算档位（效果不重演）
      ctx.sky.setBloom({ strength: bloomBase() });
      scrollEl.classList.toggle("done", tier >= 4);
      guideDone = ch2GuideTarget(awakened) === null; // 三站俱醒：静默收队（结语不重演）
      updateScroll(); // 卷轴脚行即「你已唤醒 X 颗」
      setScrollOn(true);
      setCrossOn(true);
      syncGuidance();
    } else {
      ctx.sky.setPickingEnabled(true);
      ctx.sky.setLabelsEnabled(true); // 探索段恢复标签与悬停提示
      ctx.sky.setHoverTipEnabled(true);
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setCaption(null);
      firefly?.setVisible(false); // 星使只在段2 引路
      removeRing();
      dimAllSleeping(); // 段3 收集延续：沉睡保持压暗、已唤醒常亮（不再全体补亮）
      tier = ch2UnlockTier(awakened.size, totalGroups());
      ctx.sky.setBloom({ strength: bloomBase() });
      scrollEl.classList.toggle("done", tier >= 4);
      updateScroll();
      setScrollOn(true);
      setCrossOn(true);
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
    // 高光金环指向当前句星官（离开诗句区即移除；与闲置脉动共用同一枚环，分段不冲突）
    if (active >= 0) {
      const r = SEG1_RINGS[active];
      if (r) {
        const [x, y, z] = radecToVec3(r.ra, r.dec, SKY_R);
        ensureRingAt(x, y, z, r.ring);
      }
    } else {
      removeRing();
    }
    setFinaleOn(p >= SEG1_LINES_END);
  }

  function applyProgress(p: number): void {
    lastP = p;
    const s = ch2SegmentOf(p);
    if (s !== seg) {
      seg = s;
      onSegEnter(s);
    }
    if (seg === SEG_POEM) renderSeg1(p);
    // 段2/段3 无连续量：星空/收集由事件与 onSegEnter 驱动（幂等）
  }

  // ---------------------------------------------------------------- 每帧注视（frame 钩子：仅段1 巡游）

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

  // ---------------------------------------------------------------- Chapter

  return {
    enter() {
      ctx.root.classList.add("inview");
      // 标签权属归 onSegEnter（段1/段3 开、段2 关求纯净）。此处不得置位——
      // 若 ScrollTrigger 先 onUpdate 后 onEnter（瞬时跳转会发生），置 true 会
      // 盖掉段2 的 false 且 seg 已同步不会重进 onSegEnter。
      unsubPick?.(); // 防御：enter/exit 严格成对，重复 enter 不泄漏监听
      unsubPick = ctx.sky.onPick(onPickPayload);
      if (rafId) cancelAnimationFrame(rafId);
      lastTickMs = 0;
      rafId = requestAnimationFrame(tick);
      applyProgress(lastP); // 双向回滚：按当前 p 与存档重放正确现场
    },
    update(p) {
      applyProgress(p);
    },
    frame(dt) {
      // 本钩子在主循环 applyCameraState 之后调用（见 app.ts），注视不会被 rig
      // 覆写。段2/段3 相机完全归用户，只有段1 诗句巡游写注视。
      frameSeg1Gaze(dt);
    },
    exit() {
      ctx.root.classList.remove("inview");
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastTickMs = 0;
      unsubPick?.();
      unsubPick = null;
      clearGuideHideTimer(); // 星使淡出延迟清掉
      killGrowth(); // 生长 tween 全清，随后已唤醒组按存档重亮（幂等）
      flashTween?.kill();
      flashTween = null;
      ringFlash = false;
      resetTimeScale(); // 慢镜 tween 清掉，时间缩放归 1
      if (bloomTween) {
        bloomTween.kill();
        bloomTween = null;
      }
      ctx.sky.setBloom({ strength: BLOOM_BASE }); // 档位增亮是本章局部效果，离场归基线
      removeRing();
      ringTex?.dispose();
      ringTex = null;
      if (firefly && fireflyMounted) {
        firefly.setVisible(false); // 契约：星使隐藏并摘下（实例常驻，重进再挂）
        ctx.sky.removeSkyObject(firefly.group);
        fireflyMounted = false;
      }
      clearFloats(); // 诗句飘字清场
      guideDoneEl.classList.remove("on");
      completeEl.classList.remove("on");
      gazeHoldT = 0;
      gazeName = null;
      idleS = 0;
      camQInit = false;
      nextMeteorAt = 0;
      gazeW = 0;
      gazeActive = false;
      ctx.sky.setGazeBlend(0); // 幂等释放脚本注视
      ctx.sky.setLabelsEnabled(true); // 恢复标签与悬停提示（段2 曾关闭求纯净）
      ctx.sky.setHoverTipEnabled(true);
      ctx.sky.setPickingEnabled(false); // 自带详情卡收起
      for (const name of awakened) ctx.sky.setGroupProgress(name, 1); // 已唤醒组按存档重亮（幂等）
      setTitleOn(false);
      setActiveLine(-1);
      setFinaleOn(false);
      setCaption(null);
      setCrossOn(false);
      setScrollOn(false);
      setExploreOn(false);
      setHintOn(false);
      seg = -1; // 强制下次 enter 重建段现场
      void actx?.suspend(); // 音频挂起（下次拨弦时按需 resume）
      // 其余星官组保持现状（沉睡/常亮随存档），不回滚
    },
  };
}
