"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [latestTrade, setLatestTrade] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { supabase } = await import("../../lib/supabaseClient");

        const { data: userData } = await supabase.auth.getUser();
        setUser(userData?.user || null);

        const { data } = await supabase
          .from("journal_trades")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1);

        setLatestTrade(data?.[0] || null);
      } catch {
        setLatestTrade(null);
      }
    }

    load();
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <h1>EL Harvest Dashboard</h1>
          <p>Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.</p>
          <p>Logged in: {user?.email || "Not logged in"}</p>
        </header>

        <section style={styles.card}>
          <h2>Latest Journal Ticket</h2>

          {latestTrade ? (
            <div style={styles.latestTrade}>
              <strong>
                {latestTrade.ticker || "UNKNOWN"} — {latestTrade.direction || ""}
              </strong>
              <span>Entry: {latestTrade.entry || "-"}</span>
              <span>Exit: {latestTrade.exit || "-"}</span>
              <span>Score: {latestTrade.score || "0"}%</span>
              <span>Grade: {latestTrade.grade || "F"}</span>
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
  card: {
    background: "#FFFFFF",
    border: "1px solid #D6B45A",
    borderRadius: "22px",
    padding: "22px",
    marginBottom: "18px",
  },
  latestTrade: {
    display: "grid",
    gap: "8px",
  },
  navCard: {
    display: "grid",
    gap: "12px",
  },
  button: {
    display: "block",
    padding: "14px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontWeight: "900",
    textDecoration: "none",
    textAlign: "center",
  },
  secondary: {
    display: "block",
    marginTop: "12px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
    textAlign: "center",
  },
  empty: {
    color: "#6B7280",
  },
};
