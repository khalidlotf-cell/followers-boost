"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Footer from "./Footer";
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
  { q: "Combien de temps prend la livraison ?", a: "La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée." },
  { q: "Les followers/likes sont-ils réels ?", a: "Nos services varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des comptes de haute qualité. Chaque service est clairement décrit." },
  { q: "Que faire si ma commande ne démarre pas ?", a: "Contactez notre support disponible 7j/7. Nous garantissons le remboursement ou le remplacement si la commande n'est pas livrée." },
  { q: "Puis-je commander pour n'importe quel compte ?", a: "Oui, tant que le compte est public au moment de la commande. Pour les likes et vues, la publication doit être accessible." },
];

const STATS = [
  { value: "6 000+", label: "Commandes livrées" },
  { value: "4.9/5", label: "Satisfaction clients" },
  { value: "20 min", label: "Délai moyen" },
  { value: "7j/7", label: "Support disponible" },
];

const PLATFORM_SOLID: Record<string, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#FF0000",
  facebook:  "#1877F2",
  twitter:   "#14171A",
  spotify:   "#1DB954",
  threads:   "#101010",
};
const PLATFORM_BG: Record<string, string> = {
  instagram: "rgba(225,48,108,0.07)",
  tiktok:    "rgba(1,1,1,0.05)",
  youtube:   "rgba(255,0,0,0.07)",
  facebook:  "rgba(24,119,242,0.07)",
  twitter:   "rgba(20,23,26,0.05)",
  spotify:   "rgba(29,185,84,0.07)",
  threads:   "rgba(16,16,16,0.05)",
};
const PLATFORM_SERVICES: Record<string, string[]> = {
  instagram: ["Abonnés", "Likes", "Vues", "Commentaires"],
  tiktok:    ["Abonnés", "Likes", "Vues"],
  youtube:   ["Abonnés", "Vues", "Likes"],
  facebook:  ["Abonnés", "Likes", "Vues"],
  twitter:   ["Abonnés", "Likes"],
  spotify:   ["Streams", "Auditeurs"],
  threads:   ["Abonnés", "Likes"],
};

const COMPARATIF_DATA = {
  "1K": {
    label: "1 000 abonnés",
    organic: { duree: "2 à 5 mois", travail: "2–3h / jour", cout: "300 – 500 €", garanti: false },
    service: { duree: "24 à 72h", travail: "2 minutes", cout: "À partir de 8,90 €", garanti: true },
  },
  "5K": {
    label: "5 000 abonnés",
    organic: { duree: "8 à 18 mois", travail: "3–4h / jour", cout: "500 – 1 500 €", garanti: false },
    service: { duree: "3 à 5 jours", travail: "2 minutes", cout: "À partir de 29,90 €", garanti: true },
  },
  "10K": {
    label: "10 000 abonnés",
    organic: { duree: "1 à 3 ans", travail: "4–5h / jour", cout: "2 000 – 3 000 €", garanti: false },
    service: { duree: "5 à 8 jours", travail: "2 minutes", cout: "À partir de 74,90 €", garanti: true },
  },
} as const;

