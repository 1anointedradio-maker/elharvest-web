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
          <div style={styles.brandPill}>EL HARVEST</div>

          <h1 style={styles.title}>Trade Validation</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <p style={styles.kicker}>01</p>
            <h2 style={styles.sectionTitle}>Rule Confirmation</h2>
          </div>

          <div style={styles.ruleGrid}>
            {rulesList.map(([key, label]) => {
              const active = rules[key];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleRule(key)}
                  style={{
                    ...styles.ruleCard,
                    borderColor: active ? "#2E8B57" : "#C8A24A",
                    background: active
                      ? "linear-gradient(135deg, #E8F7EC, #FFFFFF)"
                      : "linear-gradient(135deg, #FFF8E8, #FFFFFF)",
                    boxShadow: active
                      ? "0 0 22px rgba(46, 139, 87, 0.28)"
                      : "0 8px 18px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <span
                    style={{
                      ...styles.checkIcon,
                      background: active ? "#2E8B57" : "#C8A24A",
                      color: "#fff",
                    }}
                  >
                    {active ? "✓" : "+"}
                  </span>

                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <p style={styles.kicker}>02</p>
            <h2 style={styles.sectionTitle}>Trade Direction</h2>
          </div>

          <div style={styles.directionGrid}>
            <button
              type="button"
              onClick={() => setDirection("CALL")}
              style={{
                ...styles.directionButton,
                background:
                  direction === "CALL"
                    ? "linear-gradient(135deg, #2E8B57, #155C36)"
                    : "linear-gradient(135deg, #FFF8E8, #FFFFFF)",
                color: direction === "CALL" ? "#fff" : "#111",
                borderColor: direction === "CALL" ? "#2E8B57" : "#C8A24A",
                boxShadow:
                  direction === "CALL"
                    ? "0 0 24px rgba(46, 139, 87, 0.35)"
                    : "0 8px 18px rgba(0, 0, 0, 0.06)",
              }}
            >
              CALL
            </button>

            <button
              type="button"
              onClick={() => setDirection("PUT")}
              style={{
                ...styles.directionButton,
                background:
                  direction === "PUT"
                    ? "linear-gradient(135deg, #B22222, #731515)"
                    : "linear-gradient(135deg, #FFF8E8, #FFFFFF)",
                color: direction === "PUT" ? "#fff" : "#111",
                borderColor: direction === "PUT" ? "#B22222" : "#C8A24A",
                boxShadow:
                  direction === "PUT"
                    ? "0 0 24px rgba(178, 34, 34, 0.35)"
                    : "0 8px 18px rgba(0, 0, 0, 0.06)",
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

          <div style={styles.scoreNumber}>{score}%</div>

          <div style={styles.metricGrid}>
            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Direction</span>
              <strong>{direction || "Not Selected"}</strong>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Grade</span>
              <strong>{grade}</strong>
            </div>

            <div style={styles.metricCard}>
              <span style={styles.metricLabel}>Rules Passed</span>
              <strong>{completed}/4</strong>
            </div>
          </div>

          <h2
            style={{
              ...styles.result,
              color: validated ? "#2E8B57" : "#B22222",
            }}
          >
            {validated ? "TRADE VALIDATED" : "TRADE BLOCKED"}
          </h2>

          <p style={styles.timestamp}>Validated At: {timestamp}</p>
        </section>

        <a href="/" style={styles.backButton}>
          ← Back to Home
        </a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #111111 0%, #1D1A14 42%, #F7EFE2 42%, #F7EFE2 100%)",
    color: "#111",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  shell: {
    maxWidth: "820px",
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    color: "#F7EFE2",
    padding: "38px 10px 30px",
  },
  brandPill: {
    display: "inline-block",
    padding: "8px 18px",
    border: "1px solid #C8A24A",
    borderRadius: "999px",
    color: "#C8A24A",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "18px",
  },
  title: {
    fontSize: "44px",
    lineHeight: "1.05",
    margin: "0 0 14px",
    fontWeight: "900",
  },
  mantra: {
    margin: "0 auto",
    maxWidth: "620px",
    color: "#E8D7A8",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  panel: {
    marginTop: "22px",
    padding: "24px",
    border: "1px solid #C8A24A",
    borderRadius: "24px",
    background: "#FFFDF7",
    boxShadow: "0 16px 34px rgba(0,0,0,0.14)",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },
  kicker: {
    margin: 0,
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#111",
    color: "#C8A24A",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "23px",
    fontWeight: "900",
  },
  ruleGrid: {
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
    borderRadius: "18px",
    fontSize: "18px",
    fontWeight: "900",
    cursor: "pointer",
    textAlign: "left",
    color: "#111",
  },
  checkIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    flexShrink: 0,
  },
  directionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  directionButton: {
    padding: "22px",
    border: "2px solid",
    borderRadius: "18px",
    fontSize: "24px",
    fontWeight: "900",
    cursor: "pointer",
    letterSpacing: "1.5px",
  },
  scorePanel: {
    marginTop: "22px",
    padding: "30px",
    border: "3px solid",
    borderRadius: "26px",
    textAlign: "center",
    boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
  },
  scoreLabel: {
    margin: 0,
    color: "#6B5B2A",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  scoreNumber: {
    fontSize: "68px",
    fontWeight: "900",
    margin: "10px 0 18px",
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "16px",
  },
  metricCard: {
    padding: "14px",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.75)",
    display: "grid",
    gap: "6px",
  },
  metricLabel: {
    color: "#6B5B2A",
    fontSize: "12px",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  result: {
    margin: "24px 0 8px",
    fontSize: "32px",
    fontWeight: "900",
  },
  timestamp: {
    margin: 0,
    color: "#444",
    fontSize: "14px",
  },
  backButton: {
    display: "inline-block",
    marginTop: "24px",
    color: "#111",
    fontWeight: "900",
    textDecoration: "none",
  },
};
