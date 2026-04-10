"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  role: string;
  createdAt: string;
  _count: { orders: number };
}

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBalance, setEditBalance] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/utilisateurs")
      .then(r => r.json())
      .then(data => { setUsers(Array.isArray(data) ? data : []); })
      .finally(() => setLoading(false));
  }, []);

  async function updateBalance(user: User) {
    const balance = parseFloat(editBalance[user.id] ?? "");
    if (isNaN(balance)) return;
    setSaving(user.id);
    const res = await fetch("/api/admin/utilisateurs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, balance }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, balance: updated.balance } : u));
      setEditBalance(e => { const copy = { ...e }; delete copy[user.id]; return copy; });
    }
    setSaving(null);
  }

  async function toggleRole(user: User) {
    setSaving(user.id);
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    const res = await fetch("/api/admin/utilisateurs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, role: newRole }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, role: updated.role } : u));
    }
    setSaving(null);
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-sm" style={{ color: "#6b7280" }}>Chargement...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>
        <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>{users.length} compte(s) enregistré(s)</p>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "#2e2e3e" }}>
                {["Nom", "Email", "Rôle", "Commandes", "Solde", "Inscrit le", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium uppercase tracking-wide" style={{ color: "#6b7280" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#2e2e3e" }}>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "#9ca3af" }}>{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{
                      color: user.role === "ADMIN" ? "#a78bfa" : "#9ca3af",
                      background: user.role === "ADMIN" ? "#2e1f5e" : "#22222f",
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white">{user._count.orders}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={editBalance[user.id] ?? user.balance.toFixed(2)}
                        onChange={e => setEditBalance(prev => ({ ...prev, [user.id]: e.target.value }))}
                        className="w-24 px-2 py-1 rounded text-sm text-white outline-none"
                        style={{ background: "#22222f", border: "1px solid #2e2e3e" }}
                      />
                      {editBalance[user.id] !== undefined && (
                        <button
                          onClick={() => updateBalance(user)}
                          disabled={saving === user.id}
                          className="px-2 py-1 rounded text-xs font-medium text-white"
                          style={{ background: "#7c3aed" }}
                        >
                          OK
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6b7280" }}>
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRole(user)}
                      disabled={saving === user.id}
                      className="text-xs px-2 py-1 rounded transition-colors hover:bg-white/10"
                      style={{ color: "#9ca3af" }}
                    >
                      {user.role === "ADMIN" ? "→ USER" : "→ ADMIN"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
