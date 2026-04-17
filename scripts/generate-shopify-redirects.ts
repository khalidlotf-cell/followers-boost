import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

/**
 * Génère le CSV à importer dans Shopify Admin → Marketing → URL Redirects.
 *
 * Source : next.config.ts rewrites (routes SEO `/acheter-des-...`).
 * Destination Shopify : `/collections/<platform>` (ou `/pages/<platform>` selon ton thème).
 *
 * Utilisation :
 *   npx tsx scripts/generate-shopify-redirects.ts
 *   → écrit tmp/shopify-redirects.csv
 */

// Source : on hardcode la liste ici pour éviter de parser next.config.ts.
// À maintenir en parallèle tant que les deux cohabitent.
const REDIRECTS: Array<{ from: string; platform: string }> = [
  { from: "/acheter-des-followers-instagram", platform: "instagram" },
  { from: "/acheter-des-likes-instagram", platform: "instagram" },
  { from: "/acheter-des-vues-instagram", platform: "instagram" },
  { from: "/augmenter-abonnes-instagram", platform: "instagram" },
  { from: "/acheter-des-abonnes-tiktok", platform: "tiktok" },
  { from: "/acheter-des-followers-tiktok", platform: "tiktok" },
  { from: "/acheter-des-vues-tiktok", platform: "tiktok" },
  { from: "/acheter-des-likes-tiktok", platform: "tiktok" },
  { from: "/acheter-des-abonnes-youtube", platform: "youtube" },
  { from: "/acheter-des-vues-youtube", platform: "youtube" },
  { from: "/acheter-des-likes-youtube", platform: "youtube" },
  { from: "/acheter-des-streams-spotify", platform: "spotify" },
  { from: "/acheter-des-lectures-spotify", platform: "spotify" },
  { from: "/booster-spotify", platform: "spotify" },
  { from: "/acheter-des-abonnes-facebook", platform: "facebook" },
  { from: "/acheter-des-likes-facebook", platform: "facebook" },
  { from: "/acheter-des-followers-twitter", platform: "twitter" },
  { from: "/acheter-des-followers-x", platform: "twitter" },
  { from: "/acheter-des-retweets", platform: "twitter" },
  { from: "/acheter-des-followers-threads", platform: "threads" },
];

const outDir = path.join(process.cwd(), "tmp");
const outFile = path.join(outDir, "shopify-redirects.csv");

fs.mkdirSync(outDir, { recursive: true });

const rows = [
  "Redirect from,Redirect to",
  ...REDIRECTS.map(r => `${r.from},/collections/${r.platform}`),
];

fs.writeFileSync(outFile, rows.join("\n") + "\n", "utf8");
console.log(`✓ ${REDIRECTS.length} redirects écrits dans ${outFile}`);
console.log("→ Shopify Admin → Marketing → URL Redirects → Import CSV");
