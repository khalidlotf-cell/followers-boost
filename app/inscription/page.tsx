"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "../boutique/_components/Footer";

export default function InscriptionPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push("/boutique/instagram");
    } catch { setError("Erreur lors de l'inscription"); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>FB</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#111" }}>Followers Boost</span>
          </Link>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>Créer un compte</h1>
          <p style={{ fontSize: 15, color: "#888", marginTop: 6 }}>Gratuit et sans engagement</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1.5px solid #ebebeb", borderRadius: 20, padding: 32 }}>
          {error && (
            <div style={{ background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#e84e4e", marginBottom: 20 }}>
              {error}
            </div>
          )}
          {[
            { key: "name", label: "Nom complet", type: "text", placeholder: "Jean Dupont" },
            { key: "email", label: "Email", type: "email", placeholder: "vous@exemple.com" },
            { key: "password", label: "Mot de passe", type: "password", placeholder: "Minimum 8 caractères" },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#333", marginBottom: 8 }}>{f.label}</label>
              <input type={f.type} required placeholder={f.placeholder}
                minLength={f.key === "password" ? 8 : undefined}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: "100%", padding: "13px 16px", border: "1.5px solid #e8e8e8",
                  borderRadius: 10, fontSize: 15, color: "#111", outline: "none",
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                onBlur={e => (e.currentTarget.style.borderColor = "#e8e8e8")}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 8, opacity: loading ? 0.6 : 1 }}>
            {loading ? "Création…" : "Créer mon compte"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#888" }}>
          Déjà un compte ?{" "}
          <Link href="/connexion" style={{ color: "#111", fontWeight: 700, textDecoration: "none" }}>Se connecter</Link>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
}
