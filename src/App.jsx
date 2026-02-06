import { useState, useEffect } from "react";
import { Swords, Crosshair } from "lucide-react";
import { styles, FONT_URL } from "./shared.jsx";
import PickerView from "./PickerView.jsx";
import SimulationView from "./SimulationView.jsx";

export default function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash;
    if (hash === "#/simulation") return "simulation";
    return "picker";
  });

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      setPage(hash === "#/simulation" ? "simulation" : "picker");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Load Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_URL;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const navigate = (target) => {
    window.location.hash = target === "simulation" ? "#/simulation" : "#/";
  };

  return (
    <div style={styles.app}>
      {/* Atmospheric background effect */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 20% 0%, rgba(232,165,53,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(183,127,212,0.03) 0%, transparent 50%)",
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h1 style={styles.title}>Deadlock Brawl Picker</h1>
            <p style={styles.subtitle}>
              {page === "simulation" ? "Street Brawl Simulation" : "Street Brawl Item Priority Companion"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "3px" }}>
            <button
              onClick={() => navigate("picker")}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "6px", cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.5px",
                color: page === "picker" ? "#0a0b0f" : "#888",
                background: page === "picker" ? "linear-gradient(135deg, #e8a535, #d4943a)" : "transparent",
                border: "none", transition: "all 0.15s",
              }}
            >
              <Swords size={14} />
              Picker
            </button>
            <button
              onClick={() => navigate("simulation")}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 14px", borderRadius: "6px", cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif", fontSize: "13px", fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.5px",
                color: page === "simulation" ? "#0a0b0f" : "#888",
                background: page === "simulation" ? "linear-gradient(135deg, #e8a535, #d4943a)" : "transparent",
                border: "none", transition: "all 0.15s",
              }}
            >
              <Crosshair size={14} />
              Simulation
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {page === "picker" && <PickerView />}
      {page === "simulation" && <SimulationView />}
    </div>
  );
}
