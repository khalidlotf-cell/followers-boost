"use client";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  japOrderId: number | null;
  status: string;
  quantity: number;
  charge: number;
  link: string;
  startCount: number | null;
  remains: number | null;
  createdAt: string;
  service: { name: string; category: string };
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PENDING_PAYMENT: { label: "Paiement en attente", color: "#c084fc", bg: "#2e1f5e" },
  PENDING:         { label: "En attente",  color: "#fbbf24", bg: "#2d2004" },
  IN_PROGRESS:     { label: "En cours",    color: "#60a5fa", bg: "#0d1f3c" },
  COMPLETED:       { label: "Terminé",     color: "#34d399", bg: "#042f1c" },
  PARTIAL:         { label: "Partiel",     color: "#fb923c", bg: "#2d1400" },
  CANCELLED:       { label: "Annulé",      color: "#f87171", bg: "#2d0a0a" },
  FAILED:          { label: "Échoué",      color: "#f87171", bg: "#2d0a0a" },
};

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function fetchOrders() {
    const res = await fetch("/api/commandes");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function syncStatus() {
    setSyncing(true);
    await fetch("/api/commandes/sync", { method: "POST" });
    await fetchOrders();
    setSyncing(false);
  }

  useEffect(() => { fetchOrders(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm" style={{ color: "#6b7280" }}>Chargement...</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes commandes</h1>
          <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>{orders.length} commande{orders.length !== 1 ? "s" : ""} au total</p>
        </div>
        <button
          onClick={syncStatus}
          disabled={syncing}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          style={{ background: "#1a1a24", color: "#a78bfa", border: "1px solid #2e2e3e" }}
        >
          {syncing ? "Synchronisation..." : "⟳ Actualiser les statuts"}
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm" style={{ color: "#6b7280" }}>
            Aucune commande.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "#2e2e3e" }}>
                  {["ID MTP", "Service", "Lien", "Quantité", "Coût", "Statut", "Date"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "#6b7280" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#2e2e3e" }}>
                {orders.map((order) => {
                  const s = statusConfig[order.status] || statusConfig.PENDING;
                  return (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "#6b7280" }}>
                        {order.japOrderId ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{order.service.name}</div>
                        <div className="text-xs" style={{ color: "#6b7280" }}>{order.service.category}</div>
                      </td>
                      <td className="px-4 py-3">
                        {/^https?:\/\//.test(order.link) ? (
                          <a
                            href={order.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs truncate max-w-32 block hover:underline"
                            style={{ color: "#a78bfa" }}
                          >
                            {order.link}
                          </a>
                        ) : (
                          <span className="text-xs truncate max-w-32 block" style={{ color: "#6b7280" }}>{order.link}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white">{order.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 text-white">${order.charge.toFixed(4)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ color: s.color, background: s.bg }}>
                          {s.label}
                        </span>
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
        )}
      </div>
    </div>
  );
}
