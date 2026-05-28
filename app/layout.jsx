export const metadata = {
  title: "EL HARVEST CORE",
  description: "Internal Governance + Replay Engine",
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
              src="/public/el-harvest-logo.png.PNG"
              alt="El Harvest Logo"
              style={{ width: "190px", height: "auto", marginBottom: "28px" }}
            />
            <h1 style={{ margin: 0, letterSpacing: "3px" }}>
              EL HARVEST CORE
            </h1>

            <p style={{ fontSize: "18px", marginTop: "12px" }}>
              Internal Governance + Replay Engine
            </p>

            <hr style={{ marginTop: "28px", borderColor: "#c8b46a" }} />
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
