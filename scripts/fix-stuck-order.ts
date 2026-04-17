import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const MTP_URL = "https://morethanpanel.com/api/v2";
const MTP_KEY = process.env.MTP_API_KEY!;

async function mtpPost(params: Record<string, string>) {
  const body = new URLSearchParams({ key: MTP_KEY, ...params });
  const res = await fetch(MTP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return res.json();
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const orderId = process.argv[2];
  if (!orderId) {
    console.error("Usage: fix-stuck-order <orderId>");
    process.exit(1);
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { service: true },
  });
  if (!order) {
    console.error("Commande introuvable:", orderId);
    process.exit(1);
  }

  console.log("État actuel :", {
    id: order.id,
    status: order.status,
    serviceId: order.serviceId,
    serviceMin: order.service.min,
    serviceMax: order.service.max,
    quantity: order.quantity,
    link: order.link,
    charge: order.charge,
  });

  if (order.quantity < order.service.min) {
    console.error(`⚠️  Quantité ${order.quantity} < min service ${order.service.min}. MTP rejettera.`);
  }

  const mtpRes: { order?: number; error?: string } = await mtpPost({
    action: "add",
    service: String(order.serviceId),
    link: order.link,
    quantity: String(order.quantity),
  });
  console.log("Réponse MTP :", mtpRes);

  if (!mtpRes.order) {
    await prisma.order.update({ where: { id: orderId }, data: { status: "FAILED" } });
    console.log("→ Commande marquée FAILED");
  } else {
    await prisma.order.update({
      where: { id: orderId },
      data: { japOrderId: mtpRes.order, status: "PENDING" },
    });
    console.log("→ Commande envoyée au fournisseur, ID MTP :", mtpRes.order);
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
