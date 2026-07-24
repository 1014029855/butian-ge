/** 各章节向主渲染循环贡献的视图状态（由当前激活章节覆写）。 */
export interface SkyView {
  rotation: number;
  showLines: boolean;
  dimStarAlpha: number;
  revealAlpha: ((ai: number) => number) | null;
  highlight: Set<number> | null;
  visible: Set<number> | null;
  labels: number[];
  /** 星野漫游自由探索子状态：开启拖拽/缩放/点击 */
  freeExplore: boolean;
}

export function defaultView(): SkyView {
  return {
    rotation: 0,
    showLines: true,
    dimStarAlpha: 1,
    revealAlpha: null,
    highlight: null,
    visible: null,
    labels: [],
    freeExplore: false,
  };
}
