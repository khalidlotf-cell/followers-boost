import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { VYRLO_COLLECTION_LIQUID } from "./shopify-vyrlo-theme/collection.liquid";

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

const NEW_COLLECTION_TEMPLATE = JSON.stringify({
  sections: {
    vyrlo_collection: { type: "vyrlo-collection", settings: {} },
  },
  order: ["vyrlo_collection"],
}, null, 2);

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");
  console.log(`→ Thème : ${main.id}`);

  await shopify("PUT", `/themes/${main.id}/assets.json`, {
    asset: { key: "sections/vyrlo-collection.liquid", value: VYRLO_COLLECTION_LIQUID },
  });
  console.log(`  ✓ sections/vyrlo-collection.liquid (${VYRLO_COLLECTION_LIQUID.length} octets)`);

  await shopify("PUT", `/themes/${main.id}/assets.json`, {
    asset: { key: "templates/collection.json", value: NEW_COLLECTION_TEMPLATE },
  });
  console.log(`  ✓ templates/collection.json (remplacé)`);

  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
