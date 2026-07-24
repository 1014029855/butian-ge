import { describe, expect, it } from "vitest";
import { detectCanvas2d, detectWebGL, detectWebGPU, detectSupport } from "./support";

function fakeCanvas(ctx: unknown): HTMLCanvasElement {
  return {
    width: 0,
    height: 0,
    getContext: () => ctx,
  } as unknown as HTMLCanvasElement;
}

function throwingCanvas(): HTMLCanvasElement {
  return {
    getContext: () => {
      throw new Error("canvas disabled");
    },
  } as unknown as HTMLCanvasElement;
}

const ok2d = {
  fillStyle: "",
  fillRect: () => {},
  getImageData: () => ({ data: new Uint8ClampedArray([255, 255, 255, 255]) }),
};

const zeroAlpha2d = {
  fillStyle: "",
  fillRect: () => {},
  // 反追踪模式：绘制"成功"但读回全 0
  getImageData: () => ({ data: new Uint8ClampedArray([0, 0, 0, 0]) }),
};

const okGL = {
  getExtension: () => ({ loseContext: () => {} }),
};

describe("detectCanvas2d", () => {
  it("上下文创建失败 → false", () => {
    expect(detectCanvas2d(() => fakeCanvas(null))).toBe(false);
  });
  it("getContext 抛异常（隐私模式）→ false", () => {
    expect(detectCanvas2d(throwingCanvas)).toBe(false);
  });
  it("绘制并读回像素成功 → true", () => {
    expect(detectCanvas2d(() => fakeCanvas(ok2d))).toBe(true);
  });
  it("绘制被静默拦截（读回全 0）→ false", () => {
    expect(detectCanvas2d(() => fakeCanvas(zeroAlpha2d))).toBe(false);
  });
});

describe("detectWebGL", () => {
  it("上下文可用 → true，且调用 loseContext 释放", () => {
    let lost = false;
    const gl = { getExtension: () => ({ loseContext: () => { lost = true; } }) };
    expect(detectWebGL("webgl", () => fakeCanvas(gl))).toBe(true);
    expect(lost).toBe(true);
  });
  it("上下文不可用 → false", () => {
    expect(detectWebGL("webgl2", () => fakeCanvas(null))).toBe(false);
  });
  it("getContext 抛异常 → false", () => {
    expect(detectWebGL("webgl", throwingCanvas)).toBe(false);
  });
  it("上下文可用但无 lose 扩展 → 仍为 true", () => {
    expect(detectWebGL("webgl2", () => fakeCanvas(okGL))).toBe(true);
    expect(detectWebGL("webgl", () => fakeCanvas({ getExtension: () => null }))).toBe(true);
  });
});

describe("detectWebGPU", () => {
  it("node 测试环境无 navigator.gpu → false", () => {
    expect(detectWebGPU()).toBe(false);
  });
});

describe("detectSupport", () => {
  it("汇总四类能力", () => {
    const report = detectSupport(() => fakeCanvas(ok2d));
    // 2d 探测通过；webgl 探测拿到的是 2d mock（无 getExtension）→ 走 catch → false
    expect(report.canvas2d).toBe(true);
    expect(report.webgl).toBe(false);
    expect(report.webgpu).toBe(false);
  });
  it("全部失败时全 false", () => {
    const report = detectSupport(throwingCanvas);
    expect(report.canvas2d).toBe(false);
    expect(report.webgl).toBe(false);
    expect(report.webgl2).toBe(false);
  });
});
