import { describe, it, expect } from "vitest";
import { precess, poleAt } from "./precession";

const D2R = Math.PI / 180;

function angularSep(ra1: number, dec1: number, ra2: number, dec2: number): number {
  const c =
    Math.sin(dec1 * D2R) * Math.sin(dec2 * D2R) +
    Math.cos(dec1 * D2R) * Math.cos(dec2 * D2R) * Math.cos((ra1 - ra2) * D2R);
  return Math.acos(Math.min(1, Math.max(-1, c))) / D2R;
}

describe("岁差 precess", () => {
  it("J2000 恒等", () => {
    const p = precess(123.4, 45.6, 2000);
    expect(p.ra).toBeCloseTo(123.4, 10);
    expect(p.dec).toBeCloseTo(45.6, 10);
  });
  it("勾陈一（北极星）2100 年前后最靠近天极", () => {
    // J2000: ra≈37.95°, dec≈89.264°；2100 年距极应小于 J2000 的 44′
    const p = precess(37.9546, 89.2641, 2100);
    expect(p.dec).toBeGreaterThan(89.2641);
    expect(p.dec).toBeLessThan(89.6);
  });
  it("黄极方向不随岁差改变", () => {
    // 北黄极：ra=270°, dec=66.5607°
    const p = precess(270, 66.5607, 5000);
    expect(angularSep(p.ra, p.dec, 270, 66.5607)).toBeLessThan(0.5);
  });
  it("跨度 ±14000 年坐标仍为单位球面上的合法方向", () => {
    const a = precess(100, -20, -2000);
    const b = precess(100, -20, 12000);
    expect(Math.abs(a.dec)).toBeLessThanOrEqual(90);
    expect(Math.abs(b.dec)).toBeLessThanOrEqual(90);
    expect(a.ra).toBeGreaterThanOrEqual(0);
    expect(a.ra).toBeLessThan(360);
    expect(b.ra).toBeGreaterThanOrEqual(0);
    expect(b.ra).toBeLessThan(360);
  });
});

describe("poleAt 天极漂移", () => {
  it("J2000 天极即 (0, 90)", () => {
    const p = poleAt(2000);
    expect(p.dec).toBeCloseTo(90, 10);
  });
  it("poleAt 与 precess 互逆：历元天极 precess 回该历元应落在极点", () => {
    for (const y of [-2000, 0, 2000, 5000, 12000]) {
      const pole = poleAt(y);
      const back = precess(pole.ra, pole.dec, y);
      expect(back.dec).toBeCloseTo(90, 4);
    }
  });
  it("公元 13700 年前后天极扫到织女一邻域（长跨度科普级近似，< 9°）", () => {
    // 织女一 Vega J2000: ra≈279.23°, dec≈38.78°。
    // IAU 1976 三项式在 T=117 世纪跨度固有误差数度，断言"扫过邻域"而非精确坐标。
    const p = poleAt(13700);
    expect(angularSep(p.ra, p.dec, 279.23, 38.78)).toBeLessThan(9);
  });
  it("公元前 2000 年天极靠近右枢/天龙座方向", () => {
    // 右枢 Thuban J2000: ra≈210.96°, dec≈64.38°，-2000 年距极应 < 8°
    const p = poleAt(-2000);
    expect(angularSep(p.ra, p.dec, 210.96, 64.38)).toBeLessThan(8);
  });
});
