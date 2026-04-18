import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import crypto from "node:crypto";

/**
 * Simule un webhook Shopify orders/paid contre le serveur local (localhost:3000)
 * ou un URL distant. Signe le body avec SHOPIFY_WEBHOOK_SECRET.
 *
 * Usage:
 *   npx tsx scripts/shopify-test-webhook.ts <variantId> <productId> [targetUrl]
 *
 * Exemple:
 *   npx tsx scripts/shopify-test-webhook.ts 64244137898205 16099039576413
 *   # → POST vers http://localhost:3000/api/webhooks/shopify/orders-paid
 */

const DEFAULT_URL = "http://localhost:3000/api/webhooks/shopify/orders-paid";

async function main() {
  const variantId = Number(process.argv[2]);
  const productId = Number(process.argv[3]);
  const url = process.argv[4] ?? DEFAULT_URL;

  if (!variantId || !productId) {
    console.error("Usage: npx tsx scripts/shopify-test-webhook.ts <variantId> <productId> [targetUrl]");
    process.exit(1);
  }

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("SHOPIFY_WEBHOOK_SECRET manquant");
    process.exit(1);
  }

  const fakeOrderId = Date.now();
  const payload = {
    id: fakeOrderId,
    email: "test@vyrlo.fr",
    created_at: new Date().toISOString(),
    financial_status: "paid",
    note: null,
    line_items: [
      {
        id: fakeOrderId + 1,
        product_id: productId,
        variant_id: variantId,
        quantity: 1,
        name: "Test line item",
        properties: [{ name: "Lien", value: "https://www.instagram.com/vyrlo.fr/" }],
      },
    ],
  };

  const raw = JSON.stringify(payload);
  const hmac = crypto.createHmac("sha256", secret).update(raw, "utf8").digest("base64");
  const webhookId = crypto.randomUUID();

  console.log(`→ POST ${url}`);
  console.log(`  x-shopify-webhook-id: ${webhookId}`);
  console.log(`  x-shopify-hmac-sha256: ${hmac.slice(0, 32)}...`);
  console.log(`  payload: ${raw.slice(0, 200)}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-shopify-hmac-sha256": hmac,
      "x-shopify-webhook-id": webhookId,
      "x-shopify-topic": "orders/paid",
      "x-shopify-shop-domain": process.env.SHOPIFY_STORE_DOMAIN ?? "",
    },
    body: raw,
  });

  const text = await res.text();
  console.log(`\n← ${res.status}`);
  console.log(text);
}
main().catch(e => { console.error(e); process.exit(1); });
