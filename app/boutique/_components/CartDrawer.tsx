"use client";
import { useState } from "react";
import { useCart, removeFromCart, clearCart } from "@/lib/useCart";

function formatPrice(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
}
function formatQty(n: number) {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}K`;
  return n.toLocaleString("fr-FR");
}

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    if (items.length === 0) return;
    setError(""); setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ serviceId: i.serviceId, link: i.link, quantity: i.quantity })),
        }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Erreur lors du paiement."); return; }
      clear();
      window.location.href = `/paiement?ids=${d.orderIds.join(",")}`;
    } catch { setError("Erreur réseau, réessayez."); }
    finally { setSubmitting(false); }
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 900, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)",
        background: "#fff", zIndex: 901, boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>

        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1.5px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>
              🛒 Mon panier
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
              {items.length === 0 ? "Vide" : `${items.length} article${items.length > 1 ? "s" : ""}`}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#64748b" }}>
            ✕
          </button>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Panier vide</div>
              <div style={{ fontSize: 14, color: "#94a3b8" }}>Ajoutez des services depuis la boutique</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map(item => (
                <div key={item.id} style={{ background: "#f8fafc", borderRadius: 14, padding: "14px 16px", border: "1px solid #e2e8f0", position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.groupLabel} {item.platformLabel}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ background: "#e0e7ff", color: "#4338ca", borderRadius: 6, padding: "2px 8px", fontWeight: 600, fontSize: 11 }}>
                          {formatQty(item.quantity)}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        🔗 {item.link}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{formatPrice(item.price)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 1 && (
                <button onClick={() => clear()} style={{ fontSize: 12, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", padding: "4px 0" }}>
                  Vider le panier
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer checkout */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1.5px solid #f1f5f9", background: "#fff" }}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 12 }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>Total</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{formatPrice(total)}</span>
            </div>

            <button
              onClick={checkout}
              disabled={submitting}
              style={{
                width: "100%", padding: "16px", borderRadius: 14,
                background: submitting ? "#e2e8f0" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: submitting ? "#94a3b8" : "#fff",
                fontWeight: 800, fontSize: 16, border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "inherit", letterSpacing: "0.01em",
                boxShadow: submitting ? "none" : "0 4px 16px rgba(124,58,237,0.4)",
              }}>
              {submitting ? "Redirection…" : `Payer · ${formatPrice(total)}`}
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
              <span>🔒</span> Paiement sécurisé par Stripe
            </div>
          </div>
        )}
      </div>
    </>
  );
}
