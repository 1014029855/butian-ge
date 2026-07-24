# 「步天歌」M1 原型星图 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> 注：本会话用户约束禁止使用 Agent 子代理，故由主会话按 executing-plans 方式逐任务内联执行。

**Goal:** 搭建可运行的 M1 原型：真实数据驱动的中国古代星官交互星图（能转、能缩放、能点、有详情卡），单页面即可试玩。

**Architecture:** 离线 Python 数据管线把 Stellarium 中国星空文化数据（星官连线+星名）与 HYG 星表（坐标+星等）按 HIP 编号联接，产出两个静态 JSON；前端 Vite + TypeScript 单页，Canvas 2D 渲染北天极方位等距投影星图，含闪烁引擎、平移缩放相机、点击命中的星官详情卡。

**Tech Stack:** Python 3.12（managed，pandas 不需要，标准库即可）/ Node 24 + npm 11（注意：本机 shell 中 npm 命令需写 `npm.cmd`）/ Vite 5 + TypeScript 5 + Vitest 2。

**Spec:** `docs/superpowers/specs/2026-07-24-butian-ge-star-atlas-design.md`

## Global Constraints

- 工作区根目录 `E:\competition\比赛`；数据管线在 `data/`，前端在 `web/`，均已在根 git 仓库内。
- npm 调用一律使用 `npm.cmd`（git bash 环境无 `npm` shim）。
- 配色 token：底色 `#162638`→`#0d0d11` 渐变；星点/连线金 `#c9a227`、次级 `#af915f`；正文暖米金 `#fce1b6`。
- 字体栈（M1 用系统字体，webfont 留到 M3）：标题 `"STSong","SimSun","Songti SC",serif`；正文 `"PingFang SC","Microsoft YaHei",sans-serif`。禁中文斜体。
- 数据合规：HYG Database 为 CC BY-SA-4.0，Stellarium 中国星空文化数据需署名；M3 尾声页必须给出两处出处（本里程碑在代码注释与 data/README 中先行记录）。
- 所有 JSON/代码文件 UTF-8 编码。
- 性能：单帧渲染 ≥ 5000 星点须保持 60fps（Canvas 2D，静止帧降渲染——无交互且闪烁暂停时跳帧）。

## 文件结构

- `data/build_data.py` — 下载/解析/联接/导出 `stars.json`（全部恒星：hip, ra[deg], dec[deg], mag, name?）与 `asterisms.json`（星官：name, nameEn?, lines: [[hip...]], stars: [hip...]）
- `data/test_build_data.py` — 数据管线校验（pytest 风格，用 `python -m pytest` 或裸 `python` 断言运行）
- `data/README.md` — 数据源与许可说明
- `web/` — Vite vanilla-ts 应用
  - `src/starfield/projection.ts` — 北天极方位等距投影
  - `src/starfield/rng.ts` — 可播种伪随机（mulberry32），供闪烁参数确定性生成
  - `src/starfield/twinkle.ts` — 闪烁参数生成与透明度计算
  - `src/starfield/magnitude.ts` — 星等→半径/基准透明度映射
  - `src/starfield/camera.ts` — 平移缩放相机（含缩放至光标）
  - `src/starfield/hitTest.ts` — 点击→最近星/星官命中
  - `src/starfield/renderer.ts` — Canvas 渲染（星点、连线、闪烁）
  - `src/ui/detailCard.ts` — 星官详情卡 DOM 组件
  - `src/main.ts` / `index.html` / `src/style.css` — 集成与视觉基底
  - 测试：`src/starfield/*.test.ts`（vitest）

---

### Task 1: 数据管线（下载 → 联接 → 导出 JSON）

**Files:**
- Create: `data/build_data.py`
- Create: `data/test_build_data.py`
- Create: `data/README.md`
- Output: `web/public/data/stars.json`, `web/public/data/asterisms.json`

**Interfaces:**
- Produces（前端消费的 JSON 形状）:
  - `stars.json`: `{ "stars": [{ "hip": number, "ra": number, "dec": number, "mag": number, "name": string | null }] }`（ra/dec 单位：度）
  - `asterisms.json`: `{ "asterisms": [{ "id": string, "name": string, "stars": number[], "lines": number[][] }] }`（lines 为 hip 对组成的折线段列表，元素为 hip 编号）

