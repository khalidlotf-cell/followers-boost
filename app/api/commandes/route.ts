import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { japAddOrder } from "@/lib/jap";

export async function GET() {
  try {
    const session = await requireAuth();
    const orders = await prisma.order.findMany({
      where: { userId: session.id },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const { serviceId, link, quantity } = await req.json();

    if (!serviceId || !link || !quantity) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({ where: { id: serviceId, active: true } });
    if (!service) {
      return NextResponse.json({ error: "Service introuvable" }, { status: 404 });
    }

    if (quantity < service.min || quantity > service.max) {
      return NextResponse.json(
        { error: `Quantité invalide (min: ${service.min}, max: ${service.max})` },
        { status: 400 }
      );
    }

    const charge = (quantity / 1000) * service.ourRate;
    const user = await prisma.user.findUnique({ where: { id: session.id } });

    if (!user || user.balance < charge) {
      return NextResponse.json({ error: "Solde insuffisant" }, { status: 402 });
    }

    // Envoyer la commande à JAP
    const japRes = await japAddOrder(serviceId, link, quantity);
    if (!japRes.order) {
      return NextResponse.json({ error: japRes.error || "Erreur JAP" }, { status: 502 });
    }

    // Débiter le solde et créer la commande
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.id },
        data: { balance: { decrement: charge } },
      }),
      prisma.order.create({
        data: {
          japOrderId: japRes.order,
          userId: session.id,
          serviceId,
          link,
          quantity,
          charge,
          status: "PENDING",
        },
      }),
      prisma.transaction.create({
        data: {
          userId: session.id,
          amount: -charge,
          type: "ORDER_PAYMENT",
          status: "COMPLETED",
          note: `Commande #${japRes.order}`,
        },
      }),
    ]);

    return NextResponse.json({ success: true, japOrderId: japRes.order });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
