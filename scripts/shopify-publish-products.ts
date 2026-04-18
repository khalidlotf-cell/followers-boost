import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

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
    if (!res.ok) throw new Error(`${res.status}: ${text.slice(0, 200)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

async function main() {
  let sinceId = 0;
  const products: { id: number; title: string; status: string }[] = [];
  for (;;) {
    const d = await shopify<{ products: { id: number; title: string; status: string; vendor: string }[] }>(
      "GET", `/products.json?limit=250&vendor=Vyrlo&since_id=${sinceId}`
    );
    if (!d.products.length) break;
    for (const p of d.products) products.push(p);
    sinceId = d.products[d.products.length - 1].id;
  }
  console.log(`→ ${products.length} produits Vyrlo`);

  let published = 0, skipped = 0;
  for (const p of products) {
    if (p.status === "active") { console.log(`  = "${p.title}" déjà active`); skipped++; continue; }
    try {
      await shopify("PUT", `/products/${p.id}.json`, { product: { id: p.id, status: "active", published: true } });
      console.log(`  ✓ "${p.title}" publié`);
      published++;
    } catch (e) {
      console.error(`  ✗ "${p.title}": ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  console.log(`\nTerminé. Publiés: ${published}, skippés: ${skipped}`);
}
main().catch(e => { console.error(e); process.exit(1); });
