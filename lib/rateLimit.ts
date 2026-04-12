/**
 * Rate limiter in-memory simple.
 * Suffisant pour bloquer les bots basiques sur Vercel.
 * (Chaque instance serverless a sa propre mémoire — protège contre les attaques
 *  concentrées sur une même instance. Pour une protection distribuée, utiliser Upstash Redis.)
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Nettoyage périodique pour éviter les fuites mémoire
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 60_000);

/**
 * @param ip        Identifiant du client (IP ou autre)
 * @param limit     Nombre max de requêtes dans la fenêtre
 * @param windowMs  Durée de la fenêtre en ms
 * @returns true si la requête est autorisée, false si rate-limitée
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

/** Extrait l'IP réelle depuis les headers Vercel/proxy */
export function getClientIp(req: Request): string {
  const forwarded = (req as unknown as { headers: Headers }).headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
