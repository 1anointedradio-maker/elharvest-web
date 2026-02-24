export const metadata = {
  title: "ELHARVEST CORE",
  description: "Internal Governance + Replay Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
        <h1>ELHARVEST CORE</h1>
        <p>Internal Governance + Replay Engine</p>
        <hr />
        {children}
      </body>
    </html>
  );
}