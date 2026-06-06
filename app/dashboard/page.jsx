"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [journal, setJournal] = useState([]);
  const [paperTrades, setPaperTrades] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);

    let journalQuery = supabase
      .from("journal_trades")
      .select("*")
      .order("created_at", { ascending: false });

    let paperQuery = supabase
      .from("paper_trades")
      .select("*")
      .order("opened_at", { ascending: false });

    if (user?.id) {
      journalQuery = journalQuery.eq("user_id", user.id);
      paperQuery = paperQuery.eq("user_id", user.id);
    } else {
      journalQuery = journalQuery.eq("trader", "AK Martin");
      paperQuery = paperQuery.eq("trader", "AK Martin");
    }

    const journalResult = await journalQuery;
    const paperResult = await paperQuery;

    if (journalResult.error || paperResult.error) {
      setStatusMessage("Supabase analytics load failed.");
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

  const aPlusSetups = journal.filter((trade) => trade.grade === "A+").length;

  const latestTrade = journal[0];
  const latestScore = Number(latestTrade?.score || 0);

  const verdict =
  latestTrade?.verdict ||
  (latestScore >= 100 ? "TRADE" : latestScore >= 75 ? "CAUTION" : "NO TRADE");

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

  let currentStreak = 0;
  let streakType = "NONE";

  for (const trade of journal) {
    const score = Number(trade.score || 0);

    if (currentStreak === 0) {
      streakType = score >= 75 ? "WIN" : "LOSS";
      currentStreak = 1;
      continue;
    }

    if (streakType === "WIN" && score >= 75) {
      currentStreak++;
    } else if (streakType === "LOSS" && score < 75) {
      currentStreak++;
    } else {
      break;
    }
  }

  const completedTrades = journal.filter((trade) => trade.entry && trade.exit);

  const tradeResults = completedTrades.map((trade) => {
    const entry = Number(trade.entry);
    const exit = Number(trade.exit);
    const pnl = entry > 0 ? ((exit - entry) / entry) * 100 : 0;

    return { ...trade, pnl };
  });

  const bestTrade =
    tradeResults.length > 0
      ? [...tradeResults].sort((a, b) => b.pnl - a.pnl)[0]
      : null;

  const worstTrade =
    tradeResults.length > 0
      ? [...tradeResults].sort((a, b) => a.pnl - b.pnl)[0]
      : null;

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
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />

          <h1 style={styles.title}>Dashboard</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>

          <p style={styles.session}>
            {user?.email ? `Logged in: ${user.email}` : "Beta Mode: AK Martin"}
          </p>
        </header>

        {statusMessage && <section style={styles.statusMessage}>{statusMessage}</section>}

        <section style={{ ...styles.verdictCard, borderColor: verdictColor }}>
          <p style={{ ...styles.label, color: verdictColor }}>EL HARVEST VERDICT</p>
          <h1 style={{ ...styles.verdict, color: verdictColor }}>{verdict}</h1>
          <p style={styles.subText}>
            Score: {latestScore}% | Grade: {latestTrade?.grade || "N/A"}
          </p>

          <div style={styles.ruleList}>
  <span>{latestTrade?.vwap_confirmed ? "✓" : "✕"} VWAP</span>
  <span>{latestTrade?.cloud_confirmed ? "✓" : "✕"} Cloud</span>
  <span>{latestTrade?.volume_confirmed ? "✓" : "✕"} Volume</span>
  <span>{latestTrade?.time_confirmed ? "✓" : "✕"} Time</span>
</div>

        <section style={styles.twoGrid}>
          <div style={styles.infoCard}>
            <p style={styles.label}>DISCIPLINE GRADE</p>
            <h1 style={styles.bigGold}>{disciplineGrade}</h1>
            <p style={styles.subText}>Based on Win Rate and Harvest Score</p>
          </div>

          <div
            style={{
              ...styles.infoCard,
              borderColor: streakType === "WIN" ? "#2F8F46" : "#B84A3A",
            }}
          >
            <p style={styles.label}>CURRENT STREAK</p>
            <h1
              style={{
                ...styles.bigGold,
                color: streakType === "WIN" ? "#2F8F46" : "#B84A3A",
              }}
            >
              {streakType === "WIN" ? "🔥" : "❄️"} {currentStreak}
            </h1>
            <p style={styles.subText}>
              {streakType === "WIN" ? "Winning Trades" : "Losing Trades"}
            </p>
          </div>
        </section>

        <section style={styles.twoGrid}>
          <div style={styles.metricCard}>
            <span>Best Trade</span>
            <strong>
              {bestTrade
                ? `${bestTrade.ticker} ${bestTrade.direction} ${
                    bestTrade.pnl >= 0 ? "+" : ""
                  }${bestTrade.pnl.toFixed(1)}%`
                : "N/A"}
            </strong>
          </div>

          <div style={styles.metricCard}>
            <span>Worst Trade</span>
            <strong>
              {worstTrade
                ? `${worstTrade.ticker} ${worstTrade.direction} ${
                    worstTrade.pnl >= 0 ? "+" : ""
                  }${worstTrade.pnl.toFixed(1)}%`
                : "N/A"}
            </strong>
          </div>
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
    maxWidth: "980px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    padding: "18px 10px 26px",
  },
  logo: {
    width: "130px",
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
  session: {
    marginTop: "12px",
    color: "#6D28D9",
    fontWeight: "900",
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
  verdictCard: {
    padding: "26px",
    borderRadius: "28px",
    background: "#FFFFFF",
    border: "3px solid",
    marginBottom: "20px",
    textAlign: "center",
    boxShadow: "0 22px 48px rgba(109, 40, 217, 0.12)",
  },
  label: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "2px",
    color: "#8A6416",
  },
  verdict: {
    margin: "12px 0",
    fontSize: "52px",
    fontWeight: "900",
  },
  subText: {
    margin: 0,
    fontWeight: "800",
    color: "#4B5563",
  },
  ruleList: {
    marginTop: "16px",
    display: "grid",
    gap: "6px",
    fontWeight: "800",
  },
  twoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
    marginBottom: "20px",
  },
  infoCard: {
    padding: "22px",
    borderRadius: "24px",
    background: "#FFFFFF",
    border: "2px solid #D6B45A",
    textAlign: "center",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.10)",
  },
  bigGold: {
    margin: "12px 0",
    fontSize: "48px",
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
    fontSize: "64px",
    fontWeight: "900",
    margin: "10px 0",
  },
  grade: {
    color: "#2F8F46",
    fontSize: "28px",
    margin: 0,
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
  },
  secondary: {
    color: "#8A6416",
    textAlign: "center",
    fontWeight: "900",
    textDecoration: "none",
  },
};
