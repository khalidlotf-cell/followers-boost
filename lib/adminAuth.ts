import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Token de session dérivé du mot de passe admin — change automatiquement si le
 * mot de passe change, jamais hardcodé dans le code source.
 */
export function getAdminSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD environment variable is required");
  return crypto.createHash("sha256").update(`vyrlo_admin:${password}`).digest("hex");
}

/**
 * Vérifie le cookie admin_token. Renvoie une NextResponse 401 si invalide,
 * ou null si l'authentification est OK.
 */
export async function requireAdminAuth(): Promise<NextResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value ?? "";
    const expected = getAdminSessionToken();

    const valid = token.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));

    if (!valid) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
}
