/**
 * 自定义星光光标：四角星 + 引力环，lerp 跟随。
 * 悬停在可交互元素上时引力环扩张（hot）。
 * 触屏设备不启用。
 */
export function initCursor(): void {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const el = document.createElement("div");
  el.id = "cursor";
  el.setAttribute("aria-hidden", "true");
  const star = document.createElement("div");
  star.className = "cursor-star";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  el.appendChild(star);
  el.appendChild(ring);
  document.body.appendChild(el);
  document.body.classList.add("has-custom-cursor");

  let tx = -100;
  let ty = -100;
  let x = -100;
  let y = -100;

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
    },
    { passive: true },
  );

  (function loop(): void {
    requestAnimationFrame(loop);
    x += (tx - x) * 0.22;
    y += (ty - y) * 0.22;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  })();

  const HOT_SEL = "button, input, a, #compare-bar, #sky.interactive";
  window.addEventListener(
    "pointerover",
    (e) => {
      const t = e.target as Element | null;
      el.classList.toggle("hot", !!t && typeof t.closest === "function" && t.closest(HOT_SEL) !== null);
    },
    { passive: true },
  );
}
