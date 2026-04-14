import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { japAddOrder } from "@/lib/jap";
import type Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Webhook error";
    console.error("Webhook signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  let raw = "";
  let email: string | null = null;

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    raw = pi.metadata?.orderIds ?? "";
    email = pi.receipt_email ?? null;
  } else if (event.type === "checkout.session.completed") {
    // Rétro-compat : anciennes sessions Checkout éventuellement en vol
    const session = event.data.object;
    raw = session.metadata?.orderIds ?? session.metadata?.orderId ?? "";
    email = session.customer_email ?? null;
  } else {
    return NextResponse.json({ ok: true });
  }

  const orderIds = raw.split(",").map(s => s.trim()).filter(Boolean);
  if (orderIds.length === 0) return NextResponse.json({ error: "No orderId" }, { status: 400 });

  for (const orderId of orderIds) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== "PENDING_PAYMENT") continue;

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
          customerEmail: email || order.customerEmail,
        },
      });
    } catch (e) {
      console.error("Order processing error:", e);
      await prisma.order.update({ where: { id: orderId }, data: { status: "FAILED" } });
    }
  }

  return NextResponse.json({ ok: true });
}
