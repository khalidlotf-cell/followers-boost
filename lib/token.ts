import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is required");
  return secret;
}

export interface Session {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: Session): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): Session | null {
  try {
    return jwt.verify(token, getJwtSecret()) as Session;
  } catch {
    return null;
  }
}
