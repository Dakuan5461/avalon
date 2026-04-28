import { QUESTIONS } from "./questions.js";
import { DIMENSIONS, ROLES, TIE_BREAK_ORDER } from "./roles.js";

/** 空维度累计分（各维度为各题选项加分之和） */
export function emptyCounts() {
  const c = {};
  for (const d of DIMENSIONS) c[d] = 0;
  return c;
}

/**
 * 将一次选项的分值表累进总分。scores 形如 { Logic: 2, Reserved: 1 }，缺省维度视为不加。
 * @param {Record<string, number>} delta
 */
export function addScores(counts, delta) {
  for (const [d, pts] of Object.entries(delta)) {
    if (counts[d] === undefined) continue;
    const n = Number(pts);
    if (!Number.isFinite(n)) continue;
    counts[d] += n;
  }
}

/** 撤销一次选择（与 addScores 对称） */
export function subtractScores(counts, delta) {
  for (const [d, pts] of Object.entries(delta)) {
    if (counts[d] === undefined) continue;
    const n = Number(pts);
    if (!Number.isFinite(n)) continue;
    counts[d] -= n;
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

/** 单题对某角色可贡献的加权分上界：在该题四个选项中取最大，再累加 */
function maxTheoreticalWeightedScoreForRole(role) {
  let total = 0;
  for (const q of QUESTIONS) {
    let best = 0;
    for (const opt of q.options) {
      let contrib = 0;
      const sm = opt.scores;
      if (!sm || typeof sm !== "object") continue;
      for (const [d, pts] of Object.entries(sm)) {
        const w = role.weights[d] ?? 0;
        const p = Number(pts);
        if (Number.isFinite(p)) contrib += w * p;
      }
      if (contrib > best) best = contrib;
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
