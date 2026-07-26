"""步天歌星表管线：Stellarium 中国星空文化 × HYG 星表 → stars.json / asterisms.json

数据源（许可见 data/README.md）:
  - Stellarium skycultures/chinese/index.json —— 312 星官连线与中文星官名（经 jsDelivr 镜像）
  - Stellarium skycultures/chinese/star_names.zh_CN.fab —— 中文星名（镜像同上）
  - HYG Database v3 (CC BY-SA-4.0) —— 恒星 HIP/赤经/赤纬/星等

运行: python data/build_data.py
"""
import csv
import gzip
import io
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")
OUT = os.path.join(ROOT, "web", "public", "data")

SOURCES = {
    "chinese_index.json": [
        "https://cdn.jsdelivr.net/gh/Stellarium/stellarium@master/skycultures/chinese/index.json",
    ],
    "star_names.zh_CN.fab": [
        "https://cdn.jsdelivr.net/gh/Stellarium/stellarium@master/skycultures/chinese/star_names.zh_CN.fab",
    ],
    "modern_index.json": [
        "https://cdn.jsdelivr.net/gh/Stellarium/stellarium@master/skycultures/modern/index.json",
    ],
    "hyg_v44.csv.gz": [
        "https://codeberg.org/astronexus/hyg/media/branch/main/data/hyg/CURRENT/hyg_v44.csv.gz",
        "https://www.astronexus.com/downloads/catalogs/hygdata_v3.csv.gz",
    ],
}

BACKGROUND_MAG_LIMIT = 6.2   # 背景星最暗星等
BACKGROUND_DEC_MIN = -40.0   # 背景星赤纬下限（北半天星图）


def fetch(name: str) -> bytes:
    path = os.path.join(RAW, name)
    if os.path.exists(path):
        print(f"  缓存命中 {name}")
        with open(path, "rb") as f:
            return f.read()
    for url in SOURCES[name]:
        try:
            print(f"  下载 {url}")
            with urllib.request.urlopen(url, timeout=120) as r:
                data = r.read()
            with open(path, "wb") as f:
                f.write(data)
            return data
        except Exception as e:  # noqa: BLE001
            print(f"  失败: {e}")
    sys.exit(f"无法获取 {name}")


def load_hyg() -> dict[int, dict]:
    """HIP -> {ra(deg), dec(deg), mag, ci(B-V 色指数), dist(光年), 缺失均为 None}。兼容 gzip 与纯文本 CSV。"""
    raw = fetch("hyg_v44.csv.gz")
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    text = raw.decode("utf-8", errors="replace")
    stars = {}
    for row in csv.DictReader(io.StringIO(text)):
        hip = (row.get("hip") or "").strip()
        if not hip:
            continue
        try:
            stars[int(hip)] = {
                "ra": float(row["ra"]) * 15.0,  # 小时 → 度
                "dec": float(row["dec"]),
                "mag": float(row["mag"]),
                "ci": parse_ci(row.get("ci")),
                "dist": parse_dist(row.get("dist")),
            }
        except (ValueError, KeyError):
            continue
    return stars


