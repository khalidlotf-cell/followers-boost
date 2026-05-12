/**
 * Audit keyword coverage sur une page produit Shopify.
 *
 * Usage : npx tsx scripts/keyword-audit.ts [handle]
 * Default handle : abonnes-instagram
 *
 * Liste les keywords cibles et compte leurs occurrences dans body_html
 * (hors JSON-LD). Affiche un % de couverture global.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API = "2025-10";

// Liste maître des keywords commercial-intent extraits de :
// - SEMrush data utilisateur (acheter des followers instagram 1.3K, etc.)
// - Top-rankers audreytips.com + fastlikes.fr (extraction des H1/H2/title)
// - Variations linguistiques FR + EN
const KEYWORDS_BY_PLATFORM: Record<string, string[]> = {
  instagram: [
    "acheter des followers instagram",
    "acheter followers instagram",
    "acheter des abonnés instagram",
    "acheter abonnés instagram",
    "achat de followers instagram",
    "achat followers instagram",
    "achat d'abonnés instagram",
    "achat abonnés instagram",
    "abonnés instagram",
    "followers instagram",
    "augmenter followers instagram",
    "augmenter ses followers instagram",
    "augmenter ses abonnés instagram",
    "augmenter ses followers",
    "gagner followers instagram",
    "gagner des followers instagram",
    "gagner abonnés instagram",
    "booster instagram",
    "booster son profil instagram",
    "booster son instagram",
    "acheter des followers instagram pas cher",
    "acheter des followers instagram français",
    "abonnés instagram français",
    "followers instagram français",
    "acheter des followers instagram réels",
    "achat de followers instagram pas cher",
    "comment acheter des followers instagram",
    "combien d'abonnés instagram acheter",
    "site pour acheter des followers instagram",
    "site français pour acheter des followers instagram",
  ],
  tiktok: [
    "acheter des abonnés tiktok",
    "acheter abonnés tiktok",
    "acheter des followers tiktok",
    "acheter followers tiktok",
    "acheter des likes tiktok",
    "acheter des vues tiktok",
    "achat abonnés tiktok",
    "achat followers tiktok",
    "achat de vues tiktok",
    "abonnés tiktok",
    "followers tiktok",
    "augmenter followers tiktok",
    "gagner abonnés tiktok",
    "booster tiktok",
    "comment avoir des abonnés tiktok",
    "comment gagner des followers tiktok",
    "vues tiktok pas cher",
    "tiktok pour toi",
    "page pour toi tiktok",
    "algorithme tiktok",
  ],
  youtube: [
    "acheter des abonnés youtube",
    "acheter abonnés youtube",
    "achat d'abonnés youtube",
    "achat abonnés youtube",
    "acheter des vues youtube",
    "acheter vues youtube",
    "achat de vues youtube",
    "abonnés youtube",
    "vues youtube",
    "augmenter abonnés youtube",
    "gagner abonnés youtube",
    "gagner 1000 abonnés youtube",
    "1000 abonnés youtube",
    "4000 heures de visionnage",
    "monétisation youtube",
    "programme partenaires youtube",
    "ypp youtube",
    "atteindre 1000 abonnés youtube",
    "comment avoir 1000 abonnés youtube",
    "abonnés youtube pas cher",
  ],
  facebook: [
    "acheter des likes facebook",
    "acheter likes facebook",
    "acheter des fans facebook",
    "acheter fans facebook",
    "acheter des j'aime facebook",
    "acheter des followers facebook",
    "acheter followers facebook",
    "achat de likes facebook",
    "achat likes facebook",
    "achat de fans facebook",
    "likes facebook",
    "fans facebook",
    "followers facebook",
    "j'aime facebook",
    "augmenter likes facebook",
    "augmenter ses likes facebook",
    "augmenter fans facebook",
    "booster page facebook",
    "booster sa page facebook",
    "gagner des fans facebook",
    "acheter des likes facebook pas cher",
    "fans facebook français",
    "likes facebook français",
    "comment augmenter ses likes facebook",
    "comment acheter des likes facebook",
    "pourquoi acheter des likes facebook",
    "fans facebook réels",
    "page facebook professionnelle",
    "algorithme facebook",
    "portée organique facebook",
  ],
  twitter: [
    "acheter des followers twitter",
    "acheter followers twitter",
    "acheter des followers x",
    "acheter des followers x twitter",
    "acheter des abonnés twitter",
    "acheter abonnés twitter",
    "acheter des likes twitter",
    "acheter des likes x",
    "acheter des retweets",
    "acheter des retweets twitter",
    "acheter des vues twitter",
    "acheter des vues x",
    "achat followers twitter",
    "achat de followers x",
    "followers twitter",
    "followers x",
    "abonnés twitter",
    "abonnés x",
    "augmenter followers twitter",
    "augmenter ses followers twitter",
    "booster son compte x",
    "booster son compte twitter",
    "gagner followers twitter",
    "comment avoir plus d'abonnés twitter",
    "comment augmenter ses followers twitter",
    "followers twitter pas cher",
    "vrais followers twitter",
    "followers twitter réels",
    "pourquoi acheter des followers twitter",
    "audience twitter",
  ],
  spotify: [
    "acheter des streams spotify",
    "acheter streams spotify",
    "acheter des lectures spotify",
    "acheter lectures spotify",
    "acheter des écoutes spotify",
    "acheter écoutes spotify",
    "acheter des plays spotify",
    "acheter des auditeurs spotify",
    "acheter des auditeurs mensuels spotify",
    "acheter monthly listeners",
    "acheter des abonnés spotify",
    "acheter des followers spotify",
    "achat de streams spotify",
    "achat de lectures spotify",
    "streams spotify",
    "lectures spotify",
    "écoutes spotify",
    "auditeurs spotify",
    "auditeurs mensuels spotify",
    "monthly listeners spotify",
    "playlist spotify",
    "placement playlist spotify",
    "discover weekly spotify",
    "augmenter streams spotify",
    "gagner auditeurs spotify",
    "promouvoir musique spotify",
    "monétisation spotify",
    "royalties spotify",
    "algorithme spotify",
    "radio d'artiste spotify",
  ],
  telegram: [
    "acheter des abonnés telegram",
    "acheter abonnés telegram",
    "acheter des membres telegram",
    "acheter membres telegram",
    "acheter des membres canal telegram",
    "acheter des membres groupe telegram",
    "acheter des followers telegram",
    "acheter des vues telegram",
    "acheter des vues post telegram",
    "achat de membres telegram",
    "achat d'abonnés telegram",
    "membres telegram",
    "abonnés telegram",
    "canal telegram",
    "groupe telegram",
    "augmenter membres telegram",
    "augmenter ses membres telegram",
    "augmenter abonnés telegram",
    "booster canal telegram",
    "développer son canal telegram",
    "comment avoir plus de membres telegram",
    "membres telegram français",
    "abonnés telegram français",
    "canal telegram crypto",
    "canal telegram trading",
    "membres telegram pas cher",
    "promouvoir canal telegram",
  ],
};

const handleArg = process.argv[2] || "abonnes-instagram";

function detectPlatform(handle: string): string {
  for (const p of Object.keys(KEYWORDS_BY_PLATFORM)) {
    if (handle.includes(p)) return p;
  }
  return "instagram";
}

(async () => {
  const platform = detectPlatform(handleArg);
  const KEYWORDS = KEYWORDS_BY_PLATFORM[platform];
  console.log(`=== Audit keyword coverage : ${handleArg} (${platform}) ===\n`);

  const r = await fetch(
    `https://${SHOP}/admin/api/${API}/products.json?handle=${handleArg}&fields=body_html,title`,
    { headers: { "X-Shopify-Access-Token": TOKEN } }
  );
  const p = (await r.json()).products?.[0];
  if (!p) { console.log("Produit non trouvé"); return; }

  const raw = (p.body_html || "")
    .toLowerCase()
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

  let covered = 0;
  let strong = 0;
  for (const kw of KEYWORDS) {
    const re = new RegExp(kw.replace(/[\s ]+/g, "\\s+").replace(/'/g, "['']"), "g");
    const count = (raw.match(re) || []).length;
    if (count > 0) covered++;
    if (count >= 3) strong++;
    const m = count === 0 ? "✗" : count < 3 ? "⚠" : "✓";
    console.log(`  ${m} ${count.toString().padStart(3)}×  ${kw}`);
  }
  console.log(
    `\n${covered}/${KEYWORDS.length} keywords présents (${Math.round(100 * covered / KEYWORDS.length)}%) ` +
    `| ${strong}/${KEYWORDS.length} forts ≥3× (${Math.round(100 * strong / KEYWORDS.length)}%)`
  );
})();
