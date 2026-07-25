/**
 * ch4 天人之间 · 走进紫微垣（五站巡游重构版）。
 *
 * 行程（章内局部进度 p，章长 300vh 不变）：
 *
 *   开场 p∈[0, 0.12)「城外远望」：
 *     - 紫微左垣/紫微右垣两堵宫墙随 p 生长点亮（ch4WallsGrowth）；
 *     - 相机阻尼推向紫微垣（radius 0.35R、fov 50），gaze 权重渐进接管到
 *       0.85 指向垣心（ra175°/dec81°，与 CHAPTER_KEYS[3] 底座同目标，
 *       frame 接管瞬间零跳变）；
 *     - 开场卡：章题 + 站名「天上有座城」+ copy.hook/body 引出句。
 *
 *   五站 p∈[0.12, 0.92)（均分 0.16/站，站点文案见 copy.ts 的 CH4_STOPS）：
 *     每站：星官组在站头 45% 行程内生长点亮（ch4StopGrowth）+ 站名/一句
 *     故事站点卡浮现 + 相机 gaze 转向该站质心、radius 0.55R、fov 42。
 *       1 北极五星·皇族（五个标签逐帧 worldToScreen 投影贴真实五星）
 *       2 勾陈·后宫车马（贴勾陈一＝今夜北辰）
 *       3 天皇大帝·帝座（天皇大帝+五帝内座两组，贴天皇大帝）
 *       4 尚书·大理·天柱·百官（三组，贴尚书/大理/天柱）
 *       5 回望·众星拱北：gaze 转向北天极（dec 89°，避开正极点 lookAt 的
 *         up 退化）、fov 放宽 55，星空绕极连续慢转（frame 里累计
 *         rotAngle += 0.03·dt，setSkyRotation(rotAngle·w(p), 0)），
 *         《论语》点题句浮现。
 *
 *   收尾 p∈[0.92, 1]：gaze 权重缓慢释放回 0，radius/fov/dir 缓动到
 *   CH4_RELEASE（与 CHAPTER_KEYS[4] ch5 关键帧同值——滚出本章相机交还
 *   rig 时无跳变，衔接 ch5 穿出球外的高潮）；绕极转角按 w(p) 缓回 0
 *   （不倒转、不跳变）。
 *
 * 相机机制：逐站声明目标 {dir, radius, fov, gazeQ, gazeW}（CH4_CAM_STOPS，
 * 质心由 asterisms.json 成员单位矢量平均推算后硬编码，推算值见表上注释）。
 * frame(dt) 由 app 主循环在 applyCameraState 之后调用（仅此窗口内
 * setRadius/setPositionDir/setFov/setGazeBlend 不会被 rig 覆写）：radius/fov
 * 指数趋近、dir nlerp 归一、gazeCur 向目标 slerp。接管首帧从活动相机读
 * 现场（radius/fov/dir 实测，gazeCur 取相机当前朝向、权重从 1 起——ch4
 * 底座关键帧 gazeBlend=1），无论从 ch3 进入还是自 ch5 回滚都零跳变。
 *
 * 段归属与滚动进度严格幂等（双向回滚正确）：update(p) 只写 p 的纯函数
 * （组生长、卡片显隐），无一次性现场；frame 的绕极转角是唯一时间累计量，
 * 权重 w(p) 保证回滚离开第五站、进入收尾区与 exit 时有效转角都归 0。
 *
 * 贴星标签：章节创建时 fetch /data/asterisms.json + /data/stars.json，按
 * CH4_STOPS 各站 groups 的成员 HIP 建锚点池，ch4MatchLabels 先按 star
 * 星名匹配、缺名按数据顺序兜底；frame 里每帧把锚点（含绕极转角修正）
 * 经 worldToScreen 投影到屏幕像素，星在屏外/相机背后（返回 null）时隐藏。
 * 标签视觉沿用旧 ch4 的小圆点+短引导线，位置由手摆改为投影。
 *
 * exit：setSkyRotation(0,0)、setGazeBlend(0)（幂等约定）、恢复星官名标签
 * 总开关、隐藏全部卡片与贴星标签；星官组保持点亮（ch5 球外全景背景）。
 *
 * 样式：模块内注入 <style>（Labels.ts 同款守卫），类名 ch4- 前缀；
 * token：墨蓝底、哑光金 #c9a227、暖米金 #fce1b6、var(--font-display)。
 */
