"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  balance: number;
  totalOrders: number;
  activeOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  status: string;
  quantity: number;
  charge: number;
  link: string;
  createdAt: string;
  service: { name: string };
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:     { label: "En attente", color: "#fbbf24", bg: "#2d2004" },
  IN_PROGRESS: { label: "En cours",   color: "#60a5fa", bg: "#0d1f3c" },
  COMPLETED:   { label: "Terminé",    color: "#34d399", bg: "#042f1c" },
  PARTIAL:     { label: "Partiel",    color: "#fb923c", bg: "#2d1400" },
  CANCELLED:   { label: "Annulé",     color: "#f87171", bg: "#2d0a0a" },
  FAILED:      { label: "Échoué",     color: "#f87171", bg: "#2d0a0a" },
};

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string; balance: number } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then(r => r.json()),
      fetch("/api/commandes").then(r => r.json()),
    ]).then(([u, o]) => {
      setUser(u.user);
      setOrders(Array.isArray(o) ? o.slice(0, 5) : []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm" style={{ color: "#6b7280" }}>Chargement...</div>
    </div>
  );

  const stats: Stats = {
    balance: user?.balance ?? 0,
    totalOrders: orders.length,
    activeOrders: orders.filter(o => ["PENDING","IN_PROGRESS"].includes(o.status)).length,
    totalSpent: orders.reduce((s, o) => s + o.charge, 0),
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Bonjour, {user?.name} 👋</h1>
        <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>Voici un aperçu de votre activité</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Solde", value: `$${stats.balance.toFixed(2)}`, icon: "◎" },
          { label: "Total commandes", value: stats.totalOrders, icon: "≡" },
          { label: "En cours", value: stats.activeOrders, icon: "⟳" },
          { label: "Total dépensé", value: `$${stats.totalSpent.toFixed(2)}`, icon: "↑" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wide" style={{ color: "#6b7280" }}>{s.label}</span>
              <span style={{ color: "#7c3aed" }}>{s.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/dashboard/nouvelle-commande" className="p-5 rounded-xl flex items-center gap-4 transition-opacity hover:opacity-90" style={{ background: "#7c3aed" }}>
          <div className="text-2xl">+</div>
          <div>
            <div className="font-semibold text-white">Nouvelle commande</div>
            <div className="text-sm opacity-80">Choisissez un service et passez commande</div>
          </div>
        </Link>
        <Link href="/dashboard/portefeuille" className="p-5 rounded-xl flex items-center gap-4 transition-colors" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
          <div className="text-2xl">◎</div>
          <div>
            <div className="font-semibold text-white">Recharger le solde</div>
            <div className="text-sm" style={{ color: "#9ca3af" }}>Solde actuel : ${stats.balance.toFixed(2)}</div>
          </div>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#2e2e3e" }}>
          <h2 className="font-semibold text-white">Commandes récentes</h2>
          <Link href="/dashboard/commandes" className="text-sm" style={{ color: "#a78bfa" }}>Voir tout →</Link>
        </div>
        {orders.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm" style={{ color: "#6b7280" }}>
            Aucune commande pour l&apos;instant.{" "}
            <Link href="/dashboard/nouvelle-commande" style={{ color: "#a78bfa" }}>Passer votre première commande</Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#2e2e3e" }}>
            {orders.map((order) => {
              const s = statusConfig[order.status] || statusConfig.PENDING;
              return (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">{order.service.name}</div>
                    <div className="text-xs mt-0.5 truncate max-w-xs" style={{ color: "#6b7280" }}>{order.link}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: "#9ca3af" }}>{order.quantity.toLocaleString()}</span>
                    <span className="text-sm font-medium text-white">${order.charge.toFixed(4)}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
