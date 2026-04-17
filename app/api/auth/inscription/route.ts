import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { registerSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`register:${ip}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  try {
    const parsed = registerSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Données invalides" },
        { status: 400 }
      );
    }
    const { email, name, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, name, password: hashed },
    });

    const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ success: true });
    res.cookies.set(setAuthCookie(token));
    return res;
  } catch (e) {
    console.error(`REGISTER_ERROR | ${e instanceof Error ? e.message : String(e)}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
