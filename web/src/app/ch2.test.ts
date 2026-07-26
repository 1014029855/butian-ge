/**
 * ch2 状态机纯逻辑单测：段归属（ch2SegmentOf）、提示升级计数（ch2HintLevel）、
 * 段1 各句生长状态（ch2Seg1LineStates）、寻星令计分规则（ch2TimeLimit /
 * ch2ComboMultiplier / ch2ScoreFor / ch2Grade / ch2Shuffle）、
 * 「加厚」新逻辑（ch2QuestKind / ch2BlitzTargets / ch2BuildDeck /
 * ch2NormalizeRanks / ch2RankOf / ch2SpectralClass / ch2Brightest / ch2ArchiveLine），
 * 以及 CH2_QUESTS 题库形状守护（12 题四题型 + ch2 合成闪电快答共 13 题一局、
 * target 核对 asterisms.json 与 poem.json 实际键名、选项题选项合法、
 * TARGET_DIRS 质心表覆盖全部判定目标）。
 *
 * 只覆盖纯函数与静态数据；DOM/计时器/拾取的事件流以人工路径核对（见重构报告）。
 */
import { describe, expect, it } from "vitest";
import asterismsRaw from "../../public/data/asterisms.json?raw";
import poemRaw from "../../public/data/poem.json?raw";
import {
  CH2_BLITZ_DEFAULT_TARGETS,
  CH2_BLITZ_SECONDS,
  CH2_GRADE_JIA,
  CH2_GRADE_YI,
  CH2_MAX_HEARTS,
  CH2_RANKS_FALLBACK,
  CH2_ROUND_SIZE,
  CH2_SEG1_END,
  CH2_SEG1_LINE_COUNT,
  CH2_SEG2_END,
  CH2_TIME_LIMIT_EARLY_S,
  CH2_TIME_LIMIT_LATE_S,
  CH2_URGENT_HINT_SECONDS,
  TARGET_DIRS,
  ch2ArchiveLine,
  ch2BlitzTargets,
  ch2Brightest,
  ch2BuildDeck,
  ch2ComboMultiplier,
  ch2Grade,
  ch2HintLevel,
  ch2NormalizeRanks,
  ch2QuestKind,
  ch2RankOf,
  ch2ScoreFor,
  ch2SegmentOf,
  ch2Seg1LineStates,
  ch2Shuffle,
  ch2SpectralClass,
  ch2TimeLimit,
} from "./chapters/ch2";
import { CH2_QUESTS, CH2_RANKS, type Ch2Quest } from "./copy";

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
  it("ch2TimeLimit：前 5 题 12s、其后 8s", () => {
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
  it("题库 12 题、四种题型混合（寻星 4 · 闪现 3 · 四选一 3 · 点星选名 2）", () => {
    expect(CH2_QUESTS).toHaveLength(12);
    const count: Record<string, number> = { seek: 0, flash: 0, choice: 0, name: 0, blitz: 0 };
    for (const q of CH2_QUESTS) {
      const kind = ch2QuestKind(q);
      expect(count[kind], `未知题型 ${q.type as string}`).not.toBeUndefined();
      count[kind]! += 1;
    }
    expect(count).toEqual({ seek: 4, flash: 3, choice: 3, name: 2, blitz: 0 });
  });
  it("target 非空且全局唯一；key/hint/hintWrong/plain/story 非空", () => {
    expect(new Set(CH2_QUESTS.map((q) => q.target)).size).toBe(CH2_QUESTS.length);
    for (const q of CH2_QUESTS) {
      expect(q.key.length).toBeGreaterThan(0);
      expect(q.hint.length).toBeGreaterThan(0);
      expect(q.hintWrong.length).toBeGreaterThan(0);
      expect(q.plain.length).toBeGreaterThan(0);
      expect(q.story.length).toBeGreaterThan(0);
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
  it("选项题（四选一/点星选名）：恰好 4 个互不相同的选项，answer 下标合法；其余题型不带选项", () => {
    for (const q of CH2_QUESTS) {
      const kind = ch2QuestKind(q);
      if (kind === "choice" || kind === "name") {
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
  it("点星选名题：选项为星官名且正确项即 target 本名", () => {
    for (const q of CH2_QUESTS) {
      if (ch2QuestKind(q) !== "name") continue;
      expect(q.options![q.answer!]).toBe(q.target);
    }
  });
  it("判定目标全部有 TARGET_DIRS 质心（金环/金雨/镜头暗示依赖）", () => {
    for (const q of ch2BuildDeck()) {
      if (ch2QuestKind(q) === "blitz") {
        for (const t of ch2BlitzTargets(q)) expect(TARGET_DIRS[t], `${t} 应有质心`).toBeTruthy();
      } else {
        expect(TARGET_DIRS[q.target], `${q.target} 应有质心`).toBeTruthy();
      }
    }
  });
});

describe("ch2BuildDeck 一局牌堆（含合成闪电快答）", () => {
  it("一局 13 题 = 题库 12 + 合成闪电 1；非闪电部分与题库同多重集", () => {
    const deck = ch2BuildDeck();
    expect(deck).toHaveLength(CH2_ROUND_SIZE);
    expect(CH2_ROUND_SIZE).toBe(13);
    const blitz = deck.filter((q) => ch2QuestKind(q) === "blitz");
    expect(blitz).toHaveLength(1);
    const rest = deck.filter((q) => ch2QuestKind(q) !== "blitz");
    expect(rest.map((q) => q.key).sort()).toEqual(CH2_QUESTS.map((q) => q.key).sort());
  });
  it("合成闪电题：默认小题 北斗/天狼/织女，均为 asterisms 星官且 poem.json 有引文", () => {
    const blitz = ch2BuildDeck().find((q) => ch2QuestKind(q) === "blitz")!;
    expect(ch2BlitzTargets(blitz)).toEqual([...CH2_BLITZ_DEFAULT_TARGETS]);
    expect(CH2_BLITZ_SECONDS).toBe(3);
    const ast = JSON.parse(asterismsRaw) as { asterisms: { name: string }[] };
    const poem = JSON.parse(poemRaw) as Record<string, unknown>;
    const names = new Set(ast.asterisms.map((a) => a.name));
    for (const t of ch2BlitzTargets(blitz)) {
      expect(names.has(t), `${t} 应在 asterisms.json 中`).toBe(true);
      expect(poem[t], `${t} 应在 poem.json 中`).toBeTruthy();
    }
  });
});

describe("ch2QuestKind 题型归一", () => {
  const base = { key: "t", target: "北斗", hint: "h", hintWrong: "w", plain: "p", story: "s" };
  const fake = (type: string): Ch2Quest => ({ ...base, type }) as Ch2Quest;
  it("五种题型 id 正确映射", () => {
    expect(ch2QuestKind(fake("seek"))).toBe("seek");
    expect(ch2QuestKind(fake("flash"))).toBe("flash");
    expect(ch2QuestKind(fake("choice"))).toBe("choice");
    expect(ch2QuestKind(fake("name"))).toBe("name");
    expect(ch2QuestKind(fake("blitz"))).toBe("blitz");
  });
  it("未知题型回退寻星（题库演进兜底）", () => {
    expect(ch2QuestKind(fake("mystery"))).toBe("seek");
    expect(ch2QuestKind(fake(""))).toBe("seek");
  });
});

describe("ch2BlitzTargets 闪电小题目标表", () => {
  const base = { key: "t", type: "blitz", target: "北斗", hint: "h", hintWrong: "w", plain: "p", story: "s" } as unknown as Ch2Quest;
  it("无 targets 字段回退默认 北斗/天狼/织女", () => {
    expect(ch2BlitzTargets(base)).toEqual(["北斗", "天狼", "织女"]);
  });
  it("合法 targets 字段优先（返回副本）", () => {
    const q = { ...base, targets: ["天狼"] } as Ch2Quest & { targets: string[] };
    const out = ch2BlitzTargets(q);
    expect(out).toEqual(["天狼"]);
    out.push("x");
    expect((q as { targets: string[] }).targets).toEqual(["天狼"]); // 不动原数组
  });
  it("非法 targets（空表/非字符串）回退默认", () => {
    expect(ch2BlitzTargets({ ...base, targets: [] } as Ch2Quest)).toEqual(["北斗", "天狼", "织女"]);
    expect(ch2BlitzTargets({ ...base, targets: [1, 2] } as unknown as Ch2Quest)).toEqual(["北斗", "天狼", "织女"]);
  });
});

describe("ch2NormalizeRanks / ch2RankOf 段位映射", () => {
  it("归一化：滤非法项、按 min 升序", () => {
    const ranks = ch2NormalizeRanks([
      { name: "探花", min: 20000 },
      { name: "童生", min: 0 },
      { name: "缺阈值" },
      null,
      "junk",
      { name: "秀才", min: 4000 },
    ]);
    expect(ranks.map((r) => r.name)).toEqual(["童生", "秀才", "探花"]);
    expect(ch2NormalizeRanks("nope")).toEqual([]);
    expect(ch2NormalizeRanks(undefined)).toEqual([]);
    expect(ch2NormalizeRanks([])).toEqual([]);
  });
  it("ch2RankOf：取 min ≤ score 的最高档；空表回空串", () => {
    const ranks = ch2NormalizeRanks([
      { name: "乙", min: 100 },
      { name: "甲", min: 0 },
    ]);
    expect(ch2RankOf(0, ranks)).toBe("甲");
    expect(ch2RankOf(99, ranks)).toBe("甲");
    expect(ch2RankOf(100, ranks)).toBe("乙");
    expect(ch2RankOf(99999, ranks)).toBe("乙");
    expect(ch2RankOf(100, [])).toBe("");
  });
  it("兜底表：童生起 0、探花封顶，min 严格递增且对齐甲乙丙刻度", () => {
    expect(CH2_RANKS_FALLBACK[0]).toEqual({ name: "童生", min: 0 });
    expect(CH2_RANKS_FALLBACK[CH2_RANKS_FALLBACK.length - 1]!.name).toBe("探花");
    for (let i = 1; i < CH2_RANKS_FALLBACK.length; i++) {
      expect(CH2_RANKS_FALLBACK[i]!.min).toBeGreaterThan(CH2_RANKS_FALLBACK[i - 1]!.min);
    }
    expect(ch2RankOf(0, CH2_RANKS_FALLBACK)).toBe("童生");
    expect(ch2RankOf(CH2_GRADE_YI, CH2_RANKS_FALLBACK)).toBe("贡士"); // 乙等线
    expect(ch2RankOf(CH2_GRADE_JIA, CH2_RANKS_FALLBACK)).toBe("探花"); // 甲等线
  });
  it("copy 的 CH2_RANKS（降序导出）经归一化后映射正确", () => {
    expect(CH2_RANKS.length).toBeGreaterThan(0);
    const ranks = ch2NormalizeRanks(CH2_RANKS);
    expect(ranks[0]!.name).toBe("童生");
    expect(ranks[ranks.length - 1]!.name).toBe("探花");
    for (let i = 1; i < ranks.length; i++) expect(ranks[i]!.min).toBeGreaterThan(ranks[i - 1]!.min);
    expect(ch2RankOf(0, ranks)).toBe("童生");
    expect(ch2RankOf(30000, ranks)).toBe("探花");
    expect(ch2RankOf(29999, ranks)).toBe("进士");
    expect(ch2RankOf(6000, ranks)).toBe("秀才");
  });
});

describe("ch2SpectralClass 色指数 → 光谱型", () => {
  it("O/B/A/F/G/K/M 边界", () => {
    expect(ch2SpectralClass(-0.33)).toBe("O");
    expect(ch2SpectralClass(-0.3)).toBe("B");
    expect(ch2SpectralClass(-0.01)).toBe("B");
    expect(ch2SpectralClass(0)).toBe("A");
    expect(ch2SpectralClass(0.29)).toBe("A");
    expect(ch2SpectralClass(0.3)).toBe("F");
    expect(ch2SpectralClass(0.59)).toBe("F");
    expect(ch2SpectralClass(0.6)).toBe("G");
    expect(ch2SpectralClass(0.79)).toBe("G");
    expect(ch2SpectralClass(0.8)).toBe("K");
    expect(ch2SpectralClass(1.39)).toBe("K");
    expect(ch2SpectralClass(1.4)).toBe("M");
    expect(ch2SpectralClass(1.8)).toBe("M");
  });
});

describe("ch2Brightest / ch2ArchiveLine 翻页卡档案行", () => {
  it("ch2Brightest：取视星等最小者；空表回 null", () => {
    const a = { mag: 2.0, ci: 0.5, dist: 10 };
    const b = { mag: -1.46, ci: 0.0, dist: 8.6 };
    expect(ch2Brightest([a, b])).toBe(b);
    expect(ch2Brightest([a])).toBe(a);
    expect(ch2Brightest([])).toBeNull();
  });
  it("ch2ArchiveLine：视星等 · 光谱 X 型 · 约 N 光年；缺段自动省略", () => {
    expect(ch2ArchiveLine({ mag: -1.46, ci: 0.0, dist: 8.6 })).toBe("视星等 -1.46 · 光谱 A 型 · 约 8.6 光年");
    expect(ch2ArchiveLine({ mag: 0.5, ci: 1.63, dist: null })).toBe("视星等 0.5 · 光谱 M 型");
    expect(ch2ArchiveLine({ mag: 2.0, ci: null, dist: 432 })).toBe("视星等 2 · 约 432 光年");
    expect(ch2ArchiveLine({ mag: 5.8, ci: null, dist: null })).toBe("视星等 5.8");
    expect(ch2ArchiveLine(null)).toBe("");
  });
});
