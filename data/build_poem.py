"""构建「星官 ×《步天歌》引文」映射 web/public/data/poem.json。

输入：
  - data/poem/butian'ge_src.txt  《步天歌》原文（维基文库《步天歌 (王希明)》oldid=2171549，
    公有领域；章节以「## 四象/三垣 · 宿/宫名」标注，句读沿用底本）
  - web/public/data/asterisms.json  309 星官名

输出：
  - web/public/data/poem.json  { 星官名: {"text": 引文(繁体原文), "from": "所属章节"} }

匹配规则（与任务书一致）：
  a) 星官名（简体）经 OpenCC 对齐后在诗句中精确命中；
  b) 数据名带「(附X宿)」「(X宿/X垣)」后缀的，去后缀再匹配，后缀兼作章节定位；
  c) ALIASES 小别名表处理异名（紫微左垣/东藩左枢、北落师门/北落门、司命司禄司危司非/命禄危非 等）；
  d) 28 宿本身（角宿…参宿）取该宿段落开头句；
  e) 以上皆不中的，取其所属垣/宿段落首句兜底（HOME_SECTION 指定归属），并列入报告。

依赖：opencc-python-reimplemented（仅用于繁→简对齐检索；引文本身保持繁体原文不改写）。
运行：data/.venv/Scripts/python data/build_poem.py
"""
import json
import os
import re
import sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "poem", "butian'ge_src.txt")
ASTERISMS = os.path.join(ROOT, "web", "public", "data", "asterisms.json")
OUT = os.path.join(ROOT, "web", "public", "data", "poem.json")

try:
    from opencc import OpenCC
except ImportError:
    sys.exit("缺少依赖 opencc-python-reimplemented：data/.venv/Scripts/pip install opencc-python-reimplemented")

_T2S = OpenCC("t2s")


def simp(s: str) -> str:
    return _T2S.convert(s)


# ---------------------------------------------------------------- 原文解析

class Section:
    def __init__(self, group: str, title: str, text: str):
        self.group = group          # 三垣 / 東方蒼龍 …（繁体）
        self.title = title          # 紫微宮 / 角宿 …（繁体）
        self.text = text            # 整段繁体原文
        # 句读：按 。？ 切分并保留句尾标点
        self.sentences = [s + d for s, d in zip(
            re.split(r"[。？]", text), re.findall(r"[。？]", text)) if s]
        self.sentences_simp = [simp(s) for s in self.sentences]
        self.text_simp = simp(text)

    @property
    def title_simp(self) -> str:
        return simp(self.title)

    @property
    def label_simp(self) -> str:
        return f"{simp(self.group)} · {simp(self.title)}"


def load_sections(path: str) -> list:
    sections = []
    cur_group = cur_title = None
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            m = re.match(r"^##\s*(.+?)\s*·\s*(.+?)\s*$", line)
            if m:
                cur_group, cur_title = m.group(1), m.group(2)
                continue
            if line.startswith("#"):
                continue
            assert cur_title, f"诗句出现在章节标题之前: {line[:24]}"
            sections.append(Section(cur_group, cur_title, line))
    assert len(sections) == 31, f"章节数应为 31（三垣+二十八宿），实得 {len(sections)}"
    return sections


# ---------------------------------------------------------------- 匹配表

# 后缀提示 → 章节名（简体）。(附华盖)/(附北斗) 的宿主星官在紫微宫段落。
HINT_SECTION = {
    "太微垣": "太微宫", "紫微垣": "紫微宫",
    "华盖": "紫微宫", "北斗": "紫微宫",
}

# 归属章节表：a) 单字名/易歧义名——全诗多处出现或作为子串易误配，锁定所属段落；
# b) 诗中未被点名的星官（近南极诸星等）——兜底段落。
HOME_SECTION = {
    # 单字名锁定
    "策": "奎宿", "斗": "天市宫", "狗": "斗宿", "龟": "尾宿", "衡": "角宿",
    "糠": "箕宿", "哭": "虚宿", "鳖": "斗宿", "平": "角宿", "泣": "虚宿",
    "人": "危宿", "日": "房宿", "屎": "参宿", "孙": "井宿", "月": "昴宿",
    "宗": "天市宫", "建": "斗宿", "屏": "参宿", "势": "紫微宫", "罚": "房宿",
    "臼": "危宿",
    # 多字但跨段出现，需锁定正确段落
    "织女": "牛宿",      # 天市宫「此坐还依织女傍」先于牛宿「鼓上三星号织女」
    "丈人": "井宿",      # 斗宿「农家丈人斗下眠」先于井宿「孙子丈人市下列」
    "南门": "角宿",      # 紫微宫「左枢右枢夹南门」/奎宿军南门 先于角宿
    "土公": "壁宿",      # 室宿「电傍两黑土公吏」先于壁宿「土公两黑壁上藏」
    "太子": "紫微宫",    # 太微宫亦有「幸臣太子并从官」
    "五帝内座": "紫微宫",  # 太微宫亦有「五帝内座于中正」
    # 近南极诸星（《步天歌》成书时未入歌）与各散官的兜底归属
    "三师": "紫微宫",
    "飞鱼": "井宿", "海山": "井宿", "海石": "井宿", "南船": "井宿", "金鱼": "井宿",
    "火鸟": "参宿", "水委": "毕宿", "蛇腹": "毕宿", "蛇首": "毕宿", "蛇尾": "毕宿",
    "附白": "毕宿", "夹白": "毕宿",
    "三角形": "角宿", "十字架": "角宿", "蜜蜂": "角宿",
    "马腹": "氐宿", "马尾": "氐宿",
    "鹤": "室宿",
    "孔雀": "翼宿", "异雀": "翼宿", "波斯": "翼宿", "鸟喙": "翼宿",
    "小斗": "柳宿",
}

