"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

interface Platform {
  label: string;
  slug: string;
  emoji: string;
  color: string;
  count: number;
}

function PlatformLogo({ slug, size = 48 }: { slug: string; size?: number }) {
  const s = size;
  if (slug === "instagram") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="10%" stopColor="#fdf497"/>
          <stop offset="50%" stopColor="#fd5949"/>
          <stop offset="68%" stopColor="#d6249f"/>
          <stop offset="100%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.8" fill="none"/>
    </svg>
  );
  if (slug === "tiktok") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#010101"/>
      <path d="M16.6 5.82a4.02 4.02 0 0 1-.77-2.32h-2.62v10.4c-.05 1.06-.92 1.9-2 1.9a2 2 0 0 1-2-2 2 2 0 0 1 2-2c.2 0 .38.03.56.08V9.2a4.63 4.63 0 0 0-.56-.04 4.62 4.62 0 0 0-4.62 4.62 4.62 4.62 0 0 0 4.62 4.62 4.62 4.62 0 0 0 4.62-4.62V9.22A6.6 6.6 0 0 0 19.5 10V7.4a4.03 4.03 0 0 1-2.9-1.58z" fill="white"/>
      <path d="M16.6 5.82a4.02 4.02 0 0 1-.77-2.32h-2.62v10.4c-.05 1.06-.92 1.9-2 1.9a2 2 0 0 1-2-2 2 2 0 0 1 2-2c.2 0 .38.03.56.08V9.2a4.63 4.63 0 0 0-.56-.04 4.62 4.62 0 0 0-4.62 4.62 4.62 4.62 0 0 0 4.62 4.62 4.62 4.62 0 0 0 4.62-4.62V9.22A6.6 6.6 0 0 0 19.5 10V7.4a4.03 4.03 0 0 1-2.9-1.58z" fill="#69C9D0" opacity="0.6"/>
    </svg>
  );
  if (slug === "youtube") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M21.8 8.04s-.2-1.4-.8-2c-.78-.82-1.65-.82-2.04-.87C16.4 5 12 5 12 5s-4.4 0-6.96.17c-.4.05-1.26.05-2.04.87-.6.6-.8 2-.8 2S2 9.6 2 11.16v1.5c0 1.57.2 3.13.2 3.13s.2 1.4.8 2c.78.82 1.8.8 2.26.88C6.8 18.86 12 18.9 12 18.9s4.4 0 6.96-.2c.4-.05 1.26-.06 2.04-.88.6-.6.8-2 .8-2S22 14.23 22 12.66v-1.5c0-1.57-.2-3.12-.2-3.12zM9.75 14.85V9.05l5.5 2.9-5.5 2.9z" fill="white"/>
    </svg>
  );
  if (slug === "facebook") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16 3.5h-2.5A4.5 4.5 0 0 0 9 8v2.5H6.5V14H9v7h3.5v-7h2.5l.5-3.5H12.5V8a1 1 0 0 1 1-1H16V3.5z" fill="white"/>
    </svg>
  );
  if (slug === "twitter" || slug === "x") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M18.3 4h-2.1L12 9.3 7.8 4H3.7l6.1 8.1L3.6 20H5.7l4.5-5.7 4.5 5.7H18.3l-6.4-8.5L18.3 4zM14.6 18.4l-9.5-12.8H9.4l9.5 12.8h-4.3z" fill="white"/>
    </svg>
  );
  if (slug === "spotify") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1DB954"/>
      <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm3.67 11.57a.5.5 0 0 1-.69.16c-1.88-1.15-4.25-1.41-7.04-.77a.5.5 0 1 1-.22-.97c3.05-.7 5.67-.4 7.79.9a.5.5 0 0 1 .16.68zm.98-2.18a.62.62 0 0 1-.86.2c-2.15-1.32-5.43-1.7-7.97-.93a.63.63 0 0 1-.37-1.2c2.9-.88 6.5-.45 8.97 1.06a.63.63 0 0 1 .23.87zm.08-2.27C14.1 9.55 10.1 9.42 7.58 10.2a.75.75 0 0 1-.43-1.43c2.9-.87 7.3-.7 10.18 1.1a.75.75 0 1 1-.6 1.25z" fill="white"/>
    </svg>
  );
  if (slug === "threads") return (
    <svg width={s} height={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M16.27 11.43c-.1-.05-.21-.09-.32-.13-.19-2.52-1.51-3.96-3.82-3.97h-.04c-1.38 0-2.53.59-3.23 1.66l1.31.9c.53-.8 1.35-.97 1.92-.97h.03c.74 0 1.3.22 1.67.65.26.3.44.72.52 1.25a8.3 8.3 0 0 0-2.13-.1c-2.14.12-3.52 1.35-3.42 3.06.05.87.5 1.62 1.26 2.1.64.4 1.47.6 2.33.56 1.14-.06 2.03-.5 2.65-1.3.47-.62.77-1.43.9-2.45.54.32.94.74 1.17 1.25.38.84.4 2.21-.78 3.39-1.02 1.02-2.25 1.46-4.1 1.47-2.06-.01-3.62-.68-4.63-1.97-.95-1.22-1.44-2.98-1.46-5.23.02-2.25.51-4.01 1.46-5.23 1.01-1.3 2.57-1.96 4.63-1.97 2.07.01 3.64.67 4.67 1.98.5.64.88 1.43 1.12 2.35l1.54-.41c-.29-1.14-.77-2.12-1.43-2.93-1.32-1.68-3.28-2.55-5.9-2.56h-.01c-2.61.01-4.56.88-5.81 2.6-1.1 1.53-1.67 3.62-1.7 6.23.03 2.6.6 4.7 1.7 6.23 1.25 1.72 3.2 2.59 5.81 2.6h.02c2.34-.01 3.99-.63 5.35-1.99 1.78-1.77 1.72-3.98 1.14-5.34-.41-.93-1.18-1.68-2.26-2.22zm-4.04 3.83c-.94.05-1.91-.37-1.95-1.28-.03-.66.47-1.4 1.97-1.49.17-.01.34-.02.5-.02.57 0 1.1.06 1.59.17-.18 2.25-1.18 2.58-2.11 2.62z" fill="white"/>
    </svg>
  );
  // fallback
  return <span style={{ fontSize: s * 0.7 }}>{slug[0].toUpperCase()}</span>;
}

