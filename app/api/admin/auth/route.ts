import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { adminCookieOptions, clearAdminCookie } from "@/lib/adminAuth";
import { env } from "@/lib/env";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Brute-force : 5 tentatives / 15 min par IP
  const ip = getClientIp(req);
  if (!checkRateLimit(`admin_login:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  const { password } = await req.json().catch(() => ({ password: "" }));

  const expected = env().ADMIN_PASSWORD;
  const provided = typeof password === "string" ? password : "";

  const match =
    provided.length > 0 &&
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));

  if (!match) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const opts = adminCookieOptions();
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    maxAge: opts.maxAge,
    path: opts.path,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  const c = clearAdminCookie();
  res.cookies.set(c.name, c.value, { maxAge: c.maxAge, path: c.path });
  return res;
}
