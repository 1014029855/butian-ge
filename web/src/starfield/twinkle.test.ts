import { describe, it, expect } from "vitest";
import { mulberry32 } from "./rng";
import { makeTwinkleParams, twinkleOpacity } from "./twinkle";

describe("闪烁引擎", () => {
  it("同一种子生成同一参数（确定性）", () => {
    expect(makeTwinkleParams(mulberry32(42))).toEqual(makeTwinkleParams(mulberry32(42)));
  });
  it("参数在规格区间内", () => {
    for (let seed = 0; seed < 200; seed++) {
      const p = makeTwinkleParams(mulberry32(seed));
      expect(p.duration).toBeGreaterThanOrEqual(2.4);
      expect(p.duration).toBeLessThanOrEqual(7.6);
      expect(p.omin).toBeGreaterThanOrEqual(0.05);
      expect(p.omin).toBeLessThanOrEqual(0.26);
      expect(p.omax).toBeGreaterThanOrEqual(0.13);
      expect(p.omax).toBeLessThanOrEqual(0.94);
      expect(p.omax).toBeGreaterThan(p.omin);
    }
  });
  it("透明度在 [omin, omax] 内周期变化", () => {
    const p = makeTwinkleParams(mulberry32(7));
    let lo = 1, hi = 0;
    for (let t = 0; t < p.duration; t += 0.01) {
      const o = twinkleOpacity(p, t);
      lo = Math.min(lo, o);
      hi = Math.max(hi, o);
      expect(o).toBeGreaterThanOrEqual(p.omin - 1e-9);
      expect(o).toBeLessThanOrEqual(p.omax + 1e-9);
    }
    expect(hi - lo).toBeGreaterThan((p.omax - p.omin) * 0.95);
  });
});
