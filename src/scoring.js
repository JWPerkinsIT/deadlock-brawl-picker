import { HERO_OVERRIDES } from "./data.js";

// ============================================================
// SCORING ENGINE
// ============================================================
export const RATING_SCORES = { S: 10, A: 7, B: 5, C: 3, D: 1 };
export const TIER_NAMES = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "Legendary" };
export const TIER_COSTS = { 1: 800, 2: 1600, 3: 3200, 4: 6400, 5: 9999 };
export const CAT_COLORS = { weapon: "#d4783b", vitality: "#6dbf6a", spirit: "#b87fd4" };
export const CAT_LABELS = { weapon: "Weapon", vitality: "Vitality", spirit: "Spirit" };
export const RATING_COLORS = { S: "#ff4757", A: "#ffa502", B: "#e8a535", C: "#7bed9f", D: "#636e72" };

export const ROUND_TIER_WEIGHTS = {
  1: { 1: 0.6, 2: 0.3, 3: 0.1, 4: 0, 5: 0 },
  2: { 1: 0.3, 2: 0.4, 3: 0.2, 4: 0.08, 5: 0.02 },
  3: { 1: 0.1, 2: 0.3, 3: 0.35, 4: 0.2, 5: 0.05 },
  4: { 1: 0.05, 2: 0.15, 3: 0.35, 4: 0.35, 5: 0.1 },
  5: { 1: 0, 2: 0.1, 3: 0.3, 4: 0.45, 5: 0.15 },
};

export function getItemRating(item, hero) {
  if (!hero) return item.brawlRating;
  const overrides = HERO_OVERRIDES[hero.id];
  if (overrides && overrides[item.id]) return overrides[item.id];
  // Tag-based synergy calculation
  const sharedTags = item.tags.filter((t) => hero.tags.includes(t));
  const synergy = sharedTags.length;
  const baseScore = RATING_SCORES[item.brawlRating] || 5;
  const adjusted = baseScore + synergy * 0.8;
  if (adjusted >= 10) return "S";
  if (adjusted >= 7) return "A";
  if (adjusted >= 5) return "B";
  if (adjusted >= 3) return "C";
  return "D";
}

export function getItemScore(item, hero, round, currentBuild = []) {
  const rating = getItemRating(item, hero);
  let score = RATING_SCORES[rating] || 5;
  // Round context bonus - higher tier items are worth more in later rounds
  const tierWeight = ROUND_TIER_WEIGHTS[round]?.[item.tier] || 0;
  score += tierWeight * 3;
  // Legendary always-pick bonus
  if (item.legendary) score += 5;
  // Enhanced items bonus (simulated)
  if (item.enhanced) score += 3;
  // Build diversity bonus - prefer items from categories you have less of
  const catCounts = {};
  currentBuild.forEach((b) => { catCounts[b.cat] = (catCounts[b.cat] || 0) + 1; });
  const thisCatCount = catCounts[item.cat] || 0;
  score -= thisCatCount * 0.5;
  return Math.round(score * 10) / 10;
}
