import { describe, it, expect } from "vitest";
import { Camera } from "./camera";

describe("相机", () => {
  it("屏幕/世界坐标互逆", () => {
    const c = new Camera();
    c.k = 100; c.tx = 0.01; c.ty = -0.02;
    const s = c.toScreen(0.5, -0.3);
    const w = c.toWorld(s.x, s.y);
    expect(w.x).toBeCloseTo(0.5, 10);
    expect(w.y).toBeCloseTo(-0.3, 10);
  });
  it("zoomAt 保持光标处世界点不动", () => {
    const c = new Camera();
    c.k = 100; c.tx = 0.1; c.ty = 0.1;
    const before = c.toWorld(400, 300);
    c.zoomAt(400, 300, 1.5);
    const after = c.toWorld(400, 300);
    expect(after.x).toBeCloseTo(before.x, 10);
    expect(after.y).toBeCloseTo(before.y, 10);
    expect(c.k).toBeCloseTo(150, 6);
  });
  it("fit 让全天球入画且世界中心居中", () => {
    const c = new Camera();
    c.fit(Math.PI, 800, 600, 40);
    expect(c.k).toBeCloseTo((600 - 80) / (2 * Math.PI), 6);
    const center = c.toScreen(0, 0);
    expect(center.x).toBeCloseTo(400, 6);
    expect(center.y).toBeCloseTo(300, 6);
  });
});
