/**
 * 题库配置 — 每题两个选项，选中后为对应维度各 +1 分
 */
export const QUESTIONS = [
  {
    id: 1,
    question: "开局信息很少时，你通常更倾向：",
    options: [
      {
        key: "A",
        text: "先听几轮发言，再慢慢判断",
        scores: ["Reserved", "Logic"],
      },
      {
        key: "B",
        text: "先抛一个观点，看大家的反应",
        scores: ["Active", "Lead"],
      },
    ],
  },
  {
    id: 2,
    question: "你怀疑某人有问题时，最主要依据是：",
    options: [
      { key: "A", text: "他说的话前后不一致", scores: ["Logic"] },
      { key: "B", text: "他给人的感觉不太对", scores: ["Intuition"] },
    ],
  },
  {
    id: 3,
    question: "如果场上局势越来越乱，你更容易：",
    options: [
      {
        key: "A",
        text: "主动出来梳理局面",
        scores: ["Lead", "Active"],
      },
      {
        key: "B",
        text: "先观察谁在混水摸鱼",
        scores: ["Reserved", "Hidden"],
      },
    ],
  },
  {
    id: 4,
    question: "你更认同哪种打法：",
    options: [
      { key: "A", text: "立场尽量说清楚，让队友能跟上", scores: ["Direct"] },
      { key: "B", text: "适当藏一点，别让别人太早看透", scores: ["Hidden"] },
    ],
  },
  {
    id: 5,
    question: "在团队里，你更像：",
    options: [
      { key: "A", text: "推动大家做决定的人", scores: ["Lead"] },
      { key: "B", text: "提醒大家别犯错的人", scores: ["Support"] },
    ],
  },
  {
    id: 6,
    question: "你觉得自己在阿瓦隆里最强的是：",
    options: [
      { key: "A", text: "看发言逻辑和站位关系", scores: ["Logic"] },
      { key: "B", text: "看人和场上的气氛变化", scores: ["Intuition"] },
    ],
  },
  {
    id: 7,
    question: "当你有一个七八成把握的判断时，你会：",
    options: [
      {
        key: "A",
        text: "直接说出来，推动大家验证",
        scores: ["Direct", "Active"],
      },
      {
        key: "B",
        text: "先留着，看后面信息会不会印证",
        scores: ["Hidden", "Reserved"],
      },
    ],
  },
  {
    id: 8,
    question: "如果你发现一个人一直在带偏节奏，你通常会：",
    options: [
      {
        key: "A",
        text: "直接点他，逼他回应",
        scores: ["Active", "Direct"],
      },
      {
        key: "B",
        text: "先记下来，等更关键的时候再处理",
        scores: ["Reserved", "Hidden"],
      },
    ],
  },
  {
    id: 9,
    question: "你更希望别人怎么评价你的游戏风格：",
    options: [
      {
        key: "A",
        text: "稳、准、靠谱",
        scores: ["Support", "Logic"],
      },
      {
        key: "B",
        text: "狠、快、看不透",
        scores: ["Active", "Hidden"],
      },
    ],
  },
  {
    id: 10,
    question: "临近关键回合时，你通常会：",
    options: [
      {
        key: "A",
        text: "更谨慎，避免给错信息",
        scores: ["Reserved", "Support"],
      },
      {
        key: "B",
        text: "更果断，抓住机会定局",
        scores: ["Lead", "Active"],
      },
    ],
  },
  {
    id: 11,
    question: "如果你要选择一种局内存在感，你会更想要：",
    options: [
      {
        key: "A",
        text: "不一定最显眼，但大家会信我",
        scores: ["Support", "Direct"],
      },
      {
        key: "B",
        text: "我一开口，就能改变场上风向",
        scores: ["Lead", "Active"],
      },
    ],
  },
  {
    id: 12,
    question: "在社交博弈里，你更像：",
    options: [
      {
        key: "A",
        text: "让别人逐渐意识到我说得对",
        scores: ["Direct", "Logic"],
      },
      {
        key: "B",
        text: "让别人不知不觉接受我的判断",
        scores: ["Hidden", "Intuition"],
      },
    ],
  },
];
