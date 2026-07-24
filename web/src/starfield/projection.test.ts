import { describe, it, expect } from "vitest";
import { project } from "./projection";

describe("北天极方位等距投影", () => {
  it("天极投影为原点", () => {
    const p = project(0, 90);
    expect(p.x).toBeCloseTo(0, 10);
    expect(p.y).toBeCloseTo(0, 10);
  });
  it("赤道上 ra=0 的星距极 π/2，位于 -y 方向", () => {
    const p = project(0, 0);
    expect(p.x).toBeCloseTo(0, 10);
    expect(p.y).toBeCloseTo(-Math.PI / 2, 10);
  });
  it("角距保真：dec=60 的星距极 π/6", () => {
    const p = project(123.4, 60);
    expect(Math.hypot(p.x, p.y)).toBeCloseTo(Math.PI / 6, 10);
  });
  it("方位角保真：同 dec 不同 ra 的星角距相同、方向随 ra 顺时针旋转", () => {
    const a = project(0, 30);
    const b = project(90, 30);
    expect(Math.hypot(b.x, b.y)).toBeCloseTo(Math.hypot(a.x, a.y), 10);
    expect(b.x).toBeCloseTo(-a.y, 6); // 顺时针 90°
    expect(b.y).toBeCloseTo(a.x, 6);
  });
});
