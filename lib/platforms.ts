// Détecte la plateforme depuis le nom de la catégorie MTP
// Ex: "Instagram Followers" → "Instagram"

const PLATFORMS = [
  { name: "Instagram", slug: "instagram", emoji: "📸", color: "#E1306C" },
  { name: "TikTok",    slug: "tiktok",    emoji: "🎵", color: "#010101" },
  { name: "YouTube",   slug: "youtube",   emoji: "▶️",  color: "#FF0000" },
  { name: "Facebook",  slug: "facebook",  emoji: "👥", color: "#1877F2" },
  { name: "Twitter",   slug: "twitter",   emoji: "🐦", color: "#1DA1F2" },
  { name: "Spotify",   slug: "spotify",   emoji: "🎧", color: "#1DB954" },
  { name: "Telegram",  slug: "telegram",  emoji: "✈️",  color: "#2AABEE" },
  { name: "Snapchat",  slug: "snapchat",  emoji: "👻", color: "#FFFC00" },
  { name: "LinkedIn",  slug: "linkedin",  emoji: "💼", color: "#0A66C2" },
  { name: "Pinterest", slug: "pinterest", emoji: "📌", color: "#E60023" },
  { name: "Twitch",    slug: "twitch",    emoji: "🎮", color: "#9146FF" },
  { name: "Discord",   slug: "discord",   emoji: "💬", color: "#5865F2" },
  { name: "Reddit",    slug: "reddit",    emoji: "🔴", color: "#FF4500" },
  { name: "SoundCloud",slug: "soundcloud",emoji: "🎶", color: "#FF5500" },
  { name: "X",         slug: "x",         emoji: "✖️",  color: "#000000" },
];

export function getPlatformFromCategory(category: string) {
  const lower = category.toLowerCase();
  return PLATFORMS.find(p =>
    lower.includes(p.name.toLowerCase()) ||
    lower.includes(p.slug)
  ) ?? { name: category, slug: slugify(category), emoji: "🌐", color: "#7c3aed" };
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Transforme un input utilisateur (pseudo, @handle, ou URL) en URL complète attendue
// par MTP. Si l'input est déjà une URL, on la conserve telle quelle.
// Utilisé par le webhook Shopify orders/paid car le quiz funnel ne saisit qu'un pseudo
// alors que les pages produit demandent un lien complet.
export function normalizeProfileLink(input: string, platformSlug: string): string {
  const raw = (input ?? "").trim();
  if (!raw) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;

  const handle = raw.replace(/^@+/, "").replace(/\s+/g, "");
  const slug = (platformSlug ?? "").toLowerCase();

  switch (slug) {
    case "instagram": return `https://www.instagram.com/${handle}`;
    case "tiktok":    return `https://www.tiktok.com/@${handle}`;
    case "youtube":
      if (/^UC[A-Za-z0-9_-]{22}$/.test(handle)) return `https://www.youtube.com/channel/${handle}`;
      return `https://www.youtube.com/@${handle}`;
    case "telegram":  return `https://t.me/${handle}`;
    case "twitter":
    case "x":         return `https://x.com/${handle}`;
    case "facebook":  return `https://www.facebook.com/${handle}`;
    case "spotify":   return `https://open.spotify.com/artist/${handle}`;
    case "snapchat":  return `https://www.snapchat.com/add/${handle}`;
    case "linkedin":  return `https://www.linkedin.com/in/${handle}`;
    case "pinterest": return `https://www.pinterest.com/${handle}`;
    case "twitch":    return `https://www.twitch.tv/${handle}`;
    case "reddit":    return `https://www.reddit.com/user/${handle}`;
    case "soundcloud":return `https://soundcloud.com/${handle}`;
    case "discord":   return raw;
    default:          return raw;
  }
}

export { PLATFORMS };
