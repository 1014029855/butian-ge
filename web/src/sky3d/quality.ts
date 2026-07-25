/**
 * 画质自适应：EMA 平滑帧率 + 三档阶梯 + 时间滞回，防止档位频繁抖动。
 * 档位语义（由集成方在 onTierChange 回调里实际应用）：
 *   0 = DPR≤2 + bloom 全开
 *   1 = DPR≤1.5 + bloom 半强度
 *   2 = DPR 1 + bloom 关
 * 滞回：升档需连续 ~5s 达标；降档连续 ~1.5s 不达标即降。每次只走一档。
 * 注意：setTier 只是手动指定当前档，自动调节仍在继续（不锁定）。
 */

export type QualityTier = 0 | 1 | 2;

/** 达标线：EMA 帧率 ≥ 此值视为流畅 */
const TARGET_FPS = 55;
/** EMA 时间常数（秒）：越小响应越快，越大越平滑 */
const EMA_TAU = 0.5;
/** 升档所需连续达标时长（秒） */
const UPGRADE_AFTER = 5;
/** 降档所需连续不达标时长（秒） */
const DOWNGRADE_AFTER = 1.5;
/** 单帧 dt 上限（秒）：切后台回来的超长帧不应把 EMA 打穿 */
const MAX_DT = 0.25;

export interface QualityMonitor {
  /** 每帧调用，dt 为帧间隔（秒） */
  update: (dt: number) => void;
  /** 当前档位 */
  readonly tier: QualityTier;
  /** 手动指定档位（重置滞回计时，档位变化时触发 onTierChange） */
  setTier: (t: QualityTier) => void;
}

export function createQualityMonitor(onTierChange: (tier: QualityTier) => void): QualityMonitor {
  let tier: QualityTier = 0;
  let emaFps = TARGET_FPS; // 从达标值起步，避免开局误判降档
  let goodTime = 0;
  let badTime = 0;

  function applyTier(next: QualityTier): void {
    if (next === tier) return;
    tier = next;
    goodTime = 0;
    badTime = 0;
    onTierChange(tier);
  }

  function update(dt: number): void {
    if (!Number.isFinite(dt) || dt <= 0) return;
    const clamped = Math.min(dt, MAX_DT);
    const alpha = 1 - Math.exp(-clamped / EMA_TAU);
    emaFps += (1 / clamped - emaFps) * alpha;

    if (emaFps >= TARGET_FPS) {
      goodTime += dt;
      badTime = 0;
      if (tier > 0 && goodTime >= UPGRADE_AFTER) applyTier((tier - 1) as QualityTier);
    } else {
      badTime += dt;
      goodTime = 0;
      if (tier < 2 && badTime >= DOWNGRADE_AFTER) applyTier((tier + 1) as QualityTier);
    }
  }

  return {
    update,
    get tier() {
      return tier;
    },
    setTier: (t: QualityTier) => applyTier(t),
  };
}
