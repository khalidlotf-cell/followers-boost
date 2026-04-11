import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function getAdminSessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return crypto.createHash("sha256").update(`vyrlo_admin:${password}`).digest("hex");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value ?? "";
    const expected = getAdminSessionToken();

    const valid =
      expected !== null &&
      token.length === expected.length &&
      (() => {
        try {
          return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
        } catch {
          return false;
        }
      })();

    if (!valid) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
