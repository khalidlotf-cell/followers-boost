import type { Metadata } from "next";
import PlatformPageClient from "./PlatformPageClient";

const BASE = "https://vyrlo.fr";

const PLATFORM_META: Record<
  string,
  { label: string; services: string; description: string }
> = {
  instagram: {
    label: "Instagram",
    services: "followers, likes, vues, commentaires",
    description:
      "Achetez des followers Instagram, des likes et des vues avec Vyrlo. Livraison progressive en quelques heures, sans mot de passe. Ciblage France disponible. À partir de 8,90 €.",
  },
  tiktok: {
    label: "TikTok",
    services: "followers, likes, vues",
    description:
      "Boostez votre compte TikTok avec des followers, likes et vues de qualité. Démarrage rapide, livraison naturelle pour ne pas alerter l'algorithme. À partir de 8,90 €.",
  },
  youtube: {
    label: "YouTube",
    services: "abonnés, vues, likes",
    description:
      "Achetez des abonnés YouTube, des vues et des likes pour accélérer votre croissance et atteindre le seuil de monétisation plus vite. Livraison stable et durable.",
  },
  facebook: {
    label: "Facebook",
    services: "abonnés, likes, vues",
    description:
      "Développez votre page Facebook avec des abonnés et des likes ciblés. Service rapide, sécurisé et sans accès à votre compte.",
  },
  twitter: {
    label: "X / Twitter",
    services: "followers, likes",
    description:
      "Augmentez votre audience sur X (Twitter) avec des followers et des likes de qualité. Livraison rapide, profils actifs, sans mot de passe.",
  },
  spotify: {
    label: "Spotify",
    services: "streams, auditeurs mensuels",
    description:
      "Boostez vos streams Spotify et vos auditeurs mensuels pour déclencher les playlists algorithmiques. Service discret et efficace pour les artistes.",
  },
  threads: {
    label: "Threads",
    services: "followers, likes",
    description:
      "Achetez des followers et des likes Threads pour bâtir une présence crédible sur le réseau social de Meta. Livraison rapide et sécurisée.",
  },
};

type Props = { params: Promise<{ platform: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const meta = PLATFORM_META[platform];

  if (!meta) {
    return {
      title: "Services SMM",
      description: "Achetez des services SMM premium sur Vyrlo.",
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
    </>
  );
}
