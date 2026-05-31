"use client";

import { useMemo, useState } from "react";

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
    score >= 75 ? "B" :
    score >= 50 ? "C" :
    score >= 25 ? "D" :
    "F";

  const timestamp = useMemo(() => new Date().toLocaleString(), []);

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
          <img
            src="/el-harvest-logo.png"
            alt="EL Harvest Logo"
            style={styles.logo}
          />

          <h1 style={styles.brand}>EL HARVEST</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.dashboard}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.step}>01</span>
              <h2 style={styles.cardTitle}>Rule Confirmation</h2>
            </div>

            <div style={styles.ruleList}>
              {rulesList.map(([key, label]) => {
                const active = rules[key];

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleRule(key)}
                    style={{
                      ...styles.ruleButton,
                      borderColor: active ? "#2F8F46" : "#D6B45A",
                      background: active ? "#EEF8F1" : "#FFFFFF",
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
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.step}>02</span>
              <h2 style={styles.cardTitle}>Trade Direction</h2>
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
          </div>

          <section
            style={{
              ...styles.scoreCard,
              borderColor: validated ? "#2F8F46" : "#B84A3A",
            }}
          >
            <p style={styles.scoreLabel}>EL HARVEST SCORE</p>

            <div
              style={{
                ...styles.gauge,
                borderColor: validated ? "#2F8F46" : "#D6B45A",
              }}
            >
              <strong>{score}%</strong>
              <span>Grade {grade}</span>
            </div>

            <div style={styles.metrics}>
              <div style={styles.metric}>
                <span>Direction</span>
                <strong>{direction || "Not Selected"}</strong>
              </div>

              <div style={styles.metric}>
                <span>Rules Passed</span>
                <strong>{completed}/4</strong>
              </div>

              <div style={styles.metric}>
                <span>Status</span>
                <strong>{validated ? "Validated" : "Blocked"}</strong>
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

            <button
              type="button"
              disabled={!validated}
              style={{
                ...styles.executeButton,
                opacity: validated ? 1 : 0.45,
                cursor: validated ? "pointer" : "not-allowed",
              }}
            >
              EXECUTE PAPER
            </button>

            <p style={styles.timestamp}>Validated At: {timestamp}</p>
          </section>
        </section>

        <a href="/" style={styles.back}>
          ← Back to Home
        </a>
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
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    padding: "18px 10px 26px",
  },
  logo: {
    width: "150px",
    maxWidth: "55%",
    height: "auto",
    marginBottom: "8px",
  },
  brand: {
    margin: 0,
    color: "#8A6416",
    fontSize: "42px",
    letterSpacing: "2px",
    fontWeight: "900",
  },
  mantra: {
    margin: "12px auto 0",
    maxWidth: "640px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  dashboard: {
    display: "grid",
    gap: "22px",
  },
  card: {
    padding: "24px",
    border: "1px solid #D6B45A",
    borderRadius: "28px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },
  step: {
    padding: "7px 11px",
    borderRadius: "999px",
    background: "#F1E3B5",
    color: "#8A6416",
    fontWeight: "900",
    fontSize: "12px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
  },
  ruleList: {
    display: "grid",
    gap: "14px",
  },
  ruleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px",
    border: "2px solid",
    borderRadius: "18px",
    fontSize: "19px",
    fontWeight: "900",
    color: "#1F1F1F",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(109, 40, 217, 0.07)",
  },
  ruleIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    color: "#FFFFFF",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
  },
  directionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  directionButton: {
    padding: "24px",
    border: "2px solid",
    borderRadius: "20px",
    fontSize: "24px",
    fontWeight: "900",
    letterSpacing: "1px",
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(109, 40, 217, 0.08)",
  },
  scoreCard: {
    padding: "30px",
    border: "3px solid",
    borderRadius: "30px",
    background: "#FFFFFF",
    textAlign: "center",
    boxShadow: "0 22px 48px rgba(109, 40, 217, 0.10)",
  },
  scoreLabel: {
    margin: 0,
    color: "#8A6416",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  gauge: {
    width: "190px",
    height: "190px",
    margin: "22px auto",
    borderRadius: "50%",
    border: "18px solid",
    display: "grid",
    placeItems: "center",
    background: "#F8F4EA",
  },
  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  metric: {
    padding: "14px",
    borderRadius: "16px",
    background: "#F8F4EA",
    border: "1px solid rgba(168,117,23,0.25)",
    display: "grid",
    gap: "6px",
  },
  result: {
    margin: "24px 0 14px",
    fontSize: "32px",
    fontWeight: "900",
  },
  executeButton: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  timestamp: {
    marginTop: "16px",
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
