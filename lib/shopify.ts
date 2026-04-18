import crypto from "crypto";
import { shopifyEnv } from "./env";

const API_VERSION = "2025-10";

/**
 * Vérifie la signature HMAC d'un webhook Shopify en timing-safe.
 * Shopify signe le body brut avec SHA256 + SHOPIFY_WEBHOOK_SECRET,
 * et envoie la signature en base64 dans le header `x-shopify-hmac-sha256`.
 */
export function verifyShopifyHmac(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const digest = crypto
    .createHmac("sha256", shopifyEnv().SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");
  const a = Buffer.from(digest);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Appel REST Admin API Shopify. Ex: `shopifyAdmin("GET", "/orders.json")`. */
export async function shopifyAdmin<T = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown
): Promise<T> {
  const { SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN } = shopifyEnv();
  const url = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(`Shopify ${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  return data as T;
}

/**
 * Récupère le `mtp_service_id` depuis les metafields produit (fallback pour anciens produits).
 */
export async function getProductMtpServiceId(productId: number | string): Promise<number | null> {
  const res = await shopifyAdmin<{ metafields: Array<{ namespace: string; key: string; value: string }> }>(
    "GET",
    `/products/${productId}/metafields.json`
  );
  const m = res.metafields.find(x => x.namespace === "custom" && x.key === "mtp_service_id");
  if (!m) return null;
  const n = parseInt(m.value, 10);
  return Number.isFinite(n) ? n : null;
}

/**
 * Récupère `mtp_service_id` + `mtp_quantity` depuis les metafields variante.
 * C'est le mapping principal : chaque variante (ex: "1K × France") pointe vers un service MTP + une quantité.
 */
export async function getVariantMtpInfo(variantId: number | string): Promise<{ serviceId: number; quantity: number } | null> {
  const res = await shopifyAdmin<{ metafields: Array<{ namespace: string; key: string; value: string }> }>(
    "GET",
    `/variants/${variantId}/metafields.json`
  );
  const svc = res.metafields.find(x => x.namespace === "custom" && x.key === "mtp_service_id");
  const qty = res.metafields.find(x => x.namespace === "custom" && x.key === "mtp_quantity");
  if (!svc || !qty) return null;
  const s = parseInt(svc.value, 10);
  const q = parseInt(qty.value, 10);
  if (!Number.isFinite(s) || !Number.isFinite(q)) return null;
  return { serviceId: s, quantity: q };
}

/** Stocke le `mtp_order_id` en metafield sur la commande Shopify. */
export async function setOrderMtpMetafield(shopifyOrderId: string, mtpOrderId: number): Promise<void> {
  await shopifyAdmin("POST", `/orders/${shopifyOrderId}/metafields.json`, {
    metafield: {
      namespace: "custom",
      key: "mtp_order_id",
      value: String(mtpOrderId),
      type: "number_integer",
    },
  });
}

/** Marque la commande Shopify comme fulfilled (livrée). */
export async function fulfillShopifyOrder(shopifyOrderId: string): Promise<void> {
  // Récupère les fulfillment_orders éligibles
  const fo = await shopifyAdmin<{ fulfillment_orders: Array<{ id: number; status: string }> }>(
    "GET",
    `/orders/${shopifyOrderId}/fulfillment_orders.json`
  );
  const open = fo.fulfillment_orders.filter(f => f.status === "open" || f.status === "in_progress");
  for (const f of open) {
    await shopifyAdmin("POST", `/fulfillments.json`, {
      fulfillment: {
        line_items_by_fulfillment_order: [{ fulfillment_order_id: f.id }],
        notify_customer: true,
      },
    });
  }
}

/** Types utiles pour le webhook orders/paid */
export interface ShopifyOrderLineItem {
  id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  name: string;
  properties: Array<{ name: string; value: string }>;
}

export interface ShopifyOrderWebhookPayload {
  id: number;
  email: string | null;
  line_items: ShopifyOrderLineItem[];
  financial_status: string;
  created_at: string;
  note: string | null;
}
