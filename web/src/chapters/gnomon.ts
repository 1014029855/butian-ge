import type { SkyView } from "../scroll/view";

/**
 * 观象授时 · 圭表测影交互。
 * 物理模型：登封观星台 φ = 34.7°N；太阳赤纬 Cooper 近似
 * δ(day) = −23.44°·cos(2π(day+10)/365.25)；正午太阳高度 α = 90°−|φ−δ|；
 * 八尺之表，影长 L = 8 / tan(α)。
 */
const PHI = 34.7;
const GUIL = 8; // 表高（尺）
const TERMS = [
  "冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
  "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露",
  "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",
];
const DONGZHI_DAY = 355; // 冬至约在年第 355 天

const D2R = Math.PI / 180;

function sunDecl(day: number): number {
  return -23.44 * Math.cos((2 * Math.PI * (day + 10)) / 365.25);
}
function noonAlt(day: number): number {
  return 90 - Math.abs(PHI - sunDecl(day));
}
function shadowLen(day: number): number {
  return GUIL / Math.tan(noonAlt(day) * D2R);
}
function nearestTerm(day: number): { name: string; offset: number } {
  let best = 0, bestD = 999;
  for (let i = 0; i < 24; i++) {
    const td = (DONGZHI_DAY + i * 15.22) % 365;
    const d = Math.min(Math.abs(day - td), 365 - Math.abs(day - td));
    if (d < bestD) { bestD = d; best = i; }
  }
  return { name: TERMS[best], offset: Math.round(bestD) };
}

export function initGnomon(): void {
  const canvas = document.getElementById("gnomon-canvas") as HTMLCanvasElement | null;
  const slider = document.getElementById("gnomon-slider") as HTMLInputElement | null;
  const readout = document.getElementById("gnomon-readout");
  if (!canvas || !slider || !readout) return;
  const cv: HTMLCanvasElement = canvas;
  const rd: HTMLElement = readout;
  const ctx = cv.getContext("2d")!;

  function draw(day: number): void {
    const W = cv.width, H = cv.height;
    ctx.clearRect(0, 0, W, H);

    const sceneW = W * 0.44;         // 左侧圭表场景
    const groundY = H * 0.78;
    const L = shadowLen(day);
    const alpha = noonAlt(day);

    // ---- 左：圭表场景 ----
    // 圭（地平）
    ctx.strokeStyle = "#af915f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(16, groundY);
    ctx.lineTo(sceneW - 10, groundY);
    ctx.stroke();
    // 圭面刻度
    ctx.strokeStyle = "rgba(175,145,95,0.5)";
    ctx.lineWidth = 1;
    for (let chi = 1; chi <= 13; chi++) {
      const x = 16 + chi * ((sceneW - 30) / 14);
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x, groundY + (chi % 5 === 0 ? 10 : 6));
      ctx.stroke();
    }
    // 表（立杆）
    const biaoX = 30;
    const biaoH = 120;
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(biaoX, groundY);
    ctx.lineTo(biaoX, groundY - biaoH);
    ctx.stroke();
    // 影
    const maxShadowPx = sceneW - 60;
    const shadowPx = Math.min(maxShadowPx, (L / 13.5) * maxShadowPx);
    ctx.strokeStyle = "rgba(201,162,39,0.85)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(biaoX, groundY);
    ctx.lineTo(biaoX + shadowPx, groundY);
    ctx.stroke();
    // 太阳
    const sunR = 14;
    const altVis = Math.min(70, alpha) * D2R; // 视觉压缩
    const sunX = biaoX + Math.cos(altVis) * 170;
    const sunY = groundY - biaoH - Math.sin(altVis) * 170 + 40;
    ctx.fillStyle = "#fce1b6";
    ctx.shadowColor = "rgba(252,225,182,0.9)";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(sunX, Math.max(24, sunY), sunR, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // 阳光线
    ctx.strokeStyle = "rgba(252,225,182,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.max(24, sunX) - sunR, Math.max(24, sunY));
    ctx.lineTo(biaoX, groundY - biaoH);
    ctx.stroke();
    // 标注
    ctx.fillStyle = "#fce1b6";
    ctx.font = '13px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(`表高 八尺`, biaoX + 8, groundY - biaoH - 8);
    ctx.fillText(`影长 ${L.toFixed(2)} 尺`, biaoX + shadowPx / 2 - 30, groundY + 24);

    // ---- 右：全年影长曲线 ----
    const cx0 = sceneW + 16, cx1 = W - 18;
    const cy0 = 26, cy1 = H - 44;
    ctx.strokeStyle = "rgba(175,145,95,0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(cx0, cy0, cx1 - cx0, cy1 - cy0);
    // 曲线
    const lMax = 13.5;
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let d = 1; d <= 365; d++) {
      const x = cx0 + ((d - 1) / 364) * (cx1 - cx0);
      const y = cy0 + (shadowLen(d) / lMax) * (cy1 - cy0);
      if (d === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // 节气刻度
    ctx.fillStyle = "rgba(252,225,182,0.75)";
    ctx.font = '10px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = "center";
    for (let i = 0; i < 24; i++) {
      const td = (DONGZHI_DAY + i * 15.22) % 365;
      const x = cx0 + (td / 364) * (cx1 - cx0);
      ctx.fillRect(x, cy1, 1, 5);
      if (i % 6 === 0) ctx.fillText(TERMS[i], x, cy1 + 18);
    }
    // 当日标记
    const dx = cx0 + ((day - 1) / 364) * (cx1 - cx0);
    const dy = cy0 + (L / lMax) * (cy1 - cy0);
    ctx.fillStyle = "#fce1b6";
    ctx.beginPath();
    ctx.arc(dx, dy, 4, 0, Math.PI * 2);
    ctx.fill();

    // 读数
    const term = nearestTerm(day);
    rd.textContent =
      `第 ${day} 天 · 正午太阳高度 ${alpha.toFixed(1)}° · 影长 ${L.toFixed(2)} 尺 · ` +
      (term.offset === 0 ? `正值【${term.name}】` : `近【${term.name}】±${term.offset} 天`);
  }

  let day = Number(slider.value);
  draw(day);
  slider.addEventListener("input", () => {
    day = Number(slider.value);
    draw(day);
  });
  cv.addEventListener("pointerdown", (e) => {
    const rect = cv.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (cv.width / rect.width);
    const cx0 = cv.width * 0.44 + 16, cx1 = cv.width - 18;
    if (x >= cx0) {
      day = Math.round(1 + ((x - cx0) / (cx1 - cx0)) * 364);
      slider.value = String(Math.min(365, Math.max(1, day)));
      draw(day);
    }
  });
}

/** 章节激活时压暗背景星图，聚焦圭表。 */
export function updateGnomon(view: SkyView): void {
  view.showLines = false;
  view.dimStarAlpha = 0.12;
  view.revealAlpha = () => 0;
  view.highlight = null;
  view.labels = [];
  view.freeExplore = false;
}
