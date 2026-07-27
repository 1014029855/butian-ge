/**
 * 平滑滚动（Lenis）· 全局单例。
 *
 * Awwwards 级滚动手感的基础层：滚轮输入由 Lenis 插值平滑（lerp 0.1），
 * 原生 scrollY 仍真实移动——ScrollTrigger / CSS sticky / 锚点全部兼容。
 * 与 GSAP 的官方集成：gsap.ticker 驱动 lenis.raf，滚动时同步
 * ScrollTrigger.update，lagSmoothing 关闭避免大跳。
 *
 * 触屏保持原生惯性（Lenis 默认 smoothTouch: false），不接管。
 */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll(): void {
  if (lenis) return;
  lenis = new Lenis({
    lerp: 0.1, // 插值系数：越小越绵，越大越跟手
    smoothWheel: true,
    wheelMultiplier: 1.0,
  });
  lenis.on("scroll", () => ScrollTrigger.update());
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/** 滚动到指定 y（px）。immediate=true 瞬时跳转（转场遮盖下换章用） */
export function scrollToY(y: number, immediate = false): void {
  if (lenis) {
    lenis.scrollTo(y, { immediate });
  } else {
    window.scrollTo({ top: y, behavior: immediate ? "instant" : "smooth" });
  }
}

/** 锁定/解锁滚动输入（Block Reveal 转场期间防用户滚轮穿帮） */
export function lockScroll(on: boolean): void {
  if (!lenis) return;
  if (on) lenis.stop();
  else lenis.start();
}
