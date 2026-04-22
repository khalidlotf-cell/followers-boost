import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { mtpGetMultipleStatus } from "@/lib/mtp";
import { fulfillShopifyOrder } from "@/lib/shopify";
import { env, shopifyEnv } from "@/lib/env";

// cron-job.org (free) coupe la requête à 30s. Les fulfillments Shopify (2 API
// calls REST par commande, rate-limitées ~2/s) dépassent facilement ce délai.
// On répond vite à cron-job.org et on termine les fulfillments en background.
export const maxDuration = 60;

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
  const toFulfill: Array<{ orderId: string; shopifyId: string }> = [];

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
        toFulfill.push({ orderId: o.id, shopifyId: o.shopifyOrderId.split(":")[0] });
      }
    })
  );

  if (toFulfill.length > 0) {
    after(async () => {
      await Promise.allSettled(
        toFulfill.map(async ({ orderId, shopifyId }) => {
          try {
            await fulfillShopifyOrder(shopifyId);
          } catch (e) {
            console.error(`CRON_FULFILL_FAILED | order=${orderId} shopify=${shopifyId} err=${e instanceof Error ? e.message : String(e)}`);
          }
        })
      );
    });
  }

  return NextResponse.json({
    checked: pending.length,
    updated,
    queuedFulfillments: toFulfill.length,
    envMode: env().NODE_ENV,
  });
}
