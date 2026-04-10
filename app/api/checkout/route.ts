import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { serviceId, link, quantity, email } = await req.json();

    if (!serviceId || !link || !quantity) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    if (quantity < service.min || quantity > service.max) {
      return NextResponse.json(
        { error: `Quantité invalide (min: ${service.min}, max: ${service.max})` },
        { status: 400 }
      );
    }

    const charge = parseFloat(((quantity / 1000) * service.ourRate).toFixed(2));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Créer la commande en attente de paiement
    const order = await prisma.order.create({
      data: {
        serviceId,
        link,
        quantity,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: email || null,
      },
    });

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: service.name,
              description: `${quantity.toLocaleString("fr-FR")} unités · ${link}`,
            },
            unit_amount: Math.round(charge * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: order.id,
        serviceId: String(serviceId),
        link,
        quantity: String(quantity),
      },
      success_url: `${siteUrl}/commande/confirmation?id=${order.id}`,
      cancel_url: `${siteUrl}/commande/annulation`,
    });

    // Sauvegarder le stripeSessionId
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: unknown) {
    console.error("Checkout error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
