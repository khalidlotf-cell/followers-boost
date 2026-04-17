import jwt from "jsonwebtoken";
import { env } from "./env";

function getJwtSecret(): string {
  return env().JWT_SECRET;
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
