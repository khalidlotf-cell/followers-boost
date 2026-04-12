import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ── Instagram ─────────────────────────────────────────────────────────
      { source: "/acheter-des-followers-instagram",  destination: "/boutique/instagram" },
      { source: "/acheter-des-likes-instagram",      destination: "/boutique/instagram" },
      { source: "/acheter-des-vues-instagram",       destination: "/boutique/instagram" },
      { source: "/augmenter-abonnes-instagram",      destination: "/boutique/instagram" },
      // ── TikTok ────────────────────────────────────────────────────────────
      { source: "/acheter-des-abonnes-tiktok",       destination: "/boutique/tiktok" },
      { source: "/acheter-des-followers-tiktok",     destination: "/boutique/tiktok" },
      { source: "/acheter-des-vues-tiktok",          destination: "/boutique/tiktok" },
      { source: "/acheter-des-likes-tiktok",         destination: "/boutique/tiktok" },
      // ── YouTube ───────────────────────────────────────────────────────────
      { source: "/acheter-des-abonnes-youtube",      destination: "/boutique/youtube" },
      { source: "/acheter-des-vues-youtube",         destination: "/boutique/youtube" },
      { source: "/acheter-des-likes-youtube",        destination: "/boutique/youtube" },
      // ── Spotify ───────────────────────────────────────────────────────────
      { source: "/acheter-des-streams-spotify",      destination: "/boutique/spotify" },
      { source: "/acheter-des-lectures-spotify",     destination: "/boutique/spotify" },
      { source: "/booster-spotify",                  destination: "/boutique/spotify" },
      // ── Facebook ──────────────────────────────────────────────────────────
      { source: "/acheter-des-abonnes-facebook",     destination: "/boutique/facebook" },
      { source: "/acheter-des-likes-facebook",       destination: "/boutique/facebook" },
      // ── Twitter / X ───────────────────────────────────────────────────────
      { source: "/acheter-des-followers-twitter",    destination: "/boutique/twitter" },
      { source: "/acheter-des-followers-x",          destination: "/boutique/twitter" },
      { source: "/acheter-des-retweets",             destination: "/boutique/twitter" },
      // ── Threads ───────────────────────────────────────────────────────────
      { source: "/acheter-des-followers-threads",    destination: "/boutique/threads" },
    ];
  },
};

export default nextConfig;
