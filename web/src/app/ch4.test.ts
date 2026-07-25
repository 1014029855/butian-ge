/**
 * ch4 五站巡游纯逻辑单测：段归属（ch4SegmentOf）、宫墙/站点生长
 * （ch4WallsGrowth/ch4StopGrowth）、绕极转角权重（ch4RotationWeight）、
 * 贴星标签匹配（ch4MatchLabels），以及 CH4_STOPS/相机参数表/真实数据守护。
 *
 * 只覆盖纯函数与静态数据；DOM/投影/相机的每帧路径以人工走查核对（见重构报告）。
 */
import { describe, expect, it } from "vitest";
import starsRaw from "../../public/data/stars.json?raw";
import asterismsRaw from "../../public/data/asterisms.json?raw";
import { CHAPTER_KEYS } from "./CameraRig";
import {
  CH4_CAM_STOPS,
  CH4_OPENING_END,
  CH4_RELEASE,
  CH4_ROT_START,
  CH4_STOP_COUNT,
  CH4_STOP_SPAN,
  CH4_TOUR_END,
  ch4MatchLabels,
  ch4RotationWeight,
  ch4SegmentOf,
  ch4StopGrowth,
  ch4WallsGrowth,
} from "./chapters/ch4";
import { CH4_STOPS } from "./copy";

describe("ch4SegmentOf 段归属", () => {
  it("开场 / 五站 / 收尾边界划分正确", () => {
    expect(ch4SegmentOf(0)).toBe(0);
    expect(ch4SegmentOf(CH4_OPENING_END - 1e-6)).toBe(0);
    expect(ch4SegmentOf(CH4_OPENING_END)).toBe(1);
    expect(ch4SegmentOf(CH4_OPENING_END + CH4_STOP_SPAN)).toBe(2);
    expect(ch4SegmentOf(CH4_OPENING_END + 2 * CH4_STOP_SPAN)).toBe(3);
    expect(ch4SegmentOf(CH4_OPENING_END + 3 * CH4_STOP_SPAN)).toBe(4);
    expect(ch4SegmentOf(CH4_ROT_START - 1e-6)).toBe(4);
    expect(ch4SegmentOf(CH4_ROT_START)).toBe(5); // 第五站·拱北
    expect(ch4SegmentOf(CH4_TOUR_END - 1e-6)).toBe(5);
    expect(ch4SegmentOf(CH4_TOUR_END)).toBe(6);
    expect(ch4SegmentOf(1)).toBe(6);
  });
  it("越界输入按边界归属（防御性钳制）", () => {
    expect(ch4SegmentOf(-0.1)).toBe(0);
    expect(ch4SegmentOf(1.1)).toBe(6);
  });
});

describe("ch4WallsGrowth 宫墙生长", () => {
  it("开场内从 0 线性拉满", () => {
    expect(ch4WallsGrowth(0)).toBe(0);
    expect(ch4WallsGrowth(CH4_OPENING_END / 2)).toBeCloseTo(0.5, 5);
    expect(ch4WallsGrowth(CH4_OPENING_END)).toBe(1);
    expect(ch4WallsGrowth(0.5)).toBe(1); // 之后保持点亮
  });
});

describe("ch4StopGrowth 站点生长", () => {
  it("每站在站头 45% 行程内从 0 拉满，前站保持、后站未点", () => {
    const start = (i: number): number => CH4_OPENING_END + i * CH4_STOP_SPAN;
    for (let i = 0; i < CH4_STOP_COUNT; i++) {
      expect(ch4StopGrowth(start(i) - 1e-6, i)).toBe(0);
      expect(ch4StopGrowth(start(i), i)).toBe(0);
      expect(ch4StopGrowth(start(i) + CH4_STOP_SPAN * 0.225, i)).toBeCloseTo(0.5, 5);
      expect(ch4StopGrowth(start(i) + CH4_STOP_SPAN * 0.45, i)).toBeCloseTo(1, 10);
      expect(ch4StopGrowth(1, i)).toBe(1);
    }
    // 第二站站头：第一站已满、第三站未点
    expect(ch4StopGrowth(start(1), 0)).toBe(1);
    expect(ch4StopGrowth(start(1), 2)).toBe(0);
  });
  it("随 p 单调不减（scrub 回滚无倒退跳变）", () => {
    for (let i = 0; i < CH4_STOP_COUNT; i++) {
      let prev = 0;
      for (let p = 0; p <= 1; p += 0.01) {
        const cur = ch4StopGrowth(p, i);
        expect(cur).toBeGreaterThanOrEqual(prev);
        prev = cur;
      }
    }
  });
});

