/**
 * CameraRig 纯逻辑测试：关键帧保持、插值中点、章节边界连续性、
 * gaze 权重让位、全局进度映射与参数校验。
 */
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { CameraRig, CHAPTER_KEYS, CHAPTER_HOLD, INSIDE_R, gazeQuat, type CameraKey } from "./CameraRig";
import { radecToVec3 } from "../sky3d/coords";

const KEYS: readonly CameraKey[] = [
  { radius: 1, fov: 78, gaze: "free", drift: 0.01 },
  { radius: 1, fov: 65, gaze: "target", target: { ra: 30, dec: 78 } },
  { radius: 3, dir: [0.28, 0.92, 0.26], fov: 50, gaze: "free", orbit: true },
];

describe("CameraRig 构造校验", () => {
  it("少于 2 个关键帧抛错", () => {
    expect(() => new CameraRig([KEYS[0]])).toThrow();
  });
  it("非法 radius / fov / gaze 抛错", () => {
    expect(() => new CameraRig([{ ...KEYS[0], radius: 0 }, KEYS[1]])).toThrow();
    expect(() => new CameraRig([{ ...KEYS[0], fov: 200 }, KEYS[1]])).toThrow();
    expect(
      () => new CameraRig([{ ...KEYS[0], gaze: "lock" as never }, KEYS[1]]),
    ).toThrow();
  });
  it("接受合法关键帧并报告章节数", () => {
    expect(new CameraRig(KEYS).count).toBe(3);
  });
});

describe("保持区（hold）", () => {
  const rig = new CameraRig(KEYS);
  it("章节起点精确返回本章关键帧", () => {
    const s = rig.sample(0, 0);
    expect(s.radius).toBeCloseTo(1);
    expect(s.fov).toBeCloseTo(78);
    expect(s.drift).toBeCloseTo(0.01);
    expect(s.gazeBlend).toBe(0); // free
    expect(s.gazeTargetQ).toBeNull();
    expect(s.orbit).toBe(0);
  });
  it("保持区内任意点都保持本章关键帧", () => {
    const s = rig.sample(0, CHAPTER_HOLD);
    expect(s.fov).toBeCloseTo(78);
    const s2 = rig.sample(1, CHAPTER_HOLD * 0.5);
    expect(s2.fov).toBeCloseTo(65);
    expect(s2.gazeBlend).toBe(1); // target
  });
  it("缺省 dir 为 +Y", () => {
    const s = rig.sample(0, 0);
    expect(s.dir.x).toBeCloseTo(0);
    expect(s.dir.y).toBeCloseTo(1);
    expect(s.dir.z).toBeCloseTo(0);
  });
});

describe("过渡区插值", () => {
  const rig = new CameraRig(KEYS);
  it("过渡中点数值取两章均值（smoothstep(0.5)=0.5）", () => {
    const mid = CHAPTER_HOLD + (1 - CHAPTER_HOLD) / 2;
    const s = rig.sample(0, mid);
    expect(s.fov).toBeCloseTo((78 + 65) / 2);
    expect(s.gazeBlend).toBeCloseTo(0.5); // free → target
    expect(s.drift).toBeCloseTo(0.005);
  });
  it("单侧目标时注视四元数由有目标一侧提供", () => {
    const mid = CHAPTER_HOLD + (1 - CHAPTER_HOLD) / 2;
    const s = rig.sample(0, mid); // free（无目标）→ target（有目标）
    expect(s.gazeTargetQ).not.toBeNull();
  });
  it("双侧目标时注视四元数 slerp", () => {
    const keys: readonly CameraKey[] = [
      { radius: 1, fov: 60, gaze: "target", target: { ra: 0, dec: 0 } },
      { radius: 1, fov: 60, gaze: "target", target: { ra: 60, dec: 0 } },
    ];
    const s = new CameraRig(keys).sample(0, CHAPTER_HOLD + (1 - CHAPTER_HOLD) / 2);
    expect(s.gazeTargetQ).not.toBeNull();
    // slerp 中点应与两端各成 ~30° 角
    const qa = gazeQuat(0, 0);
    const qb = gazeQuat(60, 0);
    const angA = 2 * Math.acos(Math.min(1, Math.abs(s.gazeTargetQ!.dot(qa))));
    const angB = 2 * Math.acos(Math.min(1, Math.abs(s.gazeTargetQ!.dot(qb))));
    expect(angA).toBeCloseTo(angB, 5);
    expect(angA).toBeCloseTo(Math.PI / 6, 2);
  });
});

