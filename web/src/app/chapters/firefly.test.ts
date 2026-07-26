/**
 * firefly 流萤星使单测：
 *   - 纯函数：趋近速度（fireflyApproachSpeed）、盘旋判定与轨道半径收敛
 *     （fireflyInOrbitRange / fireflyOrbitRadiusStep）、0.6s 淡入淡出
 *     （fireflyFadeStep）、呼吸（fireflyBreath）、低频漂移（fireflyDrift）、
 *     尾迹衰减（fireflyTrailFade / fireflyTrailSize）；
 *   - 对象行为（node 环境无 DOM，纹理回退 null 不影响断言）：契约形状与
 *     视觉约定（Sprite additive/depthTest:false + Points 拖尾 14 点）、
 *     flyTo 趋近→盘旋全流程、限速与 dt 钳制、帧率无关性、setVisible 非瞬切、
 *     pulse 呼吸调制、尾迹逐帧写入、dispose 幂等。
 */
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  FIREFLY_APPROACH_GAIN,
  FIREFLY_BREATH_PERIOD,
  FIREFLY_DRIFT_AMP,
  FIREFLY_DT_MAX,
  FIREFLY_FADE_SECONDS,
  FIREFLY_MAX_SPEED,
  FIREFLY_ORBIT_ENTER_DIST,
  FIREFLY_ORBIT_ENTER_K,
  FIREFLY_ORBIT_OMEGA,
  FIREFLY_ORBIT_RADIUS,
  FIREFLY_SKY_R,
  FIREFLY_TRAIL_COUNT,
  createFirefly,
  fireflyApproachSpeed,
  fireflyBreath,
  fireflyDrift,
  fireflyFadeStep,
  fireflyInOrbitRange,
  fireflyOrbitRadiusStep,
  fireflyTrailFade,
  fireflyTrailSize,
  type Firefly,
} from "./firefly";

// ---------------------------------------------------------------- 工具

function spriteOf(f: Firefly): THREE.Sprite {
  const s = f.group.children.find((c): c is THREE.Sprite => (c as THREE.Sprite).isSprite);
  if (!s) throw new Error("firefly 缺少本体 Sprite");
  return s;
}

function pointsOf(f: Firefly): THREE.Points {
  const p = f.group.children.find((c): c is THREE.Points => (c as THREE.Points).isPoints);
  if (!p) throw new Error("firefly 缺少尾迹 Points");
  return p;
}

/** 以固定步长推进 seconds 秒（默认 60fps） */
function sim(f: Firefly, seconds: number, dt = 1 / 60): void {
  for (let t = 0; t < seconds - 1e-9; t += dt) f.update(dt);
}

/** 天球另一端的目标（距出生点约 180，趋近段大部分在限速区） */
const FAR = new THREE.Vector3(-40, 30, 80);
/** 出生点（与 firefly.ts 的 SPAWN 一致；初始隐藏所以位置本不重要，仅供距离推算） */
const SPAWN = new THREE.Vector3(14, 8, -90);

// ---------------------------------------------------------------- 契约形状与视觉约定

describe("契约形状与视觉约定", () => {
  it("导出契约方法，group 为 THREE.Group，初始隐藏（setVisible 淡入登场）", () => {
    const f = createFirefly();
    expect(f.group).toBeInstanceOf(THREE.Group);
    expect(typeof f.flyTo).toBe("function");
    expect(typeof f.pulse).toBe("function");
    expect(typeof f.setVisible).toBe("function");
    expect(typeof f.update).toBe("function");
    expect(typeof f.dispose).toBe("function");
    expect(f.group.visible).toBe(false);
    f.dispose();
  });
  it("视觉 = 柔光 Sprite（additive、depthTest:false）+ 短尾迹 THREE.Points（12~16 点）", () => {
    const f = createFirefly();
    const sprite = spriteOf(f);
    const sm = sprite.material;
    expect(sm.transparent).toBe(true);
    expect(sm.blending).toBe(THREE.AdditiveBlending);
    expect(sm.depthTest).toBe(false); // 恒浮于星点之上——指引物必须能被看见
    expect(sm.depthWrite).toBe(false);
    expect(sm.map === null || (sm.map as THREE.Texture).isTexture).toBe(true); // node 回退 null

    const points = pointsOf(f);
    const tm = points.material as THREE.ShaderMaterial;
    expect(tm.isShaderMaterial).toBe(true); // 逐点 aSize/aFade 衰减缩小
    expect(tm.blending).toBe(THREE.AdditiveBlending);
    expect(tm.depthTest).toBe(false);
    const geo = points.geometry;
    expect(geo.getAttribute("position").count).toBe(FIREFLY_TRAIL_COUNT);
    expect(geo.getAttribute("aSize").count).toBe(FIREFLY_TRAIL_COUNT);
    expect(geo.getAttribute("aFade").count).toBe(FIREFLY_TRAIL_COUNT);
    expect(FIREFLY_TRAIL_COUNT).toBeGreaterThanOrEqual(12);
    expect(FIREFLY_TRAIL_COUNT).toBeLessThanOrEqual(16);
    f.dispose();
  });
});

