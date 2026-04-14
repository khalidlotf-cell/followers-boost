import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Rate limiting : 10 tentatives de checkout / 10 minutes par IP
  const ip = getClientIp(req);
  if (!checkRateLimit(`checkout:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  try {
    const { serviceId, link, quantity, email } = await req.json();

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
      console.error("NEXT_PUBLIC_SITE_URL is not set");
      return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
    }

    // Créer la commande en attente de paiement
    const order = await prisma.order.create({
      data: {
        serviceId,
        link,
        quantity: qty,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: email || null,
      },
    });

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
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
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    console.error("Checkout error:", msg, stack);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
