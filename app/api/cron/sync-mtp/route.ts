import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mtpGetMultipleStatus } from "@/lib/mtp";
import { fulfillShopifyOrder } from "@/lib/shopify";
import { env, shopifyEnv } from "@/lib/env";

/**
 * Cron Vercel — appelé toutes les 15 min (config dans vercel.json).
 *
 * Pour chaque commande Shopify pas encore terminée (PENDING / IN_PROGRESS),
 * on interroge MTP en batch, on update le statut en DB, et on déclenche la
 * fulfillment Shopify quand MTP nous dit "Completed".
 *
 * Auth : header `authorization: Bearer ${CRON_SECRET}` (Vercel Cron envoie
 * automatiquement le bearer si on l'a configuré en env).
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${shopifyEnv().CRON_SECRET}`;
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = await prisma.order.findMany({
    where: {
      shopifyOrderId: { not: null },
      japOrderId: { not: null },
      status: { in: ["PENDING", "IN_PROGRESS"] },
    },
    take: 100,
  });
  if (pending.length === 0) return NextResponse.json({ checked: 0, updated: 0 });

  const ids = pending.map(o => o.japOrderId!);
  const statuses = (await mtpGetMultipleStatus(ids)) as Record<
    string,
    { status: string; start_count?: string; remains?: string; error?: string } | undefined
  >;

  const statusMap: Record<string, string> = {
    Pending: "PENDING",
    "In progress": "IN_PROGRESS",
    Processing: "IN_PROGRESS",
    Completed: "COMPLETED",
    Partial: "PARTIAL",
    Canceled: "CANCELLED",
  };

  let updated = 0;
  let fulfilled = 0;

  await Promise.allSettled(
    pending.map(async o => {
      const s = statuses[String(o.japOrderId)];
      if (!s || s.error) return;

      const newStatus = statusMap[s.status] ?? o.status;
      const startCount = s.start_count ? parseInt(s.start_count, 10) : undefined;
      const remains = s.remains ? parseInt(s.remains, 10) : undefined;

      if (newStatus !== o.status || startCount !== undefined || remains !== undefined) {
        await prisma.order.update({
          where: { id: o.id },
          data: {
            status: newStatus,
            ...(startCount !== undefined ? { startCount } : {}),
            ...(remains !== undefined ? { remains } : {}),
          },
        });
        updated++;
      }

      if (newStatus === "COMPLETED" && o.shopifyOrderId) {
        const realId = o.shopifyOrderId.split(":")[0];
        try {
          await fulfillShopifyOrder(realId);
          fulfilled++;
        } catch (e) {
          console.error(`CRON_FULFILL_FAILED | order=${o.id} shopify=${realId} err=${e instanceof Error ? e.message : String(e)}`);
        }
      }
    })
  );

  return NextResponse.json({ checked: pending.length, updated, fulfilled, envMode: env().NODE_ENV });
}