# 别名表：星官名（简体，带后缀者用全名）→ (诗中检索词(简体), 章节(简体))
# 均为诗中实有语词，引文照录原文，不改写。
ALIASES = {
    # 三垣
    "紫微左垣": ("东藩左枢", "紫微宫"),   # 东藩左枢连上宰，少宰上辅次少辅…
    "紫微右垣": ("西藩右枢", "紫微宫"),   # 西藩右枢次少尉，上辅少辅四相视…
    "太微左垣": ("两面宫垣", "太微宫"),   # 两面宫垣十星布，左右执法是其数
    "太微右垣": ("两面宫垣", "太微宫"),
    "天市左垣": ("魏赵九河", "天市宫"),   # 魏赵九河与中山，齐越吴徐东海间，燕连南海尽属宋
    "天市右垣": ("河中河间", "天市宫"),   # 河中河间晋郑周，秦连巴蜀细搜求…梁楚韩邦在尽头
    "天皇大帝": ("天皇", "紫微宫"),       # 天皇独在勾陈里
    "太阳守": ("太阳之守", "紫微宫"),
    "相": ("宰相", "紫微宫"),             # 一个宰相太阳侧
    "五帝座": ("五帝内座", "太微宫"),     # 太微之五帝座（紫微宫另有五帝内座）
    "内屏": ("轩屏", "太微宫"),           # 四个门西主轩屏
    "五诸侯(太微垣)": ("诸侯", "太微宫"),  # 五黑诸侯卿后行
    # 东方
    "左摄提": ("左右摄提", "亢宿"),
    "右摄提": ("左右摄提", "亢宿"),
    "东咸": ("两咸", "房宿"),             # 两咸夹罚似房状
    "西咸": ("两咸", "房宿"),
    "骑阵将军": ("将军阵", "氐宿"),       # 将军阵里振威霜
    # 北方
    "农丈人": ("农家丈人", "斗宿"),
    "十二国": ("十二诸侯", "女宿"),       # 十二诸侯在下陈（下文历数十二国）
    "司命": ("命禄危非", "虚宿"), "司禄": ("命禄危非", "虚宿"),
    "司危": ("命禄危非", "虚宿"), "司非": ("命禄危非", "虚宿"),
    "天垒城": ("天垒", "虚宿"),
    "北落师门": ("北落门", "室宿"),
    "螣蛇": ("腾蛇", "室宿"),             # 螣/腾 异体
    "天厩": ("天鴌", "壁宿"),             # 底本作「天鴌」（他本多作天厩）
    # 西方
    "土司空": ("司空右畔", "奎宿"),       # 司空右畔土之精
    "天大将军": ("将军侯", "娄宿"),       # 娄上十一将军侯
    "天阿": ("阿西月东", "昴宿"),         # 阿西月东各一星
    "刍藁": ("刍蒿", "昴宿"),             # 底本作芻蒿
    "九州殊口": ("九州城", "毕宿"),       # 节下团圆九州城
    # 南方
    "弧矢": ("弧弓", "井宿"),             # 左畔九个弯弧弓，一矢拟射顽狼胸
    "天狼": ("一狼", "井宿"),             # 邱下一狼光蓬茸
    "酒旗": ("号为酒", "柳宿"),           # 近上三星号为酒
    "青丘": ("青邱", "轸宿"),             # 底本作青邱
    "天记": ("天纪", "鬼宿"),             # 社东一星名天纪（底本作紀；天市垣另有天纪）
    "平": ("平星", "角宿"),               # 角下天门左平星（防误中「平道」）
    "辅(附北斗)": ("辅星", "紫微宫"),      # 辅星近着开阳淡（防误中「四辅」）
}

LODGE_TITLES = {f"{n}宿" for n in
                "角亢氐房心尾箕斗牛女虚危室壁奎娄胃昴毕觜参井鬼柳星张翼轸"}

SUFFIX_RE = re.compile(r"^(.+?)[(（]附?([^)（）]+)[)）]$")