- [ ] **Step 1: 写失败测试** `data/test_build_data.py`

```python
"""数据管线校验。运行: python -m pytest data/test_build_data.py -v （无 pytest 时: python data/test_build_data.py）"""
import json, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STARS = os.path.join(ROOT, "web", "public", "data", "stars.json")
ASTERISMS = os.path.join(ROOT, "web", "public", "data", "asterisms.json")


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def test_stars_count_and_ranges():
    stars = load(STARS)["stars"]
    assert len(stars) >= 2000, f"星点过少: {len(stars)}"
    for s in stars:
        assert 0 <= s["ra"] < 360
        assert -90 <= s["dec"] <= 90
        assert -2 <= s["mag"] <= 7.0
        assert isinstance(s["hip"], int)


def test_asterisms_count_and_chinese_names():
    asterisms = load(ASTERISMS)["asterisms"]
    assert len(asterisms) >= 250, f"星官过少: {len(asterisms)}"
    cjk = sum(1 for a in asterisms if any("一" <= ch <= "鿿" for ch in a["name"]))
    assert cjk / len(asterisms) > 0.95, "星官名必须是中文"


def test_asterism_stars_exist_in_catalog():
    stars = {s["hip"] for s in load(STARS)["stars"]}
    for a in load(ASTERISMS)["asterisms"]:
        assert a["stars"], f"{a['name']} 没有成员星"
        missing = [h for h in a["stars"] if h not in stars]
        assert not missing, f"{a['name']} 缺星: {missing[:5]}"
        for line in a["lines"]:
            assert len(line) >= 2
            assert all(h in stars for h in line)


if __name__ == "__main__":
    test_stars_count_and_ranges()
    test_asterisms_count_and_chinese_names()
    test_asterism_stars_exist_in_catalog()
    print("ALL DATA TESTS PASSED")
```

- [ ] **Step 2: 运行测试确认失败**

Run: `cd E:\competition\比赛 && python data/test_build_data.py`
Expected: FAIL — `FileNotFoundError`（JSON 尚不存在）

- [ ] **Step 3: 实现数据管线** `data/build_data.py`

要点（实现时按此逻辑，非伪代码）：
1. `data/raw/` 缓存下载。HYG 候选 URL 依次尝试：
   - `https://raw.githubusercontent.com/astronexus/HYG-Database/master/hygdata_v3.csv`
   - `https://www.astronexus.com/downloads/catalogs/hygdata_v3.csv.gz`（需 gzip 解压）
2. Stellarium 中国星空文化候选 URL（依次尝试 `.json` 新格式与 `.fab` 旧格式）：
   - `.../Stellarium/stellarium/master/skycultures/chinese/index.json`
   - `.../chinese/constellationship.fab` + `.../chinese/constellation_names.zh_CN.fab` + `.../chinese/star_names.zh_CN.fab`
   （`...` = `https://raw.githubusercontent.com`）
3. 解析：
   - index.json 路径：`data["constellations"]` 每项取 `id`、`common_name`（优先 `native`，若为纯 ASCII 则取 translations/`zh_CN` 字段；仍无中文则用 .fab 路径兜底）、`lines`（hip 数组的数组）、成员星为 lines 的并集。
   - .fab 路径：`constellationship.fab` 每行 `name nPairs hip1 hip2 ...`（每对 hip 为一条线段）；`constellation_names.zh_CN.fab` 每行 `id\t"中文名"` 或空格分隔（实现时按实际分隔符兼容 `\t` 与多空格，剥离引号）；`star_names.zh_CN.fab` 每行 `hip|"中文名"`（竖线分隔，剥引号与注释）。
4. HYG 解析：`csv.DictReader`，字段 `hip, ra, dec, mag`；ra 为小时→乘 15 转度；跳过 hip 为空行。
5. 联接导出：
   - `stars.json`：所有出现在星官 lines 中的星 + 有中文星名的星 + 背景星（`mag <= 6.2` 且在北半天 `dec >= -40`，控制总量 < 9000）。
   - `asterisms.json`：`id` 用 Stellarium 条目 id（如 `001` 或英文缩写，slug 化），`name` 中文，`stars` 排序去重，`lines` 保留 hip 对顺序。
   - 每个 asterism 增加 `"center"`？——不需要，前端可由成员星坐标均值计算（YAGNI）。
