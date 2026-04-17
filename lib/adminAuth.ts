import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "./env";

const ADMIN_COOKIE = "admin_token";
const ADMIN_TTL_SECONDS = 60 * 60 * 8; // 8h

interface AdminSession {
  sub: "admin";
}

/** Signe un JWT admin à courte durée. */
export function signAdminToken(): string {
  const payload: AdminSession = { sub: "admin" };
  return jwt.sign(payload, env().JWT_SECRET, { expiresIn: ADMIN_TTL_SECONDS });
}

/** Retourne la config cookie à utiliser avec res.cookies.set(...). */
export function adminCookieOptions() {
  return {
    name: ADMIN_COOKIE,
    value: signAdminToken(),
    httpOnly: true,
    secure: env().NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: ADMIN_TTL_SECONDS,
    path: "/",
  };
}

export function clearAdminCookie() {
  return { name: ADMIN_COOKIE, value: "", maxAge: 0, path: "/" };
}

/** Renvoie true si le JWT admin est valide, non expiré. */
export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, env().JWT_SECRET) as AdminSession;
    return decoded?.sub === "admin";
  } catch {
    return false;
  }
}

/**
 * Pour les routes API : renvoie une 401 si l'auth admin échoue, sinon null.
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return null;
}