describe("章节边界连续性", () => {
  const rig = new CameraRig(KEYS);
  for (const i of [0, 1]) {
    it(`ch${i + 1} 终点 === ch${i + 2} 起点`, () => {
      const a = rig.sample(i, 1);
      const b = rig.sample(i + 1, 0);
      expect(a.radius).toBeCloseTo(b.radius);
      expect(a.fov).toBeCloseTo(b.fov);
      expect(a.gazeBlend).toBeCloseTo(b.gazeBlend);
      expect(a.orbit).toBeCloseTo(b.orbit);
      expect(a.dir.distanceTo(b.dir)).toBeLessThan(1e-6);
    });
  }
});

describe("全局进度 sampleGlobal", () => {
  const rig = new CameraRig(KEYS);
  it("g = i + lp 等价于 sample(i, lp)", () => {
    for (const g of [0, 0.3, 1.0, 1.72, 2.4, 3]) {
      const a = rig.sampleGlobal(g);
      const i = Math.min(Math.floor(g), KEYS.length - 1);
      const b = rig.sample(i, g - i);
      expect(a.fov).toBeCloseTo(b.fov);
      expect(a.radius).toBeCloseTo(b.radius);
    }
  });
  it("越界钳制不抛错", () => {
    expect(() => rig.sampleGlobal(-5)).not.toThrow();
    expect(rig.sampleGlobal(-5).fov).toBeCloseTo(78);
    expect(() => rig.sampleGlobal(99)).not.toThrow();
    expect(rig.sampleGlobal(99).radius).toBeCloseTo(3);
  });
});

describe("gazeQuat 与天空嵌入同向（radecToVec3 基准，无滚转）", () => {
  it("ra=0, dec=80 朝向北天极附近", () => {
    const q = gazeQuat(0, 80);
    const v = new THREE.Vector3(0, 0, -1).applyQuaternion(q);
    expect(Math.asin(Math.min(1, Math.max(-1, v.y))) * (180 / Math.PI)).toBeCloseTo(80, 4);
    expect(v.length()).toBeCloseTo(1, 6);
  });
  it("前向（-Z）精确指向 radecToVec3(ra,dec)（回归：脚本注视镜像 bug）", () => {
    const cases: readonly [number, number][] = [
      [90, 0], // ra=90° 必须在 +Z（天空嵌入锚点）
      [247.2, -26.8], // 心宿
      [186, 56.5], // 北斗
      [0, 0],
      [175, 81], // 紫微垣
    ];
    for (const [ra, dec] of cases) {
      const v = new THREE.Vector3(0, 0, -1).applyQuaternion(gazeQuat(ra, dec));
      const [x, y, z] = radecToVec3(ra, dec, 1);
      expect(v.x).toBeCloseTo(x, 5);
      expect(v.y).toBeCloseTo(y, 5);
      expect(v.z).toBeCloseTo(z, 5);
    }
  });
});

