import { useState, useMemo, useCallback } from "react";
import { Search, RotateCcw, Target, Check, ArrowRight, Flame, Crown, Shuffle, Play, ChevronDown, ChevronUp, Swords, X } from "lucide-react";
import { HEROES, ITEMS } from "./data.js";
import { getItemRating, getItemScore, ROUND_TIER_WEIGHTS, CAT_COLORS, CAT_LABELS, RATING_COLORS, TIER_NAMES } from "./scoring.js";
import { styles, CatIcon, ItemCard } from "./shared.jsx";

// ============================================================
// CONSTANTS
// ============================================================
const ROUND_INFO = {
  1: { abilityPoints: 6, boons: 9 },
  2: { abilityPoints: 6, boons: 16 },
  3: { abilityPoints: 5, boons: 21 },
  4: { abilityPoints: 5, boons: 27 },
  5: { abilityPoints: 5, boons: 34 },
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function rollTier(weights) {
  const roll = Math.random();
  let cumulative = 0;
  for (const [tier, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (roll <= cumulative) return Number(tier);
  }
  return 3;
}

function generateItemOfferings(round, hero, existingBuildIds = new Set()) {
  const weights = ROUND_TIER_WEIGHTS[round];
  const usedIds = new Set(existingBuildIds);
  const groups = [];

  for (let g = 0; g < 3; g++) {
    const group = [];
    for (let s = 0; s < 3; s++) {
      let tier = rollTier(weights);

      // Get candidates for this tier
      let candidates = ITEMS.filter((item) => item.tier === tier && !usedIds.has(item.id));

      // Fallback to adjacent tiers if no items available
      if (candidates.length === 0) {
        for (let offset = 1; offset <= 3; offset++) {
          candidates = ITEMS.filter((item) =>
            (item.tier === tier + offset || item.tier === tier - offset) &&
            item.tier >= 1 && item.tier <= 5 && !usedIds.has(item.id)
          );
          if (candidates.length > 0) break;
        }
      }
      if (candidates.length === 0) continue;

      // 30% chance to bias toward hero-synergistic items
      let picked;
      if (hero && Math.random() < 0.3) {
        const synergistic = candidates.filter((item) =>
          item.tags.some((t) => hero.tags.includes(t))
        );
        if (synergistic.length > 0) {
          picked = synergistic[Math.floor(Math.random() * synergistic.length)];
        }
      }
      if (!picked) {
        picked = candidates[Math.floor(Math.random() * candidates.length)];
      }

      // ~10% chance for enhanced
      const enhanced = Math.random() < 0.1;
      const finalItem = enhanced ? { ...picked, enhanced: true } : { ...picked };

      usedIds.add(picked.id);
      group.push(finalItem);
    }
    groups.push(group);
  }
  return groups;
}

function getAIBestPick(group, hero, round, currentBuild) {
  let best = null;
  let bestScore = -Infinity;
  group.forEach((item, idx) => {
    const score = getItemScore(item, hero, round, currentBuild);
    if (score > bestScore) {
      bestScore = score;
      best = { item, idx, score };
    }
  });
  return best;
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function HeroChip({ hero, isPlayer, compact }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: compact ? "4px" : "6px",
      background: isPlayer ? "rgba(232,165,53,0.15)" : "rgba(255,255,255,0.04)",
      border: isPlayer ? "2px solid rgba(232,165,53,0.5)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: "6px", padding: compact ? "3px 6px" : "4px 8px",
    }}>
      <span style={styles.ratingBadge(hero.brawlTier)}>{hero.brawlTier}</span>
      <span style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: compact ? "11px" : "13px", fontWeight: 600,
        color: isPlayer ? "#e8a535" : "#ccc",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{hero.name}</span>
      {isPlayer && (
        <span style={{ fontSize: "9px", color: "#e8a535", fontWeight: 700, textTransform: "uppercase" }}>YOU</span>
      )}
    </div>
  );
}

