export const metadata = {
  title: "EL HARVEST CORE",
  description: "Internal Governance + Replay Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
        <img
          src="/El%20Harvest%20Logo%20Official.PNG"
          alt="El Harvest Logo"
          className="logo"
          style={{ width: "180px", height: "auto", marginBottom: "20px" }}
        />

        <h1>EL HARVEST CORE</h1>
        <p>Internal Governance + Replay Engine</p>
        <hr />

        {children}
      </body>
    </html>
  );
}
