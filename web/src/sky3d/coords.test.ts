import { describe, it, expect } from "vitest";
import { radecToVec3, precessionMat3, applyMat3, PRECESSION_PERIOD_YEARS } from "./coords";

const D2R = Math.PI / 180;

type V3 = [number, number, number];

const IDENTITY: number[] = [1, 0, 0, 0, 1, 0, 0, 0, 1];

/** 两向量角距（度） */
function sepDeg(a: V3, b: V3): number {
  const d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const na = Math.hypot(a[0], a[1], a[2]);
  const nb = Math.hypot(b[0], b[1], b[2]);
  return Math.acos(Math.min(1, Math.max(-1, d / (na * nb)))) / D2R;
}

function expectVecClose(v: V3, expected: V3, digits = 10): void {
  expect(v[0]).toBeCloseTo(expected[0], digits);
  expect(v[1]).toBeCloseTo(expected[1], digits);
  expect(v[2]).toBeCloseTo(expected[2], digits);
}

function expectMatCloseToIdentity(m: number[], digits = 10): void {
  for (let i = 0; i < 9; i++) expect(m[i]).toBeCloseTo(IDENTITY[i], digits);
}

describe("radecToVec3 坐标约定", () => {
  it("原点特例：ra=0°, dec=0°（春分点）在 +X", () => {
    expectVecClose(radecToVec3(0, 0), [1, 0, 0], 12);
  });
  it("极点特例：北天极为 +Y，与 ra 取值无关", () => {
    expectVecClose(radecToVec3(0, 90), [0, 1, 0], 12);
    expectVecClose(radecToVec3(123.4, 90), [0, 1, 0], 12);
  });
  it("极点特例：南天极为 -Y", () => {
    expectVecClose(radecToVec3(45, -90), [0, -1, 0], 12);
  });
  it("手性：ra=90°, dec=0° 在 +Z（球内朝 +Y 看，赤经增大为逆时针）", () => {
    expectVecClose(radecToVec3(90, 0), [0, 0, 1], 12);
  });
  it("radius 缩放，且任意方向模长等于 radius", () => {
    expectVecClose(radecToVec3(0, 0, 42), [42, 0, 0], 12);
    const v = radecToVec3(279.2347, 38.7837, 1000);
    expect(Math.hypot(v[0], v[1], v[2])).toBeCloseTo(1000, 9);
  });
});

describe("precessionMat3 / applyMat3 岁差", () => {
  it("0 年为单位阵", () => {
    expectMatCloseToIdentity(precessionMat3(0), 12);
  });
  it("applyMat3 对单位阵恒等", () => {
    const v = radecToVec3(37.9546, 89.2641);
    expectVecClose(applyMat3(IDENTITY, v), v, 12);
  });
  it("一个周期（25772 年）后回到单位阵", () => {
    expectMatCloseToIdentity(precessionMat3(PRECESSION_PERIOD_YEARS), 6);
    expectMatCloseToIdentity(precessionMat3(-PRECESSION_PERIOD_YEARS), 6);
  });
  it("角距保持：旋转前后两星夹角不变", () => {
    // 织女一 Vega 与牛郎星 Altair 的 J2000 坐标
    const vega = radecToVec3(279.2347, 38.7837);
    const altair = radecToVec3(297.6958, 8.8683);
    const before = sepDeg(vega, altair);
    for (const t of [-13000, 100, 5000, 25000]) {
      const m = precessionMat3(t);
      const after = sepDeg(applyMat3(m, vega), applyMat3(m, altair));
      expect(after).toBeCloseTo(before, 9);
    }
  });
  it("黄极不动：旋转轴方向在任意年限下不变", () => {
    const pole = radecToVec3(270, 90 - 23.43928);
    for (const t of [-3000, 1000, 13700]) {
      const moved = applyMat3(precessionMat3(t), pole);
      expect(sepDeg(moved, pole)).toBeLessThan(1e-9);
    }
  });
  it("微小年限方向合理：北天极朝黄经减小方向（春分点方向）漂移", () => {
    const t = 100;
    const m = precessionMat3(t);
    const pole = applyMat3(m, [0, 1, 0]);
    // 仍为单位向量且极靠近原天极
    expect(Math.hypot(pole[0], pole[1], pole[2])).toBeCloseTo(1, 12);
    // 向 +X（春分点，即黄经减小方向）一侧偏移，最终绕向织女一
    expect(pole[0]).toBeGreaterThan(0);
    expect(pole[1]).toBeLessThan(1);
    // 漂移弧长：天极在黄极周围 ε=23.43928° 的小圆上转过 θ=t·50.287″
    const theta = t * (1296000 / PRECESSION_PERIOD_YEARS) * D2R / 3600;
    const expected = 2 * Math.asin(Math.sin(23.43928 * D2R) * Math.sin(theta / 2)) / D2R;
    expect(sepDeg(pole, [0, 1, 0])).toBeCloseTo(expected, 6);
    expect(expected).toBeGreaterThan(0.5);
    expect(expected).toBeLessThan(0.6);
  });
});
