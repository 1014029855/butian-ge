/**
 * 定制星光光标：画布区内替代系统箭头（#sky-canvas 上 cursor: none）。
 *
 * 形态：金色细环 + 中心光点，古籍金泥气质；环带一点迟滞跟随（0.22 阻尼），
 * 光点即时贴手。反馈：
 *   - 悬停到星点（.sky-tooltip 显示）→ 环收紧、描边提亮（「抓到了」的手感）；
 *   - 按下拖拽 → 环再收一档并降低透明度，避免干扰；
 *   - 移出画布 / 落在交互控件（滑杆、链接、详情卡）上 → 隐藏金环，系统光标回归
 *     （cursor: none 只挂在画布上，控件上原生光标天然可用）。
 *
 * 仅在精密指针（鼠标）下启用；触屏（pointer: coarse）不初始化。
 * 样式模块内注入（.app-cursor-*），不改 app.css（画布的 cursor:none 除外）。
 */

const RING_SIZE = 30;
const RING_LERP = 0.22;

const CSS = `
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${RING_SIZE}px; height: ${RING_SIZE}px;
  border: 1px solid rgba(201, 162, 39, 0.75);
  box-shadow: 0 0 12px rgba(201, 162, 39, 0.28), inset 0 0 8px rgba(201, 162, 39, 0.12);
  transition: border-color 0.18s ease-out, box-shadow 0.18s ease-out, opacity 0.25s ease-out;
}
.app-cursor-dot {
  width: 4px; height: 4px;
  background: #f2dd9a;
  box-shadow: 0 0 6px rgba(242, 221, 154, 0.9);
  transition: opacity 0.25s ease-out;
}
.app-cursor-ring.is-star {
  border-color: rgba(242, 221, 154, 0.95);
  box-shadow: 0 0 18px rgba(201, 162, 39, 0.55), inset 0 0 10px rgba(242, 221, 154, 0.25);
}
.app-cursor-ring.is-down { opacity: 0.45; }
.app-cursor-hidden { opacity: 0 !important; }
`;

export function createCursor(canvas: HTMLCanvasElement): void {
  if (window.matchMedia("(pointer: coarse)").matches) return; // 触屏无光标

  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const ring = document.createElement("div");
  ring.className = "app-cursor-ring app-cursor-hidden";
  const dot = document.createElement("div");
  dot.className = "app-cursor-dot app-cursor-hidden";
  document.body.append(ring, dot);

  let mx = -100;
  let my = -100; // 光标位置（光点即时跟随）
  let rx = -100;
  let ry = -100; // 环位置（阻尼跟随）
  let visible = false;
  let down = false;
  const tip = document.querySelector<HTMLElement>(".sky-tooltip");

  window.addEventListener("pointermove", (e) => {
    // 只有落在画布上才显示定制光标；控件（滑杆/链接/详情卡）恢复系统光标
    const onCanvas = e.target === canvas;
    mx = e.clientX;
    my = e.clientY;
    if (onCanvas !== visible) {
      visible = onCanvas;
      ring.classList.toggle("app-cursor-hidden", !visible);
      dot.classList.toggle("app-cursor-hidden", !visible);
    }
  });
  window.addEventListener("pointerdown", () => {
    down = true;
    ring.classList.add("is-down");
  });
  window.addEventListener("pointerup", () => {
    down = false;
    ring.classList.remove("is-down");
  });
  document.documentElement.addEventListener("mouseleave", () => {
    visible = false;
    ring.classList.add("app-cursor-hidden");
    dot.classList.add("app-cursor-hidden");
  });

  let ringScale = 1;
  const loop = (): void => {
    // 环阻尼跟随；光点即时贴手
    rx += (mx - rx) * RING_LERP;
    ry += (my - ry) * RING_LERP;
    // 目标缩放：悬停星点收紧，按下再收一档
    const onStar = tip !== null && tip.style.display === "block";
    const target = (onStar ? 0.55 : 1) * (down ? 0.8 : 1);
    ringScale += (target - ringScale) * 0.2;
    ring.classList.toggle("is-star", onStar);
    ring.style.transform = `translate(${rx - RING_SIZE / 2}px, ${ry - RING_SIZE / 2}px) scale(${ringScale.toFixed(3)})`;
    dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
