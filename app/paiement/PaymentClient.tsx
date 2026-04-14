"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    colorPrimary: "#7c3aed",
    colorText: "#0f172a",
    colorTextSecondary: "#64748b",
    colorDanger: "#ef4444",
    fontFamily: "system-ui, -apple-system, sans-serif",
    borderRadius: "14px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1.5px solid #e2e8f0",
      boxShadow: "none",
      padding: "14px",
    },
    ".Input:focus": {
      border: "1.5px solid #7c3aed",
      boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
    },
    ".Label": {
      fontWeight: "600",
      color: "#475569",
      fontSize: "13px",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1.5px solid #e2e8f0",
      boxShadow: "none",
    },
    ".Tab--selected": {
      border: "1.5px solid #7c3aed",
      backgroundColor: "#faf5ff",
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
        background: "linear-gradient(180deg, #faf5ff 0%, #f8fafc 100%)",
        padding: "40px 16px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", width: "100%" }}>
        {/* Header brandé */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1.5px solid #e9d5ff",
              boxShadow: "0 4px 20px rgba(124,58,237,0.08)",
            }}
          >
            <span style={{ fontSize: 20 }}>🔒</span>
            <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 14 }}>
              Paiement sécurisé · Vyrlo
            </span>
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: "#0f172a",
              margin: "20px 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Finaliser votre commande
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
            Vos informations sont protégées par Stripe · aucune donnée bancaire ne transite par nos serveurs
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
          className="paiement-grid"
        >
          {/* Récap commande */}
          <aside
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 24px rgba(15,23,42,0.04)",
              alignSelf: "start",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#7c3aed",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Récapitulatif
            </div>
            {items.length === 0 ? (
              <div
                style={{
                  height: 80,
                  borderRadius: 12,
                  background: "#f8fafc",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map(it => (
                  <div
                    key={it.id}
                    style={{
                      padding: "14px 16px",
                      background: "#f8fafc",
                      borderRadius: 14,
                      border: "1px solid #e2e8f0",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        marginBottom: 8,
                      }}
                    >
                      {it.name ? (
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#0f172a",
                            minWidth: 0,
                            flex: 1,
                            overflowWrap: "anywhere",
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
                          color: "#0f172a",
                          flexShrink: 0,
                        }}
                      >
                        {formatPrice(it.charge)}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span
                        style={{
                          background: "#ede9fe",
                          color: "#6d28d9",
                          borderRadius: 6,
                          padding: "2px 8px",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        {formatQty(it.quantity)}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        overflowWrap: "anywhere",
                        wordBreak: "break-all",
                      }}
                    >
                      🔗 {it.link}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: "1.5px dashed #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Total TTC</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}>
                {formatPrice(amount)}
              </span>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: "#faf5ff",
                borderRadius: 10,
                fontSize: 12,
                color: "#6d28d9",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>⚡</span>
              <span>Livraison automatique dès paiement confirmé</span>
            </div>
          </aside>

          {/* Bloc paiement */}
          <section
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 24px rgba(15,23,42,0.04)",
              minHeight: 420,
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#7c3aed",
                textTransform: "uppercase",
                marginBottom: 16,
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
                ⚠️ {loadError}
              </div>
            ) : !options ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      height: 48,
                      borderRadius: 12,
                      background: "#f8fafc",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            ) : (
              <Elements stripe={getStripeClient()} options={options}>
                <CheckoutForm orderIds={orderIds} amount={amount} />
              </Elements>
            )}
          </section>
        </div>

        <div
          style={{
            marginTop: 32,
            textAlign: "center",
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          Propulsé par <strong style={{ color: "#64748b" }}>Stripe</strong> · Paiement 3D Secure ·{" "}
          <a href="/cgv" style={{ color: "#7c3aed", textDecoration: "none" }}>
            CGV
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (min-width: 820px) {
          .paiement-grid {
            grid-template-columns: 380px 1fr !important;
          }
          .paiement-grid aside { order: 2; }
          .paiement-grid section { order: 1; }
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
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#475569",
            marginBottom: 6,
            display: "block",
          }}
        >
          E-mail
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          required
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1.5px solid #e2e8f0",
            fontSize: 15,
            fontFamily: "inherit",
            outline: "none",
            background: "#fff",
            color: "#0f172a",
            transition: "border 0.15s, box-shadow 0.15s",
            boxSizing: "border-box",
          }}
          onFocus={e => {
            e.currentTarget.style.border = "1.5px solid #7c3aed";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
          }}
          onBlur={e => {
            e.currentTarget.style.border = "1.5px solid #e2e8f0";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
          Reçu et notifications de commande envoyés ici
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
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: 16,
          background: submitting ? "#e2e8f0" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
          color: submitting ? "#94a3b8" : "#fff",
          fontWeight: 800,
          fontSize: 16,
          border: "none",
          cursor: submitting ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          boxShadow: submitting ? "none" : "0 8px 24px rgba(124,58,237,0.35)",
          transition: "transform 0.1s, box-shadow 0.15s",
          marginTop: 4,
        }}
        onMouseDown={e => {
          if (!submitting) e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {submitting ? "Traitement en cours…" : `Payer ${formatPrice(amount)}`}
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          fontSize: 11,
          color: "#94a3b8",
          marginTop: 4,
        }}
      >
        <span>🔒 SSL</span>
        <span>·</span>
        <span>3D Secure</span>
        <span>·</span>
        <span>PCI-DSS</span>
      </div>
    </form>
  );
}
