import { describe, it, expect } from "vitest";
import * as THREE from "three";
import {
  createBurst,
  createMeteor,
  burstAlpha,
  burstDamp,
  meteorFade,
  greatCirclePoint,
  BURST_COUNT,
  BURST_DRAG,
  BURST_LIFE_S,
  BURST_SPEED,
  METEOR_LIFE_MIN_S,
  METEOR_LIFE_MAX_S,
} from "./particles";

/** 确定性随机源：恒 0.5（速度/弧长/寿命/延迟全部取区间中点） */
const mid = () => 0.5;

function lineOf(e: { object: THREE.Object3D }): THREE.Line {
  return (e.object as THREE.Group).children[0] as THREE.Line;
}
function headOf(e: { object: THREE.Object3D }): THREE.Points {
  return (e.object as THREE.Group).children[1] as THREE.Points;
}

describe("burstAlpha 透明度衰减", () => {
  it("t=0 为 1，t=寿命一半为 0.5，t≥1.2s 为 0（越界钳制）", () => {
    expect(burstAlpha(0)).toBe(1);
    expect(burstAlpha(BURST_LIFE_S / 2)).toBeCloseTo(0.5, 6);
    expect(burstAlpha(BURST_LIFE_S)).toBe(0);
    expect(burstAlpha(99)).toBe(0);
    expect(burstAlpha(-1)).toBe(1);
  });
});

describe("burstDamp 速度阻尼（契约「0.9 重力衰减」）", () => {
  it("dt=0 不衰减；dt=1s 保留 exp(-0.9)", () => {
    expect(burstDamp(0)).toBe(1);
    expect(burstDamp(1)).toBeCloseTo(Math.exp(-BURST_DRAG), 6);
    expect(burstDamp(1)).toBeCloseTo(0.4066, 3);
  });
});

describe("createBurst 初始化", () => {
  it("默认 90 粒，全部从 p 出发", () => {
    const b = createBurst({ x: 1, y: 2, z: 3 }, { rand: mid });
    const pos = (b.object as THREE.Points).geometry.getAttribute("position");
    expect(pos.count).toBe(BURST_COUNT);
    for (let i = 0; i < pos.count; i++) {
      expect(pos.getX(i)).toBe(1);
      expect(pos.getY(i)).toBe(2);
      expect(pos.getZ(i)).toBe(3);
    }
    b.dispose();
  });
  it("count/speed 可选覆盖；初速 = 法向分量 + 随机切向", () => {
    const speed = 10;
    const b = createBurst({ x: 0, y: 0, z: 100 }, { count: 8, speed, rand: mid });
    const pos = (b.object as THREE.Points).geometry.getAttribute("position");
    expect(pos.count).toBe(8);
    // rand=0.5：vn = 0.775·speed，vt = 0.35·speed，合成 |v| = hypot(0.775, 0.35)·speed
    b.update(0.1);
    const damp = burstDamp(0.1);
    const step = Math.hypot(0.775, 0.35) * speed * damp * 0.1;
    const dx = pos.getX(0);
    const dz = pos.getZ(0) - 100;
    expect(Math.hypot(dx, dz)).toBeCloseTo(step, 5);
    // 法向（+z）分量向外：dz > 0
    expect(dz).toBeGreaterThan(0);
    b.dispose();
  });
  it("默认初速量级：法向分量落在 [0.55, 1] × BURST_SPEED", () => {
    const b = createBurst({ x: 0, y: 0, z: 100 }); // Math.random 驱动
    const pos = (b.object as THREE.Points).geometry.getAttribute("position");
    b.update(0.05);
    for (let i = 0; i < pos.count; i++) {
      const dz = pos.getZ(i) - 100;
      expect(dz).toBeGreaterThan(0);
      expect(dz).toBeLessThanOrEqual(BURST_SPEED * 0.05 + 1e-9);
    }
    b.dispose();
  });
});

