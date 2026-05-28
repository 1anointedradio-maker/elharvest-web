export default function Home() {
  const topCards = [
    {
      title: "Rules Engine",
      status: "Online",
      badge: "ACTIVE",
      detail: "A+ / B hierarchy active. C trades disabled by default.",
      tone: "green",
    },
    {
      title: "Market Window",
      status: "Built",
      badge: "BUILT",
      detail: "Market Open and Power Hour windows are enforced.",
      tone: "gold",
    },
    {
      title: "Risk Control",
      status: "Protected",
      badge: "LOCKED",
      detail: "Risk rules block entries without defined stop logic.",
      tone: "gold",
    },
    {
      title: "Replay Review",
      status: "Built",
      badge: "READY",
      detail: "Session review supports accountability and rule discipline.",
      tone: "green",
    },
  ];

  const validationChecks = [
    { label: "VWAP Confirmation", value: "Pending", status: "pending" },
    { label: "Cloud Direction", value: "Pending", status: "pending" },
    { label: "Structure Confirmation", value: "Pending", status: "pending" },
    { label: "Volume Confirmation", value: "Pending", status: "pending" },
    { label: "Market Window", value: "Locked until approved", status: "locked" },
  ];

  const riskStats = [
    { label: "Decision State", value: "Flat" },
    { label: "Entry Permission", value: "Not Authorized" },
    { label: "Exit Priority", value: "Override Active" },
    { label: "Risk Mode", value: "Protected" },
  ];

  const sessionStats = [
    { label: "Rule Discipline", value: "82%" },
    { label: "Re-entry Blocked", value: "5" },
    { label: "Risk Compliance", value: "Pending" },
    { label: "Session Grade", value: "Pending" },
  ];

  const modules = [
    {
      badge: "BROKER STATUS",
      title: "Connection Control",
      tone: "gold",
      items: [
        "Robinhood: Not connected",
        "IBKR: Not connected",
        "Paper Mode: Available",
        "Live Execution: Disabled",
        "Broker Permission: Locked",
      ],
    },
    {
      badge: "TRADE CHECKLIST",
      title: "Pre-Trade Confirmation",
      tone: "green",
      items: [
        "Price Above/Below VWAP: Pending",
        "Cloud Direction Confirmed: Pending",
        "Market Window Approved: Pending",
        "Risk Defined Before Entry: Required",
        "Final Approval: Not Authorized",
      ],
    },
    {
      badge: "EXECUTION RULES",
      title: "Entry and Exit Discipline",
      tone: "gold",
      items: [
        "No entry without confirmed trade state",
        "No entry while exit management is active",
        "No trade during blocked market windows",
        "Exit signal overrides all new setups",
        "Manual override requires post-session review",
      ],
    },
    {
      badge: "SESSION COMMAND",
      title: "Operator Instruction",
      tone: "gold",
      items: [
        "Current Command: Stay Flat",
        "Reason: Setup not confirmed",
        "Allowed Action: Observe only",
        "Blocked Action: New entry",
        "Next Review: Market Open or Power Hour",
      ],
    },
    {
      badge: "LAUNCH CHECKLIST",
      title: "Pre-Launch Validation",
      tone: "green",
      items: [
        "Logo Loaded: Confirmed",
        "Core Sections Built: Confirmed",
        "Trading Rules Displayed: Confirmed",
        "Risk Logic Displayed: Confirmed",
        "Final Review Status: Pending",
      ],
    },
  ];

  const badgeStyle = (tone) => ({
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    padding: "7px 12px",
    borderRadius: "999px",
    background: tone === "green" ? "#e7f7df" : "#f3ead0",
    marginBottom: "16px",
  });

  const panelStyle = {
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
  };

  const buttonStyle = {
    width: "100%",
    border: "none",
    borderRadius: "8px",
    padding: "16px 20px",
    background: "linear-gradient(180deg, #c9942f, #9f6d16)",
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "15px",
    marginTop: "20px",
  };

  function StatusDot({ status }) {
    const background =
      status === "pending" ? "#d9c77b" : status === "locked" ? "#b54b4b" : "#4f9b57";

    return (
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          borderRadius: "999px",
          background,
          marginRight: "10px",
        }}
      />
    );
  }

  function ModuleCard({ badge, title, items, tone }) {
    return (
      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle(tone)}>{badge}</div>
        <h3 style={{ marginTop: 0, fontSize: "24px" }}>{title}</h3>
        <ul style={{ lineHeight: "1.85", paddingLeft: "24px" }}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <main>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "28px",
          alignItems: "stretch",
          marginTop: "32px",
        }}
      >
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>EL HARVEST CORE</div>
          <h2 style={{ fontSize: "34px", letterSpacing: "3px", marginBottom: "10px" }}>
            Protected Trade Governance
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "680px" }}>
            EL Harvest is built to protect capital before execution. The system stays flat
            until structure, timing, confirmation, and risk rules align.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "26px",
            }}
          >
            {riskStats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  border: "1px solid #eadfb3",
                  borderRadius: "14px",
                  padding: "18px",
                  background: "#fffaf0",
                }}
              >
                <div style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}>
                  {stat.label}
                </div>
                <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <button style={buttonStyle}>EXECUTE PAPER TRADE</button>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>RISK DIAL</div>
          <h3 style={{ marginTop: 0, fontSize: "24px" }}>Hard Stop Protection</h3>

          <div
            style={{
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              border: "22px solid #d9c77b",
              margin: "18px auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              background: "#fffaf0",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", letterSpacing: "1px" }}>TARGET</div>
              <div style={{ fontSize: "30px", fontWeight: "bold", marginTop: "8px" }}>
                18–21%
              </div>
              <div style={{ marginTop: "6px" }}>Hard Stop: 15%</div>
            </div>
          </div>

          <p style={{ lineHeight: "1.6" }}>
            No averaging down. No revenge trade. No new entry while exit management is active.
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "22px",
          marginTop: "32px",
        }}
      >
        {topCards.map((card) => (
          <div key={card.title} style={panelStyle}>
            <div style={badgeStyle(card.tone)}>{card.badge}</div>
            <h3 style={{ marginTop: 0 }}>{card.title}</h3>
            <strong>Status: {card.status}</strong>
            <p style={{ lineHeight: "1.55" }}>{card.detail}</p>
          </div>
        ))}
      </section>

      <section
        style={{
          ...panelStyle,
          marginTop: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 0.9fr",
          gap: "28px",
        }}
      >
        <div>
          <div style={badgeStyle("green")}>CONFIRMATION ENGINE</div>
          <h3 style={{ marginTop: 0, fontSize: "24px" }}>Setup Validation</h3>

          <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
            {validationChecks.map((check) => (
              <div
                key={check.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "14px 16px",
                  border: "1px solid #eadfb3",
                  borderRadius: "12px",
                  background: "#fffaf0",
                }}
              >
                <span>
                  <StatusDot status={check.status} />
                  {check.label}
                </span>
                <strong>{check.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={badgeStyle("gold")}>FINAL DECISION</div>
          <h3 style={{ marginTop: 0, fontSize: "24px" }}>Trade Decision Output</h3>
          <ul style={{ lineHeight: "1.85", paddingLeft: "24px" }}>
            <li>Decision State: Flat</li>
            <li>Entry Permission: Not Authorized</li>
            <li>Exit Permission: Priority Override</li>
            <li>Risk Approval: Pending</li>
            <li>System Command: Wait for confirmed A+ or B setup</li>
          </ul>
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("green")}>SESSION RESULTS</div>
        <h3 style={{ marginTop: 0, fontSize: "24px" }}>Discipline Scoreboard</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginTop: "22px",
          }}
        >
          {sessionStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                border: "1px solid #eadfb3",
                borderRadius: "14px",
                padding: "20px",
                background: "#fffaf0",
              }}
            >
              <div style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {modules.map((module) => (
        <ModuleCard
          key={module.badge}
          badge={module.badge}
          title={module.title}
          items={module.items}
          tone={module.tone}
        />
      ))}
    </main>
  );
}
