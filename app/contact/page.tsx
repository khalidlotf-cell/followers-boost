"use client";
import { useState } from "react";
import Link from "next/link";
import Footer from "../boutique/_components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise(r => setTimeout(r, 800));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Simple header */}
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>Z</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>Zylis</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: "#888", textDecoration: "none" }}>← Retour</Link>
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "72px 24px" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Support</p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 8 }}>
            Contactez-nous
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: 48, lineHeight: 1.7 }}>
            Une question sur une commande, un problème technique ou simplement un renseignement — on répond en général en moins d&apos;une heure.
          </p>

          {status === "sent" ? (
            <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#166534", marginBottom: 8 }}>Message envoyé !</div>
              <p style={{ fontSize: 14, color: "#15803d" }}>On vous répond dans les prochaines heures.</p>
              <button
                onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }}
                style={{ marginTop: 24, padding: "10px 24px", borderRadius: 100, background: "#fff", border: "1.5px solid #bbf7d0", color: "#166534", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Nom</label>
                <input
                  type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Votre prénom ou nom complet"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="votre@email.com"
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Message</label>
                <textarea
                  required value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Décrivez votre demande en détail..."
                  rows={6}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
                />
              </div>

              {status === "error" && (
                <div style={{ background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: "#e84e4e" }}>
                  Une erreur est survenue. Réessayez ou contactez-nous directement.
                </div>
              )}

              <button
                type="submit" disabled={status === "sending"}
                style={{
                  padding: "14px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15,
                  background: status === "sending" ? "#a78bfa" : "#7c3aed",
                  color: "#fff", border: "none", cursor: status === "sending" ? "default" : "pointer",
                  fontFamily: "inherit", transition: "background 0.15s, transform 0.15s",
                  alignSelf: "flex-start",
                }}
              >
                {status === "sending" ? "Envoi en cours…" : "Envoyer le message →"}
              </button>
            </form>
          )}

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #f1f5f9" }}>
            <p style={{ fontSize: 13, color: "#94a3b8" }}>
              Temps de réponse moyen : <strong style={{ color: "#64748b" }}>moins d&apos;1 heure</strong> · Disponible 7j/7
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
