import type { Metadata } from "next";
import PlatformPageClient from "./PlatformPageClient";

const BASE = "https://vyrlo.fr";

const PLATFORM_META: Record<
  string,
  {
    label: string;
    services: string;
    description: string;
    h1: string;
    intro: string;
    benefits: string[];
    faq: { q: string; a: string }[];
  }
> = {
  instagram: {
    label: "Instagram",
    services: "followers, likes, vues, commentaires",
    description:
      "Achetez des followers Instagram, des likes et des vues avec Vyrlo. Livraison progressive en quelques heures, sans mot de passe. Ciblage France disponible. À partir de 8,90 €. 100% sécurisé, aucun risque de bannissement.",
    h1: "Acheter des followers Instagram — Livraison en 20 min",
    intro:
      "Vous cherchez à acheter des abonnés Instagram rapidement et en toute sécurité ? Vyrlo vous propose des followers Instagram de qualité, livrés progressivement pour ne pas alerter l'algorithme. Aucun mot de passe requis, livraison démarrant en moins de 20 minutes. Boostez votre crédibilité sur Instagram dès aujourd'hui à partir de 8,90 €.",
    benefits: [
      "Livraison progressive et naturelle — aucun risque de bannissement",
      "Zéro mot de passe requis — seulement votre lien public",
      "Ciblage France disponible pour des abonnés Instagram français",
      "Support 7j/7 et remboursement garanti si non livré",
    ],
    faq: [
      {
        q: "Est-il légal d'acheter des followers Instagram en France ?",
        a: "Oui, acheter des followers Instagram est légal en France. Cela reste une pratique courante pour booster la visibilité d'un compte. Vyrlo livre des abonnés de manière progressive et discrète.",
      },
      {
        q: "Mon compte Instagram risque-t-il d'être banni ?",
        a: "Non. Vyrlo utilise une livraison progressive qui imite une croissance naturelle. Nous ne demandons jamais votre mot de passe. Le risque de bannissement est inexistant avec notre méthode.",
      },
      {
        q: "Combien de temps pour recevoir mes followers Instagram ?",
        a: "La livraison démarre en moins de 20 minutes après votre commande. Selon la quantité, la livraison complète prend entre quelques heures et 72 heures.",
      },
      {
        q: "Puis-je acheter des followers Instagram français ?",
        a: "Oui, Vyrlo propose un ciblage Français pour vous fournir des abonnés Instagram Français. Sélectionnez l'option ciblage Français lors de votre commande.",
      },
    ],
  },
  tiktok: {
    label: "TikTok",
    services: "followers, likes, vues",
    description:
      "Boostez votre compte TikTok avec des followers, likes et vues de qualité. Démarrage rapide, livraison naturelle pour ne pas alerter l'algorithme TikTok. Résultats garantis à partir de 8,90 €.",
    h1: "Acheter des abonnés TikTok — Boost garanti dès 8,90 €",
    intro:
      "Vous souhaitez acheter des abonnés TikTok pour déclencher l'algorithme et gagner en visibilité ? Vyrlo propose des followers TikTok livrés naturellement pour ne pas alerter TikTok. Une commande de likes ou de vues TikTok peut suffire à propulser votre vidéo sur la page Pour Toi. Résultats garantis, à partir de 8,90 €.",
    benefits: [
      "Livraison progressive adaptée à l'algorithme TikTok",
      "Followers, likes et vues disponibles en quelques clics",
      "Aucun accès à votre compte — juste votre nom d'utilisateur",
      "Idéal pour booster une vidéo vers la page Pour Toi (FYP)",
    ],
    faq: [
      {
        q: "Acheter des abonnés TikTok est-il sans risque ?",
        a: "Oui. Vyrlo livre les abonnés TikTok progressivement, ce qui respecte les conditions d'utilisation de TikTok. Aucun mot de passe n'est demandé.",
      },
      {
        q: "Est-ce que les vues TikTok achetées comptent pour l'algorithme ?",
        a: "Oui. Des vues supplémentaires augmentent le taux d'engagement de votre vidéo, ce qui favorise sa distribution par l'algorithme TikTok sur la page Pour Toi.",
      },
      {
        q: "Quel est le délai de livraison pour des abonnés TikTok ?",
        a: "La livraison démarre en moins de 20 minutes. Pour des quantités importantes (10 000+), le délai peut aller jusqu'à 72 heures pour une livraison naturelle.",
      },
      {
        q: "Peut-on acheter des likes TikTok séparément des abonnés ?",
        a: "Oui, vous pouvez acheter des likes TikTok, des vues, des partages ou des enregistrements indépendamment, selon vos besoins.",
      },
    ],
  },
  youtube: {
    label: "YouTube",
    services: "abonnés, vues, likes",
    description:
      "Achetez des abonnés YouTube, des vues et des likes pour accélérer votre croissance et atteindre le seuil de monétisation (1 000 abonnés) plus vite. Livraison stable, durable et sans mot de passe.",
    h1: "Acheter des abonnés YouTube — Atteignez 1 000 abonnés vite",
    intro:
      "Acheter des abonnés YouTube est la solution la plus rapide pour atteindre le seuil de monétisation YouTube (1 000 abonnés et 4 000 heures de visionnage). Vyrlo propose des abonnés YouTube stables et durables, ainsi que des vues et likes pour booster vos vidéos dans les recommandations. Livraison progressive, sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Atteignez le seuil de monétisation YouTube (1 000 abonnés) plus vite",
      "Abonnés stables et durables — pas de chute après livraison",
      "Vues YouTube pour améliorer votre classement dans les recommandations",
      "Aucun accès à votre compte requis",
    ],
    faq: [
      {
        q: "Les abonnés YouTube achetés restent-ils après la livraison ?",
        a: "Oui. Les abonnés Vyrlo sont stables et durables. Une légère variation est normale (comme pour toute croissance organique), mais ils ne disparaissent pas massivement.",
      },
      {
        q: "Acheter des vues YouTube aide-t-il à monétiser ?",
        a: "Oui. Les vues YouTube comptent pour atteindre le seuil de 4 000 heures de visionnage requis pour la monétisation YouTube via le Programme Partenaires.",
      },
      {
        q: "Peut-on acheter des abonnés YouTube sans mot de passe ?",
        a: "Absolument. Vyrlo ne demande jamais votre mot de passe YouTube ou Google. Seule l'URL de votre chaîne est nécessaire.",
      },
      {
        q: "Combien d'abonnés YouTube peut-on acheter en une commande ?",
        a: "Vyrlo propose des offres allant de 100 à 50 000 abonnés YouTube en une seule commande. Pour des besoins plus importants, contactez notre support.",
      },
    ],
  },
  facebook: {
    label: "Facebook",
    services: "abonnés, likes, vues",
    description:
      "Développez votre page Facebook avec des abonnés et des likes ciblés. Service rapide, sécurisé et sans accès à votre compte. Idéal pour booster la crédibilité de votre page.",
    h1: "Acheter des abonnés Facebook — Crédibilité instantanée",
    intro:
      "Une page Facebook avec peu d'abonnés inspire peu confiance. Acheter des abonnés Facebook avec Vyrlo vous permet de démarrer avec une base crédible et d'attirer naturellement plus d'interactions. Nous proposons également des likes Facebook pour vos publications. Livraison rapide, sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Augmentez rapidement la crédibilité de votre page Facebook",
      "Likes Facebook disponibles pour vos publications et votre page",
      "Aucun accès à votre compte Facebook requis",
      "Idéal pour les entreprises, associations et créateurs de contenu",
    ],
    faq: [
      {
        q: "Peut-on acheter des likes pour une page Facebook ?",
        a: "Oui. Vyrlo propose des likes pour votre page Facebook ainsi que pour vos publications individuelles. Les deux sont disponibles séparément.",
      },
      {
        q: "Les abonnés Facebook achetés verront-ils mes publications ?",
        a: "Ils s'abonnent à votre page, mais la portée organique de vos publications dépend de l'algorithme Facebook. Les abonnés augmentent surtout votre crédibilité et votre preuve sociale.",
      },
      {
        q: "Combien de temps pour recevoir des abonnés Facebook ?",
        a: "La livraison démarre en moins de 20 minutes. Elle est progressive pour respecter les limites de Facebook et éviter tout problème.",
      },
      {
        q: "Acheter des abonnés Facebook est-il risqué pour ma page ?",
        a: "Non, si la livraison est progressive (c'est notre méthode par défaut). Vyrlo ne demande jamais vos identifiants, votre page reste entièrement sécurisée.",
      },
    ],
  },
  twitter: {
    label: "X / Twitter",
    services: "followers, likes, retweets",
    description:
      "Augmentez votre audience sur X (Twitter) avec des followers et des likes de qualité. Livraison rapide, profils actifs, sans mot de passe. Boostez votre influence sur Twitter.",
    h1: "Acheter des followers Twitter X — Influencez plus vite",
    intro:
      "Sur X (Twitter), la taille de votre audience détermine votre influence. Acheter des followers Twitter avec Vyrlo est le moyen le plus rapide d'asseoir votre crédibilité sur le réseau. Nous proposons également des likes et des retweets pour amplifier la portée de vos tweets. Livraison en moins de 20 minutes, aucun mot de passe.",
    benefits: [
      "Followers Twitter actifs — livraison progressive et naturelle",
      "Likes et retweets disponibles pour augmenter la portée de vos tweets",
      "Sans mot de passe — juste votre nom d'utilisateur X",
      "Boostez votre crédibilité et votre taux d'engagement sur X",
    ],
    faq: [
      {
        q: "Acheter des followers X (Twitter) est-il sûr en 2026 ?",
        a: "Oui, à condition d'utiliser un service qui livre progressivement comme Vyrlo. Une livraison brutale peut être détectée par X. Notre méthode progressive ne présente aucun risque.",
      },
      {
        q: "Les retweets achetés améliorent-ils la visibilité sur X ?",
        a: "Oui. Plus un tweet est retweeté, plus X l'affiche à de nouveaux utilisateurs. Acheter des retweets booste directement la portée organique de vos publications.",
      },
      {
        q: "Peut-on acheter des followers pour un compte X privé ?",
        a: "Non. Votre compte doit être public pour que les followers puissent vous rejoindre. Pensez à rendre votre compte public le temps de la livraison.",
      },
      {
        q: "Combien coûte l'achat de followers Twitter sur Vyrlo ?",
        a: "Les offres démarrent à partir de 8,90 € pour les premiers followers Twitter. Vyrlo propose plusieurs paliers selon vos besoins et votre budget.",
      },
    ],
  },
  spotify: {
    label: "Spotify",
    services: "streams, auditeurs mensuels, placement playlist",
    description:
      "Boostez vos streams Spotify et vos auditeurs mensuels pour déclencher les playlists algorithmiques de Spotify. Service discret et efficace pour les artistes indépendants.",
    h1: "Acheter des streams Spotify — Déclenchez les playlists Spotify",
    intro:
      "L'algorithme Spotify récompense les titres avec un fort taux d'écoute. Acheter des streams Spotify avec Vyrlo vous aide à atteindre le seuil nécessaire pour être intégré dans les playlists algorithmiques comme Découvertes de la semaine ou Radio d'artiste. Boostez vos auditeurs mensuels Spotify sans risque, à partir de 8,90 €.",
    benefits: [
      "Augmentez vos auditeurs mensuels Spotify rapidement",
      "Déclenchez les playlists algorithmiques Spotify (Découvertes, Radio)",
      "Service discret conçu pour les artistes indépendants",
      "Aucun accès à votre compte Spotify requis",
    ],
    faq: [
      {
        q: "Acheter des streams Spotify est-il détectable ?",
        a: "Non, si les streams sont livrés progressivement comme chez Vyrlo. Nous imitons un comportement d'écoute naturel pour ne pas déclencher les filtres Spotify.",
      },
      {
        q: "Les streams Spotify achetés comptent-ils pour les royalties ?",
        a: "Non. Les streams artificiels ne génèrent pas de royalties Spotify. Leur but est exclusivement d'améliorer vos statistiques et de déclencher l'algorithme.",
      },
      {
        q: "Combien de streams faut-il pour intégrer une playlist Spotify ?",
        a: "Il n'y a pas de seuil officiel, mais en général les titres avec plus de 1 000 auditeurs mensuels actifs commencent à être recommandés. Vyrlo peut vous aider à atteindre ce cap.",
      },
      {
        q: "Peut-on acheter des auditeurs mensuels Spotify séparément ?",
        a: "Oui. Vyrlo propose des streams (par titre) et des auditeurs mensuels séparément. Les auditeurs mensuels ont un impact direct sur votre classement d'artiste Spotify.",
      },
    ],
  },
  threads: {
    label: "Threads",
    services: "followers, likes",
    description:
      "Achetez des followers et des likes Threads pour bâtir une présence crédible sur le réseau social de Meta. Livraison rapide et sécurisée. Idéal pour débuter sur Threads.",
    h1: "Acheter des followers Threads — Présence Meta solide",
    intro:
      "Threads, le réseau social de Meta, est en pleine croissance. Acheter des followers Threads maintenant vous permet de bâtir une présence crédible avant que la concurrence ne s'installe. Vyrlo propose des abonnés et des likes Threads livrés rapidement et sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Bâtissez une présence Threads crédible dès maintenant",
      "Followers et likes Threads livrés rapidement",
      "Aucun mot de passe requis — votre compte reste sécurisé",
      "Profitez de la croissance rapide de Threads avant vos concurrents",
    ],
    faq: [
      {
        q: "Threads est-il lié à Instagram pour l'achat de followers ?",
        a: "Non. Threads et Instagram ont des audiences séparées. Acheter des followers Threads n'affecte pas votre compte Instagram, et vice versa.",
      },
      {
        q: "Pourquoi acheter des followers Threads maintenant ?",
        a: "Threads est encore en phase de croissance. S'y positionner maintenant avec une audience solide vous donne un avantage compétitif fort avant la saturation du réseau.",
      },
      {
        q: "Les followers Threads achetés sont-ils des vrais comptes ?",
        a: "Vyrlo propose des profils de haute qualité pour Threads. La qualité des comptes est précisée dans chaque offre avant votre achat.",
      },
      {
        q: "Combien de temps prend la livraison de followers Threads ?",
        a: "La livraison démarre en moins de 20 minutes. Elle est progressive pour respecter les limites de Meta et garantir la sécurité de votre compte Threads.",
      },
    ],
  },
};

