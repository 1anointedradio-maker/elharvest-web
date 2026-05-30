"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

function SelectField({ label, value, onChange, options, inputStyle }) {
  return (
    <label style={{ display: "grid", gap: "8px", fontWeight: "800" }}>
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={inputStyle}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

function SummaryBar({ label, value, maxValue }) {
  const safeMax = maxValue > 0 ? maxValue : 1;
  const percent = Math.min(Math.max((Number(value) / safeMax) * 100, 0), 100);

  return (
    <div style={{ display: "grid", gap: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "900",
}}
>
        <span>{label}</span>
        <span>{Number(value).toFixed(2)}</span>
      </div>

      <div
        style={{
          height: "14px",
          borderRadius: "999px",
          border: "1px solid #d9c77b",
          background: "#fffaf0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "linear-gradient(90deg, #d9c77b, #9f6d16)",
          }}
        />
      </div>
    </div>
  );
}

function getRuleViolations({
  confirmedCount,
  journalComplete,
  tradeRisk,
  riskDollars,
  balance,
  validExit,
  riskRewardRatio,
  lessonLogged,
}) {
  const violations = [];

  if (confirmedCount < 4) {
    violations.push("Missing confirmation");
  }

  if (!journalComplete) {
    violations.push("Incomplete journal");
  }

  if (!validExit) {
    violations.push("No exit price logged");
  }

  if (riskRewardRatio > 0 && riskRewardRatio < 1) {
    violations.push("Weak risk/reward");
  }

  if (tradeRisk <= 0) {
    violations.push("Invalid trade risk");
  }

  if (balance > 0 && riskDollars / balance > 0.03) {
    violations.push("Over-risked trade");
  }

  if (!lessonLogged.trim()) {
    violations.push("No lesson logged");
  }

  return violations;
}

function getTradeGrade({ score, riskRewardRatio, outcome, violations }) {
  const majorViolationCount = violations.filter((violation) =>
    violation.includes("Missing") ||
    violation.includes("No exit") ||
    violation.includes("Incomplete")
  ).length;

  if (score < 80 || majorViolationCount >= 2) return "Invalid";

  if (
    score >= 100 &&
    riskRewardRatio >= 1.5 &&
    outcome === "Win" &&
    violations.length === 0
  ) {
    return "A+";
  }

  if (score >= 100 && riskRewardRatio >= 1.0 && violations.length <= 1) {
    return "A";
  }

  if (score >= 90 && riskRewardRatio >= 0.75) {
    return "B";
  }

  if (score >= 80) {
    return "C";
  }

  return "Invalid";
}
export default function Home() {
  const fileInputRef = useRef(null);

  const [ticker, setTicker] = useState("QQQ");
  const [accountBalance, setAccountBalance] = useState("2000");
  const [riskPercent, setRiskPercent] = useState("2");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [strategyTag, setStrategyTag] = useState("A+ Setup");
  const [outcomeNotes, setOutcomeNotes] = useState("");

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

  const [filterTicker, setFilterTicker] = useState("");
  const [filterOutcome, setFilterOutcome] = useState("All");
  const [filterDecision, setFilterDecision] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [filterGrade, setFilterGrade] = useState("All");
  const [filterMinScore, setFilterMinScore] = useState("");

  const strategyOptions = [
    { value: "A+ Setup", label: "A+ Setup" },
    { value: "B Setup", label: "B Setup" },
    { value: "VWAP Bounce", label: "VWAP Bounce" },
    { value: "Cloud Breakout", label: "Cloud Breakout" },
    { value: "Market Open", label: "Market Open" },
    { value: "Power Hour", label: "Power Hour" },
    { value: "Exit Recovery", label: "Exit Recovery" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return;

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
    const exit = Number(exitPrice);

    const validBalance = balance > 0;
    const validRisk = risk > 0;
    const validEntry = entry > 0;
    const validStop = stop > 0;
    const validExit = exit > 0;

    const tradeRisk = Math.abs(entry - stop);
    const riskDollars = validBalance && validRisk ? balance * (risk / 100) : 0;

    const positionSize =
    riskDollars > 0 && tradeRisk > 0 ? Math.floor(riskDollars / tradeRisk) : 0;

    const rewardPerUnit = validEntry && validExit ? exit - entry : 0;
    
    const riskRewardRatio =
    tradeRisk > 0 && rewardPerUnit > 0 ? rewardPerUnit / tradeRisk : 0;

    const profitLossDollars =
      validEntry && validExit && positionSize > 0
        ? (exit - entry) * positionSize
        : 0;

    const profitLossPercent =
      validEntry && validExit && entry > 0
        ? ((exit - entry) / entry) * 100
        : 0;

    const outcome =
      !validExit
        ? "Pending"
        : profitLossDollars > 0
        ? "Win"
        : profitLossDollars < 0
        ? "Loss"
        : "Flat";

    const confirmations = [
      vwapConfirmed,
      cloudConfirmed,
      volumeConfirmed,
      marketWindow,
    ];

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

    const journalComplete =
      entryReason.trim() && exitPlan.trim() && lessonLogged.trim();

    let sessionScore = 0;

    if (validBalance && validRisk && validEntry && validStop && tradeRisk > 0) {
      sessionScore += 25;
    }

    sessionScore += confirmedCount * 12.5;

    if (journalComplete) {
      sessionScore += 25;
    }

    const roundedScore = Math.min(Math.round(sessionScore), 100);

const violations = getRuleViolations({
  confirmedCount,
  journalComplete,
  tradeRisk,
  riskDollars,
  balance,
  validExit,
  riskRewardRatio,
  lessonLogged,
});

const tradeGrade = getTradeGrade({
  score: roundedScore,
  riskRewardRatio,
  outcome,
  violations,
});

return {
  balance,
  risk,
  tradeRisk,
  riskDollars,
  positionSize,
  rewardPerUnit,
  riskRewardRatio,
  validExit,
  profitLossDollars,
  profitLossPercent,
  outcome,
  confirmedCount,
  decision,
  permission,
  reason,
  journalComplete,
  violations,
  tradeGrade,
  sessionScore: roundedScore,
};
  }, [
    accountBalance,
    riskPercent,
    entryPrice,
    stopPrice,
    exitPrice,
    vwapConfirmed,
    cloudConfirmed,
    volumeConfirmed,
    marketWindow,
    entryReason,
    exitPlan,
    lessonLogged,
  ]);

  const dashboardMetrics = useMemo(() => {
    const totalTrades = savedSessions.length;

    const wins = savedSessions.filter((session) => session.outcome === "Win").length;
    const losses = savedSessions.filter((session) => session.outcome === "Loss").length;
    const flats = savedSessions.filter((session) => session.outcome === "Flat").length;

    const totalProfitLoss = savedSessions.reduce(
      (sum, session) => sum + Number(session.profitLossDollars || 0),
      0
    );

    const totalProfitLossPercent = savedSessions.reduce(
      (sum, session) => sum + Number(session.profitLossPercent || 0),
      0
    );

    const totalScore = savedSessions.reduce(
      (sum, session) => sum + Number(session.score || 0),
      0
    );

    const winRate = totalTrades > 0 ? (wins / totalTrades) * 100 : 0;
    const averageProfitLossPercent =
      totalTrades > 0 ? totalProfitLossPercent / totalTrades : 0;
    const averageScore = totalTrades > 0 ? totalScore / totalTrades : 0;

    return {
      totalTrades,
      wins,
      losses,
      flats,
      winRate,
      totalProfitLoss,
      averageProfitLossPercent,
      averageScore,
    };
  }, [savedSessions]);

const dailyReview = useMemo(() => {
  const today = new Date().toDateString();

  const todaySessions = savedSessions.filter((session) => {
    const savedDate = new Date(session.timestamp);
    return !Number.isNaN(savedDate.getTime()) && savedDate.toDateString() === today;
  });

  const sortedByProfit = [...todaySessions].sort(
    (a, b) => Number(b.profitLossDollars || 0) - Number(a.profitLossDollars || 0)
  );

  return {
    tradesToday: todaySessions.length,
    winsToday: todaySessions.filter((session) => session.outcome === "Win").length,
    lossesToday: todaySessions.filter((session) => session.outcome === "Loss").length,
    dailyProfitLoss: todaySessions.reduce(
      (sum, session) => sum + Number(session.profitLossDollars || 0),
      0
    ),
    bestSetup: sortedByProfit[0]?.strategyTag || "Pending",
    worstSetup: sortedByProfit[sortedByProfit.length - 1]?.strategyTag || "Pending",
    lessonOfDay:
      todaySessions.find((session) => session.lessonLogged)?.lessonLogged || "Pending",
  };
}, [savedSessions]);

const lockoutStatus = useMemo(() => {
  const recent = savedSessions.slice(0, 3);

  const recentLosses = recent.filter((session) => session.outcome === "Loss").length;
  const recentInvalid = recent.filter((session) => session.tradeGrade === "Invalid").length;

  const recentAverageScore =
    recent.length > 0
      ? recent.reduce((sum, session) => sum + Number(session.score || 0), 0) /
        recent.length
      : 100;

  if (recentLosses >= 2 || recentInvalid >= 2 || recentAverageScore < 75) {
    return {
      mode: "LOCKOUT WARNING",
      message:
        "Stop trading. Review only. Paper execution remains locked until discipline improves.",
      tone: "red",
    };
  }

  if (recentLosses === 1 || recentAverageScore < 90) {
    return {
      mode: "CAUTION",
      message: "Reduce aggression. Take only confirmed A+ or A setups.",
      tone: "gold",
    };
  }

  return {
    mode: "CLEAR",
    message: "No lockout warning active. Continue paper-only discipline.",
    tone: "green",
  };
}, [savedSessions]);

const filteredSessions = useMemo(() => {
    const minScore = Number(filterMinScore);

    return savedSessions.filter((session) => {
      const tickerMatch =
        !filterTicker.trim() ||
        String(session.ticker || "")
          .toLowerCase()
          .includes(filterTicker.trim().toLowerCase());

      const outcomeMatch =
        filterOutcome === "All" || String(session.outcome || "Pending") === filterOutcome;

      const decisionMatch =
        filterDecision === "All" || String(session.decision || "") === filterDecision;

  const tagMatch =
  filterTag === "All" || String(session.strategyTag || "") === filterTag;

const gradeMatch =
  filterGrade === "All" || String(session.tradeGrade || "") === filterGrade;

const scoreMatch =
  !filterMinScore || Number(session.score || 0) >= minScore;

return tickerMatch && outcomeMatch && decisionMatch && tagMatch && gradeMatch && scoreMatch;
}, [
  savedSessions,
  filterTicker,
  filterOutcome,
  filterDecision,
  filterTag,
  filterGrade,
  filterMinScore,
]);

  const reportText = `
EL HARVEST SESSION REPORT

Ticker: ${ticker || "Pending"}
Strategy Tag: ${strategyTag}
Decision: ${calculations.decision}
Trade Grade: ${calculations.tradeGrade}
Permission: ${calculations.permission}
Reason: ${calculations.reason}

Account Balance: $${calculations.balance || 0}
Risk Percentage: ${calculations.risk || 0}%
Risk Per Trade: $${calculations.riskDollars.toFixed(2)}
Entry Price: ${entryPrice || "Pending"}
Stop Price: ${stopPrice || "Pending"}
Exit Price: ${exitPrice || "Pending"}
Trade Risk: $${calculations.tradeRisk.toFixed(2)}
Reward Per Unit: $${calculations.rewardPerUnit.toFixed(2)}
Risk/Reward Ratio: ${calculations.riskRewardRatio.toFixed(2)}
Suggested Size: ${calculations.positionSize}
P/L Dollars: $${calculations.profitLossDollars.toFixed(2)}
P/L Percent: ${calculations.profitLossPercent.toFixed(2)}%
Outcome: ${calculations.outcome}

Confirmations: ${calculations.confirmedCount}/4
VWAP Confirmation: ${vwapConfirmed ? "Confirmed" : "Pending"}
Cloud Confirmation: ${cloudConfirmed ? "Confirmed" : "Pending"}
Volume Confirmation: ${volumeConfirmed ? "Confirmed" : "Pending"}
Market Window Approved: ${marketWindow ? "Confirmed" : "Pending"}

Rule Violations:
${calculations.violations.length > 0 ? calculations.violations.join("\n") : "None"}

Entry Reason: ${entryReason || "Pending"}

Entry Reason: ${entryReason || "Pending"}
Exit Plan: ${exitPlan || "Pending"}
Lesson Logged: ${lessonLogged || "Pending"}
Outcome Notes: ${outcomeNotes || "Pending"}

Session Score: ${calculations.sessionScore}%
Live Trading: Disabled
Mode: Paper Execution Only
`.trim();

  const fullExportReport = `
${reportText}

==============================
DAILY REVIEW
==============================
Trades Today: ${dailyReview.tradesToday}
Wins Today: ${dailyReview.winsToday}
Losses Today: ${dailyReview.lossesToday}
Daily P/L: $${dailyReview.dailyProfitLoss.toFixed(2)}
Best Setup: ${dailyReview.bestSetup}
Worst Setup: ${dailyReview.worstSetup}
Lesson of Day: ${dailyReview.lessonOfDay}

==============================
LOCKOUT STATUS
==============================
Mode: ${lockoutStatus.mode}
Message: ${lockoutStatus.message}

${
  savedSessions.length > 0
    ? `
==============================
SAVED SESSION HISTORY
==============================

${savedSessions
  .map(
    (session, index) => `
SAVED SESSION #${index + 1}

Ticker: ${session.ticker}
Strategy Tag: ${session.strategyTag || "Untagged"}
Decision: ${session.decision}
Score: ${session.score}%
Saved: ${session.timestamp}

Risk Per Trade: $${session.riskDollars}
Trade Risk: $${session.tradeRisk}
Suggested Size: ${session.size}
Exit Price: ${session.exitPrice || "Pending"}
P/L Dollars: $${session.profitLossDollars || "0.00"}
P/L Percent: ${session.profitLossPercent || "0.00"}%
Outcome: ${session.outcome || "Pending"}

${session.report}
`
  )
  .join("\n------------------------------\n")}
`
    : `
==============================
SAVED SESSION HISTORY
==============================

No saved sessions.
`
}
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
    background:
      tone === "green" ? "#e7f7df" : tone === "red" ? "#f8dddd" : "#f3ead0",
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

  const canSaveSession =
    calculations.sessionScore === 100 &&
    calculations.decision === "PAPER ONLY" &&
    calculations.journalComplete;

  function resetSession() {
    setTicker("QQQ");
    setAccountBalance("2000");
    setRiskPercent("2");
    setEntryPrice("");
    setStopPrice("");
    setExitPrice("");
    setStrategyTag("A+ Setup");
    setOutcomeNotes("");
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
    if (!canSaveSession) {
      setCopyStatus("Save blocked: complete full paper trade setup first");
      setSessionSaved(false);
      return;
    }

    const timestamp = new Date().toLocaleString();

    const newSession = {
      id: `${Date.now()}`,
      timestamp,
      ticker: ticker || "Pending",
      strategyTag,
      accountBalance,
      riskPercent,
      entryPrice,
      stopPrice,
      exitPrice,
      vwapConfirmed,
      cloudConfirmed,
      volumeConfirmed,
      marketWindow,
      entryReason,
      exitPlan,
      lessonLogged,
      outcomeNotes,
      decision: calculations.decision,
      permission: calculations.permission,
      reason: calculations.reason,
      score: calculations.sessionScore,
      riskDollars: calculations.riskDollars.toFixed(2),
      tradeRisk: calculations.tradeRisk.toFixed(2),
      size: calculations.positionSize,
      profitLossDollars: calculations.profitLossDollars.toFixed(2),
      profitLossPercent: calculations.profitLossPercent.toFixed(2),
      outcome: calculations.outcome,
      report: reportText,
    };

    setSavedSessions((current) => [newSession, ...current].slice(0, 50));
    setSessionSaved(true);
    setCopyStatus("Session saved");
  }

  async function copyReport() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyStatus("Copy unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(fullExportReport);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy failed");
    }
  }

  function downloadReport() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const blob = new Blob([fullExportReport], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `el-harvest-${ticker || "session"}-report.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  function downloadCsvLedger() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const headers = [
      "Date",
      "Ticker",
      "Strategy Tag",
      "Decision",
      "Score",
      "Risk Per Trade",
      "Trade Risk",
      "Suggested Size",
      "Entry Price",
      "Stop Price",
      "Exit Price",
      "P/L Dollars",
      "P/L Percent",
      "Outcome",
      "Entry Reason",
      "Exit Plan",
      "Lesson Logged",
      "Outcome Notes",
    ];

    const rows = savedSessions.map((session) => [
      session.timestamp || "",
      session.ticker || "",
      session.strategyTag || "",
      session.decision || "",
      `${session.score || 0}%`,
      session.riskDollars || "",
      session.tradeRisk || "",
      session.size || "",
      session.entryPrice || "",
      session.stopPrice || "",
      session.exitPrice || "",
      session.profitLossDollars || "",
      session.profitLossPercent || "",
      session.outcome || "",
      session.entryReason || "",
      session.exitPlan || "",
      session.lessonLogged || "",
      session.outcomeNotes || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "el-harvest-trade-ledger.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  function exportJsonBackup() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const backup = {
      app: "EL Harvest",
      version: "Phase 18",
      exportedAt: new Date().toISOString(),
      savedSessions,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "el-harvest-backup.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  function importJsonBackup(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const importedSessions = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.savedSessions)
          ? parsed.savedSessions
          : [];

        setSavedSessions(importedSessions);
        setCopyStatus(`Imported ${importedSessions.length} saved sessions`);
      } catch {
        setCopyStatus("Import failed: invalid JSON backup");
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  }

  async function copySavedReport(report) {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyStatus("Saved report copy unavailable");
      return;
    }

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
    setTicker(session.ticker && session.ticker !== "Pending" ? session.ticker : "QQQ");
    setAccountBalance(session.accountBalance || "2000");
    setRiskPercent(session.riskPercent || "2");
    setStrategyTag(session.strategyTag || "A+ Setup");

    let restoredEntry = session.entryPrice || "";
    let restoredStop = session.stopPrice || "";
    let restoredExit = session.exitPrice || "";
    let restoredEntryReason = session.entryReason || "";
    let restoredExitPlan = session.exitPlan || "";
    let restoredLesson = session.lessonLogged || "";
    let restoredOutcomeNotes = session.outcomeNotes || "";

    if (session.report) {
      const entryMatch = session.report.match(/Entry Price:\s(.+)/);
      const stopMatch = session.report.match(/Stop Price:\s(.+)/);
      const exitMatch = session.report.match(/Exit Price:\s(.+)/);
      const entryReasonMatch = session.report.match(/Entry Reason:\s(.+)/);
      const exitPlanMatch = session.report.match(/Exit Plan:\s(.+)/);
      const lessonMatch = session.report.match(/Lesson Logged:\s(.+)/);
      const outcomeNotesMatch = session.report.match(/Outcome Notes:\s(.+)/);

      if (!restoredEntry) {
        restoredEntry =
          entryMatch?.[1] && entryMatch[1] !== "Pending"
            ? entryMatch[1].trim()
            : "";
      }

      if (!restoredStop) {
        restoredStop =
          stopMatch?.[1] && stopMatch[1] !== "Pending"
            ? stopMatch[1].trim()
            : "";
      }

      if (!restoredExit) {
        restoredExit =
          exitMatch?.[1] && exitMatch[1] !== "Pending"
            ? exitMatch[1].trim()
            : "";
      }

      if (!restoredEntryReason) {
        restoredEntryReason =
          entryReasonMatch?.[1] && entryReasonMatch[1] !== "Pending"
            ? entryReasonMatch[1].trim()
            : "";
      }

      if (!restoredExitPlan) {
        restoredExitPlan =
          exitPlanMatch?.[1] && exitPlanMatch[1] !== "Pending"
            ? exitPlanMatch[1].trim()
            : "";
      }

      if (!restoredLesson) {
        restoredLesson =
          lessonMatch?.[1] && lessonMatch[1] !== "Pending"
            ? lessonMatch[1].trim()
            : "";
      }

      if (!restoredOutcomeNotes) {
        restoredOutcomeNotes =
          outcomeNotesMatch?.[1] && outcomeNotesMatch[1] !== "Pending"
            ? outcomeNotesMatch[1].trim()
            : "";
      }
    }

    setEntryPrice(restoredEntry);
    setStopPrice(restoredStop);
    setExitPrice(restoredExit);

    setVwapConfirmed(
      Boolean(session.vwapConfirmed) ||
        session.report?.includes("VWAP Confirmation: Confirmed")
    );
    setCloudConfirmed(
      Boolean(session.cloudConfirmed) ||
        session.report?.includes("Cloud Confirmation: Confirmed")
    );
    setVolumeConfirmed(
      Boolean(session.volumeConfirmed) ||
        session.report?.includes("Volume Confirmation: Confirmed")
    );
    setMarketWindow(
      Boolean(session.marketWindow) ||
        session.report?.includes("Market Window Approved: Confirmed")
    );

    setEntryReason(restoredEntryReason);
    setExitPlan(restoredExitPlan);
    setLessonLogged(restoredLesson);
    setOutcomeNotes(restoredOutcomeNotes);

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

        .eh-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
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
            Metrics · Filters · Tags · Charts · JSON Backup · P/L Tracker
          </div>
        </div>

        <div style={badgeStyle(decisionTone)}>{calculations.decision}</div>
      </section>

      <section style={{ ...panelStyle, marginTop: "24px", marginBottom: "32px" }}>
        <div style={badgeStyle("green")}>PERFORMANCE DASHBOARD</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Saved Session Metrics</h3>

        <div className="eh-grid-4" style={{ marginTop: "22px" }}>
          <StatBox label="Total Trades" value={dashboardMetrics.totalTrades} />
          <StatBox label="Wins" value={dashboardMetrics.wins} />
          <StatBox label="Losses" value={dashboardMetrics.losses} />
          <StatBox label="Flats" value={dashboardMetrics.flats} />
          <StatBox
            label="Win Rate"
            value={`${dashboardMetrics.winRate.toFixed(2)}%`}
          />
          <StatBox
            label="Total P/L"
            value={`$${dashboardMetrics.totalProfitLoss.toFixed(2)}`}
          />
          <StatBox
            label="Avg P/L %"
            value={`${dashboardMetrics.averageProfitLossPercent.toFixed(2)}%`}
          />
          <StatBox
            label="Avg Score"
            value={`${dashboardMetrics.averageScore.toFixed(2)}%`}
          />
        </div>
      </section>

      <section style={{ ...panelStyle, marginBottom: "32px" }}>
        <div style={badgeStyle("gold")}>PERFORMANCE BARS</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Visual Summary</h3>

        <div style={{ display: "grid", gap: "18px", marginTop: "22px" }}>
          <SummaryBar label="Win Rate" value={dashboardMetrics.winRate} maxValue={100} />
          <SummaryBar
            label="Average Score"
            value={dashboardMetrics.averageScore}
            maxValue={100}
          />
          <SummaryBar
            label="Average P/L %"
            value={Math.abs(dashboardMetrics.averageProfitLossPercent)}
            maxValue={100}
          />
        </div>
      </section>

      <section className="eh-grid-2">
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>TRADE INPUT</div>
          <h2 style={{ fontSize: "34px", letterSpacing: "2px", marginTop: 0 }}>
            Paper Trade Setup
          </h2>

          <div className="eh-grid-3" style={{ marginTop: "22px" }}>
            <Field
              label="Ticker"
              value={ticker}
              onChange={setTicker}
              placeholder="QQQ"
              inputStyle={inputStyle}
            />
            <Field
              label="Account Balance"
              value={accountBalance}
              onChange={setAccountBalance}
              placeholder="2000"
              type="number"
              inputStyle={inputStyle}
            />
            <Field
              label="Risk %"
              value={riskPercent}
              onChange={setRiskPercent}
              placeholder="2"
              type="number"
              inputStyle={inputStyle}
            />
          </div>

          <div className="eh-grid-3" style={{ marginTop: "18px" }}>
            <Field
              label="Entry Price"
              value={entryPrice}
              onChange={setEntryPrice}
              placeholder="Example: 5.40"
              type="number"
              inputStyle={inputStyle}
            />
            <Field
              label="Stop Price"
              value={stopPrice}
              onChange={setStopPrice}
              placeholder="Example: 4.90"
              type="number"
              inputStyle={inputStyle}
            />
            <Field
              label="Exit Price"
              value={exitPrice}
              onChange={setExitPrice}
              placeholder="Example: 6.10"
              type="number"
              inputStyle={inputStyle}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <SelectField
              label="Strategy Tag"
              value={strategyTag}
              onChange={setStrategyTag}
              options={strategyOptions}
              inputStyle={inputStyle}
            />
          </div>

          <button type="button" style={buttonStyle}>
            EXECUTE PAPER TRADE
          </button>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle(decisionTone)}>FINAL DECISION</div>
          <h3 style={{ marginTop: 0, fontSize: "28px" }}>{calculations.decision}</h3>

          <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
            <li>Ticker: {ticker || "Pending"}</li>
            <li>Tag: {strategyTag}</li>
            <li>Permission: {calculations.permission}</li>
            <li>Reason: {calculations.reason}</li>
            <li>Confirmations: {calculations.confirmedCount}/4</li>
            <li>Outcome: {calculations.outcome}</li>
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
            <StatBox
              label="P/L Dollars"
              value={`$${calculations.profitLossDollars.toFixed(2)}`}
            />
            <StatBox
              label="P/L Percent"
              value={`${calculations.profitLossPercent.toFixed(2)}%`}
            />
            <StatBox label="Outcome" value={calculations.outcome} />
          </div>
        </div>
      </section>

      <section className="eh-grid-2" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>TRADE JOURNAL</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Session Notes</h3>

          <div style={{ display: "grid", gap: "18px", marginTop: "20px" }}>
            <TextAreaField
              label="Entry Reason"
              value={entryReason}
              onChange={setEntryReason}
              placeholder="Why is this setup valid?"
              inputStyle={inputStyle}
            />
            <TextAreaField
              label="Exit Plan"
              value={exitPlan}
              onChange={setExitPlan}
              placeholder="What is the profit target, stop, and invalidation rule?"
              inputStyle={inputStyle}
            />
            <TextAreaField
              label="Lesson Logged"
              value={lessonLogged}
              onChange={setLessonLogged}
              placeholder="What should be reviewed after the session?"
              inputStyle={inputStyle}
            />
            <TextAreaField
              label="Outcome Notes"
              value={outcomeNotes}
              onChange={setOutcomeNotes}
              placeholder="What happened after the trade?"
              inputStyle={inputStyle}
            />
          </div>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("green")}>SESSION CONTROL</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Save / Reset / Score</h3>

          <div className="eh-grid-2" style={{ marginTop: "22px" }}>
            <StatBox label="Session Score" value={`${calculations.sessionScore}%`} />
            <StatBox
              label="Journal Status"
              value={calculations.journalComplete ? "Complete" : "Pending"}
            />
            <StatBox
              label="Last Save Status"
              value={sessionSaved ? "Saved" : "Not Saved"}
            />
            <StatBox label="Saved History Count" value={savedSessions.length} />
          </div>

          <button
            type="button"
            onClick={saveSession}
            disabled={!canSaveSession}
            style={{
              ...buttonStyle,
              opacity: canSaveSession ? 1 : 0.45,
              cursor: canSaveSession ? "pointer" : "not-allowed",
            }}
          >
            {canSaveSession ? "SAVE SESSION" : "COMPLETE SETUP BEFORE SAVING"}
          </button>

          <p
            style={{
              marginTop: "12px",
              marginBottom: 0,
              fontWeight: "800",
              lineHeight: "1.5",
            }}
          >
            {canSaveSession
              ? "Save Gate: Open — full paper trade setup confirmed."
              : "Save Gate: Locked — complete valid risk inputs, all 4 confirmations, and journal before saving."}
          </p>

          <button type="button" onClick={resetSession} style={secondaryButtonStyle}>
            RESET SESSION
          </button>
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("green")}>EXPORT REPORT</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Paper Trade Log Summary</h3>

        <div className="eh-grid-3">
          <button type="button" onClick={copyReport} style={buttonStyle}>
            COPY REPORT
          </button>

          <button type="button" onClick={downloadReport} style={secondaryButtonStyle}>
            OPEN / DOWNLOAD TEXT REPORT
          </button>

          <button type="button" onClick={downloadCsvLedger} style={secondaryButtonStyle}>
            DOWNLOAD CSV LEDGER
          </button>
        </div>

        <div className="eh-grid-2" style={{ marginTop: "18px" }}>
          <button type="button" onClick={exportJsonBackup} style={secondaryButtonStyle}>
            EXPORT JSON BACKUP
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={secondaryButtonStyle}
          >
            IMPORT JSON BACKUP
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importJsonBackup}
            style={{ display: "none" }}
          />
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
          {fullExportReport}
        </pre>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("gold")}>TRADE FILTERS</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>Filter Saved Sessions</h3>

        <div className="eh-grid-4" style={{ marginTop: "22px" }}>
          <Field
            label="Ticker Filter"
            value={filterTicker}
            onChange={setFilterTicker}
            placeholder="QQQ"
            inputStyle={inputStyle}
          />

          <SelectField
            label="Outcome Filter"
            value={filterOutcome}
            onChange={setFilterOutcome}
            inputStyle={inputStyle}
            options={[
              { value: "All", label: "All" },
              { value: "Win", label: "Win" },
              { value: "Loss", label: "Loss" },
              { value: "Flat", label: "Flat" },
              { value: "Pending", label: "Pending" },
            ]}
          />

          <SelectField
            label="Decision Filter"
            value={filterDecision}
            onChange={setFilterDecision}
            inputStyle={inputStyle}
            options={[
              { value: "All", label: "All" },
              { value: "PAPER ONLY", label: "Paper Only" },
              { value: "WAIT", label: "Wait" },
              { value: "FLAT", label: "Flat" },
            ]}
          />

          <SelectField
            label="Tag Filter"
            value={filterTag}
            onChange={setFilterTag}
            inputStyle={inputStyle}
            options={[
              { value: "All", label: "All" },
              ...strategyOptions,
            ]}
          />

          <Field
            label="Minimum Score"
            value={filterMinScore}
            onChange={setFilterMinScore}
            placeholder="Example: 80"
            type="number"
            inputStyle={inputStyle}
          />
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("gold")}>SAVED HISTORY</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>
          Last Saved Sessions ({filteredSessions.length} shown)
        </h3>

        {filteredSessions.length === 0 ? (
          <p style={{ lineHeight: "1.7" }}>No sessions match the current filters.</p>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {filteredSessions.map((session, index) => (
              <div
                key={session.id}
                style={{
                  border: "1px solid #eadfb3",
                  borderRadius: "16px",
                  padding: "18px",
                  background: "#fffaf0",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "900",
                      letterSpacing: "1.8px",
                      opacity: 0.75,
                    }}
                  >
                    SAVED SESSION #{index + 1}
                  </div>

                  <strong style={{ fontSize: "18px" }}>
                    {session.ticker} · {session.decision} · Score {session.score}%
                  </strong>

                  <div style={{ lineHeight: "1.7", fontSize: "15px" }}>
                    <div>Saved: {session.timestamp}</div>
                    <div>Strategy Tag: {session.strategyTag || "Untagged"}</div>
                    <div>Risk Per Trade: ${session.riskDollars}</div>
                    <div>Trade Risk: ${session.tradeRisk}</div>
                    <div>Suggested Size: {session.size}</div>
                    <div>Exit Price: {session.exitPrice || "Pending"}</div>
                    <div>P/L Dollars: ${session.profitLossDollars || "0.00"}</div>
                    <div>P/L Percent: {session.profitLossPercent || "0.00"}%</div>
                    <div>Outcome: {session.outcome || "Pending"}</div>
                  </div>
                </div>

                <div className="eh-grid-4" style={{ marginTop: "18px" }}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSessionId(
                        expandedSessionId === session.id ? null : session.id
                      )
                    }
                    style={secondaryButtonStyle}
                  >
                    VIEW REPORT
                  </button>

                  <button
                    type="button"
                    onClick={() => copySavedReport(session.report)}
                    style={secondaryButtonStyle}
                  >
                    COPY REPORT
                  </button>

                  <button
                    type="button"
                    onClick={() => restoreSavedSession(session)}
                    style={secondaryButtonStyle}
                  >
                    RESTORE
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteSavedSession(session.id)}
                    style={secondaryButtonStyle}
                  >
                    DELETE
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
                      lineHeight: "1.65",
                      fontSize: "14px",
                      overflowX: "auto",
                      marginTop: "18px",
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
1668 |     </footer>
1669 |   </main>
1670 | );
1671 | }
