import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/adminAuth";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true, email: true, name: true, balance: true, role: true, createdAt: true,
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { id, balance, role } = await req.json();

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(balance !== undefined && { balance }),
        ...(role !== undefined && { role }),
      },
      select: { id: true, email: true, name: true, balance: true, role: true },
    });
    return NextResponse.json(user);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
