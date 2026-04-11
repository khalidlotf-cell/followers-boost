"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Footer from "../../boutique/_components/Footer";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }

    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const res = await fetch(`/api/commandes/public?id=${orderId}`).then(r => r.json());
      if (res.status && res.status !== "PENDING_PAYMENT") {
        setStatus(res.status);
        setLoading(false);
        clearInterval(interval);
      }
      if (attempts >= 20) {
        setStatus("PENDING_PAYMENT");
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div style={{ minHeight: "100vh", background: "#111118", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        {loading ? (
          <>
            <div style={{ fontSize: 56, marginBottom: 24, animation: "pulse 1.5s infinite" }}>⏳</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Traitement en cours…</h1>
            <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.6 }}>
              Nous confirmons votre paiement et démarrons votre commande.
            </p>
          </>
        ) : status === "PENDING" || status === "IN_PROGRESS" ? (
          <>
            <div style={{ fontSize: 56, marginBottom: 24 }}>✅</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Commande confirmée !</h1>
            <p style={{ fontSize: 15, color: "#9ca3af", marginBottom: 32, lineHeight: 1.6 }}>
              Votre paiement a été reçu et votre commande est en cours de traitement.
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#fff", color: "#111", padding: "13px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </>
        ) : status === "PENDING_PAYMENT" ? (
          <>
            <div style={{ fontSize: 56, marginBottom: 24 }}>⏳</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Paiement en attente</h1>
            <p style={{ fontSize: 15, color: "#9ca3af", marginBottom: 32, lineHeight: 1.6 }}>
              Votre commande démarrera automatiquement dès que le paiement sera confirmé.
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#fff", color: "#111", padding: "13px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </>
        ) : status === "FAILED" ? (
          <>
            <div style={{ fontSize: 56, marginBottom: 24 }}>⚠️</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Erreur de traitement</h1>
            <p style={{ fontSize: 15, color: "#9ca3af", marginBottom: 8, lineHeight: 1.6 }}>
              Votre paiement a été reçu mais la commande n&apos;a pas pu démarrer.
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 32 }}>
              Contactez le support avec l&apos;ID : <span style={{ fontFamily: "monospace", color: "#a78bfa" }}>{orderId}</span>
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#fff", color: "#111", padding: "13px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </>
        ) : (
          <>
            <div style={{ fontSize: 56, marginBottom: 24 }}>❌</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Commande introuvable</h1>
            <Link href="/" style={{ display: "inline-block", background: "#fff", color: "#111", padding: "13px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </>
        )}
      </div>
      </div>
      <Footer />
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
