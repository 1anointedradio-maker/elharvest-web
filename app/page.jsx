"use client";

import { useEffect, useMemo, useState } from "react";

function Field({ label, value, onChange, placeholder, type = "text", inputStyle }) {
  return (
    <label style={{ display: "grid", gap: "8px", fontWeight: "800" }}>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        style={inputStyle}
        inputMode={type === "number" ? "decimal" : "text"}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, inputStyle }) {
  return (
    <label style={{ display: "grid", gap: "8px", fontWeight: "800" }}>
      {label}
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        style={{
          ...inputStyle,
          resize: "vertical",
          lineHeight: "1.5",
          fontFamily: "Arial, sans-serif",
        }}
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

  const [entryReason, setEntryReason] = useState("");
  const [exitPlan, setExitPlan] = useState("");
  const [lessonLogged, setLessonLogged] = useState("");
  const [sessionSaved, setSessionSaved] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Not copied");
const [savedSessions, setSavedSessions] = useState([]);
const [expandedSessionId, setExpandedSessionId] = useState(null);
  useEffect(() => {
  const storedSessions = window.localStorage.getItem("elHarvestSavedSessions");

  if (storedSessions) {
    try {
      setSavedSessions(JSON.parse(storedSessions));
    } catch {
      setSavedSessions([]);
    }
  }
}, []);

useEffect(() => {
  window.localStorage.setItem(
    "elHarvestSavedSessions",
    JSON.stringify(savedSessions)
  );
}, [savedSessions]);

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

    const journalComplete = entryReason.trim() && exitPlan.trim() && lessonLogged.trim();

    let sessionScore = 0;
    if (validBalance && validRisk && validEntry && validStop && tradeRisk > 0) sessionScore += 25;
    sessionScore += confirmedCount * 12.5;
    if (journalComplete) sessionScore += 25;

    return {
      balance,
      risk,
      tradeRisk,
      riskDollars,
      positionSize,
      confirmedCount,
      decision,
      permission,
      reason,
      journalComplete,
      sessionScore: Math.min(Math.round(sessionScore), 100),
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
    entryReason,
    exitPlan,
    lessonLogged,
  ]);

  const reportText = `
EL HARVEST SESSION REPORT

Ticker: ${ticker || "Pending"}
Decision: ${calculations.decision}
Permission: ${calculations.permission}
Reason: ${calculations.reason}

Account Balance: $${calculations.balance || 0}
Risk Percentage: ${calculations.risk || 0}%
Risk Per Trade: $${calculations.riskDollars.toFixed(2)}
Entry Price: ${entryPrice || "Pending"}
Stop Price: ${stopPrice || "Pending"}
Trade Risk: $${calculations.tradeRisk.toFixed(2)}
Suggested Size: ${calculations.positionSize}

Confirmations: ${calculations.confirmedCount}/4
VWAP Confirmation: ${vwapConfirmed ? "Confirmed" : "Pending"}
Cloud Confirmation: ${cloudConfirmed ? "Confirmed" : "Pending"}
Volume Confirmation: ${volumeConfirmed ? "Confirmed" : "Pending"}
Market Window Approved: ${marketWindow ? "Confirmed" : "Pending"}

Entry Reason: ${entryReason || "Pending"}
Exit Plan: ${exitPlan || "Pending"}
Lesson Logged: ${lessonLogged || "Pending"}

Session Score: ${calculations.sessionScore}%
Live Trading: Disabled
Mode: Paper Execution Only
`.trim();

  const panelStyle = {
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 26px rgba(0,0,0,0.055)",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #d9c77b",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "16px",
    background: "#fffaf0",
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

  const secondaryButtonStyle = {
    width: "100%",
    border: "1px solid #d9c77b",
    borderRadius: "10px",
    padding: "15px 18px",
    background: "#fffaf0",
    color: "#111",
    fontWeight: "900",
    letterSpacing: "1.2px",
    fontSize: "14px",
    marginTop: "14px",
  };

  const decisionTone =
    calculations.decision === "PAPER ONLY"
      ? "green"
      : calculations.decision === "WAIT"
      ? "gold"
      : "red";

  function resetSession() {
    setTicker("QQQ");
    setAccountBalance("2000");
    setRiskPercent("2");
    setEntryPrice("");
    setStopPrice("");
    setVwapConfirmed(false);
    setCloudConfirmed(false);
    setVolumeConfirmed(false);
    setMarketWindow(false);
    setEntryReason("");
    setExitPlan("");
    setLessonLogged("");
    setSessionSaved(false);
    setCopyStatus("Not copied");
  }

  function saveSession() {
    const timestamp = new Date().toLocaleString();

    const newSession = {
      id: `${Date.now()}`,
      timestamp,
      ticker: ticker || "Pending",
      decision: calculations.decision,
      score: calculations.sessionScore,
      riskDollars: calculations.riskDollars.toFixed(2),
      tradeRisk: calculations.tradeRisk.toFixed(2),
      size: calculations.positionSize,
      report: reportText,
    };

    setSavedSessions((current) => [newSession, ...current].slice(0, 5));
    setSessionSaved(true);
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(reportText);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy failed");
    }
  }

  function downloadReport() {
    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `el-harvest-${ticker || "session"}-report.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
async function copySavedReport(report) {
  try {
    await navigator.clipboard.writeText(report);
    setCopyStatus("Saved report copied");
  } catch {
    setCopyStatus("Saved report copy failed");
  }
}

function deleteSavedSession(id) {
  setSavedSessions((current) => current.filter((session) => session.id !== id));

  if (expandedSessionId === id) {
    setExpandedSessionId(null);
  }
}

function restoreSavedSession(session) {
  setTicker(session.ticker === "Pending" ? "QQQ" : session.ticker || "QQQ");
  setAccountBalance(session.accountBalance || "2000");
  setRiskPercent(session.riskPercent || "2");
  setEntryPrice(session.entryPrice || "");
  setStopPrice(session.stopPrice || "");

  setVwapConfirmed(Boolean(session.vwapConfirmed));
  setCloudConfirmed(Boolean(session.cloudConfirmed));
  setVolumeConfirmed(Boolean(session.volumeConfirmed));
  setMarketWindow(Boolean(session.marketWindow));

  setEntryReason(session.entryReason || "");
  setExitPlan(session.exitPlan || "");
  setLessonLogged(session.lessonLogged || "");

  setSessionSaved(false);
  setCopyStatus("Restored saved session");
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

        @media (max-width: 900px) {
          .eh-grid-2,
          .eh-grid-3 {
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
            Risk Calculator · Session Journal · Export Report · Saved History
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
            <Field label="Ticker" value={ticker} onChange={setTicker} placeholder="QQQ" inputStyle={inputStyle} />
            <Field label="Account Balance" value={accountBalance} onChange={setAccountBalance} placeholder="2000" type="number" inputStyle={inputStyle} />
            <Field label="Risk %" value={riskPercent} onChange={setRiskPercent} placeholder="2" type="number" inputStyle={inputStyle} />
          </div>

          <div className="eh-grid-2" style={{ marginTop: "18px" }}>
            <Field label="Entry Price" value={entryPrice} onChange={setEntryPrice} placeholder="Example: 5.40" type="number" inputStyle={inputStyle} />
            <Field label="Stop Price" value={stopPrice} onChange={setStopPrice} placeholder="Example: 4.90" type="number" inputStyle={inputStyle} />
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
            <ToggleCheck label="VWAP Confirmation" checked={vwapConfirmed} onChange={setVwapConfirmed} />
            <ToggleCheck label="Cloud Confirmation" checked={cloudConfirmed} onChange={setCloudConfirmed} />
            <ToggleCheck label="Volume Confirmation" checked={volumeConfirmed} onChange={setVolumeConfirmed} />
            <ToggleCheck label="Market Window Approved" checked={marketWindow} onChange={setMarketWindow} />
          </div>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>RISK FORMULA</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Risk Calculation Engine</h3>

          <div className="eh-grid-2" style={{ marginTop: "22px" }}>
            <StatBox label="Risk Per Trade" value={`$${calculations.riskDollars.toFixed(2)}`} />
            <StatBox label="Trade Risk" value={`$${calculations.tradeRisk.toFixed(2)}`} />
            <StatBox label="Suggested Size" value={calculations.positionSize} />
            <StatBox label="Risk Mode" value="Protected" />
          </div>
        </div>
      </section>

      <section className="eh-grid-2" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>TRADE JOURNAL</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Session Notes</h3>

          <div style={{ display: "grid", gap: "18px", marginTop: "20px" }}>
            <TextAreaField label="Entry Reason" value={entryReason} onChange={setEntryReason} placeholder="Why is this setup valid?" inputStyle={inputStyle} />
            <TextAreaField label="Exit Plan" value={exitPlan} onChange={setExitPlan} placeholder="What is the profit target, stop, and invalidation rule?" inputStyle={inputStyle} />
            <TextAreaField label="Lesson Logged" value={lessonLogged} onChange={setLessonLogged} placeholder="What should be reviewed after the session?" inputStyle={inputStyle} />
          </div>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("green")}>SESSION CONTROL</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Save / Reset / Score</h3>

          <div className="eh-grid-2" style={{ marginTop: "22px" }}>
            <StatBox label="Session Score" value={`${calculations.sessionScore}%`} />
<StatBox label="Journal Status" value={calculations.journalComplete ? "Complete" : "Pending"} />
<StatBox label="Last Save Status" value={sessionSaved ? "Saved" : "Not Saved"} />
<StatBox label="Saved History Count" value={savedSessions.length} />
          </div>

          <button type="button" onClick={saveSession} style={buttonStyle}>
            SAVE SESSION
          </button>

          <button type="button" onClick={resetSession} style={secondaryButtonStyle}>
            RESET SESSION
          </button>
          <button
  type="button"
  onClick={() => {
    setSavedSessions([]);
    setSessionSaved(false);
    setCopyStatus("Not copied");
  }}
  style={secondaryButtonStyle}
>
  CLEAR SAVED HISTORY
</button>
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("green")}>EXPORT REPORT</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Paper Trade Log Summary</h3>

        <div className="eh-grid-2">
          <button type="button" onClick={copyReport} style={buttonStyle}>
            COPY REPORT
          </button>

          <button type="button" onClick={downloadReport} style={secondaryButtonStyle}>
            OPEN / DOWNLOAD TEXT REPORT
          </button>
        </div>

        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#fffaf0",
            border: "1px solid #eadfb3",
            borderRadius: "16px",
            padding: "22px",
            lineHeight: "1.65",
            fontSize: "15px",
            overflowX: "auto",
            marginTop: "20px",
          }}
        >
          {reportText}
        </pre>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("gold")}>SAVED HISTORY</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Last Saved Sessions</h3>

        {savedSessions.length === 0 ? (
          <p style={{ lineHeight: "1.7" }}>No sessions saved yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
{savedSessions.map((session) => (
  <div
    key={session.id}
    style={{
      border: "1px solid #eadfb3",
      borderRadius: "16px",
      padding: "18px",
      background: "#fffaf0",
    }}
  >
    <strong>
      {session.ticker} · {session.decision} · Score {session.score}%
    </strong>

    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
      Saved: {session.timestamp} · Risk ${session.riskDollars} · Trade Risk ${session.tradeRisk} · Size {session.size}
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "10px",
      }}
    >
      <button
        type="button"
        onClick={() =>
          setExpandedSessionId(
            expandedSessionId === session.id ? null : session.id
          )
        }
        style={secondaryButtonStyle}
      >
        VIEW FULL REPORT
      </button>

      <button
        type="button"
        onClick={() => copySavedReport(session.report)}
        style={secondaryButtonStyle}
      >
        COPY SAVED REPORT
      </button>

      <button
        type="button"
        onClick={() => restoreSavedSession(session)}
        style={secondaryButtonStyle}
      >
        RESTORE SESSION
      </button>

      <button
        type="button"
        onClick={() => deleteSavedSession(session.id)}
        style={secondaryButtonStyle}
      >
        DELETE SESSION
      </button>
    </div>

    {expandedSessionId === session.id && (
      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#fffdf7",
          border: "1px solid #eadfb3",
          borderRadius: "14px",
          padding: "18px",
          lineHeight: "1.6",
          fontSize: "14px",
          overflowX: "auto",
          marginTop: "16px",
        }}
      >
        {session.report}
      </pre>
    )}
  </div>
))}
          </div>
        )}
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
