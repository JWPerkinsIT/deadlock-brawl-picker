import { useState, useMemo, useCallback } from "react";
import { Search, RotateCcw, Zap, Target, Trophy, Info, X, Check, ArrowRight, Flame } from "lucide-react";
import { HEROES, ITEMS } from "./data.js";
import { getItemRating, getItemScore, CAT_COLORS, CAT_LABELS, RATING_COLORS, TIER_NAMES, ROUND_TIER_WEIGHTS } from "./scoring.js";
import { styles, CatIcon, ItemCard } from "./shared.jsx";

// ---- HERO SELECTOR ----
export function HeroSelector({ selectedHero, onSelect }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const filtered = HEROES.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const order = { S: 0, A: 1, B: 2, C: 3, D: 4 };
    return (order[a.brawlTier] || 4) - (order[b.brawlTier] || 4);
  });

  return (
    <div style={{ ...styles.card, padding: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: expanded ? "10px" : "0" }}>
        <Target size={16} color="#e8a535" />
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
          color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
        }}>Hero</span>
        {selectedHero && !expanded && (
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700,
            color: "#fff", flex: 1,
          }}>{selectedHero.name}</span>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ ...styles.btn(expanded), fontSize: "11px", padding: "4px 10px" }}
        >
          {expanded ? "Close" : "Change"}
        </button>
      </div>
      {expanded && (
        <>
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
            gap: "4px", maxHeight: "200px", overflowY: "auto",
            scrollbarWidth: "thin", scrollbarColor: "#333 transparent",
          }}>
            {filtered.map((h) => (
              <button
                key={h.id}
                onClick={() => { onSelect(h); setExpanded(false); setSearch(""); }}
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
        </>
      )}
    </div>
  );
}

// ---- ROUND TRACKER ----
export function RoundTracker({ round, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      <Flame size={14} color="#e8a535" />
      <span style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
        color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginRight: "4px",
      }}>Round</span>
      {[1, 2, 3, 4, 5].map((r) => (
        <button
          key={r}
          onClick={() => onSelect(r)}
          style={{
            fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "15px",
            width: "34px", height: "34px", borderRadius: "6px", cursor: "pointer",
            color: round === r ? "#0a0b0f" : "#888",
            background: round === r
              ? "linear-gradient(135deg, #e8a535, #d4943a)"
              : "rgba(255,255,255,0.04)",
            border: round === r ? "none" : "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.15s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >{r}</button>
      ))}
    </div>
  );
}

// ---- TAB NAV ----
function TabNav({ tab, onSelect }) {
  const tabs = [
    { id: "tierlist", label: "Tier List", icon: Trophy },
    { id: "advisor", label: "Pick Advisor", icon: Target },
    { id: "buildpath", label: "Build Path", icon: Zap },
  ];
  return (
    <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "3px" }}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            gap: "6px", padding: "8px 12px", borderRadius: "6px", cursor: "pointer",
            fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
            textTransform: "uppercase", letterSpacing: "0.5px",
            color: tab === id ? "#0a0b0f" : "#888",
            background: tab === id ? "linear-gradient(135deg, #e8a535, #d4943a)" : "transparent",
            border: "none", transition: "all 0.15s",
          }}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}

