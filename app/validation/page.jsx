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
        <header style={styles.header}>
          <div style={styles.logoMark}>EL</div>
          <p style={styles.brand}>EL HARVEST</p>
          <h1 style={styles.title}>Trade Validation</h1>
          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <span style={styles.step}>01</span>
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
                    borderColor: active ? "#2F8F46" : "#D6B45A",
                    background: active ? "#EEF8F1" : "#FFFFFF",
                    boxShadow: active
                      ? "0 14px 28px rgba(47, 143, 70, 0.18)"
                      : "0 10px 24px rgba(109, 40, 217, 0.08)",
                  }}
                >
                  <span
                    style={{
                      ...styles.ruleIcon,
                      background: active ? "#2F8F46" : "#D6B45A",
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

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <span style={styles.step}>02</span>
            <h2 style={styles.sectionTitle}>Trade Direction</h2>
          </div>

          <div style={styles.directionGrid}>
            <button
              type="button"
              onClick={() => setDirection("CALL")}
              style={{
                ...styles.directionButton,
                background: direction === "CALL" ? "#2F8F46" : "#FFFFFF",
                color: direction === "CALL" ? "#FFFFFF" : "#1F1F1F",
                borderColor: direction === "CALL" ? "#2F8F46" : "#D6B45A",
              }}
            >
              CALL
            </button>

            <button
              type="button"
              onClick={() => setDirection("PUT")}
              style={{
                ...styles.directionButton,
                background: direction === "PUT" ? "#B84A3A" : "#FFFFFF",
                color: direction === "PUT" ? "#FFFFFF" : "#1F1F1F",
                borderColor: direction === "PUT" ? "#B84A3A" : "#D6B45A",
              }}
            >
              PUT
            </button>
          </div>
        </section>

        <section
          style={{
            ...styles.scoreCard,
            borderColor: validated ? "#2F8F46" : "#B84A3A",
            background: validated ? "#EEF8F1" : "#FFF2EF",
          }}
        >
          <p style={styles.scoreLabel}>EL HARVEST SCORE</p>
          <div style={styles.score}>{score}%</div>

          <div style={styles.metrics}>
            <div style={styles.metric}>
              <span>Direction</span>
              <strong>{direction || "Not Selected"}</strong>
            </div>

            <div style={styles.metric}>
              <span>Grade</span>
              <strong>{grade}</strong>
            </div>

            <div style={styles.metric}>
              <span>Rules Passed</span>
              <strong>{completed}/4</strong>
            </div>
          </div>

          <h2
            style={{
              ...styles.result,
              color: validated ? "#2F8F46" : "#B84A3A",
            }}
          >
            {validated ? "TRADE VALIDATED" : "TRADE BLOCKED"}
          </h2>

          <p style={styles.timestamp}>Validated At: {timestamp}</p>
        </section>

        <a href="/" style={styles.back}>← Back to Home</a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F4EA",
    color: "#1F1F1F",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  shell: {
    maxWidth: "820px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    padding: "22px 10px 28px",
  },
  logoMark: {
    width: "76px",
    height: "76px",
    margin: "0 auto 10px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    display: "grid",
    placeItems: "center",
    fontWeight: "900",
    fontSize: "26px",
    boxShadow: "0 18px 38px rgba(109, 40, 217, 0.12)",
  },
  brand: {
    margin: 0,
    color: "#A87517",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  title: {
    fontSize: "44px",
    margin: "8px 0 10px",
    fontWeight: "900",
  },
  mantra: {
    margin: "0 auto",
    maxWidth: "620px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  card: {
    marginTop: "22px",
    padding: "24px",
    border: "1px solid #D6B45A",
    borderRadius: "26px",
    background: "#FFFFFF",
    boxShadow: "0 18px 38px rgba(109, 40, 217, 0.08)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },
  step: {
    padding: "6px 10px",
    borderRadius: "999px",
    background: "#F1E3B5",
    color: "#8A6416",
    fontWeight: "900",
    fontSize: "12px",
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
    color: "#1F1F1F",
  },
  ruleIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    color: "#FFFFFF",
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
    letterSpacing: "1px",
    boxShadow: "0 12px 24px rgba(109, 40, 217, 0.08)",
  },
  scoreCard: {
    marginTop: "22px",
    padding: "30px",
    border: "3px solid",
    borderRadius: "28px",
    textAlign: "center",
    boxShadow: "0 20px 42px rgba(109, 40, 217, 0.10)",
  },
  scoreLabel: {
    margin: 0,
    color: "#8A6416",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  score: {
    fontSize: "68px",
    fontWeight: "900",
    margin: "10px 0 18px",
  },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  metric: {
    padding: "14px",
    borderRadius: "16px",
    background: "#FFFFFF",
    border: "1px solid rgba(168, 117, 23, 0.24)",
    display: "grid",
    gap: "6px",
  },
  result: {
    margin: "24px 0 8px",
    fontSize: "32px",
    fontWeight: "900",
  },
  timestamp: {
    margin: 0,
    color: "#6B7280",
    fontSize: "14px",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
  },
};
