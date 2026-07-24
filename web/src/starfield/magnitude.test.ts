import { describe, it, expect } from "vitest";
import { magToRadius, magToAlpha } from "./magnitude";

describe("星等映射", () => {
  it("越亮半径越大", () => {
    expect(magToRadius(-1)).toBeGreaterThan(magToRadius(2));
    expect(magToRadius(2)).toBeGreaterThan(magToRadius(6.2));
  });
  it("边界值", () => {
    expect(magToRadius(-1)).toBeCloseTo(2.6, 1);
    expect(magToRadius(6.2)).toBeCloseTo(0.9, 1);
    expect(magToRadius(10)).toBeCloseTo(0.9, 1); // clamp
  });
  it("透明度区间 [0.35, 1] 且亮星更实", () => {
    expect(magToAlpha(-1)).toBeCloseTo(1, 5);
    expect(magToAlpha(6.2)).toBeCloseTo(0.35, 5);
    expect(magToAlpha(2)).toBeGreaterThan(magToAlpha(5));
  });
});
