/**
 * 全站文案（正式版）。
 *
 * 导出契约（章节模块只按此形状消费，不得依赖具体文案文本）：
 *   - COPY：导出名固定，key 固定为 "ch1" ~ "ch8"，
 *     每条结构固定为 ChapterCopy（见下），经 ChapterCtx.copy 注入章节模块；
 *   - CH2_QUESTS：ch2「寻星令」游戏段题库（一局 10 题三种题型混合，见文件下方注释）；
 *   - CH4_STOPS：ch4「走进紫微垣」五站巡游的站点表（见文件下方注释）；
 *   - CREDITS：ch8 致谢页用，形状 { heading, groups: [{ title, lines[] }] }。
 * 修改文案时保持上述形状不变。
 */

export interface ChapterCopy {
  /** 眉题（宽字距小字，格式：「其X · 中文主题 ENGLISH THEME」） */
  eyebrow: string;
  /** 章节标题 */
  title: string;
  /** 引子句（标题下第一句，叙事钩子，一句为限） */
  hook: string;
  /** 正文段落（每元素一段，至多三段，每段一两句） */
  body: string[];
  /** 朱砂印单字；缺省不显示印章 */
  seal?: string;
}

export const COPY: Record<string, ChapterCopy> = {
  ch1: {
    eyebrow: "其壹 · 序 PROLOGUE",
    title: "步天歌",
    hook: "三千年前，中国人开始给星星命名。",
    body: [
      "先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。",
      "《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。",
      "向下滚动，步入夜空。",
    ],
    seal: "步",
  },
  ch2: {
    eyebrow: "其贰 · 星野漫游 THE ATLAS",
    title: "星野漫游",
    hook: "循着一首千年前的歌，把星星一颗颗认出来。",
    // 三段正文各有专职（ch2.ts 按序消费）：
    //   body[0] 段1 旁白引出句（标题面板，星空尚未点亮时显示）；
    //   body[1] 段1 结尾点题句（三垣四象齐亮时显示）；
    //   body[2] 段3 自由探索引导句（「现在，把星空交给你」面板正文）。
    body: [
      "古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。",
      "三垣居中，四象环列——中国人给天空立的法。",
      "拖拽环视，点击任意一颗星，看看它属于哪一位星官。",
    ],
    seal: "野",
  },
  ch3: {
    eyebrow: "其叁 · 观象授时 THE GNOMON",
    title: "观象授时",
    hook: "一根八尺之表，一条量影之圭，就是一个王朝的天文台。",
    body: [
      "正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。",
      "河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。",
      "所谓观象授时：历法的权威，来自对天空的测量。",
    ],
    seal: "表",
  },
  ch4: {
    eyebrow: "其肆 · 天人之间 THE POLE STAR",
    title: "天人之间",
    hook: "全天最尊贵的星域，围着北极建了一座城。",
    // body[0] 开场「城外远望」面板的引出补充（五站故事见 CH4_STOPS）；
    // body[1] 收尾呼应，同面板展示。
    body: [
      "紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。",
      "天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。",
    ],
    seal: "极",
  },
  ch5: {
    eyebrow: "其伍 · 天球仪 THE CELESTIAL SPHERE",
    title: "天球仪",
    hook: "「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",
    body: [
      "东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。",
      "在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。",
    ],
    seal: "球",
  },
  ch6: {
    eyebrow: "其陆 · 岁差 PRECESSION",
    title: "一万年",
    hook: "地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",
    body: [
      "东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。",
      "于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。",
      "拖动时间，看天极在星空中缓缓画出一个圆。",
    ],
    seal: "岁",
  },
  ch7: {
    eyebrow: "其柒 · 东西对话 EAST MEETS WEST",
    title: "东西对话",
    hook: "同一片星空，两种秩序各自连线。",
    body: [
      "中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。",
      "中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。",
      "北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。",
    ],
    seal: "会",
  },
  ch8: {
    eyebrow: "其捌 · 尾声 CREDITS",
    title: "尾声",
    hook: "缘起于一首旧诗，收束于一页致谢。",
    body: [
      "本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。",
      "数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。",
    ],
    seal: "跋",
  },
};

