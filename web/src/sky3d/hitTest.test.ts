import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { pickStar, worldToScreen } from "./hitTest";

const viewport = { width: 800, height: 600 };

/** 原点处、朝 -Z 看的透视相机（three 默认朝向） */
function makeCamera(): THREE.PerspectiveCamera {
  const cam = new THREE.PerspectiveCamera(60, viewport.width / viewport.height, 0.1, 1000);
  cam.position.set(0, 0, 0);
  cam.lookAt(0, 0, -1);
  cam.updateMatrixWorld(true);
  cam.updateProjectionMatrix();
  return cam;
}

describe("worldToScreen", () => {
  it("相机正前方的点投到视口中心", () => {
    const s = worldToScreen([0, 0, -100], makeCamera(), viewport);
    expect(s).not.toBeNull();
    expect(s!.x).toBeCloseTo(400, 6);
    expect(s!.y).toBeCloseTo(300, 6);
  });

  it("相机背后的点返回 null", () => {
    expect(worldToScreen([0, 0, 100], makeCamera(), viewport)).toBeNull();
  });
});

describe("pickStar", () => {
  it("正中命中：指针正对唯一星点", () => {
    const positions = new Float32Array([0, 0, -100]);
    const hit = pickStar(0, 0, makeCamera(), positions, viewport);
    expect(hit).not.toBeNull();
    expect(hit!.index).toBe(0);
    expect(hit!.distancePx).toBeCloseTo(0, 6);
    expect(hit!.screenX).toBeCloseTo(400, 6);
    expect(hit!.screenY).toBeCloseTo(300, 6);
  });

  it("阈值外不命中：指针偏离超过 radiusPx", () => {
    const positions = new Float32Array([0, 0, -100]);
    // NDC (0.5, 0.5) 距中心 (400,300) 约 360px，远超默认 12px
    expect(pickStar(0.5, 0.5, makeCamera(), positions, viewport)).toBeNull();
  });

  it("多星取最近：两颗都在阈值内时选像素距离更小者", () => {
    // 星 0 在正中心 (400,300)；星 1 在 (3,0,-100)，投影后约 (415.6,300)
    const positions = new Float32Array([0, 0, -100, 3, 0, -100]);
    // 指针屏幕 (410,300) → NDC x = 410/400 - 1 = 0.025
    // 距星 0 约 10px，距星 1 约 5.6px，阈值 12px 内取最近 → 星 1
    const hit = pickStar(0.025, 0, makeCamera(), positions, viewport, 12);
    expect(hit).not.toBeNull();
    expect(hit!.index).toBe(1);
    // 同样的指针，若星 1 不在输入里则命中星 0
    const only0 = pickStar(0.025, 0, makeCamera(), new Float32Array([0, 0, -100]), viewport, 12);
    expect(only0!.index).toBe(0);
  });

  it("空输入返回 null（Float32Array 与元组数组两种形态）", () => {
    const cam = makeCamera();
    expect(pickStar(0, 0, cam, new Float32Array(0), viewport)).toBeNull();
    expect(pickStar(0, 0, cam, [], viewport)).toBeNull();
  });

  it("支持 [x,y,z] 元组数组输入", () => {
    const positions: [number, number, number][] = [
      [0, 0, -100],
      [50, 50, -100],
    ];
    const hit = pickStar(0, 0, makeCamera(), positions, viewport);
    expect(hit!.index).toBe(0);
  });

  it("阈值边界：radiusPx 恰好覆盖偏移量时命中，缩小 1px 则不命中", () => {
    // 星在 (3,0,-100)，投影偏移约 15.59px
    const positions = new Float32Array([3, 0, -100]);
    const cam = makeCamera();
    const s = worldToScreen([3, 0, -100], cam, viewport)!;
    const offset = Math.abs(s.x - 400);
    expect(pickStar(0, 0, cam, positions, viewport, Math.ceil(offset))).not.toBeNull();
    expect(pickStar(0, 0, cam, positions, viewport, Math.floor(offset) - 1)).toBeNull();
  });
});
