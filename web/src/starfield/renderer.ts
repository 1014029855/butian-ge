import { project } from "./projection";
import { mulberry32 } from "./rng";
import { makeTwinkleParams, twinkleOpacity, type TwinkleParams } from "./twinkle";
import { magToRadius, magToAlpha } from "./magnitude";
import type { Camera } from "./camera";

/* ---------- 输入 JSON 形状（data/build_data.py 产物） ---------- */

export interface StarRecord {
  hip: number;
  ra: number;
  dec: number;
  mag: number;
  name: string | null;
}
export interface AsterismRecord {
  id: string;
  name: string;
  stars: number[];
  lines: number[][];
}
export interface WesternRecord {
  id: string;
  name: string;
  nameEn: string;
  stars: number[];
  lines: number[][];
}
export interface StarsJson { stars: StarRecord[] }
export interface AsterismsJson { asterisms: AsterismRecord[] }
export interface WesternJson { constellations: WesternRecord[] }

/* ---------- 渲染布局 ---------- */

export interface LayoutStar {
  hip: number;
  /** J2000 赤道坐标（度），重投影的源数据 */
  ra: number;
  dec: number;
  x: number;
  y: number;
  /** morph 动画起点坐标（beginMorph 时快照） */
  ox: number;
  oy: number;
  r: number;
  baseAlpha: number;
  name: string | null;
  tw: TwinkleParams;
  /** 正射投影下位于背面半球时为 true，渲染跳过 */
  hidden: boolean;
}
export interface LayoutAsterism {
  id: string;
  name: string;
  /** 原始连线（hip 对），重投影时重建 segments */
  linePairs: [number, number][];
  /** 成员星 hip，重投影时重算 labelPos */
  memberHips: number[];
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  labelPos: { x: number; y: number };
  memberNames: string[];
}

/** 任意投影函数；返回 visible=false 表示该点在背面半球 */
export type AnyProjector = (raDeg: number, decDeg: number) => { x: number; y: number; visible?: boolean };

/** 投影切换 morph 动画状态（星点从旧坐标飞向新坐标） */
export interface MorphState {
  /** 起始时刻（performance.now 毫秒） */
  t0: number;
  /** 时长（毫秒） */
  dur: number;
}

export interface SkyLayout {
  stars: LayoutStar[];
  asterisms: LayoutAsterism[];
  /** hip → 所属星官索引（命中检测后反查高亮） */
  starAsterism: Map<number, number>;
  nameIndex: Map<string, number>;
  /** 进行中的投影切换动画；null 表示无动画 */
  morph: MorphState | null;
}

export function buildLayout(
  starsJson: StarsJson,
  asterismsJson: AsterismsJson,
  projector: AnyProjector = project,
): SkyLayout {
  const stars: LayoutStar[] = starsJson.stars.map((s) => ({
    hip: s.hip,
    ra: s.ra,
    dec: s.dec,
    x: 0,
    y: 0,
    ox: 0,
    oy: 0,
    r: magToRadius(s.mag),
    baseAlpha: magToAlpha(s.mag),
    name: s.name,
    tw: makeTwinkleParams(mulberry32(s.hip)),
    hidden: false,
  }));

  const starAsterism = new Map<number, number>();
  const nameIndex = new Map<string, number>();
  const asterisms: LayoutAsterism[] = [];
  const byHip = new Map<number, LayoutStar>();
  for (const s of stars) byHip.set(s.hip, s);

  asterismsJson.asterisms.forEach((a) => {
    const linePairs: [number, number][] = [];
    for (const [h1, h2] of a.lines) {
      if (byHip.has(h1) && byHip.has(h2)) linePairs.push([h1, h2]);
    }
    if (!linePairs.length) return;
    const memberHips: number[] = [];
    const memberNames: string[] = [];
    for (const h of a.stars) {
      const s = byHip.get(h);
      if (!s) continue;
      memberHips.push(h);
      if (s.name) memberNames.push(s.name);
      if (!starAsterism.has(h)) starAsterism.set(h, asterisms.length);
    }
    if (!memberHips.length) return;
    nameIndex.set(a.name, asterisms.length);
    asterisms.push({
      id: a.id,
      name: a.name,
      linePairs,
      memberHips,
      segments: [],
      labelPos: { x: 0, y: 0 },
      memberNames,
    });
  });

  const layout: SkyLayout = { stars, asterisms, starAsterism, nameIndex, morph: null };
  reprojectLayout(layout, projector);
  return layout;
}

