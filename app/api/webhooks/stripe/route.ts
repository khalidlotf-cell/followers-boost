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
    const orderId = session.metadata?.orderId;

    if (!orderId) return NextResponse.json({ error: "No orderId" }, { status: 400 });

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order || order.status !== "PENDING_PAYMENT") {
      return NextResponse.json({ ok: true }); // déjà traité
    }

    try {
      // Envoyer la commande au panel SMM
      const japRes = await japAddOrder(order.serviceId, order.link, order.quantity);

      if (!japRes.order) {
        console.error("JAP error:", japRes.error);
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "FAILED" },
        });
        return NextResponse.json({ error: "JAP error" }, { status: 502 });
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
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "FAILED" },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
