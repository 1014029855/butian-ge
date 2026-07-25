/**
 * CameraRig：八章相机关键帧轨道系统。
 *
 * 每章声明一个相机关键帧（CameraKey），ScrollTrigger 的章节局部进度
 * 经 sampleGlobal(chapterIndex + localProgress) 驱动插值：
 *   - 数值（半径 / FOV / 混合权重）lerp；
 *   - 位置方向 nlerp 后归一化（相邻章方向差很小，nlerp 足够平滑）；
 *   - 脚本注视朝向以四元数 slerp（gazeTargetQ）。
 *
 * 章节内节奏：前 HOLD（默认 0.65）行程保持本章关键帧（阅读区），
 * 后 1-HOLD 行程向下一章关键帧平滑过渡（smoothstep）。因此
 * sample(i, 1) === sample(i+1, 0)，章节边界严格连续；两章 ScrollTrigger
 * 之间的 100vh 空白区相机停在下一章关键帧上，无跳变。
 *
 * gaze 权属约定（与 demo.ts 一致，不可破坏）：
 *   rig 只输出「脚本注视目标 + 权重（gazeBlend）」，SkyApp 用它对用户
 *   的 gazeQ 做 slerp 让位；用户的 gazeYaw/gazePitch 永远不被脚本回写。
 *   gazeBlend = 0 完全自由环视，= 1 完全脚本注视。
 *
 * 本模块只依赖 three 的数学类与 coords.ts，不碰 DOM，可单测。
 */
import * as THREE from "three";
import { radecToVec3 } from "../sky3d/coords";

/** 相机关键帧（一章一个） */
export interface CameraKey {
  /** 相机到天球中心的距离，单位为天球半径 R 的倍数（球内章用 INSIDE_R） */
  radius: number;
  /**
   * 相机位置方向（由天球中心指向相机），不要求单位长，缺省 +Y（北天极上方）。
   * 球内章节位置几乎不影响构图，球外章节决定环绕方位。
   */
  dir?: readonly [number, number, number];
  /** 视场角（度） */
  fov: number;
  /**
   * gaze 模式：
   *   "free"   —— 视线方向完全归用户（gazeBlend 0）；
   *   "target" —— 脚本指定注视目标（gazeBlend 1，切换过程由插值平滑让位）。
   */
  gaze: "free" | "target";
  /** gaze = "target" 时的注视方向（赤道坐标，度）。缺省北天极附近 */
  target?: { ra: number; dec: number };
  /** 绕世界 +Y 的缓慢自转角速度（弧度/秒，序章漂移用；缺省 0） */
  drift?: number;
  /** 球外轨道（orbitQ）是否接受用户拖拽；缺省 false */
  orbit?: boolean;
  /**
   * 章内保持区占比覆盖（缺省用 CHAPTER_HOLD）。= 1 时本章不做章尾过渡
   * （自由探索章用：交互权重在章内全程不被削弱）。
   */
  hold?: number;
  /**
   * 章首渐入区占比：前 enter 行程从上一章关键帧平滑渐入本章关键帧，
   * 用于把「脚本接管」挪进本章开头的阅读区。**要求上一章 hold = 1**
   * （否则章节边界不连续，构造时抛错）。
   */
  enter?: number;
}

/** 插值结果：每帧交给 SkyApp.applyCameraState 的完整相机状态 */
export interface CameraState {
  /** 半径（R 倍数） */
  radius: number;
  /** 位置方向（单位向量） */
  dir: THREE.Vector3;
  fov: number;
  /** 脚本注视权重：0 = 用户自由环视，1 = 完全脚本注视（中间为平滑让位） */
  gazeBlend: number;
  /** 脚本注视朝向（无滚转四元数）；相邻两章均无目标时为 null */
  gazeTargetQ: THREE.Quaternion | null;
  /** 漂移角速度（弧度/秒） */
  drift: number;
  /** 球外轨道输入权重 0~1 */
  orbit: number;
}

/** 章节内「保持区」占比：前 65% 行程保持本章相机，后 35% 过渡到下一章 */
export const CHAPTER_HOLD = 0.65;

const UP = new THREE.Vector3(0, 1, 0);
const DEFAULT_TARGET = { ra: 0, dec: 80 };

function smooth(x: number): number {
  x = THREE.MathUtils.clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
}

/**
 * 由赤道坐标构造「无滚转」注视四元数：相机前向（-Z）精确指向
 * radecToVec3(ra, dec) 的天空嵌入方向（与星点/星官坐标同一基准）。
 * 注意：早期版本用「YXZ 欧拉 pitch=dec, yaw=ra−90°」对齐用户环视的
 * 参数化——该参数化与天空嵌入在 ra 上镜像相反（用户拖拽自洽无感，
 * 但脚本注视会落到对称天区）。本实现以数据方向为准。
 */