// ---------------------------------------------------------------- 纯函数：运动学

describe("fireflyApproachSpeed 趋近速度", () => {
  it("远处限速 FIREFLY_MAX_SPEED", () => {
    expect(fireflyApproachSpeed(100)).toBe(FIREFLY_MAX_SPEED);
    expect(fireflyApproachSpeed(FIREFLY_MAX_SPEED / FIREFLY_APPROACH_GAIN)).toBe(FIREFLY_MAX_SPEED);
    expect(fireflyApproachSpeed(20)).toBe(FIREFLY_MAX_SPEED); // 20×1.6=32 被限速
  });
  it("近处速度随距离线性衰减（距离×增益）", () => {
    expect(fireflyApproachSpeed(10)).toBeCloseTo(10 * FIREFLY_APPROACH_GAIN, 10);
    expect(fireflyApproachSpeed(5)).toBeCloseTo(5 * FIREFLY_APPROACH_GAIN, 10);
    expect(fireflyApproachSpeed(5)).toBeLessThan(fireflyApproachSpeed(10));
  });
  it("零距离/负距离归零（防御）", () => {
    expect(fireflyApproachSpeed(0)).toBe(0);
    expect(fireflyApproachSpeed(-3)).toBe(0);
  });
});

describe("盘旋判定与轨道半径收敛", () => {
  it("进入盘旋阈值 = 8% 天球半径（0.08 × 100 = 8）", () => {
    expect(FIREFLY_SKY_R).toBe(100);
    expect(FIREFLY_ORBIT_ENTER_K).toBeCloseTo(0.08, 10);
    expect(FIREFLY_ORBIT_ENTER_DIST).toBeCloseTo(8, 10);
    expect(fireflyInOrbitRange(0)).toBe(true);
    expect(fireflyInOrbitRange(FIREFLY_ORBIT_ENTER_DIST)).toBe(true);
    expect(fireflyInOrbitRange(FIREFLY_ORBIT_ENTER_DIST + 1e-6)).toBe(false);
  });
  it("fireflyOrbitRadiusStep：精确指数收敛到盘旋半径（帧率无关）", () => {
    expect(fireflyOrbitRadiusStep(8, 0)).toBe(8); // dt=0 不动
    const r1 = fireflyOrbitRadiusStep(8, 0.1);
    expect(r1).toBeCloseTo(FIREFLY_ORBIT_RADIUS + (8 - FIREFLY_ORBIT_RADIUS) * Math.exp(-2.2 * 0.1), 10);
    expect(r1).toBeLessThan(8);
    expect(r1).toBeGreaterThan(FIREFLY_ORBIT_RADIUS);
    // 大步长不越过目标、长时间收敛
    expect(fireflyOrbitRadiusStep(8, 100)).toBeCloseTo(FIREFLY_ORBIT_RADIUS, 6);
    // 从小半径（贴脸 flyTo）向外同样收敛
    const r2 = fireflyOrbitRadiusStep(0.5, 0.1);
    expect(r2).toBeGreaterThan(0.5);
    expect(r2).toBeLessThan(FIREFLY_ORBIT_RADIUS);
    expect(FIREFLY_ORBIT_RADIUS).toBeLessThan(FIREFLY_ORBIT_ENTER_DIST); // 小圆慢转，而非停在阈值上
  });
});

// ---------------------------------------------------------------- 纯函数：淡入淡出

