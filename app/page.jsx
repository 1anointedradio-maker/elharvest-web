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
      detail: "Priority alerts, acknowledgement, haptics, and sound logic pending.",
    },
    {
      title: "Replay Engine",
      status: "Pending",
      badge: "BUILD",
      detail: "Historical playback and live-market comparison pending.",
    },
  ];
  (
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
    <li>Market Open: 9:30 AM – 10:15 AM ET</li>
    <li>Midday: Blocked unless manually reviewed</li>
    <li>Power Hour: 3:00 PM – 4:00 PM ET</li>
    <li>Default State: No trade</li>
  </ul>
</section>
