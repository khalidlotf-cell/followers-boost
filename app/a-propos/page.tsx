import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../boutique/_components/Footer";

export const metadata: Metadata = {
  title: "À propos de Vyrlo — Services SMM Français depuis 2024",
  description:
    "Vyrlo est une plateforme française de services SMM. Découvrez notre mission : aider les créateurs, artistes et entreprises à développer leur présence sur les réseaux sociaux en toute sécurité.",
  alternates: { canonical: "https://vyrlo.fr/a-propos" },
  openGraph: {
    title: "À propos de Vyrlo — Services SMM Français",
    description:
      "Vyrlo aide les créateurs et entreprises à booster leur présence sur Instagram, TikTok, YouTube, Spotify et plus. Plateforme française, support 7j/7.",
    url: "https://vyrlo.fr/a-propos",
    siteName: "Vyrlo",
    locale: "fr_FR",
    type: "website",
  },
};

const STATS = [
  { value: "6 000+", label: "Clients satisfaits" },
  { value: "7j/7", label: "Support disponible" },
  { value: "20 min", label: "Délai de démarrage" },
  { value: "4.9/5", label: "Note moyenne" },
];

const VALUES = [
  {
    title: "Sécurité avant tout",
    desc: "Nous ne demandons jamais votre mot de passe. Seul un lien public suffit. Vos comptes sont protégés en permanence.",
  },
  {
    title: "Transparence totale",
    desc: "Chaque service est décrit avec précision : type de profils, délai estimé, garantie. Aucune mauvaise surprise.",
  },
  {
    title: "Résultats durables",
    desc: "Nos livraisons sont progressives et naturelles pour ne pas alerter les algorithmes et garantir des résultats qui durent.",
  },
  {
    title: "Support humain 7j/7",
    desc: "Une équipe disponible tous les jours pour répondre à vos questions et résoudre tout problème rapidement.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: "#111", textDecoration: "none" }}>
            Vyrlo
          </Link>
          <Link href="/" style={{ fontSize: 14, color: "#888", textDecoration: "none" }}>← Accueil</Link>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
            À propos
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
            Vyrlo, le panel SMM<br />made in France
          </h1>
          <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.8, maxWidth: 620, margin: "0 auto" }}>
            Vyrlo est une plateforme française dédiée aux créateurs de contenu, artistes et entreprises qui veulent développer leur présence sur les réseaux sociaux rapidement, en toute sécurité et sans risque.
          </p>
        </section>

        {/* Stats */}
        <section style={{ background: "#f8fafc", padding: "48px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#7c3aed", marginBottom: 6 }}>{value}</div>
                <div style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#0a0a0a", marginBottom: 20 }}>
            Notre mission
          </h2>
          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.85, marginBottom: 20 }}>
            Les réseaux sociaux sont devenus incontournables pour les créateurs, les artistes et les marques. Mais développer une audience prend du temps — souvent des années. Vyrlo permet d&apos;accélérer cette croissance en apportant la crédibilité sociale nécessaire pour déclencher les algorithmes.
          </p>
          <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.85 }}>
            Notre plateforme propose des services pour Instagram, TikTok, YouTube, Facebook, Spotify, X (Twitter) et Threads. Chaque commande est traitée avec soin, livrée progressivement, et garantie par notre support disponible 7 jours sur 7.
          </p>
        </section>

        {/* Values */}
        <section style={{ background: "#f8fafc", padding: "64px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#0a0a0a", marginBottom: 40, textAlign: "center" }}>
              Nos valeurs
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="values-grid">
              {VALUES.map(({ title, desc }) => (
                <div key={title} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 780, margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, color: "#0a0a0a", marginBottom: 16 }}>
            Prêt à booster votre présence ?
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 32 }}>
            Des milliers de créateurs, artistes et marques font déjà confiance à Vyrlo.
          </p>
          <Link
            href="/"
            style={{ display: "inline-block", padding: "14px 32px", borderRadius: 100, background: "#7c3aed", color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none" }}
          >
            Voir nos services →
          </Link>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
