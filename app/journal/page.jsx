 "use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function JournalPage() {
  const [trades, setTrades] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    ticker: "",
    direction: "CALL",
    entry: "",
    exit: "",
    score: "",
    grade: "",
    notes: "",
  });

  useEffect(() => {
    initializeJournal();
  }, []);

  const initializeJournal = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user || null);

    await loadTrades(user);

    const ticket = localStorage.getItem("elharvest_trade_ticket");

    if (ticket) {
      const data = JSON.parse(ticket);

      setForm((prev) => ({
        ...prev,
        direction: data.direction || "CALL",
        score: data.score || "",
        grade: data.grade || "",
        notes: `Imported from Validation Engine. Rules passed: ${
          data.rulesPassed || "0/4"
        }. Status timestamp: ${data.timestamp || "N/A"}.`,
      }));
    }
  };

  const loadTrades = async (currentUser) => {
    let query = supabase
      .from("journal_trades")
      .select("*")
      .order("created_at", { ascending: false });

    if (currentUser?.id) {
      query = query.eq("user_id", currentUser.id);
    } else {
      query = query.eq("trader", "AK Martin");
    }

    const { data, error } = await query;

    if (error) {
      setStatusMessage("Supabase load failed. Using local browser data if available.");

      const savedTrades = localStorage.getItem("elharvest_journal");
      if (savedTrades) setTrades(JSON.parse(savedTrades));

      return;
    }

    setTrades(data || []);
  };
  const saveTrade = async () => {
const record = {
  user_id: user?.id || null,
  trader: user?.email || "AK Martin",
  ticker: form.ticker,
  direction: form.direction,
  entry: form.entry,
  exit: form.exit,
  score: form.score,
  grade: form.grade,
  verdict: ticket.verdict || null,
  vwap_confirmed: ticket.vwap_confirmed || false,
  cloud_confirmed: ticket.cloud_confirmed || false,
  volume_confirmed: ticket.volume_confirmed || false,
  time_confirmed: ticket.time_confirmed || false,
  account_size: ticket.account_size || null,
  risk_percent: ticket.risk_percent || null,
  max_risk: ticket.max_risk || null,
  notes: form.notes,
};
    const { data, error } = await supabase
      .from("journal_trades")
      .insert([record])
      .select();

    if (error) {
      setStatusMessage("Supabase save failed. Saved to local browser storage.");

      const fallbackRecord = {
        ...record,
        id: Date.now(),
        created_at: new Date().toLocaleString(),
      };

      const next = [fallbackRecord, ...trades];
      setTrades(next);
      localStorage.setItem("elharvest_journal", JSON.stringify(next));
      return;
    }

    const savedRecord = data?.[0];
    const next = savedRecord ? [savedRecord, ...trades] : trades;

    setTrades(next);
    localStorage.setItem("elharvest_journal", JSON.stringify(next));
    localStorage.removeItem("elharvest_trade_ticket");

    setStatusMessage(
      user?.email
        ? `Trade saved to Supabase for ${user.email}.`
        : "Trade saved to Supabase beta journal."
    );

    setForm({
  ticker: "",
  direction: "CALL",
  entry: "",
  exit: "",
  score: "",
  grade: "",
  notes: "",
});

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
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

          <h1 style={styles.title}>Trade Journal</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>

          <div style={styles.sessionBox}>
            <strong>{user?.email ? `Logged in: ${user.email}` : "Beta Mode: AK Martin"}</strong>

            {user?.email ? (
              <button style={styles.logoutButton} onClick={logout}>
                LOGOUT
              </button>
            ) : (
              <a href="/login" style={styles.loginLink}>
                Login
              </a>
            )}
          </div>
        </header>

        {statusMessage && (
          <section style={styles.statusMessage}>{statusMessage}</section>
        )}

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>New Trade Record</h2>

          <div style={styles.grid}>
            <input
              style={styles.input}
              placeholder="Ticker"
              value={form.ticker}
              onChange={(e) => setForm({ ...form, ticker: e.target.value })}
            />

            <select
              style={styles.input}
              value={form.direction}
              onChange={(e) => setForm({ ...form, direction: e.target.value })}
            >
              <option>CALL</option>
              <option>PUT</option>
            </select>

            <input
              style={styles.input}
              placeholder="Entry Price"
              value={form.entry}
              onChange={(e) => setForm({ ...form, entry: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Exit Price"
              value={form.exit}
              onChange={(e) => setForm({ ...form, exit: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Score %"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Grade"
              value={form.grade}
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
            />
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Trade notes, setup reason, emotion check, exit discipline..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <button style={styles.button} onClick={saveTrade}>
            SAVE TRADE
          </button>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Session History</h2>

          {trades.length === 0 ? (
            <p style={styles.empty}>No trades saved yet.</p>
          ) : (
            <div style={styles.list}>
              {trades.map((trade) => (
                <div key={trade.id} style={styles.trade}>
                  <strong>
                    {trade.ticker || "UNKNOWN"} — {trade.direction}
                  </strong>

                  <span>
                    Entry: {trade.entry || "-"} | Exit: {trade.exit || "-"}
                  </span>

                  <span>
                    Score: {trade.score || "0"}% | Grade: {trade.grade || "F"}
                  </span>
                  <span>
                   Risk: ${trade.max_risk || "0"} | Account: ${trade.account_size || "0"} | Risk %: {trade.risk_percent || "0"}%
                  </span>
                  <small>
                    Trader: {trade.trader || "Unknown"}
                  </small>

                  <small>
                    {trade.created_at
                      ? new Date(trade.created_at).toLocaleString()
                      : "No timestamp"}
                  </small>

                  <p>{trade.notes}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <a href="/validation" style={styles.back}>
          ← Back to Validation
        </a>

        <a href="/broker" style={styles.secondaryBack}>
          Continue to Broker Hub →
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
  sessionBox: {
    margin: "18px auto 0",
    padding: "14px",
    borderRadius: "18px",
    background: "#FFFFFF",
    border: "1px solid #D6B45A",
    display: "grid",
    gap: "10px",
    maxWidth: "520px",
  },
  logoutButton: {
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    background: "#B84A3A",
    color: "#FFFFFF",
    fontWeight: "900",
  },
  loginLink: {
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px",
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #D6B45A",
    fontSize: "16px",
    background: "#FFFFFF",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    marginTop: "14px",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #D6B45A",
    fontSize: "16px",
    background: "#FFFFFF",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    marginTop: "16px",
    padding: "18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "900",
    letterSpacing: "1px",
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
