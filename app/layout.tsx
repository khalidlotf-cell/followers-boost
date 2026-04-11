import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vyrlo - Services SMM Premium",
  description: "Achetez des followers, likes et vues pour Instagram, TikTok, YouTube et plus encore.",
  openGraph: {
    title: "Vyrlo - Services SMM Premium",
    description: "Boostez votre présence sur les réseaux sociaux. Followers, likes, vues — livraison en 20 min.",
    url: "https://vyrlo.com",
    siteName: "Vyrlo",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vyrlo - Services SMM Premium" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyrlo - Services SMM Premium",
    description: "Boostez votre présence sur les réseaux sociaux. Followers, likes, vues — livraison en 20 min.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
