/**
 * ch2「唤星之旅」纯逻辑单测：段归属（ch2SegmentOf）、段1 各句生长
 * （ch2Seg1LineStates）、唤醒判定（ch2GuideTarget / ch2CanAwaken）、
 * 分区归属（ch2RegionOf / CH2_REGIONS，含 poem.json 实数据守护）、
 * 解锁档位（ch2UnlockTier / CH2_UNLOCKS）、最近沉睡选择（ch2NearestSleeping）、
 * 质心/角距（ch2Centroid / ch2AngularDistanceDeg）、泛音音高（ch2PluckFreq）、
 * 诗句摘句（ch2PoemExcerpt）、存档解析（ch2ParseAwakened）与常量契约。
 *
 * 只覆盖纯函数与静态数据；DOM/计时器/拾取/星使的事件流以人工路径核对。
 */
import { describe, expect, it } from "vitest";
import asterismsRaw from "../../public/data/asterisms.json?raw";
import poemRaw from "../../public/data/poem.json?raw";
import {
  CH2_GAZE_ANGLE_DEG,
  CH2_GAZE_HOLD_S,
  CH2_GUIDE_STATIONS,
  CH2_IDLE_PULSE_S,
  CH2_REGIONS,
  CH2_SEG1_END,
  CH2_SEG1_LINE_COUNT,
  CH2_SEG2_END,
  CH2_SLEEP_DIM,
  CH2_STORAGE_KEY,
  CH2_UNLOCKS,
  ch2AngularDistanceDeg,
  ch2CanAwaken,
  ch2Centroid,
  ch2GuideTarget,
  ch2NearestSleeping,
  ch2ParseAwakened,
  ch2PluckFreq,
  ch2PoemExcerpt,
  ch2RegionOf,
  ch2SegmentOf,
  ch2Seg1LineStates,
  ch2UnlockTier,
} from "./chapters/ch2";

const poem = JSON.parse(poemRaw) as Record<string, { text: string; from: string }>;
const asterisms = JSON.parse(asterismsRaw) as { asterisms: { name: string }[] };

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
  it("随 p 单调不减（scrub 来回滚动不倒退）", () => {
    let prev = ch2Seg1LineStates(0);
    for (let p = 0.01; p <= CH2_SEG1_END; p += 0.01) {
      const cur = ch2Seg1LineStates(p);
      cur.lines.forEach((v, i) => expect(v).toBeGreaterThanOrEqual(prev.lines[i]!));
      expect(cur.finale).toBeGreaterThanOrEqual(prev.finale);
      prev = cur;
    }
  });
});

describe("唤醒判定：ch2GuideTarget / ch2CanAwaken", () => {
  it("引路三站固定为 北斗 → 北极 → 天狼", () => {
    expect([...CH2_GUIDE_STATIONS]).toEqual(["北斗", "北极", "天狼"]);
  });
  it("ch2GuideTarget：取首座未唤醒站；三站俱醒回 null（自由收集）", () => {
    expect(ch2GuideTarget(new Set())).toBe("北斗");
    expect(ch2GuideTarget(new Set(["北斗"]))).toBe("北极");
    expect(ch2GuideTarget(new Set(["北斗", "北极"]))).toBe("天狼");
    expect(ch2GuideTarget(new Set(["北斗", "北极", "天狼"]))).toBeNull();
  });
  it("ch2GuideTarget：非引路站的唤醒不影响站序", () => {
    expect(ch2GuideTarget(new Set(["织女"]))).toBe("北斗");
    expect(ch2GuideTarget(new Set(["北斗", "织女"]))).toBe("北极");
  });
  it("ch2CanAwaken：引路中只认当前站", () => {
    const aw = new Set<string>();
    expect(ch2CanAwaken("北斗", "北斗", aw)).toBe(true);
    expect(ch2CanAwaken("天狼", "北斗", aw)).toBe(false); // 非当前站不可越站
    expect(ch2CanAwaken("织女", "北斗", aw)).toBe(false);
  });
  it("ch2CanAwaken：自由收集认一切沉睡星官，已唤醒不重复", () => {
    const aw = new Set(["北斗"]);
    expect(ch2CanAwaken("心宿", null, aw)).toBe(true);
    expect(ch2CanAwaken("北斗", null, aw)).toBe(false); // 已唤醒
    expect(ch2CanAwaken("北斗", "北斗", aw)).toBe(false); // 引路目标本已醒（防御）
    expect(ch2CanAwaken("", null, aw)).toBe(false); // 空名防御
  });
  it("引路三站均为 asterisms.json 实际星官，且 poem.json 有引文与可归属分区", () => {
    const names = new Set(asterisms.asterisms.map((a) => a.name));
    for (const s of CH2_GUIDE_STATIONS) {
      expect(names.has(s), `${s} 应在 asterisms.json 中`).toBe(true);
      expect(poem[s], `${s} 应在 poem.json 中`).toBeTruthy();
      expect(ch2RegionOf(poem[s]!.from), `${s} 应可归属分区`).not.toBeNull();
    }
  });
});

