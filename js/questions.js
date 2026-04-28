/**
 * 题库：每题四个选项。选中后按 scores 中各维度分值累加。
 * 键名须与 roles.js 中 DIMENSIONS 一致。
 */
export const QUESTIONS = [
  {
    id: 1,
    question: "当你小心翼翼地查看身份牌，映入眼帘的是一个奥伯伦，你最可能会：",
    options: [
      { key: "A", text: "很想绷住，但直接绷不住，嘴角的笑意已经把你出卖。", scores: { Active: 1, Hidden: 2, Intuition: 1 } },
      { key: "B", text: "冷静看牌，构思炸车思路。", scores: { Logic: 3, Hidden: 1 } },
      { key: "C", text: "直接跳派，给队友暗示的同时，搅乱真派视野。", scores: { Lead: 2, Direct: 2, Hidden: 1 } },
      { key: "D", text: "凭场上气氛找机会切入，怎么顺手怎么来。", scores: { Intuition: 3, Active: 1 } },
    ],
  },
  {
    id: 2,
    question: "车长拟定发车，车上全是女生，你最可能会：",
    options: [
      { key: "A", text: "直接追问组队理由，这车为什么这么组。", scores: { Direct: 2, Logic: 2 } },
      { key: "B", text: "先不急着评价，看看其他人会怎么反应。", scores: { Reserved: 2, Hidden: 1, Logic: 1 } },
      { key: "C", text: "顺势接话，把讨论气氛炒热一点。", scores: { Active: 2, Lead: 1, Support: 1 } },
      { key: "D", text: "先看直觉，这车给你的整体感觉像不像能过。", scores: { Intuition: 3, Support: 1 } },
    ],
  },
  {
    id: 3,
    question: "这把你拿到了派西维尔，你的两个拇指位互相认可，要带彼此上车，你最可能会：",
    options: [
      { key: "A", text: "不做明显表态，以免暴露视野，让梅林受到威胁。", scores: { Reserved: 2, Hidden: 2, Support: 1 } },
      { key: "B", text: "强势反对，用其他理由攻击车上开匪。", scores: { Direct: 2, Active: 1, Logic: 2 } },
      { key: "C", text: "点出正确的拇指位信息，让刺客以为你指认的是错误的拇指位，从而刺杀失败。", scores: { Lead: 2, Hidden: 2, Intuition: 1 } },
      { key: "D", text: "更多根据场上感觉决定该不该现在站出来。", scores: { Intuition: 3, Support: 1 } },
    ],
  },
  {
    id: 4,
    question: "这把你拿到了奥伯伦，你成功地混上了第一个三人车，你最可能会：",
    options: [
      { key: "A", text: "先投绿票，万一车上有队友呢？我可不想双炸车。", scores: { Support: 2, Reserved: 1, Hidden: 1 } },
      { key: "B", text: "先投绿票，三人车我从来不炸，四人车我再炸。", scores: { Logic: 2, Hidden: 1, Reserved: 1 } },
      { key: "C", text: "直接炸车，先为红方争取一个轮次。", scores: { Active: 2, Direct: 1, Lead: 1 } },
      { key: "D", text: "根据当前轮次和队伍收益判断这车值不值得投炸。", scores: { Logic: 2, Intuition: 1, Hidden: 1 } },
    ],
  },
  {
    id: 5,
    question: "这把你是梅林，开局看到信息后，你最可能会：",
    options: [
      { key: "A", text: "尽量少说，通过细节慢慢修正大家的视角。", scores: { Logic: 2, Reserved: 2, Support: 1 } },
      { key: "B", text: "主动搭建讨论框架，让场上按你的逻辑走。", scores: { Lead: 2, Logic: 2, Direct: 1 } },
      { key: "C", text: "发言尽量像普通好人，不让自己太显眼。", scores: { Hidden: 2, Reserved: 1, Support: 1 } },
      { key: "D", text: "更多根据桌面气氛和玩家状态灵活调整。", scores: { Intuition: 3, Support: 1 } },
    ],
  },
  {
    id: 6,
    question: "这把你是刺客，你发现梅林发言很稳、不好刺，你最可能会：",
    options: [
      { key: "A", text: "优先推动坏人过任务，最后再猜。", scores: { Lead: 2, Logic: 1, Hidden: 1 } },
      { key: "B", text: "强势施压几个目标，逼真正的梅林多说话。", scores: { Active: 2, Direct: 2, Lead: 1 } },
      { key: "C", text: "把自己包装得像一个普通推理好人。", scores: { Hidden: 2, Logic: 1, Reserved: 1 } },
      { key: "D", text: "跳派，逼真派起跳，分析真派的视野。", scores: { Direct: 2, Intuition: 1, Active: 1, Lead: 1 } },
    ],
  },
  {
    id: 7,
    question: "你作为普通忠臣，开局信息不多时，你最可能会：",
    options: [
      { key: "A", text: "先多听少说，等别人先露思路。", scores: { Reserved: 2, Logic: 1, Support: 1 } },
      { key: "B", text: "主动点评大家状态，尽快形成初始视角。", scores: { Active: 2, Lead: 1, Support: 1 } },
      { key: "C", text: "优先看逻辑漏洞和发言结构。", scores: { Logic: 3, Direct: 1 } },
      { key: "D", text: "搞点节目效果，调侃一下老朋友的面相。", scores: { Active: 2, Intuition: 1, Support: 1 } },
    ],
  },
  {
    id: 8,
    question: "当场上两个人猛烈互打，且你暂时分不清谁更像坏人时，你最可能会：",
    options: [
      { key: "A", text: "把两人的发言逐条拆开看。", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "先随便支持一个人，逼出更多信息。", scores: { Active: 2, Lead: 1, Intuition: 1 } },
      { key: "C", text: "必开一匪，两个人都别上车了。", scores: { Direct: 2, Reserved: 1, Logic: 1 } },
      { key: "D", text: "先凭整体感觉判断谁更像演出来的。", scores: { Intuition: 3, Hidden: 1 } },
    ],
  },
  {
    id: 9,
    question: "你当车长时，更接近哪种发车风格：",
    options: [
      { key: "A", text: "优先发你自己最信的稳车。", scores: { Support: 2, Logic: 1, Reserved: 1 } },
      { key: "B", text: "愿意发争议车，用试车换信息。", scores: { Active: 2, Lead: 1, Logic: 1 } },
      { key: "C", text: "通过组队去试探大家的立场和反应，最后再改一个心中的好车。", scores: { Lead: 2, Hidden: 1, Intuition: 1, Logic: 1 } },
      { key: "D", text: "发一个离谱车，反正也没人支持我。", scores: { Active: 1, Intuition: 1, Direct: 1, Hidden: 1 } },
    ],
  },
  {
    id: 10,
    question: "如果你发现自己发言被很多人误解，你最可能会：",
    options: [
      { key: "A", text: "立刻把逻辑重新讲清楚。", scores: { Direct: 2, Logic: 2 } },
      { key: "B", text: "先观察是谁在借误解带节奏。", scores: { Reserved: 1, Hidden: 2, Logic: 1 } },
      { key: "C", text: "反过来利用这个误解试探别人。", scores: { Hidden: 2, Lead: 1, Intuition: 1 } },
      { key: "D", text: "直接玩手机，误解我的话，那你们的胜利与否也与我无关。", scores: { Reserved: 2, Direct: 1, Active: 1 } },
    ],
  },
  {
    id: 11,
    question: "当一辆你不太认可的车被多数人强推时，你最可能会：",
    options: [
      { key: "A", text: "明确表达反对，并讲清理由。", scores: { Direct: 2, Logic: 2 } },
      { key: "B", text: "如果拦不住，就先让它过，后面再看信息。", scores: { Support: 2, Reserved: 1, Logic: 1 } },
      { key: "C", text: "尝试把话题转成“谁在推动这辆车”。", scores: { Hidden: 2, Logic: 1, Lead: 1 } },
      { key: "D", text: "直接跳派，让别人听我的。", scores: { Lead: 2, Active: 1, Direct: 1 } },
    ],
  },
  {
    id: 12,
    question: "你觉得自己在阿瓦隆里最强的一点更像是：",
    options: [
      { key: "A", text: "逻辑推演，能从细节里发现问题。", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "控场和推进，让全桌讨论动起来。", scores: { Lead: 2, Active: 2, Direct: 1 } },
      { key: "C", text: "伪装和藏身份，不容易被人看透。", scores: { Hidden: 3, Reserved: 1 } },
      { key: "D", text: "临场感觉，往往能抓到说不清但不对劲的人。", scores: { Intuition: 3, Support: 1 } },
    ],
  },
  {
    id: 13,
    question: "如果你是坏人，而你的队友明显发言失误了，你最可能会：",
    options: [
      { key: "A", text: "快速切割，优先保整体局势。", scores: { Logic: 2, Hidden: 2, Reserved: 1 } },
      { key: "B", text: "主动圆场，把话题重新拉回正轨。", scores: { Support: 2, Direct: 1, Lead: 1 } },
      { key: "C", text: "直接帮他说清楚，不回避立场。", scores: { Direct: 2, Support: 1, Active: 1 } },
      { key: "D", text: "起状态，用锋利的话语给队友上压力，以期他的正常状态。", scores: { Active: 2, Lead: 1, Hidden: 1 } },
    ],
  },
  {
    id: 14,
    question: "到了中后期，你判断身份时更依赖：",
    options: [
      { key: "A", text: "任务结果、发言逻辑和队伍结构。", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "谁在主导场上，以及他带来的局势变化。", scores: { Lead: 2, Active: 1, Intuition: 1 } },
      { key: "C", text: "谁的状态和语气变化不自然。", scores: { Intuition: 2, Hidden: 2 } },
      { key: "D", text: "玩家的颜值，萌萌的妹子怎么会炸车呢？", scores: { Intuition: 2, Active: 1, Support: 1 } },
    ],
  },
  {
    id: 15,
    question: "如果让你总结自己的阿瓦隆风格，你更希望别人觉得你是：",
    options: [
      { key: "A", text: "冷静缜密，靠推理说服别人。", scores: { Logic: 3, Direct: 1 } },
      { key: "B", text: "能主动破局，把节奏掌握在手里。", scores: { Lead: 2, Active: 2, Direct: 1 } },
      { key: "C", text: "深藏不露，很难被人真正看透。", scores: { Hidden: 3, Reserved: 1 } },
      { key: "D", text: "场感很好，总能凭直觉抓住重点。", scores: { Intuition: 3, Support: 1 } },
    ],
  },
];