describe("fireflyFadeStep 淡入淡出（~0.6s）", () => {
  it("契约时长 0.6s", () => {
    expect(FIREFLY_FADE_SECONDS).toBeCloseTo(0.6, 10);
  });
  it("0→1 恰好 0.6s，中途线性", () => {
    expect(fireflyFadeStep(0, 1, 0.3)).toBeCloseTo(0.5, 10);
    expect(fireflyFadeStep(0, 1, FIREFLY_FADE_SECONDS)).toBe(1);
    expect(fireflyFadeStep(1, 0, FIREFLY_FADE_SECONDS)).toBe(0);
  });
  it("不越界（过冲钳到 target），dt≤0 不动", () => {
    expect(fireflyFadeStep(0.8, 1, 0.6)).toBe(1);
    expect(fireflyFadeStep(0.2, 0, 0.6)).toBe(0);
    expect(fireflyFadeStep(0.4, 1, 0)).toBe(0.4);
    expect(fireflyFadeStep(0.4, 1, -1)).toBe(0.4);
  });
  it("帧率无关：2×0.3s 与 6×0.1s 与 1×0.6s 结果一致", () => {
    const a = fireflyFadeStep(fireflyFadeStep(0, 1, 0.3), 1, 0.3);
    let b = 0;
    for (let i = 0; i < 6; i++) b = fireflyFadeStep(b, 1, 0.1);
    const c = fireflyFadeStep(0, 1, 0.6);
    expect(a).toBeCloseTo(c, 10);
    expect(b).toBeCloseTo(c, 10);
  });
});

// ---------------------------------------------------------------- 纯函数：呼吸 / 漂移 / 尾迹衰减

describe("fireflyBreath 呼吸相位", () => {
  it("v=0 平稳（恒 0）；v 越界钳制、NaN 归零", () => {
    for (const t of [0, 0.3, 1.1, 7.7]) expect(fireflyBreath(t, 0)).toBeCloseTo(0, 12);
    expect(fireflyBreath(FIREFLY_BREATH_PERIOD / 4, 5)).toBeCloseTo(1, 10); // v=5 按 1 计
    expect(fireflyBreath(FIREFLY_BREATH_PERIOD / 4, -1)).toBeCloseTo(0, 12);
    expect(fireflyBreath(1, Number.NaN)).toBeCloseTo(0, 12);
  });
  it("v=1 时四分之一周期达峰、半周期回零，值域 |·|≤1", () => {
    expect(fireflyBreath(FIREFLY_BREATH_PERIOD / 4, 1)).toBeCloseTo(1, 10);
    expect(fireflyBreath(FIREFLY_BREATH_PERIOD / 2, 1)).toBeCloseTo(0, 10);
    expect(fireflyBreath((3 * FIREFLY_BREATH_PERIOD) / 4, 1)).toBeCloseTo(-1, 10);
    expect(fireflyBreath(FIREFLY_BREATH_PERIOD / 4, 0.5)).toBeCloseTo(0.5, 10);
    for (let t = 0; t < FIREFLY_BREATH_PERIOD; t += 0.05) {
      expect(Math.abs(fireflyBreath(t, 1))).toBeLessThanOrEqual(1);
    }
  });
});

describe("fireflyDrift 低频正弦漂移", () => {
  it("确定性且各轴有界（|·| ≤ FIREFLY_DRIFT_AMP×轴系数）", () => {
    for (let t = 0; t < 30; t += 0.13) {
      const a = fireflyDrift(t);
      const b = fireflyDrift(t);
      expect(a).toEqual(b);
      expect(Math.abs(a[0])).toBeLessThanOrEqual(FIREFLY_DRIFT_AMP);
      expect(Math.abs(a[1])).toBeLessThanOrEqual(FIREFLY_DRIFT_AMP * 0.8);
      expect(Math.abs(a[2])).toBeLessThanOrEqual(FIREFLY_DRIFT_AMP * 0.9);
    }
  });
  it("t=0 精确值（相位表 [0, 1.7, 3.9]）", () => {
    const d = fireflyDrift(0);
    expect(d[0]).toBe(0);
    expect(d[1]).toBeCloseTo(FIREFLY_DRIFT_AMP * 0.8 * Math.sin(1.7), 10);
    expect(d[2]).toBeCloseTo(FIREFLY_DRIFT_AMP * 0.9 * Math.sin(3.9), 10);
  });
  it("低频：50ms 内位移极小（漂浮感，非抖动）", () => {
    const a = fireflyDrift(3.2);
    const b = fireflyDrift(3.25);
    for (let i = 0; i < 3; i++) expect(Math.abs(b[i]! - a[i]!)).toBeLessThan(0.05);
  });
});

