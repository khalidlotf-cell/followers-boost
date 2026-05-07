import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../boutique/_components/Footer";

export const metadata: Metadata = {
  title: "Mentions Légales — Vyrlo",
  description:
    "Mentions légales du site Vyrlo : informations sur l'éditeur, l'hébergeur, propriété intellectuelle et responsabilités. Conformément à la loi LCEN.",
  alternates: { canonical: "https://vyrlo.fr/mentions-legales" },
  openGraph: {
    title: "Mentions Légales — Vyrlo",
    description: "Informations légales du site Vyrlo : éditeur, hébergeur, responsabilités.",
    url: "https://vyrlo.fr/mentions-legales",
    siteName: "Vyrlo",
    locale: "fr_FR",
    type: "website",
  },
};

const SECTIONS = [
  {
    title: "1. Éditeur du site",
    body: "Le site Vyrlo (accessible à l'adresse https://vyrlo.fr) est édité par Vyrlo. Pour toute demande d'information, contactez-nous via la page /contact de notre site ou par email à l'adresse indiquée sur cette même page.",
  },
  {
    title: "2. Directeur de la publication",
    body: "Le directeur de la publication est le représentant légal de Vyrlo. Toute demande relative à la publication peut être adressée via le formulaire de contact disponible à l'adresse /contact.",
  },
  {
    title: "3. Hébergement",
    body: "Le site Vyrlo est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis. Site web : https://vercel.com. Les données utilisateurs sont stockées en Europe.",
  },
  {
    title: "4. Propriété intellectuelle",
    body: "L'ensemble des contenus présents sur le site Vyrlo (textes, images, logos, vidéos, code, structure) sont la propriété exclusive de Vyrlo, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.",
  },
  {
    title: "5. Marques",
    body: "La marque Vyrlo, ainsi que tous les logos associés, sont la propriété de Vyrlo. Les marques tierces citées (Instagram, TikTok, YouTube, Facebook, Spotify, X, Threads, Telegram) appartiennent à leurs propriétaires respectifs et sont utilisées à titre informatif uniquement. Vyrlo n'est pas affilié à ces plateformes.",
  },
  {
    title: "6. Liens hypertextes",
    body: "Le site Vyrlo peut contenir des liens vers des sites tiers. Vyrlo n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur fonctionnement ou leur politique de confidentialité.",
  },
  {
    title: "7. Responsabilité",
    body: "Vyrlo s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site, mais ne peut garantir l'absence d'erreurs ou d'omissions. L'utilisateur reconnaît utiliser les informations sous sa seule responsabilité. Vyrlo ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.",
  },
  {
    title: "8. Données personnelles",
    body: "Les conditions de collecte et de traitement de vos données personnelles sont détaillées dans notre Politique de Confidentialité, accessible à l'adresse /confidentialite.",
  },
  {
    title: "9. Cookies",
    body: "Le site Vyrlo utilise des cookies techniques nécessaires à son fonctionnement et, sous réserve de votre consentement, des cookies de mesure d'audience. Vous pouvez gérer vos préférences à tout moment depuis votre navigateur.",
  },
  {
    title: "10. Droit applicable et juridiction",
    body: "Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Image src="/logo-dark.png" alt="Vyrlo" width={100} height={40} style={{ objectFit: "contain" }} />
          </Link>
          <Link href="/" style={{ fontSize: 14, color: "#888", textDecoration: "none" }}>← Retour</Link>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 780, margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Légal</p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 8 }}>
          Mentions Légales
        </h1>
        <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 56 }}>Dernière mise à jour : mai 2026</p>

        {SECTIONS.map((section, i) => (
          <section key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>{section.body}</p>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
