"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatusMessage(error.message);
      return;
    }

    setStatusMessage("Login successful. Redirecting to dashboard...");
    window.location.href = "/dashboard";
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <img src="/el-harvest-logo.png" alt="EL Harvest Logo" style={styles.logo} />

        <h1 style={styles.title}>Login</h1>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          LOGIN
        </button>

        {statusMessage && <p style={styles.message}>{statusMessage}</p>}

        <a href="/register" style={styles.link}>
          Create Account
        </a>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F8F4EA",
    display: "grid",
    placeItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    padding: "28px",
    borderRadius: "28px",
    background: "#FFFFFF",
    border: "1px solid #D6B45A",
    textAlign: "center",
  },
  logo: {
    width: "140px",
    maxWidth: "55%",
    marginBottom: "12px",
  },
  title: {
    color: "#8A6416",
    fontSize: "38px",
    fontWeight: "900",
  },
  input: {
    width: "100%",
    marginTop: "14px",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #D6B45A",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    marginTop: "18px",
    padding: "16px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E6C66A, #A87517)",
    color: "#FFFFFF",
    fontWeight: "900",
  },
  message: {
    marginTop: "16px",
    color: "#2F8F46",
    fontWeight: "800",
  },
  link: {
    display: "inline-block",
    marginTop: "18px",
    color: "#8A6416",
    fontWeight: "900",
    textDecoration: "none",
  },
};
