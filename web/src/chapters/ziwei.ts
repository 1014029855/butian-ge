import type { SkyView } from "../scroll/view";
import type { SkyLayout } from "../starfield/renderer";
import { Camera } from "../starfield/camera";
import { snapshot, lerpCamera, camForBBox, type CamState } from "../starfield/tween";

/**
 * 天人之间：紫微垣深入篇。
 * 三段窗口：0-0.2 飞入紫微垣 → 0.2-0.55 紫微垣与北极 → 0.55-1 北斗七星。
 */
const ZIWEI_SET = ["紫微左垣", "紫微右垣", "北极", "勾陈", "三公(紫微垣)", "天棓", "北斗", "辅(附北斗)"];
const BEIJI_SET = ["北极", "勾陈"];
const BEIDOU_SET = ["北斗", "辅(附北斗)"];

let entry: CamState | null = null;
let target: CamState | null = null;
let visible: Set<number> | null = null;
let lastActive = false;

function idx(layout: SkyLayout, names: string[]): Set<number> {
  const s = new Set<number>();
  for (const n of names) {
    const i = layout.nameIndex.get(n);
    if (i !== undefined) s.add(i);
  }
  return s;
}

export function updateZiwei(
  view: SkyView, layout: SkyLayout, camera: Camera, p: number,
): void {
  if (!lastActive) {
    entry = snapshot(camera);
    lastActive = true;
  }
  if (!target) {
    const set = idx(layout, ZIWEI_SET);
    visible = set;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const ai of set) {
      for (const seg of layout.asterisms[ai].segments) {
        minX = Math.min(minX, seg.x1, seg.x2);
        maxX = Math.max(maxX, seg.x1, seg.x2);
        minY = Math.min(minY, seg.y1, seg.y2);
        maxY = Math.max(maxY, seg.y1, seg.y2);
      }
    }
    target = camForBBox(minX, minY, maxX, maxY, window.innerWidth, window.innerHeight, 0.6);
  }
  if (entry && target) lerpCamera(camera, entry, target, Math.min(1, p / 0.2));

  view.rotation = 0;
  view.showLines = true;
  view.visible = visible;
  view.dimStarAlpha = 1;
  view.freeExplore = false;
  view.revealAlpha = (ai: number) => (visible?.has(ai) ? 0.75 : 0.1);

  if (p < 0.5) {
    const focus = idx(layout, BEIJI_SET);
    view.highlight = p < 0.25 ? idx(layout, ZIWEI_SET) : focus;
    view.labels = [...focus];
  } else {
    const focus = idx(layout, BEIDOU_SET);
    view.highlight = focus;
    view.labels = [...focus];
  }
}

/** 离开章节时重置一次性状态。 */
export function resetZiwei(): void {
  lastActive = false;
}
