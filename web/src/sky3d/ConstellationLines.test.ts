import { describe, it, expect } from "vitest";
import {
  buildLineVertices,
  buildConstellationLines,
  type AsterismRec,
} from "./ConstellationLines";

const hipPos = new Map<number, [number, number, number]>([
  [1, [1, 0, 0]],
  [2, [0, 1, 0]],
  [3, [0, 0, 1]],
]);

const ASTERISMS: AsterismRec[] = [
  { id: "001", name: "甲宿", stars: [1, 2, 3], lines: [[1, 2], [2, 3]] },
  { id: "002", name: "乙宿", stars: [1, 3], lines: [[1, 3]] },
];

describe("buildLineVertices 顶点展开", () => {
  it("每线段 2 顶点，位置取自 hip 坐标", () => {
    const d = buildLineVertices(ASTERISMS, hipPos);
    expect(d.segmentCount).toBe(3);
    expect(d.vertexCount).toBe(6);
    // 第一段：hip 1 → hip 2
    expect(Array.from(d.positions.slice(0, 6))).toEqual([1, 0, 0, 0, 1, 0]);
  });
  it("aGroup 为组序号，同段两顶点一致", () => {
    const d = buildLineVertices(ASTERISMS, hipPos);
    expect(Array.from(d.groups)).toEqual([0, 0, 0, 0, 1, 1]);
  });
  it("aAlong 按组内 lines 顺序归一化：第 j/m 段为 [j/m, (j+1)/m]", () => {
    const d = buildLineVertices(ASTERISMS, hipPos);
    // 组 0 两段：0→0.5、0.5→1；组 1 一段：0→1
    expect(Array.from(d.alongs)).toEqual([0, 0.5, 0.5, 1, 0, 1]);
  });
  it("缺坐标的 hip 线段被跳过，其余段保持组内顺序", () => {
    const d = buildLineVertices(
      [{ id: "003", name: "丙宿", stars: [1, 2], lines: [[1, 999], [1, 2]] }],
      hipPos,
    );
    expect(d.segmentCount).toBe(1);
    expect(Array.from(d.alongs)).toEqual([0.5, 1]); // 原第 2 段（m=2, j=1）
  });
});

describe("buildConstellationLines 组映射与进度", () => {
  it("groupCount / id / name 双向映射", () => {
    const cl = buildConstellationLines(ASTERISMS, hipPos);
    expect(cl.groupCount).toBe(2);
    expect(cl.idOf(0)).toBe("001");
    expect(cl.nameOf(1)).toBe("乙宿");
    expect(cl.indexOf("002")).toBe(1);
    expect(cl.indexOf("甲宿")).toBe(0);
    expect(cl.indexOf("不存在")).toBe(-1);
    expect(cl.idOf(99)).toBe("");
  });
  it("初始全组进度 0（全部隐藏）", () => {
    const cl = buildConstellationLines(ASTERISMS, hipPos);
    expect(cl.groupProgress(0)).toBe(0);
    expect(cl.groupProgress(1)).toBe(0);
  });
  it("setGroupProgress 写读一致（1/255 量化）并钳制越界值", () => {
    const cl = buildConstellationLines(ASTERISMS, hipPos);
    cl.setGroupProgress(1, 0.5);
    expect(cl.groupProgress(1)).toBeCloseTo(0.5, 2);
    cl.setGroupProgress(0, 7);
    expect(cl.groupProgress(0)).toBe(1);
    cl.setGroupProgress(0, -3);
    expect(cl.groupProgress(0)).toBe(0);
  });
  it("序号越界静默忽略，不抛异常", () => {
    const cl = buildConstellationLines(ASTERISMS, hipPos);
    expect(() => cl.setGroupProgress(-1, 1)).not.toThrow();
    expect(() => cl.setGroupProgress(999, 1)).not.toThrow();
    expect(cl.groupProgress(999)).toBe(0);
  });
});
