"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [journal, setJournal] = useState([]);
  const [paperTrades, setPaperTrades] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const journalResult = await supabase
      .from("journal_trades")
      .select("*")
      .order("created_at", { ascending: false });

    const paperResult = await supabase
      .from("paper_trades")
      .select("*")
      .order("opened_at", { ascending: false });

    if (journalResult.error || paperResult.error) {
      setStatusMessage("Supabase analytics load failed. Check database connection.");
      return;
    }

    setJournal(journalResult.data || []);
    setPaperTrades(paperResult.data || []);
  };

  const totalTrades = journal.length;

  const winningTrades = journal.filter(
    (trade) => Number(trade.exit) > Number(trade.entry)
  ).length;

  const losingTrades = journal.filter(
    (trade) => Number(trade.exit) < Number(trade.entry)
  ).length;

  const winRate =
    totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;

  const lossRate =
    totalTrades > 0 ? Math.round((losingTrades / totalTrades) * 100) : 0;

  const averageScore =
    totalTrades > 0
      ? Math.round(
          journal.reduce((sum, trade) => sum + Number(trade.score || 0), 0) /
            totalTrades
        )
      : 0;
const disciplineGrade =
  winRate >= 70 && averageScore >= 90
    ? "A+"
    : winRate >= 60
    ? "A"
    : winRate >= 50
    ? "B"
    : winRate >= 40
    ? "C"
    : "D";
  const aPlusSetups = journal.filter((trade) => trade.grade === "A+").length;

  const latestTrade = journal[0];
  const latestScore = Number(latestTrade?.score || 0);

const verdict =
  latestScore >= 100
    ? "TRADE"
    : latestScore >= 75
    ? "CAUTION"
    : "NO TRADE";

const verdictColor =
  verdict === "TRADE"
    ? "#2F8F46"
    : verdict === "CAUTION"
    ? "#D6B45A"
    : "#B84A3A";
  const harvestGrade =
    averageScore >= 90
      ? "A+"
      : averageScore >= 75
      ? "B"
      : averageScore >= 50
      ? "C"
      : averageScore >= 25
      ? "D"
      : "F";

  const metrics = [
    ["Total Trades", totalTrades],
    ["Winning Trades", winningTrades],
    ["Losing Trades", losingTrades],
    ["Win Rate", `${winRate}%`],
    ["Loss Rate", `${lossRate}%`],
    ["Average Validation Score", `${averageScore}%`],
    ["A+ Setups", aPlusSetups],
    ["Total Paper Trades", paperTrades.length],
  ];

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img
            src="/el-harvest-logo.png"
            alt="EL Harvest Logo"
            style={styles.logo}
          />

          <h1 style={styles.title}>Dashboard</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        {statusMessage && (
          <section style={styles.statusMessage}>{statusMessage}</section>
        )}
<section
  style={{
    padding: "24px",
    borderRadius: "28px",
    background: "#FFFFFF",
    border: `3px solid ${verdictColor}`,
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: "14px",
      fontWeight: "900",
      letterSpacing: "2px",
      color: verdictColor,
    }}
  >
    EL HARVEST VERDICT
  </p>

  <h1
    style={{
      margin: "12px 0",
      fontSize: "48px",
      color: verdictColor,
      fontWeight: "900",
    }}
  >
    {verdict}
  </h1>

  <p
    style={{
      margin: 0,
      fontWeight: "800",
    }}
  >
    Score: {latestScore}% | Grade: {latestTrade?.grade || "N/A"}
  </p>
  <div
  style={{
    marginTop: "16px",
    display: "grid",
    gap: "6px",
    fontWeight: "800",
  }}
>
  <span>✓ VWAP</span>
  <span>✓ Cloud</span>
  <span>✓ Volume</span>
  <span>✓ Time</span>
</div>
</section>
  <section
  style={{
    padding: "20px",
    borderRadius: "24px",
    background: "#FFFFFF",
    border: "2px solid #D6B45A",
    marginBottom: "20px",
    textAlign: "center",
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: "14px",
      fontWeight: "900",
      letterSpacing: "2px",
      color: "#8A6416",
    }}
  >
    DISCIPLINE GRADE
  </p>

  <h1
    style={{
      margin: "12px 0",
      fontSize: "52px",
      color: "#8A6416",
      fontWeight: "900",
    }}
  >
    {disciplineGrade}
  </h1>

  <p
    style={{
      margin: 0,
      fontWeight: "700",
    }}
  >
    Based on Win Rate and Harvest Score
  </p>
</section>      
        <section style={styles.scoreCard}>
          <p style={styles.scoreLabel}>HARVEST SCORE</p>
          <div style={styles.score}>{averageScore}%</div>
          <h2 style={styles.grade}>Grade {harvestGrade}</h2>
        </section>

        <section style={styles.metricGrid}>
          {metrics.map(([label, value]) => (
            <div key={label} style={styles.metricCard}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Latest Trade</h2>

          {latestTrade ? (
            <div style={styles.latestTrade}>
              <strong>
                {latestTrade.ticker || "UNKNOWN"} — {latestTrade.direction}
              </strong>
              <span>Entry: {latestTrade.entry || "-"}</span>
              <span>Exit: {latestTrade.exit || "-"}</span>
              <span>Score: {latestTrade.score || "0"}%</span>
              <span>Grade: {latestTrade.grade || "F"}</span>
              <small>
                {latestTrade.created_at
                  ? new Date(latestTrade.created_at).toLocaleString()
                  : "No timestamp"}
              </small>
            </div>
          ) : (
            <p style={styles.empty}>No trades saved yet.</p>
          )}
        </section>

        <section style={styles.navCard}>
          <a href="/validation" style={styles.button}>
            Start Validation
          </a>

          <a href="/journal" style={styles.button}>
            Open Journal
          </a>

          <a href="/broker" style={styles.button}>
            Open Broker Hub
          </a>

          <a href="/" style={styles.secondary}>
            ← Back Home
          </a>
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
    letterSpacing: "1px",
  },
  mantra: {
    margin: "12px auto 0",
    maxWidth: "640px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  statusMessage: {
    marginBottom: "22px",
    padding: "18px",
    borderRadius: "18px",
    background: "#FFF7E0",
    border: "1px solid #D6B45A",
    color: "#8A6416",
    fontWeight: "900",
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
  metricGrid: {
    display: "grid",
    gap: "18px",
    marginTop: "22px",
  },
  metricCard: {
    padding: "22px",
    border: "1px solid #D6B45A",
    borderRadius: "24px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    display: "grid",
    gap: "8px",
  },
  card: {
    marginTop: "22px",
    padding: "24px",
    border: "1px solid #D6B45A",
    borderRadius: "28px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
  },
  sectionTitle: {
    marginTop: 0,
    fontSize: "24px",
    fontWeight: "900",
  },
  latestTrade: {
    display: "grid",
    gap: "8px",
    padding: "16px",
    borderRadius: "18px",
    background: "#F8F4EA",
    border: "1px solid rgba(168,117,23,0.25)",
  },
  empty: {
    color: "#6B7280",
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
    letterSpacing: "1px",
  },
  secondary: {
    color: "#8A6416",
    textAlign: "center",
    fontWeight: "900",
    textDecoration: "none",
  },
};
