"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { getStripeClient } from "@/lib/stripe-client";

type Item = { id: string; name: string; quantity: number; link: string; charge: number };

function formatPrice(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
}
function formatQty(n: number) {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}K`;
  return n.toLocaleString("fr-FR");
}

const APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "stripe",
  variables: {
    colorPrimary: "#111111",
    colorText: "#111111",
    colorTextSecondary: "#6b7280",
    colorDanger: "#dc2626",
    fontFamily: "system-ui, -apple-system, sans-serif",
    borderRadius: "12px",
    spacingUnit: "4px",
    fontSizeBase: "15px",
  },
  rules: {
    ".Input": {
      border: "1.5px solid #e8e8e8",
      boxShadow: "none",
      padding: "13px 14px",
    },
    ".Input:focus": {
      border: "1.5px solid #111",
      boxShadow: "0 0 0 3px rgba(0,0,0,0.06)",
    },
    ".Label": {
      fontWeight: "600",
      color: "#4b5563",
      fontSize: "13px",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1.5px solid #e8e8e8",
      boxShadow: "none",
      padding: "12px",
    },
    ".Tab--selected": {
      border: "1.5px solid #111",
      backgroundColor: "#fafafa",
    },
    ".Tab:hover": {
      border: "1.5px solid #d4d4d4",
    },
  },
};

export default function PaymentClient() {
  const sp = useSearchParams();
  const idsParam = sp.get("ids") ?? sp.get("id") ?? "";
  const orderIds = useMemo(
    () => idsParam.split(",").map(s => s.trim()).filter(Boolean),
    [idsParam]
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (orderIds.length === 0) {
      setLoadError("Aucune commande.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIds }),
        });
        const d = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setLoadError(d.error ?? "Impossible d'initialiser le paiement.");
          return;
        }
        setClientSecret(d.clientSecret);
        setAmount(d.amount / 100);
        setItems(d.items);
      } catch {
        if (!cancelled) setLoadError("Erreur réseau, réessayez.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderIds]);

  const options: StripeElementsOptions | null = clientSecret
    ? { clientSecret, appearance: APPEARANCE, loader: "auto" }
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#111",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image
              src="/logo-light.png"
              alt="Vyrlo"
              width={100}
              height={40}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12.5,
              fontWeight: 600,
              color: "#4b5563",
              padding: "8px 14px",
              borderRadius: 999,
              background: "#f4f4f5",
              border: "1px solid #e8e8e8",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Paiement sécurisé
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 20px 80px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              fontSize: 13,
              color: "#6b7280",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            ← Retour
          </Link>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#111",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Finaliser votre commande
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>
            Paiement chiffré — vos informations bancaires ne transitent jamais par nos serveurs.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
          }}
          className="paiement-grid"
        >
          {/* Bloc paiement */}
          <section
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #ececec",
              minHeight: 420,
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#7c3aed",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Moyen de paiement
            </div>

            {loadError ? (
              <div
                style={{
                  padding: 18,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 12,
                  color: "#dc2626",
                  fontSize: 14,
                }}
              >
                {loadError}
              </div>
            ) : !options ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ height: 44, borderRadius: 12, background: "#f4f4f5", animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ height: 72, borderRadius: 12, background: "#f4f4f5", animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ height: 44, borderRadius: 12, background: "#f4f4f5", animation: "pulse 1.5s ease-in-out infinite" }} />
                <div style={{ height: 54, borderRadius: 14, background: "#111", opacity: 0.08, animation: "pulse 1.5s ease-in-out infinite", marginTop: 4 }} />
              </div>
            ) : (
              <Elements stripe={getStripeClient()} options={options}>
                <CheckoutForm orderIds={orderIds} amount={amount} />
              </Elements>
            )}
          </section>

          {/* Récap commande */}
          <aside
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #ececec",
              alignSelf: "start",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#7c3aed",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Récapitulatif
            </div>
            {items.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[0, 1].map(i => (
                  <div
                    key={i}
                    style={{
                      height: 72,
                      borderRadius: 12,
                      background: "#f4f4f5",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map(it => (
                  <div
                    key={it.id}
                    style={{
                      padding: "14px 16px",
                      background: "#fafafa",
                      borderRadius: 12,
                      border: "1px solid #f0f0f0",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 10,
                      }}
                    >
                      {it.name ? (
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#111",
                            minWidth: 0,
                            flex: 1,
                            overflowWrap: "anywhere",
                            lineHeight: 1.3,
                          }}
                        >
                          {it.name}
                        </div>
                      ) : (
                        <div style={{ flex: 1 }} />
                      )}
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#111",
                          flexShrink: 0,
                        }}
                      >
                        {formatPrice(it.charge)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: "#ede9fe",
                          color: "#6d28d9",
                          borderRadius: 6,
                          padding: "3px 8px",
                          fontWeight: 700,
                          fontSize: 11,
                          flexShrink: 0,
                        }}
                      >
                        {formatQty(it.quantity)}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "#9ca3af",
                          overflowWrap: "anywhere",
                          wordBreak: "break-all",
                          minWidth: 0,
                          flex: "1 1 auto",
                        }}
                      >
                        {it.link}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid #ececec",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Sous-total</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{formatPrice(amount)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>Frais de service</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Inclus</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  borderTop: "1px dashed #ececec",
                }}
              >
                <span style={{ fontSize: 14, color: "#111", fontWeight: 700 }}>Total TTC</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: "#111", letterSpacing: "-0.02em" }}>
                  {formatPrice(amount)}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                padding: "12px 14px",
                background: "#faf5ff",
                borderRadius: 10,
                fontSize: 12.5,
                color: "#6d28d9",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontWeight: 500,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Livraison automatique dès paiement confirmé
            </div>
          </aside>
        </div>

        {/* Trust row */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 18,
              fontSize: 11.5,
              color: "#9ca3af",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            <span>SSL 256-bit</span>
            <span style={{ color: "#e5e7eb" }}>•</span>
            <span>3D Secure</span>
            <span style={{ color: "#e5e7eb" }}>•</span>
            <span>PCI-DSS</span>
            <span style={{ color: "#e5e7eb" }}>•</span>
            <span>Stripe</span>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            Besoin d&apos;aide ?{" "}
            <Link href="/contact" style={{ color: "#111", fontWeight: 600, textDecoration: "underline" }}>
              Contactez-nous
            </Link>{" "}
            ·{" "}
            <Link href="/cgv" style={{ color: "#111", fontWeight: 600, textDecoration: "underline" }}>
              CGV
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @media (min-width: 860px) {
          .paiement-grid {
            grid-template-columns: 1fr 380px !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}

function CheckoutForm({ orderIds, amount }: { orderIds: string[]; amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const siteUrl = (typeof window !== "undefined" ? window.location.origin : "").replace(/\/$/, "");
    const returnUrl = `${siteUrl}/commande/confirmation?id=${orderIds[0]}`;

    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: email || undefined,
      },
    });

    if (err) {
      setError(err.message ?? "Paiement refusé.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label
          htmlFor="email"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#4b5563",
            marginBottom: 6,
            display: "block",
          }}
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          required
          style={{
            width: "100%",
            padding: "13px 14px",
            borderRadius: 12,
            border: "1.5px solid #e8e8e8",
            fontSize: 15,
            fontFamily: "inherit",
            outline: "none",
            background: "#fff",
            color: "#111",
            transition: "border 0.15s, box-shadow 0.15s",
            boxSizing: "border-box",
          }}
          onFocus={e => {
            e.currentTarget.style.border = "1.5px solid #111";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.06)";
          }}
          onBlur={e => {
            e.currentTarget.style.border = "1.5px solid #e8e8e8";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 6 }}>
          Reçu et suivi de commande envoyés à cette adresse.
        </div>
      </div>

      <PaymentElement
        options={{
          layout: { type: "accordion", defaultCollapsed: false, spacedAccordionItems: true },
        }}
      />

      {error && (
        <div
          style={{
            padding: "12px 14px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            color: "#dc2626",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        style={{
          width: "100%",
          padding: "17px 20px",
          borderRadius: 14,
          background: submitting ? "#e5e7eb" : "#111",
          color: submitting ? "#9ca3af" : "#fff",
          fontWeight: 700,
          fontSize: 15.5,
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          transition: "transform 0.1s, background 0.15s",
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onMouseDown={e => {
          if (!submitting) e.currentTarget.style.transform = "scale(0.985)";
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {submitting ? (
          "Traitement en cours…"
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Payer {formatPrice(amount)}
          </>
        )}
      </button>
    </form>
  );
}
