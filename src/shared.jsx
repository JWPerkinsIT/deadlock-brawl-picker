import { Swords, Shield, Sparkles, Crown, Check } from "lucide-react";
import { getItemRating, getItemScore, CAT_COLORS, CAT_LABELS, RATING_COLORS, TIER_NAMES } from "./scoring.js";

// ============================================================
// FONT
// ============================================================
export const FONT_URL = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@300;400;500;600;700&display=swap";

// ============================================================
// STYLES (embedded for artifact)
// ============================================================
export const styles = {
  app: {
    fontFamily: "'Barlow', sans-serif",
    background: "linear-gradient(180deg, #07080c 0%, #0d0f15 50%, #0a0c11 100%)",
    color: "#e2e0dc",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(180deg, rgba(232,165,53,0.08) 0%, transparent 100%)",
    borderBottom: "1px solid rgba(232,165,53,0.15)",
    padding: "16px 20px",
    position: "relative",
    zIndex: 10,
  },
  title: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#e8a535",
    letterSpacing: "2px",
    textTransform: "uppercase",
    margin: 0,
    lineHeight: 1.1,
  },
  subtitle: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "13px",
    fontWeight: 500,
    color: "rgba(232,165,53,0.6)",
    letterSpacing: "3px",
    textTransform: "uppercase",
    margin: 0,
  },
  card: {
    background: "rgba(19,21,27,0.9)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    padding: "16px",
    backdropFilter: "blur(10px)",
  },
  glowCard: (color) => ({
    background: "rgba(19,21,27,0.95)",
    border: `1px solid ${color}33`,
    borderRadius: "8px",
    padding: "12px",
    boxShadow: `0 0 20px ${color}11`,
    transition: "all 0.2s ease",
  }),
  ratingBadge: (rating) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    color: RATING_COLORS[rating] || "#666",
    background: `${RATING_COLORS[rating] || "#666"}18`,
    border: `1px solid ${RATING_COLORS[rating] || "#666"}44`,
    borderRadius: "4px",
    padding: "2px 8px",
    minWidth: "28px",
    textAlign: "center",
    display: "inline-block",
  }),
  catBadge: (cat) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: CAT_COLORS[cat],
    background: `${CAT_COLORS[cat]}15`,
    border: `1px solid ${CAT_COLORS[cat]}33`,
    borderRadius: "3px",
    padding: "1px 6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),
  tierBadge: (tier) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    color: tier === 5 ? "#e8a535" : "#999",
    background: tier === 5 ? "rgba(232,165,53,0.15)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${tier === 5 ? "rgba(232,165,53,0.3)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "3px",
    padding: "1px 6px",
  }),
  btn: (active) => ({
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: active ? "#0a0b0f" : "#999",
    background: active ? "#e8a535" : "rgba(255,255,255,0.05)",
    border: `1px solid ${active ? "#e8a535" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "6px",
    padding: "6px 14px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
    whiteSpace: "nowrap",
  }),
  input: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "14px",
    color: "#e2e0dc",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "8px 12px 8px 36px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
};

// ============================================================
// SHARED COMPONENTS
// ============================================================

export function CatIcon({ cat, size = 16 }) {
  const color = CAT_COLORS[cat];
  if (cat === "weapon") return <Swords size={size} color={color} />;
  if (cat === "vitality") return <Shield size={size} color={color} />;
  return <Sparkles size={size} color={color} />;
}

export function ItemCard({ item, hero, round, onClick, selected, recommended, compact, currentBuild }) {
  const rating = getItemRating(item, hero);
  return (
    <div
      onClick={onClick}
      style={{
        ...styles.glowCard(
          recommended ? "#e8a535" : selected ? "#4a90d9" : CAT_COLORS[item.cat]
        ),
        cursor: onClick ? "pointer" : "default",
        border: recommended
          ? "2px solid #e8a535"
          : selected
          ? "2px solid #4a90d9"
          : `1px solid ${CAT_COLORS[item.cat]}22`,
        padding: compact ? "8px 10px" : "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {item.legendary && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, transparent 50%, rgba(232,165,53,0.3) 50%)",
          width: "32px", height: "32px",
        }}>
          <Crown size={10} color="#e8a535" style={{ position: "absolute", top: "4px", right: "4px" }} />
        </div>
      )}
      {recommended && (
        <div style={{
          position: "absolute", top: "4px", right: "4px",
          background: "#e8a535", borderRadius: "50%", width: "20px", height: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Check size={12} color="#0a0b0f" strokeWidth={3} />
        </div>
      )}
      {item.enhanced && (
        <div style={{
          position: "absolute", top: item.legendary ? "4px" : "4px", left: "4px",
          fontSize: "10px", fontWeight: 700, color: "#ffd700",
          background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)",
          borderRadius: "3px", padding: "1px 5px", textTransform: "uppercase",
        }}>Enhanced</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: compact ? "2px" : "6px" }}>
        <CatIcon cat={item.cat} size={compact ? 14 : 16} />
        <span style={{
          fontFamily: "'Rajdhani', sans-serif", fontWeight: 600,
          fontSize: compact ? "13px" : "15px", color: "#fff",
          flex: 1, lineHeight: 1.2,
        }}>
          {item.name}
        </span>
        <span style={styles.ratingBadge(rating)}>{rating}</span>
      </div>
      {!compact && (
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={styles.catBadge(item.cat)}>{CAT_LABELS[item.cat]}</span>
          <span style={styles.tierBadge(item.tier)}>
            {item.tier === 5 ? "Legendary" : `T${TIER_NAMES[item.tier]}`}
          </span>
          {item.active && (
            <span style={{
              fontSize: "10px", fontWeight: 600, color: "#4a90d9",
              background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.3)",
              borderRadius: "3px", padding: "1px 5px", textTransform: "uppercase",
            }}>Active</span>
          )}
        </div>
      )}
      {!compact && item.desc && (
        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#888", lineHeight: 1.3 }}>
          {item.desc}
        </p>
      )}
    </div>
  );
}
