# 数据来源与许可

本目录管线产出 `web/public/data/stars.json`、`web/public/data/asterisms.json` 与 `web/public/data/western.json`（88 个西方星座连线，数据来源同 HYG/Stellarium，供东西对比章使用）。

## 数据源

1. **HYG Database v4.4**（astronexus/hyg，Codeberg）
   - 内容：Hipparcos / Yale Bright Star / Gliese 三星表合编，含 HIP 编号、赤经赤纬、星等
   - 许可：**CC BY-SA-4.0**，须署名 "HYG Database, astronexus.com"
   - 获取：`https://codeberg.org/astronexus/hyg/media/branch/main/data/hyg/CURRENT/hyg_v44.csv.gz`

2. **Stellarium 中国星空文化数据**（Stellarium/stellarium, `skycultures/chinese/`）
   - 内容：312 星官的连线（HIP 编号折线）、中文星官名、中文星名
   - 许可：随 Stellarium 项目发布（GPL 项目的数据文件），须署名 "Stellarium 项目中国星空文化数据"
   - 获取：经 jsDelivr 镜像 `https://cdn.jsdelivr.net/gh/Stellarium/stellarium@master/skycultures/chinese/`

## 署名义务

M3 里程碑的"尾声/数据来源"页面必须同时给出以上两处署名，并附 HYG 的 CC BY-SA-4.0 许可链接。

## 重新生成

```bash
python data/build_data.py    # 下载缓存于 data/raw/，幂等
python data/test_build_data.py
```
