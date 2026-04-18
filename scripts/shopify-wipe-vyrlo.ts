import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string): Promise<T> {
  await sleep(600);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
      method,
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    });
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("retry-after") ?? "2");
      await sleep(Math.max(retryAfter * 1000, 2000 * (attempt + 1)));
      continue;
    }
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} ${res.status} ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

async function main() {
  let sinceId = 0;
  const toDelete: { id: number; title: string }[] = [];
  for (;;) {
    const data = await shopify<{ products: { id: number; title: string; vendor: string }[] }>(
      "GET",
      `/products.json?limit=250&vendor=Vyrlo&since_id=${sinceId}`
    );
    if (!data.products.length) break;
    for (const p of data.products) toDelete.push({ id: p.id, title: p.title });
    sinceId = data.products[data.products.length - 1].id;
  }
  console.log(`→ ${toDelete.length} produits Vyrlo à supprimer`);
  for (const p of toDelete) {
    try {
      await shopify("DELETE", `/products/${p.id}.json`);
      console.log(`  ✓ supprimé ${p.id} "${p.title}"`);
    } catch (e) {
      console.error(`  ✗ ${p.id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  console.log("Terminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
