import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const { serviceId, link, quantity } = await req.json();

    if (!serviceId || !link || !quantity) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    // Validation URL
    try {
      const parsed = new URL(link);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return NextResponse.json({ error: "URL invalide" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json({ error: "Quantité invalide" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    if (qty < service.min || qty > service.max) {
      return NextResponse.json(
        { error: `Quantité invalide (min: ${service.min}, max: ${service.max})` },
        { status: 400 }
      );
    }

    const charge = parseFloat(((qty / 1000) * service.ourRate).toFixed(2));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
    }

    // Créer la commande en attente de paiement
    const order = await prisma.order.create({
      data: {
        userId: session.id,
        serviceId,
        link,
        quantity: qty,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: session.email,
      },
    });

    // Créer la session Stripe Checkout
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: service.name,
              description: `${qty.toLocaleString("fr-FR")} unités · ${link}`,
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
        quantity: String(qty),
        userId: session.id,
      },
      success_url: `${siteUrl}/commande/confirmation?id=${order.id}`,
      cancel_url: `${siteUrl}/commande/annulation`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: stripeSession.id },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
