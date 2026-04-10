"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: number;
  name: string;
  type: string;
  category: string;
  ourRate: number;
  min: number;
  max: number;
  refill: boolean;
}

export default function NouvelleCommandePage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then(r => r.json()),
      fetch("/api/auth/me").then(r => r.json()),
    ]).then(([s, u]) => {
      const svcs = Array.isArray(s) ? s : [];
      setServices(svcs);
      const cats = [...new Set<string>(svcs.map((s: Service) => s.category))].sort();
      setCategories(cats);
      if (cats.length) setSelectedCategory(cats[0]);
      setBalance(u.user?.balance ?? 0);
    }).finally(() => setLoading(false));
  }, []);

  const filteredServices = services.filter(s => s.category === selectedCategory);
  const qty = parseInt(quantity) || 0;
  const cost = selectedService ? (qty / 1000) * selectedService.ourRate : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService) return;
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedService.id, link, quantity: qty }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess("Commande passée avec succès !");
      setTimeout(() => router.push("/dashboard/commandes"), 1500);
    } catch {
      setError("Erreur lors de la commande");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-sm" style={{ color: "#6b7280" }}>Chargement des services...</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Nouvelle commande</h1>
        <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>Sélectionnez un service et passez votre commande</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Category */}
          <div className="p-5 rounded-xl" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#d1d5db" }}>Catégorie</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setSelectedService(null); }}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: selectedCategory === cat ? "#7c3aed" : "#22222f",
                    color: selectedCategory === cat ? "white" : "#9ca3af",
                    border: `1px solid ${selectedCategory === cat ? "#7c3aed" : "#2e2e3e"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service selection */}
          <div className="p-5 rounded-xl" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
            <label className="block text-sm font-medium mb-3" style={{ color: "#d1d5db" }}>Service</label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredServices.map(svc => (
                <button
                  key={svc.id}
                  onClick={() => { setSelectedService(svc); setQuantity(String(svc.min)); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm transition-colors"
                  style={{
                    background: selectedService?.id === svc.id ? "#2e1f5e" : "#22222f",
                    border: `1px solid ${selectedService?.id === svc.id ? "#7c3aed" : "#2e2e3e"}`,
                    color: selectedService?.id === svc.id ? "#a78bfa" : "#e5e7eb",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{svc.name}</span>
                    <span className="text-xs" style={{ color: "#9ca3af" }}>${svc.ourRate.toFixed(2)}/1000</span>
                  </div>
                  <div className="mt-1 flex gap-3 text-xs" style={{ color: "#6b7280" }}>
                    <span>Min: {svc.min.toLocaleString()}</span>
                    <span>Max: {svc.max.toLocaleString()}</span>
                    {svc.refill && <span className="text-green-400">✓ Refill</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Link & Quantity */}
          {selectedService && (
            <form onSubmit={handleSubmit} className="p-5 rounded-xl space-y-4" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
              {error && (
                <div className="px-4 py-3 rounded-lg text-sm" style={{ background: "#2d1515", color: "#f87171", border: "1px solid #7f1d1d" }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="px-4 py-3 rounded-lg text-sm" style={{ background: "#042f1c", color: "#34d399", border: "1px solid #065f46" }}>
                  {success}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>Lien</label>
                <input
                  type="url"
                  required
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  placeholder="https://instagram.com/votre_profil"
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none"
                  style={{ background: "#22222f", border: "1px solid #2e2e3e" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#d1d5db" }}>
                  Quantité (min: {selectedService.min.toLocaleString()} — max: {selectedService.max.toLocaleString()})
                </label>
                <input
                  type="number"
                  required
                  min={selectedService.min}
                  max={selectedService.max}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none"
                  style={{ background: "#22222f", border: "1px solid #2e2e3e" }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || cost > balance}
                className="w-full py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: "#7c3aed" }}
              >
                {submitting ? "Commande en cours..." : `Commander — $${cost.toFixed(4)}`}
              </button>
              {cost > balance && (
                <p className="text-xs text-center" style={{ color: "#f87171" }}>
                  Solde insuffisant. <a href="/dashboard/portefeuille" style={{ color: "#a78bfa" }}>Recharger →</a>
                </p>
              )}
            </form>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="p-5 rounded-xl sticky top-4" style={{ background: "#1a1a24", border: "1px solid #2e2e3e" }}>
            <h3 className="font-semibold text-white mb-4">Récapitulatif</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "#9ca3af" }}>Service</span>
                <span className="text-white text-right max-w-32 truncate">{selectedService?.name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#9ca3af" }}>Quantité</span>
                <span className="text-white">{qty ? qty.toLocaleString() : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#9ca3af" }}>Prix/1000</span>
                <span className="text-white">{selectedService ? `$${selectedService.ourRate.toFixed(2)}` : "—"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold" style={{ borderColor: "#2e2e3e" }}>
                <span style={{ color: "#9ca3af" }}>Total</span>
                <span className="text-white">{cost > 0 ? `$${cost.toFixed(4)}` : "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "#6b7280" }}>Votre solde</span>
                <span style={{ color: balance >= cost && cost > 0 ? "#34d399" : "#f87171" }}>${balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