describe("尾迹衰减纯函数", () => {
  it("fireflyTrailFade：头 1 → 尾 0，单调不增", () => {
    expect(fireflyTrailFade(0)).toBe(1);
    expect(fireflyTrailFade(FIREFLY_TRAIL_COUNT - 1)).toBe(0);
    for (let i = 1; i < FIREFLY_TRAIL_COUNT; i++) {
      expect(fireflyTrailFade(i)).toBeLessThan(fireflyTrailFade(i - 1));
    }
    expect(fireflyTrailFade(0, 1)).toBe(1); // n=1 边界
  });
  it("fireflyTrailSize：逐点缩小，尾端 = 头 × 0.35（缩小但不消失）", () => {
    const head = fireflyTrailSize(0);
    const tail = fireflyTrailSize(FIREFLY_TRAIL_COUNT - 1);
    expect(head).toBeGreaterThan(0);
    expect(tail).toBeGreaterThan(0);
    expect(tail / head).toBeCloseTo(0.35, 10);
    for (let i = 1; i < FIREFLY_TRAIL_COUNT; i++) {
      expect(fireflyTrailSize(i)).toBeLessThan(fireflyTrailSize(i - 1));
    }
  });
});

// ---------------------------------------------------------------- 对象行为：flyTo 趋近 → 盘旋

describe("flyTo 趋近 → 盘旋 全流程", () => {
  it("远目标：1s 后距离明显缩短（限速区匀速 26/s）", () => {
    const f = createFirefly();
    f.setVisible(true);
    const d0 = SPAWN.distanceTo(FAR); // ≈179.7
    f.flyTo(FAR);
    sim(f, 1);
    const d1 = spriteOf(f).position.distanceTo(FAR);
    expect(d1).toBeLessThan(d0 - 20);
    expect(d1).toBeGreaterThan(d0 - 32); // 限速守护：不可能飞更快
    expect(d1).toBeGreaterThan(FIREFLY_ORBIT_ENTER_DIST); // 仍在趋近段
    f.dispose();
  });
  it("远处单步位移受 FIREFLY_MAX_SPEED 限速", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo(FAR);
    const before = spriteOf(f).position.clone();
    f.update(1 / 60);
    const step = spriteOf(f).position.distanceTo(before);
    expect(step).toBeGreaterThan(0.3); // 确实在飞
    expect(step).toBeLessThan(FIREFLY_MAX_SPEED / 60 + 0.02); // 限速 + 漂移微增量
    f.dispose();
  });
  it("长模拟进入盘旋：距离稳定在小圆附近，不收敛到 0，绕目标慢转", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo(FAR);
    sim(f, 20, 1 / 30);
    const pos = () => spriteOf(f).position.clone();
    // 已进盘旋：|渲染位置-目标| ∈ (0.3, 3)（轨道 1.6 ± 漂移 0.79）
    const dNow = pos().distanceTo(FAR);
    expect(dNow).toBeLessThan(3);
    expect(dNow).toBeLessThan(FIREFLY_ORBIT_ENTER_DIST);
    let minD = Infinity;
    let maxD = -Infinity;
    const samples: THREE.Vector3[] = [];
    for (let i = 0; i < 90; i++) {
      f.update(1 / 30);
      const p = pos();
      if (i % 45 === 0) samples.push(p);
      const d = p.distanceTo(FAR);
      minD = Math.min(minD, d);
      maxD = Math.max(maxD, d);
    }
    expect(maxD).toBeLessThan(3); // 3s 内始终盘旋，不再远离
    expect(minD).toBeGreaterThan(0.3); // 绕小圆而非扎进目标点
    // 慢转：相隔 1.5s 的偏移方向夹角 ≈ OMEGA×1.5=1.35 rad（漂移扰动下放半宽）
    const o1 = samples[0]!.clone().sub(FAR).normalize();
    const o2 = samples[1]!.clone().sub(FAR).normalize();
    const angle = Math.acos(THREE.MathUtils.clamp(o1.dot(o2), -1, 1));
    expect(angle).toBeGreaterThan(FIREFLY_ORBIT_OMEGA * 1.5 * 0.5);
    f.dispose();
  });
  it("近目标（≤8%R）直接进盘旋，无需先趋近", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo({ x: 14, y: 8, z: -84 }); // 距出生点 6 < 8
    sim(f, 1);
    const d = spriteOf(f).position.distanceTo(new THREE.Vector3(14, 8, -84));
    expect(d).toBeLessThan(FIREFLY_ORBIT_ENTER_DIST);
    f.dispose();
  });
  it("非法目标（NaN）被忽略：原地漂浮不飞走", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo({ x: Number.NaN, y: 0, z: 0 });
    sim(f, 1);
    expect(spriteOf(f).position.distanceTo(SPAWN)).toBeLessThan(1); // 仅漂移幅度
    f.dispose();
  });
});