describe("内置八章关键帧 CHAPTER_KEYS", () => {
  it("共 8 章且全部合法", () => {
    expect(CHAPTER_KEYS).toHaveLength(8);
    expect(() => new CameraRig(CHAPTER_KEYS)).not.toThrow();
  });
  it("叙事节奏：球内 INSIDE_R×4 → 球外 3R(5,6,7) → 5R 渐远(8)", () => {
    // 球内章必须留在过渡区下限 0.8R 以内：r≥0.8R 拖拽半重、r≥R 拾取禁用
    expect(INSIDE_R).toBeLessThan(0.8);
    expect(CHAPTER_KEYS.slice(0, 4).every((k) => k.radius === INSIDE_R)).toBe(true);
    expect(CHAPTER_KEYS.slice(4, 7).every((k) => k.radius === 3)).toBe(true);
    expect(CHAPTER_KEYS[7].radius).toBe(5);
  });
  it("ch2 自由环视、ch4 脚本注视、ch5 起轨道开启", () => {
    expect(CHAPTER_KEYS[1].gaze).toBe("free");
    expect(CHAPTER_KEYS[3].gaze).toBe("target");
    expect(CHAPTER_KEYS[4].orbit).toBe(true);
  });
  it("ch4 注视紫微垣中心（成员均值 ra175°/dec81° 附近）", () => {
    const t = CHAPTER_KEYS[3].target!;
    // 紫微垣成员星矢量均值 ra≈174.9°/dec≈80.9°（asterisms.json 估算）
    expect(t.ra).toBeGreaterThan(160);
    expect(t.ra).toBeLessThan(190);
    expect(t.dec).toBeGreaterThan(75);
    expect(t.dec).toBeLessThan(86);
  });
  it("ch5 与 ch6 同机位（两章间相机静止）", () => {
    const [a, b] = [CHAPTER_KEYS[4], CHAPTER_KEYS[5]];
    expect(a.radius).toBe(b.radius);
    expect(a.fov).toBe(b.fov);
    expect(a.gaze).toBe(b.gaze);
    expect(a.orbit).toBe(b.orbit);
    expect(a.dir).toEqual(b.dir);
  });
  it("球外相邻章方位摆动 ≤ 45°（ch6→ch7→ch8 折中后 ~38°）", () => {
    const angle = (i: number, j: number): number => {
      const u = new THREE.Vector3(...(CHAPTER_KEYS[i].dir ?? [0, 1, 0])).normalize();
      const v = new THREE.Vector3(...(CHAPTER_KEYS[j].dir ?? [0, 1, 0])).normalize();
      return THREE.MathUtils.radToDeg(u.angleTo(v));
    };
    expect(angle(5, 6)).toBeLessThanOrEqual(45); // ch6 → ch7
    expect(angle(6, 7)).toBeLessThanOrEqual(45); // ch7 → ch8
  });
  it("ch2 hold=1：自由探索区交互权重全程不被削弱（回归：拖拽死区）", () => {
    const rig = new CameraRig(CHAPTER_KEYS);
    // 章尾（p=0.9，「现在，把星空交给你」面板区）gazeBlend 必须仍为 0
    expect(rig.sample(1, 0.9).gazeBlend).toBe(0);
    expect(rig.sample(1, 1).gazeBlend).toBe(0);
  });
  it("ch3 enter=0.3：脚本接管挪到章首阅读区，且与 ch2 边界连续", () => {
    const rig = new CameraRig(CHAPTER_KEYS);
    expect(rig.sample(2, 0).gazeBlend).toBe(0); // 章首仍是 ch2 的自由视角
    expect(rig.sample(2, 0.3).gazeBlend).toBeCloseTo(1); // 渐入完成 → 脚本注视
    expect(rig.sample(2, 0.5).gazeBlend).toBeCloseTo(1);
    // 边界连续：ch2 章尾 == ch3 章首
    const a = rig.sample(1, 1);
    const b = rig.sample(2, 0);
    expect(a.gazeBlend).toBeCloseTo(b.gazeBlend);
    expect(a.radius).toBeCloseTo(b.radius);
  });
  it("enter > 0 但上一章 hold < 1 时构造抛错（边界不连续的非法组合）", () => {
    const bad: CameraKey[] = [
      { radius: 1, fov: 78, gaze: "free" }, // hold 缺省 0.65 < 1
      { radius: 1, fov: 65, gaze: "target", enter: 0.3 },
    ];
    expect(() => new CameraRig(bad)).toThrow();
  });
});
