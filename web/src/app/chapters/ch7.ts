/**
 * ch7 东西对话：中西星空连线对比。
 *
 * 相机在球外 r=3R 摆正（CameraRig.CHAPTER_KEYS[6]，本章不管相机）。
 * 进入本章：
 *   - 中国星官 309 组全部 setGroupProgress 补 1（完整星空打底）；
 *   - 异步加载西方星座连线（chapters/westernLines.ts），完成后
 *     addSkyObject（默认随天球刚体旋转）；加载失败仅告警，不影响其余交互；
 *   - setLabelsEnabled(false)（球外标签本就渐隐，这里关总闸防回显）。
 * 对比滑杆（底部居中，range 0~100，两端标注「中国星官 / 西方星座」）：
 *   t∈[0,1] → 中国组 progress = 1−t、西方 opacity = t。
 *   update(p) 前 AUTO_END（0.6）行程自动驱动一次 t:0→1 叠化（滑杆跟随联动，
 *   回滚可逆）；用户拖过滑杆或行程进入后 40% 后，滑杆归用户，本章不再驱动。
 * exit：西方星座线不瞬时撤场——0.6s 渐隐到 0 再 removeSkyObject + dispose，
 *   渐隐途中回滚入 ch7 由 enter 杀掉渐隐并 applyT(0) 恢复（对象保留不重载）；
 *   setLabelsEnabled(true)；中国组不瞬时恢复，
 *   而是从退场时的 1−t 由 GSAP 缓动补回 1（2.4s）——滚向 ch8 时金线随尾声
 *   面板渐入缓缓归来，避免「纯西方星空 → 中国星官瞬间补满」的闪回；
 *   回滚入 ch7 由 enter 杀掉补回动画并 applyT(0) 重置，双向均正确。
 *
 * 样式由本模块注入（沿用 Labels.ts 的做法），不改 app.css；
 * eyebrow / chapter-head / seal 复用 app.css 既有全局类。
 */
import * as THREE from "three";
import { gsap } from "gsap";
import type { Chapter, ChapterCtx } from "../chapters";
import { createWesternLines, type WesternLinesHandle } from "./westernLines";

/** 章内前 60% 行程自动驱动中西叠化 t:0→1，之后滑杆归用户 */
const AUTO_END = 0.6;