const STEPS = [
  { n: "01", title: "Choisissez votre service", desc: "Sélectionnez la plateforme et le service qui vous correspond parmi notre catalogue." },
  { n: "02", title: "Entrez vos informations", desc: "Indiquez le lien de votre profil ou publication. Aucun mot de passe requis." },
  { n: "03", title: "Livraison automatique", desc: "Votre commande est traitée et livrée en quelques minutes de façon 100% sécurisée." },
];

const ROW_1 = [
  { name: "Yasmine K.", handle: "@yasminekadri", stars: 5, date: "Il y a 2 jours", text: "J'avais 2 300 followers Instagram depuis 3 ans. Après une commande de 5K, l'algo m'a poussé. Maintenant j'ai 14K en organique." },
  { name: "Florian M.", handle: "@floriandumas.mkt", stars: 5, date: "Il y a 4 jours", text: "TikTok : commandé 10K vues, la vidéo est passée de 300 à 47K naturellement dans la semaine. Je recommande." },
  { name: "Inès B.", handle: "@ines.beauty.fr", stars: 5, date: "Il y a 1 semaine", text: "Le ciblage France c'est la vraie différence. J'ai eu des abonnés qui répondaient à mes sondages dès le lendemain." },
  { name: "Romain C.", handle: "@romain.coach_", stars: 5, date: "Il y a 1 semaine", text: "Livraison en 6h, prix honnête, support qui répond le soir. C'est tout ce que je voulais." },
  { name: "Léa M.", handle: "@lea.moreau.off", stars: 5, date: "Il y a 2 semaines", text: "Commandé 1 000 abonnés un mardi soir. Le jeudi j'étais à 980. 6 mois plus tard mon compte grossit tout seul." },
  { name: "Anaïs T.", handle: "@anais.travel.ig", stars: 5, date: "Il y a 2 semaines", text: "3ème commande. Je le fais avant chaque collab pour avoir un profil crédible. Ça marche à chaque fois." },
  { name: "Nassim O.", handle: "@nassimoff_", stars: 5, date: "Il y a 3 semaines", text: "J'étais sceptique. J'ai commandé 500 likes sur un post test. En 2h tout était là. Depuis j'ai commandé 4 fois." },
  { name: "Théo D.", handle: "@theo.drops.fr", stars: 5, date: "Il y a 3 semaines", text: "Le refill a compensé automatiquement quand j'ai eu des drops. Vraiment tranquille, je n'ai rien eu à faire." },
  { name: "Marie-Lou P.", handle: "@marielouperrin", stars: 5, date: "Il y a 1 mois", text: "Comparé 4 panels différents. C'est le seul où les abonnés étaient encore là 3 mois après la commande." },
  { name: "Antoine B.", handle: "@antoinebru.off", stars: 5, date: "Il y a 1 mois", text: "Commande passée à minuit, livraison démarrée à 6h du matin. Propre et sans mauvaise surprise." },
  { name: "Clémence V.", handle: "@clemence.video", stars: 5, date: "Il y a 5 semaines", text: "Pour YouTube : 2 000 abonnés commandés. Ma chaîne recommandée dans des playlists 2 semaines après." },
  { name: "Kevin A.", handle: "@kevinab.pro", stars: 5, date: "Il y a 6 semaines", text: "Spotify : auditeurs mensuels passés de 800 à 6 200 en 3 semaines. Playlist algorithmique déclenchée derrière." },
];

