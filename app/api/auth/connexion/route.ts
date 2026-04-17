import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setAuthCookie } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { loginSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const parsed = loginSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    // Hash factice pour éviter le timing oracle qui révèle si l'email existe
    const hash = user?.password ?? "$2a$12$C6UzMDM.H6dfI/f/IKcEeO2eKVJtKvKmjQUJd3vLLqR0VYxY6Cd62";
    const valid = await bcrypt.compare(password, hash);

    if (!user || !valid) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    const res = NextResponse.json({ success: true, role: user.role });
    res.cookies.set(setAuthCookie(token));
    return res;
  } catch (e) {
    console.error(`LOGIN_ERROR | ${e instanceof Error ? e.message : String(e)}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
