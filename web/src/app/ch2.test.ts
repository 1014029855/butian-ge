/**
 * ch2 状态机纯逻辑单测：段归属（ch2SegmentOf）、提示升级计数（ch2HintLevel）、
 * 段1 各句生长状态（ch2Seg1LineStates），以及 CH2_QUESTS 数据形状守护。
 *
 * 只覆盖纯函数与静态数据；DOM/计时器/拾取的事件流以人工路径核对（见重构报告）。
 */
import { describe, expect, it } from "vitest";
import {
  CH2_IDLE_HINT_SECONDS,
  CH2_SEG1_END,
  CH2_SEG1_LINE_COUNT,
  CH2_SEG2_END,
  ch2HintLevel,
  ch2SegmentOf,
  ch2Seg1LineStates,
} from "./chapters/ch2";
import { CH2_QUESTS } from "./copy";

describe("ch2SegmentOf 段归属", () => {
  it("三段边界划分正确", () => {
    expect(ch2SegmentOf(0)).toBe(0);
    expect(ch2SegmentOf(CH2_SEG1_END - 1e-6)).toBe(0);
    expect(ch2SegmentOf(CH2_SEG1_END)).toBe(1);
    expect(ch2SegmentOf(0.5)).toBe(1);
    expect(ch2SegmentOf(CH2_SEG2_END - 1e-6)).toBe(1);
    expect(ch2SegmentOf(CH2_SEG2_END)).toBe(2);
    expect(ch2SegmentOf(1)).toBe(2);
  });
  it("越界输入按边界归属（ScrollTrigger 实际给 [0,1]，防御性钳制）", () => {
    expect(ch2SegmentOf(-0.1)).toBe(0);
    expect(ch2SegmentOf(1.1)).toBe(2);
  });
});

describe("ch2HintLevel 提示升级计数", () => {
  it("点错 0 次无提示，1 次箭头，2 次光圈", () => {
    expect(ch2HintLevel(0, 0)).toBe(0);
    expect(ch2HintLevel(1, 0)).toBe(1);
    expect(ch2HintLevel(2, 0)).toBe(2);
    expect(ch2HintLevel(5, 0)).toBe(2);
  });
  it("20s 无操作升级为光圈", () => {
    expect(ch2HintLevel(0, CH2_IDLE_HINT_SECONDS - 0.1)).toBe(0);
    expect(ch2HintLevel(0, CH2_IDLE_HINT_SECONDS)).toBe(2);
    expect(ch2HintLevel(1, CH2_IDLE_HINT_SECONDS)).toBe(2);
  });
});

describe("ch2Seg1LineStates 段1 各句生长", () => {
  it("标题区：无激活句、全部未生长、收尾未启动", () => {
    const st = ch2Seg1LineStates(0);
    expect(st.active).toBe(-1);
    expect(st.lines).toHaveLength(CH2_SEG1_LINE_COUNT);
    expect(st.lines.every((v) => v === 0)).toBe(true);
    expect(st.finale).toBe(0);
  });
  it("五句依次生长：前句全亮、当前句进行中、后句未点", () => {
    // 句长 (0.30-0.05)/5 = 0.05；第 2 句（i=1）区间 [0.10, 0.15)
    const st = ch2Seg1LineStates(0.125);
    expect(st.active).toBe(1);
    expect(st.lines[0]).toBe(1);
    expect(st.lines[1]).toBeCloseTo(0.5, 5);
    expect(st.lines[2]).toBe(0);
    expect(st.finale).toBe(0);
  });
  it("收尾段：五句全亮，finale 从 0 拉到 1", () => {
    expect(ch2Seg1LineStates(0.3).finale).toBe(0);
    expect(ch2Seg1LineStates(0.325).finale).toBeCloseTo(0.5, 5);
    const end = ch2Seg1LineStates(CH2_SEG1_END);
    expect(end.finale).toBe(1);
    expect(end.lines.every((v) => v === 1)).toBe(true);
  });
  it("随 p 单调不减（scrub 来回滚动的生长动画不倒退闪烁之外的跳变）", () => {
    let prev = ch2Seg1LineStates(0);
    for (let p = 0.01; p <= CH2_SEG1_END; p += 0.01) {
      const cur = ch2Seg1LineStates(p);
      cur.lines.forEach((v, i) => expect(v).toBeGreaterThanOrEqual(prev.lines[i]!));
      expect(cur.finale).toBeGreaterThanOrEqual(prev.finale);
      prev = cur;
    }
  });
});

describe("CH2_QUESTS 数据形状", () => {
  it("四题、从易到难排序、target 非空且唯一", () => {
    expect(CH2_QUESTS).toHaveLength(4);
    expect(CH2_QUESTS.map((q) => q.target)).toEqual(["北斗", "勾陈", "天狼", "织女"]);
    expect(new Set(CH2_QUESTS.map((q) => q.target)).size).toBe(4);
    for (const q of CH2_QUESTS) {
      expect(q.key.length).toBeGreaterThan(0);
      expect(q.hint.length).toBeGreaterThan(0);
      expect(q.plain.length).toBeGreaterThan(0);
    }
  });
});
