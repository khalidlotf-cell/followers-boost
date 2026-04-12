import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE = "https://vyrlo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Vyrlo — Acheter des followers, likes et vues | Services SMM",
    template: "%s | Vyrlo",
  },
  description:
    "Vyrlo est le service SMM premium pour booster votre présence sur Instagram, TikTok, YouTube, Facebook et Spotify. Achetez des followers, likes et vues — livraison en 20 min, sans mot de passe.",
  keywords: [
    "acheter followers instagram",
    "acheter abonnés tiktok",
    "acheter vues youtube",
    "acheter streams spotify",
    "acheter abonnés youtube",
    "acheter likes instagram",
    "acheter followers threads",
    "acheter followers twitter",
    "acheter abonnés facebook",
    "services SMM france",
    "boost réseaux sociaux",
    "panel SMM",
    "panel SMM français",
    "acheter engagement instagram",
    "augmenter abonnés instagram",
    "booster tiktok",
    "vyrlo",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Vyrlo — Services SMM Premium | Followers, Likes, Vues",
    description:
      "Boostez votre présence sur les réseaux sociaux avec Vyrlo. Followers, likes, vues pour Instagram, TikTok, YouTube — livraison en 20 min, à partir de 8,90 €.",
    url: BASE,
    siteName: "Vyrlo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vyrlo — Services SMM Premium",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyrlo — Services SMM Premium",
    description:
      "Followers, likes, vues pour Instagram, TikTok, YouTube — livraison en 20 min.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/** JSON-LD — entité de marque principale (GEO + SEO) */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vyrlo",
  url: BASE,
  logo: `${BASE}/logo-dark.png`,
  description:
    "Vyrlo est une plateforme française de services SMM (Social Media Marketing) permettant d'acheter des followers, likes et vues pour Instagram, TikTok, YouTube, Facebook, Spotify et Threads. Livraison automatique, sans mot de passe, à partir de 8,90 €.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "French",
    url: `${BASE}/contact`,
  },
  sameAs: [
    "https://www.instagram.com/vyrlo",
    "https://www.tiktok.com/@vyrlo",
    "https://x.com/vyrlo",
  ],
};

/** WholesaleStore — renforce l'entité commerciale (inspiré agence-boostfr.co) */
const wholesaleSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Vyrlo — Panel SMM",
  url: BASE,
  description:
    "Vyrlo est le panel SMM français pour acheter des followers, likes et vues sur Instagram, TikTok, YouTube, Facebook, Spotify, X et Threads. Livraison automatique, à partir de 8,90 €, support 7j/7.",
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "€€",
  areaServed: "FR",
  currenciesAccepted: "EUR",
  paymentAccepted: "Credit Card, PayPal",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vyrlo",
  url: BASE,
  description:
    "Service SMM premium — achetez des followers, likes et vues pour les réseaux sociaux.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(wholesaleSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
