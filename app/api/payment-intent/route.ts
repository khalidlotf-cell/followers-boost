import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { getPlatform } from "@/lib/catalog";
import { MAX_CHARGE_EUR, computeCharge } from "@/lib/pricing";
import { paymentIntentSchema } from "@/lib/validation";

function displayLabel(service: { platformSlug: string | null; groupSlug: string | null }): string {
  if (!service.platformSlug || !service.groupSlug) return "";
  const platform = getPlatform(service.platformSlug);
  if (!platform) return "";
  const group = platform.services.find(s => s.slug === service.groupSlug);
  if (!group) return "";
  return `${group.label} ${platform.label}`;
}

export async function POST(req: NextRequest) {
  try {
    const parsed = paymentIntentSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    const { orderIds } = parsed.data;

    const orders = await prisma.order.findMany({
      where: { id: { in: orderIds } },
      include: { service: true },
    });

    if (orders.length !== orderIds.length) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }
    if (orders.some(o => o.status !== "PENDING_PAYMENT")) {
      return NextResponse.json({ error: "Commande déjà payée" }, { status: 409 });
    }

    // Revalidation SERVEUR du montant : on recalcule depuis service.ourRate + qty
    // (ne jamais faire confiance à la valeur stockée o.charge sans vérifier)
    for (const o of orders) {
      if (o.quantity < o.service.min || o.quantity > o.service.max) {
        return NextResponse.json(
          { error: `Quantité hors limites pour ${o.service.name}` },
          { status: 400 }
        );
      }
      const expected = computeCharge(o.quantity, o.service.ourRate);
      if (Math.abs(expected - o.charge) > 0.01) {
        return NextResponse.json(
          { error: "Montant de commande incohérent — rechargez le panier" },
          { status: 409 }
        );
      }
    }

    const amount = Math.round(orders.reduce((s, o) => s + o.charge, 0) * 100);
    if (amount <= 0 || amount > MAX_CHARGE_EUR * 100) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    const stripe = getStripe();
    const existingPiId = orders[0].stripeSessionId;
    let clientSecret: string | null = null;

    if (existingPiId?.startsWith("pi_")) {
      const pi = await stripe.paymentIntents.retrieve(existingPiId);
      if (pi.status === "requires_payment_method" || pi.status === "requires_confirmation") {
        if (pi.amount !== amount) {
          await stripe.paymentIntents.update(existingPiId, { amount });
        }
        clientSecret = pi.client_secret;
      }
    }

    if (!clientSecret) {
      const pi = await stripe.paymentIntents.create({
        amount,
        currency: "eur",
        automatic_payment_methods: { enabled: true },
        metadata: {
          orderIds: orders.map(o => o.id).join(","),
        },
        description:
          orders.length === 1
            ? displayLabel(orders[0].service) || "Commande Vyrlo"
            : `${orders.length} articles Vyrlo`,
      });
      clientSecret = pi.client_secret;

      await prisma.order.update({
        where: { id: orders[0].id },
        data: { stripeSessionId: pi.id },
      });
    }

    return NextResponse.json({
      clientSecret,
      amount,
      orderIds: orders.map(o => o.id),
      items: orders.map(o => ({
        id: o.id,
        name: displayLabel(o.service),
        quantity: o.quantity,
        link: o.link,
        charge: o.charge,
      })),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`PAYMENT_INTENT_ERROR | ${msg}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
