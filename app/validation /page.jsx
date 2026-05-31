"use client";

import { useState } from "react";

export default function ValidationPage() {
  const [rules, setRules] = useState({
    vwap: false,
    cloud: false,
    volume: false,
    time: false,
  });

  const passed = Object.values(rules).filter(Boolean).length;
  const allValid = passed === 4;
  const grade = allValid ? "A+ VALID" : passed >= 3 ? "B REVIEW" : "TRADE BLOCKED";

  function toggle(rule) {
    setRules((current) => ({
      ...current,
      [rule]: !current[rule],
    }));
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7efe2",
        color: "#1f1a14",
        fontFamily: "Arial, sans-serif",
        padding: "28px",
      }}
    >
      <section style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1>Trade Validation</h1>
        <p>QQQ / SPY Rule Confirmation</p>

        <div style={{ display: "grid", gap: "14px", marginTop: "28px" }}>
          {[
            ["vwap", "VWAP Confirmed"],
            ["cloud", "Cloud Confirmed"],
            ["volume", "Volume Confirmed"],
            ["time", "Trading Window Confirmed"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              style={{
                padding: "18px",
                borderRadius: "16px",
                border: "1px solid #c8a24a",
                background: rules[key] ? "#111" : "#fffaf0",
                color: rules[key] ? "#f6d36b" : "#1f1a14",
                fontSize: "18px",
                fontWeight: "800",
                textAlign: "left",
              }}
            >
              {rules[key] ? "✓" : "○"} {label}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "28px",
            padding: "22px",
            borderRadius: "18px",
            background: allValid ? "#111" : "#fffaf0",
            color: allValid ? "#f6d36b" : "#1f1a14",
            border: "1px solid #c8a24a",
            textAlign: "center",
          }}
        >
          <h2>{grade}</h2>
          <p>
            {allValid
              ? "Rules confirmed. Paper trade may proceed."
              : "EL Harvest remains in protection mode until rules confirm."}
          </p>
        </div>

        <a href="/" style={{ display: "block", marginTop: "24px" }}>
          Back
        </a>
      </section>
    </main>
  );
}
