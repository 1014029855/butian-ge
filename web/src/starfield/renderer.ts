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
export interface StarsJson { stars: StarRecord[] }
export interface AsterismsJson { asterisms: AsterismRecord[] }

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
    asterisms.push({
      id: a.id,
      name: a.name,
      segments,
      labelPos: { x: mx / n, y: my / n },
      memberNames,
    });
  });
  return { stars, asterisms, starAsterism };
}

/* ---------- 渲染 ---------- */

export function renderSky(
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  layout: SkyLayout,
  tSec: number,
  highlightIndex: number | null,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height);

  // 星官连线
  for (let ai = 0; ai < layout.asterisms.length; ai++) {
    const a = layout.asterisms[ai];
    const hot = ai === highlightIndex;
    ctx.strokeStyle = hot ? "#c9a227" : "#af915f";
    ctx.globalAlpha = hot ? 0.95 : 0.45;
    ctx.lineWidth = hot ? 1.6 : 1;
    ctx.beginPath();
    for (const seg of a.segments) {
      const p1 = camera.toScreen(seg.x1, seg.y1);
      const p2 = camera.toScreen(seg.x2, seg.y2);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();
  }

  // 星点（闪烁）
  for (const s of layout.stars) {
    const p = camera.toScreen(s.x, s.y);
    if (p.x < -8 || p.y < -8 || p.x > width + 8 || p.y > height + 8) continue;
    const alpha = s.baseAlpha * twinkleOpacity(s.tw, tSec);
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

  // 高亮星官名
  if (highlightIndex !== null) {
    const a = layout.asterisms[highlightIndex];
    const p = camera.toScreen(a.labelPos.x, a.labelPos.y);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fce1b6";
    ctx.font = '15px "STSong", "SimSun", "Songti SC", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(a.name, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}
