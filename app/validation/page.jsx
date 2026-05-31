"use client";

import { useState } from "react";

export default function ValidationPage() {
  const [rules, setRules] = useState({
    vwap: false,
    cloud: false,
    volume: false,
    window: false,
  });

  const completed = Object.values(rules).filter(Boolean).length;
  const score = Math.round((completed / 4) * 100);
  const validated = completed === 4;

  const toggle = (key) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items = [
    ["vwap", "VWAP Confirmed"],
    ["cloud", "Cloud Confirmed"],
    ["volume", "Volume Confirmed"],
    ["window", "Trading Window Confirmed"],
  ];

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>EL Harvest Validation</h1>
        <p style={styles.mantra}>
          Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
        </p>

        <div style={styles.checklist}>
          {items.map(([key, label]) => (
            <label key={key} style={styles.row}>
              <input
                type="checkbox"
                checked={rules[key]}
                onChange={() => toggle(key)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div
          style={{
            ...styles.status,
            borderColor: validated ? "#2f8f46" : "#9b1c1c",
            background: validated ? "#e8f7ec" : "#fdecec",
          }}
        >
          <h2>{validated ? "TRADE VALIDATED" : "TRADE BLOCKED"}</h2>
          <p>Discipline Score: {score}%</p>
        </div>

        <a href="/" style={styles.back}>Back</a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7efe2",
    color: "#111",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  card: {
    maxWidth: "620px",
    margin: "0 auto",
  },
  title: {
    fontSize: "38px",
    marginBottom: "10px",
  },
  mantra: {
    color: "#6b5b2a",
    fontWeight: "700",
    lineHeight: "1.5",
  },
  checklist: {
    marginTop: "28px",
    padding: "24px",
    border: "1px solid #c8a24a",
    borderRadius: "18px",
    background: "#fffaf0",
    display: "grid",
    gap: "18px",
  },
  row: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "700",
  },
  status: {
    marginTop: "28px",
    padding: "24px",
    border: "2px solid",
    borderRadius: "18px",
    textAlign: "center",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#111",
    fontWeight: "700",
  },
};