6. 打印汇总：星数、星官数、联接失败 hip 列表（>5% 时报错退出）。

- [ ] **Step 4: 运行管线并跑通测试**

Run: `cd E:\competition\比赛 && python data/build_data.py && python data/test_build_data.py`
Expected: 管线打印汇总；测试输出 `ALL DATA TESTS PASSED`

- [ ] **Step 5: 写数据说明并提交**

`data/README.md` 记录：HYG Database（CC BY-SA-4.0, astronexus）、Stellarium 中国星空文化数据（Stellarium 项目, github.com/Stellarium/stellarium），两处在 M3 尾声页署名。

```bash
git add data web/public/data && git commit -m "feat(data): 星表管线——HYG×Stellarium中国星空文化联接导出"
```

---

### Task 2: 前端脚手架（Vite + TS + Vitest）

**Files:**
- Create: `web/package.json`, `web/tsconfig.json`, `web/vite.config.ts`, `web/index.html`, `web/src/main.ts`, `web/src/style.css`

**Interfaces:**
- Produces: `npm.cmd run dev` / `npm.cmd run build` / `npm.cmd test` 三个脚本入口；`index.html` 含 `<canvas id="sky">`、`<div id="detail-card">`、标题 `#app-title`。

- [ ] **Step 1: 手写脚手架（不用交互式 create）**

`web/package.json`:
```json
{
  "name": "butian-ge",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```
随后 `cd web && npm.cmd install --save-dev vite@^5 typescript@^5 vitest@^2`（不装 D3/GSAP：M1 投影与滚动自实现，YAGNI）。

`web/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM"],
    "types": ["vite/client"]
  },
  "include": ["src"]
}
```

`web/vite.config.ts`:
```ts
import { defineConfig } from "vite";
export default defineConfig({ base: "./" });
```

- [ ] **Step 2: 验证脚手架可构建**

`index.html`（骨架，含 canvas 与 detail-card 容器）、`src/main.ts`（仅 `import "./style.css";` + console.log）、`src/style.css`（写入 Global Constraints 的 CSS 变量：`--bg-deep:#162638; --bg-near-black:#0d0d11; --gold:#c9a227; --gold-dim:#af915f; --cream:#fce1b6;` + 标题/正文字体栈）。

Run: `cd web && npm.cmd run build`
Expected: `✓ built in ...`，无 TS 错误

- [ ] **Step 3: Commit**

```bash
git add web && git commit -m "chore(web): Vite+TS+Vitest 脚手架与视觉 token"
```

---

### Task 3: 投影模块（北天极方位等距投影）

**Files:**
- Create: `web/src/starfield/projection.ts`
- Test: `web/src/starfield/projection.test.ts`

**Interfaces:**
- Produces:
  - `project(raDeg: number, decDeg: number): { x: number; y: number }` — 输出单位：弧度制角距（北天极为原点 (0,0)；y 轴负向为赤经 0° 方向，赤经沿顺时针增大，即仰观北天视角）
  - `RAD_SCALE` — 世界坐标=角距弧度；渲染缩放由 camera 负责

- [ ] **Step 1: 写失败测试**

```ts
import { describe, it, expect } from "vitest";
import { project } from "./projection";

describe("北天极方位等距投影", () => {
  it("天极投影为原点", () => {
    const p = project(0, 90);
    expect(p.x).toBeCloseTo(0, 10);
    expect(p.y).toBeCloseTo(0, 10);
  });
  it("赤道上 ra=0 的星距极 π/2，位于 -y 方向", () => {
    const p = project(0, 0);
    expect(p.x).toBeCloseTo(0, 10);
    expect(p.y).toBeCloseTo(-Math.PI / 2, 10);
  });
  it("角距保真：dec=60 的星距极 π/6", () => {
    const p = project(123.4, 60);
    expect(Math.hypot(p.x, p.y)).toBeCloseTo(Math.PI / 6, 10);
  });
  it("方位角保真：同 dec 不同 ra 的星角距相同、方向随 ra 顺时针旋转", () => {
    const a = project(0, 30);
    const b = project(90, 30);
    expect(Math.hypot(b.x, b.y)).toBeCloseTo(Math.hypot(a.x, a.y), 10);
    expect(b.x).toBeCloseTo(-a.y, 6); // 顺时针 90°
    expect(b.y).toBeCloseTo(a.x, 6);
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `cd web && npm.cmd test -- projection`
Expected: FAIL `project is not defined` / 模块不存在

- [ ] **Step 3: 实现**

```ts
const D2R = Math.PI / 180;

