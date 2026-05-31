export const metadata = {
  title: "EL HARVEST",
  description: "Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          margin: 0,
          background: "#f7f4ed",
          color: "#111",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          <header style={{ marginBottom: "32px" }}>
            <img
  src="/el-harvest-logo.png"
  alt="EL Harvest Logo"
  style={{ width: "190px", height: "auto", marginBottom: "28px" }}
/>

<h1>EL HARVEST</h1>

<p>Sow the Seed.</p>
<p>Keep the Faith.</p>
<p>Trust the Process.</p>
<p>Reap with EL Harvest.</p>
            <hr style={{ marginTop: "28px", borderColor: "#c8b46a" }} />
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
