import { QUESTIONS } from "./questions.js";
import { DIMENSIONS, ROLES, TIE_BREAK_ORDER } from "./roles.js";

/** 空维度计数（每题对命中维度 +1，最高约 12+） */
export function emptyCounts() {
  const c = {};
  for (const d of DIMENSIONS) c[d] = 0;
  return c;
}

/** 将一次选择的维度计入总分 */
export function addScores(counts, scoreKeys) {
  for (const k of scoreKeys) {
    if (counts[k] !== undefined) counts[k] += 1;
  }
}

/** 撤销上一题选择对应的维度分（用于「上一步」） */
export function subtractScores(counts, scoreKeys) {
  for (const k of scoreKeys) {
    if (counts[k] !== undefined) counts[k] -= 1;
  }
}

function roleWeightedScore(counts, weights) {
  let s = 0;
  for (const d of DIMENSIONS) {
    const w = weights[d] ?? 0;
    s += w * (counts[d] ?? 0);
  }
  return s;
}

function tieBreakRank(roleName) {
  const i = TIE_BREAK_ORDER.indexOf(roleName);
  return i === -1 ? 999 : i;
}

/**
 * 计算各角色得分并排序；返回主结果、次结果、原始得分列表
 */
export function matchRoles(counts) {
  const scored = ROLES.map((role) => ({
    role,
    score: roleWeightedScore(counts, role.weights),
  }));

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return tieBreakRank(a.role.name) - tieBreakRank(b.role.name);
  });

  const primary = scored[0].role;
  const secondary = scored[1]?.role ?? null;

  const rawScores = Object.fromEntries(scored.map((x) => [x.role.name, x.score]));

  return {
    primary,
    secondary,
    ranked: scored,
    rawScores,
  };
}

/** 单题对某角色可贡献的加权分上界，累加为「该角色理论最高得分」 */
function maxTheoreticalWeightedScoreForRole(role) {
  let total = 0;
  for (const q of QUESTIONS) {
    let best = 0;
    for (const opt of q.options) {
      let delta = 0;
      for (const k of opt.scores) {
        delta += role.weights[k] ?? 0;
      }
      if (delta > best) best = delta;
    }
    total += best;
  }
  return total;
}

/**
 * 与某角色气质的接近度 0–100：实际加权分 / 该角色在题面上可达的理论最高分
 */
export function roleMatchPercent(counts, role) {
  const actual = roleWeightedScore(counts, role.weights);
  const cap = maxTheoreticalWeightedScoreForRole(role);
  if (cap <= 0) return 0;
  return Math.min(100, Math.round((100 * actual) / cap));
}

/**
 * 将各维度题内计数转为 4 条 0–100 连续轴（偏右 = 更贴近右侧标签）
 */
export function profileAxesFromCounts(counts) {
  const a = (x, y) => {
    const s = (counts[x] ?? 0) + (counts[y] ?? 0);
    if (s === 0) return 50;
    return Math.round((100 * (counts[y] ?? 0)) / s);
  };
  return [
    {
      id: "reason",
      leftLabel: "推理",
      rightLabel: "直觉",
      value: a("Logic", "Intuition"),
    },
    {
      id: "presence",
      leftLabel: "静观",
      rightLabel: "积极",
      value: a("Reserved", "Active"),
    },
    {
      id: "stance",
      leftLabel: "辅助",
      rightLabel: "带队",
      value: a("Support", "Lead"),
    },
    {
      id: "style",
      leftLabel: "直白",
      rightLabel: "隐秘",
      value: a("Direct", "Hidden"),
    },
  ];
}
