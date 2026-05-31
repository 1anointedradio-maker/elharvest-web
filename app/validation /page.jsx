export default function ValidationPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7efe2",
        color: "#111",
        fontFamily: "Arial, sans-serif",
        padding: "28px",
      }}
    >
      <section style={{ maxWidth: "520px", margin: "0 auto" }}>
        <h1>Trade Validation</h1>
        <p>QQQ / SPY Rule Confirmation</p>

        <div
          style={{
            marginTop: "28px",
            padding: "20px",
            border: "1px solid #c8a24a",
            borderRadius: "18px",
            background: "#fffaf0",
          }}
        >
          <p>○ VWAP Confirmed</p>
          <p>○ Cloud Confirmed</p>
          <p>○ Volume Confirmed</p>
          <p>○ Trading Window Confirmed</p>
        </div>

        <div
          style={{
            marginTop: "28px",
            padding: "22px",
            borderRadius: "18px",
            background: "#fffaf0",
            border: "1px solid #c8a24a",
            textAlign: "center",
          }}
        >
          <h2>TRADE BLOCKED</h2>
          <p>EL Harvest remains in protection mode until rules confirm.</p>
        </div>

        <a href="/" style={{ display: "block", marginTop: "24px" }}>
          Back
        </a>
      </section>
    </main>
  );
}