export function generateStaticParams() {
  return [
    { platform: "instagram" },
    { platform: "tiktok" },
    { platform: "youtube" },
    { platform: "facebook" },
    { platform: "twitter" },
    { platform: "spotify" },
    { platform: "threads" },
  ];
}

type Props = { params: Promise<{ platform: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const meta = PLATFORM_META[platform];

  if (!meta) {
    return {
      title: "Services Vyrlo",
      description: "Achetez des followers, likes et vues sur Vyrlo.",
    };
  }

  const title = `Acheter des ${meta.services} ${meta.label} — Vyrlo`;
  const canonical = `${BASE}/boutique/${platform}`;

  return {
    title,
    description: meta.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: meta.description,
      url: canonical,
      siteName: "Vyrlo",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function PlatformPage({ params }: Props) {
  const { platform } = await params;
  const meta = PLATFORM_META[platform];
  const canonical = `${BASE}/boutique/${platform}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      { "@type": "ListItem", position: 2, name: "Boutique", item: `${BASE}/boutique` },
      {
        "@type": "ListItem",
        position: 3,
        name: meta ? `${meta.label}` : platform,
        item: canonical,
      },
    ],
  };

  const productSchema = meta
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `Services ${meta.label} — Vyrlo`,
        description: meta.description,
        brand: { "@type": "Brand", name: "Vyrlo" },
        url: canonical,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "8.90",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <PlatformPageClient params={params} />
      {meta && (
        <div style={{ background: "#0a0a0a", color: "#e5e5e5", fontFamily: "var(--font-outfit, sans-serif)" }}>
          {/* Intro SEO */}
          <section style={{ maxWidth: 860, margin: "0 auto", padding: "64px 24px 40px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#fff", marginBottom: 20, lineHeight: 1.25 }}>
              {meta.h1}
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "#b0b0b0", maxWidth: 720 }}>
              {meta.intro}
            </p>
          </section>

          {/* Pourquoi Vyrlo */}
          <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 48px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 20 }}>
              Pourquoi acheter des {meta.services} {meta.label} sur Vyrlo ?
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
              {meta.benefits.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.97rem", color: "#c0c0c0", lineHeight: 1.6 }}>
                  <span style={{ color: "#7c6af7", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 28 }}>
              Questions fréquentes — {meta.label}
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
              {meta.faq.map((item, i) => (
                <div key={i} style={{ borderLeft: "3px solid #7c6af7", paddingLeft: 20 }}>
                  <p style={{ fontWeight: 600, color: "#fff", fontSize: "1rem", marginBottom: 8 }}>{item.q}</p>
                  <p style={{ color: "#a0a0a0", fontSize: "0.95rem", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
