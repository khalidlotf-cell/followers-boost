import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { assertChargeWithinLimit, computeCharge } from "@/lib/pricing";

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

    const service = await prisma.service.findFirst({ where: { id: serviceId, active: true } }).catch((e: unknown) => { throw new Error(`DB_findService: ${e instanceof Error ? e.message : String(e)}`); });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    if (qty < service.min || qty > service.max) {
      return NextResponse.json(
        { error: `Quantité invalide (min: ${service.min}, max: ${service.max})` },
        { status: 400 }
      );
    }

    const charge = computeCharge(qty, service.ourRate);
    assertChargeWithinLimit(charge);

    const order = await prisma.order.create({
      data: {
        serviceId,
        link,
        quantity: qty,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: email || null,
      },
    }).catch((e: unknown) => { throw new Error(`DB_createOrder: ${e instanceof Error ? e.message : String(e)}`); });

    return NextResponse.json({ orderIds: [order.id] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? (e.stack ?? "no stack") : "no stack";
    const full = JSON.stringify(e, Object.getOwnPropertyNames(e as object));
    console.error(`CHECKOUT_ERROR | msg=${msg} | stack=${stack} | full=${full}`);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
