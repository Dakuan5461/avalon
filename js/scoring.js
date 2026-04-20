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

/**
 * 娱乐向「接近度」百分比：主角色在 55%–95% 区间，避免显得过于「科学」
 */
export function entertainmentMatchPercent(ranked) {
  if (!ranked.length) return 70;
  const scores = ranked.map((x) => x.score);
  const maxS = Math.max(...scores);
  const minS = Math.min(...scores);
  const span = maxS - minS || 1;
  const top = ranked[0].score;
  const t = (top - minS) / span;
  return Math.round(55 + t * 40);
}