describe("ch4RotationWeight 绕极转角权重", () => {
  it("第五站外为 0，第五站内为 1，收尾缓回 0", () => {
    expect(ch4RotationWeight(0)).toBe(0);
    expect(ch4RotationWeight(CH4_ROT_START - 0.02)).toBe(0); // 淡入起点
    expect(ch4RotationWeight(CH4_ROT_START)).toBe(1);
    expect(ch4RotationWeight(CH4_TOUR_END - 1e-6)).toBeCloseTo(1, 5);
    expect(ch4RotationWeight(CH4_TOUR_END)).toBe(1); // 收尾开始仍为 1（缓出而非跳变）
    expect(ch4RotationWeight(0.945)).toBeCloseTo(0.5, 5); // 缓出中点
    expect(ch4RotationWeight(0.97)).toBe(0);
    expect(ch4RotationWeight(1)).toBe(0); // 章末有效转角为 0，exit 归零无跳变
  });
  it("值域恒在 [0,1]", () => {
    for (let p = 0; p <= 1; p += 0.005) {
      const w = ch4RotationWeight(p);
      expect(w).toBeGreaterThanOrEqual(0);
      expect(w).toBeLessThanOrEqual(1);
    }
  });
});

describe("ch4MatchLabels 贴星标签匹配", () => {
  const members = [
    { hip: 1, name: "北极五" },
    { hip: 2, name: "北极四" },
    { hip: 3, name: "北极三" },
    { hip: 4, name: "北极二" },
    { hip: 5, name: "北极一" },
  ];
  it("星名匹配优先于数据顺序（真实数据顺序与传统星序相反）", () => {
    const m = ch4MatchLabels(members, ["北极一", "北极二"]);
    expect(m[0]?.hip).toBe(5);
    expect(m[1]?.hip).toBe(4);
  });
  it("星名缺失时按成员数据顺序兜底", () => {
    const noNames = members.map((m) => ({ hip: m.hip, name: null }));
    const m = ch4MatchLabels(noNames, ["太子", "帝", "庶子"]);
    expect(m.map((x) => x?.hip)).toEqual([1, 2, 3]);
  });
  it("star 缺省同样走数据顺序兜底，且不重复占用成员", () => {
    const m = ch4MatchLabels(members, ["北极三", undefined, undefined]);
    expect(m[0]?.hip).toBe(3);
    expect(m[1]?.hip).toBe(1); // 北极三已被占用，从头顺序取未占用者
    expect(m[2]?.hip).toBe(2);
  });
  it("成员不足返回 null（该标签不显示）", () => {
    const m = ch4MatchLabels(members.slice(0, 1), ["北极五", "帝"]);
    expect(m[0]?.hip).toBe(1);
    expect(m[1]).toBeNull();
  });
});

describe("CH4_STOPS 站点表形状", () => {
  it("五站、key 唯一、站 1/2/3/4 有星官组与标签，站 5 无标签", () => {
    expect(CH4_STOPS).toHaveLength(CH4_STOP_COUNT);
    expect(new Set(CH4_STOPS.map((s) => s.key)).size).toBe(CH4_STOP_COUNT);
    CH4_STOPS.forEach((s, i) => {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.story.length).toBeGreaterThan(0);
      if (i < 4) {
        expect(s.groups.length).toBeGreaterThan(0);
        expect((s.labels ?? []).length).toBeGreaterThan(0);
      } else {
        expect(s.labels).toBeUndefined(); // 拱北无贴星标签
      }
    });
    expect(CH4_STOPS[0]?.labels).toHaveLength(5); // 北极五星：太子/帝/庶子/后宫/天枢
  });
});

