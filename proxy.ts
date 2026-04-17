import { NextRequest, NextResponse } from "next/server";

/**
 * Vérifie un JWT admin avec l'API Web Crypto (obligatoire en middleware Edge).
 * Support HS256 uniquement — aligné avec lib/adminAuth.ts.
 */
async function verifyAdminJwt(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [headerB64, payloadB64, signatureB64] = parts;

  try {
    const header = JSON.parse(atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (header.alg !== "HS256") return false;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (payload.sub !== "admin") return false;
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigBytes = Uint8Array.from(
      atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
      c => c.charCodeAt(0)
    );
    const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);

    return await crypto.subtle.verify("HMAC", key, sigBytes, data);
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value ?? "";
    const secret = process.env.JWT_SECRET;
    const ok = !!secret && (await verifyAdminJwt(token, secret));

    if (!ok) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
