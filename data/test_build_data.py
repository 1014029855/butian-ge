"""数据管线校验。运行: python data/test_build_data.py"""
import json
import os

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
        assert -2 <= s["mag"] <= 11.0  # 星官成员星含暗星；背景星已由管线限制在 6.2 等内
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
