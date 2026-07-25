/**
 * ArmillarySphere：浑天仪环架（ch5「揽星为球」专用，由该章 enter/exit 创建销毁）。
 *
 * 地平环 / 子午环 / 赤道环 / 黄道环（黄赤交角 23.44°）四环套在天球外，
 * 半径 1.03R ~ 1.10R（R 见 ../SkyApp），TorusGeometry + 黄铜
 * MeshStandardMaterial。组内自带 AmbientLight + 两盏 DirectionalLight——
 * 星点与星官连线是 unlit 材质，灯光只照亮环架。
 * 每环沿环均布 36 根刻度短刻线（小 box），每 90° 一根长刻线。
 *
 * 动画句柄（由章节 enter/update(p) 驱动，纯变换写入，无逐帧重建）：
 *   setAssembly(t)  t∈[0,1]，四环依次从收拢/错开状态归位；
 *   setSpin(angle)  赤道环绕天极轴（+Y）、黄道环绕黄极轴缓转；
 *   setFade(f)      整体淡入 0~1（与各环组装透明度相乘）；
 *   dispose()       释放全部 geometry/material（防泄漏）。
 *
 * 环架层级（每环）：assembly（位错/收拢/翻转）→ spin/tilt（姿态）→ local
 * （torus 默认在 XY 平面，local 负责把环放倒/立起）。
 */
import * as THREE from "three";
import { R } from "../SkyApp";

/** 黄赤交角（弧度） */
const OBLIQUITY = THREE.MathUtils.degToRad(23.44);
/** 黄铜 */
const BRASS = 0xb08d3e;
/** 每环刻度数 */
const TICKS = 36;
/** 组装动画：相邻环的错峰间隔与单环归位时长（占组装总进度的比例）。
 *  约束 3·STAGGER + RING_DUR = 1，保证 t=1 时末环恰好归位。 */
const STAGGER = 0.15;
const RING_DUR = 0.55;

function smooth(x: number): number {
  x = THREE.MathUtils.clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
}

export interface ArmillarySphere {
  readonly group: THREE.Group;
  /** 组装进度 t∈[0,1]：四环依次从收拢/错开归位 */
  setAssembly(t: number): void;
  /** 展示自旋角（弧度）：赤道环绕天极轴、黄道环绕黄极轴 */
  setSpin(angleRad: number): void;
  /** 整体淡入 0~1（与组装透明度相乘） */
  setFade(f: number): void;
  /** 释放全部 geometry/material；调用后句柄不可再用 */
  dispose(): void;
}

interface RingRec {
  /** 最外层：组装动画的位错/缩放/翻转都写它 */
  assembly: THREE.Group;
  material: THREE.MeshStandardMaterial;
  /** 收拢态的错开方向（单位向量）与翻转角 */
  offsetDir: THREE.Vector3;
  tumble: THREE.Euler;
  /** 当前组装进度（setFade 时用于重算透明度） */
  alpha: number;
}

/** 在环局部系（torus 默认的 XY 平面）建一只黄铜环 + 一圈刻度 */
function buildRing(
  radiusR: number,
  tubeR: number,
  tickGeo: { minor: THREE.BoxGeometry; major: THREE.BoxGeometry },
): { local: THREE.Group; material: THREE.MeshStandardMaterial } {
  const material = new THREE.MeshStandardMaterial({
    color: BRASS,
    metalness: 0.85,
    roughness: 0.35,
    transparent: true,
    opacity: 0,
  });
  const local = new THREE.Group();
  const radius = radiusR * R;
  local.add(new THREE.Mesh(new THREE.TorusGeometry(radius, tubeR * R, 12, 144), material));
  for (let i = 0; i < TICKS; i++) {
    const a = (i / TICKS) * Math.PI * 2;
    const major = i % (TICKS / 4) === 0; // 每 90° 一根长刻线
    const tick = new THREE.Mesh(major ? tickGeo.major : tickGeo.minor, material);
    tick.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
    tick.rotation.z = a; // 长轴沿径向
    local.add(tick);
  }
  return { local, material };
}