export function gazeQuat(raDeg: number, decDeg: number): THREE.Quaternion {
  const dir = new THREE.Vector3(...radecToVec3(raDeg, decDeg, 1));
  const m = new THREE.Matrix4().lookAt(new THREE.Vector3(0, 0, 0), dir, UP);
  return new THREE.Quaternion().setFromRotationMatrix(m);
}

function keyTargetQ(key: CameraKey): THREE.Quaternion | null {
  if (key.gaze !== "target") return null;
  const t = key.target ?? DEFAULT_TARGET;
  return gazeQuat(t.ra, t.dec);
}

export class CameraRig {
  readonly keys: readonly CameraKey[];
  private readonly hold: number;

  constructor(keys: readonly CameraKey[], hold: number = CHAPTER_HOLD) {
    if (keys.length < 2) throw new Error("CameraRig 至少需要 2 个关键帧");
    this.hold = THREE.MathUtils.clamp(hold, 0, 0.95);
    for (const [i, k] of keys.entries()) {
      if (!(k.radius > 0)) throw new Error(`关键帧 ${i}：radius 必须为正`);
      if (!(k.fov > 10 && k.fov < 140)) throw new Error(`关键帧 ${i}：fov 非法（${k.fov}）`);
      if (k.gaze !== "free" && k.gaze !== "target")
        throw new Error(`关键帧 ${i}：gaze 必须为 "free" | "target"`);
      const enter = k.enter ?? 0;
      if (enter < 0 || enter >= 1) throw new Error(`关键帧 ${i}：enter 必须在 [0,1)（${enter}）`);
      if (k.hold !== undefined && (k.hold < 0 || k.hold > 1))
        throw new Error(`关键帧 ${i}：hold 必须在 [0,1]（${k.hold}）`);
      // enter > 0 要求上一章不做章尾过渡（hold = 1），否则边界不连续
      if (i > 0 && enter > 0) {
        const prevHold = keys[i - 1].hold ?? this.hold;
        if (prevHold < 1)
          throw new Error(`关键帧 ${i}：enter > 0 要求上一章 hold = 1（当前 ${prevHold}）`);
      }
    }
    this.keys = keys;
  }

  /** 章节数 */
  get count(): number {
    return this.keys.length;
  }

  /**
   * 按章节局部进度采样。
   * @param chapter 章节序号（0 ~ count-1，自动钳制）
   * @param local   章内进度 [0,1]（自动钳制）
   */
  sample(chapter: number, local: number): CameraState {
    const n = this.keys.length;
    const i = Math.min(Math.max(Math.floor(chapter), 0), n - 1);
    const lp = THREE.MathUtils.clamp(local, 0, 1);
    const ki = this.keys[i];
    const kj = this.keys[Math.min(i + 1, n - 1)];
    // 章首渐入区：前 enter 行程从上一章关键帧平滑渐入本章（脚本接管挪到章首）
    const enter = ki.enter ?? 0;
    if (i > 0 && enter > 0 && lp < enter) {
      return CameraRig.blend(this.keys[i - 1], ki, smooth(lp / enter));
    }
    // 保持区之后、且存在下一章时，平滑过渡到下一章关键帧；hold = 1 不过渡
    const hold = ki.hold ?? this.hold;
    const k = i < n - 1 && hold < 1 ? smooth((lp - hold) / (1 - hold)) : 0;
    return CameraRig.blend(ki, kj, k);
  }

  /**
   * 全局进度采样：g = chapterIndex + localProgress（范围 [0, count]）。
   * 渲染循环只需对一个标量做阻尼即可驱动整条轨道。
   */
  sampleGlobal(g: number): CameraState {
    const n = this.keys.length;
    const gc = THREE.MathUtils.clamp(g, 0, n);
    const i = Math.min(Math.floor(gc), n - 1);
    return this.sample(i, gc - i);
  }

