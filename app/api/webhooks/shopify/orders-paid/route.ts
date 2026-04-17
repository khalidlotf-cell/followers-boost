import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyShopifyHmac,
  getProductMtpServiceId,
  setOrderMtpMetafield,
  type ShopifyOrderWebhookPayload,
} from "@/lib/shopify";
import { mtpAddOrder } from "@/lib/mtp";

/**
 * Webhook Shopify `orders/paid`.
 *
 * Flow :
 *   1. Vérifier signature HMAC (timing-safe)
 *   2. Idempotency : event_id unique via header x-shopify-webhook-id
 *   3. Pour chaque line_item : lire mtp_service_id (metafield produit) + "Lien" (property) → appeler mtpAddOrder
 *   4. Stocker les id MTP en metafield de commande Shopify
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();

  if (!verifyShopifyHmac(raw, req.headers.get("x-shopify-hmac-sha256"))) {
    console.error("SHOPIFY_WEBHOOK | bad_signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const webhookId = req.headers.get("x-shopify-webhook-id");
  const topic = req.headers.get("x-shopify-topic") ?? "orders/paid";
  if (!webhookId) {
    return NextResponse.json({ error: "Missing webhook id" }, { status: 400 });
  }

  // Idempotency : PK unique. Si déjà traité, 200 OK pour stopper les retries Shopify.
  try {
    await prisma.processedShopifyEvent.create({ data: { id: webhookId, topic } });
  } catch {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  let order: ShopifyOrderWebhookPayload;
  try {
    order = JSON.parse(raw) as ShopifyOrderWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Bad JSON" }, { status: 400 });
  }

  const shopifyOrderId = String(order.id);

  for (const item of order.line_items) {
    const linkProp = item.properties?.find(p => p.name.toLowerCase() === "lien" || p.name.toLowerCase() === "link");
    const link = linkProp?.value?.trim();
    if (!link) {
      console.error(`SHOPIFY_WEBHOOK | missing_link order=${shopifyOrderId} item=${item.id}`);
      continue;
    }

    let serviceId: number | null;
    try {
      serviceId = await getProductMtpServiceId(item.product_id);
    } catch (e) {
      console.error(`SHOPIFY_WEBHOOK | metafield_fetch_failed product=${item.product_id} err=${e instanceof Error ? e.message : String(e)}`);
      continue;
    }
    if (!serviceId) {
      console.error(`SHOPIFY_WEBHOOK | missing_mtp_service_id product=${item.product_id}`);
      continue;
    }

    // On matérialise la commande en DB pour traçabilité et cron de sync
    const service = await prisma.service.findFirst({ where: { id: serviceId, active: true } });
    if (!service) {
      console.error(`SHOPIFY_WEBHOOK | service_inactive mtpId=${serviceId}`);
      continue;
    }
    if (item.quantity < service.min || item.quantity > service.max) {
      console.error(`SHOPIFY_WEBHOOK | qty_out_of_range service=${serviceId} qty=${item.quantity}`);
      continue;
    }

    const dbOrder = await prisma.order.create({
      data: {
        serviceId,
        link,
        quantity: item.quantity,
        charge: 0, // paiement géré par Shopify, non reflété ici
        status: "PROCESSING",
        customerEmail: order.email ?? null,
        shopifyOrderId: `${shopifyOrderId}:${item.id}`,
      },
    });

    try {
      const mtpRes = await mtpAddOrder(serviceId, link, item.quantity);
      if (!mtpRes.order) {
        console.error(`SHOPIFY_WEBHOOK | mtp_failed order=${shopifyOrderId} mtpError=${mtpRes.error ?? "?"}`);
        await prisma.order.update({ where: { id: dbOrder.id }, data: { status: "FAILED" } });
        continue;
      }
      await prisma.order.update({
        where: { id: dbOrder.id },
        data: { japOrderId: mtpRes.order, status: "PENDING" },
      });
      await setOrderMtpMetafield(shopifyOrderId, mtpRes.order);
    } catch (e) {
      console.error(`SHOPIFY_WEBHOOK | processing_error order=${shopifyOrderId} err=${e instanceof Error ? e.message : String(e)}`);
      await prisma.order.update({ where: { id: dbOrder.id }, data: { status: "FAILED" } });
    }
  }

  return NextResponse.json({ ok: true });
}
