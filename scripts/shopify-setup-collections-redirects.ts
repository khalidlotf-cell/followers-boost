import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Crée les smart collections par plateforme (basées sur le tag) + pousse les 301 redirects SEO.
 * Idempotent : skippe ce qui existe déjà.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
      method,
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("retry-after") ?? "2");
      await sleep(Math.max(retryAfter * 1000, 2000 * (attempt + 1)));
      continue;
    }
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

const COLLECTIONS = [
  { handle: "instagram", title: "Instagram",    tag: "instagram", body_html: "<p>Boostez votre compte Instagram avec des followers, likes et vues de qualité. Livraison progressive, sans mot de passe. À partir de 8,90 €.</p>" },
  { handle: "tiktok",    title: "TikTok",       tag: "tiktok",    body_html: "<p>Déclenchez l'algorithme TikTok avec des followers, likes, vues, partages et enregistrements. Démarrage sous 1h.</p>" },
  { handle: "youtube",   title: "YouTube",      tag: "youtube",   body_html: "<p>Atteignez le seuil de monétisation YouTube. Vues et likes pour améliorer votre classement dans les recommandations.</p>" },
  { handle: "facebook",  title: "Facebook",     tag: "facebook",  body_html: "<p>Augmentez votre crédibilité sur Facebook avec des abonnés et des likes de qualité.</p>" },
  { handle: "twitter",   title: "Twitter / X",  tag: "twitter",   body_html: "<p>Boostez votre visibilité sur Twitter / X avec des abonnés, likes et retweets.</p>" },
  { handle: "spotify",   title: "Spotify",      tag: "spotify",   body_html: "<p>Abonnés et auditeurs mensuels Spotify pour booster la visibilité de votre musique.</p>" },
  { handle: "threads",   title: "Threads",      tag: "threads",   body_html: "<p>Abonnés et likes Threads.</p>" },
];

const REDIRECTS: Array<{ from: string; to: string }> = [
  { from: "/acheter-des-followers-instagram", to: "/collections/instagram" },
  { from: "/acheter-des-likes-instagram",     to: "/collections/instagram" },
  { from: "/acheter-des-vues-instagram",      to: "/collections/instagram" },
  { from: "/augmenter-abonnes-instagram",     to: "/collections/instagram" },
  { from: "/acheter-des-abonnes-tiktok",      to: "/collections/tiktok" },
  { from: "/acheter-des-followers-tiktok",    to: "/collections/tiktok" },
  { from: "/acheter-des-vues-tiktok",         to: "/collections/tiktok" },
  { from: "/acheter-des-likes-tiktok",        to: "/collections/tiktok" },
  { from: "/acheter-des-abonnes-youtube",     to: "/collections/youtube" },
  { from: "/acheter-des-vues-youtube",        to: "/collections/youtube" },
  { from: "/acheter-des-likes-youtube",       to: "/collections/youtube" },
  { from: "/acheter-des-streams-spotify",     to: "/collections/spotify" },
  { from: "/acheter-des-lectures-spotify",    to: "/collections/spotify" },
  { from: "/booster-spotify",                 to: "/collections/spotify" },
  { from: "/acheter-des-abonnes-facebook",    to: "/collections/facebook" },
  { from: "/acheter-des-likes-facebook",      to: "/collections/facebook" },
  { from: "/acheter-des-followers-twitter",   to: "/collections/twitter" },
  { from: "/acheter-des-followers-x",         to: "/collections/twitter" },
  { from: "/acheter-des-retweets",            to: "/collections/twitter" },
  { from: "/acheter-des-followers-threads",   to: "/collections/threads" },
  { from: "/boutique/instagram",              to: "/collections/instagram" },
  { from: "/boutique/tiktok",                 to: "/collections/tiktok" },
  { from: "/boutique/youtube",                to: "/collections/youtube" },
  { from: "/boutique/facebook",               to: "/collections/facebook" },
  { from: "/boutique/twitter",                to: "/collections/twitter" },
  { from: "/boutique/spotify",                to: "/collections/spotify" },
  { from: "/boutique/threads",                to: "/collections/threads" },
];

async function setupCollections() {
  console.log("\n━━━ Collections ━━━");
  const existing = await shopify<{ smart_collections: { id: number; handle: string }[] }>(
    "GET", "/smart_collections.json?limit=100"
  );
  const existingHandles = new Set(existing.smart_collections.map(c => c.handle));

  for (const col of COLLECTIONS) {
    if (existingHandles.has(col.handle)) {
      console.log(`  = ${col.handle} existe déjà`);
      continue;
    }
    try {
      const r = await shopify<{ smart_collection: { id: number; handle: string } }>(
        "POST", "/smart_collections.json",
        {
          smart_collection: {
            title: col.title,
            handle: col.handle,
            body_html: col.body_html,
            published: true,
            rules: [
              { column: "tag", relation: "equals", condition: col.tag },
            ],
            disjunctive: false,
          },
        }
      );
      console.log(`  ✓ ${r.smart_collection.handle} créée (id=${r.smart_collection.id})`);
    } catch (e) {
      console.error(`  ✗ ${col.handle}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function setupRedirects() {
  console.log("\n━━━ Redirects 301 ━━━");

  // Récupère les redirects existants (pagination simple)
  const existingPaths = new Set<string>();
  let sinceId = 0;
  for (;;) {
    const r = await shopify<{ redirects: { id: number; path: string; target: string }[] }>(
      "GET", `/redirects.json?limit=250&since_id=${sinceId}`
    );
    if (!r.redirects.length) break;
    for (const x of r.redirects) existingPaths.add(x.path);
    sinceId = r.redirects[r.redirects.length - 1].id;
    if (r.redirects.length < 250) break;
  }
  console.log(`  ${existingPaths.size} redirects existants`);

  let created = 0;
  for (const red of REDIRECTS) {
    if (existingPaths.has(red.from)) {
      continue;
    }
    try {
      await shopify("POST", "/redirects.json", {
        redirect: { path: red.from, target: red.to },
      });
      console.log(`  + ${red.from} → ${red.to}`);
      created++;
    } catch (e) {
      console.error(`  ✗ ${red.from}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  console.log(`  ✓ ${created} redirects créés`);
}

async function main() {
  await setupCollections();
  await setupRedirects();
  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
