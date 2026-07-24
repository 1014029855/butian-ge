import { describe, it, expect } from "vitest";
import { hitTestStar } from "./hitTest";

const stars = [{ x: 0, y: 0 }, { x: 0.1, y: 0 }, { x: 5, y: 5 }];

describe("命中检测", () => {
  it("返回最近星索引", () => {
    expect(hitTestStar(stars, 0.09, 0.01, 0.05)).toBe(1);
    expect(hitTestStar(stars, 0.01, -0.01, 0.05)).toBe(0);
  });
  it("超阈值返回 -1", () => {
    expect(hitTestStar(stars, 2, 2, 0.05)).toBe(-1);
  });
});
