import type { SkyLayout } from "../starfield/renderer";

/** 叙事分组：滚动点亮顺序即讲解顺序。 */
export interface RevealGroup {
  key: string;
  title: string;
  desc: string;
  names: string[]; // 星官名（用于在 layout 中反查索引）
}

export const REVEAL_GROUPS: RevealGroup[] = [
  {
    key: "ziwei",
    title: "紫微垣 · 众星拱北",
    desc: "以北极为中心的天廷，天帝与后妃、文武百官皆列于此。古人相信：天的秩序，就是人的秩序。",
    names: ["紫微左垣", "紫微右垣", "北极", "勾陈", "北斗", "辅(附北斗)", "三公(紫微垣)", "天棓"],
  },
  {
    key: "taiwei",
    title: "太微垣 · 天子的朝堂",
    desc: "五帝座居中，将相、诸侯、郎官环列——一座悬在夜空南边的金銮殿。",
    names: ["太微左垣", "太微右垣", "五帝座", "三公(太微垣)", "五诸侯(太微垣)", "从官(太微垣)"],
  },
  {
    key: "tianshi",
    title: "天市垣 · 天上的市集",
    desc: "列肆、车肆、市楼、度量衡俱全。天上的集市如此热闹，人间的烟火才有模样。",
    names: ["天市左垣", "天市右垣", "市楼", "列肆", "车肆", "斛", "斗"],
  },
  {
    key: "east",
    title: "东方青龙 · 春之七宿",
    desc: "角亢氐房心尾箕。苍龙七宿春日东升，龙角初露，便是春耕的信号。",
    names: ["角宿", "亢宿", "氐宿", "房宿", "心宿", "尾宿", "箕宿"],
  },
  {
    key: "north",
    title: "北方玄武 · 冬之七宿",
    desc: "斗牛女虚危室壁。龟蛇相守的北宫，藏着牛郎织女隔河相望的千年心事。",
    names: ["斗宿", "牛宿", "女宿", "虚宿", "危宿", "室宿", "壁宿"],
  },
  {
    key: "west",
    title: "西方白虎 · 秋之七宿",
    desc: "奎娄胃昴毕觜参。白虎踞西，参宿三星是冬夜最容易辨认的路标。",
    names: ["奎宿", "娄宿", "胃宿", "昴宿", "毕宿", "觜宿", "参宿"],
  },
  {
    key: "south",
    title: "南方朱雀 · 夏之七宿",
    desc: "井鬼柳星张翼轸。朱雀展翅于夏夜南天，星宿一颗，曾是多少旅人的方向。",
    names: ["井宿", "鬼宿", "柳宿", "星宿", "张宿", "翼宿", "轸宿"],
  },
];

/** 由星官名反查 layout 索引；未收录的名（数据差异）静默跳过。 */
export function resolveGroups(layout: SkyLayout): { group: RevealGroup; indices: number[] }[] {
  return REVEAL_GROUPS.map((group) => ({
    group,
    indices: group.names
      .map((n) => layout.nameIndex.get(n))
      .filter((i): i is number => i !== undefined),
  }));
}
