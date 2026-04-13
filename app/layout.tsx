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
    default: "Vyrlo — Acheter des followers, likes et vues",
    template: "%s | Vyrlo",
  },
  description:
    "Vyrlo vous aide à développer votre audience sur Instagram, TikTok, YouTube, Facebook et Spotify. Achetez des followers, likes et vues — livraison rapide, sans mot de passe.",
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
    "boost réseaux sociaux",
    "augmenter abonnés instagram",
    "gagner des abonnés instagram",
    "booster tiktok",
    "booster youtube",
    "augmenter audience instagram",
    "vyrlo",
  ],
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Vyrlo — Followers, Likes, Vues pour vos réseaux",
    description:
      "Développez votre audience sur les réseaux sociaux avec Vyrlo. Followers, likes, vues pour Instagram, TikTok, YouTube — livraison en 20 min, à partir de 8,90 €.",
    url: BASE,
    siteName: "Vyrlo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vyrlo — Followers, Likes, Vues",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyrlo — Followers, Likes, Vues",
    description:
      "Développez votre audience sur Instagram, TikTok, YouTube — livraison en 20 min.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "_2dUE7YzvdwhpPxvsNbjAoLpJLiqG76M1NakGLCK1wA",
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
    "Vyrlo est une plateforme française permettant de développer son audience sur Instagram, TikTok, YouTube, Facebook, Spotify et Threads. Followers, likes et vues — livraison automatique, sans mot de passe, à partir de 8,90 €.",
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

/** WholesaleStore — renforce l'entité commerciale */
const wholesaleSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Vyrlo",
  url: BASE,
  description:
    "Vyrlo est la plateforme française pour développer son audience sur Instagram, TikTok, YouTube, Facebook, Spotify, X et Threads. Livraison automatique, à partir de 8,90 €, support 7j/7.",
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
    "Développez votre audience — achetez des followers, likes et vues pour vos réseaux sociaux.",
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
