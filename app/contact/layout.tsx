import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Support Vyrlo 7j/7",
  description:
    "Une question, un problème ou besoin d'un conseil ? Contactez l'équipe Vyrlo. Réponse en moins d'une heure, support français disponible 7 jours sur 7.",
  alternates: { canonical: "https://vyrlo.fr/contact" },
  openGraph: {
    title: "Contact Vyrlo — Support 7j/7",
    description:
      "Contactez l'équipe Vyrlo. Réponse en moins d'une heure, support français 7j/7.",
    url: "https://vyrlo.fr/contact",
    siteName: "Vyrlo",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vyrlo — Support 7j/7",
    description: "Réponse en moins d'une heure, support français 7j/7.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
