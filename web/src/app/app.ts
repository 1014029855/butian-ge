/**
 * 「步天歌」正式站入口（P2 骨架）。
 *
 * 启动顺序：
 *   1. WebGL 能力检测（webgl2 || webgl），失败则显示 #fallback 降级页并停止；
 *   2. new SkyApp(canvas) → init() 加载星表；
 *   3. CameraRig（八章关键帧）+ setupChapters 接 ScrollTrigger scrub 段；
 *   4. 渲染循环：对相机总进度 g（章节序号 + 章内进度）做阻尼，
 *      rig.sampleGlobal(g) → sky.applyCameraState → 渲染。
 *
 * 章节 onUpdate 只在各自 ScrollTrigger 区间内触发；两章之间的 100vh
 * 空白区相机停在「下一章关键帧」上（rig 在上一章末段已完成过渡），无跳变。
 */
import "./app.css";
import { initAmbient } from "./ambient";
import { CameraRig, CHAPTER_KEYS } from "./CameraRig";
import { setupChapters } from "./chapters";
import { createCursor } from "./cursor";
import { createMilkyWay } from "./MilkyWay";
import { createPager } from "./pager";
import { R, SkyApp } from "./SkyApp";

/** 相机总进度阻尼系数（/秒），越大跟手越快 */
const CAMERA_DAMP = 3.5;

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function showFallback(reason: string): void {
  const fallback = document.getElementById("fallback");
  if (fallback) fallback.hidden = false;
  const diag = document.getElementById("fallback-diag");
  if (diag) diag.textContent = `诊断信息：${reason}`;
  document.getElementById("chapters")?.setAttribute("hidden", "");
  document.getElementById("sky-canvas")?.setAttribute("hidden", "");
  document.getElementById("loading")?.remove();
}

async function boot(): Promise<void> {
  const canvas = document.getElementById("sky-canvas") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("缺少 #sky-canvas");

  const sky = new SkyApp(canvas);
  createCursor(canvas); // 定制星光光标（画布区替代系统箭头；触屏自动跳过）
  const loadingEl = document.getElementById("loading");
  try {
    await sky.init();
  } catch (err) {
    console.error(err);
    if (loadingEl) loadingEl.textContent = "星空数据加载失败，请检查开发服务器";
    return;
  }
  loadingEl?.remove();

  // 程序生成银河带（永久挂载，随天球刚体旋转）与环境音开关（默认静音）
  sky.addSkyObject(createMilkyWay(R).group);
  initAmbient();

  const rig = new CameraRig(CHAPTER_KEYS);

  // 右下角翻页器（上一章/下一章 + 当前章指示，手机与桌面通用）；
  // 须在 setupChapters 之前创建——ScrollTrigger 建章时可能同步回调 onCameraProgress
  const PAGER_SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => document.getElementById(`ch${i}`)!);
  const PAGER_NAMES = ["序", "星野", "授时", "天人", "天球", "岁差", "对话", "尾声"] as const;
  const pager = createPager({ sections: PAGER_SECTIONS, names: PAGER_NAMES });

  // 相机总进度：目标值由章节 ScrollTrigger 上报，当前值在渲染循环中阻尼趋近
  let camTarget = 0;
  let camCurrent = 0;
  const { chapters } = setupChapters(sky, (g) => {
    camTarget = g;
    pager.setCurrent(Math.min(Math.floor(g), PAGER_NAMES.length - 1));
  });

  sky.start((dt) => {
    camCurrent += (camTarget - camCurrent) * (1 - Math.exp(-dt * CAMERA_DAMP));
    sky.applyCameraState(rig.sampleGlobal(camCurrent));
    // 活动章节的每帧钩子（applyCameraState 之后调用，段内脚本注视不被覆写）
    const active = Math.min(Math.max(Math.floor(camCurrent), 0), chapters.length - 1);
    chapters[active]?.frame?.(dt);
  });
}

if (!webglAvailable()) {
  showFallback("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
} else {
  boot().catch((err: unknown) => {
    console.error(err);
    showFallback(err instanceof Error ? err.message : String(err));
  });
}
