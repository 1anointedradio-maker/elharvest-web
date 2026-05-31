"use client";

import { useState } from "react";

export default function ValidationPage() {
  const [rules, setRules] = useState({
    vwap: false,
    cloud: false,
    volume: false,
    window: false,
  });

  const [direction, setDirection] = useState("");

  const completed = Object.values(rules).filter(Boolean).length;
  const score = Math.round((completed / 4) * 100);
  const validated = completed === 4 && direction !== "";

  const grade =
    validated ? "A+" :
    score === 75 ? "B" :
    score === 50 ? "C" :
    score === 25 ? "D" :
    "F";

  const timestamp = new Date().toLocaleString();

  const rulesList = [
    ["vwap", "VWAP Confirmed"],
    ["cloud", "Cloud Confirmed"],
    ["volume", "Volume Confirmed"],
    ["window", "Trading Window Confirmed"],
  ];

  const toggleRule = (key) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.hero}>
          <div style={styles.badge}>EL HARVEST</div>
          <h1 style={styles.title}>Trade Validation</h1>
          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.panel}>
          <h2 style={styles.sectionTitle}>Rule Confirmation</h2>

          <div style={styles.grid}>
            {rulesList.map(([key, label]) => {
              const active = rules[key];

              return (
                <button
                  key={key}
                  onClick={() => toggleRule(key)}
                  style={{
                    ...styles.ruleCard,
                    borderColor: active ? "#2E8B57" : "#C8A24A",
                    background: active ? "#E8F7EC" : "#FFF8E8",
                    boxShadow: active
                      ? "0 0 18px rgba(46, 139, 87, 0.35)"
                      : "none",
                  }}
                >
                  <span style={styles.check}>{active ? "✓" : "○"}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section style={styles.panel}>
          <h2 style={styles.sectionTitle}>Trade Direction</h2>

          <div style={styles.directionGrid}>
            <button
              onClick={() => setDirection("CALL")}
              style={{
                ...styles.directionButton,
                background:
                  direction === "CALL"
                    ? "linear-gradient(135deg, #2E8B57, #1F6B43)"
                    : "#FFF8E8",
                color: direction === "CALL" ? "#fff" : "#111",
                borderColor: direction === "CALL" ? "#2E8B57" : "#C8A24A",
              }}
            >
              CALL
            </button>

            <button
              onClick={() => setDirection("PUT")}
              style={{
                ...styles.directionButton,
                background:
                  direction === "PUT"
                    ? "linear-gradient(135deg, #B22222, #7A1717)"
                    : "#FFF8E8",
                color: direction === "PUT" ? "#fff" : "#111",
                borderColor: direction === "PUT" ? "#B22222" : "#C8A24A",
              }}
            >
              PUT
            </button>
          </div>
        </section>

        <section
          style={{
            ...styles.scorePanel,
            borderColor: validated ? "#2E8B57" : "#B22222",
            background: validated
              ? "linear-gradient(135deg, #E8F7EC, #FFFFFF)"
              : "linear-gradient(135deg, #FDECEC, #FFFFFF)",
          }}
        >
          <p style={styles.scoreLabel}>EL HARVEST SCORE</p>

          <div style={styles.score}>{score}%</div>

          <div style={styles.metrics}>
            <p><strong>Direction:</strong> {direction || "Not Selected"}</p>
            <p><strong>Grade:</strong> {grade}</p>
            <p><strong>Validated At:</strong> {timestamp}</p>
          </div>

          <h2
            style={{
              ...styles.result,
              color: validated ? "#2E8B57" : "#B22222",
            }}
          >
            {validated ? "TRADE VALIDATED" : "TRADE BLOCKED"}
          </h2>
        </section>

        <a href="/" style={styles.back}>← Back to Home</a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #111 0%, #2A2418 45%, #F7EFE2 45%)",
    color: "#111",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  shell: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    color: "#F7EFE2",
    padding: "34px 10px 26px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 18px",
    border: "1px solid #C8A24A",
    borderRadius: "999px",
    color: "#C8A24A",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "42px",
    margin: "0 0 12px",
  },
  mantra: {
    margin: "0 auto",
    maxWidth: "560px",
    color: "#E8D7A8",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  panel: {
    marginTop: "22px",
    padding: "24px",
    border: "1px solid #C8A24A",
    borderRadius: "22px",
    background: "#FFFDF7",
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
  },
  sectionTitle: {
    margin: "0 0 18px",
    fontSize: "22px",
  },
  grid: {
    display: "grid",
    gap: "14px",
  },
  ruleCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px",
    border: "2px solid",
    borderRadius: "16px",
    fontSize: "18px",
    fontWeight: "900",
    cursor: "pointer",
    textAlign: "left",
  },
  check: {
    fontSize: "24px",
    fontWeight: "900",
  },
  directionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  directionButton: {
    padding: "20px",
    border: "2px solid",
    borderRadius: "16px",
    fontSize: "22px",
    fontWeight: "900",
    cursor: "pointer",
    letterSpacing: "1px",
  },
  scorePanel: {
    marginTop: "22px",
    padding: "28px",
    border: "3px solid",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 14px 34px rgba(0,0,0,0.14)",
  },
  scoreLabel: {
    margin: 0,
    color: "#6B5B2A",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  score: {
    fontSize: "64px",
    fontWeight: "900",
    margin: "10px 0",
  },
  metrics: {
    lineHeight: "1.8",
    fontSize: "16px",
  },
  result: {
    margin: "18px 0 0",
    fontSize: "30px",
    fontWeight: "900",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#111",
    fontWeight: "900",
    textDecoration: "none",
  },
};
