import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { japAddOrder } from "@/lib/jap";

const WHOP_WEBHOOK_SECRET = process.env.WHOP_WEBHOOK_SECRET!;

function verifySignature(payload: string, signature: string): boolean {
  if (!WHOP_WEBHOOK_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", WHOP_WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature.replace("sha256=", ""), "hex")
    );
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-whop-signature") || "";

    if (!verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: "Signature invalide" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.action !== "payment.completed") {
      return NextResponse.json({ received: true });
    }

    const { id: whopPaymentId, metadata } = event.data;
    const orderId = metadata?.order_id;

    if (!orderId) {
      return NextResponse.json({ error: "order_id manquant dans metadata" }, { status: 400 });
    }

    // Vérifier que la commande existe et est bien en attente de paiement
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { service: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    if (order.status !== "PENDING_PAYMENT") {
      // Déjà traitée (doublon webhook)
      return NextResponse.json({ received: true });
    }

    // Envoyer la commande à JAP
    const japRes = await japAddOrder(order.serviceId, order.link, order.quantity);

    if (!japRes.order) {
      // Paiement reçu mais JAP a échoué — on marque FAILED pour investigation
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "FAILED" },
      });
      console.error("JAP order failed after payment:", japRes);
      return NextResponse.json({ received: true });
    }

    // Tout s'est bien passé — mettre à jour la commande
    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          japOrderId: japRes.order,
          status: "PENDING",
        },
      }),
      prisma.transaction.create({
        data: {
          userId: order.userId ?? undefined,
          amount: order.charge,
          type: "ORDER_PAYMENT",
          status: "COMPLETED",
          whopId: whopPaymentId,
          note: `Commande JAP #${japRes.order} — ${order.service.name}`,
        },
      }),
    ]);

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Whop webhook error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