/**
 * ch2「寻星令」游戏段题库（供 chapters/ch2.ts 消费）。
 *
 * 一局 10 题、三种题型混合（寻星 4 · 闪现 3 · 四选一 3），ch2 每局开局
 * 洗牌重排（题型配比不变）。target 均为 asterisms.json 实际星官键名，
 * 已逐一核对；闪现与选择题目标从 309 星官里挑辨识度高的亮星/名官。
 *
 * 每题字段：
 *   - key：题目 id 兼展示名（段3 回顾行列出的就是它）；
 *   - type：题型——
 *       seek   寻星：按提示在天空中找到目标星官并点击；
 *       flash  闪现：目标高亮 1.5s 后熄灭，凭记忆点回；
 *       choice 四选一：卡面给星官名，四个选项文本（诗句/描述混搭）点正确项；
 *   - target：asterisms.json 的星官键名——拾取判定（PickPayload.info.name）
 *     与点亮（setGroupProgress）都以此为准；
 *   - hint：题目卡提示语（flash 题型强调「只看一瞬」，choice 题型为设问句）；
 *   - plain：答对后的一句白话释义；
 *   - options / answer：仅 choice 题型——四个选项文本与正确项下标；
 *     选项中的诗句为《步天歌》繁体原文摘句（与 poem.json 一致），
 *     干扰项取邻近/易混星官的诗句或描述。
 * 答对后展示的诗句不在此列：ch2 运行时 fetch /data/poem.json，
 * 按 target 查 { text, from }（数据为繁体原文，保持原样引用）。
 */
export type Ch2QuestType = "seek" | "flash" | "choice";

export interface Ch2Quest {
  key: string;
  type: Ch2QuestType;
  target: string;
  hint: string;
  plain: string;
  /** 仅 choice 题型：四个选项文本（诗句/描述混搭） */
  options?: readonly string[];
  /** 仅 choice 题型：正确项在 options 中的下标 */
  answer?: number;
}

export const CH2_QUESTS: readonly Ch2Quest[] = [
  {
    key: "北斗",
    type: "seek",
    target: "北斗",
    hint: "找到那把勺子——七颗星连成的斗，就挂在北天。",
    plain: "北斗七星：天帝的车驾，斗柄所指，即是四方与四时。",
  },
  {
    key: "天狼",
    type: "seek",
    target: "天狼",
    hint: "找到全天最亮的星——南方低空，耀眼夺目的那一颗。",
    plain: "天狼是全天第一亮星，在井宿之野独坐，古人以它主侵掠。",
  },
  {
    key: "勾陈",
    type: "flash",
    target: "勾陈",
    hint: "只看一瞬——记住紫微垣中、今夜北极星所在的那一组，它随即隐去。",
    plain: "勾陈六星形如钩，勾陈一就是当代北极星。",
  },
  {
    key: "北极",
    type: "choice",
    target: "北极",
    hint: "「北极」——四句之中，哪一句说的是它？",
    options: [
      "「中元北極紫微宮，北極五星在其中」",
      "「北斗之宿七星明，第一主帝名樞精」",
      "帝之后妃的车驾，形如弯钩，其最亮的一颗是今夜北极星。",
      "天帝的车驾：斗柄所指，即是四方与四时。",
    ],
    answer: 0,
    plain: "北极五星：太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",
  },
  {
    key: "织女",
    type: "seek",
    target: "织女",
    hint: "找到织女——银河西岸，与牵牛隔河相望的亮星。",
    plain: "织女三星，七夕故事的主角，一万年后将继任北极星。",
  },
  {
    key: "河鼓",
    type: "flash",
    target: "河鼓",
    hint: "只看一瞬——记住银河东岸的牵牛三星，它随即隐去。",
    plain: "河鼓三星即牵牛，与织女隔河相望，七夕的故事由此而来。",
  },
  {
    key: "昴宿",
    type: "choice",
    target: "昴宿",
    hint: "「昴宿」——四句之中，哪一句说的是它？",
    options: [
      "「牛上直建三河鼓，鼓上三星號織女」",
      "「七星一聚實不少，阿西月東各一星」",
      "「三星中央色最深，下有積卒共十二」",
      "银河西岸的亮星官，七夕故事的主角。",
    ],
    answer: 1,
    plain: "昴宿七星聚作一团，即西方白虎的昴星团，民间呼为七姊妹。",
  },
  {
    key: "心宿",
    type: "seek",
    target: "心宿",
    hint: "找到苍龙之心——东方三星相依，中央那颗最红，名叫大火。",
    plain: "心宿三星：中央「大火」色最红，古人观大火以候寒暑。",
  },
  {
    key: "北落师门",
    type: "flash",
    target: "北落师门",
    hint: "只看一瞬——记住南方孤悬的那颗亮星，它随即隐去。",
    plain: "北落师门：羽林军南门外独守的亮星，秋夜南天最醒目的一颗。",
  },
  {
    key: "老人",
    type: "choice",
    target: "老人",
    hint: "「老人」——四句之中，哪一句说的是它？",
    options: [
      "「左畔九個彎弧弓，一矢擬射頑狼胸」",
      "「邱下一狼光蓬茸」",
      "羽林军南门之外，一颗独守的亮星。",
      "「有個老人南極中，春秋出入壽無窮」",
    ],
    answer: 3,
    plain: "老人星：南极仙翁，南天第二亮星，古人以它主寿安。",
  },
];

