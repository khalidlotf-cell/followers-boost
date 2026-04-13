import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

interface CartItem { serviceId: number; link: string; quantity: number }

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`checkout:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }

  try {
    const { items, email }: { items: CartItem[]; email?: string } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }
    if (items.length > 10) {
      return NextResponse.json({ error: "Maximum 10 articles par commande" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });

    const validated: Array<{ service: { id: number; name: string; ourRate: number }, link: string, qty: number, charge: number }> = [];

    for (const item of items) {
      const { serviceId, link, quantity } = item;

      try {
        const parsed = new URL(link);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          return NextResponse.json({ error: `URL invalide : ${link}` }, { status: 400 });
        }
      } catch {
        return NextResponse.json({ error: `URL invalide : ${link}` }, { status: 400 });
      }

      const qty = Math.floor(Number(quantity));
      if (!Number.isFinite(qty) || qty <= 0) {
        return NextResponse.json({ error: "Quantité invalide" }, { status: 400 });
      }

      const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
      if (!service) return NextResponse.json({ error: `Service ${serviceId} introuvable` }, { status: 404 });

      if (qty < service.min || qty > service.max) {
        return NextResponse.json({ error: `Quantité invalide pour ${service.name}` }, { status: 400 });
      }

      const charge = parseFloat(((qty / 1000) * service.ourRate).toFixed(2));
      validated.push({ service, link, qty, charge });
    }

    // Créer toutes les commandes en DB
    const orders = await Promise.all(
      validated.map(v =>
        prisma.order.create({
          data: {
            serviceId: v.service.id,
            link: v.link,
            quantity: v.qty,
            charge: v.charge,
            status: "PENDING_PAYMENT",
            customerEmail: email || null,
          },
        })
      )
    );

    // Une session Stripe avec tous les articles
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email || undefined,
      line_items: validated.map(v => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: v.service.name,
            description: `${v.qty.toLocaleString("fr-FR")} unités · ${v.link}`,
          },
          unit_amount: Math.round(v.charge * 100),
        },
        quantity: 1,
      })),
      metadata: {
        orderIds: orders.map(o => o.id).join(","),
      },
      success_url: `${siteUrl}/commande/confirmation?id=${orders[0].id}`,
      cancel_url: `${siteUrl}/commande/annulation`,
    });

    // Associer la session Stripe à toutes les commandes
    await Promise.all(
      orders.map(o =>
        prisma.order.update({ where: { id: o.id }, data: { stripeSessionId: session.id } })
      )
    );

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Cart checkout error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