describe("帧率无关性与 dt 钳制", () => {
  it("同一段趋近：dt=1/60 与 dt=0.05 走 0.2s 落点几乎一致", () => {
    const near = { x: 14, y: 8, z: -78 }; // 距出生点 12：未限速的指数段，0.2s 后仍在圈外
    const a = createFirefly();
    const b = createFirefly();
    a.setVisible(true);
    b.setVisible(true);
    a.flyTo(near);
    b.flyTo(near);
    sim(a, 0.2, 1 / 60);
    sim(b, 0.2, 0.05);
    const gap = spriteOf(a).position.distanceTo(spriteOf(b).position);
    expect(gap).toBeLessThan(0.2);
    a.dispose();
    b.dispose();
  });
  it("单帧 dt 钳到 FIREFLY_DT_MAX：update(5) 不瞬移", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo(FAR);
    const before = spriteOf(f).position.clone();
    f.update(5);
    const step = spriteOf(f).position.distanceTo(before);
    expect(step).toBeGreaterThan(2); // 确实推进了 0.1s
    expect(step).toBeLessThan(FIREFLY_MAX_SPEED * FIREFLY_DT_MAX + 0.1); // 而非 5s 的 130
    f.dispose();
  });
  it("NaN/负 dt 被忽略（状态不动）", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.update(Number.NaN);
    const before = spriteOf(f).position.clone();
    f.update(-1);
    f.update(Number.NaN);
    expect(spriteOf(f).position.distanceTo(before)).toBe(0);
    f.dispose();
  });
});

// ---------------------------------------------------------------- 对象行为：setVisible / pulse / 尾迹 / dispose

describe("setVisible 淡入淡出（非瞬切）", () => {
  it("0.6s 线性淡入：中途半透明，到点才满亮", () => {
    const f = createFirefly();
    const sm = spriteOf(f).material;
    expect(f.group.visible).toBe(false);
    f.setVisible(true);
    sim(f, 0.05); // 刚起步：非瞬切
    expect(f.group.visible).toBe(true);
    expect(sm.opacity).toBeGreaterThan(0);
    expect(sm.opacity).toBeLessThan(0.1);
    sim(f, 0.25); // 累计 0.3s：半亮
    expect(sm.opacity).toBeGreaterThan(0.2);
    expect(sm.opacity).toBeLessThan(0.7);
    sim(f, 0.3); // 累计 0.6s：满亮（pulse 默认 0 → 无呼吸扰动）
    expect(sm.opacity).toBeGreaterThan(0.85);
    f.dispose();
  });
  it("0.6s 淡出：中途仍可见，到点摘掉 visible", () => {
    const f = createFirefly();
    f.setVisible(true);
    sim(f, 1);
    f.setVisible(false);
    sim(f, 0.3);
    expect(f.group.visible).toBe(true); // 半隐，非瞬切
    sim(f, 0.3);
    expect(f.group.visible).toBe(false);
    expect(spriteOf(f).material.opacity).toBe(0);
    f.dispose();
  });
});

