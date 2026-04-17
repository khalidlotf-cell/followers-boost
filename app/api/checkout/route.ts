import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { assertChargeWithinLimit, computeCharge } from "@/lib/pricing";
import { singleOrderSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`checkout:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  try {
    const parsed = singleOrderSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
        { status: 400 }
      );
    }
    const { serviceId, link, quantity, email } = parsed.data;

    const service = await prisma.service.findFirst({ where: { id: serviceId, active: true } });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    if (quantity < service.min || quantity > service.max) {
      return NextResponse.json(
        { error: `Quantité invalide (min: ${service.min}, max: ${service.max})` },
        { status: 400 }
      );
    }

    const charge = computeCharge(quantity, service.ourRate);
    assertChargeWithinLimit(charge);

    const order = await prisma.order.create({
      data: {
        serviceId,
        link,
        quantity,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: email ?? null,
      },
    });

    return NextResponse.json({ orderIds: [order.id] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`CHECKOUT_ERROR | ${msg}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
