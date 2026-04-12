import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../boutique/_components/Footer";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur l'achat de followers et likes",
  description:
    "Toutes les réponses à vos questions sur l'achat de followers, likes et vues sur Vyrlo. Sécurité, délais de livraison, remboursement, plateformes supportées.",
  alternates: { canonical: "https://vyrlo.fr/faq" },
  openGraph: {
    title: "FAQ Vyrlo — Questions fréquentes",
    description:
      "Toutes les réponses à vos questions sur l'achat de followers, likes et vues. Sécurité, délais, remboursement.",
    url: "https://vyrlo.fr/faq",
    siteName: "Vyrlo",
    locale: "fr_FR",
    type: "website",
  },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "Est-ce que acheter des followers sur Vyrlo est sécurisé ?",
    a: "Oui, totalement. Vyrlo ne demande jamais votre mot de passe. Seul le lien public de votre profil ou publication est nécessaire. Les abonnés sont livrés progressivement pour ne pas alerter les algorithmes. Aucun risque de bannissement.",
  },
  {
    q: "Combien de temps prend la livraison des followers, likes ou vues ?",
    a: "La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée — généralement entre quelques heures et 72 heures pour les grandes quantités.",
  },
  {
    q: "Les followers achetés sur Vyrlo sont-ils de vrais comptes ?",
    a: "Les services Vyrlo varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des profils de haute qualité. Chaque service est clairement décrit avant l'achat.",
  },
  {
    q: "Quel est le prix minimum pour acheter des followers sur Vyrlo ?",
    a: "Les services Vyrlo débutent à partir de 8,90 €. Des offres sont disponibles pour Instagram, TikTok, YouTube, Facebook, Spotify, X (Twitter) et Threads.",
  },
  {
    q: "Que se passe-t-il si ma commande n'est pas livrée ?",
    a: "Le support Vyrlo est disponible 7j/7. Un remboursement complet ou un remplacement est garanti si la commande n'est pas livrée dans les délais indiqués.",
  },
  {
    q: "Vyrlo fonctionne-t-il pour Instagram, TikTok, YouTube et Spotify ?",
    a: "Oui. Vyrlo propose des services pour Instagram, TikTok, YouTube, Facebook, Spotify, X (Twitter) et Threads. Chaque plateforme dispose de son propre catalogue de services.",
  },
  {
    q: "Mon compte peut-il être banni après l'achat ?",
    a: "Non, nos méthodes de livraison progressive et naturelle minimisent tout risque. Nous respectons les limites de chaque plateforme et ne délivrons jamais trop vite.",
  },
  {
    q: "Puis-je passer une commande sans créer de compte ?",
    a: "Oui. Il est possible de passer une commande invité sans inscription. Cependant, créer un compte vous permet de suivre vos commandes et de bénéficier de notre service après-vente.",
  },
  {
    q: "Quels modes de paiement sont acceptés ?",
    a: "Vyrlo accepte les paiements par carte bancaire (Visa, Mastercard, CB) via Stripe, un service de paiement sécurisé. Toutes les transactions sont chiffrées SSL.",
  },
  {
    q: "Est-ce que les followers achetés peuvent disparaître ?",
    a: "Une légère baisse est normale sur certaines offres. Nos services avec garantie refill compensent automatiquement les éventuelles pertes pendant la durée de garantie.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: "#111", textDecoration: "none" }}>
              Vyrlo
            </Link>
            <Link href="/" style={{ fontSize: 14, color: "#888", textDecoration: "none" }}>← Accueil</Link>
          </div>
        </header>

        <main style={{ flex: 1, maxWidth: 780, margin: "0 auto", padding: "72px 24px", width: "100%" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>
            Aide
          </p>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 12 }}>
            Questions fréquentes
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 56, lineHeight: 1.7 }}>
            Tout ce que vous devez savoir sur l&apos;achat de followers, likes et vues sur Vyrlo.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQS.map(({ q, a }, i) => (
              <FAQItem key={i} question={q} answer={a} />
            ))}
          </div>

          <div style={{ marginTop: 64, padding: "32px", background: "#f8fafc", borderRadius: 16, textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#0a0a0a", marginBottom: 8 }}>
              Vous n&apos;avez pas trouvé votre réponse ?
            </p>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 20 }}>
              Notre équipe répond en moins d&apos;une heure, 7j/7.
            </p>
            <Link
              href="/contact"
              style={{ display: "inline-block", padding: "12px 28px", borderRadius: 100, background: "#7c3aed", color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
            >
              Contacter le support →
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details style={{ borderBottom: "1px solid #f1f5f9", padding: "24px 0" }}>
      <summary style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        {question}
        <span style={{ fontSize: 20, color: "#7c3aed", flexShrink: 0 }}>+</span>
      </summary>
      <p style={{ marginTop: 16, fontSize: 15, color: "#475569", lineHeight: 1.75 }}>
        {answer}
      </p>
    </details>
  );
}
