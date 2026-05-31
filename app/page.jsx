"use client";

import { useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState("");

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
      <section
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <img
          src="/el-harvest-logo.png"
          alt="EL Harvest"
          style={{
            width: "320px",
            maxWidth: "100%",
            height: "auto",
            marginBottom: "24px",
          }}
        />

        <h1 style={{ fontSize: "34px", letterSpacing: "2px", margin: "0" }}>
          EL HARVEST
        </h1>

        <p style={{ fontSize: "18px", marginTop: "16px", lineHeight: "1.6" }}>
          Sow the Seed.
          <br />
          Keep the Faith.
          <br />
          Trust the Process.
          <br />
          Reap with EL Harvest.
        </p>

        <div
          style={{
            marginTop: "34px",
            display: "grid",
            gap: "16px",
          }}
        >
          <button
            onClick={() => setMode("novice")}
            style={buttonStyle}
          >
            NOVICE
            <span style={subText}>Learn Discipline</span>
          </button>

          <button
            onClick={() => setMode("professional")}
            style={buttonStyle}
          >
            PROFESSIONAL
            <span style={subText}>Execute Discipline</span>
          </button>
        </div>

        {mode && (
          <div
            style={{
              marginTop: "28px",
              padding: "20px",
              border: "1px solid #c8a24a",
              borderRadius: "18px",
              background: "#fffaf0",
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              {mode === "novice" ? "Novice Mode" : "Professional Mode"}
            </h2>

            <p>
              {mode === "novice"
                ? "Plain-English guidance is enabled. EL Harvest will explain why a trade is valid or blocked."
                : "Fast execution view is enabled. EL Harvest will show rule status, trade grade, and discipline score."}
            </p>

            <a href="/validation" style={linkButton}>
              Continue to Trade Validation
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "20px",
  borderRadius: "18px",
  border: "1px solid #c8a24a",
  background: "#111",
  color: "#f6d36b",
  fontSize: "20px",
  fontWeight: "800",
  letterSpacing: "1px",
  display: "grid",
  gap: "6px",
};

const subText = {
  fontSize: "14px",
  color: "#fff3c4",
  fontWeight: "400",
};

const linkButton = {
  display: "inline-block",
  marginTop: "12px",
  padding: "14px 18px",
  borderRadius: "14px",
  background: "#c8a24a",
  color: "#111",
  fontWeight: "800",
  textDecoration: "none",
};