/**
 * ch4「走进紫微垣」五站巡游站点表（供 chapters/ch4.ts 消费，按巡游顺序）。
 *
 * 每站字段：
 *   - key：站点 id（兼作站名短称）；
 *   - groups：本站生长点亮的星官组（asterisms.json 星官名，setGroupProgress
 *     以此为准）；空数组表示本站不新点星官（第五站「拱北」即如此）；
 *   - title：站名（站点卡标题）；
 *   - story：一句故事（站点卡正文，一句为限）；
 *   - labels：贴星标签（仅站 1/2/3/4 需要）——text 为展示名，star 为
 *     stars.json 的星名，用于在该站 groups 的成员星里匹配锚点；
 *     缺名匹配不到时由 ch4 按成员数据顺序兜底。
 * 相机参数（质心/半径/FOV）不在此列：质心由数据推算后硬编码在 ch4.ts。
 */
export interface Ch4Stop {
  key: string;
  groups: string[];
  title: string;
  story: string;
  labels?: { text: string; star?: string }[];
}

export const CH4_STOPS: readonly Ch4Stop[] = [
  {
    key: "北极",
    groups: ["北极"],
    title: "北极五星 · 皇族",
    story: "太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",
    // 北极五星的传统序：一曰太子、二曰帝、三曰庶子、四曰后宫、五曰天枢
    labels: [
      { text: "太子", star: "北极一" },
      { text: "帝", star: "北极二" },
      { text: "庶子", star: "北极三" },
      { text: "后宫", star: "北极四" },
      { text: "天枢", star: "北极五" },
    ],
  },
  {
    key: "勾陈",
    groups: ["勾陈"],
    title: "勾陈 · 后宫车马",
    story: "帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",
    labels: [{ text: "勾陈一", star: "勾陈一" }],
  },
  {
    key: "帝座",
    groups: ["天皇大帝", "五帝内座"],
    title: "天皇大帝 · 帝座",
    story: "天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",
    labels: [{ text: "天皇大帝", star: "天皇大帝" }],
  },
  {
    key: "百官",
    groups: ["尚书", "大理", "天柱"],
    title: "尚书 · 大理 · 天柱",
    story: "秘书、法官、政令——一座悬浮的朝廷。",
    labels: [
      { text: "尚书", star: "尚书一" },
      { text: "大理", star: "大理一" },
      { text: "天柱", star: "天柱一" },
    ],
  },
  {
    key: "拱北",
    groups: [],
    title: "回望 · 众星拱北",
    story: "「譬如北辰，居其所而众星共之。」——《论语·为政》",
  },
];

/**
 * ch8 致谢区内容：标题 + 三组（数据来源 / 开源技术 / 制作说明）。
 * 每组 lines 逐行渲染；纯文本，链接以明文 URL 给出。
 */
export const CREDITS: {
  heading: string;
  groups: { title: string; lines: string[] }[];
} = {
  heading: "数据与出处",
  groups: [
    {
      title: "数据来源",
      lines: [
        "HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com",
        "许可协议：https://creativecommons.org/licenses/by-sa/4.0/",
        "Stellarium 项目 · 中国星空文化数据",
        "《步天歌》 · 丹元子 · 公有领域文本",
      ],
    },
    {
      title: "开源技术",
      lines: [
        "three.js",
        "GSAP / ScrollTrigger",
        "Vite",
        "TypeScript",
        "Noto Serif SC（思源宋体）· SIL OFL 1.1",
      ],
    },
    {
      title: "制作说明",
      lines: ["AI 辅助设计与编码", "全部内容经人工校订"],
    },
  ],
};
