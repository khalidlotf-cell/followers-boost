import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminSessionToken } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  const expected = process.env.ADMIN_PASSWORD ?? "";
  const provided = password ?? "";

  // Comparaison résistante aux timing attacks
  const match =
    provided.length > 0 &&
    expected.length > 0 &&
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));

  if (!match) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const sessionToken = getAdminSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
