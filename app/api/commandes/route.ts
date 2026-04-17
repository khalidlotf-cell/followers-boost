import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { mtpAddOrder } from "@/lib/mtp";
import { computeCharge, assertChargeWithinLimit } from "@/lib/pricing";
import { singleOrderSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

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
  let session;
  try {
    session = await requireAuth();
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Limite par utilisateur : 20 commandes wallet / 10 min (anti abus du solde)
  if (!checkRateLimit(`wallet_order:${session.id}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de commandes en peu de temps. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }
  // Et en plus une limite IP pour éviter un compte compromis spammé depuis une IP
  if (!checkRateLimit(`wallet_order_ip:${getClientIp(req)}`, 60, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  }

  const parsed = singleOrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
      { status: 400 }
    );
  }
  const { serviceId, link, quantity } = parsed.data;

  // Prisma v7 : findUnique n'accepte que les clés uniques → findFirst pour filtrer active
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

  // Débit atomique : refusé si solde insuffisant
  try {
    await prisma.user.update({
      where: { id: session.id, balance: { gte: charge } },
      data: { balance: { decrement: charge } },
    });
  } catch {
    return NextResponse.json({ error: "Solde insuffisant" }, { status: 402 });
  }

  // Appel MTP
  let mtpRes: { order?: number; error?: string };
  try {
    mtpRes = await mtpAddOrder(serviceId, link, quantity);
  } catch (e) {
    await refund(session.id, charge, "Fournisseur indisponible");
    console.error(`WALLET_ORDER_MTP_FETCH | ${e instanceof Error ? e.message : String(e)}`);
    return NextResponse.json({ error: "Fournisseur indisponible" }, { status: 502 });
  }

  if (!mtpRes.order) {
    await refund(session.id, charge, `MTP: ${mtpRes.error ?? "erreur inconnue"}`);
    return NextResponse.json({ error: mtpRes.error ?? "Erreur fournisseur" }, { status: 502 });
  }

  try {
    await prisma.$transaction([
      prisma.order.create({
        data: {
          japOrderId: mtpRes.order,
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
          note: `Commande MTP #${mtpRes.order}`,
        },
      }),
    ]);
  } catch (e) {
    // Commande déjà envoyée chez MTP mais pas enregistrée en DB : log critique
    console.error(
      `WALLET_ORDER_DB_DESYNC | user=${session.id} mtpOrder=${mtpRes.order} charge=${charge} err=${e instanceof Error ? e.message : String(e)}`
    );
    return NextResponse.json(
      { error: "Commande envoyée mais non enregistrée — contactez le support" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, japOrderId: mtpRes.order });
}

async function refund(userId: string, amount: number, reason: string) {
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } },
      }),
      prisma.transaction.create({
        data: {
          userId,
          amount,
          type: "REFUND",
          status: "COMPLETED",
          note: `Remboursement automatique : ${reason}`,
        },
      }),
    ]);
  } catch (e) {
    console.error(
      `WALLET_REFUND_FAILED | user=${userId} amount=${amount} reason=${reason} err=${e instanceof Error ? e.message : String(e)}`
    );
  }
}