// ---- TIER LIST VIEW ----
function TierListView({ hero, round }) {
  const [catFilter, setCatFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const ratedItems = useMemo(() => {
    return ITEMS.map((item) => ({
      ...item,
      rating: getItemRating(item, hero),
      score: getItemScore(item, hero, round),
    }))
      .filter((i) => catFilter === "all" || i.cat === catFilter)
      .filter((i) => tierFilter === "all" || i.tier === Number(tierFilter))
      .sort((a, b) => {
        const rOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
        if (rOrder[a.rating] !== rOrder[b.rating]) return rOrder[a.rating] - rOrder[b.rating];
        return b.score - a.score;
      });
  }, [hero, round, catFilter, tierFilter]);

  const grouped = useMemo(() => {
    const groups = { S: [], A: [], B: [], C: [], D: [] };
    ratedItems.forEach((i) => {
      if (groups[i.rating]) groups[i.rating].push(i);
    });
    return groups;
  }, [ratedItems]);

  return (
    <div>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "12px" }}>
        <button style={styles.btn(catFilter === "all")} onClick={() => setCatFilter("all")}>All</button>
        {["weapon", "vitality", "spirit"].map((c) => (
          <button key={c} style={{
            ...styles.btn(catFilter === c),
            color: catFilter === c ? "#0a0b0f" : CAT_COLORS[c],
            background: catFilter === c ? CAT_COLORS[c] : "rgba(255,255,255,0.05)",
            borderColor: catFilter === c ? CAT_COLORS[c] : "rgba(255,255,255,0.1)",
          }} onClick={() => setCatFilter(c)}>
            {CAT_LABELS[c]}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600,
            color: "#999", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
            padding: "4px 8px", cursor: "pointer", textTransform: "uppercase",
          }}
        >
          <option value="all">All Tiers</option>
          <option value="1">Tier I (800)</option>
          <option value="2">Tier II (1600)</option>
          <option value="3">Tier III (3200)</option>
          <option value="4">Tier IV (6400)</option>
          <option value="5">Legendary</option>
        </select>
      </div>

      {!hero && (
        <div style={{
          ...styles.card, textAlign: "center", padding: "24px",
          border: "1px dashed rgba(232,165,53,0.3)",
        }}>
          <Info size={20} color="#e8a535" style={{ marginBottom: "8px" }} />
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 600, color: "#e8a535", margin: "0 0 4px" }}>
            Select a Hero
          </p>
          <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
            Item ratings are personalized per hero. Pick your hero above for tailored recommendations.
          </p>
        </div>
      )}

      {Object.entries(grouped).map(([rating, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={rating} style={{ marginBottom: "16px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px",
              paddingBottom: "4px", borderBottom: `2px solid ${RATING_COLORS[rating]}33`,
            }}>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "22px", fontWeight: 700,
                color: RATING_COLORS[rating],
              }}>{rating}</span>
              <span style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 500,
                color: "#888", textTransform: "uppercase", letterSpacing: "1px",
              }}>
                {rating === "S" ? "Always Pick" :
                 rating === "A" ? "Strong Pick" :
                 rating === "B" ? "Solid Choice" :
                 rating === "C" ? "Situational" : "Avoid"}
              </span>
              <span style={{ fontSize: "12px", color: "#555", marginLeft: "auto" }}>
                {items.length} items
              </span>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "6px",
            }}>
              {items.map((item) => (
                <ItemCard key={item.id} item={item} hero={hero} round={round} compact={false} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- PICK ADVISOR VIEW ----
function PickAdvisorView({ hero, round, currentBuild, onAddToBuild }) {
  const [groups, setGroups] = useState([[], [], []]);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const addToGroup = (item) => {
    if (groups[activeGroup].length >= 3) return;
    if (groups.flat().some((i) => i.id === item.id)) return;
    const newGroups = groups.map((g, i) => i === activeGroup ? [...g, item] : g);
    setGroups(newGroups);
    setSearch("");
    const nextEmpty = newGroups.findIndex((g) => g.length < 3);
    if (nextEmpty >= 0) setActiveGroup(nextEmpty);
  };

  const removeFromGroup = (groupIdx, itemIdx) => {
    const newGroups = groups.map((g, i) =>
      i === groupIdx ? g.filter((_, j) => j !== itemIdx) : g
    );
    setGroups(newGroups);
    setShowResults(false);
  };

  const clearAll = () => {
    setGroups([[], [], []]);
    setShowResults(false);
    setActiveGroup(0);
  };

  const allFilled = groups.every((g) => g.length === 3);

  const recommendations = useMemo(() => {
    if (!allFilled) return null;
    const scored = groups.map((group) =>
      group.map((item) => ({
        ...item,
        score: getItemScore(item, hero, round, currentBuild),
        rating: getItemRating(item, hero),
      })).sort((a, b) => b.score - a.score)
    );
    const picks = scored.map((g) => g[0]);
    const totalScore = picks.reduce((sum, p) => sum + p.score, 0);
    const avgExpected = hero ? 18 : 15;
    const shouldReroll = totalScore < avgExpected * 0.7;
    return { scored, picks, totalScore, shouldReroll };
  }, [groups, hero, round, currentBuild, allFilled]);

  const searchResults = useMemo(() => {
    if (!search) return [];
    return ITEMS.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) &&
      !groups.flat().some((g) => g.id === i.id)
    ).slice(0, 12);
  }, [search, groups]);

  return (
    <div>
      {!hero && (
        <div style={{
          ...styles.card, textAlign: "center", padding: "20px", marginBottom: "12px",
          border: "1px dashed rgba(232,165,53,0.3)",
        }}>
          <Info size={18} color="#e8a535" />
          <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, color: "#e8a535", margin: "6px 0 2px" }}>
            Select a hero for personalized recommendations
          </p>
          <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>General ratings will be used otherwise</p>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 500,
          color: "#888", margin: 0, flex: 1,
        }}>
          Add the 9 items you were offered (3 per group) to get a recommendation
        </p>
        <button onClick={clearAll} style={{ ...styles.btn(false), fontSize: "11px", padding: "4px 10px", display: "flex", gap: "4px", alignItems: "center" }}>
          <RotateCcw size={11} /> Clear
        </button>
      </div>

      <div style={{ position: "relative", marginBottom: "12px" }}>
        <Search size={14} color="#666" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          style={styles.input}
          placeholder="Search items to add..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20,
            background: "#1a1c24", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0 0 8px 8px", maxHeight: "240px", overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}>
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => addToGroup(item)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 12px", cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "background 0.1s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(232,165,53,0.08)"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <CatIcon cat={item.cat} size={14} />
                <span style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", flex: 1 }}>
                  {item.name}
                </span>
                <span style={styles.catBadge(item.cat)}>{CAT_LABELS[item.cat]}</span>
                <span style={styles.tierBadge(item.tier)}>
                  {item.tier === 5 ? "L" : `T${item.tier}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
        {groups.map((group, gi) => (
          <div
            key={gi}
            onClick={() => setActiveGroup(gi)}
            style={{
              ...styles.card,
              border: activeGroup === gi
                ? "2px solid rgba(232,165,53,0.5)"
                : "1px solid rgba(255,255,255,0.06)",
              padding: "10px",
              cursor: "pointer",
              minHeight: "140px",
            }}
          >
            <div style={{
              fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700,
              color: activeGroup === gi ? "#e8a535" : "#666",
              textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
            }}>
              Group {gi + 1} ({group.length}/3)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {group.map((item, ii) => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  background: (showResults && recommendations?.picks.some((p) => p.id === item.id))
                    ? "rgba(232,165,53,0.12)" : "rgba(255,255,255,0.03)",
                  border: (showResults && recommendations?.picks.some((p) => p.id === item.id))
                    ? "1px solid rgba(232,165,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "4px", padding: "4px 6px",
                }}>
                  <CatIcon cat={item.cat} size={12} />
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                    {item.name}
                  </span>
                  {showResults && recommendations?.picks.some((p) => p.id === item.id) && (
                    <Check size={12} color="#e8a535" />
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFromGroup(gi, ii); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#555", padding: "0 2px", display: "flex",
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {group.length < 3 && (
                <div style={{
                  border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "4px",
                  padding: "4px 6px", textAlign: "center",
                  fontSize: "11px", color: "#444",
                }}>
                  {activeGroup === gi ? "Search above to add" : "Click to select"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {allFilled && (
        <button
          onClick={() => setShowResults(true)}
          style={{
            ...styles.btn(true), width: "100%", padding: "12px",
            fontSize: "16px", letterSpacing: "2px", marginBottom: "12px",
            background: "linear-gradient(135deg, #e8a535, #d4943a)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          <Target size={18} /> Analyze Picks
        </button>
      )}

      {showResults && recommendations && (
        <div style={{
          ...styles.card,
          border: "1px solid rgba(232,165,53,0.3)",
          background: "linear-gradient(180deg, rgba(232,165,53,0.06) 0%, rgba(19,21,27,0.95) 100%)",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "18px", fontWeight: 700,
            color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px",
          }}>
            Recommended Picks
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
            {recommendations.picks.map((item) => (
              <ItemCard key={item.id} item={item} hero={hero} round={round} recommended compact currentBuild={currentBuild} />
            ))}
          </div>
          {recommendations.shouldReroll && (
            <div style={{
              background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.3)",
              borderRadius: "6px", padding: "10px 12px", marginBottom: "12px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <RotateCcw size={16} color="#ff4757" />
              <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600, color: "#ff4757" }}>
                Consider using your reroll - these options are below average for {hero?.name || "your hero"}
              </span>
            </div>
          )}
          <button
            onClick={() => {
              recommendations.picks.forEach((item) => onAddToBuild(item));
              clearAll();
            }}
            style={{ ...styles.btn(false), width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          >
            <ArrowRight size={14} /> Lock in picks and advance round
          </button>
        </div>
      )}
    </div>
  );
}

// ---- BUILD PATH VIEW ----
function BuildPathView({ hero, round, currentBuild, onRemoveFromBuild, onClearBuild }) {
  const catCounts = useMemo(() => {
    const counts = { weapon: 0, vitality: 0, spirit: 0 };
    currentBuild.forEach((item) => { counts[item.cat]++; });
    return counts;
  }, [currentBuild]);

  const totalItems = currentBuild.length;
  const maxPerRound = 3;

  const getAdvice = () => {
    if (!hero) return "Select a hero for personalized build path guidance.";
    const isGun = hero.playstyle.includes("gun") || hero.playstyle.includes("sniper");
    const isSpirit = hero.playstyle.includes("spirit") || hero.playstyle.includes("burst") || hero.playstyle.includes("aoe");
    const isTank = hero.playstyle.includes("tank");
    const isSupport = hero.playstyle.includes("support");
    const isMelee = hero.playstyle.includes("melee") || hero.playstyle.includes("assassin");

    if (isGun) return `${hero.name} benefits from heavy Weapon investment. Aim for 7+ Weapon items across rounds, with 4-5 Vitality for survivability and 2-3 Spirit for utility.`;
    if (isSpirit) return `${hero.name} scales hard with Spirit items. Prioritize 7+ Spirit items for ability power, 4-5 Vitality for sustain, and 2-3 Weapon for base damage.`;
    if (isTank) return `${hero.name} thrives with Vitality. Target 7+ Vitality items for tankiness, with even split of Weapon and Spirit (3-4 each) for damage.`;
    if (isSupport) return `${hero.name} excels with mixed Spirit and Vitality. Aim for 5-6 Spirit, 5-6 Vitality, and 2-3 Weapon items.`;
    if (isMelee) return `${hero.name} needs both damage and durability. Balance 5-6 Weapon items (especially melee/close-range), 5-6 Vitality, and 2-3 Spirit.`;
    return `${hero.name} benefits from a balanced build. Adjust based on what the mode offers you each round.`;
  };

  return (
    <div>
      <div style={{
        ...styles.card, marginBottom: "12px",
        border: "1px solid rgba(232,165,53,0.15)",
        background: "linear-gradient(180deg, rgba(232,165,53,0.04) 0%, rgba(19,21,27,0.9) 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Zap size={16} color="#e8a535" />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "16px", fontWeight: 700, color: "#e8a535" }}>
            Build Strategy
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#aaa", margin: 0, lineHeight: 1.5 }}>
          {getAdvice()}
        </p>
      </div>

      <div style={{ ...styles.card, marginBottom: "12px" }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
          color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
        }}>
          Item Distribution ({totalItems}/{maxPerRound * 5} slots)
        </div>
        <div style={{ display: "flex", gap: "2px", height: "28px", borderRadius: "6px", overflow: "hidden", marginBottom: "8px" }}>
          {totalItems === 0 ? (
            <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", color: "#555" }}>No items yet</span>
            </div>
          ) : (
            Object.entries(catCounts).map(([cat, count]) => (
              count > 0 && (
                <div key={cat} style={{
                  flex: count, background: `${CAT_COLORS[cat]}44`,
                  borderLeft: `3px solid ${CAT_COLORS[cat]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s",
                }}>
                  <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700, color: CAT_COLORS[cat] }}>
                    {count}
                  </span>
                </div>
              )
            ))
          )}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {Object.entries(catCounts).map(([cat, count]) => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: CAT_COLORS[cat] }} />
              <span style={{ fontSize: "12px", color: "#888" }}>{CAT_LABELS[cat]}: {count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...styles.card }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px",
        }}>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif", fontSize: "14px", fontWeight: 600,
            color: "#e8a535", textTransform: "uppercase", letterSpacing: "1px",
          }}>Your Build</span>
          {currentBuild.length > 0 && (
            <button onClick={onClearBuild} style={{ ...styles.btn(false), fontSize: "10px", padding: "3px 8px" }}>
              Clear Build
            </button>
          )}
        </div>

        {[1, 2, 3, 4, 5].map((r) => {
          const roundItems = currentBuild.slice((r - 1) * 3, r * 3);
          const isCurrentRound = r === round;
          return (
            <div key={r} style={{
              marginBottom: "8px", padding: "8px",
              background: isCurrentRound ? "rgba(232,165,53,0.06)" : "transparent",
              borderRadius: "6px",
              border: isCurrentRound ? "1px solid rgba(232,165,53,0.15)" : "1px solid transparent",
            }}>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif", fontSize: "12px", fontWeight: 700,
                color: isCurrentRound ? "#e8a535" : "#555",
                textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px",
              }}>
                Round {r} {isCurrentRound && " (current)"}
                <span style={{ color: "#444", fontWeight: 500, marginLeft: "6px" }}>
                  - Expect T{r <= 2 ? "I-II" : r <= 3 ? "II-III" : "III-IV"} items
                  {r >= 4 ? " + legendaries" : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {roundItems.length > 0 ? roundItems.map((item, idx) => (
                  <div key={item.id} style={{
                    flex: 1, display: "flex", alignItems: "center", gap: "4px",
                    background: `${CAT_COLORS[item.cat]}11`,
                    border: `1px solid ${CAT_COLORS[item.cat]}33`,
                    borderRadius: "4px", padding: "4px 6px",
                  }}>
                    <CatIcon cat={item.cat} size={12} />
                    <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "11px", fontWeight: 600, color: "#ddd", flex: 1 }}>
                      {item.name}
                    </span>
                    <button
                      onClick={() => onRemoveFromBuild((r - 1) * 3 + idx)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 0, display: "flex" }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                )) : (
                  [0, 1, 2].map((i) => (
                    <div key={i} style={{
                      flex: 1, border: "1px dashed rgba(255,255,255,0.06)",
                      borderRadius: "4px", padding: "4px 6px", textAlign: "center",
                    }}>
                      <span style={{ fontSize: "10px", color: "#333" }}>Empty</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PICKER VIEW
// ============================================================
export default function PickerView() {
  const [selectedHero, setSelectedHero] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [activeTab, setActiveTab] = useState("tierlist");
  const [currentBuild, setCurrentBuild] = useState([]);

  const addToBuild = useCallback((item) => {
    setCurrentBuild((prev) => {
      if (prev.length >= 15) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromBuild = useCallback((idx) => {
    setCurrentBuild((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearBuild = useCallback(() => setCurrentBuild([]), []);

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "12px 16px 24px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <HeroSelector selectedHero={selectedHero} onSelect={setSelectedHero} />
        </div>
        <RoundTracker round={currentRound} onSelect={setCurrentRound} />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <TabNav tab={activeTab} onSelect={setActiveTab} />
      </div>

      {activeTab === "tierlist" && (
        <TierListView hero={selectedHero} round={currentRound} />
      )}
      {activeTab === "advisor" && (
        <PickAdvisorView
          hero={selectedHero}
          round={currentRound}
          currentBuild={currentBuild}
          onAddToBuild={addToBuild}
        />
      )}
      {activeTab === "buildpath" && (
        <BuildPathView
          hero={selectedHero}
          round={currentRound}
          currentBuild={currentBuild}
          onRemoveFromBuild={removeFromBuild}
          onClearBuild={clearBuild}
        />
      )}
    </div>
  );
}