describe("分区归属：ch2RegionOf / CH2_REGIONS", () => {
  it("三垣拆紫微/太微/天市，四象各归一区", () => {
    expect(ch2RegionOf("三垣 · 紫微宫")).toBe("ziwei");
    expect(ch2RegionOf("三垣 · 太微宫")).toBe("taiwei");
    expect(ch2RegionOf("三垣 · 天市宫")).toBe("tianshi");
    expect(ch2RegionOf("东方苍龙 · 氐宿")).toBe("qinglong");
    expect(ch2RegionOf("东方青龙 · 角宿")).toBe("qinglong"); // 「青龙」写法同认
    expect(ch2RegionOf("北方玄武 · 斗宿")).toBe("xuanwu");
    expect(ch2RegionOf("西方白虎 · 参宿")).toBe("baihu");
    expect(ch2RegionOf("南方朱雀 · 井宿")).toBe("zhuque");
  });
  it("无法归属回 null（不计入收集卷）", () => {
    expect(ch2RegionOf("")).toBeNull();
    expect(ch2RegionOf("域外 · 未知")).toBeNull();
  });
  it("收集卷恰为七分区（紫微/太微/天市/青龙/玄武/白虎/朱雀）", () => {
    expect(CH2_REGIONS.map((r) => r.name)).toEqual([
      "紫微",
      "太微",
      "天市",
      "青龙",
      "玄武",
      "白虎",
      "朱雀",
    ]);
  });
  it("poem.json 实数据：309 星官全部可归属，分区星数与数据相符", () => {
    const counts: Record<string, number> = {};
    for (const [name, entry] of Object.entries(poem)) {
      const r = ch2RegionOf(entry.from);
      expect(r, `${name} 的 from「${entry.from}」应可归属`).not.toBeNull();
      counts[r!] = (counts[r!] ?? 0) + 1;
    }
    expect(Object.keys(poem)).toHaveLength(309);
    expect(counts).toEqual({
      ziwei: 41,
      taiwei: 21,
      tianshi: 18,
      qinglong: 51,
      xuanwu: 67,
      baihu: 63,
      zhuque: 48,
    });
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(309);
  });
});

describe("解锁档位：ch2UnlockTier / CH2_UNLOCKS", () => {
  it("档位阈值为 25%/50%/75%/100%", () => {
    expect([...CH2_UNLOCKS]).toEqual([0.25, 0.5, 0.75, 1]);
  });
  it("边界：未及 25% 为 0，达档即升，100% 为 4", () => {
    expect(ch2UnlockTier(0, 100)).toBe(0);
    expect(ch2UnlockTier(24, 100)).toBe(0);
    expect(ch2UnlockTier(25, 100)).toBe(1);
    expect(ch2UnlockTier(49, 100)).toBe(1);
    expect(ch2UnlockTier(50, 100)).toBe(2);
    expect(ch2UnlockTier(74, 100)).toBe(2);
    expect(ch2UnlockTier(75, 100)).toBe(3);
    expect(ch2UnlockTier(99, 100)).toBe(3);
    expect(ch2UnlockTier(100, 100)).toBe(4);
  });
  it("309 总数下的实际档位（77=24.9% 未达，78=25.2% 达档）", () => {
    expect(ch2UnlockTier(77, 309)).toBe(0);
    expect(ch2UnlockTier(78, 309)).toBe(1);
    expect(ch2UnlockTier(309, 309)).toBe(4);
  });
  it("异常输入防御：total≤0 或唤醒≤0 一律 0 档", () => {
    expect(ch2UnlockTier(5, 0)).toBe(0);
    expect(ch2UnlockTier(5, -3)).toBe(0);
    expect(ch2UnlockTier(0, 309)).toBe(0);
    expect(ch2UnlockTier(-1, 309)).toBe(0);
  });
});

describe("最近沉睡选择：ch2NearestSleeping", () => {
  const candidates = [
    { name: "东", ra: 10, dec: 0 },
    { name: "西", ra: 190, dec: 0 },
    { name: "北", ra: 0, dec: 80 },
    { name: "环", ra: 359.9, dec: 0 }, // 赤经环绕：与 0.1 仅差 0.2°
  ] as const;
  it("取与视线角距最小的未唤醒者", () => {
    expect(ch2NearestSleeping(candidates, new Set(), { ra: 12, dec: 2 })).toBe("东");
    expect(ch2NearestSleeping(candidates, new Set(), { ra: 0, dec: 70 })).toBe("北");
  });
  it("赤经环绕正确（0.1° 视向取 359.9° 候选）", () => {
    expect(ch2NearestSleeping(candidates, new Set(), { ra: 0.1, dec: 0 })).toBe("环");
  });
  it("跳过已唤醒；全醒回 null", () => {
    expect(ch2NearestSleeping(candidates, new Set(["东"]), { ra: 12, dec: 2 })).toBe("环");
    expect(
      ch2NearestSleeping(candidates, new Set(["东", "西", "北", "环"]), { ra: 0, dec: 0 }),
    ).toBeNull();
    expect(ch2NearestSleeping([], new Set(), { ra: 0, dec: 0 })).toBeNull();
  });
});