describe("CH4_CAM_STOPS 相机参数表", () => {
  it("开场+五站共 6 项，全部指向北天拱极区", () => {
    expect(CH4_CAM_STOPS).toHaveLength(CH4_STOP_COUNT + 1);
    for (const s of CH4_CAM_STOPS) {
      expect(s.dec).toBeGreaterThan(60); // 紫微垣环极
      expect(s.fov).toBeGreaterThan(10);
      expect(s.fov).toBeLessThan(140);
      expect(s.gazeW).toBeGreaterThan(0);
      expect(s.gazeW).toBeLessThanOrEqual(1);
    }
  });
  it("巡游半径低于 0.8R（避开球内→球外过渡区）", () => {
    for (const s of CH4_CAM_STOPS) expect(s.radius).toBeLessThan(0.8);
  });
  it("开场目标与 ch4 底座关键帧同指紫微垣中心（frame 接管零跳变）", () => {
    const key = CHAPTER_KEYS[3];
    expect(key?.gaze).toBe("target");
    expect(CH4_CAM_STOPS[0]?.ra).toBeCloseTo(key?.target?.ra ?? NaN, 5);
    expect(CH4_CAM_STOPS[0]?.dec).toBeCloseTo(key?.target?.dec ?? NaN, 5);
  });
});

describe("CH4_RELEASE 收尾衔接", () => {
  it("与 CHAPTER_KEYS[4]（ch5 穿出球外关键帧）同值", () => {
    const key = CHAPTER_KEYS[4];
    expect(CH4_RELEASE.radius).toBe(key?.radius);
    expect(CH4_RELEASE.fov).toBe(key?.fov);
    // dir 与关键帧字面量一致（归一化是两侧各自的使用细节：rig 在 blend 内、
    // ch4 在 RELEASE_DIR 预算时）
    const d = key?.dir ?? [0, 1, 0];
    expect(CH4_RELEASE.dir[0]).toBe(d[0]);
    expect(CH4_RELEASE.dir[1]).toBe(d[1]);
    expect(CH4_RELEASE.dir[2]).toBe(d[2]);
  });
});

describe("贴星标签与真实数据一致（public/data 守护）", () => {
  interface StarRec {
    hip: number;
    ra: number;
    dec: number;
    name: string | null;
  }
  const stars = JSON.parse(starsRaw) as { stars: StarRec[] };
  const ast = JSON.parse(asterismsRaw) as { asterisms: { name: string; stars: number[] }[] };
  const byHip = new Map(stars.stars.map((s) => [s.hip, s]));
  const byName = new Map(ast.asterisms.map((a) => [a.name, a]));

  it("各站 groups 均为真实星官名", () => {
    const groups = CH4_STOPS.flatMap((s) => s.groups);
    for (const g of [...groups, "紫微左垣", "紫微右垣"]) {
      expect(byName.has(g), `星官「${g}」应存在于 asterisms.json`).toBe(true);
    }
  });

  it("每个标签的 star 都能按星名匹配到本站成员（不缺名、不写错）", () => {
    CH4_STOPS.forEach((stop) => {
      const pool = stop.groups.flatMap((g) =>
        (byName.get(g)?.stars ?? [])
          .map((hip) => byHip.get(hip))
          .filter((s): s is StarRec => s !== undefined),
      );
      const labels = stop.labels ?? [];
      const matched = ch4MatchLabels(
        pool,
        labels.map((l) => l.star),
      );
      labels.forEach((label, i) => {
        const hit = matched[i];
        expect(hit, `${stop.key} 站标签「${label.text}」应匹配到成员星`).not.toBeNull();
        if (label.star) expect(hit?.name).toBe(label.star);
      });
    });
  });
});
