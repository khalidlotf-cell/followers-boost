import { NextRequest, NextResponse, after } from "next/server";
import { prisma } from "@/lib/prisma";
import { mtpGetMultipleStatus } from "@/lib/mtp";
import { fulfillShopifyOrder } from "@/lib/shopify";
import { env, shopifyEnv } from "@/lib/env";

// cron-job.org (free) coupe la requête à 30s. L'appel MTP sur 100 IDs + les
// updates Prisma + les fulfillments Shopify dépassent ce délai. On répond
// immédiatement au cron et on exécute tout le travail en background.
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${shopifyEnv().CRON_SECRET}`;
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  after(async () => {
    try {
      const pending = await prisma.order.findMany({
        where: {
          shopifyOrderId: { not: null },
          japOrderId: { not: null },
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
        take: 100,
      });
      if (pending.length === 0) return;

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
          }

          if (newStatus === "COMPLETED" && o.shopifyOrderId) {
            toFulfill.push({ orderId: o.id, shopifyId: o.shopifyOrderId.split(":")[0] });
          }
        })
      );

      await Promise.allSettled(
        toFulfill.map(async ({ orderId, shopifyId }) => {
          try {
            await fulfillShopifyOrder(shopifyId);
          } catch (e) {
            console.error(`CRON_FULFILL_FAILED | order=${orderId} shopify=${shopifyId} err=${e instanceof Error ? e.message : String(e)}`);
          }
        })
      );
    } catch (e) {
      console.error(`CRON_SYNC_MTP_FAILED | err=${e instanceof Error ? e.message : String(e)}`);
    }
  });

  return NextResponse.json({ queued: true, envMode: env().NODE_ENV });
}