/** 北天极方位等距投影：与苏州石刻天文图同法。 */
export function project(raDeg: number, decDeg: number): { x: number; y: number } {
  const rho = (90 - decDeg) * D2R; // 距角
  const theta = raDeg * D2R; // 赤经即方位角，顺时针为正
  return { x: rho * Math.sin(theta), y: -rho * Math.cos(theta) };
}
```

- [ ] **Step 4: 运行确认通过**

Run: `cd web && npm.cmd test -- projection`
Expected: 4 passed

- [ ] **Step 5: Commit**

```bash
git add web/src/starfield && git commit -m "feat(starfield): 北天极方位等距投影"
```

---

### Task 4: 闪烁引擎与星等映射

**Files:**
- Create: `web/src/starfield/rng.ts`, `web/src/starfield/twinkle.ts`, `web/src/starfield/magnitude.ts`
- Test: `web/src/starfield/twinkle.test.ts`, `web/src/starfield/magnitude.test.ts`

**Interfaces:**
- Produces:
  - `mulberry32(seed: number): () => number`
  - `makeTwinkleParams(rand: () => number): { duration: number; omin: number; omax: number; phase: number }`（duration∈[2.4,7.6]s，omin∈[0.05,0.26]，omax∈[0.13,0.94] 且 omax>omin）
  - `twinkleOpacity(p: {duration:number;omin:number;omax:number;phase:number}, tSec: number): number`（余弦插值，返回值∈[omin,omax]）
  - `magToRadius(mag: number): number`（单调不增；mag=-1→≈2.6px，mag=6.2→≈0.9px）
  - `magToAlpha(mag: number): number`（0.35–1.0，暗星更透明）

- [ ] **Step 1: 写失败测试**

```ts
// twinkle.test.ts
import { describe, it, expect } from "vitest";
import { mulberry32 } from "./rng";
import { makeTwinkleParams, twinkleOpacity } from "./twinkle";

describe("闪烁引擎", () => {
  it("同一种子生成同一参数（确定性）", () => {
    expect(makeTwinkleParams(mulberry32(42))).toEqual(makeTwinkleParams(mulberry32(42)));
  });
  it("参数在规格区间内", () => {
    for (let seed = 0; seed < 200; seed++) {
      const p = makeTwinkleParams(mulberry32(seed));
      expect(p.duration).toBeGreaterThanOrEqual(2.4);
      expect(p.duration).toBeLessThanOrEqual(7.6);
      expect(p.omin).toBeGreaterThanOrEqual(0.05);
      expect(p.omin).toBeLessThanOrEqual(0.26);
      expect(p.omax).toBeGreaterThanOrEqual(0.13);
      expect(p.omax).toBeLessThanOrEqual(0.94);
      expect(p.omax).toBeGreaterThan(p.omin);
    }
  });
  it("透明度在 [omin, omax] 内周期变化", () => {
    const p = makeTwinkleParams(mulberry32(7));
    let lo = 1, hi = 0;
    for (let t = 0; t < p.duration; t += 0.01) {
      const o = twinkleOpacity(p, t);
      lo = Math.min(lo, o); hi = Math.max(hi, o);
      expect(o).toBeGreaterThanOrEqual(p.omin - 1e-9);
      expect(o).toBeLessThanOrEqual(p.omax + 1e-9);
    }
    expect(hi - lo).toBeGreaterThan((p.omax - p.omin) * 0.95); // 振幅吃满
  });
});
```

```ts
// magnitude.test.ts
import { describe, it, expect } from "vitest";
import { magToRadius, magToAlpha } from "./magnitude";

