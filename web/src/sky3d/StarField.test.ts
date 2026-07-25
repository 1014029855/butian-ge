import { describe, it, expect } from "vitest";
import { twinkleParams, ciToColor } from "./StarField";

describe("twinkleParams 逐星闪烁参数", () => {
  it("同一 hip 确定性一致", () => {
    expect(twinkleParams(118322)).toEqual(twinkleParams(118322));
    expect(twinkleParams(1)).toEqual(twinkleParams(1));
  });
  it("不同 hip 生成不同参数", () => {
    expect(twinkleParams(1)).not.toEqual(twinkleParams(2));
  });
  it("周期落在 2.4~7.6s，相位 0~1，振幅克制（≤18%）", () => {
    for (let hip = 1; hip <= 500; hip++) {
      const p = twinkleParams(hip);
      const period = 1 / p.freq;
      expect(period).toBeGreaterThanOrEqual(2.4 - 1e-9);
      expect(period).toBeLessThanOrEqual(7.6 + 1e-9);
      expect(p.phase).toBeGreaterThanOrEqual(0);
      expect(p.phase).toBeLessThan(1);
      expect(p.amp).toBeGreaterThanOrEqual(0.05 - 1e-9);
      expect(p.amp).toBeLessThanOrEqual(0.18 + 1e-9);
    }
  });
});

describe("ciToColor B-V 黑体色", () => {
  it("ci 缺失 / null / 非有限数回退中性白", () => {
    expect(ciToColor(null)).toEqual([1, 1, 1]);
    expect(ciToColor(undefined)).toEqual([1, 1, 1]);
    expect(ciToColor(NaN)).toEqual([1, 1, 1]);
    expect(ciToColor(Infinity)).toEqual([1, 1, 1]);
  });
  it("蓝端（B-V=-0.4）蓝分量最强", () => {
    const [r, g, b] = ciToColor(-0.4);
    expect(b).toBeGreaterThan(g);
    expect(g).toBeGreaterThan(r);
  });
  it("白点（B-V=0.65）近似中性白", () => {
    const [r, g, b] = ciToColor(0.65);
    expect(r).toBeCloseTo(1, 10);
    expect(g).toBeCloseTo(1, 10);
    expect(b).toBeCloseTo(1, 10);
  });
  it("红端（B-V=2.0）红分量最强", () => {
    const [r, g, b] = ciToColor(2.0);
    expect(r).toBeGreaterThan(g);
    expect(g).toBeGreaterThan(b);
  });
  it("越界钳制到 [-0.4, 2.0]", () => {
    expect(ciToColor(-9)).toEqual(ciToColor(-0.4));
    expect(ciToColor(9)).toEqual(ciToColor(2.0));
  });
  it("饱和度克制：全区间各通道不偏离白色超过 ~35% 档", () => {
    for (let ci = -0.4; ci <= 2.0; ci += 0.05) {
      for (const c of ciToColor(ci)) {
        expect(c).toBeGreaterThan(0.6);
        expect(c).toBeLessThanOrEqual(1.0 + 1e-9);
      }
    }
  });
});
