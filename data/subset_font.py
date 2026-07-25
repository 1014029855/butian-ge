"""
字体子集化：为「步天歌」站点生成 Noto Serif SC（思源宋体）woff2 子集。

输入（需先手动下载，见文件尾「准备步骤」）：
    data/font_src/NotoSerifSC-Regular.otf
    data/font_src/NotoSerifSC-Bold.otf
    data/font_src/OFL.txt            （SIL OFL 1.1 全文，随子集再分发）

输出：
    web/public/fonts/NotoSerifSC-Regular.woff2
    web/public/fonts/NotoSerifSC-Bold.woff2
    web/public/fonts/OFL.txt

字符集收集逻辑（去重后的并集）：
    1. web/public/data/{asterisms,stars,western}.json 全文 —— 全部星官/星名用字；
    2. web/src/app/copy.ts 全文 —— 全站正式文案（章节眉题/标题/正文/印章/致谢）；
    3. web/index.html 全文 —— 标题与降级页文案；
    4. web/src/app/**/*.ts（排除 *.test.ts）全文 —— 章节模块硬编码 UI 串
       （如「向下滚动 · 步入夜空」「诊断信息：」等）。注释字一并收入，
       是安全超集，单个汉字 glyph 成本极低；
    5. ASCII 可见字符（0x20–0x7E）；
    6. 常用中文标点与符号（「」《》——·…，。等）及正文用到的希腊字母 α/β。

用法（仓库根目录或 data/ 下执行均可）：
    python subset_font.py

依赖：fonttools、brotli（建议 venv：python -m venv .venv && .venv/Scripts/pip install fonttools brotli）

准备步骤（一次性，网络下载）：
    curl -L -o data/font_src/NotoSerifSC-Regular.otf \\
        https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/SubsetOTF/SC/NotoSerifSC-Regular.otf
    curl -L -o data/font_src/NotoSerifSC-Bold.otf \\
        https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/SubsetOTF/SC/NotoSerifSC-Bold.otf
    curl -L -o data/font_src/OFL.txt \\
        https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/LICENSE
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
FONT_SRC = DATA_DIR / "font_src"
OUT_DIR = ROOT / "web" / "public" / "fonts"
CHARSET_FILE = FONT_SRC / "charset.txt"

WEIGHTS = {
    "Regular": FONT_SRC / "NotoSerifSC-Regular.otf",
    "Bold": FONT_SRC / "NotoSerifSC-Bold.otf",
}

# 常用中文标点 / 符号 / 正文希腊字母（copy.ts 含「小熊座β」「大犬座 α」）
EXTRA_CHARS = (
    "，。、；：？！“”‘’（）《》〈〉「」『』【】〔〕—…·～"
    "％℃°′″×÷±≈≤≥→←↑↓"
    "零一二三四五六七八九十百千万亿两〇"
    "αβ"
)


def collect_charset() -> str:
    chars: set[str] = set()

    # 1. 星表 JSON：全文扫描（键名为 ASCII，净增量即全部中文名用字）
    for name in ("asterisms.json", "stars.json", "western.json"):
        p = ROOT / "web" / "public" / "data" / name
        chars.update(p.read_text(encoding="utf-8"))

    # 2. 正式文案 + 3. index.html
    chars.update((ROOT / "web" / "src" / "app" / "copy.ts").read_text(encoding="utf-8"))
    chars.update((ROOT / "web" / "index.html").read_text(encoding="utf-8"))

    # 4. 章节模块与 app 层源码（排除测试），覆盖硬编码 UI 串
    for p in sorted((ROOT / "web" / "src" / "app").rglob("*.ts")):
        if p.name.endswith(".test.ts"):
            continue
        chars.update(p.read_text(encoding="utf-8"))

    # 5. ASCII 可见字符
    chars.update(chr(c) for c in range(0x20, 0x7F))

    # 6. 标点与补充字符
    chars.update(EXTRA_CHARS)

    # 控制字符（换行/制表等）无需进字体
    return "".join(sorted(c for c in chars if not c.isspace() and ord(c) >= 0x20))


def subset_one(weight: str, src: Path, charset_file: Path) -> Path:
    out = OUT_DIR / f"NotoSerifSC-{weight}.woff2"
    cmd = [
        sys.executable, "-m", "fontTools.subset",
        str(src),
        f"--text-file={charset_file}",
        "--flavor=woff2",
        f"--output-file={out}",
        # CJK 展示场景放弃提示信息换体积；CFF 反子程序化进一步压缩
        "--no-hinting",
        "--desubroutinize",
        # 保留全部排版特性与字体的 name 记录（含许可信息，OFL 再分发更稳妥）
        "--layout-features=*",
        "--name-IDs=*",
        "--name-legacy",
        "--name-languages=*",
    ]
    print(f"[subset] {src.name} -> {out.relative_to(ROOT)}")
    subprocess.run(cmd, check=True)
    return out


def main() -> None:
    for w, src in WEIGHTS.items():
        if not src.exists():
            sys.exit(f"缺少源字体：{src}（见脚本 docstring 的下载步骤）")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    charset = collect_charset()
    CHARSET_FILE.write_text(charset, encoding="utf-8")
    han = sum(1 for c in charset if "一" <= c <= "鿿")
    print(f"[charset] 去重后 {len(charset)} 字符（其中 CJK 汉字 {han}），已写入 {CHARSET_FILE.relative_to(ROOT)}")

    # 快速自检：星官名是否全覆盖
    asterisms = json.loads((ROOT / "web" / "public" / "data" / "asterisms.json").read_text(encoding="utf-8"))
    names = "".join(a["name"] for a in asterisms["asterisms"])
    missing = sorted({c for c in names if c not in charset})
    print(f"[check] {len(asterisms['asterisms'])} 个星官名用字缺失：{missing if missing else '无'}")

    for w, src in WEIGHTS.items():
        out = subset_one(w, src, CHARSET_FILE)
        print(f"[done] {out.name}: {out.stat().st_size / 1024:.0f} KB")

    ofl_src = FONT_SRC / "OFL.txt"
    if ofl_src.exists():
        (OUT_DIR / "OFL.txt").write_bytes(ofl_src.read_bytes())
        print("[done] OFL.txt 已拷入 web/public/fonts/")
    else:
        print("[warn] 未找到 data/font_src/OFL.txt，请补拷许可文件")


if __name__ == "__main__":
    main()
