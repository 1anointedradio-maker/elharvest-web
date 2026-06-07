"use client";

import { useEffect, useState } from "react";

export default function JournalPage() {
  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const { supabase } = await import("../../lib/supabaseClient");

        const { data: userData } = await supabase.auth.getUser();
        setUser(userData?.user || null);

        const { data, error } = await supabase
          .from("journal_trades")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTrades(data || []);
      } catch {
        const saved = localStorage.getItem("elharvest_journal");
        if (saved) setTrades(JSON.parse(saved));
      }
    }

    load();
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <h1>EL Harvest Trade Journal</h1>
          <p>Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.</p>
          <p>Logged in: {user?.email || "Not logged in"}</p>
        </header>

        <section style={styles.card}>
          <h2>Trade History</h2>

          {trades.length === 0 ? (
            <p style={styles.empty}>No trades saved yet.</p>
          ) : (
            <div style={styles.list}>
              {trades.map((trade) => (
                <div key={trade.id || trade.created_at} style={styles.trade}>
                  <strong>
                    {trade.ticker || "UNKNOWN"} {trade.direction || ""}
                  </strong>
                  <span>Entry: {trade.entry || "N/A"} | Exit: {trade.exit || "N/A"}</span>
                  <span>Score: {trade.score || "0"} | Grade: {trade.grade || "F"}</span>
                  <span>
                    Risk: ${trade.max_risk || "0"} | Account: ${trade.account_size || "0"} | Risk %:{" "}
                    {trade.risk_percent || "0"}%
                  </span>
                  <small>Trader: {trade.trader || "Unknown"}</small>
                  <small>
                    {trade.created_at ? new Date(trade.created_at).toLocaleString() : "No timestamp"}
                  </small>
                  <p>{trade.notes}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <a href="/validation" style={styles.back}>← Back to Validation</a>
        <a href="/broker" style={styles.secondaryBack}>Continue to Broker Hub →</a>
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
  card: {
    background: "#FFFFFF",
    border: "1px solid #D6B45A",
    borderRadius: "22px",
    padding: "22px",
  },
  empty: {
    color: "#6B7280",
  },
  list: {
    display: "grid",
    gap: "14px",
  },
  trade: {
    display: "grid",
    gap: "6px",
    padding: "16px",
    borderRadius: "18px",
    background: "#F8F4EA",
    border: "1px solid rgba(168,117,23,0.25)",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
  },
  secondaryBack: {
    display: "inline-block",
    marginTop: "24px",
    marginLeft: "22px",
    color: "#2F8F46",
    fontWeight: "900",
    textDecoration: "none",
  },
};
