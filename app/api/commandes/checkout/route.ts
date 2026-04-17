import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assertChargeWithinLimit, computeCharge } from "@/lib/pricing";
import { singleOrderSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  let session;
  try {
    session = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const parsed = singleOrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
      { status: 400 }
    );
  }
  const { serviceId, link, quantity } = parsed.data;

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
  try {
    assertChargeWithinLimit(charge);
  } catch {
    return NextResponse.json({ error: "Montant hors limites" }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      userId: session.id,
      serviceId,
      link,
      quantity,
      charge,
      status: "PENDING_PAYMENT",
      customerEmail: session.email,
    },
  });

  return NextResponse.json({ orderIds: [order.id] });
}
