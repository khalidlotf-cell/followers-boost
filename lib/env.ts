import { z } from "zod";

const coreSchema = z.object({
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

const shopifySchema = z.object({
  SHOPIFY_STORE_DOMAIN: z
    .string()
    .trim()
    .regex(/\.myshopify\.com$/, 'SHOPIFY_STORE_DOMAIN doit se terminer par ".myshopify.com"'),
  SHOPIFY_ADMIN_TOKEN: z.string().startsWith("shpat_", "SHOPIFY_ADMIN_TOKEN invalide"),
  SHOPIFY_WEBHOOK_SECRET: z.string().min(16, "SHOPIFY_WEBHOOK_SECRET requis"),
  CRON_SECRET: z.string().min(16, "CRON_SECRET requis (token d'auth pour Vercel Cron)"),
});

type CoreEnv = z.infer<typeof coreSchema>;
type ShopifyEnv = z.infer<typeof shopifySchema>;

let cachedCore: CoreEnv | null = null;
let cachedShopify: ShopifyEnv | null = null;

/**
 * Env vars cœur — validées au 1er appel. Les valeurs sont trim()-ées pour éviter
 * les espaces parasites (piège Vercel qui a cassé Stripe "Not a valid URL").
 */
export function env(): CoreEnv {
  if (cachedCore) return cachedCore;
  const parsed = coreSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Configuration d'environnement invalide :\n${issues}`);
  }
  cachedCore = parsed.data;
  return cachedCore;
}

/**
 * Env Shopify — appelée uniquement depuis les routes liées à Shopify.
 * Non-requise pour faire tourner le reste de l'app pendant la phase de migration.
 */
export function shopifyEnv(): ShopifyEnv {
  if (cachedShopify) return cachedShopify;
  const parsed = shopifySchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Configuration Shopify invalide :\n${issues}`);
  }
  cachedShopify = parsed.data;
  return cachedShopify;
}
