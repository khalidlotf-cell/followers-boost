import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await requireAuth();
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { balance: true },
    });
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ balance: user?.balance ?? 0, transactions });
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
}
