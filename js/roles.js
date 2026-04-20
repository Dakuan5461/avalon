/**
 * 角色权重模型 + 完整结果文案
 * 计分：score = Σ(weights[dimension] × count[dimension])
 */
export const DIMENSIONS = [
  "Logic",
  "Intuition",
  "Active",
  "Reserved",
  "Lead",
  "Support",
  "Direct",
  "Hidden",
];

/** 平分时的传播优先级（数值越小越优先） */
export const TIE_BREAK_ORDER = [
  "梅林",
  "莫甘娜",
  "亚瑟",
  "刺客",
  "莫德雷德",
  "派西维尔",
  "奥伯伦",
  "忠臣",
];

export const ROLES = [
  {
    id: "merlin",
    /** 与 pictures/ 下文件名对应（中文全拼小写） */
    portraitFile: "meilin.png",
    name: "梅林",
    weights: {
      Logic: 3,
      Reserved: 2,
      Hidden: 2,
      Lead: 1,
      Intuition: 0,
      Active: 0,
      Support: 1,
      Direct: 1,
    },
    title: "你的阿瓦隆人格角色：梅林",
    subtitle: "你不是最爱抢话的人，但常常是最先看懂局势的人。",
    keywords: ["洞察力强", "全局判断", "克制发言", "关键指引"],
    body:
      "你擅长从细节、站位和发言逻辑里快速抓住重点。\n在信息混乱的时候，你通常比别人更早形成判断，但不会急着把底牌全部摊开。\n你更关注整局的走向，而不是一时的情绪对抗。",
    pros: [
      "全局感强",
      "对异常信息敏感",
      "不容易被带节奏",
      "关键时刻判断清晰",
    ],
    cons: [
      "有时看得太早，却说得太少",
      "容易高估别人理解你暗示的能力",
      "压力大时会变得过于克制",
    ],
    shareShort:
      "测出来我是【梅林型】。\n属于那种不一定最吵，但经常最早看懂局势的人。\n有点准。",
  },
  {
    id: "percival",
    portraitFile: "paixiweier.png",
    name: "派西维尔",
    weights: {
      Intuition: 3,
      Support: 3,
      Direct: 2,
      Reserved: 1,
      Logic: 0,
      Active: 0,
      Lead: 0,
      Hidden: 1,
    },
    title: "你的阿瓦隆人格角色：派西维尔",
    subtitle: "你最强的不是控场，而是认人和守人。",
    keywords: ["信任直觉", "守护型", "稳定支持", "关系敏感"],
    body:
      "你很擅长分辨谁值得信任，也愿意保护自己认定的重要队友。\n你不一定总是站在最前面，但往往能在关键时候守住正确方向。\n你对人的敏感度，常常比对话术的敏感度更高。",
    pros: [
      "站边能力强",
      "重视团队关系",
      "容易成为稳定支点",
      "愿意支持正确的人",
    ],
    cons: [
      "容易因为信任而放大期待",
      "对「像好人」的人容错偏高",
      "有时会把情感判断放在逻辑前面",
    ],
    shareShort:
      "测出来我是【派西维尔型】。\n比起硬盘逻辑，我更擅长判断谁值得信。\n很像我。",
  },
  {
    id: "loyal",
    portraitFile: "zhongchen.png",
    name: "忠臣",
    weights: {
      Logic: 2,
      Support: 3,
      Direct: 3,
      Lead: 1,
      Active: 1,
      Reserved: 1,
      Intuition: 0,
      Hidden: 0,
    },
    title: "你的阿瓦隆人格角色：忠臣",
    subtitle: "你不是花招最多的人，但通常是最靠谱的那一个。",
    keywords: ["真诚稳定", "执行力", "团队底盘", "务实判断"],
    body:
      "你讲求真实、稳定和配合，不喜欢过度表演和复杂操作。\n在团队里，你常常不是最显眼的人，却是最让人放心的存在。\n你的价值在于持续输出可信信息，让局面不轻易失控。",
    pros: ["稳定可靠", "配合意识强", "真实感高", "不容易搞复杂"],
    cons: [
      "有时过于朴素，容易被高阶话术压住",
      "不喜欢抢节奏，可能错过发力机会",
      "在复杂局中容易低估「演」的作用",
    ],
    shareShort:
      "测出来我是【忠臣型】。\n不一定最会演，但大概率是局里最靠谱的人。\n这评价我接受。",
  },
  {
    id: "arthur",
    portraitFile: "yase.png",
    name: "亚瑟",
    weights: {
      Lead: 3,
      Active: 2,
      Direct: 2,
      Logic: 1,
      Intuition: 0,
      Reserved: 0,
      Support: 1,
      Hidden: 0,
    },
    title: "你的阿瓦隆人格角色：亚瑟",
    subtitle: "你天然想把局面接过来，不太习惯看着大家一直乱。",
    keywords: ["带队推进", "决策感", "主场气场", "扛压能力"],
    body:
      "你习惯主动整理局势、推动讨论、给出明确方案。\n哪怕信息还不完整，你也更愿意站出来承担决策压力。\n你在局里的存在感往往很强，像那个会主动接管混乱的人。",
    pros: [
      "推动能力强",
      "不怕承担责任",
      "有号召力",
      "能把分散信息整合成方向",
    ],
    cons: [
      "有时推进太快，给别人压力过大",
      "容易对犹豫型玩家不耐烦",
      "判断一旦成型，修正成本较高",
    ],
    shareShort:
      "测出来我是【亚瑟型】。\n属于那种一看到局面乱，就忍不住想接管的人。\n确实是我。",
  },
  {
    id: "morgana",
    portraitFile: "moganna.png",
    name: "莫甘娜",
    weights: {
      Hidden: 3,
      Active: 2,
      Intuition: 2,
      Lead: 1,
      Logic: 0,
      Reserved: 0,
      Support: 0,
      Direct: 1,
    },
    title: "你的阿瓦隆人格角色：莫甘娜",
    subtitle: "你很懂别人会怎么想，也很会影响别人怎么想。",
    keywords: ["魅力控场", "社交判断", "高级伪装", "风向影响"],
    body:
      "你很清楚一个人为什么会信你，也知道怎样表达最容易让人接受。\n你擅长制造可信感，不一定靠强势压人，而是靠自然地改变场上的判断方向。\n你的强项不是蛮冲，而是「看似轻松地控场」。",
    pros: ["社交感强", "会包装表达", "擅长拿捏氛围", "影响他人能力强"],
    cons: [
      "有时太懂表达，反而容易显得「过于会说」",
      "容易沉迷操作感",
      "被误解时会懒得解释到底",
    ],
    shareShort:
      "测出来我是【莫甘娜型】。\n属于那种不一定最凶，但很会影响全场判断的人。\n这结果有点危险但挺准。",
  },
  {
    id: "assassin",
    portraitFile: "cike.png",
    name: "刺客",
    weights: {
      Active: 3,
      Lead: 2,
      Direct: 3,
      Logic: 1,
      Intuition: 1,
      Reserved: 0,
      Support: 0,
      Hidden: 0,
    },
    title: "你的阿瓦隆人格角色：刺客",
    subtitle: "你最强的地方，不是隐藏，而是在关键时刻一击定局。",
    keywords: ["果断出手", "目标明确", "爆发力强", "胜负心重"],
    body:
      "你不喜欢拖泥带水，尤其在关键节点，往往会比别人更快做出选择。\n你有明确的进攻意识，也很擅长在局势收束时抓住那个最重要的目标。\n越到决胜时刻，你通常越清醒。",
    pros: ["决断力强", "胜负感明确", "关键局敢出手", "不容易优柔寡断"],
    cons: [
      "有时过于追求效率，忽略铺垫",
      "可能因为太想定局而显得强势",
      "在信息不足时容易提前锁人",
    ],
    shareShort:
      "测出来我是【刺客型】。\n平时还好，一到关键局就会特别想一刀定胜负。\n挺像我的。",
  },
  {
    id: "mordred",
    portraitFile: "modeleide.png",
    name: "莫德雷德",
    weights: {
      Hidden: 3,
      Reserved: 2,
      Logic: 2,
      Lead: 0,
      Active: 0,
      Intuition: 1,
      Support: 0,
      Direct: 0,
    },
    title: "你的阿瓦隆人格角色：莫德雷德",
    subtitle: "你习惯把真正的判断留在心里，而不是挂在脸上。",
    keywords: ["深藏不露", "低调布局", "反侦察", "冷静耐心"],
    body:
      "你不喜欢轻易暴露自己的真实意图，更习惯先观察、再布局、后出手。\n很多时候别人觉得你很安静，但其实你一直在计算局势。\n你最大的能力，是让自己看起来没有那么重要。",
    pros: ["隐藏能力强", "耐心足", "情绪稳定", "擅长暗中掌控节奏"],
    cons: [
      "有时藏得太深，队友也看不懂你",
      "可能错过建立信任的机会",
      "不爱解释时容易被误判",
    ],
    shareShort:
      "测出来我是【莫德雷德型】。\n属于那种看起来不抢戏，其实一直在默默观察全场的人。\n好像被说中了。",
  },
  {
    id: "oberon",
    portraitFile: "aobolun.png",
    name: "奥伯伦",
    weights: {
      Intuition: 3,
      Hidden: 3,
      Active: 1,
      Reserved: 1,
      Lead: 1,
      Support: 1,
      Logic: 1,
      Direct: 0,
    },
    title: "你的阿瓦隆人格角色：奥伯伦",
    subtitle: "你不太按常理出牌，也很少真正被人看透。",
    keywords: ["反套路", "独立判断", "神秘感", "难以预测"],
    body:
      "你有自己独特的判断路径，不太喜欢完全跟着别人的节奏走。\n你看问题的角度常常很跳，但也正因为如此，你经常能注意到别人忽略的东西。\n你是那种很难被简单归类的人。",
    pros: ["反套路能力强", "独立性高", "常有意外视角", "不容易被他人定义"],
    cons: [
      "有时太跳脱，队友不容易跟上",
      "容易因为不想重复别人而绕远",
      "在需要统一共识时，可能显得不够「合群」",
    ],
    shareShort:
      "测出来我是【奥伯伦型】。\n我在博弈游戏里真的很不按套路来，别人也经常猜不透我。\n这个结果挺准。",
  },
];
