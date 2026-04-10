import { NextRequest, NextResponse } from "next/server";

const ADMIN_SESSION_TOKEN = "fb_admin_ok";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protection admin par token de session
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== ADMIN_SESSION_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Protection API admin
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth") {
    const adminToken = req.cookies.get("admin_token")?.value;
    if (adminToken !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
