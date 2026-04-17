/**
 * Rate limiter in-memory (premier rempart contre bots/bruteforce).
 *
 * Limitations assumées :
 * - Sur Vercel multi-instance, chaque instance a sa propre mémoire : un
 *   attaquant distribué peut contourner. Pour une protection durable, migrer
 *   vers Upstash Redis (TODO quand volume croît).
 * - Purge périodique des entrées expirées pour éviter les fuites mémoire.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 60_000);

/**
 * @returns true si la requête est autorisée, false si rate-limitée.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

/**
 * Extrait l'IP réelle depuis les headers Vercel/Cloudflare/proxy.
 * Priorise les headers les plus fiables.
 */
export function getClientIp(req: Request): string {
  const h = req.headers;
  const cfIp = h.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  const realIp = h.get("x-real-ip");
  if (realIp) return realIp.trim();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
