import { describe, it, expect } from "vitest";
import { distBoost, buildHipToAsterismMap, DIST_BOOST_MAX } from "./StarField";
import type { AsterismRec } from "./ConstellationLines";

describe("distBoost 球外距离补偿", () => {
  const R = 100;
  it("球内（r ≤ R）恒为 1，不改变球内观感", () => {
    expect(distBoost(0.5, R)).toBe(1);
    expect(distBoost(50, R)).toBe(1);
    expect(distBoost(R, R)).toBe(1);
  });
  it("球外按 (r/R)^0.45 单调放大，且克制（r=3R ≈ 1.64）", () => {
    const b2 = distBoost(2 * R, R);
    const b3 = distBoost(3 * R, R);
    expect(b2).toBeGreaterThan(1);
    expect(b3).toBeGreaterThan(b2);
    expect(b3).toBeCloseTo(Math.pow(3, 0.45), 5);
    expect(b3).toBeLessThan(1.7);
  });
  it(" clamp 到上限", () => {
    expect(distBoost(1000 * R, R)).toBe(DIST_BOOST_MAX);
  });
  it("NaN / 非法 R 防护回退 1", () => {
    expect(distBoost(NaN, R)).toBe(1);
    expect(distBoost(200, 0)).toBe(1);
  });
});

describe("buildHipToAsterismMap hip→星官索引", () => {
  const asterisms: AsterismRec[] = [
    { id: "001", name: "毕宿", stars: [10, 20, 30], lines: [] },
    { id: "002", name: "壁宿", stars: [40, 50], lines: [] },
    { id: "003", name: "重复宿", stars: [10, 60], lines: [] },
  ];
  it("成员星都能查到所属星官", () => {
    const m = buildHipToAsterismMap(asterisms);
    expect(m.get(20)?.name).toBe("毕宿");
    expect(m.get(50)?.id).toBe("002");
    expect(m.size).toBe(6);
  });
  it("同一 hip 属于多个星官时取数据序首个", () => {
    const m = buildHipToAsterismMap(asterisms);
    expect(m.get(10)?.name).toBe("毕宿");
  });
  it("非成员星查不到", () => {
    const m = buildHipToAsterismMap(asterisms);
    expect(m.get(999)).toBeUndefined();
  });
  it("空数据返回空 Map", () => {
    expect(buildHipToAsterismMap([]).size).toBe(0);
  });
});