const ROW_2 = [
  { name: "Sofia R.", handle: "@sofiar.create", stars: 5, date: "Il y a 2 jours", text: "Interface simple, pas besoin de compte, paiement en 30 secondes. Exactement ce que j'attendais." },
  { name: "Hugo L.", handle: "@hugolaffon_", stars: 5, date: "Il y a 5 jours", text: "Les likes express arrivent avant que j'aie fermé l'app. Parfait pour les publications où le timing est crucial." },
  { name: "Camille R.", handle: "@cam.rousseau_", stars: 5, date: "Il y a 1 semaine", text: "Les nouveaux abonnés regardent mes stories et répondent à mes questions. C'est pas des fantômes." },
  { name: "Baptiste M.", handle: "@bap.music31", stars: 5, date: "Il y a 2 semaines", text: "Pour les streams Spotify c'est propre. J'y vais par paliers de 1 000. Résultat nickel à chaque fois." },
  { name: "Lucie F.", handle: "@luciefaure.art", stars: 5, date: "Il y a 2 semaines", text: "Compte Facebook pro : 2 000 abonnés commandés. Tout livré en 18h. Rien à redire sur la qualité." },
  { name: "Mathieu G.", handle: "@mathieu.gym_", stars: 5, date: "Il y a 3 semaines", text: "J'ai une communauté de 22K maintenant, moitié organique moitié boost. Les deux se combinent très bien." },
  { name: "Sandra K.", handle: "@sandrak.food", stars: 5, date: "Il y a 3 semaines", text: "Le support m'a répondu en 45 min un dimanche soir. Ce niveau de réactivité, c'est vraiment rare." },
  { name: "Julie M.", handle: "@julie.martin.crea", stars: 5, date: "Il y a 1 mois", text: "3ème commande. Ça marche à chaque fois. De 800 à 15 000 en 8 mois, moitié organique moitié boost." },
  { name: "Youssef A.", handle: "@youssefamrani", stars: 4, date: "Il y a 5 semaines", text: "Quelques abonnés sont partis après 3 semaines mais le refill a compensé automatiquement. Bon rapport qualité/prix." },
  { name: "Nicolas D.", handle: "@nicodu31", stars: 5, date: "Il y a 6 semaines", text: "Rapide, propre, prix correct. J'ai commandé pour ma page Facebook pro. Tout arrivé en moins de 24h." },
  { name: "Amina K.", handle: "@amina_kaci_art", stars: 5, date: "Il y a 2 mois", text: "Les abonnés qui arrivent s'engagent aussi sur mes stories. On sent que c'est des profils actifs." },
  { name: "Thomas L.", handle: "@thomas.lef.photo", stars: 5, date: "Il y a 2 mois", text: "Ma chaîne YouTube stagnait à 200 abonnés depuis un an. Commandé 2 000. Trois semaines après j'étais à 3 500." },
];

