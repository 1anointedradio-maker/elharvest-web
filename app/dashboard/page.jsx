"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [journal, setJournal] = useState([]);
  const [paperTrades, setPaperTrades] = useState([]);

  useEffect(() => {
    const savedJournal = localStorage.getItem("elharvest_journal");
    const savedPaperTrades = localStorage.getItem("elharvest_paper_trades");

    if (savedJournal) setJournal(JSON.parse(savedJournal));
    if (savedPaperTrades) setPaperTrades(JSON.parse(savedPaperTrades));
  }, []);

  const latestTrade = journal[0];
  const avgScore =
    journal.length > 0
      ? Math.round(
          journal.reduce((sum, trade) => sum + Number(trade.score || 0), 0) /
            journal.length
        )
      : 0;

  const harvestGrade =
    avgScore >= 90 ? "A+" :
    avgScore >= 75 ? "B" :
    avgScore >= 50 ? "C" :
    avgScore >= 25 ? "D" :
    "F";

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />

          <h1 style={styles.title}>Dashboard</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.scoreCard}>
          <p style={styles.scoreLabel}>HARVEST SCORE</p>
          <div style={styles.score}>{avgScore}%</div>
          <h2 style={styles.grade}>Grade {harvestGrade}</h2>
        </section>

        <section style={styles.grid}>
          <div style={styles.card}>
            <span>Total Journal Trades</span>
            <strong>{journal.length}</strong>
          </div>

          <div style={styles.card}>
            <span>Paper Trades Opened</span>
            <strong>{paperTrades.length}</strong>
          </div>

          <div style={styles.card}>
            <span>Current Discipline Grade</span>
            <strong>{harvestGrade}</strong>
          </div>

          <div style={styles.card}>
            <span>Last Trade</span>
            <strong>
              {latestTrade
                ? `${latestTrade.ticker || "UNKNOWN"} — ${latestTrade.direction}`
                : "None"}
            </strong>
          </div>
        </section>

        <section style={styles.navCard}>
          <a href="/validation" style={styles.button}>Start Validation</a>
          <a href="/journal" style={styles.button}>Open Journal</a>
          <a href="/broker" style={styles.button}>Open Broker Hub</a>
          <a href="/" style={styles.secondary}>← Back Home</a>
        </section>
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
    width: "140px",
    maxWidth: "55%",
    height: "auto",
    marginBottom: "8px",
  },
  title: {
    margin: 0,
    color: "#8A6416",
    fontSize: "42px",
    fontWeight: "900",
  },
  mantra: {
    margin: "12px auto 0",
    maxWidth: "640px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  scoreCard: {
    padding: "30px",
    border: "3px solid #D6B45A",
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
  score: {
    fontSize: "68px",
    fontWeight: "900",
    margin: "10px 0",
  },
  grade: {
    color: "#2F8F46",
    fontSize: "30px",
    margin: 0,
  },
  grid: {
    display: "grid",
    gap: "18px",
    marginTop: "22px",
  },
  card: {
    padding: "22px",
    border: "1px solid #D6B45A",
    borderRadius: "24px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    display: "grid",
    gap: "8px",
  },
  navCard: {
    marginTop: "22px",
    display: "grid",
    gap: "14px",
  },
  button: {
    display: "block",
    padding: "18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "900",
  },
  secondary: {
    color: "#8A6416",
    textAlign: "center",
    fontWeight: "900",
    textDecoration: "none",
  },
};
