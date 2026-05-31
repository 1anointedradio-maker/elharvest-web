Paste this into:

app/broker/page.jsx
export default function BrokerPage() {
  const brokers = [
    {
      name: "Paper Trading",
      status: "Active",
      mode: "Safe Beta Mode",
      note: "Manual execution only. No live orders.",
    },
    {
      name: "Robinhood",
      status: "Not Connected",
      mode: "Future Integration",
      note: "Broker connection not enabled in beta.",
    },
    {
      name: "Tradier",
      status: "Not Connected",
      mode: "API Candidate",
      note: "Options-friendly broker API candidate.",
    },
    {
      name: "IBKR",
      status: "Not Connected",
      mode: "Advanced Candidate",
      note: "Institutional-grade future integration path.",
    },
  ];
  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />
          <h1 style={styles.title}>Broker Hub</h1>
          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>
        <section style={styles.warning}>
          <strong>Beta Protection Mode</strong>
          <p>
            EL Harvest is currently configured for validation, journaling, and paper-trade planning only.
            Live broker execution is disabled until risk controls, authentication, and compliance layers are complete.
          </p>
        </section>
        <section style={styles.grid}>
          {brokers.map((broker) => {
            const active = broker.status === "Active";
            return (
              <div
                key={broker.name}
                style={{
                  ...styles.card,
                  borderColor: active ? "#2F8F46" : "#D6B45A",
                }}
              >
                <div style={styles.cardTop}>
                  <h2 style={styles.brokerName}>{broker.name}</h2>
                  <span
                    style={{
                      ...styles.badge,
                      background: active ? "#EEF8F1" : "#F8F4EA",
                      color: active ? "#2F8F46" : "#8A6416",
                    }}
                  >
                    {broker.status}
                  </span>
                </div>
                <p style={styles.mode}>{broker.mode}</p>
                <p style={styles.note}>{broker.note}</p>
                <button
                  type="button"
                  disabled={!active}
                  style={{
                    ...styles.button,
                    opacity: active ? 1 : 0.45,
                    cursor: active ? "pointer" : "not-allowed",
                  }}
                >
                  {active ? "OPEN PAPER MODE" : "COMING SOON"}
                </button>
              </div>
            );
          })}
        </section>
        <section style={styles.card}>
          <h2 style={styles.brokerName}>Integration Readiness</h2>
          <div style={styles.checklist}>
            <span>✅ Validation Engine</span>
            <span>✅ Trade Journal Shell</span>
            <span>✅ Broker Hub Shell</span>
            <span>⬜ Authentication Layer</span>
            <span>⬜ Risk Controls</span>
            <span>⬜ Paper Trading API</span>
            <span>⬜ Live Broker Approval Gate</span>
          </div>
        </section>
        <a href="/" style={styles.back}>← Back to Home</a>
      </section>
    </main>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F4EA",
    color: "#1F1F1F",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  shell: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    padding: "18px 10px 26px",
  },
  logo: {
    width: "140px",
    maxWidth: "55%",
    height: "auto",
    marginBottom: "8px",
  },
  title: {
    margin: 0,
    color: "#8A6416",
    fontSize: "42px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  mantra: {
    margin: "12px auto 0",
    maxWidth: "640px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  warning: {
    padding: "22px",
    borderRadius: "24px",
    background: "#FFF7E0",
    border: "1px solid #D6B45A",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    marginBottom: "22px",
  },
  grid: {
    display: "grid",
    gap: "18px",
  },
  card: {
    padding: "24px",
    border: "1px solid #D6B45A",
    borderRadius: "28px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
    marginTop: "18px",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
  },
  brokerName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "900",
  },
  badge: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "900",
  },
  mode: {
    color: "#8A6416",
    fontWeight: "900",
    marginBottom: "6px",
  },
  note: {
    color: "#4B5563",
    lineHeight: "1.5",
  },
  button: {
    width: "100%",
    marginTop: "14px",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
  checklist: {
    display: "grid",
    gap: "10px",
    marginTop: "16px",
    color: "#1F1F1F",
    fontWeight: "700",
  },
  back: {
    display: "inline-block",
    marginTop: "24px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
  },
};
