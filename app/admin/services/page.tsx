"use client";
import { useEffect, useState, useMemo } from "react";

interface Service {
  id: number;
  name: string;
  type: string;
  category: string;
  rate: number;
  ourRate: number;
  min: number;
  max: number;
  refill: boolean;
  active: boolean;
  targeting: string;
  platformSlug: string;
  groupSlug: string;
}

const TARGETING_OPTIONS = [
  { value: "world",  label: "🌍 Monde" },
  { value: "france", label: "🇫🇷 France" },
  { value: "europe", label: "🇪🇺 Europe" },
];

// Options catégorie = plateforme + groupe (valeur = "platform:group")
const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "— Non assigné —" },
  { value: "instagram:abonnes",       label: "📸 Instagram › Abonnés" },
  { value: "instagram:likes",         label: "📸 Instagram › Likes" },
  { value: "instagram:vues",          label: "📸 Instagram › Vues" },
  { value: "instagram:commentaires",  label: "📸 Instagram › Commentaires" },
  { value: "tiktok:abonnes",          label: "🎵 TikTok › Abonnés" },
  { value: "tiktok:likes",            label: "🎵 TikTok › Likes" },
  { value: "tiktok:vues",             label: "🎵 TikTok › Vues" },
  { value: "tiktok:partages",         label: "🎵 TikTok › Partages" },
  { value: "tiktok:enregistrements",  label: "🎵 TikTok › Enregistrements" },
  { value: "youtube:vues",            label: "▶️ YouTube › Vues" },
  { value: "youtube:likes",           label: "▶️ YouTube › Likes" },
  { value: "youtube:abonnes",         label: "▶️ YouTube › Abonnés" },
  { value: "facebook:abonnes",        label: "👥 Facebook › Abonnés" },
  { value: "facebook:likes",          label: "👥 Facebook › Likes" },
  { value: "twitter:abonnes",         label: "🐦 Twitter › Abonnés" },
  { value: "twitter:likes",           label: "🐦 Twitter › Likes" },
  { value: "twitter:retweets",        label: "🐦 Twitter › Retweets" },
  { value: "spotify:abonnes",         label: "🎧 Spotify › Abonnés" },
  { value: "spotify:auditeurs",       label: "🎧 Spotify › Auditeurs" },
  { value: "threads:abonnes",         label: "🧵 Threads › Abonnés" },
  { value: "threads:likes",           label: "🧵 Threads › Likes" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [saving, setSaving] = useState<number | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [edits, setEdits] = useState<Record<number, { ourRate?: string; targeting?: string }>>({});

  async function fetchServices() {
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { fetchServices(); }, []);

  const activeCount = useMemo(() => services.filter(s => s.active).length, [services]);

  const filtered = useMemo(() => services.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" ? true : filterStatus === "active" ? s.active : !s.active;
    const matchCategory = filterCategory === "all" ? true
      : filterCategory === "assigned" ? !!(s.platformSlug && s.groupSlug)
      : filterCategory === "unassigned" ? !(s.platformSlug && s.groupSlug)
      : `${s.platformSlug}:${s.groupSlug}` === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  }), [services, search, filterStatus, filterCategory]);

  const categories = useMemo(() =>
    [...new Set(filtered.map(s => s.category))].sort(),
    [filtered]
  );

  async function toggleOne(svc: Service) {
    setSaving(svc.id);
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: svc.id, active: !svc.active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    }
    setSaving(null);
  }

  async function saveEdits(svc: Service) {
    const edit = edits[svc.id];
    if (!edit) return;
    const rate = edit.ourRate !== undefined ? parseFloat(edit.ourRate) : undefined;
    const targeting = edit.targeting;
    if (rate !== undefined && isNaN(rate)) return;
    setSaving(svc.id);
    const body: Record<string, unknown> = { id: svc.id };
    if (rate !== undefined) body.ourRate = rate;
    if (targeting !== undefined) body.targeting = targeting;
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
      setEdits(e => { const copy = { ...e }; delete copy[svc.id]; return copy; });
    }
    setSaving(null);
  }

  async function changeTargeting(svc: Service, targeting: string) {
    setSaving(svc.id);
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: svc.id, targeting }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    }
    setSaving(null);
  }

  async function changeCategory(svc: Service, value: string) {
    const [platformSlug, groupSlug] = value ? value.split(":") : ["", ""];
    setSaving(svc.id);
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: svc.id, platformSlug: platformSlug ?? "", groupSlug: groupSlug ?? "" }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
    }
    setSaving(null);
  }

  async function bulkToggleCategory(cat: string, active: boolean) {
    const ids = services.filter(s => s.category === cat).map(s => s.id);
    setBulkLoading(true);
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, active }),
    });
    setServices(prev => prev.map(s => s.category === cat ? { ...s, active } : s));
    setBulkLoading(false);
  }

  async function bulkToggleAll(active: boolean) {
    const ids = filtered.map(s => s.id);
    if (ids.length === 0) return;
    setBulkLoading(true);
    await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids, active }),
    });
    setServices(prev => prev.map(s => ids.includes(s.id) ? { ...s, active } : s));
    setBulkLoading(false);
  }

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 256, color: "#6b7280", fontSize: 14 }}>
      Chargement…
    </div>
  );

  return (
    <div style={{ maxWidth: 1200 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>Services</h1>
          <p style={{ marginTop: 6, fontSize: 14, color: "#9ca3af" }}>
            <span style={{ fontWeight: 600, color: activeCount > 100 ? "#f87171" : "#34d399" }}>
              {activeCount} actif{activeCount !== 1 ? "s" : ""}
            </span>
            <span style={{ color: "#4b5563" }}> / {services.length} total</span>
            {activeCount > 100 && (
              <span style={{ marginLeft: 8, fontSize: 12, color: "#f87171" }}>⚠ Plus de 100 actifs</span>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => bulkToggleAll(true)} disabled={bulkLoading}
            style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#042f1c", color: "#34d399", border: "1px solid #065f46", cursor: "pointer", opacity: bulkLoading ? 0.4 : 1 }}>
            Tout activer ({filtered.length})
          </button>
          <button onClick={() => bulkToggleAll(false)} disabled={bulkLoading}
            style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: "#2d0a0a", color: "#f87171", border: "1px solid #7f1d1d", cursor: "pointer", opacity: bulkLoading ? 0.4 : 1 }}>
            Tout désactiver ({filtered.length})
          </button>
        </div>
      </div>

      {/* Legend ciblage */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "#6b7280" }}>Ciblage :</span>
        {TARGETING_OPTIONS.map(o => (
          <span key={o.value} style={{ fontSize: 12, padding: "2px 10px", borderRadius: 20, background: "#1a1a24", border: "1px solid #2e2e3e", color: "#9ca3af" }}>
            {o.label}
          </span>
        ))}
        <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 4 }}>— Tagger un service permet au frontend de le proposer au bon ciblage</span>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <input type="text" placeholder="Rechercher un service ou catégorie…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 220, padding: "10px 16px", borderRadius: 10, fontSize: 14, color: "#fff", background: "#1a1a24", border: "1px solid #2e2e3e", outline: "none" }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {(["all", "active", "inactive"] as const).map(f => (
            <button key={f} onClick={() => setFilterStatus(f)}
              style={{ padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", background: filterStatus === f ? "#7c3aed" : "#1a1a24", color: filterStatus === f ? "#fff" : "#9ca3af", border: `1px solid ${filterStatus === f ? "#7c3aed" : "#2e2e3e"}` }}>
              {f === "all" ? "Tous" : f === "active" ? "Actifs" : "Inactifs"}
            </button>
          ))}
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, color: filterCategory !== "all" ? "#a78bfa" : "#9ca3af", background: "#1a1a24", border: `1px solid ${filterCategory !== "all" ? "#7c3aed" : "#2e2e3e"}`, cursor: "pointer", outline: "none", fontFamily: "inherit" }}>
            <option value="all">Toutes catégories</option>
            <option value="assigned">✓ Assignés</option>
            <option value="unassigned">— Non assignés</option>
            {CATEGORY_OPTIONS.filter(o => o.value).map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", fontSize: 14, color: "#6b7280" }}>
          Aucun service trouvé.{" "}
          <button onClick={() => { setSearch(""); setFilterStatus("all"); }} style={{ color: "#a78bfa", background: "none", border: "none", cursor: "pointer" }}>
            Réinitialiser
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {categories.map(cat => {
            const catServices = filtered.filter(s => s.category === cat);
            const catActive = catServices.filter(s => s.active).length;

            return (
              <div key={cat} style={{ borderRadius: 14, overflow: "hidden", background: "#1a1a24", border: "1px solid #2e2e3e" }}>

                {/* Category header */}
                <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#22222f", borderBottom: "1px solid #2e2e3e" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>{cat}</span>
                    <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 20, background: catActive > 0 ? "#042f1c" : "#1a1a24", color: catActive > 0 ? "#34d399" : "#4b5563", border: `1px solid ${catActive > 0 ? "#065f46" : "#2e2e3e"}` }}>
                      {catActive}/{catServices.length} actif{catActive !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => bulkToggleCategory(cat, true)} disabled={bulkLoading}
                      style={{ fontSize: 12, padding: "4px 10px", borderRadius: 7, background: "#042f1c", color: "#34d399", border: "1px solid #065f46", cursor: "pointer", opacity: bulkLoading ? 0.4 : 1 }}>
                      Tout activer
                    </button>
                    <button onClick={() => bulkToggleCategory(cat, false)} disabled={bulkLoading}
                      style={{ fontSize: 12, padding: "4px 10px", borderRadius: 7, background: "#2d0a0a", color: "#f87171", border: "1px solid #7f1d1d", cursor: "pointer", opacity: bulkLoading ? 0.4 : 1 }}>
                      Tout désactiver
                    </button>
                  </div>
                </div>

                {/* Services */}
                <div>
                  {catServices.map((svc, i) => {
                    const isDirty = !!edits[svc.id]?.ourRate;
                    const currentTargeting = svc.targeting ?? "world";
                    const targetingLabel = TARGETING_OPTIONS.find(o => o.value === currentTargeting)?.label ?? "🌍 Monde";
                    return (
                      <div key={svc.id} style={{ display: "grid", gridTemplateColumns: "44px 1fr auto", alignItems: "center", gap: 16, padding: "14px 20px", borderTop: i === 0 ? "none" : "1px solid #23232f", opacity: svc.active ? 1 : 0.45, transition: "opacity 0.15s" }}>

                        {/* Toggle */}
                        <button onClick={() => toggleOne(svc)} disabled={saving === svc.id || bulkLoading}
                          style={{ width: 40, height: 22, borderRadius: 11, position: "relative", background: svc.active ? "#7c3aed" : "#2e2e3e", border: "none", cursor: "pointer", flexShrink: 0, opacity: (saving === svc.id || bulkLoading) ? 0.5 : 1, transition: "background 0.2s" }}
                          title={svc.active ? "Désactiver" : "Activer"}>
                          <span style={{ position: "absolute", top: 3, left: svc.active ? "calc(100% - 19px)" : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", display: "block" }} />
                        </button>

                        {/* Name + meta */}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 500, color: "#e5e7eb", lineHeight: 1.4, wordBreak: "break-word" }}>
                            {svc.name}
                          </div>
                          <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: "4px 14px", fontSize: 12, color: "#4b5563" }}>
                            <span style={{ color: "#6b7280" }}>#{svc.id}</span>
                            <span>Fournisseur <span style={{ color: "#9ca3af" }}>${svc.rate.toFixed(4)}/1K</span></span>
                            <span>Min <span style={{ color: "#9ca3af" }}>{svc.min.toLocaleString()}</span></span>
                            <span>Max <span style={{ color: "#9ca3af" }}>{svc.max.toLocaleString()}</span></span>
                            {svc.refill && <span style={{ color: "#34d399" }}>↻ Refill</span>}
                          </div>
                        </div>

                        {/* Price + Targeting */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>

                          {/* Catégorie dropdown */}
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 4 }}>Catégorie</div>
                            <select
                              value={svc.platformSlug && svc.groupSlug ? `${svc.platformSlug}:${svc.groupSlug}` : ""}
                              onChange={e => changeCategory(svc, e.target.value)}
                              disabled={saving === svc.id}
                              style={{
                                padding: "6px 8px", borderRadius: 8, fontSize: 12,
                                color: svc.platformSlug ? "#a78bfa" : "#6b7280",
                                background: "#22222f", border: `1px solid ${svc.platformSlug ? "#7c3aed" : "#2e2e3e"}`,
                                cursor: "pointer", outline: "none", fontFamily: "inherit",
                              }}
                            >
                              {CATEGORY_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                          </div>

                          {/* Targeting dropdown */}
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 4 }}>Ciblage</div>
                            <select
                              value={currentTargeting}
                              onChange={e => changeTargeting(svc, e.target.value)}
                              disabled={saving === svc.id}
                              style={{
                                padding: "6px 8px", borderRadius: 8, fontSize: 12, color: "#fff",
                                background: "#22222f", border: "1px solid #2e2e3e", cursor: "pointer",
                                outline: "none", fontFamily: "inherit",
                              }}
                            >
                              {TARGETING_OPTIONS.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                          </div>

                          {/* Price */}
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 4 }}>Prix / 1K</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <input
                                type="number" step="0.0001"
                                value={edits[svc.id]?.ourRate ?? svc.ourRate.toFixed(4)}
                                onChange={e => setEdits(prev => ({ ...prev, [svc.id]: { ...prev[svc.id], ourRate: e.target.value } }))}
                                style={{ width: 100, padding: "6px 10px", borderRadius: 8, fontSize: 13, color: "#fff", textAlign: "right", background: isDirty ? "#1e1430" : "#22222f", border: `1px solid ${isDirty ? "#7c3aed" : "#2e2e3e"}`, outline: "none" }}
                              />
                              {isDirty && (
                                <button onClick={() => saveEdits(svc)} disabled={saving === svc.id}
                                  style={{ padding: "6px 10px", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#fff", background: "#7c3aed", border: "none", cursor: "pointer", opacity: saving === svc.id ? 0.5 : 1 }}>
                                  ✓
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
