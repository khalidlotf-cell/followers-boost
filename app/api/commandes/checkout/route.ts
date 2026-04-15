import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assertChargeWithinLimit, computeCharge } from "@/lib/pricing";

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

    const service = await prisma.service.findFirst({ where: { id: serviceId, active: true } });
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
        userId: session.id,
        serviceId,
        link,
        quantity: qty,
        charge,
        status: "PENDING_PAYMENT",
        customerEmail: session.email,
      },
    });

    return NextResponse.json({ orderIds: [order.id] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
