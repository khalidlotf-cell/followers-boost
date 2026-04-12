import ShopWrapper from "./boutique/_components/ShopWrapper";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Est-ce que acheter des followers sur Vyrlo est sécurisé ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, totalement. Vyrlo ne demande jamais votre mot de passe. Seul le lien public de votre profil ou publication est nécessaire. Les abonnés sont livrés progressivement pour ne pas alerter les algorithmes.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps prend la livraison des followers, likes ou vues ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée, généralement entre quelques heures et 72 heures.",
      },
    },
    {
      "@type": "Question",
      name: "Les followers achetés sur Vyrlo sont-ils des vrais comptes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les services Vyrlo varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des profils de haute qualité. Chaque service est clairement décrit avant l'achat.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le prix minimum pour acheter des followers sur Vyrlo ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les services Vyrlo débutent à partir de 8,90 €. Des offres sont disponibles pour Instagram, TikTok, YouTube, Facebook, Spotify, X (Twitter) et Threads.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il si ma commande n'est pas livrée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le support Vyrlo est disponible 7j/7. Un remboursement complet ou un remplacement est garanti si la commande n'est pas livrée.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Services Vyrlo — Followers, Likes, Vues",
  provider: {
    "@type": "Organization",
    name: "Vyrlo",
    url: "https://vyrlo.fr",
  },
  description:
    "Vyrlo vous permet de développer votre audience sur les réseaux sociaux : Instagram, TikTok, YouTube, Facebook, Spotify, X (Twitter) et Threads. Followers, likes, vues — livraison en 20 minutes, sans mot de passe, support 7j/7.",
  areaServed: "FR",
  availableLanguage: "French",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "8.90",
    priceCurrency: "EUR",
    offerCount: "100",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "6000",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ShopWrapper />
    </>
  );
}
