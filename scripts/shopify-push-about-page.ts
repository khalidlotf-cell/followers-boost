import dotenv from "dotenv";
import { readFileSync } from "fs";
import { resolve } from "path";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Met à jour la page À propos sur Shopify :
 * - body_html (~700 mots, équipe collective, fondée en 2024)
 * - Title SEO + meta description (via metafields global)
 *
 * Idempotent — remplace le contenu à chaque exécution.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

const PAGE_ID = 713199255901; // handle: a-propos
const TITLE_SEO = "À propos de Vyrlo | Expert croissance réseaux sociaux France";
const META_DESC = "Découvrez Vyrlo, expert français de la croissance sur les réseaux sociaux. Notre mission : booster votre présence Instagram, TikTok, YouTube en toute sécurité.";

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : (null as T);
}

async function main() {
  // 1. Lire le HTML de la page (on enlève le commentaire de tête pour pas polluer la page)
  const htmlPath = resolve(__dirname, "../../semaine-2-livrables/01-page-a-propos.html");
  const raw = readFileSync(htmlPath, "utf8");
  const body_html = raw.replace(/^<!--[\s\S]*?-->\s*/, "").trim();

  // 2. Mettre à jour le body_html de la page
  console.log(`→ PUT /pages/${PAGE_ID}.json`);
  await shopify("PUT", `/pages/${PAGE_ID}.json`, {
    page: { id: PAGE_ID, body_html, title: "À propos de Vyrlo" },
  });
  console.log("  ✓ body_html + title mis à jour");

  // 3. Pousser les metafields SEO (title_tag + description_tag)
  const metafields = [
    { namespace: "global", key: "title_tag", type: "single_line_text_field", value: TITLE_SEO },
    { namespace: "global", key: "description_tag", type: "single_line_text_field", value: META_DESC },
  ];
  for (const mf of metafields) {
    console.log(`→ POST /pages/${PAGE_ID}/metafields.json (${mf.key})`);
    try {
      await shopify("POST", `/pages/${PAGE_ID}/metafields.json`, { metafield: mf });
      console.log(`  ✓ ${mf.key} créé`);
    } catch (e) {
      // Si déjà existant, on cherche l'id et on update
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.includes("422")) throw e;
      const existing = await shopify<{ metafields: { id: number; namespace: string; key: string }[] }>(
        "GET", `/pages/${PAGE_ID}/metafields.json`
      );
      const found = existing.metafields.find(m => m.namespace === mf.namespace && m.key === mf.key);
      if (!found) throw new Error(`Metafield ${mf.key} introuvable après 422`);
      await shopify("PUT", `/metafields/${found.id}.json`, {
        metafield: { id: found.id, value: mf.value, type: mf.type },
      });
      console.log(`  ✓ ${mf.key} mis à jour (id=${found.id})`);
    }
  }

  console.log("\n✅ Page À propos mise à jour sur Shopify.");
  console.log(`   https://${SHOP.replace(".myshopify.com", "")}/pages/a-propos`);
}

main().catch(e => { console.error(e); process.exit(1); });
