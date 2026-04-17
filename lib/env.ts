import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL requis").transform(v => v.trim()),
  JWT_SECRET: z.string().min(32, "JWT_SECRET doit faire au moins 32 caractères"),
  ADMIN_PASSWORD: z.string().min(12, "ADMIN_PASSWORD doit faire au moins 12 caractères"),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_", "STRIPE_SECRET_KEY invalide"),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_", "STRIPE_WEBHOOK_SECRET invalide"),
  MTP_API_KEY: z.string().min(16, "MTP_API_KEY requis"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_SITE_URL requis")
    .transform(v => v.trim())
    .refine(v => /^https?:\/\//.test(v), "NEXT_PUBLIC_SITE_URL doit commencer par http(s)://"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

type Env = z.infer<typeof schema>;

let cached: Env | null = null;

/**
 * Renvoie les env vars validées. Crash au premier appel si invalides.
 * Les valeurs sont nettoyées (trim) pour éviter les pièges du type "espace
 * parasite dans Vercel" qui cassait Stripe "Not a valid URL".
 */
export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Configuration d'environnement invalide :\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}
