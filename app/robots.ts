import type { MetadataRoute } from "next";

const BASE = "https://vyrlo.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/dashboard",
          "/account",
          "/commande",
          "/paiement",
          "/connexion",
          "/inscription",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
