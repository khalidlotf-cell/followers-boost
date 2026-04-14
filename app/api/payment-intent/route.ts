import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { orderIds } = (await req.json()) as { orderIds: string[] };
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: "orderIds manquants" }, { status: 400 });
    }

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

    const amount = Math.round(orders.reduce((s, o) => s + o.charge, 0) * 100);
    if (amount <= 0) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    // Idempotence : si un PI existe déjà sur la 1re commande, on le récupère
    const existingPiId = orders[0].stripeSessionId;
    let clientSecret: string | null = null;

    if (existingPiId?.startsWith("pi_")) {
      const pi = await stripe.paymentIntents.retrieve(existingPiId);
      if (pi.status === "requires_payment_method" || pi.status === "requires_confirmation") {
        // Mise à jour du montant si besoin (au cas où le panier aurait changé)
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
            ? orders[0].service.name
            : `${orders.length} articles Vyrlo`,
      });
      clientSecret = pi.client_secret;

      // On stocke le pi.id sur la 1re commande (champ @unique → une seule fois)
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
        name: o.service.name,
        quantity: o.quantity,
        link: o.link,
        charge: o.charge,
      })),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`PAYMENT_INTENT_ERROR | msg=${msg}`);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
