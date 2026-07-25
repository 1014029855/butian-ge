/**
 * 西方星座连线（ch7 东西对话专用）：88 个 IAU 星座折线，单次 draw call。
 *
 * 数据：/data/western.json（{constellations:[{id,name,nameEn,stars:[hip],lines:[[a,b]]}]}）。
 * 连线只给 hip 编号，坐标取自 /data/stars.json（hip → ra/dec，度），经
 * sky3d/coords.radecToVec3 投到 R=100 天球面；缺坐标的 hip 对静默剔除。
 *
 * 渲染约定与 sky3d/ConstellationLines 一致（transparent + depthWrite:false +
 * AdditiveBlending），颜色用冷银蓝 #8fa8c8，与中国星官的淡金形成冷暖对比。
 * 整体不透明度由 setOpacity 全局控制（中西叠化用）；opacity≈0 时整组隐藏，
 * 不占 draw call。
 */
import * as THREE from "three";
import { radecToVec3 } from "../../sky3d/coords";
import { dataUrl } from "../../sky3d/dataUrl";

/** 天球半径（与 SkyApp.R / StarField 一致） */
const R = 100;
/** 西方星座线颜色：冷银蓝 */
const COLOR = 0x8fa8c8;

export interface WesternConstellation {
  id: string;
  name: string;
  nameEn: string;
  stars: number[];
  lines: [number, number][];
}

export interface WesternLinesHandle {
  /** 全部西方星座连线的挂载组（单次 draw call） */
  group: THREE.Group;
  /** 全局不透明度 v∈[0,1]（自动钳制；≈0 时整组隐藏） */
  setOpacity(v: number): void;
  /** 释放 geometry / material；调用前请先从场景移除 group */
  dispose(): void;
}

interface StarRec {
  hip: number;
  ra: number;
  dec: number;
}

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

/** 拉取数据并构建西方星座连线；失败时异常上抛给调用方（ch7 降级为仅告警） */
export async function createWesternLines(): Promise<WesternLinesHandle> {
  const [western, starsData] = await Promise.all([
    fetchJson<{ constellations: WesternConstellation[] }>(dataUrl("data/western.json")),
    fetchJson<{ stars: StarRec[] }>(dataUrl("data/stars.json")),
  ]);

  // hip → R=100 天球面坐标
  const posByHip = new Map<number, [number, number, number]>();
  for (const s of starsData.stars) {
    posByHip.set(s.hip, radecToVec3(s.ra, s.dec, R));
  }

  // 展开全部线段端点（两顶点/段，供 LineSegments）
  const verts: number[] = [];
  for (const c of western.constellations) {
    for (const [a, b] of c.lines) {
      const pa = posByHip.get(a);
      const pb = posByHip.get(b);
      if (!pa || !pb) continue;
      verts.push(pa[0], pa[1], pa[2], pb[0], pb[1], pb[2]);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts), 3));
  const mat = new THREE.LineBasicMaterial({
    color: COLOR,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.name = "western-lines";
  lines.frustumCulled = false; // 线段遍布全天，包围球剔除无意义

  const group = new THREE.Group();
  group.name = "western";
  group.add(lines);
  group.visible = false; // 初始 opacity 0，待 setOpacity 点亮

  return {
    group,
    setOpacity(v) {
      const o = THREE.MathUtils.clamp(v, 0, 1);
      mat.opacity = o;
      group.visible = o > 0.001;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}
