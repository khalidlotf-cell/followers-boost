import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { japAddOrder } from "@/lib/jap";
import { env } from "@/lib/env";
import type Stripe from "stripe";

const MAX_EVENT_AGE_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, env().STRIPE_WEBHOOK_SECRET);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Webhook error";
    console.error("STRIPE_WEBHOOK | signature_error");
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // Rejet des events trop anciens (rejeu d'anciens events = potentielle attaque)
  if (Date.now() - event.created * 1000 > MAX_EVENT_AGE_MS) {
    console.error(`STRIPE_WEBHOOK | stale_event id=${event.id} age=${Date.now() - event.created * 1000}ms`);
    return NextResponse.json({ ok: true, stale: true });
  }

  // Idempotency : une insertion unique sur event.id. Si le webhook est rejoué,
  // la contrainte PK empêche tout double traitement.
  try {
    await prisma.processedStripeEvent.create({
      data: { id: event.id, type: event.type },
    });
  } catch {
    // déjà traité — 200 OK pour que Stripe ne retente pas
    return NextResponse.json({ ok: true, duplicate: true });
  }

  let raw = "";
  let email: string | null = null;
  let stripePaymentId: string | null = null;

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    raw = pi.metadata?.orderIds ?? "";
    email = pi.receipt_email ?? null;
    stripePaymentId = pi.id;
  } else if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    raw = session.metadata?.orderIds ?? session.metadata?.orderId ?? "";
    email = session.customer_email ?? null;
    stripePaymentId = typeof session.payment_intent === "string" ? session.payment_intent : null;
  } else {
    return NextResponse.json({ ok: true });
  }

  const orderIds = raw.split(",").map(s => s.trim()).filter(Boolean);
  if (orderIds.length === 0) return NextResponse.json({ error: "No orderId" }, { status: 400 });

  for (const orderId of orderIds) {
    // Transition atomique : PENDING_PAYMENT -> PROCESSING.
    // updateMany avec WHERE status = PENDING_PAYMENT : si 0 ligne affectée,
    // une autre exécution a déjà pris l'ordre (défense supplémentaire contre
    // les races si l'event arrive en double très rapidement).
    const claimed = await prisma.order.updateMany({
      where: { id: orderId, status: "PENDING_PAYMENT" },
      data: { status: "PROCESSING" },
    });
    if (claimed.count === 0) continue;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) continue;

    try {
      const japRes = await japAddOrder(order.serviceId, order.link, order.quantity);

      if (!japRes.order) {
        console.error(`STRIPE_WEBHOOK | jap_failed order=${orderId}`);
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "FAILED" },
        });
        continue;
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          japOrderId: japRes.order,
          status: "PENDING",
          customerEmail: email || order.customerEmail,
          ...(stripePaymentId && !order.stripeSessionId
            ? { stripeSessionId: stripePaymentId }
            : {}),
        },
      });
    } catch (e) {
      console.error(`STRIPE_WEBHOOK | processing_error order=${orderId} msg=${e instanceof Error ? e.message : String(e)}`);
      await prisma.order.update({ where: { id: orderId }, data: { status: "FAILED" } });
    }
  }

  return NextResponse.json({ ok: true });
}
