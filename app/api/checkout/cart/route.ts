import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { MAX_CHARGE_EUR, computeCharge } from "@/lib/pricing";

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

      const service = await prisma.service.findFirst({ where: { id: serviceId, active: true } });
      if (!service) return NextResponse.json({ error: `Service ${serviceId} introuvable` }, { status: 404 });

      if (qty < service.min || qty > service.max) {
        return NextResponse.json({ error: `Quantité invalide pour ${service.name}` }, { status: 400 });
      }

      const charge = computeCharge(qty, service.ourRate);
      validated.push({ service, link, qty, charge });
    }

    const totalCharge = validated.reduce((s, v) => s + v.charge, 0);
    if (totalCharge <= 0 || totalCharge > MAX_CHARGE_EUR) {
      return NextResponse.json({ error: `Montant total hors limites (max ${MAX_CHARGE_EUR}€)` }, { status: 400 });
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

    return NextResponse.json({ orderIds: orders.map(o => o.id) });
  } catch (e) {
    console.error("Cart checkout error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
