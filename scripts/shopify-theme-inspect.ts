import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

async function shopify<T>(method: string, path: string): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: npx tsx scripts/shopify-theme-inspect.ts <asset-key>");
    console.error("Ex: npx tsx scripts/shopify-theme-inspect.ts blocks/product-custom-property.liquid");
    process.exit(1);
  }
  const themes = await shopify<{ themes: { id: number; role: string; name: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");

  const a = await shopify<{ asset: { value: string } }>(
    "GET",
    `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent(target)}`
  );
  console.log(`━━━ ${target} (theme ${main.name} / ${main.id}) ━━━`);
  console.log(a.asset.value);
}
main().catch(e => { console.error(e); process.exit(1); });
