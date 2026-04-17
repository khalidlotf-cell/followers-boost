"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [stats, setStats] = useState({ orders: 0, services: 0, revenue: 0 });
  const [mtpBalance, setMtpBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [syncResult, setSyncResult] = useState<{ msg: string; ok: boolean } | null>(null);
  const [markup, setMarkup] = useState("2");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/commandes").then(r => r.json()),
      fetch("/api/admin/services").then(r => r.json()),
    ]).then(([orders, services]) => {
      const revenue = Array.isArray(orders)
        ? orders.filter((o: { status: string }) => o.status === "COMPLETED")
            .reduce((s: number, o: { charge: number }) => s + o.charge, 0)
        : 0;
      setStats({
        orders: Array.isArray(orders) ? orders.length : 0,
        services: Array.isArray(services) ? services.filter((s: { active: boolean }) => s.active).length : 0,
        revenue,
      });
    });
  }, []);

  async function checkBalance() {
    setBalanceLoading(true);
    const res = await fetch("/api/admin/balance");
    const data = await res.json();
    setMtpBalance(data.error ? `Erreur: ${data.error}` : `${data.balance} ${data.currency ?? "USD"}`);
    setBalanceLoading(false);
  }

  async function syncMTP() {
    setSyncing(true);
    setSyncResult(null);
    const res = await fetch("/api/admin/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markup: parseFloat(markup) }),
    });
    const data = await res.json();
    setSyncResult(
      res.ok
        ? { msg: `✓ ${data.created} nouveaux ajoutés · ${data.skipped ?? 0} déjà en base · ${data.total} total`, ok: true }
        : { msg: `✗ ${data.error}`, ok: false }
    );
    setSyncing(false);
  }

  async function applyMarkupToAll() {
    if (!confirm(`Recalculer TOUS les prix avec ×${markup} ?`)) return;
    setRecalculating(true);
    setSyncResult(null);
    const res = await fetch("/api/admin/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markup: parseFloat(markup), recalculate: true }),
    });
    const data = await res.json();
    setSyncResult(
      res.ok
        ? { msg: `✓ ${data.recalculated} prix recalculés avec ×${markup}`, ok: true }
        : { msg: `✗ ${data.error}`, ok: false }
    );
    setRecalculating(false);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Administration</h1>
        <p style={{ fontSize: 14, color: "#6b7280" }}>Vue d&apos;ensemble du panel</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Commandes", value: stats.orders, href: "/admin/commandes", icon: "📦", color: "#3b82f6" },
          { label: "Services actifs", value: stats.services, href: "/admin/services", icon: "⚙️", color: "#8b5cf6" },
          { label: "Revenus", value: `${stats.revenue.toFixed(2)} €`, href: "#", icon: "💰", color: "#10b981" },
        ].map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#1a1a24", border: "1px solid #2e2e3e", borderRadius: 14, padding: "20px 24px", transition: "border-color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#4b4b6e")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#2e2e3e")}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{s.value}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Solde + Sync côte à côte */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>

        {/* Solde panel */}
        <div style={{ background: "#1a1a24", border: "1px solid #2e2e3e", borderRadius: 14, padding: "24px" }}>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
            Solde du panel SMM
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: mtpBalance ? "#10b981" : "#374151", marginBottom: 20 }}>
            {mtpBalance ?? "—"}
          </div>
          <button onClick={checkBalance} disabled={balanceLoading}
            style={{ padding: "10px 20px", borderRadius: 10, background: "#22222f", border: "1px solid #2e2e3e", color: "#d1d5db", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: balanceLoading ? 0.5 : 1, fontFamily: "inherit" }}>
            {balanceLoading ? "Chargement…" : "Actualiser le solde"}
          </button>
        </div>

        {/* Synchronisation */}
        <div style={{ background: "#1a1a24", border: "1px solid #2e2e3e", borderRadius: 14, padding: "24px" }}>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
            Synchronisation des services
          </div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16, lineHeight: 1.6 }}>
            Multiplicateur ×{markup} — MTP à 1,00 €/1K → vous vendez à {(1 * parseFloat(markup || "2")).toFixed(2)} €/1K
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: "#9ca3af", whiteSpace: "nowrap" }}>Multiplicateur</label>
            <input type="number" min="1" step="0.1" value={markup} onChange={e => setMarkup(e.target.value)}
              style={{ width: 70, padding: "8px 10px", borderRadius: 8, background: "#22222f", border: "1px solid #2e2e3e", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" }} />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={syncMTP} disabled={syncing || recalculating}
              style={{ padding: "10px 16px", borderRadius: 10, background: "#7c3aed", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", opacity: syncing || recalculating ? 0.5 : 1, fontFamily: "inherit" }}>
              {syncing ? "Sync…" : "Sync nouveaux"}
            </button>
            <button onClick={applyMarkupToAll} disabled={syncing || recalculating}
              style={{ padding: "10px 16px", borderRadius: 10, background: "#1f0707", border: "1px solid #7f1d1d", color: "#f87171", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: syncing || recalculating ? 0.5 : 1, fontFamily: "inherit" }}>
              {recalculating ? "Calcul…" : `×${markup} à TOUS`}
            </button>
          </div>

          {syncResult && (
            <div style={{ marginTop: 12, fontSize: 13, padding: "8px 12px", borderRadius: 8, background: syncResult.ok ? "#042f1c" : "#2d1515", color: syncResult.ok ? "#34d399" : "#f87171" }}>
              {syncResult.msg}
            </div>
          )}
        </div>
      </div>

      {/* Liens rapides */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>
          Accès rapide
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { href: "/admin/services", title: "Services", desc: "Modifier les prix, activer/désactiver", icon: "⚙️" },
            { href: "/admin/commandes", title: "Commandes", desc: "Historique de toutes les commandes", icon: "📦" },
            { href: "/admin/utilisateurs", title: "Utilisateurs", desc: "Gérer les comptes et les soldes", icon: "👤" },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#1a1a24", border: "1px solid #2e2e3e", borderRadius: 14, padding: "20px", transition: "border-color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#7c3aed")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#2e2e3e")}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