export function createArmillarySphere(): ArmillarySphere {
  const group = new THREE.Group();
  group.name = "armillary-sphere";

  // 刻度短刻线：共享两份 box geometry（径向长 × 切向宽 × 轴向厚）
  const tickGeo = {
    minor: new THREE.BoxGeometry(0.012 * R, 0.0018 * R, 0.0035 * R),
    major: new THREE.BoxGeometry(0.02 * R, 0.0024 * R, 0.0045 * R),
  };

  // ---- 四环：assembly → (spin / tilt) → local ----
  // 地平环（最外最粗，躺在地平坐标 XZ 平面）
  const horizon = buildRing(1.1, 0.006, tickGeo);
  horizon.local.rotation.x = -Math.PI / 2;
  // 子午环（过南北天极，立在 YZ 平面）
  const meridian = buildRing(1.07, 0.004, tickGeo);
  meridian.local.rotation.y = Math.PI / 2;
  // 赤道环（赤道面 XZ，可绕天极轴 +Y 自旋）
  const equator = buildRing(1.05, 0.004, tickGeo);
  equator.local.rotation.x = -Math.PI / 2;
  const equatorSpin = new THREE.Group();
  equatorSpin.add(equator.local);
  // 黄道环（绕黄极轴自旋；tilt 提供黄赤交角）
  const ecliptic = buildRing(1.03, 0.0035, tickGeo);
  ecliptic.local.rotation.x = -Math.PI / 2;
  const eclipticSpin = new THREE.Group();
  eclipticSpin.add(ecliptic.local);
  const eclipticTilt = new THREE.Group();
  eclipticTilt.rotation.x = OBLIQUITY;
  eclipticTilt.add(eclipticSpin);

  const rings: RingRec[] = [
    { built: horizon, inner: horizon.local, offsetDir: new THREE.Vector3(0, -1, 0), tumble: new THREE.Euler(0.9, 0, 0.4) },
    { built: meridian, inner: meridian.local, offsetDir: new THREE.Vector3(1, 0.15, 0), tumble: new THREE.Euler(0, 0.5, -1.1) },
    { built: equator, inner: equatorSpin, offsetDir: new THREE.Vector3(0, 1, 0.2), tumble: new THREE.Euler(-0.7, 0.5, 0) },
    { built: ecliptic, inner: eclipticTilt, offsetDir: new THREE.Vector3(-0.6, 0.6, 0.6), tumble: new THREE.Euler(0.5, -0.4, 0.8) },
  ].map(({ built, inner, offsetDir, tumble }) => {
    const assembly = new THREE.Group();
    assembly.add(inner);
    group.add(assembly);
    return {
      assembly,
      material: built.material,
      offsetDir: offsetDir.normalize(),
      tumble,
      alpha: 0,
    };
  });

  // ---- 组内自带灯光（星点/连线为 unlit 材质，不受影响） ----
  group.add(new THREE.AmbientLight(0xffe9c9, 0.9));
  const key = new THREE.DirectionalLight(0xfff3dd, 2.4);
  key.position.set(1.6 * R, 2.4 * R, 1.2 * R);
  group.add(key);
  const fill = new THREE.DirectionalLight(0xbfd0ff, 1.1); // 冷色补光，衬黄铜
  fill.position.set(-1.8 * R, -0.7 * R, -1.5 * R);
  group.add(fill);

  let fade = 0;

  function applyOpacity(ring: RingRec): void {
    const o = fade * ring.alpha;
    ring.material.opacity = o;
    ring.assembly.visible = o > 0.002;
  }

  function setAssembly(t: number): void {
    rings.forEach((ring, i) => {
      const a = smooth((t - i * STAGGER) / RING_DUR);
      ring.alpha = a;
      const k = 1 - a;
      ring.assembly.scale.setScalar(0.35 + 0.65 * a);
      ring.assembly.position.copy(ring.offsetDir).multiplyScalar(k * 0.5 * R);
      ring.assembly.rotation.set(ring.tumble.x * k, ring.tumble.y * k, ring.tumble.z * k);
      applyOpacity(ring);
    });
  }

  function setSpin(angleRad: number): void {
    equatorSpin.rotation.y = angleRad;
    eclipticSpin.rotation.y = angleRad * 0.6; // 黄赤异速，展示交角
  }

  function setFade(f: number): void {
    fade = THREE.MathUtils.clamp(f, 0, 1);
    for (const ring of rings) applyOpacity(ring);
  }

  function dispose(): void {
    const geos = new Set<THREE.BufferGeometry>();
    const mats = new Set<THREE.Material>();
    group.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        geos.add(mesh.geometry);
        const m = mesh.material;
        for (const mm of Array.isArray(m) ? m : [m]) mats.add(mm);
      }
    });
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => m.dispose());
  }

  setAssembly(0); // 初始：收拢态且不可见
  return { group, setAssembly, setSpin, setFade, dispose };
}
