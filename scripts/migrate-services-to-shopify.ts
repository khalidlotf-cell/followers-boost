import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * One-shot : pousse la table Service (MTP) vers Shopify en tant que produits.
 *
 * Utilisation :
 *   npx tsx scripts/migrate-services-to-shopify.ts [--dry-run] [--only=instagram]
 *
 * Requis en env : SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN
 *
 * Stratégie :
 *   - Un produit Shopify par Service MTP actif
 *   - Title = service.name
 *   - Vendor = "MTP", product_type = service.category
 *   - Variante unique, prix = service.ourRate × (quantity / 1000)
 *   - Metafield "custom.mtp_service_id" = service.id (permet au webhook de router)
 *   - Tag = service.platformSlug pour le filtrage boutique
 *
 * NB : le prix n'a de sens que si on définit une quantité fixe par variante.
 * Par défaut on crée des variantes "starter" = min, "1K", "5K", "10K" selon les bornes.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!SHOP || !TOKEN) {
  console.error("SHOPIFY_STORE_DOMAIN et SHOPIFY_ADMIN_TOKEN requis dans .env.local");
  process.exit(1);
}

const dryRun = process.argv.includes("--dry-run");
const onlyArg = process.argv.find(a => a.startsWith("--only="));
const onlyPlatform = onlyArg ? onlyArg.slice("--only=".length) : null;

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: {
      "X-Shopify-Access-Token": TOKEN!,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Shopify ${method} ${path} ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : (null as T);
}

interface MtpService {
  id: number;
  name: string;
  category: string;
  ourRate: number;
  min: number;
  max: number;
  platformSlug: string;
  groupSlug: string;
}

function buildQuantityTiers(service: MtpService): number[] {
  const tiers = [service.min, 1000, 5000, 10000, 25000].filter(q => q >= service.min && q <= service.max);
  return [...new Set(tiers)].sort((a, b) => a - b);
}

function priceFor(service: MtpService, quantity: number): string {
  return ((quantity / 1000) * service.ourRate).toFixed(2);
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL!.trim() });
  const prisma = new PrismaClient({ adapter });

  const where = onlyPlatform
    ? { active: true, platformSlug: onlyPlatform }
    : { active: true };
  const services = (await prisma.service.findMany({ where })) as MtpService[];
  console.log(`→ ${services.length} services MTP actifs${onlyPlatform ? ` (plateforme ${onlyPlatform})` : ""}`);
  if (dryRun) console.log("  [dry-run — aucune modification Shopify]");

  let created = 0;
  let skipped = 0;

  for (const s of services) {
    const tiers = buildQuantityTiers(s);
    if (tiers.length === 0) {
      console.warn(`  skip ${s.id} — aucun palier valide`);
      skipped++;
      continue;
    }

    const variants = tiers.map(q => ({
      option1: `${q.toLocaleString("fr-FR")} unités`,
      price: priceFor(s, q),
      sku: `MTP-${s.id}-${q}`,
      inventory_management: null,
      requires_shipping: false,
      taxable: true,
    }));

    const productPayload = {
      product: {
        title: s.name,
        body_html: `<p>${s.name} — ${s.category}</p>`,
        vendor: "MTP",
        product_type: s.category,
        tags: [s.platformSlug, s.groupSlug].filter(Boolean).join(", "),
        status: "draft", // on les passe en "active" en masse après review
        options: [{ name: "Quantité" }],
        variants,
        metafields: [
          {
            namespace: "custom",
            key: "mtp_service_id",
            value: String(s.id),
            type: "number_integer",
          },
        ],
      },
    };

    if (dryRun) {
      console.log(`  [dry] ${s.id} "${s.name}" — ${tiers.length} variantes ${tiers.join("/")}`);
      created++;
      continue;
    }

    try {
      const r = await shopify<{ product: { id: number; handle: string } }>(
        "POST",
        "/products.json",
        productPayload
      );
      console.log(`  ✓ ${s.id} → ${r.product.id} (${r.product.handle})`);
      created++;
    } catch (e) {
      console.error(`  ✗ ${s.id}: ${e instanceof Error ? e.message : String(e)}`);
      skipped++;
    }
  }

  console.log(`\nTerminé. Créés: ${created}, skippés: ${skipped}`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
