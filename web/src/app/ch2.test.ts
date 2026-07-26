/**
 * ch2 状态机纯逻辑单测：段归属（ch2SegmentOf）、提示升级计数（ch2HintLevel）、
 * 段1 各句生长状态（ch2Seg1LineStates）、寻星令计分规则（ch2TimeLimit /
 * ch2ComboMultiplier / ch2ScoreFor / ch2Grade / ch2Shuffle），
 * 以及 CH2_QUESTS 题库形状守护（10 题三题型混合、target 核对 asterisms.json
 * 与 poem.json 实际键名、选择题选项合法）。
 *
 * 只覆盖纯函数与静态数据；DOM/计时器/拾取的事件流以人工路径核对（见重构报告）。
 */
import { describe, expect, it } from "vitest";
import asterismsRaw from "../../public/data/asterisms.json?raw";
import poemRaw from "../../public/data/poem.json?raw";
import {
  CH2_GRADE_JIA,
  CH2_GRADE_YI,
  CH2_MAX_HEARTS,
  CH2_ROUND_SIZE,
  CH2_SEG1_END,
  CH2_SEG1_LINE_COUNT,
  CH2_SEG2_END,
  CH2_TIME_LIMIT_EARLY_S,
  CH2_TIME_LIMIT_LATE_S,
  CH2_URGENT_HINT_SECONDS,
  ch2ComboMultiplier,
  ch2Grade,
  ch2HintLevel,
  ch2ScoreFor,
  ch2SegmentOf,
  ch2Seg1LineStates,
  ch2Shuffle,
  ch2TimeLimit,
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
    expect(ch2HintLevel(0, CH2_TIME_LIMIT_EARLY_S)).toBe(0);
    expect(ch2HintLevel(1, CH2_TIME_LIMIT_EARLY_S)).toBe(1);
    expect(ch2HintLevel(2, CH2_TIME_LIMIT_EARLY_S)).toBe(2);
    expect(ch2HintLevel(5, CH2_TIME_LIMIT_EARLY_S)).toBe(2);
  });
  it("濒临超时（剩余 ≤4s）升级为光圈", () => {
    expect(ch2HintLevel(0, CH2_URGENT_HINT_SECONDS + 0.1)).toBe(0);
    expect(ch2HintLevel(0, CH2_URGENT_HINT_SECONDS)).toBe(2);
    expect(ch2HintLevel(0, 0.5)).toBe(2);
    expect(ch2HintLevel(1, CH2_URGENT_HINT_SECONDS)).toBe(2);
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

describe("寻星令计分规则", () => {
  it("ch2TimeLimit：前 5 题 12s、后 5 题 8s", () => {
    for (let i = 0; i < 5; i++) expect(ch2TimeLimit(i)).toBe(CH2_TIME_LIMIT_EARLY_S);
    for (let i = 5; i < CH2_ROUND_SIZE; i++) expect(ch2TimeLimit(i)).toBe(CH2_TIME_LIMIT_LATE_S);
    expect(CH2_TIME_LIMIT_EARLY_S).toBe(12);
    expect(CH2_TIME_LIMIT_LATE_S).toBe(8);
  });
  it("ch2ComboMultiplier：倍率 1→1.5→2→3（第 4 连击起封顶）", () => {
    expect(ch2ComboMultiplier(1)).toBe(1);
    expect(ch2ComboMultiplier(2)).toBe(1.5);
    expect(ch2ComboMultiplier(3)).toBe(2);
    expect(ch2ComboMultiplier(4)).toBe(3);
    expect(ch2ComboMultiplier(10)).toBe(3);
  });
  it("ch2ScoreFor：1000×倍率，星雨双倍期间再 ×2", () => {
    expect(ch2ScoreFor(1, false)).toBe(1000);
    expect(ch2ScoreFor(2, false)).toBe(1500);
    expect(ch2ScoreFor(3, false)).toBe(2000);
    expect(ch2ScoreFor(4, false)).toBe(3000);
    expect(ch2ScoreFor(5, true)).toBe(6000);
    expect(ch2ScoreFor(1, true)).toBe(2000);
  });
  it("ch2Grade：甲/乙/丙阈值边界", () => {
    expect(ch2Grade(CH2_GRADE_JIA)).toBe("甲");
    expect(ch2Grade(CH2_GRADE_JIA - 1)).toBe("乙");
    expect(ch2Grade(CH2_GRADE_YI)).toBe("乙");
    expect(ch2Grade(CH2_GRADE_YI - 1)).toBe("丙");
    expect(ch2Grade(0)).toBe("丙");
  });
  it("ch2Shuffle：不动原数组、保持多重集不变", () => {
    const src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
    // 线性同余伪随机，保证单测确定性
    let seed = 42;
    const rand = () => (seed = (seed * 1103515245 + 12345) % 2 ** 31) / 2 ** 31;
    const out = ch2Shuffle(src, rand);
    expect(out).toHaveLength(src.length);
    expect([...out].sort((a, b) => a - b)).toEqual([...src]);
    expect([...src]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // 原数组未动
  });
  it("生命上限为 3 心", () => {
    expect(CH2_MAX_HEARTS).toBe(3);
  });
});

describe("CH2_QUESTS 寻星令题库", () => {
  it("一局 10 题、三种题型混合（寻星 4 · 闪现 3 · 四选一 3）", () => {
    expect(CH2_QUESTS).toHaveLength(CH2_ROUND_SIZE);
    const count = { seek: 0, flash: 0, choice: 0 };
    for (const q of CH2_QUESTS) count[q.type] += 1;
    expect(count).toEqual({ seek: 4, flash: 3, choice: 3 });
  });
  it("target 非空且全局唯一；key/hint/plain 非空", () => {
    expect(new Set(CH2_QUESTS.map((q) => q.target)).size).toBe(CH2_ROUND_SIZE);
    for (const q of CH2_QUESTS) {
      expect(q.key.length).toBeGreaterThan(0);
      expect(q.hint.length).toBeGreaterThan(0);
      expect(q.plain.length).toBeGreaterThan(0);
    }
  });
  it("target 均为 asterisms.json 实际星官键名，且 poem.json 有对应引文", () => {
    const ast = JSON.parse(asterismsRaw) as { asterisms: { name: string }[] };
    const poem = JSON.parse(poemRaw) as Record<string, unknown>;
    const names = new Set(ast.asterisms.map((a) => a.name));
    for (const q of CH2_QUESTS) {
      expect(names.has(q.target), `${q.target} 应在 asterisms.json 中`).toBe(true);
      expect(poem[q.target], `${q.target} 应在 poem.json 中`).toBeTruthy();
    }
  });
  it("四选一题：恰好 4 个互不相同的选项，answer 下标合法；非选择题不带选项", () => {
    for (const q of CH2_QUESTS) {
      if (q.type === "choice") {
        expect(q.options).toHaveLength(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer!).toBeLessThan(4);
        expect(Number.isInteger(q.answer)).toBe(true);
      } else {
        expect(q.options).toBeUndefined();
        expect(q.answer).toBeUndefined();
      }
    }
  });
});
