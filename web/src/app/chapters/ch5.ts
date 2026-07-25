/**
 * ch5 揽星为球：穿出到球外 r≈3R（全场高潮），把平面的星图团回一颗球。
 *
 * 浑天仪环架（ArmillarySphere，不随天球旋转的「仪器」部件）在章内完成
 * 「收拢/错开 → 依次归位」的组装动画（前 55% 行程），后段赤道环与
 * 黄道环缓慢自旋展示黄赤交角。相机由 CameraRig.CHAPTER_KEYS[4] 插值
 * （球外 3R、orbit 开启，用户可拖拽环绕），本章只驱动环架与面板。
 *
 * 生命周期：enter 创建环架并 addSkyObject({ rotateWithSky: false }) +
 * gsap 渐入；update(p) 纯变换写入；exit removeSkyObject 并 dispose
 * 全部 geometry/material（防泄漏，重新进入时重建）。
 */
import { gsap } from "gsap";
import type { Chapter, ChapterCtx } from "../chapters";
import { createArmillarySphere, type ArmillarySphere } from "./ArmillarySphere";

/** 前 55% 行程为四环组装，之后为自旋展示 */
const ASSEMBLY_END = 0.55;
/** 自旋展示总行程（弧度），缓慢为宜 */
const SPIN_TRAVEL = 0.9;
/** enter 渐入时长（秒） */
const FADE_IN_S = 1.2;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function createChapter(ctx: ChapterCtx): Chapter {
  const { copy } = ctx;

  // 文本面板靠左（复用 app.css 的 .chapter-panel 系列样式与 .inview 渐入）
  const el = document.createElement("div");
  el.className = "chapter-panel chapter-panel--left";
  el.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${escapeHtml(copy.title)}</h2>
      ${copy.seal ? `<div class="seal">${escapeHtml(copy.seal)}</div>` : ""}
    </div>
    <p class="hook">${escapeHtml(copy.hook)}</p>
    ${copy.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
  `;
  ctx.root.querySelector(".pin")!.appendChild(el);

  let sphere: ArmillarySphere | null = null;
  let lastP = 0;
  const fade = { v: 0 };

  /** 章内进度 → 环架姿态（纯变换写入，可高频调用） */
  function applyProgress(p: number): void {
    if (!sphere) return;
    sphere.setAssembly(Math.min(p / ASSEMBLY_END, 1));
    const spinT = Math.max(0, (p - ASSEMBLY_END) / (1 - ASSEMBLY_END));
    sphere.setSpin(spinT * SPIN_TRAVEL);
  }

  return {
    enter() {
      ctx.root.classList.add("inview");
      if (!sphere) {
        sphere = createArmillarySphere();
        // 环架是仪器，不随天球旋转（岁差/季节只转 skyRoot）
        ctx.sky.addSkyObject(sphere.group, { rotateWithSky: false });
        applyProgress(lastP); // 回滚进入时先对齐当前进度，再淡入
      }
      gsap.to(fade, {
        v: 1,
        duration: FADE_IN_S,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => sphere?.setFade(fade.v),
      });
    },
    update(p) {
      lastP = p;
      applyProgress(p);
    },
    exit() {
      ctx.root.classList.remove("inview");
      gsap.killTweensOf(fade);
      fade.v = 0;
      if (sphere) {
        ctx.sky.removeSkyObject(sphere.group);
        sphere.dispose();
        sphere = null;
      }
    },
  };
}
