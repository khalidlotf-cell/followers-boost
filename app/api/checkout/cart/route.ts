import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { MAX_CHARGE_EUR, computeCharge } from "@/lib/pricing";
import { cartCheckoutSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`checkout:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 });
  }

  try {
    const parsed = cartCheckoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
        { status: 400 }
      );
    }
    const { items, email } = parsed.data;

    const serviceIds = [...new Set(items.map(i => i.serviceId))];
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds }, active: true },
    });
    const serviceMap = new Map(services.map(s => [s.id, s]));

    const validated: Array<{ serviceId: number; link: string; qty: number; charge: number; name: string }> = [];
    for (const item of items) {
      const service = serviceMap.get(item.serviceId);
      if (!service) {
        return NextResponse.json({ error: `Service ${item.serviceId} introuvable` }, { status: 404 });
      }
      if (item.quantity < service.min || item.quantity > service.max) {
        return NextResponse.json({ error: `Quantité invalide pour ${service.name}` }, { status: 400 });
      }
      validated.push({
        serviceId: service.id,
        link: item.link,
        qty: item.quantity,
        charge: computeCharge(item.quantity, service.ourRate),
        name: service.name,
      });
    }

    const totalCharge = validated.reduce((s, v) => s + v.charge, 0);
    if (totalCharge <= 0 || totalCharge > MAX_CHARGE_EUR) {
      return NextResponse.json({ error: `Montant total hors limites (max ${MAX_CHARGE_EUR}€)` }, { status: 400 });
    }

    const orders = await prisma.$transaction(
      validated.map(v =>
        prisma.order.create({
          data: {
            serviceId: v.serviceId,
            link: v.link,
            quantity: v.qty,
            charge: v.charge,
            status: "PENDING_PAYMENT",
            customerEmail: email ?? null,
          },
        })
      )
    );

    return NextResponse.json({ orderIds: orders.map(o => o.id) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`CART_CHECKOUT_ERROR | ${msg}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