# ---------------------------------------------------------------- 构建

def build():
    sections = load_sections(SRC)
    by_title = {s.title_simp: s for s in sections}
    asterisms = json.load(open(ASTERISMS, encoding="utf-8"))["asterisms"]

    def find_sentence(name_simp: str, prefer: list) -> tuple:
        """在 prefer 章节（按序）中找含 name_simp 的句子，返回 (Section, 句序号) 或 None。"""
        for sec in prefer:
            for i, sent in enumerate(sec.sentences_simp):
                if name_simp in sent:
                    return sec, i
        return None

    poem = {}
    records = []  # (name, kind, section_label, quote)
    for a in asterisms:
        name = a["name"]
        m = SUFFIX_RE.match(name)
        base, hint = (m.group(1), m.group(2)) if m else (name, None)
        # 章节检索优先序：后缀提示 → 归属表；有优先章节时精确匹配只在其内进行
        # （后缀/归属已指明是哪一个星官，再去全诗检索只会误配同名者）
        prefer = []
        if hint:
            sec = by_title.get(HINT_SECTION.get(hint, hint))
            if sec:
                prefer.append(sec)
        home_title = HOME_SECTION.get(name) or HOME_SECTION.get(base)
        if home_title and home_title in by_title:
            sec = by_title[home_title]
            if sec not in prefer:
                prefer.append(sec)

        kind = quote = label = None
        # 规则 d：28 宿本身取本段首句
        if name in LODGE_TITLES and name in by_title:
            sec = by_title[name]
            kind, quote, label = "lodge", sec.sentences[0], sec.label_simp
        # 规则 c：别名表（全名优先，base 次之）——人工校订，优先于子串精确匹配
        if quote is None:
            for key in (name, base):
                if key in ALIASES:
                    term, sec_title = ALIASES[key]
                    sec = by_title[sec_title]
                    hit = find_sentence(term, [sec])
                    assert hit, f"别名表失效: {key} -> {term} @ {sec_title}"
                    kind, quote, label = "alias", sec.sentences[hit[1]], sec.label_simp
                    break
        # 规则 a/b：精确命中（去后缀后的 base）
        if quote is None:
            hit = find_sentence(simp(base), prefer if prefer else sections)
            if hit:
                sec, i = hit
                kind, quote, label = "exact", sec.sentences[i], sec.label_simp
        # 规则 e：兜底（所属段落首句）
        if quote is None:
            assert home_title and home_title in by_title, \
                f"{name} 未命中且无兜底归属，请补 HOME_SECTION"
            sec = by_title[home_title]
            kind, quote, label = "fallback", sec.sentences[0], sec.label_simp

        poem[name] = {"text": quote, "from": label}
        records.append((name, kind, label, quote))
    return poem, records


# ---------------------------------------------------------------- 校验与报告

def validate(poem: dict, records: list) -> Counter:
    asterisms = json.load(open(ASTERISMS, encoding="utf-8"))["asterisms"]
    names = [a["name"] for a in asterisms]

    # 1) 全覆盖：309 星官一一对应
    assert len(names) == 309, f"星官数异常: {len(names)}"
    assert set(poem) == set(names), "poem.json 键集与 asterisms.json 不一致"

    # 2) text 非空、不含占位语
    for n in names:
        e = poem[n]
        assert e["text"].strip(), f"{n} text 为空"
        assert e["from"].strip(), f"{n} from 为空"
        for bad in ("待辑", "占位", "俟考"):
            assert bad not in e["text"], f"{n} text 含占位语: {bad}"

    # 3) 精确（含 28 宿首句规则）+ 别名命中率 ≥ 85%
    kinds = Counter(r[1] for r in records)
    hit = kinds["exact"] + kinds["lodge"] + kinds["alias"]
    rate = hit / len(names)
    assert rate >= 0.85, f"精确+别名命中率不足: {rate:.1%} < 85%"
    return kinds


def main():
    poem, records = build()

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(poem, f, ensure_ascii=False, separators=(",", ":"))

    kinds = validate(poem, records)

    total = len(records)
    hit = kinds["exact"] + kinds["lodge"] + kinds["alias"]
    print(f"== poem.json 构建完成: {OUT}")
    print(f"总数 {total} | 精确 {kinds['exact']}（其中 28 宿首句 {kinds['lodge']}）"
          f" | 别名 {kinds['alias']} | 兜底 {kinds['fallback']}"
          f" | 精确+别名命中率 {hit / total:.1%}（≥85% 达标）")
    print("\n-- 兜底清单（用所属段落首句）--")
    for name, kind, label, quote in records:
        if kind == "fallback":
            print(f"  {name}  <-  {label}")
    print("\n-- 别名命中清单 --")
    for name, kind, label, quote in records:
        if kind == "alias":
            print(f"  {name}  <-  {label}")
    print("\nALL POEM TESTS PASSED")


if __name__ == "__main__":
    main()
