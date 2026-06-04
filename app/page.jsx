export default function HomePage() {
  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />

          <h1 style={styles.title}>EL HARVEST</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Beta Control Center</h2>
          <a href="/login" style={styles.button}>Login</a>
          <a href="/register" style={styles.button}>Create Account</a>
          <div style={styles.grid}>
            <a href="/dashboard" style={styles.button}>Open Dashboard</a>
            <a href="/validation" style={styles.button}>Start Validation</a>
            <a href="/journal" style={styles.button}>Open Trade Journal</a>
            <a href="/broker" style={styles.button}>Open Broker Hub</a>
          </div>
        </section>
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
    padding: "28px 10px",
  },
  logo: {
    width: "160px",
    maxWidth: "55%",
    height: "auto",
    marginBottom: "10px",
  },
  title: {
    margin: 0,
    color: "#8A6416",
    fontSize: "48px",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  mantra: {
    margin: "14px auto 0",
    maxWidth: "640px",
    color: "#6B5B2A",
    fontWeight: "700",
    lineHeight: "1.6",
  },
  card: {
    marginTop: "24px",
    padding: "28px",
    border: "1px solid #D6B45A",
    borderRadius: "28px",
    background: "#FFFFFF",
    boxShadow: "0 18px 42px rgba(109, 40, 217, 0.08)",
  },
  sectionTitle: {
    marginTop: 0,
    fontSize: "26px",
    fontWeight: "900",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gap: "16px",
  },
  button: {
    display: "block",
    padding: "18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "900",
    letterSpacing: "1px",
  },
};
