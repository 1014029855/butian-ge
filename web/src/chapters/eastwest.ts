import type { SkyView } from "../scroll/view";
import { project } from "../starfield/projection";
import { Camera } from "../starfield/camera";
import type { SkyLayout, StarRecord, WesternJson } from "../starfield/renderer";

/**
 * 东西对话：同一片星空，左边中国星官线（金），右边西方星座线（米白），
 * 拖动中线滑块擦除对比。
 */
let sliderFrac = 0.5;

export async function initEastWest(
  layout: SkyLayout,
  starsJson: { stars: StarRecord[] },
): Promise<void> {
  const canvas = document.getElementById("compare-canvas") as HTMLCanvasElement | null;
  const bar = document.getElementById("compare-bar");
  const wrap = document.getElementById("compare-wrap");
  if (!canvas || !bar || !wrap) return;

  const res = await fetch("data/western.json");
  const western = (await res.json()) as WesternJson;
  const byHip = new Map<number, StarRecord>();
  for (const s of starsJson.stars) byHip.set(s.hip, s);

  // 预投影
  const starPts = starsJson.stars.map((s) => ({ ...project(s.ra, s.dec), r: Math.max(0.7, 2.4 - s.mag * 0.35) }));
  const westSegs: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (const c of western.constellations) {
    for (const [h1, h2] of c.lines) {
      const s1 = byHip.get(h1), s2 = byHip.get(h2);
      if (!s1 || !s2) continue;
      const p1 = project(s1.ra, s1.dec), p2 = project(s2.ra, s2.dec);
      westSegs.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y });
    }
  }

  const ctx = canvas.getContext("2d")!;
  const cam = new Camera();

  function resize(): void {
    const rect = wrap!.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas!.width = Math.round(rect.width * dpr);
    canvas!.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cam.fit(Math.PI, rect.width, rect.height, 36);
    draw();
  }

  function draw(): void {
    const rect = wrap!.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    const sx = sliderFrac * W;
    ctx.clearRect(0, 0, W, H);

    // 星点
    for (const s of starPts) {
      const p = cam.toScreen(s.x, s.y);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#c9a227";
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 西方星座线（全幅，米白）
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = "#fce1b6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const seg of westSegs) {
      const p1 = cam.toScreen(seg.x1, seg.y1);
      const p2 = cam.toScreen(seg.x2, seg.y2);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    ctx.stroke();

    // 中国星官线（滑块左侧，金色）
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sx, H);
    ctx.clip();
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (const a of layout.asterisms) {
      for (const seg of a.segments) {
        const p1 = cam.toScreen(seg.x1, seg.y1);
        const p2 = cam.toScreen(seg.x2, seg.y2);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
    }
    ctx.stroke();
    ctx.restore();

    // 中线
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, H);
    ctx.stroke();
    bar!.style.left = `${sx}px`;
  }

  // 拖动滑块
  let dragging = false;
  const onMove = (clientX: number) => {
    const rect = wrap.getBoundingClientRect();
    sliderFrac = Math.min(0.98, Math.max(0.02, (clientX - rect.left) / rect.width));
    draw();
  };
  bar.addEventListener("pointerdown", (e) => {
    dragging = true;
    bar.setPointerCapture(e.pointerId);
  });
  window.addEventListener("pointermove", (e) => {
    if (dragging) onMove(e.clientX);
  });
  window.addEventListener("pointerup", () => { dragging = false; });
  canvas.addEventListener("pointerdown", (e) => onMove(e.clientX));
  window.addEventListener("resize", resize);
  resize();
}

/** 章节激活时进一步压暗背景星图。 */
export function updateEastWest(view: SkyView): void {
  view.showLines = false;
  view.dimStarAlpha = 0.08;
  view.revealAlpha = () => 0;
  view.highlight = null;
  view.labels = [];
  view.freeExplore = false;
}
