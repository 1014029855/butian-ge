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

import { makeProjector, makeOrthoProjector } from "./projection";

describe("通用方位等距投影（天球仪）", () => {
  it("中心取北天极时退化为 project()", () => {
    const p = makeProjector(0, 90);
    for (const [ra, dec] of [[0, 0], [123.4, 60], [280, -30], [37.9, 89.26]] as const) {
      const a = project(ra, dec);
      const b = p(ra, dec);
      expect(b.x).toBeCloseTo(a.x, 10);
      expect(b.y).toBeCloseTo(a.y, 10);
    }
  });
  it("投影中心映到原点", () => {
    const p = makeProjector(45, -20);
    const c = p(45, -20);
    expect(Math.hypot(c.x, c.y)).toBeCloseTo(0, 10);
  });
  it("角距保真：投影半径等于与中心的真实角距", () => {
    const p = makeProjector(0, 20);
    // dec=20 圈上 ra 差 30°：真实角距 arccos(sin²20° + cos²20°·cos30°) ≈ 28.15°
    const q = p(30, 20);
    const expected = Math.acos(Math.sin(20 * Math.PI / 180) ** 2 + Math.cos(20 * Math.PI / 180) ** 2 * Math.cos(Math.PI / 6));
    expect(Math.hypot(q.x, q.y)).toBeCloseTo(expected, 6);
  });
});

describe("正射投影（天球仪·地球仪视角）", () => {
  it("中心映到原点且可见", () => {
    const p = makeOrthoProjector(45, -20);
    const c = p(45, -20);
    expect(c.x).toBeCloseTo(0, 10);
    expect(c.y).toBeCloseTo(0, 10);
    expect(c.visible).toBe(true);
  });
  it("背面星不可见", () => {
    const p = makeOrthoProjector(0, 0);
    expect(p(180, 0).visible).toBe(false);
    expect(p(170, 40).visible).toBe(false);
  });
  it("边缘星半径约 1，北半天的点在屏幕上方（y 为负）", () => {
    const p = makeOrthoProjector(0, 0);
    const edge = p(90, 0);
    expect(Math.hypot(edge.x, edge.y)).toBeCloseTo(1, 6);
    expect(p(0, 45).y).toBeLessThan(0);
    expect(p(30, -45).y).toBeGreaterThan(0);
  });
});
