"use client";

import { useEffect, useState } from "react";

export default function JournalPage() {
  const [trades, setTrades] = useState([]);
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
    const saved = localStorage.getItem("elharvest_journal");
    if (saved) setTrades(JSON.parse(saved));
  }, []);

  const saveTrade = () => {
    const record = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
    };

    const next = [record, ...trades];
    setTrades(next);
    localStorage.setItem("elharvest_journal", JSON.stringify(next));

    setForm({
      ticker: "",
      direction: "CALL",
      entry: "",
      exit: "",
      score: "",
      grade: "",
      notes: "",
    });
  };

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />
          <h1 style={styles.title}>Trade Journal</h1>
          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>New Trade Record</h2>

          <div style={styles.grid}>
            <input style={styles.input} placeholder="Ticker" value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} />
            <select style={styles.input} value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value })}>
              <option>CALL</option>
              <option>PUT</option>
            </select>
            <input style={styles.input} placeholder="Entry Price" value={form.entry} onChange={(e) => setForm({ ...form, entry: e.target.value })} />
            <input style={styles.input} placeholder="Exit Price" value={form.exit} onChange={(e) => setForm({ ...form, exit: e.target.value })} />
            <input style={styles.input} placeholder="Score %" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
            <input style={styles.input} placeholder="Grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
          </div>

          <textarea
            style={styles.textarea}
            placeholder="Trade notes, setup reason, emotion check, exit discipline..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <button style={styles.button} onClick={saveTrade}>SAVE TRADE</button>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Session History</h2>

          {trades.length === 0 ? (
            <p style={styles.empty}>No trades saved yet.</p>
          ) : (
            <div style={styles.list}>
              {trades.map((trade) => (
                <div key={trade.id} style={styles.trade}>
                  <strong>{trade.ticker || "UNKNOWN"} — {trade.direction}</strong>
                  <span>Entry: {trade.entry || "-"} | Exit: {trade.exit || "-"}</span>
                  <span>Score: {trade.score || "0"}% | Grade: {trade.grade || "F"}</span>
                  <small>{trade.createdAt}</small>
                  <p>{trade.notes}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <a href="/" style={styles.back}>← Back to Home</a>
      </section>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#F8F4EA", color: "#1F1F1F", fontFamily: "Arial, sans-serif", padding: "28px" },
  shell: { maxWidth: "900px", margin: "0 auto" },
  header: { textAlign: "center", padding: "18px 10px 26px" },
  logo: { width: "140px", maxWidth: "55%", height: "auto", marginBottom: "8px" },
  title: { margin: 0, color: "#8A6416", fontSize: "42px", fontWeight: "900" },
  mantra: { margin: "12px auto 0", maxWidth: "640px", color: "#6B5B2A", fontWeight: "700", lineHeight: "1.6" },
  card: { marginTop: "22px", padding: "24px", border: "1px solid #D6B45A", borderRadius: "28px", background: "#FFFFFF", boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)" },
  sectionTitle: { marginTop: 0, fontSize: "24px", fontWeight: "900" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px" },
  input: { padding: "16px", borderRadius: "14px", border: "1px solid #D6B45A", fontSize: "16px" },
  textarea: { width: "100%", minHeight: "120px", marginTop: "14px", padding: "16px", borderRadius: "14px", border: "1px solid #D6B45A", fontSize: "16px" },
  button: { width: "100%", marginTop: "16px", padding: "18px", border: "none", borderRadius: "18px", background: "linear-gradient(135deg, #E6C66A, #A87517)", color: "#FFFFFF", fontSize: "18px", fontWeight: "900" },
  empty: { color: "#6B7280" },
  list: { display: "grid", gap: "14px" },
  trade: { display: "grid", gap: "6px", padding: "16px", borderRadius: "18px", background: "#F8F4EA", border: "1px solid rgba(168,117,23,0.25)" },
  back: { display: "inline-block", marginTop: "24px", color: "#8A6416", fontWeight: "900", textDecoration: "none" },
};