import * as THREE from "three";
import type { Chapter, ChapterCtx } from "../chapters";
import { gazeQuat } from "../CameraRig";
import { CH4_STOPS } from "../copy";
import { radecToVec3 } from "../../sky3d/coords";
import { worldToScreen } from "../../sky3d/hitTest";

// ---------------------------------------------------------------- 纯逻辑（导出供单测）

function clamp01(v: number): number {
  return Math.min(Math.max(v, 0), 1);
}
function smooth01(v: number): number {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
}

/** 开场「城外远望」行程上限；五站由此起 */
export const CH4_OPENING_END = 0.12;
/** 五站行程终点；其后为收尾释放区 */
export const CH4_TOUR_END = 0.92;
/** 站数（须与 CH4_STOPS 长度一致，单测守护） */
export const CH4_STOP_COUNT = 5;
/** 每站行程宽度（五站均分） */
export const CH4_STOP_SPAN = (CH4_TOUR_END - CH4_OPENING_END) / CH4_STOP_COUNT; // 0.16
/** 第五站（拱北）起点：绕极旋转的累计区间由此开始 */
export const CH4_ROT_START = CH4_OPENING_END + 4 * CH4_STOP_SPAN; // 0.76
/** 绕极慢转角速度（弧度/秒） */
export const CH4_ROT_SPEED = 0.03;
/** 各站星官组生长占站头行程的比例 */
export const CH4_GROW_FRAC = 0.45;

/** 段归属：0=开场 1..5=五站 6=收尾释放（越界输入自动钳制） */
export function ch4SegmentOf(p: number): number {
  const v = clamp01(p);
  if (v < CH4_OPENING_END) return 0;
  if (v >= CH4_TOUR_END) return 6;
  return 1 + Math.min(Math.floor((v - CH4_OPENING_END) / CH4_STOP_SPAN), CH4_STOP_COUNT - 1);
}

/** 宫墙（紫微左垣/右垣）生长进度：开场内线性拉满 */
export function ch4WallsGrowth(p: number): number {
  return clamp01(p / CH4_OPENING_END);
}

/** 第 i 站（0 起）星官组生长进度：站头 45% 行程内拉满 */
export function ch4StopGrowth(p: number, i: number): number {
  const start = CH4_OPENING_END + i * CH4_STOP_SPAN;
  return clamp01((p - start) / (CH4_STOP_SPAN * CH4_GROW_FRAC));
}

/**
 * 绕极旋转的生效权重：第五站内为 1；进站前 0.02 行程淡入（此间 rotAngle
 * 尚未累计，淡入不可见）；收尾区 [0.92, 0.97] 缓回 0。有效转角 =
 * rotAngle × w(p)——回滚离开第五站、收尾与 exit 均无跳变。
 */
export function ch4RotationWeight(p: number): number {
  const fadeIn = smooth01((p - (CH4_ROT_START - 0.02)) / 0.02);
  const fadeOut = 1 - smooth01((p - CH4_TOUR_END) / 0.05);
  return fadeIn * fadeOut;
}

/** 标签锚点匹配输入的最小形状（stars.json 的成员记录） */
export interface Ch4Member {
  hip: number;
  name: string | null;
}

/**
 * 贴星标签 ↔ 成员星匹配（纯函数）：
 * 按标签顺序，先按 star 星名在成员池里找未占用者；找不到（含星名缺失）
 * 按成员数据顺序取下一个未占用者兜底；成员不足返回 null（该标签不显示）。
 */
export function ch4MatchLabels<T extends Ch4Member>(
  members: readonly T[],
  starNames: readonly (string | undefined)[],
): (T | null)[] {
  const used = new Set<number>();
  let cursor = 0; // 数据顺序兜底游标
  return starNames.map((star) => {
    if (star) {
      const hit = members.find((m) => !used.has(m.hip) && m.name === star);
      if (hit) {
        used.add(hit.hip);
        return hit;
      }
    }
    while (cursor < members.length && used.has(members[cursor]!.hip)) cursor++;
    const fallback = members[cursor];
    if (!fallback) return null;
    used.add(fallback.hip);
    cursor++;
    return fallback;
  });
}

