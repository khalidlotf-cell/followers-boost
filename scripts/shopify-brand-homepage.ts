import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Customise la homepage : hero text + bouton, tout en gardant le layout Horizon.
 * Idempotent — réexécutable, remet le même contenu Vyrlo.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

type AnyObj = Record<string, unknown>;

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");

  const asset = await shopify<{ asset: { value: string } }>(
    "GET",
    `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent("templates/index.json")}`
  );
  const tpl = JSON.parse(asset.asset.value) as AnyObj;
  const sections = tpl.sections as AnyObj;

  // Trouver le hero
  let heroKey: string | null = null;
  for (const k of Object.keys(sections)) {
    const s = sections[k] as AnyObj;
    if (s.type === "hero") { heroKey = k; break; }
  }
  if (!heroKey) throw new Error("Section hero introuvable");

  const hero = sections[heroKey] as AnyObj;
  const heroBlocks = hero.blocks as AnyObj;

  // Patcher les blocks texte + button
  for (const bkey of Object.keys(heroBlocks)) {
    const b = heroBlocks[bkey] as AnyObj;
    if (b.type === "text") {
      const settings = b.settings as AnyObj;
      settings.text = "<h1>Boostez vos réseaux sociaux</h1><p>Livraison en 20 min · Sans mot de passe · Garantie remboursement</p>";
      settings.alignment = "center";
      settings.type_preset = "h1";
      settings.max_width = "large";
      settings.wrap = "pretty";
      console.log(`  ✓ hero/${bkey} text patché`);
    }
    if (b.type === "button") {
      const settings = b.settings as AnyObj;
      settings.label = "Découvrir la boutique";
      settings.link = "shopify://collections/all";
      settings.style_class = "button";
      settings.width = "fit-content";
      console.log(`  ✓ hero/${bkey} button patché`);
    }
  }

  // Recentrer le hero
  const heroSettings = hero.settings as AnyObj;
  heroSettings.horizontal_alignment = "center";
  heroSettings.vertical_alignment = "center";
  heroSettings.horizontal_alignment_flex_direction_column = "center";
  heroSettings.vertical_alignment_flex_direction_column = "center";

  const newValue = JSON.stringify(tpl, null, 2);
  await shopify("PUT", `/themes/${main.id}/assets.json`, {
    asset: { key: "templates/index.json", value: newValue },
  });
  console.log(`✓ templates/index.json mis à jour`);
}
main().catch(e => { console.error(e); process.exit(1); });