describe("pulse 呼吸强度（对象行为）", () => {
  it("pulse(1)：亮度与尺寸随呼吸周期起伏", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.pulse(1);
    sim(f, 1); // 淡入完成
    const sprite = spriteOf(f);
    let minO = Infinity;
    let maxO = -Infinity;
    let minS = Infinity;
    let maxS = -Infinity;
    for (let i = 0; i < 26; i++) {
      f.update(0.1); // 26×0.1s = 一个完整呼吸周期
      minO = Math.min(minO, sprite.material.opacity);
      maxO = Math.max(maxO, sprite.material.opacity);
      minS = Math.min(minS, sprite.scale.x);
      maxS = Math.max(maxS, sprite.scale.x);
    }
    expect(maxO - minO).toBeGreaterThan(0.4); // 亮度呼吸
    expect(maxS - minS).toBeGreaterThan(0.8); // 尺寸呼吸
    expect(minO).toBeGreaterThan(0);
    f.dispose();
  });
  it("pulse(0) 平稳常亮；pulse(2) 按 1 钳制不越幅", () => {
    const f = createFirefly();
    f.setVisible(true);
    sim(f, 1);
    const o0 = spriteOf(f).material.opacity;
    f.update(0.7);
    expect(spriteOf(f).material.opacity).toBeCloseTo(o0, 10); // v=0 无起伏
    f.pulse(2); // 越界 → 按 1
    let maxO = -Infinity;
    for (let i = 0; i < 26; i++) {
      f.update(0.1);
      maxO = Math.max(maxO, spriteOf(f).material.opacity);
    }
    expect(maxO).toBeLessThanOrEqual(0.9 * 1.35 + 1e-6); // 未按 v=2 放大
    f.dispose();
  });
});

describe("尾迹逐帧写入", () => {
  it("头点贴着本体，aFade 头亮尾灭，aSize 头大额小", () => {
    const f = createFirefly();
    f.setVisible(true);
    sim(f, 1);
    const sprite = spriteOf(f);
    const geo = pointsOf(f).geometry;
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const fades = geo.getAttribute("aFade") as THREE.BufferAttribute;
    const sizes = geo.getAttribute("aSize") as THREE.BufferAttribute;
    // BufferAttribute 为 Float32，与 float64 的 sprite.position 有量化差，精度取 5 位
    expect(pos.getX(0)).toBeCloseTo(sprite.position.x, 5);
    expect(pos.getY(0)).toBeCloseTo(sprite.position.y, 5);
    expect(pos.getZ(0)).toBeCloseTo(sprite.position.z, 5);
    expect(fades.getX(0)).toBeCloseTo(1, 10); // fade 满 × trailFade(0)
    for (let i = 1; i < FIREFLY_TRAIL_COUNT; i++) {
      expect(fades.getX(i)).toBeLessThanOrEqual(fades.getX(i - 1) + 1e-9);
      expect(sizes.getX(i)).toBeLessThan(sizes.getX(i - 1));
    }
    expect(fades.getX(FIREFLY_TRAIL_COUNT - 1)).toBe(0);
    expect(sizes.getX(FIREFLY_TRAIL_COUNT - 1)).toBeGreaterThan(0);
    f.dispose();
  });
  it("不可见时整条尾迹熄灭（aFade 全 0）", () => {
    const f = createFirefly();
    f.update(0.05); // fade 仍为 0
    const fades = pointsOf(f).geometry.getAttribute("aFade") as THREE.BufferAttribute;
    for (let i = 0; i < FIREFLY_TRAIL_COUNT; i++) expect(fades.getX(i)).toBe(0);
    f.dispose();
  });
  it("飞行中尾迹沿路径展开（头尾不同点）", () => {
    const f = createFirefly();
    f.setVisible(true);
    f.flyTo(FAR);
    sim(f, 1);
    const pos = pointsOf(f).geometry.getAttribute("position") as THREE.BufferAttribute;
    const head = new THREE.Vector3(pos.getX(0), pos.getY(0), pos.getZ(0));
    const tail = new THREE.Vector3(
      pos.getX(FIREFLY_TRAIL_COUNT - 1),
      pos.getY(FIREFLY_TRAIL_COUNT - 1),
      pos.getZ(FIREFLY_TRAIL_COUNT - 1),
    );
    expect(head.distanceTo(tail)).toBeGreaterThan(1); // 26/s 下 13 帧 ≈ 5.6 世界单位
    f.dispose();
  });
});

describe("dispose 资源释放", () => {
  it("幂等：二次调用不抛；摘出父级；update 变安全空操作", () => {
    const f = createFirefly();
    const parent = new THREE.Group();
    parent.add(f.group);
    f.setVisible(true);
    sim(f, 0.5);
    f.dispose();
    expect(f.group.parent).toBeNull();
    expect(() => f.dispose()).not.toThrow();
    expect(() => f.update(0.1)).not.toThrow();
  });
});