function ComparatifSection() {
  const [tab, setTab] = useState<"1K" | "5K" | "10K">("1K");
  const data = COMPARATIF_DATA[tab];

  const rows = [
    { label: "Durée estimée", organic: data.organic.duree, service: data.service.duree },
    { label: "Effort quotidien", organic: data.organic.travail, service: data.service.travail },
    { label: "Coût réel", organic: data.organic.cout, service: data.service.cout },
    { label: "Résultat garanti", organic: "Non — dépend de l'algo et du contenu", service: "Oui", isLast: true },
  ];

  return (
    <section id="comparatif" style={{ padding: "88px 0", background: "#fafbff" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Comparatif</p>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 12 }}>
            Croissance organique vs notre service
          </h2>
          <p style={{ fontSize: 15, color: "#94a3b8" }}>Même objectif, deux réalités très différentes.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48 }}>
          {(["1K", "5K", "10K"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 28px", borderRadius: 100, fontWeight: 700, fontSize: 15,
              border: "1.5px solid",
              borderColor: tab === t ? "#7c3aed" : "#e2e8f0",
              background: tab === t ? "#7c3aed" : "#fff",
              color: tab === t ? "#fff" : "#64748b",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
            }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 780, margin: "0 auto", border: "1.5px solid #e2e8f0", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
            <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {data.label}
            </div>
            <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", borderLeft: "1px solid #e2e8f0" }}>
              Croissance organique
            </div>
            <div style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.08em", borderLeft: "1px solid #e2e8f0", background: "rgba(124,58,237,0.03)" }}>
              Notre service
            </div>
          </div>

          {rows.map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: row.isLast ? "none" : "1px solid #f1f5f9" }}>
              <div style={{ padding: "20px 24px", fontSize: 13, fontWeight: 600, color: "#475569" }}>
                {row.label}
              </div>
              <div style={{ padding: "20px 24px", fontSize: 14, color: "#64748b", borderLeft: "1px solid #f1f5f9" }}>
                {row.organic === "Non — dépend de l'algo et du contenu"
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#f87171", fontWeight: 700 }}>✕</span> Non garanti
                    </span>
                  : row.organic}
              </div>
              <div style={{ padding: "20px 24px", fontSize: 14, fontWeight: row.isLast ? 700 : 600, color: row.isLast ? "#059669" : "#0f172a", borderLeft: "1px solid #f1f5f9", background: "rgba(124,58,237,0.02)" }}>
                {row.service === "Oui"
                  ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#059669", fontWeight: 700 }}>✓</span> Oui
                    </span>
                  : row.service}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 20 }}>
          * Les coûts organiques incluent le temps, l&apos;équipement et les outils. Le résultat dépend toujours de l&apos;algorithme.
        </p>
      </div>
    </section>
  );
}

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

      {/* ══ HERO — dark gradient + animated blobs ══ */}
      <section className="shop-hero" style={{ background: "linear-gradient(135deg, #06040f 0%, #0d0721 50%, #130a28 100%)", position: "relative", overflow: "hidden" }}>
        {/* Animated blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        {/* Noise texture overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")", pointerEvents: "none", opacity: 0.4 }} />

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Live badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "7px 18px 7px 12px", marginBottom: 32 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>Service actif · Livraison en 20 min</span>
          </div>

          <h1 style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.03em", maxWidth: 860, margin: "0 auto 24px" }}>
            Boostez votre présence<br />
            <span className="grad-text">sur les réseaux sociaux</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Followers, likes, vues : des services premium pour Instagram, TikTok, YouTube et bien plus.
            <br />
            <span style={{ fontSize: 13, opacity: 0.6 }}>À partir de <b>8,90 €</b> · Livraison en 24h · Sans mot de passe</span>
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <Link href="#plateformes" className="btn-primary">
              Découvrir les services →
            </Link>
            <Link href="#comparatif" className="btn-glass">
              Voir le comparatif
            </Link>
          </div>

          {/* Platform strip */}
          {platforms.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Disponible sur</span>
              {platforms.map(p => (
                <Link key={p.slug} href={`/boutique/${p.slug}`} className="platform-logo-btn">
                  <PlatformLogo slug={p.slug} size={24} />
                </Link>
              ))}
            </div>
          )}

          {/* Stats — glass cards */}
          <div className="shop-stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat-item">
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PLATFORMS ══ */}
      <section id="plateformes" style={{ padding: "88px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Catalogue</p>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 8 }}>
                Choisissez votre plateforme
              </h2>
              <p style={{ fontSize: 15, color: "#94a3b8" }}>Services disponibles pour toutes les grandes plateformes</p>
            </div>
            <div style={{ position: "relative", minWidth: 220 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#cbd5e1", pointerEvents: "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ padding: "10px 14px 10px 38px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a", background: "#f8fafc", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s" }}
                onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
              />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18, lineHeight: 1, padding: 2 }}>×</button>}
            </div>
          </div>

          {loading ? (
            <div className="bento-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 20, background: "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)", backgroundSize: "200% 100%", animation: "skeleton 1.5s ease infinite", gridColumn: i === 0 ? "span 2" : undefined, minHeight: i === 0 ? 220 : 160 }} />
              ))}
            </div>
          ) : platforms.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 0", color: "#94a3b8" }}>
              {search ? `Aucun résultat pour « ${search} »` : "Aucun service disponible, synchronisez depuis l'admin."}
            </div>
          ) : (
            <div className="bento-grid">
              {platforms.filter(p => p.label.toLowerCase().includes(search.toLowerCase())).map((p, idx) => {
                const accent = PLATFORM_SOLID[p.slug] ?? "#7c3aed";
                const tags = PLATFORM_SERVICES[p.slug] ?? [];
                const isBig = idx === 0;
                return (
                  <Link key={p.slug} href={`/boutique/${p.slug}`} style={{ textDecoration: "none", gridColumn: isBig ? "span 2" : undefined }} className="bento-cell">
                    {/* Background gradient glow */}
                    <div className="bento-glow" style={{ background: `radial-gradient(ellipse at 0% 100%, ${accent}22 0%, transparent 60%)` }} />

                    {/* Top row: icon + count */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "auto" }}>
                      <div style={{ width: isBig ? 52 : 44, height: isBig ? 52 : 44, borderRadius: 14, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PlatformLogo slug={p.slug} size={isBig ? 32 : 26} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", background: "#f1f5f9", borderRadius: 100, padding: "4px 12px" }}>
                        {p.count} services
                      </span>
                    </div>

                    {/* Bottom: name + tags */}
                    <div>
                      <div style={{ fontWeight: 800, fontSize: isBig ? 26 : 20, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 10 }}>{p.label}</div>
                      <div className="bento-tags" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {tags.slice(0, isBig ? 4 : 3).map(t => (
                          <span key={t} style={{ fontSize: 11, fontWeight: 600, color: accent, background: `${accent}14`, borderRadius: 100, padding: "3px 10px" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Hover reveal — Commander */}
                    <div className="bento-reveal" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}>
                      <span style={{ fontWeight: 800, fontSize: 12, letterSpacing: "0.07em", textTransform: "uppercase" }}>Commander</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding: "88px 0", background: "#fafbff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Simple & rapide</p>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 10 }}>
              Comment ça marche ?
            </h2>
            <p style={{ fontSize: 15, color: "#94a3b8" }}>3 étapes, moins de 2 minutes</p>
          </div>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
            <div className="steps-line" style={{ position: "absolute", top: 24, left: "calc(16.7% + 24px)", right: "calc(16.7% + 24px)", height: 1, background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3) 20%, rgba(124,58,237,0.3) 80%, transparent)", pointerEvents: "none" }} />
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 40px", position: "relative" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                  color: "#fff", fontWeight: 800, fontSize: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px", position: "relative", zIndex: 1,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARATIF ══ */}
      <ComparatifSection />

      {/* ══ GUARANTEES — editorial list ══ */}
      <section style={{ padding: "88px 0", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Nos engagements</p>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Ce qui nous différencie
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "#94a3b8", maxWidth: 320, lineHeight: 1.75 }}>
              Des services pensés pour votre croissance réelle, pas juste pour les chiffres.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }} className="guarantees-list">
            {[
              { num: "01", title: "Livraison progressive", desc: "Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser." },
              { num: "02", title: "Profils ciblés France", desc: "Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu." },
              { num: "03", title: "Refill automatique", desc: "Un drop ? Le refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées." },
              { num: "04", title: "Démarrage en quelques heures", desc: "Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures." },
              { num: "05", title: "Aucun mot de passe requis", desc: "Vos accès restent privés. On a seulement besoin du lien de votre profil ou de votre publication." },
              { num: "06", title: "Support humain 7j/7", desc: "Une vraie équipe qui répond en moins d'une heure. Pas un bot, pas une FAQ automatique." },
            ].map((g, i) => (
              <div key={i} style={{
                padding: "32px 0",
                borderBottom: "1px solid #f1f5f9",
                borderRight: i % 2 === 0 ? "1px solid #f1f5f9" : "none",
                paddingRight: i % 2 === 0 ? 48 : 0,
                paddingLeft: i % 2 === 1 ? 48 : 0,
                display: "flex", gap: 24, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#cbd5e1", letterSpacing: "0.05em", flexShrink: 0, marginTop: 4 }}>{g.num}</span>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.015em" }}>{g.title}</div>
                  <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding: "88px 0 72px", background: "#fff", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }} className="container">
          <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Avis clients</p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 12 }}>
            Ce que disent nos clients
          </h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fefce8", border: "1px solid #fde68a", borderRadius: 100, padding: "6px 16px" }}>
            <span style={{ color: "#f59e0b", fontSize: 14 }}>★★★★★</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#92400e" }}>4.9/5 · 6 000+ commandes livrées</span>
          </div>
        </div>

        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <div className="marquee-track">
            {[...ROW_1, ...ROW_1].map((t, i) => (
              <div key={i} className="marquee-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, marginBottom: 16, flexGrow: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-track-r">
            {[...ROW_2, ...ROW_2].map((t, i) => (
              <div key={i} className="marquee-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, marginBottom: 16, flexGrow: 1 }}>&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{ padding: "88px 0", background: "#fafbff" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em" }}>
              Questions fréquentes
            </h2>
          </div>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s, border-color 0.2s", background: openFaq === i ? "#7c3aed" : "transparent", borderColor: openFaq === i ? "#7c3aed" : "#e2e8f0" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>
                    <line x1="6" y1="1" x2="6" y2="11" stroke={openFaq === i ? "white" : "#94a3b8"} strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="1" y1="6" x2="11" y2="6" stroke={openFaq === i ? "white" : "#94a3b8"} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {openFaq === i && <p className="faq-answer">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTENU ÉDITORIAL SEO ══ */}
      <section style={{ padding: "88px 0", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
        <div className="container" style={{ maxWidth: 900 }}>

          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 16 }}>
              Pourquoi acheter des followers sur les réseaux sociaux ?
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>
              Le nombre d&apos;abonnés d&apos;un profil est la première chose qu&apos;un visiteur regarde avant de décider de s&apos;abonner ou d&apos;acheter. Un compte avec 500 followers et un compte avec 20 000 followers proposant le même contenu n&apos;obtiendront pas le même taux de conversion — c&apos;est la preuve sociale. Les algorithmes de toutes les plateformes (Instagram, TikTok, YouTube) fonctionnent pareil : ils poussent les comptes qui grossissent vite vers de nouvelles audiences. Acheter des followers ou des likes, c&apos;est enclencher ce mécanisme et donner à votre compte la visibilité initiale qu&apos;il mérite.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
              Combiné à du contenu de qualité, un boost initial peut multiplier votre portée organique par 5 à 20 dans les semaines qui suivent. Des créateurs et des marques utilisent ces services régulièrement avant des lancements, des collaborations ou des campagnes pour maximiser leur impact dès le départ.
            </p>
          </div>

          <div style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 16 }}>
              Comment fonctionne Vyrlo, le panel SMM français ?
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>
              Vyrlo est une plateforme SMM (Social Media Marketing) qui connecte votre commande à un réseau de services adaptés à chaque plateforme. Contrairement aux panels low-cost qui livrent en masse du jour au lendemain — ce qui alerterait immédiatement les algorithmes — Vyrlo livre de manière progressive sur plusieurs heures pour simuler une croissance naturelle.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
              Aucun mot de passe ne vous est demandé. Le service fonctionne uniquement à partir du lien public de votre profil ou de votre publication. Le paiement est sécurisé par Stripe (CB, Visa, Mastercard, PayPal) et la commande démarre automatiquement après validation. Le support est disponible 7j/7 en français pour tout suivi de commande.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 16 }}>
              Acheter des abonnés Instagram, TikTok ou YouTube : ce qu&apos;il faut savoir
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>
              Chaque plateforme a ses propres mécaniques. Sur <strong>Instagram</strong>, les abonnés renforcent la crédibilité du profil et améliorent le taux de distribution des Reels. Sur <strong>TikTok</strong>, les vues initiales sont le facteur le plus déterminant pour passer sur le FYP (For You Page). Sur <strong>YouTube</strong>, les abonnés et les vues permettent d&apos;atteindre les seuils de monétisation plus rapidement et d&apos;améliorer le référencement des vidéos dans les recommandations.
            </p>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
              Sur <strong>Spotify</strong>, les streams et auditeurs mensuels déclenchent les playlists algorithmiques (Discover Weekly, Release Radar) qui sont le vrai moteur de croissance pour les artistes. Sur <strong>Facebook</strong> et <strong>Threads</strong>, la présence d&apos;abonnés crédibilise les pages professionnelles auprès des prospects et partenaires. Vyrlo propose des services spécifiques à chaque plateforme, à partir de <strong>8,90 €</strong>.
            </p>
          </div>

        </div>
      </section>

      {/* ══ CTA BANNER — gradient ══ */}
      <section style={{ padding: "96px 0", background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.025em", marginBottom: 16 }}>
            Prêt à booster votre compte ?
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>
            Plus de 6 000 commandes livrées. Sans mot de passe. Livraison en 20 min.
          </p>
          <Link href="#plateformes" className="btn-cta-white">
            Choisir mon offre →
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        /* ── ANIMATIONS ── */
        @keyframes shimmer-btn {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes skeleton {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ── HERO ── */
        .shop-hero { padding-top: 136px; padding-bottom: 88px; }

        .blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; will-change: transform;
        }
        .blob-1 {
          width: 520px; height: 520px; top: -120px; left: -100px;
          background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
          animation: float-blob 12s ease-in-out infinite;
        }
        .blob-2 {
          width: 400px; height: 400px; top: 40px; right: -80px;
          background: radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%);
          animation: float-blob 16s ease-in-out infinite reverse;
        }
        .blob-3 {
          width: 300px; height: 300px; bottom: -80px; left: 40%;
          background: radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%);
          animation: float-blob 20s ease-in-out infinite;
        }

        .live-dot {
          display: inline-block; width: 8px; height: 8px;
          border-radius: 50%; background: #22c55e;
          animation: live-pulse 2s ease-in-out infinite;
        }

        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #67e8f9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── BUTTONS ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 100px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%);
          background-size: 200% auto;
          color: #fff; font-weight: 700; font-size: 15px;
          text-decoration: none; letter-spacing: -0.01em;
          box-shadow: 0 4px 24px rgba(124,58,237,0.45), 0 0 0 0 rgba(124,58,237,0);
          animation: shimmer-btn 3s linear infinite;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.55), 0 0 0 4px rgba(124,58,237,0.15);
        }

        .btn-glass {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 100px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.85); font-weight: 600; font-size: 15px;
          text-decoration: none; transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-glass:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }

        .btn-cta-white {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 36px; border-radius: 100px;
          background: #fff; color: #4f46e5;
          font-weight: 800; font-size: 16px; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-cta-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 36px rgba(0,0,0,0.2);
        }

        /* ── STATS ── */
        .shop-stats {
          display: inline-flex; gap: 0; border-radius: 20px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .stat-item {
          padding: 22px 36px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .stat-item:last-child { border-right: none; }

        .platform-logo-btn {
          opacity: 0.5; transition: opacity 0.2s, transform 0.2s;
          display: flex; align-items: center;
        }
        .platform-logo-btn:hover { opacity: 1; transform: scale(1.1); }

        /* ── PLATFORMS BENTO ── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .bento-cell {
          position: relative; overflow: hidden;
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: 20px; padding: 24px;
          display: flex; flex-direction: column; gap: 20px;
          min-height: 180px; cursor: pointer;
          transition: box-shadow 0.25s, border-color 0.25s, transform 0.25s;
        }
        .bento-cell:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.09);
          border-color: #ddd6fe;
          transform: translateY(-3px);
        }
        .bento-glow {
          position: absolute; inset: 0; pointer-events: none;
          transition: opacity 0.3s;
          opacity: 0;
        }
        .bento-cell:hover .bento-glow { opacity: 1; }
        .bento-reveal {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 13px 20px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          color: #fff;
          transform: translateY(100%);
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 0 0 18px 18px;
        }
        .bento-cell:hover .bento-reveal { transform: translateY(0); }
        @media (max-width: 768px) {
          .bento-tags { display: none !important; }
          .bento-reveal {
            position: static !important;
            transform: none !important;
            border-radius: 10px;
            margin-top: auto;
          }
        }

        /* ── STEPS ── */
        .steps-grid { max-width: 860px; margin: 0 auto; }

        /* ── MARQUEE ── */
        .marquee-track {
          display: flex; gap: 16px; width: max-content;
          animation: marquee-l 55s linear infinite; padding: 6px 8px;
        }
        .marquee-track-r {
          display: flex; gap: 16px; width: max-content;
          animation: marquee-r 55s linear infinite; padding: 6px 8px;
        }
        .marquee-track:hover, .marquee-track-r:hover { animation-play-state: paused; }
        .marquee-card {
          width: 280px; flex-shrink: 0;
          background: #fff; border: 1.5px solid #e2e8f0;
          border-radius: 18px; padding: 22px 20px;
          display: flex; flex-direction: column; cursor: default;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        /* ── FAQ ── */
        .faq-item { border-bottom: 1px solid #e2e8f0; }
        .faq-question {
          width: 100%; display: flex; justify-content: space-between;
          align-items: center; gap: 16px;
          padding: 22px 0; background: none; border: none;
          font-size: 16px; font-weight: 600; color: #0f172a;
          cursor: pointer; text-align: left; font-family: inherit;
          transition: color 0.15s;
        }
        .faq-question:hover { color: #7c3aed; }
        .faq-answer {
          padding: 0 0 20px; font-size: 14.5px;
          color: #64748b; line-height: 1.75; margin: 0;
        }

        /* ── FOOTER ── */
        /* ── GUARANTEES LIST ── */
        .guarantees-list { border-top: 1px solid #f1f5f9; }

        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .shop-hero { padding-top: 100px !important; padding-bottom: 60px !important; }
          .shop-stats { display: grid !important; grid-template-columns: 1fr 1fr; }
          .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08) !important; }
          .stat-item:last-child, .stat-item:nth-last-child(2):nth-child(odd) { border-bottom: none !important; }

          .bento-grid { grid-template-columns: 1fr 1fr !important; }
          .bento-cell[style*="span 2"] { grid-column: span 2 !important; min-height: 160px !important; }
          .bento-cell { padding: 18px !important; min-height: 150px !important; }

          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-line { display: none !important; }
          .steps-grid > div { padding: 0 !important; text-align: left !important; display: flex !important; align-items: flex-start !important; gap: 18px; }
          .steps-grid > div > div:first-child { flex-shrink: 0; margin: 0 !important; }

          .guarantees-list { grid-template-columns: 1fr !important; }
          .guarantees-list > div { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; }
          .marquee-card { width: 240px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .btn-primary, .btn-glass { padding: 13px 22px !important; font-size: 14px !important; }
        }
      `}</style>
    </div>
  );
}