const FAQS = [
  { q: "Est-ce que c'est sécurisé ?", a: "Oui, totalement. Nous n'avons jamais besoin de votre mot de passe. Nos méthodes respectent les conditions d'utilisation des plateformes." },
  { q: "Combien de temps prend la livraison ?", a: "La plupart des commandes démarrent en moins de 5 minutes. Le délai complet dépend de la quantité commandée." },
  { q: "Les followers/likes sont-ils réels ?", a: "Nos services varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des comptes de haute qualité. Chaque service est clairement décrit." },
  { q: "Que faire si ma commande ne démarre pas ?", a: "Contactez notre support disponible 7j/7. Nous garantissons le remboursement ou le remplacement si la commande n'est pas livrée." },
  { q: "Puis-je commander pour n'importe quel compte ?", a: "Oui, tant que le compte est public au moment de la commande. Pour les likes et vues, la publication doit être accessible." },
];

const STATS = [
  { value: "12 000+", label: "Commandes livrées" },
  { value: "4.9/5", label: "Satisfaction clients" },
  { value: "5 min", label: "Délai moyen" },
  { value: "7j/7", label: "Support disponible" },
];

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "radial-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  tiktok:    "linear-gradient(135deg, #010101 0%, #1a1a2e 100%)",
  youtube:   "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)",
  facebook:  "linear-gradient(135deg, #1877F2 0%, #1565c0 100%)",
  twitter:   "linear-gradient(135deg, #14171A 0%, #1a1a1a 100%)",
  spotify:   "linear-gradient(135deg, #1DB954 0%, #138040 100%)",
  threads:   "linear-gradient(135deg, #101010 0%, #2c2c2c 100%)",
};