describe("createBurst 生命周期", () => {
  it("透明度随寿命线性下降，位移逐步收窄（阻尼生效）", () => {
    const b = createBurst({ x: 0, y: 0, z: 100 }, { count: 1, rand: mid });
    const pos = (b.object as THREE.Points).geometry.getAttribute("position");
    b.update(0.1);
    const step1 = Math.hypot(pos.getX(0), pos.getZ(0) - 100);
    b.update(0.1);
    const step2 = Math.hypot(pos.getX(0), pos.getZ(0) - 100) - step1;
    expect(step2).toBeLessThan(step1);
    expect(step2).toBeGreaterThan(0);
    const mat = (b.object as THREE.Points).material as THREE.PointsMaterial;
    expect(mat.opacity).toBeCloseTo(burstAlpha(0.2), 6);
    b.dispose();
  });
  it("1.2s 后 update 返回 false 并自行从父节点移除；dispose 幂等", () => {
    const parent = new THREE.Group();
    const b = createBurst({ x: 0, y: 0, z: 100 }, { count: 4, rand: mid });
    parent.add(b.object);
    expect(b.update(0.6)).toBe(true);
    expect(b.update(0.5)).toBe(true);
    expect(b.update(0.2)).toBe(false); // 累计 1.3s > 1.2s
    expect(parent.children.length).toBe(0);
    expect(b.update(0.1)).toBe(false); // 死后保持 false
    expect(() => {
      b.dispose();
      b.dispose();
    }).not.toThrow();
  });
  it("原点兜底不产生 NaN", () => {
    const b = createBurst({ x: 0, y: 0, z: 0 }, { count: 4, rand: mid });
    b.update(0.1);
    const pos = (b.object as THREE.Points).geometry.getAttribute("position");
    expect(Number.isFinite(pos.getX(0))).toBe(true);
    expect(Number.isFinite(pos.getY(0))).toBe(true);
    expect(Number.isFinite(pos.getZ(0))).toBe(true);
    b.dispose();
  });
});

describe("meteorFade 亮度包络", () => {
  it("两端为 0，中段接近 1（快入缓出）", () => {
    expect(meteorFade(0)).toBe(0);
    expect(meteorFade(1)).toBeCloseTo(0, 6);
    expect(meteorFade(0.5)).toBeGreaterThan(0.95);
    expect(meteorFade(-0.1)).toBe(0);
  });
});

describe("greatCirclePoint 大圆插值", () => {
  it("θ=π/2 时落在行进方向矢量上", () => {
    const a = new THREE.Vector3(1, 0, 0);
    const t = new THREE.Vector3(0, 1, 0);
    const out = greatCirclePoint(a, t, Math.PI / 2, new THREE.Vector3());
    expect(out.x).toBeCloseTo(0, 6);
    expect(out.y).toBeCloseTo(1, 6);
    expect(out.z).toBeCloseTo(0, 6);
  });
});

describe("createMeteor 生命周期", () => {
  it("结构：Line 长尾 25 顶点（头亮尾黑）+ 头部亮点", () => {
    const m = createMeteor(97, { rand: mid });
    expect((m.object as THREE.Group).children.length).toBe(2);
    const line = lineOf(m);
    const pos = line.geometry.getAttribute("position");
    const col = line.geometry.getAttribute("color");
    expect(pos.count).toBe(25);
    expect(col.getX(0)).toBeCloseTo(1, 6); // 头部最亮
    expect(col.getX(24)).toBe(0); // 尾端全黑（加色混合下透明）
    m.dispose();
  });
  it("rand=0.5：延迟 0.175s 后才可见，寿命 1.25s（区间中点）", () => {
    const m = createMeteor(97, { rand: mid });
    expect(METEOR_LIFE_MIN_S).toBeLessThan(1.25);
    expect(METEOR_LIFE_MAX_S).toBeGreaterThan(1.25);
    expect(m.update(0.1)).toBe(true); // 累计 0.1 < 0.175：仍在延迟
    expect(m.object.visible).toBe(false);
    expect(m.update(0.1)).toBe(true); // 累计 0.2：进入视野
    expect(m.object.visible).toBe(true);
    const head = headOf(m).geometry.getAttribute("position");
    // theta = 0.875 × (0.025/1.25) = 0.0175，a=(-1,0,0)，dir=(0,0,-1)
    expect(head.getX(0)).toBeCloseTo(-97 * Math.cos(0.0175), 3);
    expect(head.getZ(0)).toBeCloseTo(-97 * Math.sin(0.0175), 3);
    m.dispose();
  });
  it("头部沿大圆推进，delay+life 后 update 返回 false 并自行移除", () => {
    const parent = new THREE.Group();
    const m = createMeteor(97, { rand: mid });
    parent.add(m.object);
    m.update(0.2); // 起步（0.175 延迟刚过）
    const head = headOf(m).geometry.getAttribute("position");
    const x0 = head.getX(0);
    m.update(0.5);
    const x1 = head.getX(0);
    expect(Math.abs(x1 - x0)).toBeGreaterThan(1); // 持续推进
    expect(m.update(0.5)).toBe(true); // 累计 1.2 < 1.425
    expect(m.update(0.5)).toBe(false); // 累计 1.7 > 0.175+1.25
    expect(parent.children.length).toBe(0);
    expect(() => m.dispose()).not.toThrow();
  });
});