describe("星等映射", () => {
  it("越亮半径越大", () => {
    expect(magToRadius(-1)).toBeGreaterThan(magToRadius(2));
    expect(magToRadius(2)).toBeGreaterThan(magToRadius(6.2));
  });
  it("边界值", () => {
    expect(magToRadius(-1)).toBeCloseTo(2.6, 1);
    expect(magToRadius(6.2)).toBeCloseTo(0.9, 1);
    expect(magToRadius(10)).toBeCloseTo(0.9, 1); // clamp
  });
  it("透明度区间 [0.35, 1] 且亮星更实", () => {
    expect(magToAlpha(-1)).toBeCloseTo(1, 5);
    expect(magToAlpha(6.2)).toBeCloseTo(0.35, 5);
    expect(magToAlpha(2)).toBeGreaterThan(magToAlpha(5));
  });
});
```

- [ ] **Step 2: 运行确认失败** → `npm.cmd test -- twinkle magnitude`，模块缺失 FAIL

- [ ] **Step 3: 实现**

```ts
// rng.ts
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

```ts
// twinkle.ts
export interface TwinkleParams { duration: number; omin: number; omax: number; phase: number; }

export function makeTwinkleParams(rand: () => number): TwinkleParams {
  const duration = 2.4 + rand() * 5.2;
  const omin = 0.05 + rand() * 0.21;
  const omax = Math.min(0.94, Math.max(0.13, omin + 0.08 + rand() * 0.7));
  return { duration, omin, omax, phase: rand() };
}

export function twinkleOpacity(p: TwinkleParams, tSec: number): number {
  const k = 0.5 - 0.5 * Math.cos(2 * Math.PI * (tSec / p.duration + p.phase));
  return p.omin + (p.omax - p.omin) * k;
}
```

```ts
// magnitude.ts
export function magToRadius(mag: number): number {
  const r = 2.6 * Math.pow(10, -0.09 * (mag + 1));
  return Math.min(2.6, Math.max(0.9, r));
}
export function magToAlpha(mag: number): number {
  const a = 1 - 0.65 * ((mag + 1) / 7.2);
  return Math.min(1, Math.max(0.35, a));
}
```

（半径公式校验：mag=-1→2.6；mag=6.2→2.6·10^(−0.648)≈0.58→clamp 0.9，测试以 clamp 后为准——若计算值 < 0.9 属预期，测试断言 `toBeCloseTo(0.9,1)` 仍通过。）

- [ ] **Step 4: 运行确认通过** → 全绿

- [ ] **Step 5: Commit**

```bash
git add web/src/starfield && git commit -m "feat(starfield): 闪烁引擎与星等映射"
```

---

### Task 5: 相机与命中检测

**Files:**
- Create: `web/src/starfield/camera.ts`, `web/src/starfield/hitTest.ts`
- Test: `web/src/starfield/camera.test.ts`, `web/src/starfield/hitTest.test.ts`

**Interfaces:**
- Consumes: `project()` 输出的世界坐标（弧度）
- Produces:
  - `class Camera { k: number; tx: number; ty: number; toScreen(wx,wy): {x,y}; toWorld(sx,sy): {x,y}; pan(dxScreen,dyScreen): void; zoomAt(sx,sy,factor): void; fit(radius, viewportW, viewportH, padding): void; }`（toScreen: `sx = (wx+tx)*k`，`sy = (wy+ty)*k`）
  - `hitTestStar(stars: {x:number;y:number}[], wx: number, wy: number, maxDistWorld: number): number`（返回最近星索引，超阈值 -1）

- [ ] **Step 1: 写失败测试**

