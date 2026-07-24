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
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  name: string | null;
  tw: TwinkleParams;
}
export interface LayoutAsterism {
  id: string;
  name: string;
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  labelPos: { x: number; y: number };
  memberNames: string[];
}
export interface SkyLayout {
  stars: LayoutStar[];
  asterisms: LayoutAsterism[];
  /** hip → 所属星官索引（命中检测后反查高亮） */
  starAsterism: Map<number, number>;
  nameIndex: Map<string, number>;
}

export function buildLayout(starsJson: StarsJson, asterismsJson: AsterismsJson): SkyLayout {
  const stars: LayoutStar[] = starsJson.stars.map((s) => {
    const p = project(s.ra, s.dec);
    return {
      hip: s.hip,
      x: p.x,
      y: p.y,
      r: magToRadius(s.mag),
      baseAlpha: magToAlpha(s.mag),
      name: s.name,
      tw: makeTwinkleParams(mulberry32(s.hip)),
    };
  });
  const pos = new Map<number, LayoutStar>();
  for (const s of stars) pos.set(s.hip, s);

  const starAsterism = new Map<number, number>();
  const nameIndex = new Map<string, number>();
  const asterisms: LayoutAsterism[] = [];
  asterismsJson.asterisms.forEach((a, ai) => {
    const segments = [];
    for (const [h1, h2] of a.lines) {
      const s1 = pos.get(h1);
      const s2 = pos.get(h2);
      if (s1 && s2) segments.push({ x1: s1.x, y1: s1.y, x2: s2.x, y2: s2.y });
    }
    if (!segments.length) return;
    let mx = 0, my = 0, n = 0;
    const memberNames: string[] = [];
    for (const h of a.stars) {
      const s = pos.get(h);
      if (!s) continue;
      mx += s.x; my += s.y; n++;
      if (s.name) memberNames.push(s.name);
      if (!starAsterism.has(h)) starAsterism.set(h, ai);
    }
    if (!n) return;
    nameIndex.set(a.name, asterisms.length);
    asterisms.push({
      id: a.id,
      name: a.name,
      segments,
      labelPos: { x: mx / n, y: my / n },
      memberNames,
    });
  });
  return { stars, asterisms, starAsterism, nameIndex };
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
}

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
  } = opts;

  ctx.clearRect(0, 0, width, height);

  if (showLines) {
    for (let ai = 0; ai < layout.asterisms.length; ai++) {
      if (visibleAsterisms && !visibleAsterisms.has(ai)) continue;
      const a = layout.asterisms[ai];
      const hot = highlightIndices?.has(ai) ?? false;
      const alpha = revealAlpha(ai);
      if (alpha <= 0.003) continue;
      ctx.strokeStyle = hot ? "#c9a227" : "#af915f";
      ctx.globalAlpha = hot ? Math.max(0.95, alpha) : alpha;
      ctx.lineWidth = hot ? 1.6 : 1;
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
    }
  }

  for (const s of layout.stars) {
    const w = rot(s.x, s.y, rotation);
    const p = camera.toScreen(w.x, w.y);
    if (p.x < -8 || p.y < -8 || p.x > width + 8 || p.y > height + 8) continue;
    const alpha = s.baseAlpha * twinkleOpacity(s.tw, tSec) * dimStarAlpha;
    if (alpha <= 0.003) continue;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#c9a227";
    if (s.r >= 2.2) {
      ctx.shadowColor = "rgba(201, 162, 39, 0.8)";
      ctx.shadowBlur = 6;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

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
