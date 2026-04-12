import type { MetadataRoute } from "next";

const BASE = "https://vyrlo.com";

const PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "twitter",
  "spotify",
  "threads",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const platformUrls: MetadataRoute.Sitemap = PLATFORMS.map((slug) => ({
    url: `${BASE}/boutique/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...platformUrls,
    {
      url: `${BASE}/connexion`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE}/inscription`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE}/cgu`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