  /** 两个关键帧按 k∈[0,1] 插值（k=0 取 a，k=1 取 b） */
  static blend(a: CameraKey, b: CameraKey, k: number): CameraState {
    const dirA = new THREE.Vector3(...(a.dir ?? [0, 1, 0])).normalize();
    const dirB = new THREE.Vector3(...(b.dir ?? [0, 1, 0])).normalize();
    const dir = dirA.lerp(dirB, k).normalize();

    const qa = keyTargetQ(a);
    const qb = keyTargetQ(b);
    const gazeBlend = THREE.MathUtils.lerp(
      a.gaze === "target" ? 1 : 0,
      b.gaze === "target" ? 1 : 0,
      k,
    );
    // 权重为 0（纯自由环视）时不携带目标；单侧有目标时由有目标一侧提供
    let gazeTargetQ: THREE.Quaternion | null = null;
    if (gazeBlend > 0) {
      gazeTargetQ = qa && qb ? qa.clone().slerp(qb, k) : (qa ?? qb)?.clone() ?? null;
    }

    return {
      radius: THREE.MathUtils.lerp(a.radius, b.radius, k),
      dir,
      fov: THREE.MathUtils.lerp(a.fov, b.fov, k),
      gazeBlend,
      gazeTargetQ,
      drift: THREE.MathUtils.lerp(a.drift ?? 0, b.drift ?? 0, k),
      orbit: THREE.MathUtils.lerp(a.orbit ? 1 : 0, b.orbit ? 1 : 0, k),
    };
  }
}

/**
 * 球内机位半径（R 倍数）：0.005 × R = 距球心 0.5 世界单位，等效站在原点仰望。
 * 必须保持在 SkyApp 过渡区下限 0.8R 以内——r ≥ 0.8R 会触发球内→球外混合
 * （拖拽输入半重衰减），r ≥ R 时星点拾取直接禁用；此前误用 radius=1
 * （正好贴在球面上）导致「点击不了、交互不了」，改回 POC 的原点机位。
 */
export const INSIDE_R = 0.005;

/**
 * 八章关键帧终值（P2 集成调定；半径单位为 R 倍数）。
 * 调定记录：
 *   - 球内四章统一 INSIDE_R（0.005，距球心 0.5 世界单位，交互全权区）；
 *   - ch4 target = 紫微垣成员星矢量均值中心（asterisms.json 35 个紫微垣星官、
 *     140 颗成员星）ra≈175°/dec≈81°；原 ra30°/dec78° 偏约 20°，半 FOV 仅 22.5°；
 *   - ch5/ch6 dir 的 y 由 0.92 降到 0.7（海拔 67°→44°）：中纬侧视下浑天仪
 *     赤道环/黄道环的 23.4° 黄赤交角更可读，岁差轴偏移也呈侧视；
 *   - ch7 dir 取 [0,0.55,0.84]（赤道侧视与 ch6 的折中）：ch6→ch7、ch7→ch8
 *     方位摆角由原 ~59° 收敛到 ~38°，且朝向仍正对 ra≈90°（天狼/猎户天区）；
 *   - ch8 与 ch5/ch6 同方位收尾（首尾呼应的渐远）。
 */
export const CHAPTER_KEYS: readonly CameraKey[] = [
  // ch1 序章：球内，朝天极缓慢自转（drift 0.012 rad/s ≈ 0.69°/s，视线仍归用户）
  { radius: INSIDE_R, fov: 78, gaze: "free", drift: 0.012 },
  // ch2 星野漫游：球内自由环视 + 拾取。hold=1：全章不做章尾过渡——自由探索区
  // 的交互权重不被削弱（脚本接管挪到 ch3 开头的阅读区，见 ch3 的 enter）
  { radius: INSIDE_R, fov: 78, gaze: "free", hold: 1 },
  // ch3 观象授时：球内温和广角，天空作圭表组件背景（注视南天低空）。
  // enter=0.3：进入本章的前 30% 行程（用户读文案时）从 ch2 的自由视角平滑接管
  { radius: INSIDE_R, fov: 65, gaze: "target", target: { ra: 270, dec: 8 }, enter: 0.3 },
  // ch4 天人之间：注视紫微垣中心（成员均值 ra175°/dec81°），FOV 收窄（推近感）
  { radius: INSIDE_R, fov: 45, gaze: "target", target: { ra: 175, dec: 81 } },
  // ch5 揽星为球：穿出到球外 3R（全场高潮），中纬侧视突出黄赤交角，轨道开启
  { radius: 3, dir: [0.52, 0.7, 0.49], fov: 50, gaze: "free", orbit: true },
  // ch6 一万年：球外 3R（与 ch5 同机位，两章间相机静止）
  { radius: 3, dir: [0.52, 0.7, 0.49], fov: 50, gaze: "free", orbit: true },
  // ch7 东西对话：球外 3R，赤道侧视（与 ch6 折中后的方位）
  { radius: 3, dir: [0, 0.55, 0.84], fov: 50, gaze: "free", orbit: true },
  // ch8 尾声：5R 渐远，成天外一点（回到 ch5/ch6 同方位收尾）
  { radius: 5, dir: [0.52, 0.7, 0.49], fov: 45, gaze: "free" },
];
