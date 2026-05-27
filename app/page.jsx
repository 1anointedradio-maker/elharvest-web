export default function Home() {
  const cards = [
    {
      title: "Rules Engine",
      status: "Online",
      badge: "ACTIVE",
      detail: "A+ / B trade hierarchy active. C trades disabled by default.",
    },
    {
      title: "Market Window",
      status: "Pending",
      badge: "BUILD",
      detail: "Market Open and Power Hour enforcement module pending.",
    },
    {
      title: "Flat-State Protection",
      status: "Pending",
      badge: "BUILD",
      detail: "Blocks trades when criteria are not confirmed.",
    },
    {
      title: "Alert Engine",
      status: "Pending",
      badge: "BUILD",
      detail:
  "Priority alerts, acknowledgement, haptics, and sound logic pending.",
    },
    {
      title: "Replay Engine",
      status: "Pending",
      badge: "BUILD",
      detail: "Historical playback and live-market comparison pending.",
    },
  ]; 
  
  return (
    <main>
      <h2 style={{ letterSpacing: "1px" }}>EL HARVEST Web PWA</h2>
      <p>Governance + Replay Dashboard Online.</p>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginTop: "32px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fffdf7",
              border: "1px solid #d9c77b",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: "12px",
                fontWeight: "bold",
                letterSpacing: "1px",
                padding: "6px 10px",
                borderRadius: "999px",
                background: card.badge === "ACTIVE" ? "#e7f7df" : "#f3ead0",
                marginBottom: "14px",
              }}
            >
              {card.badge}
            </div>
            <h3 style={{ marginTop: 0 }}>{card.title}</h3>
            <strong>Status: {card.status}</strong>
            <p style={{ lineHeight: "1.5" }}>{card.detail}</p>
          </div>
        ))}
      </section>
      <section
        style={{
          marginTop: "40px",
          background: "#fffdf7",
          border: "1px solid #d9c77b",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: "bold",
            letterSpacing: "1px",
            padding: "6px 10px",
            borderRadius: "999px",
            background: "#f3ead0",
            marginBottom: "14px",
          }}
        >
          FLAT BY DEFAULT
        </div>
        <h3>Trading Windows</h3>
        <p style={{ lineHeight: "1.6" }}>
          EL HARVEST will enforce only two primary trading windows: Market Open
          and Power Hour. Outside approved conditions, the system remains flat.
        </p>
        <ul style={{ lineHeight: "1.8" }}>
          <li>Market Open: 9:30 AM - 10:15 AM ET</li>
          <li>Midday: Blocked unless manually reviewed</li>
          <li>Power Hour: 3:00 PM - 4:00 PM ET</li>
          <li>Default State: No trade</li>
        </ul>
      </section>
     <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e7f7df",
      marginBottom: "14px",
    }}
  >
    RULE HIERARCHY
  </div>
  <h3>Rules Engine Hierarchy</h3>
  <ul style={{ lineHeight: "1.8" }}>
    <li>A+ Trades: Highest priority, confirmed structure only</li>
    <li>B Trades: VWAP + Cloud confirmation required</li>
    <li>C Trades: Disabled by default</li>
    <li>Exit Priority: Always comes before new entries</li>
    <li>Flat State: Enforced when criteria are incomplete</li>
  </ul>
</section>
     <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    EXIT FIRST
  </div>
  <h3>Exit Logic</h3>
  <ul style={{ lineHeight: "1.8" }}>
    <li>Profit Target: 18% - 21%</li>
    <li>Hard Stop: Enforced before continuation</li>
    <li>No Averaging Down: Blocked unless rule-approved</li>
    <li>No Revenge Trades: Cooldown required after loss</li>
    <li>Survival Rule: Protect capital before seeking upside</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    NO TRADE IS A TRADE
  </div>
  <h3>Flat-State Protection</h3>
  <ul style={{ lineHeight: "1.8" }}>
    <li>Blocks entries when rules are incomplete</li>
    <li>Prevents impulsive midday trades</li>
    <li>Requires confirmed structure before alerting</li>
    <li>Forces cooldown after invalid setups</li>
    <li>Protects capital when no A+ or B trade exists</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    ALERT PRIORITY
  </div>
  <h3>Alert Engine</h3>
  <ul style={{ lineHeight: "1.8" }}>
  <li>Priority alerts only during approved windows</li>
  <li>Exit alerts always override entry alerts</li>
  <li>Flat-state alerts block invalid setups</li>
  <li>User acknowledgement required before next signal</li>
  <li>Sound and haptic logic reserved for high-priority alerts</li>
</ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    REPLAY + REVIEW
  </div>

  <h3>Replay Engine</h3>
  <ul style={{ lineHeight: "1.8" }}>
    <li>Replay Market Open and Power Hour sessions</li>
    <li>Compare live decisions against rule-approved setups</li>
    <li>Track missed exits and invalid entries</li>
    <li>Review flat-state blocks after each session</li>
    <li>Build consistency through post-trade accountability</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e7f7df",
      marginBottom: "14px",
    }}
  >
    SESSION REVIEW
  </div>

  <h3>Session Review Summary</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Trades Taken: Pending</li>
    <li>Flat Blocks: Pending</li>
    <li>Missed Exits: Pending</li>
    <li>Invalid Entries: Pending</li>
    <li>Rule Score: Pending</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    DECISION GATE
  </div>

  <h3>Trade Authorization</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>A+ Setup: Authorized when structure, VWAP, and confirmation align</li>
    <li>B Setup: Authorized only with secondary confirmation</li>
    <li>C Setup: Blocked by default</li>
    <li>Exit Required: Existing position must be managed before new entry</li>
    <li>Final State: Trade, Wait, Exit, or Flat</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e7f7df",
      marginBottom: "14px",
    }}
  >
    SIGNAL OUTPUT
  </div>

  <h3>Live Signal State</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Current Bias: Pending</li>
    <li>Trade State: Flat</li>
    <li>Authorization: Not Active</li>
    <li>Risk Mode: Protected</li>
    <li>Next Action: Wait for confirmed setup</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    RISK CONTROL
  </div>

  <h3>Capital Protection Rules</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Maximum Risk Per Trade: Pending</li>
    <li>Daily Loss Limit: Pending</li>
    <li>Position Size: Pending</li>
    <li>Stop Loss Required: Yes</li>
    <li>Override Status: Locked</li>
  </ul>
</section>
    <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e7f7df",
      marginBottom: "14px",
    }}
  >
    TRADE CHECKLIST
  </div>

  <h3>Pre-Trade Confirmation</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Price Above/Below VWAP: Pending</li>
    <li>Cloud Direction Confirmed: Pending</li>
    <li>Market Window Approved: Pending</li>
    <li>Risk Defined Before Entry: Required</li>
    <li>Final Approval: Not Authorized</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    POSITION SIZING
  </div>

  <h3>Trade Size Control</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Account Balance Input: Pending</li>
    <li>Risk Percentage: Pending</li>
    <li>Entry Price: Pending</li>
    <li>Stop Price: Pending</li>
    <li>Recommended Contract Size: Pending</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e7f7df",
      marginBottom: "14px",
    }}
  >
    RISK FORMULA
  </div>

  <h3>Risk Calculation Engine</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>Risk Per Trade = Account Balance x Risk Percentage</li>
    <li>Trade Risk = Entry Price - Stop Price</li>
    <li>Position Size = Risk Per Trade / Trade Risk</li>
    <li>Contracts Rounded Down: Required</li>
    <li>Invalid Calculation: Blocks trade authorization</li>
  </ul>
</section>
      <section
  style={{
    marginTop: "40px",
    background: "#fffdf7",
    border: "1px solid #d9c77b",
    borderRadius: "16px",
    padding: "24px",
  }}
>
  <div
    style={{
      display: "inline-block",
      fontSize: "12px",
      fontWeight: "bold",
      letterSpacing: "1px",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#f3ead0",
      marginBottom: "14px",
    }}
  >
    EXECUTION RULES
  </div>

  <h3>Entry and Exit Discipline</h3>

  <ul style={{ lineHeight: "1.8" }}>
    <li>No entry without confirmed trade state</li>
    <li>No entry while exit management is active</li>
    <li>No trade during blocked market windows</li>
    <li>Exit signal overrides all new setups</li>
    <li>Manual override requires post-session review</li>
  </ul>
</section>
      <section

  style={{

    marginTop: "40px",

    background: "#fffdf7",

    border: "1px solid #d9c77b",

    borderRadius: "16px",

    padding: "24px",

  }}

>

  <div

    style={{

      display: "inline-block",

      fontSize: "12px",

      fontWeight: "bold",

      letterSpacing: "1px",

      padding: "6px 10px",

      borderRadius: "999px",

      background: "#f3ead0",

      marginBottom: "14px",

    }}

  >

    EXECUTION RULES

  </div>

  <h3>Entry and Exit Discipline</h3>

  <ul style={{ lineHeight: "1.8" }}>

    <li>No entry without confirmed trade state</li>

    <li>No entry while exit management is active</li>

    <li>No trade during blocked market windows</li>

    <li>Exit signal overrides all new setups</li>

    <li>Manual override requires post-session review</li>

  </ul>

</section>
    </main>
  );
}
  
