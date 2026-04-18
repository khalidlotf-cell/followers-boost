import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { VYRLO_PRODUCT_HERO_LIQUID } from "./shopify-vyrlo-theme/product-hero.liquid";

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

type AnyObj = Record<string, unknown>;

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");
  console.log(`→ Thème : ${main.id}`);

  // 1. Upload la section product-hero
  await shopify("PUT", `/themes/${main.id}/assets.json`, {
    asset: { key: "sections/vyrlo-product-hero.liquid", value: VYRLO_PRODUCT_HERO_LIQUID },
  });
  console.log(`  ✓ sections/vyrlo-product-hero.liquid (${VYRLO_PRODUCT_HERO_LIQUID.length} octets)`);

  // 2. Modifier templates/product.json pour ajouter la section en haut
  const asset = await shopify<{ asset: { value: string } }>(
    "GET",
    `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent("templates/product.json")}`
  );
  const tpl = JSON.parse(asset.asset.value) as AnyObj;
  const sections = tpl.sections as AnyObj;
  const order = tpl.order as string[];

  const HERO_KEY = "vyrlo_product_hero";
  if (sections[HERO_KEY]) {
    console.log(`  = ${HERO_KEY} déjà présent`);
  } else {
    sections[HERO_KEY] = { type: "vyrlo-product-hero", settings: {} };
    order.unshift(HERO_KEY);
    await shopify("PUT", `/themes/${main.id}/assets.json`, {
      asset: { key: "templates/product.json", value: JSON.stringify(tpl, null, 2) },
    });
    console.log(`  ✓ templates/product.json — hero ajouté en tête`);
  }

  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
