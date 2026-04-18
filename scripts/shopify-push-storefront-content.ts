import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { PLATFORM_SEO, GROUP_SEO, DEFAULT_GROUP_SEO, type PlatformSeo, type GroupSeo } from "../lib/storefront-content";

/**
 * Pousse le contenu SEO/marketing vyrlo.fr vers Shopify :
 * - body_html de chaque collection (par plateforme)
 * - body_html de chaque produit (par groupe × plateforme)
 * Idempotent — remplace le contenu à chaque exécution.
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
    if (res.status === 429) { await sleep(2000 * (attempt + 1)); continue; }
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

// ── Rendu HTML ────────────────────────────────────────────────────────────────

function renderBadges(badges: string[]): string {
  return `<p style="margin:16px 0;">` +
    badges.map(b => `<span style="display:inline-block;background:#f3f4f6;color:#374151;padding:6px 12px;border-radius:100px;font-size:14px;font-weight:600;margin:4px 6px 4px 0;">${b}</span>`).join("") +
    `</p>`;
}

function renderBenefits(benefits: Array<{ icon?: string; title: string; desc: string }>): string {
  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0;">` +
    benefits.map(b => `
      <div style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
        ${b.icon ? `<div style="font-size:24px;margin-bottom:8px;">${b.icon}</div>` : ""}
        <h3 style="margin:0 0 4px;font-size:16px;font-weight:700;">${b.title}</h3>
        <p style="margin:0;font-size:14px;color:#6b7280;">${b.desc}</p>
      </div>
    `).join("") +
    `</div>`;
}

function renderBenefitsList(items: string[]): string {
  return `<ul>` + items.map(i => `<li>${i}</li>`).join("") + `</ul>`;
}

function renderFaq(faq: Array<{ q: string; a: string }>): string {
  return faq.map(f => `
    <details style="margin:8px 0;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;">
      <summary style="font-weight:600;cursor:pointer;">${f.q}</summary>
      <p style="margin:8px 0 0;color:#4b5563;">${f.a}</p>
    </details>
  `).join("");
}

function renderTrust(): string {
  return `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:24px 0;padding:20px;background:#fafafa;border-radius:12px;text-align:center;">
      <div><strong style="display:block;font-size:20px;">⚡</strong><span style="font-size:13px;color:#4b5563;">Démarrage sous 20 min</span></div>
      <div><strong style="display:block;font-size:20px;">🔒</strong><span style="font-size:13px;color:#4b5563;">Zéro mot de passe</span></div>
      <div><strong style="display:block;font-size:20px;">↻</strong><span style="font-size:13px;color:#4b5563;">Remboursement garanti</span></div>
      <div><strong style="display:block;font-size:20px;">💬</strong><span style="font-size:13px;color:#4b5563;">Support FR 7j/7</span></div>
    </div>
  `;
}

function buildCollectionHtml(seo: PlatformSeo): string {
  return `
<h2>${seo.h1}</h2>
<p>${seo.intro}</p>
${renderTrust()}
<h3>Pourquoi Vyrlo pour ${seo.label} ?</h3>
${renderBenefitsList(seo.benefits)}
<h3>Questions fréquentes ${seo.label}</h3>
${renderFaq(seo.faq)}
`.trim();
}

function buildProductHtml(groupSlug: string, platformSlug: string): string {
  const groupSeo: GroupSeo = GROUP_SEO[groupSlug] ?? DEFAULT_GROUP_SEO;
  const platformSeo = PLATFORM_SEO[platformSlug];

  return `
<p><strong>${groupSeo.desc}</strong></p>
${renderBadges(groupSeo.badges)}
<h3>Pourquoi ça marche</h3>
<p>${groupSeo.why}</p>
<h3>Ce qu'on vous garantit</h3>
${renderBenefits(groupSeo.benefits)}
${platformSeo ? `<h3>Spécificités ${platformSeo.label}</h3>\n${renderBenefitsList(platformSeo.benefits)}` : ""}
${renderTrust()}
<h3>Questions fréquentes</h3>
${renderFaq(groupSeo.faq)}
<p style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;color:#4b5563;">
  <strong>Comment ça marche :</strong> sélectionnez la quantité et le ciblage, collez le lien public de votre profil ou publication (champ « Lien » ci-dessous), puis validez. Vous recevez un email de confirmation et la livraison démarre automatiquement sous 20 minutes.
</p>
`.trim();
}

// ── Mapping produit → groupSlug ───────────────────────────────────────────────

const TITLE_TO_GROUP: Array<{ regex: RegExp; group: string }> = [
  { regex: /enregistrement/i, group: "enregistrements" },
  { regex: /partage/i, group: "partages" },
  { regex: /auditeur/i, group: "auditeurs" },
  { regex: /retweet/i, group: "retweets" },
  { regex: /vue/i, group: "vues" },
  { regex: /like/i, group: "likes" },
  { regex: /abonn[éeè]|follower/i, group: "abonnes" },
];

function groupFromTitle(title: string): string | null {
  for (const rule of TITLE_TO_GROUP) if (rule.regex.test(title)) return rule.group;
  return null;
}

function platformFromTags(tagsCsv: string): string | null {
  const tags = tagsCsv.split(",").map(t => t.trim().toLowerCase());
  for (const p of ["instagram", "tiktok", "youtube", "facebook", "twitter", "spotify", "threads"]) {
    if (tags.includes(p)) return p;
  }
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function updateCollections() {
  console.log("\n━━━ Collections ━━━");
  const data = await shopify<{ smart_collections: { id: number; handle: string; title: string }[] }>(
    "GET", "/smart_collections.json?limit=100"
  );
  for (const col of data.smart_collections) {
    const seo = PLATFORM_SEO[col.handle];
    if (!seo) { console.log(`  skip ${col.handle} (pas de contenu SEO)`); continue; }
    try {
      await shopify("PUT", `/smart_collections/${col.id}.json`, {
        smart_collection: { id: col.id, body_html: buildCollectionHtml(seo) },
      });
      console.log(`  ✓ ${col.handle} — body_html mis à jour`);
    } catch (e) {
      console.error(`  ✗ ${col.handle}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function updateProducts() {
  console.log("\n━━━ Produits ━━━");
  let sinceId = 0;
  const products: { id: number; title: string; tags: string }[] = [];
  for (;;) {
    const d = await shopify<{ products: { id: number; title: string; tags: string; vendor: string }[] }>(
      "GET", `/products.json?limit=250&vendor=Vyrlo&since_id=${sinceId}&fields=id,title,tags,vendor`
    );
    if (!d.products.length) break;
    for (const p of d.products) products.push(p);
    sinceId = d.products[d.products.length - 1].id;
  }
  console.log(`  ${products.length} produits Vyrlo`);

  for (const p of products) {
    const group = groupFromTitle(p.title);
    const platform = platformFromTags(p.tags);
    if (!group || !platform) {
      console.log(`  skip "${p.title}" (group=${group} platform=${platform})`);
      continue;
    }
    try {
      await shopify("PUT", `/products/${p.id}.json`, {
        product: { id: p.id, body_html: buildProductHtml(group, platform) },
      });
      console.log(`  ✓ "${p.title}" (${group}/${platform})`);
    } catch (e) {
      console.error(`  ✗ "${p.title}": ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

async function main() {
  await updateCollections();
  await updateProducts();
  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
