"use client";
import Link from "next/link";

export default function AnnulationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#111118", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>❌</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>
          Paiement annulé
        </h1>
        <p style={{ fontSize: 15, color: "#9ca3af", marginBottom: 32, lineHeight: 1.6 }}>
          Votre paiement a été annulé. Aucun montant n&apos;a été débité.
        </p>
        <Link href="/" style={{
          display: "inline-block", background: "#fff", color: "#111",
          padding: "13px 28px", borderRadius: 100,
          fontWeight: 700, fontSize: 15, textDecoration: "none",
        }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