export default function ShopHome() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/boutique")
      .then(r => r.json())
      .then(d => setPlatforms(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="shop-hero" style={{ background: "radial-gradient(ellipse 110% 55% at 50% -5%, #ede9fe 0%, #fff 65%)", position: "relative", overflow: "hidden" }}>
        {/* Background decoration blobs */}
        <div style={{ position: "absolute", top: -80, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          {/* Trust badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(0,0,0,0.06)", borderRadius: 100, padding: "6px 16px 6px 10px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#555" }}>Service actif · Livraison en 5 min</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 800, color: "#111", lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 820, margin: "0 auto 22px" }}>
            Boostez votre présence<br />
            <span style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sur les réseaux sociaux</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#666", maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.65 }}>
            Followers, likes, vues — des services de qualité pour Instagram, TikTok, YouTube et bien plus.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <Link href="#plateformes" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 100,
              background: "#111", color: "#fff",
              fontWeight: 700, fontSize: 15, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.18)"; }}
            >
              Découvrir les services →
            </Link>
            <Link href="/inscription" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 100,
              background: "rgba(255,255,255,0.9)", color: "#111",
              fontWeight: 600, fontSize: 15, textDecoration: "none",
              border: "1.5px solid rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
            }}>
              Créer un compte gratuit
            </Link>
          </div>

          {/* Platform logo strip */}
          {platforms.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#bbb", fontWeight: 500 }}>Disponible sur</span>
              {platforms.map(p => (
                <Link key={p.slug} href={`/boutique/${p.slug}`} style={{ opacity: 0.7, transition: "opacity 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                >
                  <PlatformLogo slug={p.slug} size={26} />
                </Link>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="shop-stats" style={{ display: "flex", gap: 0, justifyContent: "center", marginTop: 56, flexWrap: "wrap" }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center", padding: "20px 32px",
                borderLeft: i > 0 ? "1.5px solid #ebebeb" : "none",
              }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section id="plateformes" style={{ padding: "80px 0", background: "#fff", borderTop: "1.5px solid #ebebeb" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 8 }}>
                Choisissez votre plateforme
              </h2>
              <p style={{ fontSize: 15, color: "#888" }}>Services disponibles pour toutes les grandes plateformes</p>
            </div>
            {/* Search */}
            <div style={{ position: "relative", minWidth: 220 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ padding: "9px 12px 9px 34px", borderRadius: 100, border: "1.5px solid #e8e8e8", fontSize: 14, color: "#111", background: "#fff", outline: "none", width: "100%", boxSizing: "border-box" }}
                onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                onBlur={e => (e.currentTarget.style.borderColor = "#e8e8e8")}
              />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: 16, lineHeight: 1, padding: 2 }}>×</button>}
            </div>
          </div>

          {loading ? (
            <div className="platforms-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: 190, borderRadius: 20, background: "#f3f3f3", animation: "pulse 1.5s infinite" }} />
              ))}
            </div>
          ) : platforms.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
              {search ? `Aucun résultat pour « ${search} »` : "Aucun service disponible — synchronisez depuis l'admin."}
            </div>
          ) : (
            <div className="platforms-grid">
              {platforms.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).map(p => (
                <Link key={p.slug} href={`/boutique/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="platform-card">
                    {/* Colored header */}
                    <div style={{
                      height: 90, background: PLATFORM_COLORS[p.slug] ?? "linear-gradient(135deg, #333, #111)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "16px 16px 0 0",
                    }}>
                      <PlatformLogo slug={p.slug} size={48} />
                    </div>
                    {/* Info */}
                    <div style={{ padding: "16px 18px 18px" }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: "#111", marginBottom: 3 }}>{p.label}</div>
                      <div style={{ fontSize: 13, color: "#999" }}>{p.count} service{p.count !== 1 ? "s" : ""}</div>
                      <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>Voir les offres</span>
                        <span className="card-arrow" style={{ fontSize: 16, color: "#bbb", transition: "transform 0.2s, color 0.2s" }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 0", background: "#fafafa", borderTop: "1.5px solid #ebebeb" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 10 }}>
              Comment ça marche ?
            </h2>
            <p style={{ fontSize: 15, color: "#888" }}>3 étapes simples pour booster votre présence</p>
          </div>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
            {/* Connecting dotted line */}
            <div className="steps-line" style={{ position: "absolute", top: 22, left: "calc(16.7% + 16px)", right: "calc(16.7% + 16px)", height: 1, background: "repeating-linear-gradient(90deg, #d4d4d4 0, #d4d4d4 5px, transparent 5px, transparent 12px)", pointerEvents: "none" }} />
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 32px", position: "relative" }}>
                {/* Number circle */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "#111", color: "#fff",
                  fontWeight: 800, fontSize: 16,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", position: "relative", zIndex: 1,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEES ── */}
      <section style={{ padding: "80px 0", background: "#fafafa", borderTop: "1.5px solid #ebebeb" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px 80px", alignItems: "start" }} className="guarantees-grid">
            <div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.15 }}>
                Ce qui nous<br />différencie
              </h2>
              <p style={{ fontSize: 15, color: "#777", lineHeight: 1.75, maxWidth: 340 }}>
                Des services pensés pour votre croissance réelle — pas juste pour les chiffres. Livraison rapide, sans risque, avec un vrai support humain.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { title: "Livraison en moins de 5 minutes", desc: "La commande démarre automatiquement dès la confirmation du paiement." },
                { title: "Aucun mot de passe requis", desc: "Vos accès restent privés. On a seulement besoin du lien de votre profil." },
                { title: "Compatible avec l'algorithme", desc: "Des méthodes qui s'intègrent naturellement à votre activité sur la plateforme." },
                { title: "Refill automatique inclus", desc: "Si des followers disparaissent, ils sont remplacés sans que vous ayez à intervenir." },
                { title: "Support disponible 7j/7", desc: "Une vraie équipe qui répond rapidement — pas un bot, pas une FAQ." },
              ].map((g, i, arr) => (
                <div key={i} style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  padding: "20px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid #e8e8e8" : "none",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "#111",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: "#111", marginBottom: 3 }}>{g.title}</div>
                    <div style={{ fontSize: 13.5, color: "#888", lineHeight: 1.6 }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 0", background: "#fafafa", borderTop: "1.5px solid #ebebeb", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }} className="container">
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Ce que disent nos clients
          </h2>
          <p style={{ fontSize: 16, color: "#888" }}>Plus de 12 000 commandes livrées · Note moyenne 4.9/5</p>
        </div>

        {/* Row 1 — gauche */}
        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <div className="marquee-track">
            {[...ROW_1, ...ROW_1].map((t, i) => (
              <div key={i} className="marquee-card">
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: "#22c55e", fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.65, marginBottom: 16, flexGrow: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#bbb" }}>{t.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — droite */}
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track-r">
            {[...ROW_2, ...ROW_2].map((t, i) => (
              <div key={i} className="marquee-card">
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j} style={{ color: "#22c55e", fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.65, marginBottom: 16, flexGrow: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#bbb" }}>{t.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 0", background: "#fff", borderTop: "1.5px solid #ebebeb" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 12 }}>
              Questions fréquentes
            </h2>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span style={{ fontSize: 22, color: "#bbb", transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
              </button>
              {openFaq === i && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 0", background: "#111", borderTop: "1.5px solid #222" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Prêt à booster votre compte ?
          </h2>
          <p style={{ fontSize: 16, color: "#999", marginBottom: 32 }}>
            Plus de 12 000 commandes livrées. Sans mot de passe. Livraison en 5 min.
          </p>
          <Link href="#plateformes" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", color: "#111",
            padding: "15px 32px", borderRadius: 100,
            fontWeight: 700, fontSize: 16, textDecoration: "none",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Voir les services →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0a0a", padding: "48px 0 32px", borderTop: "1px solid #1f1f1f" }}>
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 12, color: "#111" }}>FB</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Followers Boost</span>
              </div>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 260 }}>
                Le panel SMM N°1 en Europe pour booster votre présence sur les réseaux sociaux.
              </p>
            </div>
            {[
              { title: "Services", links: ["Instagram", "TikTok", "YouTube", "Facebook"] },
              { title: "Compte", links: ["Connexion", "Inscription", "Mes commandes"] },
              { title: "Aide", links: ["FAQ", "Contact", "Conditions d'utilisation"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 16 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <span style={{ fontSize: 14, color: "#666", cursor: "pointer" }}>{l}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom" style={{ borderTop: "1px solid #1f1f1f", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#555" }}>© {new Date().getFullYear()} Followers Boost. Tous droits réservés.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {["Visa", "Mastercard", "CB", "PayPal"].map(m => (
                <span key={m} style={{ fontSize: 11, fontWeight: 600, color: "#555", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 5, padding: "3px 8px" }}>{m}</span>
              ))}
              <span style={{ fontSize: 13, color: "#555", marginLeft: 4 }}>· Paiement sécurisé SSL</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        /* Hero */
        .shop-hero { padding-top: 130px; padding-bottom: 80px; }
        .shop-stats { background: #fafafa; border: 1.5px solid #ebebeb; border-radius: 20px; display: inline-flex !important; }

        /* Platforms grid */
        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 16px;
        }
        .platform-card {
          border: 1.5px solid #ebebeb;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        .platform-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          transform: translateY(-3px);
          border-color: #ddd;
        }
        .platform-card:hover .card-arrow {
          transform: translateX(4px);
          color: #111 !important;
        }

        /* Steps */
        .steps-grid { max-width: 860px; margin: 0 auto; }

        /* Marquee */
        .marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-l 55s linear infinite;
          padding: 4px 8px;
        }
        .marquee-track-r {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: marquee-r 55s linear infinite;
          padding: 4px 8px;
        }
        .marquee-track:hover, .marquee-track-r:hover {
          animation-play-state: paused;
        }
        .marquee-card {
          width: 280px;
          flex-shrink: 0;
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 16px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          cursor: default;
        }

        /* Footer */
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        .footer-bottom { flex-direction: row; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .shop-hero { padding-top: 90px !important; padding-bottom: 52px !important; }
          .shop-stats { display: grid !important; grid-template-columns: 1fr 1fr; border-radius: 16px !important; }
          .shop-stats > div { border-left: none !important; border-top: 1.5px solid #ebebeb; }
          .shop-stats > div:first-child, .shop-stats > div:nth-child(2) { border-top: none; }
          .shop-stats > div:nth-child(odd) { border-right: 1.5px solid #ebebeb; }

          .platforms-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }

          .steps-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .steps-line { display: none !important; }
          .steps-grid > div { padding: 0 !important; text-align: left !important; display: flex !important; align-items: flex-start !important; gap: 16px; }
          .steps-grid > div > div:first-child { flex-shrink: 0; margin: 0 !important; }

          .guarantees-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .marquee-card { width: 240px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-bottom { flex-direction: column !important; text-align: center; gap: 6px !important; }
        }
      `}</style>
    </div>
  );
}