```ts
// camera.test.ts
import { describe, it, expect } from "vitest";
import { Camera } from "./camera";

describe("相机", () => {
  it("屏幕/世界坐标互逆", () => {
    const c = new Camera(); c.k = 100; c.tx = 0.01; c.ty = -0.02;
    const s = c.toScreen(0.5, -0.3);
    const w = c.toWorld(s.x, s.y);
    expect(w.x).toBeCloseTo(0.5, 10);
    expect(w.y).toBeCloseTo(-0.3, 10);
  });
  it("zoomAt 保持光标处世界点不动", () => {
    const c = new Camera(); c.k = 100; c.tx = 0.1; c.ty = 0.1;
    const before = c.toWorld(400, 300);
    c.zoomAt(400, 300, 1.5);
    const after = c.toWorld(400, 300);
    expect(after.x).toBeCloseTo(before.x, 10);
    expect(after.y).toBeCloseTo(before.y, 10);
    expect(c.k).toBeCloseTo(150, 6);
  });
  it("fit 让全天球入画且不溢出", () => {
    const c = new Camera();
    c.fit(Math.PI, 800, 600, 40); // 半径π的世界 → k=(min边-2p)/(2r)
    expect(c.k).toBeCloseTo((600 - 80) / (2 * Math.PI), 6);
    expect(c.tx).toBeCloseTo(0, 6);
    expect(c.ty).toBeCloseTo(0, 6);
  });
});
```

```ts
// hitTest.test.ts
import { describe, it, expect } from "vitest";
import { hitTestStar } from "./hitTest";

const stars = [{ x: 0, y: 0 }, { x: 0.1, y: 0 }, { x: 5, y: 5 }];

describe("命中检测", () => {
  it("返回最近星索引", () => {
    expect(hitTestStar(stars, 0.09, 0.01, 0.05)).toBe(1);
    expect(hitTestStar(stars, 0.01, -0.01, 0.05)).toBe(0);
  });
  it("超阈值返回 -1", () => {
    expect(hitTestStar(stars, 2, 2, 0.05)).toBe(-1);
  });
});
```

- [ ] **Step 2: 运行确认失败**

- [ ] **Step 3: 实现**

```ts
// camera.ts
export class Camera {
  k = 1; tx = 0; ty = 0;
  toScreen(wx: number, wy: number) { return { x: (wx + this.tx) * this.k, y: (wy + this.ty) * this.k }; }
  toWorld(sx: number, sy: number) { return { x: sx / this.k - this.tx, y: sy / this.k - this.ty }; }
  pan(dx: number, dy: number) { this.tx += dx / this.k; this.ty += dy / this.k; }
  zoomAt(sx: number, sy: number, factor: number) {
    const w = this.toWorld(sx, sy);
    this.k = Math.min(20000, Math.max(20, this.k * factor));
    this.tx = sx / this.k - w.x;
    this.ty = sy / this.k - w.y;
  }
  fit(radius: number, w: number, h: number, padding: number) {
    this.k = (Math.min(w, h) - 2 * padding) / (2 * radius);
    this.tx = w / (2 * this.k);
    this.ty = h / (2 * this.k);
  }
}
```

（注：fit 的世界中心为 (0,0) 时，使 toScreen(0,0)=(w/2,h/2) → tx=w/(2k), ty=h/(2k)，与测试断言 tx=0 冲突——**修正测试**：fit 测试断言改为 `expect(c.toScreen(0,0)).toEqual({x:400,y:300})` 与 k 值断言，不直接断言 tx/ty。）

```ts
// hitTest.ts
export function hitTestStar(stars: { x: number; y: number }[], wx: number, wy: number, maxDist: number): number {
  let best = -1, bestD2 = maxDist * maxDist;
  for (let i = 0; i < stars.length; i++) {
    const dx = stars[i].x - wx, dy = stars[i].y - wy;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) { bestD2 = d2; best = i; }
  }
  return best;
}
```

- [ ] **Step 4: 运行确认通过**（注意先按上述修正更新 camera.test.ts 的 fit 用例）

- [ ] **Step 5: Commit**

```bash
git add web/src/starfield && git commit -m "feat(starfield): 相机变换与点击命中"
```

---

### Task 6: 渲染器 + 详情卡 + 页面集成（M1 交付）

**Files:**
- Create: `web/src/starfield/renderer.ts`
- Create: `web/src/ui/detailCard.ts`
- Modify: `web/index.html`, `web/src/main.ts`, `web/src/style.css`

