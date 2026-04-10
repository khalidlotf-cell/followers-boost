// Détecte la plateforme depuis le nom de la catégorie JAP
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

export { PLATFORMS };
