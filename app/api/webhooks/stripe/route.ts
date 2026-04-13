import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { japAddOrder } from "@/lib/jap";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Webhook error";
    console.error("Webhook signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Supporte commande simple (orderId) et panier (orderIds)
    const raw = session.metadata?.orderIds ?? session.metadata?.orderId ?? "";
    const orderIds = raw.split(",").map(s => s.trim()).filter(Boolean);

    if (orderIds.length === 0) return NextResponse.json({ error: "No orderId" }, { status: 400 });

    for (const orderId of orderIds) {
      const order = await prisma.order.findUnique({ where: { id: orderId } });
      if (!order || order.status !== "PENDING_PAYMENT") continue; // déjà traité

      try {
        const japRes = await japAddOrder(order.serviceId, order.link, order.quantity);

        if (!japRes.order) {
          console.error("JAP error:", japRes.error);
          await prisma.order.update({ where: { id: orderId }, data: { status: "FAILED" } });
          continue;
        }

        await prisma.order.update({
          where: { id: orderId },
          data: {
            japOrderId: japRes.order,
            status: "PENDING",
            customerEmail: session.customer_email || order.customerEmail,
          },
        });
      } catch (e) {
        console.error("Order processing error:", e);
        await prisma.order.update({ where: { id: orderId }, data: { status: "FAILED" } });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
