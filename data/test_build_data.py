"""数据管线校验。运行: python data/test_build_data.py"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STARS = os.path.join(ROOT, "web", "public", "data", "stars.json")
ASTERISMS = os.path.join(ROOT, "web", "public", "data", "asterisms.json")
POEM = os.path.join(ROOT, "web", "public", "data", "poem.json")


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def test_stars_count_and_ranges():
    stars = load(STARS)["stars"]
    assert len(stars) >= 2000, f"星点过少: {len(stars)}"
    for s in stars:
        assert 0 <= s["ra"] < 360
        assert -90 <= s["dec"] <= 90
        assert -2 <= s["mag"] <= 11.0  # 星官成员星含暗星；背景星已由管线限制在 6.2 等内
        assert isinstance(s["hip"], int)


def test_star_color_index_range():
    stars = load(STARS)["stars"]
    with_ci = [s["ci"] for s in stars if s["ci"] is not None]
    assert with_ci, "ci 全部缺失"
    # 硬上限取物理合理值 3.5：HYG 中极少数碳星（光谱型 C/N）B-V 可达 ~3.3
    for s in stars:
        if s["ci"] is not None:
            assert -0.5 <= s["ci"] <= 3.5, f"HIP {s['hip']} ci 异常: {s['ci']}"
    normal = sum(1 for ci in with_ci if -0.5 <= ci <= 2.6)
    assert normal / len(with_ci) > 0.99, "绝大多数 ci 应在 -0.5~2.6 正常 B-V 范围"


def test_star_distance_range():
    stars = load(STARS)["stars"]
    with_dist = [s["dist"] for s in stars if s["dist"] is not None]
    assert len(with_dist) / len(stars) > 0.9, \
        f"dist 非空占比过低: {len(with_dist)}/{len(stars)}"
    for s in stars:
        if s["dist"] is not None:
            assert 0.5 <= s["dist"] <= 3000, f"HIP {s['hip']} dist 异常: {s['dist']}"


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


def test_western_constellations():
    path = os.path.join(ROOT, "web", "public", "data", "western.json")
    cons = load(path)["constellations"]
    assert len(cons) >= 80, f"西方星座过少: {len(cons)}"
    stars = {s["hip"] for s in load(STARS)["stars"]}
    for c in cons:
        assert all(h in stars for line in c["lines"] for h in line), f"{c['name']} 缺星"


def test_poem_full_coverage_and_no_placeholder():
    """poem.json（data/build_poem.py 产物）：309 星官全覆盖、引文非空无占位语。
    精确+别名命中率 ≥85% 的校验在 build_poem.py 构建时强制执行。"""
    poem = load(POEM)
    names = [a["name"] for a in load(ASTERISMS)["asterisms"]]
    assert set(poem) == set(names), "poem.json 键集与 asterisms.json 星官名不一致"
    for n in names:
        e = poem[n]
        assert set(e) == {"text", "from"}, f"{n} 字段异常: {set(e)}"
        assert e["text"].strip() and e["from"].strip(), f"{n} text/from 为空"
        for bad in ("待辑", "占位", "俟考"):
            assert bad not in e["text"], f"{n} text 含占位语: {bad}"


if __name__ == "__main__":
    test_stars_count_and_ranges()
    test_star_color_index_range()
    test_star_distance_range()
    test_asterisms_count_and_chinese_names()
    test_asterism_stars_exist_in_catalog()
    test_western_constellations()
    test_poem_full_coverage_and_no_placeholder()
    print("ALL DATA TESTS PASSED")
