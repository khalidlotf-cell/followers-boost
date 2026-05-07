import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "../boutique/_components/Footer";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Vyrlo",
  description:
    "Politique de confidentialité Vyrlo : protection de vos données personnelles, conformité RGPD, cookies, droits d'accès, de rectification et de suppression.",
  alternates: { canonical: "https://vyrlo.fr/confidentialite" },
  openGraph: {
    title: "Politique de Confidentialité — Vyrlo",
    description:
      "Comment Vyrlo protège vos données personnelles. Conforme au RGPD : droits d'accès, rectification, suppression.",
    url: "https://vyrlo.fr/confidentialite",
    siteName: "Vyrlo",
    locale: "fr_FR",
    type: "website",
  },
};

const SECTIONS = [
  {
    title: "1. Responsable du traitement",
    body: "Le responsable du traitement des données personnelles collectées sur le site Vyrlo est Vyrlo. Pour toute question relative à vos données, vous pouvez nous contacter via la page /contact.",
  },
  {
    title: "2. Données collectées",
    body: "Vyrlo collecte uniquement les données strictement nécessaires à la fourniture de ses services : nom et prénom, adresse email, lien public de votre profil ou publication, données de paiement (traitées directement par notre prestataire Stripe, non stockées par Vyrlo), historique des commandes et adresse IP à des fins de sécurité.",
  },
  {
    title: "3. Finalités du traitement",
    body: "Vos données sont collectées et traitées pour les finalités suivantes : exécution des commandes, gestion de votre compte client, communication relative aux commandes (confirmation, livraison, support), respect des obligations légales (facturation, comptabilité), et amélioration de nos services. Vyrlo ne vend ni ne loue vos données à des tiers.",
  },
  {
    title: "4. Base légale du traitement",
    body: "Le traitement de vos données repose sur l'exécution du contrat (commande), l'intérêt légitime de Vyrlo (sécurité, prévention de la fraude), le consentement explicite (newsletters, cookies non essentiels), et les obligations légales (conservation des factures pendant 10 ans).",
  },
  {
    title: "5. Durée de conservation",
    body: "Données de compte : conservées tant que le compte est actif, puis 3 ans après la dernière activité. Données de commande : conservées 10 ans pour des raisons fiscales et comptables. Cookies : durée maximale de 13 mois conformément aux recommandations CNIL.",
  },
  {
    title: "6. Destinataires des données",
    body: "Vos données peuvent être partagées avec : Stripe (prestataire de paiement, certifié PCI DSS niveau 1), Vercel (hébergeur du site), notre fournisseur de services email transactionnels, et nos partenaires fournisseurs de services réseaux sociaux (uniquement le lien public nécessaire à l'exécution de la commande). Aucune donnée n'est transférée hors UE sans garanties appropriées.",
  },
  {
    title: "7. Vos droits (RGPD)",
    body: "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants : droit d'accès à vos données, droit de rectification, droit à l'effacement, droit à la limitation du traitement, droit à la portabilité, droit d'opposition, et droit de retirer votre consentement à tout moment. Pour exercer ces droits, contactez-nous via /contact.",
  },
  {
    title: "8. Sécurité des données",
    body: "Vyrlo met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. Toutes les communications avec le site sont chiffrées en HTTPS (TLS 1.3). Les mots de passe sont stockés sous forme de hash bcrypt.",
  },
  {
    title: "9. Cookies",
    body: "Vyrlo utilise plusieurs types de cookies : cookies strictement nécessaires (panier, session, préférences) qui ne nécessitent pas de consentement, et cookies de mesure d'audience (Google Analytics) qui nécessitent votre consentement. Vous pouvez à tout moment refuser les cookies non essentiels via les paramètres de votre navigateur.",
  },
  {
    title: "10. Réclamation auprès de la CNIL",
    body: "Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), 3 Place de Fontenoy, 75007 Paris, ou via leur site cnil.fr.",
  },
  {
    title: "11. Modification de la politique",
    body: "Vyrlo peut modifier la présente politique à tout moment, notamment pour se conformer à toute évolution législative ou réglementaire. Les modifications entrent en vigueur dès leur publication sur le site. La date de dernière mise à jour est indiquée en haut de cette page.",
  },
];

export default function ConfidentialitePage() {
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
          Politique de Confidentialité
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
