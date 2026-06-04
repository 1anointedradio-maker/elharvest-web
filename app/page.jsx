export default function HomePage() {
  const links = [
    { label: "Login", href: "/login" },
    { label: "Create Account", href: "/register" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Validation", href: "/validation" },
    { label: "Trade Journal", href: "/journal" },
    { label: "Broker Hub", href: "/broker" },
  ];

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <img
            src="/el-harvest-logo.png"
            alt="EL Harvest Logo"
            style={styles.logo}
          />

          <p style={styles.kicker}>EL HARVEST BETA</p>

          <h1 style={styles.title}>Trade With Discipline</h1>

          <p style={styles.mantra}>
            Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.
          </p>
        </header>

        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.eyebrow}>Control Center</p>
              <h2 style={styles.sectionTitle}>Choose Your Workflow</h2>
            </div>

            <span style={styles.badge}>Beta v1.1</span>
          </div>

          <div style={styles.grid}>
            {links.map((link) => (
              <a key={link.href} href={link.href} style={styles.button}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #FFF9E8 0%, #F8F4EA 38%, #EFE6D3 100%)",
    color: "#1F1F1F",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
  },
  shell: {
    width: "100%",
    maxWidth: "980px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    padding: "18px 10px 24px",
  },
  logo: {
    width: "118px",
    maxWidth: "42%",
    height: "auto",
    marginBottom: "10px",
  },
  kicker: {
    margin: "0 0 10px",
    color: "#8A6416",
    fontWeight: "900",
    letterSpacing: "3px",
    fontSize: "12px",
  },
  title: {
    margin: 0,
    color: "#8A6416",
    fontSize: "44px",
    fontWeight: "900",
    letterSpacing: "1px",
    lineHeight: "1.05",
  },
  mantra: {
    margin: "14px auto 0",
    maxWidth: "680px",
    color: "#6B5B2A",
    fontWeight: "800",
    lineHeight: "1.5",
    fontSize: "16px",
  },
  card: {
    margin: "10px auto 0",
    padding: "24px",
    border: "1px solid rgba(214, 180, 90, 0.85)",
    borderRadius: "30px",
    background: "rgba(255, 255, 255, 0.88)",
    boxShadow: "0 24px 70px rgba(109, 40, 217, 0.10)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
  },
  eyebrow: {
    margin: "0 0 4px",
    color: "#8A6416",
    fontWeight: "900",
    letterSpacing: "2px",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "900",
    letterSpacing: "-0.5px",
  },
  badge: {
    flexShrink: 0,
    padding: "9px 13px",
    borderRadius: "999px",
    background: "#EEF8F1",
    color: "#2F8F46",
    fontSize: "13px",
    fontWeight: "900",
    border: "1px solid rgba(47, 143, 70, 0.25)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "58px",
    padding: "14px 18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #F0D36F 0%, #C28A12 100%)",
    color: "#FFFFFF",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "900",
    letterSpacing: "0.8px",
    boxShadow: "0 10px 24px rgba(168, 117, 23, 0.22)",
  },
};
