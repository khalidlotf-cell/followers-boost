import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { signToken, verifyToken } from "./token";

export type { Session } from "./token";
export { signToken, verifyToken };

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fb_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Non authentifié");
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== "ADMIN") throw new Error("Accès refusé");
  return session;
}

export function setAuthCookie(token: string) {
  return {
    name: "fb_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  };
}

export function clearAuthCookie() {
  return {
    name: "fb_token",
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  };
}

export async function getUserFromSession() {
  const session = await getSession();
  if (!session) return null;
  return prisma.user.findUnique({ where: { id: session.id } });
}
