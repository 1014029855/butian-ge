/**
 * 星官名标签层：基于 three/examples/jsm/renderers/CSS2DRenderer。
 *
 * 每个星官标签锚定在成员星质心方向、半径 R=100 的天球面上。
 * update(camera) 按标签与相机视线的角距排序：同屏最多保留
 * MAX_VISIBLE_LABELS 个最近者，其余隐藏；保留者按角距淡出。
 *
 * 集成方式（demo 阶段接线）：
 *   const labels = createLabels(container, asterisms, hipToVec3);
 *   scene.add(labels.group);
 *   每帧：labels.update(camera); labels.renderer.render(scene, camera);
 *
 * 标签样式（.sky-label）由本模块注入，古籍金泥风：哑光金、宋体、宽字距。
 */
import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

/** 天球半径（与 StarField 一致） */
export const SKY_RADIUS = 100;
/** 同屏标签上限：只保留与相机视线角距最小的前 N 个 */
export const MAX_VISIBLE_LABELS = 40;
/** 角距（度）从此值开始淡出 */
export const FADE_START_DEG = 25;
/** 角距（度）到达此值时完全透明 */
export const FADE_END_DEG = 70;

export interface AsterismLabelInput {
  id: string | number;
  name: string;
  stars: number[];
}

/**
 * hip → 世界坐标 的查询源：
 * Map（StarField 内部结构）或回调（由集成方按数据表提供）。
 */
export type HipToVec3 =
  | Map<number, THREE.Vector3>
  | ((hip: number) => readonly [number, number, number] | undefined);

export interface LabelsHandle {
  /** 挂到场景的组（内含全部 CSS2DObject） */
  group: THREE.Group;
  /** CSS2D 渲染器；domElement 已附加到 container，每帧需调用 render(scene, camera) */
  renderer: CSS2DRenderer;
  /** 每帧调用：按相机视线做角距剔除与淡出 */
  update(camera: THREE.Camera): void;
  setVisible(v: boolean): void;
  dispose(): void;
}

const LABEL_CSS = `
.sky-label {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 13px;
  letter-spacing: 0.22em;
  color: #c9a227;
  text-shadow: 0 0 6px rgba(201, 162, 39, 0.35), 0 1px 2px rgba(0, 0, 0, 0.85);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}
`;

let styleInjected = false;
function injectStyle(): void {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.dataset.skyLabels = "";
  el.textContent = LABEL_CSS;
  document.head.appendChild(el);
  styleInjected = true;
}

function resolvePos(src: HipToVec3, hip: number): readonly [number, number, number] | undefined {
  if (src instanceof Map) {
    const v = src.get(hip);
    return v ? [v.x, v.y, v.z] : undefined;
  }
  return src(hip);
}

interface LabelRec {
  obj: CSS2DObject;
  el: HTMLDivElement;
  /** update() 时写入：与相机视线的角距（弧度） */
  angle: number;
}

export function createLabels(
  container: HTMLElement,
  asterisms: readonly AsterismLabelInput[],
  hipToVec3: HipToVec3,
): LabelsHandle {
  injectStyle();

  const group = new THREE.Group();
  group.name = "sky-labels";

  const renderer = new CSS2DRenderer();
  renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
  const dom = renderer.domElement;
  dom.style.position = "absolute";
  dom.style.inset = "0";
  dom.style.pointerEvents = "none";
  container.appendChild(dom);

  // 建标签：质心方向 × R
  const labels: LabelRec[] = [];
  const tmp = new THREE.Vector3();
  for (const a of asterisms) {
    const centroid = new THREE.Vector3();
    let n = 0;
    for (const hip of a.stars) {
      const p = resolvePos(hipToVec3, hip);
      if (!p) continue;
      centroid.add(tmp.set(p[0], p[1], p[2]));
      n++;
    }
    if (n === 0 || centroid.lengthSq() < 1e-6) continue;
    centroid.normalize().multiplyScalar(SKY_RADIUS);

    const el = document.createElement("div");
    el.className = "sky-label";
    el.textContent = a.name;
    const obj = new CSS2DObject(el);
    obj.position.copy(centroid);
    group.add(obj);
    labels.push({ obj, el, angle: Math.PI });
  }

  let visible = true;
  const camPos = new THREE.Vector3();
  const viewDir = new THREE.Vector3();
  const toLabel = new THREE.Vector3();
  const R2D = 180 / Math.PI;
  const fadeSpan = FADE_END_DEG - FADE_START_DEG;

  function update(camera: THREE.Camera): void {
    if (!visible) return;
    camera.getWorldPosition(camPos);
    camera.getWorldDirection(viewDir);
    for (const rec of labels) {
      toLabel.copy(rec.obj.position).sub(camPos).normalize();
      rec.angle = Math.acos(THREE.MathUtils.clamp(toLabel.dot(viewDir), -1, 1));
    }
    // 角距升序，前 MAX_VISIBLE_LABELS 个按角距淡出，其余隐藏
    const sorted = [...labels].sort((a, b) => a.angle - b.angle);
    for (let i = 0; i < sorted.length; i++) {
      const rec = sorted[i];
      const deg = rec.angle * R2D;
      const opacity =
        i < MAX_VISIBLE_LABELS
          ? THREE.MathUtils.clamp(1 - (deg - FADE_START_DEG) / fadeSpan, 0, 1)
          : 0;
      rec.el.style.opacity = opacity.toFixed(3);
      rec.el.style.visibility = opacity <= 0 ? "hidden" : "visible";
    }
  }

  function setVisible(v: boolean): void {
    visible = v;
    group.visible = v;
    dom.style.display = v ? "" : "none";
    if (!v) {
      for (const rec of labels) {
        rec.el.style.opacity = "0";
        rec.el.style.visibility = "hidden";
      }
    }
  }

  function dispose(): void {
    for (const rec of labels) {
      group.remove(rec.obj);
      rec.el.remove();
    }
    labels.length = 0;
    dom.remove();
  }

  return { group, renderer, update, setVisible, dispose };
}
