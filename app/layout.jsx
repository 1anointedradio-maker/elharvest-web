export const metadata = {
  title: "EL HARVEST",
  description:
    "Sow the Seed. Keep the Faith. Trust the Process. Reap with EL Harvest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#f7efe2",
          color: "#111",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