/** 逐站相机参数（质心为赤经/赤纬，度） */
export interface Ch4CamStop {
  ra: number;
  dec: number;
  /** 相机半径（R 倍数；须 < 0.8 避开球内→球外过渡区，单测守护） */
  radius: number;
  fov: number;
  /** 脚本注视权重 */
  gazeW: number;
}

/**
 * 开场+五站相机参数表。质心推算：asterisms.json 各星官成员 HIP 查
 * stars.json 的 ra/dec，做单位矢量平均再转回球坐标（同 ch2 文件头之法）：
 *   紫微垣（35 官 140 星）ra175°/dec81°（= CHAPTER_KEYS[3] 底座，不改）
 *   北极 5星 ra218.6°/dec76.8°        勾陈 6星 ra269.6°/dec86.5°
 *   天皇大帝+五帝内座 6星 ra41.8°/dec81.0°
 *   尚书+大理+天柱 11星 ra261.7°/dec75.5°
 *   拱北取北天极方向（dec 89°：正极点会让 gazeQuat 的 lookAt up 退化）
 */
export const CH4_CAM_STOPS: readonly Ch4CamStop[] = [
  { ra: 175, dec: 81, radius: 0.35, fov: 50, gazeW: 0.85 }, // 0 开场 · 城外远望
  { ra: 218.6, dec: 76.8, radius: 0.55, fov: 42, gazeW: 0.85 }, // 1 北极五星
  { ra: 269.6, dec: 86.5, radius: 0.55, fov: 42, gazeW: 0.85 }, // 2 勾陈
  { ra: 41.8, dec: 81.0, radius: 0.55, fov: 42, gazeW: 0.85 }, // 3 帝座
  { ra: 261.7, dec: 75.5, radius: 0.55, fov: 42, gazeW: 0.85 }, // 4 百官
  { ra: 0, dec: 89, radius: 0.55, fov: 55, gazeW: 0.85 }, // 5 众星拱北
];

/** 收尾释放的相机终点：与 CHAPTER_KEYS[4]（ch5 穿出球外关键帧）同值，单测守护 */
export const CH4_RELEASE = {
  radius: 3,
  dir: [0.52, 0.7, 0.49] as readonly [number, number, number],
  fov: 50,
};

// ---------------------------------------------------------------- 静态数据

/** 天球半径（世界单位），与 SkyApp.R 一致；本地取值保持本模块纯逻辑可独立单测 */
const SKY_R = 100;

/** 宫墙星官组（开场点亮） */
const WALL_GROUPS: readonly string[] = ["紫微左垣", "紫微右垣"];

/** 站点卡序号展示 */
const ORDINALS = ["第一站", "第二站", "第三站", "第四站", "第五站"] as const;
/** 开场站名（引出句取 copy.hook/body） */
const OPENING_TAG = "序 · 天上有座城";

/** 引导线长度（px）与星名距圆点的距离（px） */
const TAG_LINE_LEN = 28;
const TAG_NAME_DIST = 44;
/** 屏外判定余量（px）：投影超出视口该距离即隐藏 */
const LABEL_MARGIN = 60;

/** 相机阻尼系数（/秒）：radius/fov/注视权重 */
const DAMP = 3;
/** 注视朝向 slerp 系数（/秒） */
const GAZE_DAMP = 2.5;

/** 逐站相机目标（向量/四元数预算好，frame 高频路径零分配） */
interface CamTarget {
  dir: THREE.Vector3;
  radius: number;
  fov: number;
  gazeQ: THREE.Quaternion;
  gazeW: number;
}
const CAM_TARGETS: readonly CamTarget[] = CH4_CAM_STOPS.map((s) => ({
  dir: new THREE.Vector3(...radecToVec3(s.ra, s.dec, 1)),
  radius: s.radius,
  fov: s.fov,
  gazeQ: gazeQuat(s.ra, s.dec),
  gazeW: s.gazeW,
}));
const RELEASE_DIR = new THREE.Vector3(...CH4_RELEASE.dir).normalize();
const TOUR_STOP = CAM_TARGETS[CH4_STOP_COUNT]!; // 第五站（收尾缓动的起点）

