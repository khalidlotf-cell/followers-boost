// Catalogue fixe calqué sur myboost.fr
// Chaque service correspond à un type de service MTP détecté par mots-clés

export interface CatalogService {
  slug: string;
  label: string;
  icon: string;
  keywords: string[];       // mots-clés pour matcher les services MTP
  excludeKeywords: string[]; // si le nom/catégorie contient un de ces mots → exclu
}

export interface CatalogPlatform {
  slug: string;
  label: string;
  emoji: string;
  color: string;
  services: CatalogService[];
}

export const CATALOG: CatalogPlatform[] = [
  {
    slug: "instagram",
    label: "Instagram",
    emoji: "📸",
    color: "#E1306C",
    services: [
      { slug: "abonnes",      label: "Abonnés",           icon: "👤", keywords: ["follower", "abonné", "subscriber"],         excludeKeywords: ["comment", "like", "view", "vue", "reel"] },
      { slug: "likes",        label: "Likes",              icon: "❤️", keywords: ["like", "j'aime"],                           excludeKeywords: ["comment", "follower", "subscriber", "view", "vue", "reel"] },
      { slug: "vues",         label: "Vues Reels & Vidéos",icon: "▶️", keywords: ["view", "vue", "reel", "video", "impression"],excludeKeywords: ["comment", "follower", "subscriber", "like"] },
      { slug: "commentaires", label: "Commentaires",       icon: "💬", keywords: ["comment"],                                  excludeKeywords: [] },
    ],
  },
  {
    slug: "tiktok",
    label: "TikTok",
    emoji: "🎵",
    color: "#010101",
    services: [
      { slug: "abonnes",        label: "Abonnés",        icon: "👤", keywords: ["follower", "abonné"],                   excludeKeywords: ["comment", "like", "view", "vue", "share", "save"] },
      { slug: "likes",          label: "Likes",          icon: "❤️", keywords: ["like", "heart"],                        excludeKeywords: ["comment", "follower", "view", "vue", "share", "save"] },
      { slug: "vues",           label: "Vues",           icon: "▶️", keywords: ["view", "vue"],                          excludeKeywords: ["comment", "follower", "like", "share", "save"] },
      { slug: "partages",       label: "Partages",       icon: "🔁", keywords: ["share", "partage"],                     excludeKeywords: ["comment", "follower", "like", "view"] },
      { slug: "enregistrements",label: "Enregistrements",icon: "🔖", keywords: ["save", "enregistrement", "bookmark"],   excludeKeywords: ["comment", "follower", "like", "view", "share"] },
    ],
  },
  {
    slug: "youtube",
    label: "YouTube",
    emoji: "▶️",
    color: "#FF0000",
    services: [
      { slug: "vues",    label: "Vues",     icon: "▶️", keywords: ["view", "vue", "watch"],               excludeKeywords: ["comment", "like", "subscriber", "abonné"] },
      { slug: "likes",   label: "Likes",    icon: "👍", keywords: ["like"],                               excludeKeywords: ["comment", "subscriber", "abonné", "view", "vue"] },
      { slug: "abonnes", label: "Abonnés",  icon: "👤", keywords: ["subscriber", "abonné"],               excludeKeywords: ["comment", "like", "view", "vue"] },
    ],
  },
  {
    slug: "facebook",
    label: "Facebook",
    emoji: "👥",
    color: "#1877F2",
    services: [
      { slug: "abonnes", label: "Abonnés / Followers", icon: "👤", keywords: ["follower", "abonné", "fan"],  excludeKeywords: ["comment", "like", "view", "vue"] },
      { slug: "likes",   label: "Likes",               icon: "👍", keywords: ["like", "j'aime"],            excludeKeywords: ["comment", "follower", "view", "vue"] },
    ],
  },
  {
    slug: "twitter",
    label: "Twitter / X",
    emoji: "🐦",
    color: "#000000",
    services: [
      { slug: "abonnes",  label: "Abonnés",  icon: "👤", keywords: ["follower", "abonné"],  excludeKeywords: ["comment", "like", "retweet", "repost"] },
      { slug: "likes",    label: "Likes",    icon: "❤️", keywords: ["like"],               excludeKeywords: ["comment", "follower", "retweet", "repost"] },
      { slug: "retweets", label: "Retweets", icon: "🔁", keywords: ["retweet", "repost"],  excludeKeywords: ["comment", "follower", "like"] },
    ],
  },
  {
    slug: "spotify",
    label: "Spotify",
    emoji: "🎧",
    color: "#1DB954",
    services: [
      { slug: "abonnes",   label: "Abonnés",          icon: "👤", keywords: ["follower", "abonné"],                  excludeKeywords: ["play", "stream", "listener"] },
      { slug: "auditeurs", label: "Auditeurs mensuels",icon: "🎵", keywords: ["listener", "auditeur", "play", "stream"], excludeKeywords: ["follower", "abonné"] },
    ],
  },
  {
    slug: "threads",
    label: "Threads",
    emoji: "🧵",
    color: "#000000",
    services: [
      { slug: "likes",   label: "Likes",   icon: "❤️", keywords: ["like"],               excludeKeywords: ["comment", "follower"] },
      { slug: "abonnes", label: "Abonnés", icon: "👤", keywords: ["follower", "abonné"], excludeKeywords: ["comment", "like"] },
    ],
  },
];

export function getPlatform(slug: string) {
  return CATALOG.find(p => p.slug === slug) ?? null;
}

export function matchService(category: string, name: string, serviceSlug: string, platformSlug: string): boolean {
  const platform = getPlatform(platformSlug);
  if (!platform) return false;
  const svcDef = platform.services.find(s => s.slug === serviceSlug);
  if (!svcDef) return false;
  const haystack = (category + " " + name).toLowerCase();
  const hasKeyword = svcDef.keywords.some(k => haystack.includes(k));
  if (!hasKeyword) return false;
  return !svcDef.excludeKeywords.some(k => haystack.includes(k));
}