/**
 * 投影切换动画：快照当前坐标 → 重投影 → 记录 morph 状态。
 * renderSky 在 morph 期间对每颗星做位置补间，新背面星淡出、新正面星淡入。
 */
export function beginMorph(
  layout: SkyLayout,
  projector: AnyProjector,
  t0Ms: number,
  durMs = 1300,
): void {
  for (const s of layout.stars) {
    s.ox = s.x;
    s.oy = s.y;
  }
  reprojectLayout(layout, projector);
  layout.morph = { t0: t0Ms, dur: durMs };
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * 用新投影函数重建布局中所有派生坐标（星位、线段、标签位）。
 * 天球仪转球 / 岁差时间机拖动时调用；5563 星全量重建约 2-4ms。
 */
export function reprojectLayout(layout: SkyLayout, projector: AnyProjector): void {
  const pos = new Map<number, LayoutStar>();
  for (const s of layout.stars) {
    const p = projector(s.ra, s.dec);
    s.x = p.x;
    s.y = p.y;
    s.hidden = p.visible === false;
    pos.set(s.hip, s);
  }
  for (const a of layout.asterisms) {
    a.segments = [];
    for (const [h1, h2] of a.linePairs) {
      const s1 = pos.get(h1);
      const s2 = pos.get(h2);
      if (!s1 || !s2 || s1.hidden || s2.hidden) continue;
      a.segments.push({ x1: s1.x, y1: s1.y, x2: s2.x, y2: s2.y });
    }
    let mx = 0, my = 0, n = 0;
    for (const h of a.memberHips) {
      const s = pos.get(h);
      if (!s || s.hidden) continue;
      mx += s.x; my += s.y; n++;
    }
    if (n) a.labelPos = { x: mx / n, y: my / n };
  }
}

/* ---------- 渲染 ---------- */

export interface RenderOptions {
  /** 金色高亮的星官索引 */
  highlightIndices?: Set<number> | null;
  /** 世界坐标绕北天极旋转（弧度），序章慢转用 */
  rotation?: number;
  /** 星官线透明度函数，默认 (ai) => 0.45 */
  revealAlpha?: (ai: number) => number;
  /** 星点整体透明度系数（0-1），默认 1 */
  dimStarAlpha?: number;
  /** 只画这些星官的连线；null/undefined = 全部 */
  visibleAsterisms?: Set<number> | null;
  /** 需要绘制名字的星官索引 */
  labelIndices?: number[];
  /** 是否画连线，默认 true */
  showLines?: boolean;
  /** 跳过清屏（调用方已绘制底衬，如天球仪球体） */
  skipClear?: boolean;
  /** 引力透镜光标（屏幕坐标）：附近星点被剪切推挤、增亮放大 */
  lens?: { x: number; y: number } | null;
}

/** 引力透镜作用半径（px）与最大位移（px） */
const LENS_R = 170;
const LENS_PUSH = 24;

function rot(x: number, y: number, theta: number): { x: number; y: number } {
  if (!theta) return { x, y };
  const c = Math.cos(theta), s = Math.sin(theta);
  return { x: x * c - y * s, y: x * s + y * c };
}

export function renderSky(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  layout: SkyLayout,
  tSec: number,
  width: number,
  height: number,
  opts: RenderOptions = {},
): void {
  const {
    highlightIndices = null,
    rotation = 0,
    revealAlpha = () => 0.45,
    dimStarAlpha = 1,
    visibleAsterisms = null,
    labelIndices = [],
    showLines = true,
    skipClear = false,
    lens = null,
  } = opts;

  if (!skipClear) ctx.clearRect(0, 0, width, height);

  // morph 进度（投影切换动画）：星点位置补间，线段随进度淡入
  let mu = 1;
  if (layout.morph) {
    mu = Math.min(1, Math.max(0, (tSec * 1000 - layout.morph.t0) / layout.morph.dur));
  }
  const morphing = mu < 1;
  const ue = easeInOutCubic(mu);

  if (showLines) {
    for (let ai = 0; ai < layout.asterisms.length; ai++) {
      if (visibleAsterisms && !visibleAsterisms.has(ai)) continue;
      const a = layout.asterisms[ai];
      const hot = highlightIndices?.has(ai) ?? false;
      const alpha = revealAlpha(ai) * (morphing ? ue : 1);
      if (alpha <= 0.003) continue;
      ctx.strokeStyle = hot ? "#c9a227" : "#af915f";
      ctx.globalAlpha = hot ? Math.max(0.95, alpha) : alpha;
      ctx.lineWidth = hot ? 2 : 1;
      if (hot) {
        ctx.shadowColor = "rgba(201, 162, 39, 0.7)";
        ctx.shadowBlur = 9;
      }
      ctx.beginPath();
      for (const seg of a.segments) {
        const w1 = rot(seg.x1, seg.y1, rotation);
        const w2 = rot(seg.x2, seg.y2, rotation);
        const p1 = camera.toScreen(w1.x, w1.y);
        const p2 = camera.toScreen(w2.x, w2.y);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // 星点（半径整体放大 1.4 倍，亮星带光晕，加色混合更有"发光感"）
  const R_SCALE = 1.4;
  ctx.globalCompositeOperation = "lighter";
  for (const s of layout.stars) {
    let wx = s.x;
    let wy = s.y;
    let fade = 1;
    if (s.hidden) {
      if (!morphing) continue;
      // 新位置在背面：动画期间沿补间路径飞出并淡出
      wx = s.ox + (s.x - s.ox) * ue;
      wy = s.oy + (s.y - s.oy) * ue;
      fade = 1 - ue;
    } else if (morphing) {
      wx = s.ox + (s.x - s.ox) * ue;
      wy = s.oy + (s.y - s.oy) * ue;
      // 起点在背面（旧帧被跳过绘制）：淡入
      // 用起点是否在旧投影中可见近似：ox/oy 未绘制时同样补间，alpha 渐进
      fade = ue < 1 ? Math.max(0.15, ue) : 1;
    }
    const w = rot(wx, wy, rotation);
    const p = camera.toScreen(w.x, w.y);
    if (p.x < -12 || p.y < -12 || p.x > width + 12 || p.y > height + 12) continue;
    let alpha = s.baseAlpha * twinkleOpacity(s.tw, tSec) * dimStarAlpha * fade;
    if (alpha <= 0.003) continue;
    let r = s.r * R_SCALE;
    // 引力透镜：光标附近星点向外剪切推挤，同时增亮放大
    if (lens) {
      const dx = p.x - lens.x;
      const dy = p.y - lens.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < LENS_R * LENS_R && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const f = 1 - d / LENS_R;
        const push = f * f * LENS_PUSH;
        p.x += (dx / d) * push;
        p.y += (dy / d) * push;
        alpha = Math.min(1, alpha * (1 + f * 1.1));
        r *= 1 + f * 0.45;
      }
    }
    if (r >= 2.4) {
      // 光晕
      ctx.globalAlpha = alpha * 0.16;
      ctx.fillStyle = "#e8c86a";
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = r >= 2.4 ? "#f0d98c" : "#c9a227";
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  if (labelIndices.length) {
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fce1b6";
    ctx.font = '15px "STSong", "SimSun", "Songti SC", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const ai of labelIndices) {
      const a = layout.asterisms[ai];
      if (!a) continue;
      const w = rot(a.labelPos.x, a.labelPos.y, rotation);
      const p = camera.toScreen(w.x, w.y);
      ctx.fillText(a.name, p.x, p.y);
    }
  }
  ctx.globalAlpha = 1;
}