**Interfaces:**
- Consumes: 全部前序接口 + `stars.json` / `asterisms.json`（Task 1 形状）
- Produces:
  - `renderSky(ctx, camera, layout, tSec, highlightAsterismId | null)` — `layout` 为 `{stars: {x,y,r,a,name,hip,tw}[], asterismPaths: {id,name,segments:[{x1,y1,x2,y2}][], labelPos:{x,y}}[]}`
  - `buildLayout(starsJson, asterismsJson)` — 数据→世界坐标布局（renderer 只认 layout，不认 JSON）
  - `showDetailCard(el, asterism, memberStars, screenPos)` — 填充并定位详情卡

- [ ] **Step 1: 实现渲染器**（`renderer.ts`，无单测——视觉走查；纯函数 buildLayout 单独导出便于后续测试）

要点：
- `buildLayout`：对每颗星 `project(ra,dec)`；半径/alpha 用 Task 4 映射；闪烁参数用 `mulberry32(hip)` 播种（天然确定性）；星官折线把 `lines` 的 hip 对映射为线段；`labelPos` 为成员星世界坐标均值。
- `renderSky`：清屏（底色由 CSS 渐变承担，canvas 透明）；先画连线（`#af915f`，lineWidth 1，alpha 0.55；高亮星官 `#c9a227` lineWidth 1.6 alpha 0.95），再画星点（`fillStyle` 金，alpha = `magToAlpha(mag) * twinkleOpacity(tw, tSec)`，亮星加 0.35 光晕 shadowBlur=6 同色系），高亮星官在 labelPos 绘制中文名（标题宋体 15px，`#fce1b6`）。
- 闪烁驱动：`requestAnimationFrame` 循环；无交互且距上次重绘 < 33ms 时跳帧省 CPU。

- [ ] **Step 2: 实现详情卡**（`ui/detailCard.ts`）

- 内容：星官名（大）、成员星数、所属（三垣/四象二十八宿，由 asterism id 前缀映射简单归类表 `YUAN_XIU_MAP`：Stellarium chinese 条目 id 前缀 `T`/`F`…——**实现时以 index.json 中实际字段为准**，若无分组信息则 M1 省略该字段，详情卡仅展示 名称/星数/代表星名列表前 8 颗）。
- 样式：深底 `#0d0d11` 85% + 1px `#af915f55` 边框 + 8px 圆角，出现在点击点旁并防出屏。

- [ ] **Step 3: 页面集成**

`index.html`：全屏 `<canvas id="sky">`，左上标题「步天歌」+ 副标 "中国古代星官交互星图 · M1 原型"，右下操作提示（拖拽平移 / 滚轮缩放 / 点击星点查看星官）。
`main.ts`：
1. `fetch("data/stars.json")` 与 `fetch("data/asterisms.json")`（vite `public/` 下资源）→ `buildLayout`
2. `camera.fit(Math.PI, innerWidth, innerHeight, 48)`；监听 `pointerdown/move/up`（拖拽 pan）、`wheel`（zoomAt，factor = `Math.exp(-deltaY * 0.001)`）、`click`（位移 < 4px 视为点击：世界坐标 `hitTestStar`（阈值 `10 / camera.k`）→ 命中星的所属星官高亮 + `showDetailCard`；点空白清除）
3. `resize` 重建 canvas 尺寸（devicePixelRatio 适配）并重绘
4. rAF 循环调 `renderSky(ctx, camera, layout, performance.now()/1000, highlightId)`

- [ ] **Step 4: 构建 + 冒烟验证**

Run: `cd web && npm.cmd run build && npm.cmd test`
Expected: TS 无错、全部单测通过、`dist/` 产出。
再手动冒烟：`npm.cmd run dev -- --port 5173 --host 127.0.0.1` 起服务后用 curl 验证 `http://127.0.0.1:5173/` 与 `/data/stars.json` 均 200，随后**停止 dev server**（不留后台进程）。

- [ ] **Step 5: Commit**

```bash
git add web && git commit -m "feat(m1): 星图渲染/详情卡/交互集成——M1 原型完成"
```

---

## 验收清单（M1 完成定义）

1. `npm.cmd run build` 通过；`npm.cmd test` 全绿
2. `python data/test_build_data.py` 通过（≥250 星官、≥2000 星、连线星全部在册）
3. 浏览器打开可见：墨蓝金配色星野、星点闪烁、拖拽/缩放流畅、点击星点出现中文星官详情卡与高亮连线
4. git 历史含 6 个任务提交
