import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Enregistre (ou met à jour) les webhooks Shopify nécessaires.
 *
 * Utilisation :
 *   npx tsx scripts/register-shopify-webhooks.ts
 *
 * Requis en env : SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN, NEXT_PUBLIC_SITE_URL
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

if (!SHOP || !TOKEN || !SITE) {
  console.error("SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN et NEXT_PUBLIC_SITE_URL requis");
  process.exit(1);
}

const WEBHOOKS = [
  {
    topic: "orders/paid",
    address: `${SITE}/api/webhooks/shopify/orders-paid`,
    format: "json" as const,
  },
];

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": TOKEN!,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : (null as T);
}

interface Webhook {
  id: number;
  topic: string;
  address: string;
}

async function main() {
  const existing = await shopify<{ webhooks: Webhook[] }>("GET", "/webhooks.json");
  console.log(`→ ${existing.webhooks.length} webhooks existants`);

  for (const wh of WEBHOOKS) {
    const current = existing.webhooks.find(w => w.topic === wh.topic);
    if (current && current.address === wh.address) {
      console.log(`  = ${wh.topic} → déjà à jour (${current.address})`);
      continue;
    }
    if (current) {
      await shopify("PUT", `/webhooks/${current.id}.json`, { webhook: { id: current.id, address: wh.address } });
      console.log(`  ↻ ${wh.topic} → MAJ ${current.address} → ${wh.address}`);
    } else {
      await shopify("POST", "/webhooks.json", { webhook: wh });
      console.log(`  + ${wh.topic} → ${wh.address}`);
    }
  }

  console.log("\n⚠️  N'oublie pas de mettre à jour SHOPIFY_WEBHOOK_SECRET dans Vercel :");
  console.log("   Shopify Admin → Settings → Notifications → Webhooks → copier 'Your webhooks will be signed with'");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
