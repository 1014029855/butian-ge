import type { LayoutAsterism } from "../starfield/renderer";

/** 在点击位置旁展示星官详情卡，自动防出屏。 */
export function showDetailCard(
  el: HTMLElement,
  asterism: LayoutAsterism,
  screenPos: { x: number; y: number },
): void {
  const names = asterism.memberNames.slice(0, 8);
  el.innerHTML = `
    <h2>${asterism.name}</h2>
    <p class="meta">${asterism.memberNames.length} 颗成员星 · 星官 #${asterism.id}</p>
    <ul>${names.map((n) => `<li>${n}</li>`).join("")}</ul>
    ${asterism.memberNames.length > 8 ? `<p class="meta">… 等 ${asterism.memberNames.length} 星</p>` : ""}
  `;
  el.hidden = false;
  const rect = el.getBoundingClientRect();
  let left = screenPos.x + 18;
  let top = screenPos.y - 20;
  if (left + rect.width > window.innerWidth - 12) left = screenPos.x - rect.width - 18;
  if (top + rect.height > window.innerHeight - 12) top = window.innerHeight - rect.height - 12;
  if (top < 12) top = 12;
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

export function hideDetailCard(el: HTMLElement): void {
  el.hidden = true;
}
