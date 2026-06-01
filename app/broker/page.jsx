"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BrokerPage() {
  const [paperTrades, setPaperTrades] = useState([]);
  const [latestTrade, setLatestTrade] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadPaperTrades();
    loadLatestJournalTrade();
  }, []);

  const loadPaperTrades = async () => {
    const { data, error } = await supabase
      .from("paper_trades")
      .select("*")
      .order("opened_at", { ascending: false });

    if (error) {
      setStatusMessage("Supabase paper ledger load failed. Using local backup if available.");

      const savedPaperTrades = localStorage.getItem("elharvest_paper_trades");
      if (savedPaperTrades) setPaperTrades(JSON.parse(savedPaperTrades));

      return;
    }

    setPaperTrades(data || []);
  };

  const loadLatestJournalTrade = async () => {
    const { data, error } = await supabase
      .from("journal_trades")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      setStatusMessage("Could not load latest Supabase journal trade.");

      const savedJournal = localStorage.getItem("elharvest_journal");
      if (savedJournal) {
        const journal = JSON.parse(savedJournal);
        if (journal.length > 0) setLatestTrade(journal[0]);
      }

      return;
    }

    if (data && data.length > 0) {
      setLatestTrade(data[0]);
    }
  };

  const openPaperMode = async () => {
    if (!latestTrade) {
      setStatusMessage(
        "No journal trade found. Validate a trade, execute paper, then save it in the journal first."
      );
      return;
    }

    const alreadyOpened = paperTrades.some(
      (trade) => trade.source_journal_id === latestTrade.id
    );

    if (alreadyOpened) {
      setStatusMessage("This journal trade is already open in Paper Mode.");
      const paperTrade = {
  trader: "AK Martin",
  source_journal_id: latestTrade.id,
      ticker: latestTrade.ticker || "UNKNOWN",
      direction: latestTrade.direction || "CALL / PUT",
      entry: latestTrade.entry || "Pending",
      exit: latestTrade.exit || "Open",
      score: latestTrade.score || "0",
      grade: latestTrade.grade || "F",
      status: "Paper Trade Opened",
      notes: latestTrade.notes || "Imported from EL Harvest Journal.",
    };

    const { data, error } = await supabase
      .from("paper_trades")
      .insert([paperTrade])
      .select();

    if (error) {
      setStatusMessage("Supabase paper trade save failed. Saved locally as backup.");

      const fallbackRecord = {
        ...paperTrade,
        id: Date.now(),
        opened_at: new Date().toLocaleString(),
      };

      const next = [fallbackRecord, ...paperTrades];
      setPaperTrades(next);
      localStorage.setItem("elharvest_paper_trades", JSON.stringify(next));

      return;
    }

    const savedRecord = data?.[0];
    const next = savedRecord ? [savedRecord, ...paperTrades] : paperTrades;

    setPaperTrades(next);
    localStorage.setItem("elharvest_paper_trades", JSON.stringify(next));
    setStatusMessage("Paper trade opened and saved to Supabase ledger.");
  };

  const brokers = [
    {
      name: "Paper Trading",
      status: "Active",
      mode: "Safe Beta Mode",
      note: "Manual execution only. No live orders.",
      action: openPaperMode,
    },
    {
      name: "Robinhood",
      status: "Not Connected",
      mode: "Future Integration",
      note: "Broker connection not enabled in beta.",
      action: null,
    },
    {
      name: "Tradier",
      status: "Not Connected",
      mode: "API Candidate",
      note: "Options-friendly broker API candidate.",
      action: null,
    },
    {
      name: "IBKR",
      status: "Not Connected",
      mode: "Advanced Candidate",
      note: "Institutional-grade future integration path.",
      action: null,
    },
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

          <h1 style={styles.title}>Broker Hub</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.warning}>
          <strong>Beta Protection Mode</strong>
          <p>
            EL Harvest is currently configured for validation, journaling, and
            paper-trade planning only. Live broker execution is disabled until
            risk controls, authentication, and compliance layers are complete.
          </p>
        </section>

        {statusMessage && (
          <section style={styles.statusMessage}>
            {statusMessage}
          </section>
        )}

        <section style={styles.ticket}>
          <h2 style={styles.brokerName}>Latest Journal Ticket</h2>

          {latestTrade ? (
            <div style={styles.ticketGrid}>
              <span>
                <strong>Ticker:</strong> {latestTrade.ticker || "UNKNOWN"}
              </span>
              <span>
                <strong>Direction:</strong> {latestTrade.direction}
              </span>
              <span>
                <strong>Entry:</strong> {latestTrade.entry || "Pending"}
              </span>
              <span>
                <strong>Exit:</strong> {latestTrade.exit || "Open"}
              </span>
              <span>
                <strong>Score:</strong> {latestTrade.score || "0"}%
              </span>
              <span>
                <strong>Grade:</strong> {latestTrade.grade || "F"}
              </span>
            </div>
          ) : (
            <p style={styles.note}>No journal trade found yet.</p>
          )}
        </section>

        <section style={styles.grid}>
          {brokers.map((broker) => {
            const active = broker.status === "Active";

            return (
              <div
                key={broker.name}
                style={{
                  ...styles.card,
                  borderColor: active ? "#2F8F46" : "#D6B45A",
                }}
              >
                <div style={styles.cardTop}>
                  <h2 style={styles.brokerName}>{broker.name}</h2>

                  <span
                    style={{
                      ...styles.badge,
                      background: active ? "#EEF8F1" : "#F8F4EA",
                      color: active ? "#2F8F46" : "#8A6416",
                    }}
                  >
                    {broker.status}
                  </span>
                </div>

                <p style={styles.mode}>{broker.mode}</p>
                <p style={styles.note}>{broker.note}</p>

                <button
                  type="button"
                  disabled={!active}
                  onClick={broker.action || undefined}
                  style={{
                    ...styles.button,
                    opacity: active ? 1 : 0.45,
                    cursor: active ? "pointer" : "not-allowed",
                  }}
                >
                  {active ? "OPEN PAPER MODE" : "COMING SOON"}
                </button>
              </div>
            );
          })}
        </section>

        <section style={styles.card}>
          <h2 style={styles.brokerName}>Paper Trade Ledger</h2>

          {paperTrades.length === 0 ? (
            <p style={styles.note}>No paper trades opened yet.</p>
          ) : (
            <div style={styles.ledger}>
              {paperTrades.map((trade) => (
                <div key={trade.id} style={styles.ledgerItem}>
                  <strong>
                    {trade.ticker} — {trade.direction}
                  </strong>

                  <span>Status: {trade.status}</span>

                  <span>
                    Entry: {trade.entry} | Exit: {trade.exit}
                  </span>

                  <span>
                    Score: {trade.score}% | Grade: {trade.grade}
                  </span>

                  <small>
                    {trade.opened_at
                      ? new Date(trade.opened_at).toLocaleString()
                      : "No timestamp"}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={styles.card}>
          <h2 style={styles.brokerName}>Integration Readiness</h2>

          <div style={styles.checklist}>
            <span>✅ Validation Engine</span>
            <span>✅ Supabase Journal</span>
            <span>✅ Supabase Paper Ledger</span>
            <span>✅ Broker Hub</span>
            <span>⬜ Authentication Layer</span>
            <span>⬜ Risk Controls</span>
            <span>⬜ Paper Trading API</span>
            <span>⬜ Live Broker Approval Gate</span>
          </div>
        </section>

        <a href="/journal" style={styles.back}>
          ← Back to Journal
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
  warning: {
    padding: "22px",
    borderRadius: "24px",
    background: "#FFF7E0",
    border: "1px solid #D6B45A",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    marginBottom: "22px",
  },
  statusMessage: {
    marginBottom: "22px",
    padding: "18px",
    borderRadius: "18px",
    background: "#EEF8F1",
    border: "1px solid #2F8F46",
    color: "#2F8F46",
    fontWeight: "900",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
  },
  ticket: {
    padding: "24px",
    border: "1px solid #2F8F46",
    borderRadius: "28px",
    background: "#EEF8F1",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    marginBottom: "22px",
  },
  ticketGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "14px",
  },
  grid: {
    display: "grid",
    gap: "18px",
  },
  card: {
    padding: "24px",
    border: "1px solid #D6B45A",
    borderRadius: "28px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    marginTop: "18px",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
  },
  brokerName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
  },
  badge: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "900",
  },
  mode: {
    color: "#8A6416",
    fontWeight: "900",
    marginBottom: "6px",
  },
  note: {
    color: "#4B5563",
    lineHeight: "1.5",
  },
  button: {
    width: "100%",
    marginTop: "14px",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  ledger: {
    display: "grid",
    gap: "14px",
    marginTop: "16px",
  },
  ledgerItem: {
    display: "grid",
    gap: "6px",
    padding: "16px",
    borderRadius: "18px",
    background: "#F8F4EA",
    border: "1px solid rgba(168,117,23,0.25)",
  },
  checklist: {
    display: "grid",
    gap: "10px",
    marginTop: "16px",
    color: "#1F1F1F",
    fontWeight: "700",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
  },
};
