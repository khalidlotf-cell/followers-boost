"use client";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  japOrderId: number | null;
  status: string;
  quantity: number;
  charge: number;
  link: string;
  createdAt: string;
  user: { email: string; name: string };
  service: { name: string; category: string };
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:     { label: "En attente", color: "#fbbf24", bg: "#2d2004" },
  IN_PROGRESS: { label: "En cours",   color: "#60a5fa", bg: "#0d1f3c" },
  COMPLETED:   { label: "Terminé",    color: "#34d399", bg: "#042f1c" },
  PARTIAL:     { label: "Partiel",    color: "#fb923c", bg: "#2d1400" },
  CANCELLED:   { label: "Annulé",     color: "#f87171", bg: "#2d0a0a" },
  FAILED:      { label: "Échoué",     color: "#f87171", bg: "#2d0a0a" },
};

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/admin/commandes")
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); })
      .finally(() => setLoading(false));
  }, []);

  const statuses = ["ALL", "PENDING", "IN_PROGRESS", "COMPLETED", "PARTIAL", "CANCELLED"];
  const filtered = filter === "ALL" ? orders : orders.filter(o => o.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64 text-sm" style={{ color: "#6b7280" }}>Chargement...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Toutes les commandes</h1>
        <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>{orders.length} commandes au total</p>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {statuses.map(s => {
          const cfg = s === "ALL" ? null : statusConfig[s];
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: active ? (cfg?.bg || "#2e1f5e") : "#1a1a24",
                color: active ? (cfg?.color || "#a78bfa") : "#9ca3af",
                border: `1px solid ${active ? (cfg?.color || "#7c3aed") : "#2e2e3e"}`,
              }}
            >
              {cfg?.label || "Tous"} {s !== "ALL" && `(${orders.filter(o => o.status === s).length})`}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#2e2e3e" }}>
                {["ID MTP", "Utilisateur", "Service", "Lien", "Qté", "Coût", "Statut", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#2e2e3e" }}>
              {filtered.map(order => {
                const s = statusConfig[order.status] || statusConfig.PENDING;
                return (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "#6b7280" }}>{order.japOrderId ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="text-white text-xs font-medium">{order.user.name}</div>
                      <div className="text-xs" style={{ color: "#6b7280" }}>{order.user.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white text-xs">{order.service.name}</div>
                      <div className="text-xs" style={{ color: "#6b7280" }}>{order.service.category}</div>
                    </td>
                    <td className="px-4 py-3">
                      {/^https?:\/\//.test(order.link) ? (
                        <a href={order.link} target="_blank" rel="noopener noreferrer" className="text-xs truncate max-w-28 block hover:underline" style={{ color: "#a78bfa" }}>
                          {order.link}
                        </a>
                      ) : (
                        <span className="text-xs truncate max-w-28 block" style={{ color: "#6b7280" }}>{order.link}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white text-xs">{order.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 text-white text-xs">${order.charge.toFixed(4)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "#6b7280" }}>
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
