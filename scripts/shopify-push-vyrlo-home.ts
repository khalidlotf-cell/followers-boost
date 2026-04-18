import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { VYRLO_HOME_LIQUID } from "./shopify-vyrlo-theme/home.liquid";
import { VYRLO_LOGO_SNIPPET } from "./shopify-vyrlo-theme/logo.liquid";

/**
 * Pousse la homepage Vyrlo custom dans le thème Horizon :
 *  - snippets/vyrlo-logo.liquid (SVG plateformes)
 *  - sections/vyrlo-home.liquid (la homepage complète)
 *  - templates/index.json (utilise uniquement vyrlo-home)
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
    if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 400)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

async function putAsset(themeId: number, key: string, value: string): Promise<void> {
  await shopify("PUT", `/themes/${themeId}/assets.json`, {
    asset: { key, value },
  });
  console.log(`  ✓ ${key} (${value.length} octets)`);
}

const NEW_INDEX_TEMPLATE = JSON.stringify({
  sections: {
    vyrlo_home: { type: "vyrlo-home", settings: {} },
  },
  order: ["vyrlo_home"],
}, null, 2);

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");
  console.log(`→ Thème principal : ${main.id}`);

  console.log("\n━━━ Upload assets ━━━");
  await putAsset(main.id, "snippets/vyrlo-logo.liquid", VYRLO_LOGO_SNIPPET);
  await putAsset(main.id, "sections/vyrlo-home.liquid", VYRLO_HOME_LIQUID);
  await putAsset(main.id, "templates/index.json", NEW_INDEX_TEMPLATE);

  console.log("\nTerminé. Visite / sur ta boutique pour voir le rendu.");
}
main().catch(e => { console.error(e); process.exit(1); });
