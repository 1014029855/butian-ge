/**
 * 渲染能力检测。
 *
 * 本站星图渲染以 Canvas 2D 为主，不依赖 WebGL/WebGPU；但以下情况
 * getContext("2d") 仍可能返回 null 或绘制失败：
 *  - 隐私/指纹防护模式禁用 Canvas（如部分浏览器的反追踪设置）
 *  - 设备内存不足导致画布后端创建失败
 *  - 老旧 WebView
 * 因此启动时统一探测，失败则进入降级界面。
 * WebGL / WebGL2 / WebGPU 探测结果目前仅用于降级页诊断展示。
 */

export interface SupportReport {
  canvas2d: boolean;
  webgl: boolean;
  webgl2: boolean;
  webgpu: boolean;
}

type CanvasFactory = () => HTMLCanvasElement;

const defaultFactory: CanvasFactory = () => document.createElement("canvas");

/**
 * Canvas 2D 可用性：getContext 非空只是第一步——某些隐私模式会返回
 * 上下文对象但绘制或读回像素时抛异常/返回全 0，故做一次像素级写读验证。
 */
export function detectCanvas2d(create: CanvasFactory = defaultFactory): boolean {
  try {
    const c = create();
    c.width = 2;
    c.height = 2;
    const ctx = c.getContext("2d");
    if (!ctx) return false;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return d[3] === 255;
  } catch {
    return false;
  }
}

/**
 * WebGL / WebGL2 可用性。探测成功后立刻通过 WEBGL_lose_context 释放，
 * 避免占住宝贵的 GPU 上下文名额（浏览器对每页 WebGL 上下文数有限额）。
 */
export function detectWebGL(
  kind: "webgl" | "webgl2",
  create: CanvasFactory = defaultFactory,
): boolean {
  try {
    const c = create();
    // 分写两个分支以命中 getContext 的字面量重载，拿到带 getExtension 的类型
    const gl =
      kind === "webgl2"
        ? c.getContext("webgl2", { failIfMajorPerformanceCaveat: false })
        : c.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** WebGPU 可用性：只查 navigator.gpu 是否存在，不异步请求 adapter。 */
export function detectWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

export function detectSupport(create: CanvasFactory = defaultFactory): SupportReport {
  return {
    canvas2d: detectCanvas2d(create),
    webgl: detectWebGL("webgl", create),
    webgl2: detectWebGL("webgl2", create),
    webgpu: detectWebGPU(),
  };
}
