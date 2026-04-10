"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Mot de passe incorrect");
      }
    } catch {
      setError("Erreur réseau — réessayez");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111118", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontWeight: 800, color: "#fff", fontSize: 16 }}>FB</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Accès Admin</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Entrez le mot de passe administrateur</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: "#2d1515", border: "1px solid #7f1d1d", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#f87171", marginBottom: 16, textAlign: "center" }}>
              {error}
            </div>
          )}
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 12,
              border: "1px solid #2e2e3e", background: "#1a1a24",
              color: "#fff", fontSize: 15, outline: "none",
              fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12,
            }}
          />
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%", padding: "13px", borderRadius: 12,
              background: "#7c3aed", color: "#fff", fontWeight: 700,
              fontSize: 15, border: "none", cursor: loading || !password ? "not-allowed" : "pointer",
              opacity: loading || !password ? 0.5 : 1, fontFamily: "inherit",
            }}>
            {loading ? "Connexion…" : "Accéder"}
          </button>
        </form>
      </div>
    </div>
  );
}
