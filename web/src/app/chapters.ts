/**
 * 章节系统：统一生命周期接口 + 注册表 + ScrollTrigger 接线。
 *
 * 每章一个模块（chapters/chN.ts），导出 createChapter(ctx)。ctx 提供：
 *   - sky：SkyApp 高层 API（相机 setter、setGroupProgress、拾取开关、onPick…）
 *   - root：章节根元素（<section id="chN">），章内 DOM 由章节模块自建
 *   - copy：本章文案（COPY[chN]）
 *   - id：章节 id（"ch1" ~ "ch8"）
 *
 * ScrollTrigger 每章一个 scrub 段：start "top top" / end "bottom bottom"
 * （与 CSS sticky 的 pin 区间严格重合），回调 enter/update(p)/exit：
 *   - onEnter / onEnterBack → enter()
 *   - onUpdate → update(self.progress)，并把 (章节序号 + 进度) 上报给
 *     相机总线（onCameraProgress），由渲染循环阻尼后驱动 CameraRig；
 *   - onLeave / onLeaveBack → exit()
 *
 * 「如何写一章」（最小示例）：
 *   import type { Chapter, ChapterCtx } from "../chapters";
 *   export function createChapter(ctx: ChapterCtx): Chapter {
 *     const el = document.createElement("div");
 *     el.className = "chapter-panel";
 *     el.innerHTML = `<p class="eyebrow">${ctx.copy.eyebrow}</p><h2>${ctx.copy.title}</h2>`;
 *     ctx.root.querySelector(".pin")!.appendChild(el);
 *     return {
 *       enter() { ctx.sky.setLabelsEnabled(true); },
 *       update(p) { ctx.sky.setGroupProgress("北斗", p); },
 *       exit() { ctx.sky.hideDetailCard(); },
 *     };
 *   }
 * 然后在下方 CHAPTER_DEFS 注册。相机状态不进 enter/update——
 * 相机由 CameraRig 的 CHAPTER_KEYS 按章节进度自动插值。
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { riseIn } from "./blockReveal";
import { COPY, type ChapterCopy } from "./copy";
import type { SkyApp } from "./SkyApp";

gsap.registerPlugin(ScrollTrigger);

/** 章节标题拆字入场：进入章节时 h2 逐字上滑（overflow 遮罩，hop 手感） */
function riseChapterTitles(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLElement>(".chapter-panel h2, .atlas-panel h2")
    .forEach((h) => riseIn(h));
}

export interface ChapterCtx {
  sky: SkyApp;
  /** 章节根元素（<section id="chN">）；章内可视内容挂到 root.querySelector(".pin") 下 */
  root: HTMLElement;
  copy: ChapterCopy;
  id: string;
}

export interface Chapter {
  /** 进入本章区间（两个方向都会触发） */
  enter(): void;
  /** 本章局部进度 p∈[0,1]（scrub 驱动，可能高频调用，避免重活） */
  update(p: number): void;
  /** 离开本章区间（两个方向都会触发） */
  exit(): void;
  /**
   * 可选每帧钩子：在主循环 applyCameraState 之后、渲染之前调用
   * （仅此窗口内 setGazeBlend 等相机微调不会被 rig 覆写——段内
   * 脚本注视用，如 ch2 段1 的诗句巡游）。dt 单位秒。
   */
  frame?(dt: number): void;
}

export type ChapterFactory = (ctx: ChapterCtx) => Chapter;

interface ChapterDef {
  id: string;
  create: ChapterFactory;
}

/**
 * 章节注册表：由 import.meta.glob 自动发现 chapters/chN.ts（须导出
 * 具名 createChapter），按文件名数字序排列，必须与 index.html 的
 * section 顺序一致。新增/重写一章只需动对应 chN.ts，无需改本文件。
 */
const chapterModules = import.meta.glob<{ createChapter: ChapterFactory }>(
  "./chapters/ch*.ts",
  { eager: true },
);
export const CHAPTER_DEFS: readonly ChapterDef[] = Object.keys(chapterModules)
  .map((path) => {
    const m = path.match(/\/(ch\d+)\.ts$/);
    return m ? { id: m[1], num: parseInt(m[1].slice(2), 10), create: chapterModules[path].createChapter } : null;
  })
  .filter((d): d is ChapterDef & { num: number } => d !== null)
  .sort((a, b) => a.num - b.num);

export interface SetupResult {
  chapters: Chapter[];
  triggers: ScrollTrigger[];
  /**
   * 活动章生命周期管理器（每帧按 scrollY 调用）。
   *
   * 为什么不用 ScrollTrigger 的 onEnter/onLeave：Lenis 平滑滚动与翻页器
   * 瞬时跳章场景下，ST 的 enter/leave 回调在大幅跨越时会漏 fire（只补
   * onUpdate），导致章节 enter() 的天空状态切换与 .inview 入场失效。
   * 生命周期改由本管理器按滚动位置推导——幂等、与滚动方式无关
   * （Lenis / 原生 / instant 跳章 / F5 滚动恢复，全部收敛正确）。
   * ScrollTrigger 只保留 onUpdate 上报 scrub 进度。
   */
  syncActive(y: number): void;
}

/**
 * 为全部章节创建实例并接 ScrollTrigger。
 * onCameraProgress(g)：g = 章节序号 + 章内进度（范围 [0, 章数]），
 * 由 app 主循环阻尼后交给 CameraRig.sampleGlobal。
 */
export function setupChapters(
  sky: SkyApp,
  onCameraProgress: (g: number) => void,
): SetupResult {
  const chapters: Chapter[] = [];
  const triggers: ScrollTrigger[] = [];
  const sections: HTMLElement[] = [];
  /** 当前活动章序号；-1 = 尚未同步（首帧强制 enter，覆盖 F5 滚动恢复） */
  let activeIdx = -1;

  CHAPTER_DEFS.forEach((def, i) => {
    const root = document.getElementById(def.id);
    if (!root) throw new Error(`缺少章节容器 #${def.id}（检查 index.html）`);
    const copy = COPY[def.id];
    if (!copy) throw new Error(`COPY 缺少 ${def.id} 文案`);
    const chapter = def.create({ sky, root, copy, id: def.id });
    chapters.push(chapter);
    sections.push(root);

    triggers.push(
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // 生命周期回调刻意不接（见 syncActive 注释）；这里只上报 scrub 进度
        onUpdate: (self) => {
          chapter.update(self.progress);
          onCameraProgress(i + self.progress);
        },
      }),
    );
  });

  /** 活动章推导：最后一个个章顶已过视口顶的章（与 ST start "top top" 同义） */
  function syncActive(y: number): void {
    let idx = 0;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (y >= sections[i].offsetTop) {
        idx = i;
        break;
      }
    }
    if (idx === activeIdx) return;
    if (activeIdx >= 0) chapters[activeIdx].exit();
    activeIdx = idx;
    chapters[activeIdx].enter();
    riseChapterTitles(sections[activeIdx]);
  }

  return { chapters, triggers, syncActive };
}
