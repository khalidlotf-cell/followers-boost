import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id },
    select: { id: true, status: true, quantity: true, charge: true, createdAt: true, service: { select: { name: true } } },
  });

  if (!order) return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });

  return NextResponse.json(order);
}
