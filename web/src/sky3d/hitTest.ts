/**
 * 指针拾取：纯数学投影，不走 THREE.Raycaster。
 *
 * 星点可能有数千颗（5563 颗恒星），每帧/每次指针移动都构造 Raycaster
 * 对 Points 做 GPU 式求交代价高且阈值语义不直观。这里直接把星点世界坐标
 * 经「视图矩阵 × 投影矩阵」变换到屏幕像素坐标，在阈值内取距指针最近者，
 * O(N) 纯算术，模块不 import three（仅用结构化相机接口），便于单测。
 */

/** 星点位置：紧凑的 Float32Array（xyz 连续）或 [x,y,z] 元组数组 */
export type StarPositions = Float32Array | ReadonlyArray<readonly [number, number, number]>;

/**
 * 结构化相机接口：与 THREE.PerspectiveCamera / THREE.OrthographicCamera
 * 的矩阵字段兼容（传入相机本体即可），矩阵为列主序 16 元素。
 */
export interface CameraLike {
  projectionMatrix: { elements: ArrayLike<number> };
  matrixWorldInverse: { elements: ArrayLike<number> };
}

export interface Viewport {
  width: number;
  height: number;
}

export interface PickResult {
  /** 命中星在 positions 中的下标 */
  index: number;
  /** 命中星的屏幕像素坐标 */
  screenX: number;
  screenY: number;
  /** 指针到命中星的像素距离 */
  distancePx: number;
}

/** 默认拾取阈值（像素） */
export const DEFAULT_PICK_RADIUS_PX = 12;

/** 列主序 4x4（THREE 约定）作用于 vec4 */
function mulMat4Vec4(
  m: ArrayLike<number>,
  x: number,
  y: number,
  z: number,
  w: number,
): [number, number, number, number] {
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12] * w,
    m[1] * x + m[5] * y + m[9] * z + m[13] * w,
    m[2] * x + m[6] * y + m[10] * z + m[14] * w,
    m[3] * x + m[7] * y + m[11] * z + m[15] * w,
  ];
}

/**
 * 世界坐标 → 屏幕像素坐标（原点在左上，与 DOM 一致）。
 * 相机背后（w <= 0）返回 null；不做视锥裁剪——阈值判定自然处理边缘。
 */
export function worldToScreen(
  point: readonly [number, number, number],
  camera: CameraLike,
  viewport: Viewport,
): { x: number; y: number } | null {
  const [vx, vy, vz, vw] = mulMat4Vec4(
    camera.matrixWorldInverse.elements,
    point[0],
    point[1],
    point[2],
    1,
  );
  const [cx, cy, , cw] = mulMat4Vec4(camera.projectionMatrix.elements, vx, vy, vz, vw);
  if (cw <= 0) return null; // 相机背后或齐次退化
  const ndcX = cx / cw;
  const ndcY = cy / cw;
  return {
    x: (ndcX + 1) * 0.5 * viewport.width,
    y: (1 - ndcY) * 0.5 * viewport.height,
  };
}

function positionAt(positions: StarPositions, i: number): [number, number, number] {
  if (positions instanceof Float32Array) {
    return [positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]];
  }
  const p = positions[i];
  return [p[0], p[1], p[2]];
}

/**
 * 在屏幕阈值内找距指针最近的星。
 *
 * @param ndcX, ndcY 指针 NDC 坐标（[-1,1]，y 向上；由 clientX/Y 换算）
 * @param camera     结构化相机（直接传 THREE 相机即可）
 * @param positions  星点世界坐标
 * @param viewport   渲染视口像素尺寸
 * @param radiusPx   拾取阈值（像素），默认 DEFAULT_PICK_RADIUS_PX
 * @returns 命中结果；阈值内无星（或输入为空）返回 null
 */
export function pickStar(
  ndcX: number,
  ndcY: number,
  camera: CameraLike,
  positions: StarPositions,
  viewport: Viewport,
  radiusPx: number = DEFAULT_PICK_RADIUS_PX,
): PickResult | null {
  const count =
    positions instanceof Float32Array ? Math.floor(positions.length / 3) : positions.length;
  if (count === 0) return null;

  const px = (ndcX + 1) * 0.5 * viewport.width;
  const py = (1 - ndcY) * 0.5 * viewport.height;
  const limit2 = radiusPx * radiusPx;

  let best = -1;
  let bestD2 = Infinity;
  let bestX = 0;
  let bestY = 0;
  for (let i = 0; i < count; i++) {
    const s = worldToScreen(positionAt(positions, i), camera, viewport);
    if (!s) continue;
    const dx = s.x - px;
    const dy = s.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 <= limit2 && d2 < bestD2) {
      bestD2 = d2;
      best = i;
      bestX = s.x;
      bestY = s.y;
    }
  }
  if (best < 0) return null;
  return { index: best, screenX: bestX, screenY: bestY, distancePx: Math.sqrt(bestD2) };
}
