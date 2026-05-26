export default function Home() {
  const cards = [
    {
      title: "Rules Engine",
      status: "Online",
      detail: "A+ / B trade hierarchy active. C trades disabled by default.",
    },
    {
      title: "Market Window",
      status: "Pending",
      detail: "Market Open and Power Hour enforcement module pending.",
    },
    {
      title: "Flat-State Protection",
      status: "Pending",
      detail: "Blocks trades when criteria are not confirmed.",
    },
    {
      title: "Alert Engine",
      status: "Pending",
      detail: "Priority alerts, acknowledgement, haptics, and sound logic pending.",
    },
    {
      title: "Replay Engine",
      status: "Pending",
      detail: "Historical playback and live-market comparison pending.",
    },
  ];

  return (
    <main>
      <h2>EL HARVEST Web PWA</h2>
      <p>Governance + Replay Dashboard Online.</p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "30px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "18px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{card.title}</h3>
            <strong>Status: {card.status}</strong>
            <p>{card.detail}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "36px" }}>
        <h3>Trading Windows</h3>
        <p>
          EL HARVEST will enforce only two primary trading windows: Market Open
          and Power Hour. Outside approved conditions, the system remains flat.
        </p>
        
      </section>
    </main>
  );
}