// ---------------------------------------------------------------- 样式（ch4- 前缀，Labels.ts 同款注入守卫）

const CH4_CSS = `
.ch4-layer { position: absolute; inset: 0; pointer-events: none; }

/* ---- 贴星标签：小圆点 + 短引导线 + 星名（位置每帧投影写入 left/top） ---- */
.ch4-tag {
  position: absolute;
  left: 0; top: 0;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.ch4-tag.on { opacity: 1; transform: scale(1); }
.ch4-tag-dot {
  position: absolute;
  left: 0; top: 0;
  width: 7px; height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: #fce1b6;
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.9), 0 0 2px #ffffff;
}
.ch4-tag-line {
  position: absolute;
  left: 0; top: 0;
  width: ${TAG_LINE_LEN}px; height: 1px;
  background: linear-gradient(90deg, rgba(201, 162, 39, 0.9), rgba(201, 162, 39, 0.12));
  transform-origin: 0 50%;
}
.ch4-tag-name {
  position: absolute;
  left: 0; top: 0;
  white-space: nowrap;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px;
  letter-spacing: 0.24em;
  color: #c9a227;
  text-shadow: 0 1px 8px rgba(13, 13, 17, 0.9);
}

/* ---- 卡片基座（描金双细线对齐 app.css 的 .chapter-panel） ---- */
.ch4-card {
  position: absolute;
  max-width: 460px;
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
.ch4-card::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 7px;
  pointer-events: none;
}
.ch4-card.on { opacity: 1; transform: translateY(0); }

/* ---- 开场卡（居中） ---- */
.ch4-opening {
  left: 50%; top: 50%;
  width: min(500px, 86vw);
  text-align: center;
  transform: translate(-50%, calc(-50% + 16px));
}
.ch4-opening.on { transform: translate(-50%, -50%); }
.ch4-opening h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 34px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
}
.ch4-opening .chapter-head { justify-content: center; margin-bottom: 6px; }
.ch4-opening-tag {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 17px; letter-spacing: 0.32em; color: #fce1b6;
  margin-bottom: 10px;
}
.ch4-opening .hook { font-size: 15px; line-height: 2; color: #fce1b6; margin-bottom: 6px; }
.ch4-opening-body { font-size: 13px; line-height: 2; opacity: 0.8; }

/* ---- 站点卡（底部中央，换站翻页） ---- */
.ch4-stop {
  left: 50%; bottom: 4.5vh;
  width: min(470px, 88vw);
  transform: translate(-50%, 16px);
}
.ch4-stop.on { transform: translate(-50%, 0); }
.ch4-stop.swap { animation: ch4StopIn 0.45s ease; }
@keyframes ch4StopIn {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.ch4-stop-tag {
  font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55;
  margin-bottom: 8px;
}
.ch4-stop-title {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 22px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 8px;
}
.ch4-stop-story { font-size: 14px; line-height: 1.9; color: #f6e8d8; }
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch4 = "";
  el.textContent = CH4_CSS;
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

// ---------------------------------------------------------------- 数据类型（/data 运行时拉取）

interface StarsJson {
  stars: { hip: number; ra: number; dec: number; name: string | null }[];
}
interface AsterismsJson {
  asterisms: { name: string; stars: number[] }[];
}

// ---------------------------------------------------------------- 章节工厂

export function createChapter(ctx: ChapterCtx): Chapter {
  injectStyle();
  const pin = ctx.root.querySelector(".pin")!;
  const { copy } = ctx;

  // ---- 开场卡（章题 + 站名「天上有座城」+ hook/body 引出句） ----
  const openingCard = document.createElement("div");
  openingCard.className = "ch4-card ch4-opening";
  openingCard.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="ch4-opening-tag">${OPENING_TAG}</p>
    <p class="hook">${escapeHtml(copy.hook)}</p>
    ${copy.body.map((p) => `<p class="ch4-opening-body">${escapeHtml(p)}</p>`).join("")}
  `;
  pin.appendChild(openingCard);

  // ---- 站点卡（五站复用同一卡，换站改写内容 + 翻页动画） ----
  const stopCard = document.createElement("div");
  stopCard.className = "ch4-card ch4-stop";
  stopCard.innerHTML = `
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `;
  pin.appendChild(stopCard);
  const stopTag = stopCard.querySelector<HTMLElement>(".ch4-stop-tag")!;
  const stopTitle = stopCard.querySelector<HTMLElement>(".ch4-stop-title")!;
  const stopStory = stopCard.querySelector<HTMLElement>(".ch4-stop-story")!;

  // ---- 贴星标签层：为全部带 labels 的站预建元素（引导线方位按黄金角散开） ----
  interface LabelRec {
    el: HTMLDivElement;
    stopIdx: number; // CH4_STOPS 下标
    labelIdx: number; // 站内标签下标（锚点解算后索引 stopAnchors）
    shown: boolean;
  }
  const labelLayer = document.createElement("div");
  labelLayer.className = "ch4-layer";
  const labelRecs: LabelRec[] = [];
  CH4_STOPS.forEach((stop, stopIdx) => {
    (stop.labels ?? []).forEach((label, labelIdx) => {
      const el = document.createElement("div");
      el.className = "ch4-tag";
      const dot = document.createElement("i");
      dot.className = "ch4-tag-dot";
      const angle = -90 + labelIdx * 137.5; // 黄金角散开，减少互相遮挡
      const rad = (angle * Math.PI) / 180;
      const line = document.createElement("i");
      line.className = "ch4-tag-line";
      line.style.transform = `rotate(${angle}deg)`;
      const name = document.createElement("span");
      name.className = "ch4-tag-name";
      name.textContent = label.text;
      name.style.transform = `translate(${Math.cos(rad) * TAG_NAME_DIST}px, ${Math.sin(rad) * TAG_NAME_DIST}px) translate(-50%, -50%)`;
      el.append(dot, line, name);
      labelLayer.appendChild(el);
      labelRecs.push({ el, stopIdx, labelIdx, shown: false });
    });
  });
  pin.appendChild(labelLayer);

  // ---- 锚点解算：asterisms.json 成员池 × stars.json 星名/坐标 ----
  // stopAnchors[stopIdx][labelIdx] = 天球面世界坐标（未含绕极转角）；解算失败/数据未到为 null
  let stopAnchors: (THREE.Vector3 | null)[][] | null = null;
  Promise.all([
    fetch("/data/stars.json").then((r) => (r.ok ? (r.json() as Promise<StarsJson>) : null)),
    fetch("/data/asterisms.json").then((r) => (r.ok ? (r.json() as Promise<AsterismsJson>) : null)),
  ])
    .then(([starsData, astData]) => {
      if (!starsData || !astData) return;
      const byHip = new Map(starsData.stars.map((s) => [s.hip, s]));
      const byName = new Map(astData.asterisms.map((a) => [a.name, a]));
      stopAnchors = CH4_STOPS.map((stop) => {
        const pool = stop.groups.flatMap((g) =>
          (byName.get(g)?.stars ?? [])
            .map((hip) => byHip.get(hip))
            .filter((s): s is StarsJson["stars"][number] => s !== undefined),
        );
        const matched = ch4MatchLabels(
          pool,
          (stop.labels ?? []).map((l) => l.star),
        );
        return matched.map((m) => {
          if (!m) return null;
          const [x, y, z] = radecToVec3(m.ra, m.dec, SKY_R);
          return new THREE.Vector3(x, y, z);
        });
      });
    })
    .catch(() => {
      /* 数据缺失时贴星标签不显示，巡游其余部分不受影响 */
    });

  // ---------------------------------------------------------------- 状态

  let entered = false;
  let lastP = 0;

  // 相机当前值（frame 阻尼状态；camInit 首帧从活动相机读现场接管）
  let camInit = false;
  let radiusCur = 0.35;
  let fovCur = 50;
  const dirCur = new THREE.Vector3(0, 1, 0);
  const gazeCur = new THREE.Quaternion();
  let gazeWCur = 0;

  let rotAngle = 0; // 绕极累计转角（弧度；仅在第五站行程内随 dt 累计）
  let skyAngleWritten = 0; // 上次写入 SkyApp 的有效转角（变化才写）

  // DOM 显隐缓存（update 高频路径只在变化时碰 classList/文本）
  let openingOn = false;
  let stopCardIdx = -1;

  // ---------------------------------------------------------------- 小组件

  function setOpeningOn(on: boolean): void {
    if (openingOn === on) return;
    openingOn = on;
    openingCard.classList.toggle("on", on);
  }

  function setStopCard(idx: number): void {
    if (stopCardIdx === idx) return;
    stopCardIdx = idx;
    if (idx < 0) {
      stopCard.classList.remove("on");
      return;
    }
    const stop = CH4_STOPS[idx];
    if (!stop) return;
    stopTag.textContent = ORDINALS[idx] ?? `第${idx + 1}站`;
    stopTitle.textContent = stop.title;
    stopStory.textContent = stop.story;
    stopCard.classList.add("on");
    // 换站翻页：重启入场动画（reflow 技巧，不占计时器）
    stopCard.classList.remove("swap");
    void stopCard.offsetWidth;
    stopCard.classList.add("swap");
  }

  function setLabelShown(rec: LabelRec, on: boolean): void {
    if (rec.shown === on) return;
    rec.shown = on;
    rec.el.classList.toggle("on", on);
  }

  function hideAllLabels(): void {
    for (const rec of labelRecs) setLabelShown(rec, false);
  }

  // ---------------------------------------------------------------- update（p 的纯函数，幂等）

  function applyProgress(p: number): void {
    lastP = p;
    const seg = ch4SegmentOf(p);

    // 星官组生长：宫墙随开场、各站随站头行程（覆盖写，双向回滚正确）
    const walls = ch4WallsGrowth(p);
    for (const g of WALL_GROUPS) ctx.sky.setGroupProgress(g, walls);
    CH4_STOPS.forEach((stop, i) => {
      const v = ch4StopGrowth(p, i);
      for (const g of stop.groups) ctx.sky.setGroupProgress(g, v);
    });

    // 卡片显隐：开场卡仅开场段；站点卡五站切换，收尾区留住第五站点题句
    setOpeningOn(seg === 0);
    setStopCard(seg >= 1 && seg <= CH4_STOP_COUNT ? seg - 1 : seg === 6 ? CH4_STOP_COUNT - 1 : -1);
  }

  // ---------------------------------------------------------------- frame（相机 + 绕极旋转 + 贴星投影）

  const tmpAnchor = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();

  /** 绕 +Y（天极轴）旋转锚点：与 SkyApp.setSkyRotation 的 Q绕极 同变换 */
  function rotatePole(v: THREE.Vector3, a: number, out: THREE.Vector3): THREE.Vector3 {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return out.set(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
  }

  function updateCamera(dt: number): void {
    const p = lastP;
    const seg = ch4SegmentOf(p);

    // 目标：五站/开场取站点目标；收尾区向 CH4_RELEASE 缓动（衔接 ch5 关键帧）
    let wantRadius: number;
    let wantFov: number;
    let wantW: number;
    const wantDir = tmpDir;
    let wantGazeQ: THREE.Quaternion;
    if (seg === 6) {
      const k = smooth01((p - CH4_TOUR_END) / (1 - CH4_TOUR_END));
      wantRadius = THREE.MathUtils.lerp(TOUR_STOP.radius, CH4_RELEASE.radius, k);
      wantFov = THREE.MathUtils.lerp(TOUR_STOP.fov, CH4_RELEASE.fov, k);
      wantW = (1 - k) * TOUR_STOP.gazeW;
      wantDir.copy(TOUR_STOP.dir).lerp(RELEASE_DIR, k).normalize();
      wantGazeQ = TOUR_STOP.gazeQ; // 权重趋 0，朝向不再重要
    } else {
      const t = CAM_TARGETS[seg]!;
      wantRadius = t.radius;
      wantFov = t.fov;
      wantW = t.gazeW;
      wantDir.copy(t.dir);
      wantGazeQ = t.gazeQ;
    }

    // 接管首帧：从活动相机读现场（底座关键帧 gazeBlend=1，故权重从 1 起）
    if (!camInit) {
      camInit = true;
      const cam = ctx.sky.camera;
      radiusCur = Math.max(cam.position.length() / SKY_R, 0.005);
      fovCur = cam.fov;
      dirCur.copy(cam.position).normalize();
      if (dirCur.lengthSq() < 1e-8) dirCur.set(0, 1, 0);
      gazeCur.copy(cam.quaternion);
      gazeWCur = 1;
    }

    const kDamp = 1 - Math.exp(-DAMP * dt);
    radiusCur += (wantRadius - radiusCur) * kDamp;
    fovCur += (wantFov - fovCur) * kDamp;
    dirCur.lerp(wantDir, kDamp).normalize();
    gazeWCur += (wantW - gazeWCur) * kDamp;
    gazeCur.slerp(wantGazeQ, 1 - Math.exp(-GAZE_DAMP * dt));

    ctx.sky.setRadius(radiusCur);
    ctx.sky.setPositionDir(dirCur);
    ctx.sky.setFov(fovCur);
    if (gazeWCur < 0.005 && wantW === 0) {
      ctx.sky.setGazeBlend(0); // 权重归零后完全释放（不携带残留目标）
    } else {
      ctx.sky.setGazeBlend(gazeWCur, gazeCur);
    }
  }

  function updateSkyRotation(dt: number): void {
    const p = lastP;
    if (p >= CH4_ROT_START && p < CH4_TOUR_END) {
      rotAngle += CH4_ROT_SPEED * dt; // 第五站行程内连续慢转
    } else if (ch4RotationWeight(p) === 0) {
      rotAngle = 0; // 权重为 0 的区域归零不可见（回滚幂等）
    }
    const eff = rotAngle * ch4RotationWeight(p);
    if (Math.abs(eff - skyAngleWritten) > 1e-6) {
      skyAngleWritten = eff;
      ctx.sky.setSkyRotation(eff, 0);
    }
  }

  function updateLabels(): void {
    const seg = ch4SegmentOf(lastP);
    const activeStop = seg >= 1 && seg <= CH4_STOP_COUNT ? seg - 1 : -1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const rec of labelRecs) {
      const anchor = stopAnchors?.[rec.stopIdx]?.[rec.labelIdx];
      if (rec.stopIdx !== activeStop || !anchor) {
        setLabelShown(rec, false);
        continue;
      }
      // 锚点含绕极转角修正（星空刚体随 skyRoot 旋转，标签须贴旋转后的星）
      rotatePole(anchor, skyAngleWritten, tmpAnchor);
      const s = worldToScreen([tmpAnchor.x, tmpAnchor.y, tmpAnchor.z], ctx.sky.camera, {
        width: w,
        height: h,
      });
      if (!s || s.x < -LABEL_MARGIN || s.x > w + LABEL_MARGIN || s.y < -LABEL_MARGIN || s.y > h + LABEL_MARGIN) {
        setLabelShown(rec, false); // 相机背后（null）或屏外
        continue;
      }
      rec.el.style.left = `${s.x}px`;
      rec.el.style.top = `${s.y}px`;
      setLabelShown(rec, true);
    }
  }

  // ---------------------------------------------------------------- Chapter

  return {
    enter() {
      ctx.root.classList.add("inview");
      entered = true;
      camInit = false; // frame 首帧从活动相机读现场接管
      // 本章用自绘的贴星标签，紫微垣中心的 CSS2D 星官名标签让位
      ctx.sky.setLabelsEnabled(false);
      applyProgress(lastP); // 双向回滚：按当前 p 重放正确现场
    },
    update(p) {
      applyProgress(p);
    },
    frame(dt) {
      // 主循环 applyCameraState 之后调用（见 app.ts）：本窗口内相机写入不被
      // rig 覆写。exit 后（entered=false）不碰相机，交还 rig 驱动。
      if (!entered) return;
      updateCamera(dt);
      updateSkyRotation(dt);
      updateLabels();
    },
    exit() {
      ctx.root.classList.remove("inview");
      entered = false;
      camInit = false;
      rotAngle = 0;
      skyAngleWritten = 0;
      ctx.sky.setSkyRotation(0, 0); // 幂等归零约定
      ctx.sky.setGazeBlend(0); // 幂等释放脚本注视
      ctx.sky.setLabelsEnabled(true); // 恢复标签总开关（其余章节依赖默认开启）
      setOpeningOn(false);
      setStopCard(-1);
      hideAllLabels();
      // 星官组保持点亮（ch5 球外全景背景），不回滚
    },
  };
}
