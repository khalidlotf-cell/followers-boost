import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createWhopCheckout } from "@/lib/whop";

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

    const charge = parseFloat(((qty / 1000) * service.ourRate).toFixed(4));

    // Créer la commande en attente de paiement
    const order = await prisma.order.create({
      data: {
        userId: session.id,
        serviceId,
        link,
        quantity: qty,
        charge,
        status: "PENDING_PAYMENT",
      },
    });

    const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin");
    if (!origin) {
      await prisma.order.delete({ where: { id: order.id } });
      return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
    }
    const whop = await createWhopCheckout({
      orderId: order.id,
      amountUsd: charge,
      redirectUrl: `${origin}/commande/confirmation?id=${order.id}`,
      email: session.email,
    });

    if (!whop.purchase_url) {
      // Annuler la commande si Whop échoue
      await prisma.order.delete({ where: { id: order.id } });
      return NextResponse.json({ error: "Erreur lors de la création du paiement" }, { status: 502 });
    }

    return NextResponse.json({ checkoutUrl: whop.purchase_url, orderId: order.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
