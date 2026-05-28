"use client";

import { useMemo, useState } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("QQQ");
  const [accountBalance, setAccountBalance] = useState("2000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [vwapConfirmed, setVwapConfirmed] = useState(false);
  const [cloudConfirmed, setCloudConfirmed] = useState(false);
  const [volumeConfirmed, setVolumeConfirmed] = useState(false);
  const [marketWindow, setMarketWindow] = useState(false);

  const calculations = useMemo(() => {
    const balance = Number(accountBalance);
    const risk = Number(riskPercent);
    const entry = Number(entryPrice);
    const stop = Number(stopPrice);

    const validBalance = balance > 0;
    const validRisk = risk > 0;
    const validEntry = entry > 0;
    const validStop = stop > 0;
    const tradeRisk = Math.abs(entry - stop);
    const riskDollars = validBalance && validRisk ? balance * (risk / 100) : 0;
    const positionSize =
      riskDollars > 0 && tradeRisk > 0 ? Math.floor(riskDollars / tradeRisk) : 0;

    const confirmations = [vwapConfirmed, cloudConfirmed, volumeConfirmed, marketWindow];
    const confirmedCount = confirmations.filter(Boolean).length;

    let decision = "FLAT";
    let permission = "Not Authorized";
    let reason = "Waiting for confirmed setup and valid risk inputs.";

    if (!validBalance || !validRisk || !validEntry || !validStop) {
      decision = "WAIT";
      permission = "Not Authorized";
      reason = "Complete account balance, risk %, entry, and stop price.";
    } else if (tradeRisk <= 0) {
      decision = "WAIT";
      permission = "Not Authorized";
      reason = "Entry and stop cannot be the same.";
    } else if (confirmedCount < 4) {
      decision = "FLAT";
      permission = "Locked";
      reason = "All confirmations are not aligned yet.";
    } else {
      decision = "PAPER ONLY";
      permission = "Paper Trade Authorized";
      reason = "Setup is confirmed for paper execution only.";
    }

    return {
      balance,
      risk,
      entry,
      stop,
      tradeRisk,
      riskDollars,
      positionSize,
      confirmedCount,
      decision,
      permission,
      reason,
    };
  }, [
    accountBalance,
    riskPercent,
    entryPrice,
    stopPrice,
    vwapConfirmed,
    cloudConfirmed,
    volumeConfirmed,
    marketWindow,
  ]);

  const panelStyle = {
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 26px rgba(0,0,0,0.055)",
  };

  const badgeStyle = (tone = "gold") => ({
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "2px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: tone === "green" ? "#e7f7df" : tone === "red" ? "#f8dddd" : "#f3ead0",
    marginBottom: "18px",
  });

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d9c77b",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "16px",
    background: "#fffaf0",
  };

  const buttonStyle = {
    width: "100%",
    border: "none",
    borderRadius: "10px",
    padding: "17px 20px",
    background: "linear-gradient(180deg, #c9942f, #9f6d16)",
    color: "#fff",
    fontWeight: "900",
    letterSpacing: "1.5px",
    fontSize: "15px",
    marginTop: "20px",
    boxShadow: "0 10px 18px rgba(159,109,22,0.22)",
  };

  const decisionTone =
    calculations.decision === "PAPER ONLY"
      ? "green"
      : calculations.decision === "WAIT"
      ? "gold"
      : "red";

  function Field({ label, value, onChange, placeholder, type = "text" }) {
    return (
      <label style={{ display: "grid", gap: "8px", fontWeight: "800" }}>
        {label}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          style={inputStyle}
        />
      </label>
    );
  }

  function ToggleCheck({ label, checked, onChange }) {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #eadfb3",
          borderRadius: "14px",
          padding: "15px 16px",
          background: checked ? "#e7f7df" : "#fffaf0",
          fontSize: "16px",
          fontWeight: "800",
          textAlign: "left",
        }}
      >
        <span>{label}</span>
        <span>{checked ? "Confirmed" : "Pending"}</span>
      </button>
    );
  }

  function StatBox({ label, value }) {
    return (
      <div
        style={{
          border: "1px solid #eadfb3",
          borderRadius: "16px",
          padding: "20px",
          background: "#fffaf0",
        }}
      >
        <div style={{ fontSize: "12px", letterSpacing: "1.5px", fontWeight: "900" }}>
          {label}
        </div>
        <div style={{ fontSize: "26px", fontWeight: "900", marginTop: "10px" }}>
          {value}
        </div>
      </div>
    );
  }

  return (
    <main>
      <style>{`
        .eh-command-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          margin-bottom: 24px;
          padding: 14px 16px;
          border: 1px solid #d9c77b;
          border-radius: 16px;
          background: #fffdf7;
        }

        .eh-grid-2 {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: stretch;
        }

        .eh-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .eh-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        @media (max-width: 900px) {
          .eh-grid-2,
          .eh-grid-3,
          .eh-grid-4 {
            grid-template-columns: 1fr;
          }

          .eh-command-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <section className="eh-command-bar">
        <div>
          <strong style={{ letterSpacing: "1.5px" }}>EL HARVEST COMMAND CENTER</strong>
          <div style={{ fontSize: "14px", marginTop: "6px", opacity: 0.8 }}>
            Interactive Risk Calculator · Paper Execution · Live Trading Locked
          </div>
        </div>

        <div style={badgeStyle(decisionTone)}>{calculations.decision}</div>
      </section>

      <section className="eh-grid-2">
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>TRADE INPUT</div>
          <h2 style={{ fontSize: "34px", letterSpacing: "2px", marginTop: 0 }}>
            Paper Trade Setup
          </h2>

          <div className="eh-grid-3" style={{ marginTop: "22px" }}>
            <Field label="Ticker" value={ticker} onChange={setTicker} placeholder="QQQ" />
            <Field
              label="Account Balance"
              value={accountBalance}
              onChange={setAccountBalance}
              placeholder="2000"
              type="number"
            />
            <Field
              label="Risk %"
              value={riskPercent}
              onChange={setRiskPercent}
              placeholder="2"
              type="number"
            />
          </div>

          <div className="eh-grid-2" style={{ marginTop: "18px" }}>
            <Field
              label="Entry Price"
              value={entryPrice}
              onChange={setEntryPrice}
              placeholder="Example: 5.40"
              type="number"
            />
            <Field
              label="Stop Price"
              value={stopPrice}
              onChange={setStopPrice}
              placeholder="Example: 4.90"
              type="number"
            />
          </div>

          <button style={buttonStyle}>EXECUTE PAPER TRADE</button>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle(decisionTone)}>FINAL DECISION</div>
          <h3 style={{ marginTop: 0, fontSize: "28px" }}>{calculations.decision}</h3>

          <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
            <li>Ticker: {ticker || "Pending"}</li>
            <li>Permission: {calculations.permission}</li>
            <li>Reason: {calculations.reason}</li>
            <li>Confirmations: {calculations.confirmedCount}/4</li>
            <li>Live Trading: Disabled</li>
          </ul>
        </div>
      </section>

      <section className="eh-grid-2" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>CONFIRMATION ENGINE</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Setup Validation</h3>

          <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
            <ToggleCheck
              label="VWAP Confirmation"
              checked={vwapConfirmed}
              onChange={setVwapConfirmed}
            />
            <ToggleCheck
              label="Cloud Confirmation"
              checked={cloudConfirmed}
              onChange={setCloudConfirmed}
            />
            <ToggleCheck
              label="Volume Confirmation"
              checked={volumeConfirmed}
              onChange={setVolumeConfirmed}
            />
            <ToggleCheck
              label="Market Window Approved"
              checked={marketWindow}
              onChange={setMarketWindow}
            />
          </div>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>RISK FORMULA</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Risk Calculation Engine</h3>

          <div className="eh-grid-2" style={{ marginTop: "22px" }}>
            <StatBox
              label="Risk Per Trade"
              value={`$${calculations.riskDollars.toFixed(2)}`}
            />
            <StatBox
              label="Trade Risk"
              value={`$${calculations.tradeRisk.toFixed(2)}`}
            />
            <StatBox label="Suggested Size" value={calculations.positionSize} />
            <StatBox label="Risk Mode" value="Protected" />
          </div>
        </div>
      </section>

      <section className="eh-grid-2" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>RISK DIAL</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Hard Stop Protection</h3>

          <div
            style={{
              width: "210px",
              height: "210px",
              borderRadius: "50%",
              borderTop: "24px solid #4f9b57",
              borderRight: "24px solid #4f9b57",
              borderBottom: "24px solid #d9c77b",
              borderLeft: "24px solid #c9942f",
              margin: "22px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fffaf0",
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "900" }}>
                TARGET
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900", marginTop: "8px" }}>
                18–21%
              </div>
              <div style={{ marginTop: "8px", fontWeight: "800" }}>Hard Stop: 15%</div>
            </div>
          </div>

          <p style={{ lineHeight: "1.65" }}>
            No averaging down. No revenge trade. No new entry while exit management is
            active.
          </p>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("green")}>SESSION RESULTS</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Discipline Scoreboard</h3>

          <div className="eh-grid-2" style={{ marginTop: "22px" }}>
            <StatBox label="Rule Discipline" value="82%" />
            <StatBox label="Re-entry Blocked" value="5" />
            <StatBox label="Risk Compliance" value="Pending" />
            <StatBox label="Session Grade" value="Pending" />
          </div>
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("green")}>LAUNCH CHECKLIST</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Pre-Launch Validation</h3>

        <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
          <li>Logo Loaded: Confirmed</li>
          <li>Core Sections Built: Confirmed</li>
          <li>Interactive Inputs Built: Confirmed</li>
          <li>Risk Logic Displayed: Confirmed</li>
          <li>Paper Execution Only: Confirmed</li>
        </ul>
      </section>

      <footer
        style={{
          marginTop: "40px",
          padding: "28px",
          textAlign: "center",
          borderTop: "1px solid #d9c77b",
          letterSpacing: "1px",
          fontWeight: "800",
        }}
      >
        EL Harvest — Sow the Seed. Keep the Faith. Trust the Process. Reap the Harvest.
      </footer>
    </main>
  );
}
