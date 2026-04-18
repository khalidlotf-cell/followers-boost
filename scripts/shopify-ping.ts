import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!.trim();
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!.trim();

async function main() {
  const res = await fetch(`https://${SHOP}/admin/api/2025-10/shop.json`, {
    headers: { "X-Shopify-Access-Token": TOKEN },
  });
  const text = await res.text();
  console.log("Status:", res.status);
  if (res.ok) {
    const data = JSON.parse(text);
    console.log("Shop name:", data.shop.name);
    console.log("Domain:", data.shop.myshopify_domain);
    console.log("Email:", data.shop.email);
    console.log("Plan:", data.shop.plan_name);
    console.log("Currency:", data.shop.currency);
  } else {
    console.log("Error:", text.slice(0, 300));
  }
}
main().catch(e => { console.error(e); process.exit(1); });
