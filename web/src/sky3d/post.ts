/**
 * 后处理管线：EffectComposer + RenderPass + UnrealBloomPass + OutputPass。
 * bloom 在半分辨率下计算（UnrealBloomPass 内部还会再减半建 mip 链），
 * 星点辉光足够柔和，开销约为全分辨率的 1/4。
 */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/** bloom 可调参数（全部可选，缺省用星空默认值） */
export interface BloomParams {
  strength?: number;
  radius?: number;
  threshold?: number;
}

export interface PostPipeline {
  composer: EffectComposer;
  /** 每帧渲染（走 composer，含 OutputPass 的色调映射与 sRGB 输出） */
  render: (deltaTime?: number) => void;
  /** 与 renderer.setSize 用同一套 CSS 尺寸；内部自动同步 DPR */
  setSize: (w: number, h: number) => void;
  setBloom: (params: BloomParams) => void;
  /** 开关 bloom（关闭时仍走 composer，保证色彩路径一致） */
  setEnabled: (bloomOn: boolean) => void;
}

/** 星空默认值：阈值压低让普通暗星不泛光，强度/半径取柔和档 */
const DEFAULT_BLOOM = { strength: 0.7, radius: 0.4, threshold: 0.55 } as const;

export function createPostPipeline(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  opts: BloomParams = {},
): PostPipeline {
  const strength = opts.strength ?? DEFAULT_BLOOM.strength;
  const radius = opts.radius ?? DEFAULT_BLOOM.radius;
  const threshold = opts.threshold ?? DEFAULT_BLOOM.threshold;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), strength, radius, threshold);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  function setSize(w: number, h: number): void {
    // 与 renderer 当前 DPR 保持同步（画质档切换会改 renderer.setPixelRatio）
    const pr = renderer.getPixelRatio();
    composer.setPixelRatio(pr);
    composer.setSize(w, h); // 会把全分辨率广播给每个 pass
    // 重新把 bloom 压回半分辨率（上一步刚把它覆盖成全分辨率）
    bloomPass.setSize(Math.max(1, Math.round((w * pr) / 2)), Math.max(1, Math.round((h * pr) / 2)));
  }

  // 立即按 renderer 当前尺寸初始化，不依赖集成方先调一次 setSize
  const size = renderer.getSize(new THREE.Vector2());
  setSize(size.x, size.y);

  return {
    composer,
    render: (deltaTime?: number) => composer.render(deltaTime),
    setSize,
    setBloom: (params: BloomParams) => {
      if (params.strength !== undefined) bloomPass.strength = params.strength;
      if (params.radius !== undefined) bloomPass.radius = params.radius;
      if (params.threshold !== undefined) bloomPass.threshold = params.threshold;
    },
    setEnabled: (bloomOn: boolean) => {
      bloomPass.enabled = bloomOn;
    },
  };
}
