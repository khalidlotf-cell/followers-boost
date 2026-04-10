import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { japGetMultipleStatus } from "@/lib/jap";

export async function POST() {
  try {
    const session = await requireAuth();

    const pendingOrders = await prisma.order.findMany({
      where: {
        userId: session.id,
        japOrderId: { not: null },
        status: { notIn: ["COMPLETED", "CANCELLED", "PARTIAL"] },
      },
    });

    if (pendingOrders.length === 0) return NextResponse.json({ updated: 0 });

    const ids = pendingOrders.map((o) => o.japOrderId!);
    const statuses = await japGetMultipleStatus(ids);

    let updated = 0;
    for (const order of pendingOrders) {
      const s = statuses[String(order.japOrderId)];
      if (!s || s.error) continue;

      const statusMap: Record<string, string> = {
        Pending: "PENDING",
        "In progress": "IN_PROGRESS",
        Completed: "COMPLETED",
        Partial: "PARTIAL",
        Canceled: "CANCELLED",
        Processing: "IN_PROGRESS",
      };

      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: statusMap[s.status] || order.status,
          startCount: s.start_count ? parseInt(s.start_count) : undefined,
          remains: s.remains ? parseInt(s.remains) : undefined,
        },
      });
      updated++;
    }

    return NextResponse.json({ updated });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