function TeamLineup({ teams, playerHero, allBuilds }) {
  return (
    <div style={{ ...styles.card, padding: "10px", marginBottom: "12px" }}>
      {/* Your Team */}
      <div style={{ marginBottom: "8px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
          color: "#6dbf6a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px",
        }}>Your Team</div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {teams.player.map((hero) => (
            <div key={hero.id} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <HeroChip hero={hero} isPlayer={hero.id === playerHero.id} compact />
              {allBuilds[hero.id]?.length > 0 && (
                <div style={{ display: "flex", gap: "1px" }}>
                  {allBuilds[hero.id].map((item, i) => (
                    <div key={i} style={{
                      width: "6px", height: "6px", borderRadius: "1px",
                      background: CAT_COLORS[item.cat],
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Enemy Team */}
      <div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
          color: "#ff4757", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px",
        }}>Enemy Team</div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {teams.enemy.map((hero) => (
            <div key={hero.id} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <HeroChip hero={hero} isPlayer={false} compact />
              {allBuilds[hero.id]?.length > 0 && (
                <div style={{ display: "flex", gap: "1px" }}>
                  {allBuilds[hero.id].map((item, i) => (
                    <div key={i} style={{
                      width: "6px", height: "6px", borderRadius: "1px",
                      background: CAT_COLORS[item.cat],
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferingGroup({ group, groupIndex, selectedIndex, onSelect }) {
  return (
    <div style={{
      ...styles.card, padding: "8px",
      border: selectedIndex !== null
        ? "1px solid rgba(232,165,53,0.3)"
        : "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700,
        color: selectedIndex !== null ? "#e8a535" : "#666",
        textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
        textAlign: "center",
      }}>
        Group {groupIndex + 1}
        {selectedIndex !== null && <Check size={10} color="#e8a535" style={{ marginLeft: "4px" }} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {group.map((item, itemIndex) => {
          const isSelected = selectedIndex === itemIndex;
          return (
            <div
              key={`${item.id}-${itemIndex}`}
              onClick={() => onSelect(groupIndex, itemIndex)}
              style={{
                cursor: "pointer",
                border: isSelected ? "2px solid #e8a535" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: isSelected ? "11px" : "12px",
                background: isSelected
                  ? "rgba(232,165,53,0.08)"
                  : "rgba(19,21,27,0.95)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.15s ease",
              }}
            >
              {isSelected && (
                <div style={{
                  position: "absolute", top: "4px", right: "4px",
                  background: "#e8a535", borderRadius: "50%", width: "18px", height: "18px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Check size={10} color="#0a0b0f" strokeWidth={3} />
                </div>
              )}
              {item.legendary && (
                <div style={{
                  position: "absolute", top: 0, right: isSelected ? "24px" : 0,
                  background: "linear-gradient(135deg, transparent 50%, rgba(232,165,53,0.3) 50%)",
                  width: "28px", height: "28px",
                }}>
                  <Crown size={9} color="#e8a535" style={{ position: "absolute", top: "3px", right: "3px" }} />
                </div>
              )}
              {item.enhanced && (
                <div style={{
                  position: "absolute", top: "4px", left: "4px",
                  fontSize: "9px", fontWeight: 700, color: "#ffd700",
                  background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)",
                  borderRadius: "3px", padding: "1px 4px", textTransform: "uppercase",
                }}>Enhanced</div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", marginTop: item.enhanced ? "16px" : "0" }}>
                <CatIcon cat={item.cat} size={14} />
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
                  fontSize: "14px", color: "#fff", flex: 1, lineHeight: 1.2,
                }}>
                  {item.name}
                </span>
                <span style={styles.ratingBadge(getItemRating(item, null))}>{getItemRating(item, null)}</span>
              </div>
              <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={styles.catBadge(item.cat)}>{CAT_LABELS[item.cat]}</span>
                <span style={styles.tierBadge(item.tier)}>
                  {item.tier === 5 ? "Legendary" : `T${TIER_NAMES[item.tier]}`}
                </span>
                {item.active && (
                  <span style={{
                    fontSize: "9px", fontWeight: 600, color: "#4a90d9",
                    background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.3)",
                    borderRadius: "3px", padding: "1px 4px", textTransform: "uppercase",
                  }}>Active</span>
                )}
              </div>
              {item.desc && (
                <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#777", lineHeight: 1.3 }}>
                  {item.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoundBreakdownRow({ data, playerHero }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      ...styles.card, padding: "10px", marginBottom: "6px",
      cursor: "pointer",
    }} onClick={() => setExpanded(!expanded)}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
          color: "#e8a535", minWidth: "60px",
        }}>Round {data.round}</span>
        {/* Score bar */}
        <div style={{ flex: 1, height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "4px",
            width: `${Math.min(data.percentage, 100)}%`,
            background: data.percentage >= 95 ? "#ff4757"
              : data.percentage >= 85 ? "#ffa502"
              : data.percentage >= 70 ? "#e8a535"
              : data.percentage >= 55 ? "#7bed9f"
              : "#636e72",
            transition: "width 0.5s ease",
          }} />
        </div>
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
          color: data.percentage >= 85 ? "#ffa502" : "#888", minWidth: "40px", textAlign: "right",
        }}>{data.percentage}%</span>
        <span style={{ fontSize: "12px", color: "#666" }}>
          ({data.matchCount}/3 match)
        </span>
        {expanded ? <ChevronUp size={14} color="#666" /> : <ChevronDown size={14} color="#666" />}
      </div>
      {expanded && (
        <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
          {[0, 1, 2].map((gi) => {
            const playerPick = data.playerPicks[gi];
            const aiPick = data.aiPicks[gi];
            const isMatch = playerPick?.id === aiPick?.id;
            return (
              <div key={gi} style={{
                background: isMatch ? "rgba(107,191,106,0.08)" : "rgba(255,71,87,0.06)",
                border: isMatch ? "1px solid rgba(107,191,106,0.3)" : "1px solid rgba(255,71,87,0.2)",
                borderRadius: "6px", padding: "8px",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#666", textTransform: "uppercase", marginBottom: "4px" }}>
                  Group {gi + 1} {isMatch ? <Check size={10} color="#6dbf6a" /> : <X size={10} color="#ff4757" />}
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <div style={{ fontSize: "9px", color: "#e8a535", fontWeight: 600, textTransform: "uppercase" }}>Your Pick</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    {playerPick && <CatIcon cat={playerPick.cat} size={10} />}
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600, color: "#ddd" }}>
                      {playerPick?.name || "None"}
                    </span>
                  </div>
                </div>
                {!isMatch && (
                  <div>
                    <div style={{ fontSize: "9px", color: "#4a90d9", fontWeight: 600, textTransform: "uppercase" }}>AI Pick</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {aiPick && <CatIcon cat={aiPick.cat} size={10} />}
                      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600, color: "#aaa" }}>
                        {aiPick?.name || "None"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SETUP SCREEN
// ============================================================
function SetupScreen({ onStart }) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [isRandom, setIsRandom] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = HEROES.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const order = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    return (order[a.brawlTier] || 4) - (order[b.brawlTier] || 4);
  });

  const canStart = isRandom || selectedHero;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "12px 16px 24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Mode Info */}
      <div style={{
        ...styles.card, marginBottom: "16px",
        border: "1px solid rgba(232,165,53,0.15)",
        background: "linear-gradient(180deg, rgba(232,165,53,0.04) 0%, rgba(19,21,27,0.9) 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Swords size={18} color="#e8a535" />
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", fontWeight: 700,
            color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
          }}>Street Brawl Simulation</span>
        </div>
        <p style={{ fontSize: "13px", color: "#aaa", margin: "0 0 8px", lineHeight: 1.5 }}>
          Practice your item picking in a simulated 4v4 Street Brawl. Pick a hero, get matched with random teams,
          and choose items across 5 rounds. At the end, see how your picks compare to the AI's optimal choices.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "4v4 Teams", color: "#6dbf6a" },
            { label: "5 Rounds", color: "#e8a535" },
            { label: "3 Items/Round", color: "#b87fd4" },
            { label: "1 Reroll/Round", color: "#4a90d9" },
          ].map(({ label, color }) => (
            <span key={label} style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600,
              color, background: `${color}15`, border: `1px solid ${color}33`,
              borderRadius: "4px", padding: "2px 8px", textTransform: "uppercase",
            }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Random Hero Toggle */}
      <div style={{ ...styles.card, padding: "12px", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => {
              setIsRandom(!isRandom);
              if (!isRandom) setSelectedHero(null);
            }}
            style={{
              ...styles.btn(isRandom),
              display: "flex", alignItems: "center", gap: "6px",
              background: isRandom ? "linear-gradient(135deg, #4a90d9, #3a7bc8)" : "rgba(255,255,255,0.05)",
              borderColor: isRandom ? "#4a90d9" : "rgba(255,255,255,0.1)",
              color: isRandom ? "#fff" : "#999",
            }}
          >
            <Shuffle size={14} />
            Random Hero
          </button>
          <span style={{ fontSize: "12px", color: "#666" }}>
            {isRandom ? "You'll get a random hero + 2 rerolls in rounds 1-2" : "Select your hero below"}
          </span>
        </div>
      </div>

      {/* Hero Selection Grid */}
      {!isRandom && (
        <div style={{ ...styles.card, padding: "12px", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Target size={16} color="#e8a535" />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
              color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
            }}>Choose Your Hero</span>
            {selectedHero && (
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700,
                color: "#fff", marginLeft: "auto",
              }}>{selectedHero.name}</span>
            )}
          </div>
          <div style={{ position: "relative", marginBottom: "8px" }}>
            <Search size={14} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              style={styles.input}
              placeholder="Search heroes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "4px", maxHeight: "280px", overflowY: "auto",
            scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
          }}>
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHero(h)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: selectedHero?.id === h.id ? "rgba(232,165,53,0.15)" : "rgba(255,255,255,0.03)",
                  border: selectedHero?.id === h.id ? "1px solid rgba(232,165,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "5px", padding: "6px 8px", cursor: "pointer",
                  transition: "all 0.1s",
                }}
              >
                <span style={styles.ratingBadge(h.brawlTier)}>{h.brawlTier}</span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
                  color: selectedHero?.id === h.id ? "#e8a535" : "#ccc",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>{h.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={() => canStart && onStart(selectedHero, isRandom)}
        disabled={!canStart}
        style={{
          ...styles.btn(canStart),
          width: "100%", padding: "16px",
          fontSize: "18px", letterSpacing: "3px",
          background: canStart
            ? "linear-gradient(135deg, #e8a535, #d4943a)"
            : "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          opacity: canStart ? 1 : 0.5,
          cursor: canStart ? "pointer" : "not-allowed",
        }}
      >
        <Play size={20} />
        Start Brawl
      </button>
    </div>
  );
}

// ============================================================
// RESULTS SCREEN
// ============================================================
function ResultsScreen({ roundHistory, playerHero, teams, allBuilds, onPlayAgain }) {
  const [expandedTeam, setExpandedTeam] = useState(false);

  const results = useMemo(() => {
    let totalPlayerScore = 0;
    let totalAiScore = 0;

    const roundBreakdowns = roundHistory.map((rh) => {
      totalPlayerScore += rh.playerScore;
      totalAiScore += rh.aiScore;

      const matchCount = rh.playerPicks.filter((pp) =>
        rh.aiOptimalPicks.some((ap) => ap.id === pp.id)
      ).length;

      return {
        round: rh.round,
        playerScore: rh.playerScore,
        aiScore: rh.aiScore,
        percentage: rh.aiScore > 0 ? Math.round((rh.playerScore / rh.aiScore) * 100) : 100,
        matchCount,
        playerPicks: rh.playerPicks,
        aiPicks: rh.aiOptimalPicks,
      };
    });

    const overallPercentage = totalAiScore > 0
      ? Math.round((totalPlayerScore / totalAiScore) * 100)
      : 100;

    let grade;
    if (overallPercentage >= 95) grade = "S";
    else if (overallPercentage >= 85) grade = "A";
    else if (overallPercentage >= 70) grade = "B";
    else if (overallPercentage >= 55) grade = "C";
    else grade = "D";

    return { roundBreakdowns, totalPlayerScore, totalAiScore, overallPercentage, grade };
  }, [roundHistory]);

  const playerBuild = allBuilds[playerHero.id] || [];
  const catCounts = { weapon: 0, vitality: 0, spirit: 0 };
  playerBuild.forEach((item) => { catCounts[item.cat]++; });

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "12px 16px 24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Grade Header */}
      <div style={{
        ...styles.card, marginBottom: "16px", textAlign: "center",
        border: `1px solid ${RATING_COLORS[results.grade]}33`,
        background: `linear-gradient(180deg, ${RATING_COLORS[results.grade]}08 0%, rgba(19,21,27,0.95) 100%)`,
        padding: "24px",
      }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
          color: "#888", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px",
        }}>Final Grade</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "72px", fontWeight: 700,
          color: RATING_COLORS[results.grade],
          textShadow: `0 0 40px ${RATING_COLORS[results.grade]}44`,
          lineHeight: 1,
        }}>{results.grade}</div>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "24px", fontWeight: 600,
          color: "#e2e0dc", marginTop: "8px",
        }}>
          {results.overallPercentage}% Optimal
        </div>
        <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>
          {playerHero.name} - Score: {results.totalPlayerScore.toFixed(1)} / {results.totalAiScore.toFixed(1)} (AI)
        </div>
      </div>

      {/* Score Bar */}
      <div style={{ ...styles.card, marginBottom: "12px", padding: "12px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700,
          color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
        }}>Your Score vs AI Optimal</div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#e8a535", minWidth: "30px" }}>You</span>
          <div style={{ flex: 1, height: "12px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "6px",
              width: `${Math.min(results.overallPercentage, 100)}%`,
              background: `linear-gradient(90deg, ${RATING_COLORS[results.grade]}, ${RATING_COLORS[results.grade]}88)`,
              transition: "width 1s ease",
            }} />
          </div>
          <span style={{ fontSize: "11px", color: "#4a90d9", minWidth: "20px", textAlign: "right" }}>AI</span>
        </div>
      </div>

      {/* Round Breakdown */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
          color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
        }}>Round Breakdown</div>
        {results.roundBreakdowns.map((rb) => (
          <RoundBreakdownRow key={rb.round} data={rb} playerHero={playerHero} />
        ))}
      </div>

      {/* Final Build */}
      <div style={{ ...styles.card, marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
          color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
        }}>Your Final Build ({playerBuild.length} items)</div>
        {/* Category bar */}
        <div style={{ display: "flex", gap: "2px", height: "20px", borderRadius: "4px", overflow: "hidden", marginBottom: "8px" }}>
          {Object.entries(catCounts).map(([cat, count]) => (
            count > 0 && (
              <div key={cat} style={{
                flex: count, background: `${CAT_COLORS[cat]}44`,
                borderLeft: `3px solid ${CAT_COLORS[cat]}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 700, color: CAT_COLORS[cat] }}>
                  {CAT_LABELS[cat]} {count}
                </span>
              </div>
            )
          ))}
        </div>
        {/* Items grouped by round */}
        {[1, 2, 3, 4, 5].map((r) => {
          const roundItems = playerBuild.slice((r - 1) * 3, r * 3);
          if (roundItems.length === 0) return null;
          return (
            <div key={r} style={{ marginBottom: "6px" }}>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "10px", fontWeight: 700,
                color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px",
              }}>Round {r}</div>
              <div style={{ display: "flex", gap: "4px" }}>
                {roundItems.map((item, idx) => (
                  <div key={idx} style={{
                    flex: 1, display: "flex", alignItems: "center", gap: "4px",
                    background: `${CAT_COLORS[item.cat]}11`,
                    border: `1px solid ${CAT_COLORS[item.cat]}33`,
                    borderRadius: "4px", padding: "4px 6px",
                  }}>
                    <CatIcon cat={item.cat} size={10} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                      {item.name}
                    </span>
                    {item.enhanced && (
                      <span style={{ fontSize: "8px", color: "#ffd700", fontWeight: 700 }}>E</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Builds Accordion */}
      <div style={{ ...styles.card, marginBottom: "16px" }}>
        <div
          onClick={() => setExpandedTeam(!expandedTeam)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
            color: "#888", textTransform: "uppercase", letterSpacing: "1px",
          }}>All Team Builds</span>
          {expandedTeam ? <ChevronUp size={16} color="#888" /> : <ChevronDown size={16} color="#888" />}
        </div>
        {expandedTeam && (
          <div style={{ marginTop: "12px" }}>
            {[...teams.player, ...teams.enemy].map((hero) => {
              const build = allBuilds[hero.id] || [];
              const isEnemy = teams.enemy.some((e) => e.id === hero.id);
              return (
                <div key={hero.id} style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 700,
                      color: hero.id === playerHero.id ? "#e8a535" : isEnemy ? "#ff4757" : "#6dbf6a",
                      textTransform: "uppercase",
                    }}>
                      {hero.id === playerHero.id ? "YOU" : isEnemy ? "ENEMY" : "ALLY"}
                    </span>
                    <span style={{
                      fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600, color: "#ddd",
                    }}>{hero.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>
                    {build.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex", alignItems: "center", gap: "3px",
                        background: `${CAT_COLORS[item.cat]}11`,
                        border: `1px solid ${CAT_COLORS[item.cat]}22`,
                        borderRadius: "3px", padding: "2px 5px",
                      }}>
                        <CatIcon cat={item.cat} size={8} />
                        <span style={{ fontSize: "10px", color: "#bbb" }}>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onPlayAgain}
          style={{
            ...styles.btn(true), flex: 1, padding: "14px",
            fontSize: "16px", letterSpacing: "2px",
            background: "linear-gradient(135deg, #e8a535, #d4943a)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <RotateCcw size={16} />
          Play Again
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN SIMULATION VIEW
// ============================================================
export default function SimulationView() {
  const [phase, setPhase] = useState("setup"); // setup | playing | results
  const [playerHero, setPlayerHero] = useState(null);
  const [isRandomHero, setIsRandomHero] = useState(false);
  const [teams, setTeams] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundPhase, setRoundPhase] = useState("offering"); // offering | summary
  const [offerings, setOfferings] = useState(null);
  const [playerPicks, setPlayerPicks] = useState([null, null, null]);
  const [rerollsLeft, setRerollsLeft] = useState(1);
  const [allBuilds, setAllBuilds] = useState({});
  const [roundHistory, setRoundHistory] = useState([]);
  const [lastRoundSummary, setLastRoundSummary] = useState(null);

  // ---- START SIMULATION ----
  const handleStart = useCallback((selectedHero, isRandom) => {
    let hero = selectedHero;
    if (isRandom || !hero) {
      hero = HEROES[Math.floor(Math.random() * HEROES.length)];
      setIsRandomHero(true);
    } else {
      setIsRandomHero(false);
    }
    setPlayerHero(hero);

    // Build both teams
    const remaining = HEROES.filter((h) => h.id !== hero.id);
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    const teammates = shuffled.slice(0, 3);
    const enemies = shuffled.slice(3, 7);

    const newTeams = {
      player: [hero, ...teammates],
      enemy: enemies,
    };
    setTeams(newTeams);

    // Initialize empty builds
    const builds = {};
    [hero, ...teammates, ...enemies].forEach((h) => {
      builds[h.id] = [];
    });
    setAllBuilds(builds);

    // Set rerolls
    const rerolls = isRandom ? 2 : 1;
    setRerollsLeft(rerolls);
    setCurrentRound(1);
    setRoundPhase("offering");
    setRoundHistory([]);
    setLastRoundSummary(null);

    // Generate offerings
    const newOfferings = generateItemOfferings(1, hero, new Set());
    setOfferings(newOfferings);
    setPlayerPicks([null, null, null]);
    setPhase("playing");
  }, []);

  // ---- ITEM SELECTION ----
  const handleItemSelect = useCallback((groupIndex, itemIndex) => {
    setPlayerPicks((prev) => {
      const next = [...prev];
      next[groupIndex] = next[groupIndex] === itemIndex ? null : itemIndex;
      return next;
    });
  }, []);

  // ---- REROLL ----
  const handleReroll = useCallback(() => {
    if (rerollsLeft <= 0 || !playerHero) return;
    setRerollsLeft((prev) => prev - 1);
    const existingIds = new Set((allBuilds[playerHero.id] || []).map((i) => i.id));
    const newOfferings = generateItemOfferings(currentRound, playerHero, existingIds);
    setOfferings(newOfferings);
    setPlayerPicks([null, null, null]);
  }, [rerollsLeft, playerHero, currentRound, allBuilds]);

  // ---- LOCK IN ----
  const handleLockIn = useCallback(() => {
    if (!offerings || !playerHero || playerPicks.some((p) => p === null)) return;

    // Gather player's picks
    const pickedItems = playerPicks.map((itemIdx, groupIdx) => offerings[groupIdx][itemIdx]);

    // Determine AI optimal picks for scoring comparison
    const aiOptimalPicks = offerings.map((group) => {
      const best = getAIBestPick(group, playerHero, currentRound, allBuilds[playerHero.id] || []);
      return best?.item || group[0];
    });

    const playerScore = pickedItems.reduce(
      (sum, item) => sum + getItemScore(item, playerHero, currentRound, allBuilds[playerHero.id] || []),
      0
    );
    const aiScore = aiOptimalPicks.reduce(
      (sum, item) => sum + getItemScore(item, playerHero, currentRound, allBuilds[playerHero.id] || []),
      0
    );

    // Update round history
    const roundData = {
      round: currentRound,
      offerings,
      playerPicks: pickedItems,
      aiOptimalPicks,
      playerScore,
      aiScore,
    };
    setRoundHistory((prev) => [...prev, roundData]);
    setLastRoundSummary(roundData);

    // Update builds
    const newBuilds = { ...allBuilds };
    newBuilds[playerHero.id] = [...(newBuilds[playerHero.id] || []), ...pickedItems];

    // AI auto-pick for teammates and enemies
    const allOtherHeroes = [...(teams?.player.slice(1) || []), ...(teams?.enemy || [])];
    allOtherHeroes.forEach((hero) => {
      const heroBuild = newBuilds[hero.id] || [];
      const existingIds = new Set(heroBuild.map((i) => i.id));
      const heroOfferings = generateItemOfferings(currentRound, hero, existingIds);
      const aiItems = heroOfferings.map((group) => {
        const best = getAIBestPick(group, hero, currentRound, heroBuild);
        return best?.item || group[0];
      });
      newBuilds[hero.id] = [...heroBuild, ...aiItems];
    });

    setAllBuilds(newBuilds);
    setRoundPhase("summary");
  }, [offerings, playerHero, playerPicks, currentRound, allBuilds, teams]);

  // ---- NEXT ROUND ----
  const handleNextRound = useCallback(() => {
    if (currentRound >= 5) {
      setPhase("results");
      return;
    }

    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    setRoundPhase("offering");

    // Reset rerolls
    const rerolls = isRandomHero && nextRound <= 2 ? 2 : 1;
    setRerollsLeft(rerolls);

    // Generate new offerings
    const existingIds = new Set((allBuilds[playerHero.id] || []).map((i) => i.id));
    const newOfferings = generateItemOfferings(nextRound, playerHero, existingIds);
    setOfferings(newOfferings);
    setPlayerPicks([null, null, null]);
    setLastRoundSummary(null);
  }, [currentRound, isRandomHero, allBuilds, playerHero]);

  // ---- PLAY AGAIN ----
  const handlePlayAgain = useCallback(() => {
    setPhase("setup");
    setPlayerHero(null);
    setIsRandomHero(false);
    setTeams(null);
    setCurrentRound(1);
    setRoundPhase("offering");
    setOfferings(null);
    setPlayerPicks([null, null, null]);
    setRerollsLeft(1);
    setAllBuilds({});
    setRoundHistory([]);
    setLastRoundSummary(null);
  }, []);

  // ============================================================
  // RENDER
  // ============================================================

  if (phase === "setup") {
    return <SetupScreen onStart={handleStart} />;
  }

  if (phase === "results") {
    return (
      <ResultsScreen
        roundHistory={roundHistory}
        playerHero={playerHero}
        teams={teams}
        allBuilds={allBuilds}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  // ---- PLAYING PHASE ----
  const allPicked = playerPicks.every((p) => p !== null);
  const roundInfo = ROUND_INFO[currentRound];

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "12px 16px 24px", maxWidth: "900px", margin: "0 auto" }}>
      {/* Team Lineup */}
      {teams && <TeamLineup teams={teams} playerHero={playerHero} allBuilds={allBuilds} />}

      {/* Round Header */}
      <div style={{
        ...styles.card, padding: "10px 12px", marginBottom: "12px",
        border: "1px solid rgba(232,165,53,0.2)",
        background: "linear-gradient(180deg, rgba(232,165,53,0.06) 0%, rgba(19,21,27,0.9) 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Flame size={16} color="#e8a535" />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", fontWeight: 700,
              color: "#e8a535", textTransform: "uppercase",
            }}>Round {currentRound}/5</span>
            {/* Round progress dots */}
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((r) => (
                <div key={r} style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: r < currentRound ? "#e8a535"
                    : r === currentRound ? "#e8a535"
                    : "rgba(255,255,255,0.1)",
                  opacity: r <= currentRound ? 1 : 0.4,
                }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ fontSize: "11px", color: "#888" }}>
              <strong style={{ color: "#b87fd4" }}>{roundInfo.abilityPoints}</strong> AP
            </span>
            <span style={{ fontSize: "11px", color: "#888" }}>
              <strong style={{ color: "#6dbf6a" }}>{roundInfo.boons}</strong> Boons
            </span>
            <span style={{ fontSize: "11px", color: "#888" }}>
              Items: <strong style={{ color: "#e8a535" }}>{(allBuilds[playerHero?.id] || []).length}/15</strong>
            </span>
          </div>
        </div>
      </div>

      {roundPhase === "offering" && offerings && (
        <>
          {/* Offering Groups */}
          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
            color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
          }}>
            Pick 1 item from each group
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {offerings.map((group, gi) => (
              <OfferingGroup
                key={gi}
                group={group}
                groupIndex={gi}
                selectedIndex={playerPicks[gi]}
                onSelect={handleItemSelect}
              />
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleReroll}
              disabled={rerollsLeft <= 0}
              style={{
                ...styles.btn(rerollsLeft > 0),
                display: "flex", alignItems: "center", gap: "6px",
                opacity: rerollsLeft > 0 ? 1 : 0.4,
                cursor: rerollsLeft > 0 ? "pointer" : "not-allowed",
                background: rerollsLeft > 0 ? "rgba(74,144,217,0.15)" : "rgba(255,255,255,0.03)",
                borderColor: rerollsLeft > 0 ? "rgba(74,144,217,0.4)" : "rgba(255,255,255,0.08)",
                color: rerollsLeft > 0 ? "#4a90d9" : "#555",
              }}
            >
              <RotateCcw size={14} />
              Reroll ({rerollsLeft})
            </button>
            <button
              onClick={handleLockIn}
              disabled={!allPicked}
              style={{
                ...styles.btn(allPicked),
                flex: 1, padding: "12px",
                fontSize: "15px", letterSpacing: "2px",
                background: allPicked
                  ? "linear-gradient(135deg, #e8a535, #d4943a)"
                  : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                opacity: allPicked ? 1 : 0.5,
                cursor: allPicked ? "pointer" : "not-allowed",
              }}
            >
              <Check size={16} />
              Lock In Picks
            </button>
          </div>
        </>
      )}

      {roundPhase === "summary" && lastRoundSummary && (
        <div>
          {/* Round Summary */}
          <div style={{
            ...styles.card, marginBottom: "12px",
            border: "1px solid rgba(232,165,53,0.2)",
            background: "linear-gradient(180deg, rgba(232,165,53,0.04) 0%, rgba(19,21,27,0.95) 100%)",
          }}>
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700,
              color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
            }}>
              Round {currentRound} Complete
            </div>

            {/* Player picks vs AI picks */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", marginBottom: "12px" }}>
              {[0, 1, 2].map((gi) => {
                const playerItem = lastRoundSummary.playerPicks[gi];
                const aiItem = lastRoundSummary.aiOptimalPicks[gi];
                const isMatch = playerItem?.id === aiItem?.id;
                return (
                  <div key={gi} style={{
                    ...styles.card, padding: "8px",
                    border: isMatch
                      ? "1px solid rgba(107,191,106,0.3)"
                      : "1px solid rgba(255,71,87,0.2)",
                    background: isMatch
                      ? "rgba(107,191,106,0.06)"
                      : "rgba(255,71,87,0.04)",
                  }}>
                    <div style={{
                      fontSize: "10px", fontWeight: 700, color: "#666",
                      textTransform: "uppercase", marginBottom: "6px",
                    }}>
                      Group {gi + 1} {isMatch && <Check size={10} color="#6dbf6a" />}
                    </div>
                    {/* Your pick */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      background: `${CAT_COLORS[playerItem.cat]}15`,
                      border: `1px solid ${CAT_COLORS[playerItem.cat]}33`,
                      borderRadius: "4px", padding: "4px 6px", marginBottom: "4px",
                    }}>
                      <CatIcon cat={playerItem.cat} size={10} />
                      <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                        {playerItem.name}
                      </span>
                      <span style={{ fontSize: "9px", color: "#e8a535", fontWeight: 700 }}>YOU</span>
                    </div>
                    {/* AI pick (if different) */}
                    {!isMatch && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        background: "rgba(74,144,217,0.08)",
                        border: "1px solid rgba(74,144,217,0.2)",
                        borderRadius: "4px", padding: "4px 6px",
                      }}>
                        <CatIcon cat={aiItem.cat} size={10} />
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600, color: "#aaa", flex: 1 }}>
                          {aiItem.name}
                        </span>
                        <span style={{ fontSize: "9px", color: "#4a90d9", fontWeight: 700 }}>AI</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score comparison */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.02)", borderRadius: "6px", padding: "8px",
            }}>
              <span style={{ fontSize: "12px", color: "#888" }}>Round Score:</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
                color: "#e8a535",
              }}>{lastRoundSummary.playerScore.toFixed(1)}</span>
              <span style={{ fontSize: "11px", color: "#555" }}>vs</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 700,
                color: "#4a90d9",
              }}>{lastRoundSummary.aiScore.toFixed(1)} (AI)</span>
              <span style={{
                fontSize: "12px", fontWeight: 600, marginLeft: "auto",
                color: lastRoundSummary.playerScore >= lastRoundSummary.aiScore ? "#6dbf6a" : "#ff4757",
              }}>
                {lastRoundSummary.aiScore > 0
                  ? `${Math.round((lastRoundSummary.playerScore / lastRoundSummary.aiScore) * 100)}%`
                  : "100%"}
              </span>
            </div>
          </div>

          {/* Next Round Button */}
          <button
            onClick={handleNextRound}
            style={{
              ...styles.btn(true), width: "100%", padding: "14px",
              fontSize: "16px", letterSpacing: "2px",
              background: "linear-gradient(135deg, #e8a535, #d4943a)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            <ArrowRight size={16} />
            {currentRound >= 5 ? "View Results" : `Next Round (${currentRound + 1}/5)`}
          </button>
        </div>
      )}
    </div>
  );
}