const CH7_CSS = `
.ch7-panel {
  position: absolute;
  left: 6vw;
  top: 10vh;
  max-width: 440px;
  background: rgba(13, 13, 17, 0.62);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 26px 28px;
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94)),
    transform 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94));
}
/* 描金双线：与全局面板同一语言 */
.ch7-panel::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 7px;
  pointer-events: none;
}
.inview .ch7-panel { opacity: 1; transform: translateY(0); }
.ch7-panel h2 {
  font-family: var(--font-display, "STSong", "SimSun", "Songti SC", serif);
  font-size: clamp(38px, 4.2vw, 52px);
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--gold, #c9a227);
  margin-bottom: 14px;
}
.ch7-panel p { font-size: 15px; line-height: 2.05; opacity: 0.88; }
.ch7-panel .hook {
  font-family: var(--font-display, "STSong", "SimSun", serif);
  font-size: 17px;
  letter-spacing: 0.08em;
  line-height: 1.9;
  color: var(--gold-dim, #af915f);
  opacity: 1;
  margin-bottom: 10px;
}

.ch7-compare {
  position: absolute;
  left: 50%;
  bottom: 7vh;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 22px;
  background: rgba(13, 13, 17, 0.62);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  pointer-events: auto; /* .chapter 层默认 pointer-events:none，滑杆需要交互 */
  opacity: 0;
  transition: opacity 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94));
}
.inview .ch7-compare { opacity: 1; }
.ch7-end { font-size: 12px; letter-spacing: 0.28em; white-space: nowrap; user-select: none; }
.ch7-end--cn { color: var(--gold, #c9a227); }
.ch7-end--west { color: #8fa8c8; }
.ch7-slider {
  -webkit-appearance: none;
  appearance: none;
  width: min(320px, 42vw);
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--gold, #c9a227), #8fa8c8);
  outline: none;
  cursor: pointer;
}
.ch7-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  border: 1px solid rgba(13, 13, 17, 0.9);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.45);
}
.ch7-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  border: 1px solid rgba(13, 13, 17, 0.9);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.45);
}

@media (max-width: 860px) {
  .ch7-panel { left: 5vw; right: 5vw; max-width: none; }
  .ch7-compare { gap: 10px; padding: 12px 16px; }
  .ch7-end { letter-spacing: 0.14em; }
}
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.ch7 = "";
  el.textContent = CH7_CSS;
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

function smooth(x: number): number {
  x = THREE.MathUtils.clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
}

export function createChapter(ctx: ChapterCtx): Chapter {
  injectStyle();
  const pin = ctx.root.querySelector(".pin")!;
  const { copy } = ctx;

  // 文本区（靠左上）：eyebrow / chapter-head / seal 复用 app.css 全局类
  const panel = document.createElement("div");
  panel.className = "ch7-panel";
  panel.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="hook">${escapeHtml(copy.hook)}</p>
    ${copy.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
  `;
  pin.appendChild(panel);

  // 对比滑杆（底部居中）：左端中国星官（金），右端西方星座（银蓝）
  const cmp = document.createElement("div");
  cmp.className = "ch7-compare";
  cmp.innerHTML = `
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `;
  pin.appendChild(cmp);
  const slider = cmp.querySelector<HTMLInputElement>(".ch7-slider")!;

  let western: WesternLinesHandle | null = null;
  let loadGen = 0; // 加载代际：exit 时 ++，迟到的加载结果直接 dispose
  let t = 0; // 叠化参数：0 = 纯中国星官，1 = 纯西方星座
  let userDriven = false; // 用户拖过滑杆后，自动叠化让位（本章访问内有效）
  let fadeBack: gsap.core.Tween | null = null; // exit 后的中国组补回动画（enter 时必须杀掉）
  let fadeOut: gsap.core.Tween | null = null; // exit 后的西方线渐隐动画（enter 时必须杀掉）

  function setAllGroups(v: number): void {
    const n = ctx.sky.groupCount;
    for (let i = 0; i < n; i++) ctx.sky.setGroupProgress(i, v);
  }

  function applyT(v: number): void {
    t = THREE.MathUtils.clamp(v, 0, 1);
    setAllGroups(1 - t);
    western?.setOpacity(t);
    slider.value = String(Math.round(t * 100)); // 滑杆跟随联动
  }

  slider.addEventListener("input", () => {
    userDriven = true;
    applyT(Number(slider.value) / 100);
  });

  return {
    enter() {
      ctx.root.classList.add("inview");
      ctx.sky.setLabelsEnabled(false);
      // 杀掉退场动画（中国组补回 / 西方线渐隐），避免与 applyT 抢写（回滚路径）
      fadeBack?.kill();
      fadeBack = null;
      fadeOut?.kill();
      fadeOut = null;
      // 完整中国星空打底：309 星官全部点亮，叠化从 t=0 重新开始
      userDriven = false;
      applyT(0);
      // 渐隐途中回滚：西方线对象仍在（未 dispose），直接复用不重载
      if (western) return;
      // 西方星座线异步加载（数据就绪后挂载，随天球旋转）
      const gen = ++loadGen;
      createWesternLines()
        .then((w) => {
          if (gen !== loadGen) {
            w.dispose(); // 加载期间已离开本章，直接释放
            return;
          }
          western = w;
          ctx.sky.addSkyObject(w.group); // 默认 rotateWithSky=true
          w.setOpacity(t);
        })
        .catch((err: unknown) => console.warn("[ch7] 西方星座数据加载失败：", err));
    },
    update(p) {
      // 用户已接管则完全不再驱动；前 60% 行程自动叠化（scrub 回滚可逆），
      // 之后确保停在 t=1，滑杆交还用户。
      if (userDriven) return;
      if (p >= AUTO_END) {
        if (t !== 1) applyT(1);
        return;
      }
      applyT(smooth(p / AUTO_END));
    },
    exit() {
      ctx.root.classList.remove("inview");
      ++loadGen; // 作废在途加载
      // 西方星座线不瞬时撤场：0.6s 渐隐到 0 再移除 dispose（渐隐途中回滚
      // 由 enter 杀 fadeOut + applyT(0) 恢复，对象保留复用，双向安全）
      fadeOut?.kill();
      if (western) {
        const w = western;
        const driver = { v: t }; // 当前不透明度 = 叠化参数 t（applyT 唯一写入）
        fadeOut = gsap.to(driver, {
          v: 0,
          duration: 0.6,
          ease: "sine.inOut",
          onUpdate: () => w.setOpacity(driver.v),
          onComplete: () => {
            ctx.sky.removeSkyObject(w.group);
            w.dispose();
            if (western === w) western = null;
            fadeOut = null;
          },
        });
      }
      // 中国组不瞬时恢复：从退场时的 1−t 缓动补回 1，滚向 ch8 时金线随
      // 尾声面板渐入缓缓归来（回滚入 ch7 由 enter 杀动画 + applyT(0) 重置）
      fadeBack?.kill();
      const driver = { v: 1 - t };
      fadeBack = gsap.to(driver, {
        v: 1,
        duration: 2.4,
        ease: "sine.inOut",
        onUpdate: () => setAllGroups(driver.v),
      });
      ctx.sky.setLabelsEnabled(true); // 标签总开关复位
    },
  };
}
