// Force-invalidate Shopify's server-side page_cache for quiz pages.
// Discovered that re-uploading the template alone doesn't always bust the
// cache — toggling template_suffix to null then back forces a re-render.
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API = "2025-10";
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function main() {
  const r = await (await fetch(`https://${SHOP}/admin/api/${API}/pages.json?limit=250`, { headers: { "X-Shopify-Access-Token": TOKEN } })).json();
  const targets = r.pages.filter((p: any) => /^vq-/.test(p.handle));
  for (const p of targets) {
    const suffix = p.template_suffix;
    process.stdout.write(`${p.handle} (${suffix}) … `);
    await fetch(`https://${SHOP}/admin/api/${API}/pages/${p.id}.json`, {
      method: "PUT",
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ page: { id: p.id, template_suffix: null } }),
    });
    await sleep(2000);
    await fetch(`https://${SHOP}/admin/api/${API}/pages/${p.id}.json`, {
      method: "PUT",
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ page: { id: p.id, template_suffix: suffix } }),
    });
    console.log("busted");
    await sleep(500);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