describe("质心与角距：ch2Centroid / ch2AngularDistanceDeg", () => {
  it("单成员质心即其方向", () => {
    const c = ch2Centroid([{ ra: 101.3, dec: -16.7 }])!;
    expect(c.ra).toBeCloseTo(101.3, 5);
    expect(c.dec).toBeCloseTo(-16.7, 5);
  });
  it("对称双成员质心取中点方向（赤经环绕侧亦正确）", () => {
    const c = ch2Centroid([
      { ra: 359, dec: 0 },
      { ra: 1, dec: 0 },
    ])!;
    expect(Math.abs(c.ra)).toBeCloseTo(0, 4); // 中点 ra≈0（而非 180）
    expect(c.dec).toBeCloseTo(0, 5);
  });
  it("空表或对抵消回 null", () => {
    expect(ch2Centroid([])).toBeNull();
    expect(
      ch2Centroid([
        { ra: 0, dec: 0 },
        { ra: 180, dec: 0 },
      ]),
    ).toBeNull();
  });
  it("角距：同向为 0，正交为 90，对跖为 180", () => {
    expect(ch2AngularDistanceDeg({ ra: 30, dec: 40 }, { ra: 30, dec: 40 })).toBeLessThan(1e-3);
    expect(ch2AngularDistanceDeg({ ra: 0, dec: 0 }, { ra: 90, dec: 0 })).toBeCloseTo(90, 6);
    expect(ch2AngularDistanceDeg({ ra: 0, dec: 0 }, { ra: 123, dec: 90 })).toBeCloseTo(90, 6);
    expect(ch2AngularDistanceDeg({ ra: 10, dec: 20 }, { ra: 190, dec: -20 })).toBeCloseTo(180, 5);
  });
});

describe("泛音音高：ch2PluckFreq", () => {
  it("越亮越高（星等越小频率越高）", () => {
    const sirius = ch2PluckFreq(-1.44); // 天狼
    const mid = ch2PluckFreq(2);
    const dim = ch2PluckFreq(5);
    expect(sirius).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(dim);
  });
  it("暗于 5.5 等一律 A3（220Hz）；天狼 27.76 半音，极亮封顶 28 半音", () => {
    expect(ch2PluckFreq(5.5)).toBeCloseTo(220, 6);
    expect(ch2PluckFreq(9)).toBeCloseTo(220, 6);
    // 天狼 mag=-1.44：(5.5+1.44)×4 = 27.76 半音（未达封顶）
    expect(ch2PluckFreq(-1.44)).toBeCloseTo(220 * Math.pow(2, 27.76 / 12), 4);
    expect(ch2PluckFreq(-10)).toBeCloseTo(220 * Math.pow(2, 28 / 12), 4); // 封顶
  });
});

describe("诗句摘句：ch2PoemExcerpt", () => {
  const text = "北斗之宿七星明，第一主帝名樞精，第二第三璇璣是";
  it("默认取前两分句，以「，」相连", () => {
    expect(ch2PoemExcerpt(text)).toBe("北斗之宿七星明，第一主帝名樞精");
    expect(ch2PoemExcerpt(text, 1)).toBe("北斗之宿七星明");
    expect(ch2PoemExcerpt(text, 99)).toBe(text); // 超出分句数取全句
  });
  it("单句无逗号原样返回；空串安全", () => {
    expect(ch2PoemExcerpt("邱下一狼光蓬茸")).toBe("邱下一狼光蓬茸");
    expect(ch2PoemExcerpt("")).toBe("");
  });
});

describe("存档解析：ch2ParseAwakened", () => {
  it("合法数组原样通过", () => {
    expect(ch2ParseAwakened('["北斗","天狼"]')).toEqual(["北斗", "天狼"]);
    expect(ch2ParseAwakened("[]")).toEqual([]);
  });
  it("坏 JSON / 非数组 / null 一律回空", () => {
    expect(ch2ParseAwakened("{oops")).toEqual([]);
    expect(ch2ParseAwakened('{"a":1}')).toEqual([]);
    expect(ch2ParseAwakened('"北斗"')).toEqual([]);
    expect(ch2ParseAwakened(null)).toEqual([]);
    expect(ch2ParseAwakened("")).toEqual([]);
  });
  it("滤掉非字符串与空串项", () => {
    expect(ch2ParseAwakened('["北斗",1,null,"","天狼"]')).toEqual(["北斗", "天狼"]);
  });
});

describe("常量契约", () => {
  it("沉睡压暗 0.08；凝视 4° / 0.8s；闲置 20s；存档键 ch2-awakened", () => {
    expect(CH2_SLEEP_DIM).toBe(0.08);
    expect(CH2_GAZE_ANGLE_DEG).toBe(4);
    expect(CH2_GAZE_HOLD_S).toBe(0.8);
    expect(CH2_IDLE_PULSE_S).toBe(20);
    expect(CH2_STORAGE_KEY).toBe("ch2-awakened");
  });
});
