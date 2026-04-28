/**
 * 题库：每题四个选项。选中后按 scores 中各维度 **加分值** 累加（可为 1/2/3 等，表示倾向强弱）。
 * 键名须与 roles.js 中 DIMENSIONS 一致。
 */
export const QUESTIONS = [
  {
    id: 1,
    question: "开桌前一秒，你的大脑主要在：",
    options: [
      { key: "A", text: "默默复盘规则，怕漏细节", scores: { Logic: 1, Reserved: 1 } },
      { key: "B", text: "已经在脑内排到第三局", scores: { Active: 2, Lead: 1 } },
      { key: "C", text: "凭气氛决定今晚听谁的", scores: { Intuition: 3, Hidden: 1 } },
      { key: "D", text: "思考宇宙为什么要发明「坐庄」", scores: { Intuition: 1, Support: 1, Logic: 1 } },
    ],
  },
  {
    id: 2,
    question: "有人发言像 AI 翻译了十遍，你会：",
    options: [
      { key: "A", text: "记下前后矛盾点，不急怼", scores: { Logic: 2, Reserved: 1 } },
      { key: "B", text: "当场打断，请他说人话", scores: { Direct: 2, Active: 1 } },
      { key: "C", text: "觉得他可能在演，先养鱼", scores: { Hidden: 3, Reserved: 1 } },
      { key: "D", text: "给他鼓掌，鼓励人类多样性", scores: { Support: 2, Intuition: 1 } },
    ],
  },
  {
    id: 3,
    question: "如果规则书突然是由一只鸭子口述的：",
    options: [
      { key: "A", text: "抓关键词，试图还原真规则", scores: { Logic: 3, Direct: 1 } },
      { key: "B", text: "跟着嘎嘎节奏，感受精神鸭德", scores: { Intuition: 2, Active: 2 } },
      { key: "C", text: "假装听懂，课后对齐维基", scores: { Hidden: 2, Support: 1 } },
      { key: "D", text: "提议以后只玩「猜鸭子心情」", scores: { Lead: 1, Intuition: 1, Hidden: 1, Active: 1 } },
    ],
  },
  {
    id: 4,
    question: "桌上陷入死亡沉默，你更可能：",
    options: [
      { key: "A", text: "等谁先憋不住", scores: { Reserved: 3, Hidden: 1 } },
      { key: "B", text: "抛个梗或甩个假设打破僵局", scores: { Active: 2, Lead: 2 } },
      { key: "C", text: "小声问旁边：是不是有人掉线了", scores: { Support: 2, Intuition: 1 } },
      { key: "D", text: "开始用吸管吹气演奏哀乐", scores: { Active: 1, Intuition: 1, Direct: 1, Hidden: 1 } },
    ],
  },
  {
    id: 5,
    question: "你怀疑自己玩错了阵营，第一反应是：",
    options: [
      { key: "A", text: "翻规则或私聊裁判，要实证", scores: { Logic: 2, Direct: 1 } },
      { key: "B", text: "凭直觉硬扛，错了就当彩蛋", scores: { Intuition: 3, Lead: 1 } },
      { key: "C", text: "藏住表情，看谁先露怯", scores: { Hidden: 3, Reserved: 1 } },
      { key: "D", text: "宣布进入平行宇宙，本局无效", scores: { Lead: 2, Intuition: 1, Hidden: 1 } },
    ],
  },
  {
    id: 6,
    question: "有人说「我铁好」，你内心：",
    options: [
      { key: "A", text: "记录这句话，后面用逻辑鞭尸", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "语气不对，先标狼预", scores: { Intuition: 2, Hidden: 2 } },
      { key: "C", text: "给他台阶，问证据在哪", scores: { Support: 2, Direct: 1 } },
      { key: "D", text: "回他「我铁饿」并点外卖", scores: { Active: 2, Support: 1, Intuition: 1 } },
    ],
  },
  {
    id: 7,
    question: "赢了之后你怎么庆祝（精神层面也可）：",
    options: [
      { key: "A", text: "复盘哪几步算得准", scores: { Logic: 2, Direct: 1 } },
      { key: "B", text: "抱队友大喊再来一局", scores: { Active: 3, Lead: 1 } },
      { key: "C", text: "淡淡微笑，深藏功与名", scores: { Hidden: 3, Reserved: 1 } },
      { key: "D", text: "把群主踢了证明自己", scores: { Lead: 1, Active: 1, Direct: 1, Hidden: 1 } },
    ],
  },
  {
    id: 8,
    question: "假如梅林的真身其实是外卖站长：",
    options: [
      { key: "A", text: "分析配送路径与发言时间线", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "靠谁更像「准时宝」来认人", scores: { Intuition: 2, Support: 2 } },
      { key: "C", text: "装不知道，让他多送一份薯角", scores: { Hidden: 2, Active: 1 } },
      { key: "D", text: "给全场点奶茶测忠诚度", scores: { Lead: 2, Support: 2 } },
    ],
  },
  {
    id: 9,
    question: "场上最受不了的队友类型：",
    options: [
      { key: "A", text: "逻辑真空还要抢麦", scores: { Logic: 2, Direct: 2 } },
      { key: "B", text: "全程划水还装沉思", scores: { Active: 1, Lead: 1, Reserved: 2 } },
      { key: "C", text: "把气氛刀得太刀，想退游", scores: { Support: 3, Intuition: 1 } },
      { key: "D", text: "把骰子当占卜还问你星座", scores: { Intuition: 2, Hidden: 1, Logic: 1, Active: 1 } },
    ],
  },
  {
    id: 10,
    question: "时间只能倒流到本局某一秒，你选：",
    options: [
      { key: "A", text: "发言被自己嘴瓢前", scores: { Logic: 1, Direct: 2, Reserved: 1 } },
      { key: "B", text: "投票前，改推一个更狠的", scores: { Lead: 3, Active: 1 } },
      { key: "C", text: "开局前，换件衣服气场+3", scores: { Hidden: 2, Intuition: 2 } },
      { key: "D", text: "倒流到宇宙大爆炸，重开物理", scores: { Intuition: 1, Reserved: 1, Lead: 1, Hidden: 1 } },
    ],
  },
  {
    id: 11,
    question: "抽到信息位但网卡成 PPT，你会：",
    options: [
      { key: "A", text: "打字列要点补刀", scores: { Logic: 2, Direct: 2 } },
      { key: "B", text: "语音怒吼路由器的族谱", scores: { Active: 3, Direct: 1 } },
      { key: "C", text: "表情包暗示，懂的自然懂", scores: { Hidden: 3, Intuition: 1 } },
      { key: "D", text: "宣称这是沉浸式信号干扰玩法", scores: { Hidden: 1, Lead: 1, Intuition: 2 } },
    ],
  },
  {
    id: 12,
    question: "骰子跟你作对，连续最低点，你：",
    options: [
      { key: "A", text: "换骰子、洗手感、建立新样本", scores: { Logic: 2, Support: 1 } },
      { key: "B", text: "加大力度，不信邪", scores: { Active: 3, Lead: 1 } },
      { key: "C", text: "怀疑桌垫风水，换方位", scores: { Intuition: 2, Hidden: 2 } },
      { key: "D", text: "给骰子办离职手续", scores: { Direct: 2, Active: 1, Intuition: 1 } },
    ],
  },
  {
    id: 13,
    question: "世界末日只能带一条桌游梗上路：",
    options: [
      { key: "A", text: "「先盘逻辑」——文明重建从规则开始", scores: { Logic: 3, Lead: 1 } },
      { key: "B", text: "「我信你」——末日也要站边", scores: { Support: 3, Intuition: 1 } },
      { key: "C", text: "「你们聊，我听听」——低调苟活", scores: { Reserved: 2, Hidden: 2 } },
      { key: "D", text: "「这局算娱乐」——宇宙热寂也要整活", scores: { Active: 1, Intuition: 1, Hidden: 1, Support: 1 } },
    ],
  },
  {
    id: 14,
    question: "主持人突然用rap复盘上一局，你：",
    options: [
      { key: "A", text: "提取韵脚里的时间线错误", scores: { Logic: 3, Reserved: 1 } },
      { key: "B", text: "跟着 beat 拍桌打节奏", scores: { Active: 2, Lead: 2 } },
      { key: "C", text: "录下来当黑历史要挟夜宵", scores: { Hidden: 2, Intuition: 2 } },
      { key: "D", text: "要求 freestyle 对战定庄", scores: { Lead: 2, Direct: 1, Active: 1 } },
    ],
  },
  {
    id: 15,
    question: "做完这堆题发现最后一题是陷阱：其实在测你耐不耐烦——你：",
    options: [
      { key: "A", text: "承认陷阱也是数据，善始善终", scores: { Logic: 2, Reserved: 2 } },
      { key: "B", text: "拍桌要求加钱加题", scores: { Lead: 3, Active: 1 } },
      { key: "C", text: "微笑滑到结果页，当作行为艺术", scores: { Hidden: 3, Intuition: 1 } },
      { key: "D", text: "把屏幕转给猫，让猫选", scores: { Intuition: 2, Support: 1, Reserved: 1, Active: 1 } },
    ],
  },
];
