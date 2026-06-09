"use client";

import { useMemo, useState } from "react";
import { getElHarvestSignal } from "../../lib/elHarvestEngine";
import { elHarvestValidationModel } from "../../lib/elHarvestRules";

export default function ValidationPage() {
  const [rules, setRules] = useState({
    vwap: false,
    cloud: false,
    volume: false,
    time: false,
  });

  const [direction, setDirection] = useState("");
  const [accountSize, setAccountSize] = useState("");
  const [riskPercent, setRiskPercent] = useState("2");

  const completed = Object.values(rules).filter(Boolean).length;
  const score = Math.round((completed / 4) * 100);

  const numericAccountSize = Number(accountSize || 0);
  const numericRiskPercent = Number(riskPercent || 0);
  const maxRisk = numericAccountSize * (numericRiskPercent / 100);
    const harvestSignal = getElHarvestSignal({
    price: 720.47,
    vwap: 718.1,
    cloudColor: rules.cloud ? "green" : "red",
    futureCloudSlope: rules.cloud ? "rising" : "falling",
    cloudFloor: 718.2,
    cloudCeiling: 720.6,
    macdHistogram: 0.39,
    rsi: 57,
    volumeIncreasing: rules.volume,
    structure: rules.cloud ? "failed-breakdown" : "neutral",
  });

  const grade =
    completed === 4 ? "A+" :
    completed === 3 ? "B" :
    completed === 2 ? "C" :
    completed === 1 ? "D" :
    "F";

  const verdict =
    completed === 4 ? "TRADE" :
    completed === 3 ? "CAUTION" :
    "NO TRADE";

  const timestamp = useMemo(() => new Date().toLocaleString(), []);

  const rulesList = [
    ["vwap", "VWAP Confirmed"],
    ["cloud", "Cloud Confirmed"],
    ["volume", "Volume Confirmed"],
    ["time", "Time Confirmed"],
  ];

  const toggleRule = (key) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const executePaperTrade = () => {
    if (!direction) return;

    const tradeTicket = {
      direction,
      score: `${score}%`,
      grade,
      verdict,
      rulesPassed: `${completed}/4`,
      vwap_confirmed: rules.vwap,
      cloud_confirmed: rules.cloud,
      volume_confirmed: rules.volume,
      time_confirmed: rules.time,
      account_size: numericAccountSize,
      risk_percent: numericRiskPercent,
      max_risk: maxRisk,
      timestamp,
      status: "Paper Trade Ticket Created",
    };

    localStorage.setItem("elharvest_trade_ticket", JSON.stringify(tradeTicket));
    window.location.href = "/journal";
  };

  const verdictColor =
    verdict === "TRADE" ? "#2F8F46" :
    verdict === "CAUTION" ? "#D6B45A" :
    "#B84A3A";

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />
          <h1 style={styles.brand}>EL HARVEST</h1>
          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
          <p style={styles.modelText}>
  Model: {elHarvestValidationModel.version}
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

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.step}>03</span>
              <h2 style={styles.cardTitle}>Risk Engine</h2>
            </div>

            <div style={styles.riskGrid}>
              <input
                style={styles.input}
                placeholder="Account Size"
                inputMode="decimal"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Risk %"
                inputMode="decimal"
                value={riskPercent}
                onChange={(e) => setRiskPercent(e.target.value)}
              />
            </div>

            <section style={styles.riskBox}>
              <span>Max Dollar Risk</span>
              <strong>${maxRisk.toFixed(2)}</strong>
            </section>
          </div>

          <section style={{ ...styles.scoreCard, borderColor: verdictColor }}>
            <p style={{ ...styles.scoreLabel, color: verdictColor }}>
              EL HARVEST VERDICT
            </p>

            <div style={{ ...styles.gauge, borderColor: verdictColor }}>
              <strong>{score}%</strong>
              <span>Grade {grade}</span>
            </div>

            <h2 style={{ ...styles.result, color: verdictColor }}>
              {verdict}
            </h2>

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
                <span>Max Risk</span>
                <strong>${maxRisk.toFixed(2)}</strong>
              </div>
            </div>

            <button
              type="button"
              disabled={!direction}
              onClick={executePaperTrade}
              style={{
                ...styles.executeButton,
                opacity: direction ? 1 : 0.45,
                cursor: direction ? "pointer" : "not-allowed",
              }}
            >
              SEND TO JOURNAL
            </button>

            <p style={styles.timestamp}>Validated At: {timestamp}</p>
          </section>
        </section>
<section style={styles.card}>
  <h2>EL Harvest Signal Engine</h2>

  <p><strong>Score:</strong> {harvestSignal.score}</p>
  <p><strong>Grade:</strong> {harvestSignal.grade}</p>
  <p><strong>Direction:</strong> {harvestSignal.direction}</p>
  <p><strong>Position Size:</strong> {harvestSignal.size}</p>

  <ul>
    {harvestSignal.notes.map((note) => (
      <li key={note}>{note}</li>
    ))}
  </ul>
</section>
        <a href="/journal" style={styles.back}>
          Go to Journal →
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
  modelText: {
  marginTop: "8px",
  color: "#8A6416",
  fontWeight: "800",
  fontSize: "14px",
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
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.10)",
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
  riskGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #D6B45A",
    fontSize: "16px",
    background: "#FFFFFF",
  },
  riskBox: {
    marginTop: "16px",
    padding: "18px",
    borderRadius: "18px",
    background: "#EEF8F1",
    border: "1px solid #2F8F46",
    display: "grid",
    gap: "8px",
    textAlign: "center",
  },
  scoreCard: {
    padding: "30px",
    border: "3px solid",
    borderRadius: "30px",
    background: "#FFFFFF",
    textAlign: "center",
    boxShadow: "0 22px 48px rgba(109, 40, 217, 0.12)",
  },
  scoreLabel: {
    margin: 0,
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
    marginTop: "18px",
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
    marginTop: "18px",
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