def parse_ci(v) -> float | None:
    """B-V 色指数；空串或非法值返回 None（不影响该星其余字段的取舍）。"""
    s = (v or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def parse_dist(v) -> float | None:
    """距离（秒差距 → 光年）；空串、非法值、非正数或超出 0.5~3000 光年返回 None
    （HYG 以 dist=100000 pc 作缺失占位，一并剔除；不影响该星取舍）。"""
    s = (v or "").strip()
    if not s:
        return None
    try:
        pc = float(s)
    except ValueError:
        return None
    if pc <= 0:
        return None
    ly = pc * 3.26156
    return ly if 0.5 <= ly <= 3000.0 else None


def parse_fab_star_names(raw: str) -> dict[int, str]:
    names = {}
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "|" not in line:
            continue
        hip_s, _, rest = line.partition("|")
        try:
            hip = int(hip_s.strip())
        except ValueError:
            continue
        first = rest.split(",")[0]
        first = re.sub(r'\(".*?"\)', "", first)  # 去译注括号
        first = first.strip().strip('"').replace("_", " ")
        first = re.sub(r"^\d+\s*|\s*\d+$", "", first).strip()  # 去首尾序号
        if first and hip not in names:
            names[hip] = first
    return names


def as_hip(v) -> int | None:
    """连线端点可能是 HIP int、数字字符串、'DSO:...' 或 Gaia 长号——仅保留可联接 HYG 的 HIP。"""
    if isinstance(v, int):
        return v if 0 < v < 10_000_000 else None
    if isinstance(v, str) and v.isdigit() and 0 < int(v) < 10_000_000:
        return int(v)
    return None


def main() -> None:
    os.makedirs(RAW, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)

    print("== 读取星官数据 ==")
    index = json.loads(fetch("chinese_index.json").decode("utf-8"))

    print("== 读取 HYG 星表 ==")
    hyg = load_hyg()
    print(f"  HYG 有效 HIP 星 {len(hyg)} 颗")

    # 星名：index.json 的 common_names 为主，.fab 补充
    star_names: dict[int, str] = parse_fab_star_names(
        fetch("star_names.zh_CN.fab").decode("utf-8")
    )
    for key, entries in index.get("common_names", {}).items():
        try:
            hip = int(key.split()[1])
        except (IndexError, ValueError):
            continue
        if hip not in star_names and entries:
            native = entries[0].get("native", "").strip()
            if native:
                star_names[hip] = native

    # 星官：折线展开为线段对
    asterisms = []
    used_hips: set[int] = set()
    for con in index["constellations"]:
        cid = con["id"].split()[-1]
        name = con.get("common_name", {}).get("native", "").strip()
        if not name:
            continue
        lines: list[list[int]] = []
        members: set[int] = set()
        for poly in con.get("lines", []):
            ids = [h for h in (as_hip(v) for v in poly) if h is not None]
            for a, b in zip(ids, ids[1:]):
                lines.append([a, b])
            members.update(ids)
        if not lines:
            continue
        used_hips.update(members)
        asterisms.append({
            "id": cid,
            "name": name,
            "stars": sorted(members),
            "lines": lines,
        })

    # 西方星座（第五章"东西对话"对比用）
    print("== 读取西方星座数据 ==")
    modern = json.loads(fetch("modern_index.json").decode("utf-8"))
    western = []
    western_hips: set[int] = set()
    for con in modern["constellations"]:
        cid = con["id"].split()[-1]  # 如 Aql
        cname = con.get("common_name", {})
        lines = []
        members: set[int] = set()
        for poly in con.get("lines", []):
            ids = [h for h in (as_hip(v) for v in poly) if h is not None]
            for a, b in zip(ids, ids[1:]):
                lines.append([a, b])
            members.update(ids)
        if not lines:
            continue
        western_hips.update(members)
        western.append({
            "id": cid,
            "name": cname.get("native", cid),           # 拉丁名
            "nameEn": cname.get("english", ""),          # 英文通名
            "stars": sorted(members),
            "lines": lines,
        })
    western_hips &= set(hyg)
    print(f"  西方星座 {len(western)} 个")

    missing = sorted(h for h in used_hips if h not in hyg)
    if missing:
        print(f"  警告: {len(missing)} 个 HIP 在 HYG 中缺失: {missing[:10]}")
        if len(missing) > len(used_hips) * 0.05:
            sys.exit("联接失败率过高，中止")
        miss = set(missing)
        for a in asterisms:
            a["stars"] = [h for h in a["stars"] if h not in miss]
            a["lines"] = [seg for seg in a["lines"] if seg[0] not in miss and seg[1] not in miss]
        asterisms = [a for a in asterisms if a["lines"] and a["stars"]]

    # 星点全集 = 星官成员星 ∪ 有中文星名的星 ∪ 西方星座成员星 ∪ 背景亮星
    keep: set[int] = set(used_hips) | set(star_names) | western_hips
    for hip, s in hyg.items():
        if s["mag"] <= BACKGROUND_MAG_LIMIT and s["dec"] >= BACKGROUND_DEC_MIN:
            keep.add(hip)
    keep &= set(hyg)

    stars = [
        {"hip": hip, "ra": round(hyg[hip]["ra"], 5), "dec": round(hyg[hip]["dec"], 5),
         "mag": round(hyg[hip]["mag"], 2),
         "ci": round(hyg[hip]["ci"], 2) if hyg[hip]["ci"] is not None else None,
         "dist": round(hyg[hip]["dist"], 1) if hyg[hip]["dist"] is not None else None,
         "name": star_names.get(hip)}
        for hip in sorted(keep)
    ]
    star_set = {s["hip"] for s in stars}
    for w in western:
        w["stars"] = [h for h in w["stars"] if h in star_set]
        w["lines"] = [seg for seg in w["lines"] if seg[0] in star_set and seg[1] in star_set]
    western = [w for w in western if w["lines"]]

    with open(os.path.join(OUT, "stars.json"), "w", encoding="utf-8") as f:
        json.dump({"stars": stars}, f, ensure_ascii=False, separators=(",", ":"))
    with open(os.path.join(OUT, "asterisms.json"), "w", encoding="utf-8") as f:
        json.dump({"asterisms": asterisms}, f, ensure_ascii=False, separators=(",", ":"))
    with open(os.path.join(OUT, "western.json"), "w", encoding="utf-8") as f:
        json.dump({"constellations": western}, f, ensure_ascii=False, separators=(",", ":"))

    named = sum(1 for s in stars if s["name"])
    print("== 汇总 ==")
    print(f"  星官 {len(asterisms)} 个；西方星座 {len(western)} 个；星点 {len(stars)} 颗（其中中文星名 {named} 颗）")
    print(f"  输出: {OUT}")


if __name__ == "__main__":
    main()
