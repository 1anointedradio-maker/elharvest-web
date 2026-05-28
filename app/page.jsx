export default function Home() {
  const statusCards = [
    {
      badge: "ACTIVE",
      title: "Rules Engine",
      status: "Online",
      detail: "A+ / B hierarchy active. C trades disabled by default.",
      tone: "green",
    },
    {
      badge: "BUILT",
      title: "Market Window",
      status: "Built",
      detail: "Market Open and Power Hour windows are enforced.",
      tone: "gold",
    },
    {
      badge: "LOCKED",
      title: "Risk Control",
      status: "Protected",
      detail: "Risk rules block entries without defined stop logic.",
      tone: "gold",
    },
    {
      badge: "READY",
      title: "Replay Review",
      status: "Built",
      detail: "Session review supports accountability and rule discipline.",
      tone: "green",
    },
  ];

  const confirmationChecks = [
    { label: "VWAP Confirmation", value: "Pending", status: "pending" },
    { label: "Cloud Confirmation", value: "Pending", status: "pending" },
    { label: "Structure Confirmation", value: "Pending", status: "pending" },
    { label: "Volume Confirmation", value: "Pending", status: "pending" },
    { label: "Market Window", value: "Locked", status: "locked" },
  ];

  const decisionItems = [
    "Decision State: Flat",
    "Entry Permission: Not Authorized",
    "Exit Permission: Priority Override",
    "Risk Approval: Pending",
    "System Command: Wait for confirmed A+ or B setup",
  ];

  const brokerItems = [
    "Robinhood: Not connected",
    "IBKR: Not connected",
    "Paper Mode: Available",
    "Live Execution: Disabled",
    "Broker Permission: Locked",
  ];

  const sessionStats = [
    { label: "Rule Discipline", value: "82%" },
    { label: "Re-entry Blocked", value: "5" },
    { label: "Risk Compliance", value: "Pending" },
    { label: "Session Grade", value: "Pending" },
  ];

  const modules = [
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
      badge: "SYSTEM LOCK",
      title: "Readiness Gate",
      tone: "gold",
      items: [
        "System Mode: Protected",
        "Trading Permission: Locked",
        "Data Requirement: Pending live inputs",
        "Override Permission: Disabled",
        "Release Condition: Confirmed A+ or B setup",
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
    fontWeight: "800",
    letterSpacing: "2px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: tone === "green" ? "#e7f7df" : "#f3ead0",
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

  function StatusDot({ status }) {
    const color =
      status === "locked" ? "#b54b4b" : status === "confirmed" ? "#4f9b57" : "#d9c77b";

    return (
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: color,
          display: "inline-block",
          marginRight: "10px",
        }}
      />
    );
  }

  function ModuleCard({ badge, title, items, tone }) {
    return (
      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle(tone)}>{badge}</div>
        <h3 style={{ marginTop: 0, fontSize: "26px" }}>{title}</h3>
        <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
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
          grid-template-columns: 1.2fr 0.8fr;
          gap: 28px;
          align-items: stretch;
        }

        .eh-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .eh-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .eh-mobile-stack {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 28px;
        }

        @media (max-width: 900px) {
          .eh-grid-2,
          .eh-grid-3,
          .eh-grid-4,
          .eh-mobile-stack {
            grid-template-columns: 1fr;
          }

          .eh-command-bar {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <section className="eh-command-bar">
        <div>
          <strong style={{ letterSpacing: "1.5px" }}>EL HARVEST COMMAND CENTER</strong>
          <div style={{ fontSize: "14px", marginTop: "6px", opacity: 0.8 }}>
            Protected Mode · Paper Execution · Live Trading Locked
          </div>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            background: "#e7f7df",
            fontWeight: "800",
            letterSpacing: "1px",
            fontSize: "12px",
          }}
        >
          SYSTEM SAFE
        </div>
      </section>

      <section className="eh-grid-2">
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>PRODUCT CORE</div>
          <h2
            style={{
              fontSize: "36px",
              letterSpacing: "2px",
              marginTop: 0,
              marginBottom: "12px",
            }}
          >
            Protected Trade Governance
          </h2>

          <p style={{ fontSize: "18px", lineHeight: "1.65", maxWidth: "760px" }}>
            EL Harvest protects capital before execution. The system remains flat until
            structure, timing, confirmation, and risk rules align.
          </p>

          <div className="eh-grid-4" style={{ marginTop: "26px" }}>
            {statusCards.map((card) => (
              <div
                key={card.title}
                style={{
                  border: "1px solid #eadfb3",
                  borderRadius: "16px",
                  padding: "18px",
                  background: "#fffaf0",
                }}
              >
                <div style={badgeStyle(card.tone)}>{card.badge}</div>
                <h3 style={{ marginTop: 0 }}>{card.title}</h3>
                <strong>Status: {card.status}</strong>
                <p style={{ lineHeight: "1.55" }}>{card.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>BROKER STATUS</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Connection Control</h3>

          <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
            {brokerItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button style={buttonStyle}>CONNECT PAPER ACCOUNT</button>
        </div>
      </section>

      <section className="eh-mobile-stack" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>CONFIRMATION ENGINE</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Setup Validation</h3>

          <div style={{ display: "grid", gap: "14px", marginTop: "20px" }}>
            {confirmationChecks.map((check) => (
              <div
                key={check.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  padding: "15px 16px",
                  border: "1px solid #eadfb3",
                  borderRadius: "14px",
                  background: "#fffaf0",
                  fontSize: "16px",
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
              <div style={{ fontSize: "12px", letterSpacing: "2px", fontWeight: "800" }}>
                TARGET
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900", marginTop: "8px" }}>
                18–21%
              </div>
              <div style={{ marginTop: "8px", fontWeight: "700" }}>Hard Stop: 15%</div>
            </div>
          </div>

          <button style={buttonStyle}>EXECUTE PAPER TRADE</button>

          <p style={{ lineHeight: "1.65", marginTop: "18px" }}>
            Live execution remains locked. Paper execution is allowed only for testing the
            rules engine and trade review flow.
          </p>
        </div>
      </section>

      <section className="eh-grid-2" style={{ marginTop: "32px" }}>
        <div style={panelStyle}>
          <div style={badgeStyle("green")}>FINAL DECISION</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Trade Decision Output</h3>
          <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
            {decisionItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={panelStyle}>
          <div style={badgeStyle("gold")}>APPROVED ACTION</div>
          <h3 style={{ marginTop: 0, fontSize: "26px" }}>Next Authorized Move</h3>
          <ul style={{ lineHeight: "1.9", paddingLeft: "24px", fontSize: "17px" }}>
            <li>Primary Action: Wait</li>
            <li>Secondary Action: Monitor structure</li>
            <li>Entry Order: Blocked</li>
            <li>Exit Order: Active only if position exists</li>
            <li>System Lock: Flat until confirmation improves</li>
          </ul>
        </div>
      </section>

      <section style={{ ...panelStyle, marginTop: "32px" }}>
        <div style={badgeStyle("green")}>SESSION RESULTS</div>
        <h3 style={{ marginTop: 0, fontSize: "28px" }}>Discipline Scoreboard</h3>

        <div className="eh-grid-4" style={{ marginTop: "22px" }}>
          {sessionStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                border: "1px solid #eadfb3",
                borderRadius: "16px",
                padding: "22px",
                background: "#fffaf0",
              }}
            >
              <div style={{ fontSize: "12px", letterSpacing: "1.6px", fontWeight: "900" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "30px", fontWeight: "900", marginTop: "12px" }}>
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

      <footer
        style={{
          marginTop: "40px",
          padding: "28px",
          textAlign: "center",
          borderTop: "1px solid #d9c77b",
          letterSpacing: "1px",
          fontWeight: "700",
        }}
      >
        EL Harvest — Sow the Seed. Keep the Faith. Trust the Process. Reap the Harvest.
      </footer>
    </main>
  );
}
