import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATALOG, getPlatform, matchService } from "../lib/catalog";

/**
 * Migration catalogue MTP → Shopify.
 *
 * Un produit Shopify par (plateforme × groupe) — ex: "Abonnés Instagram".
 * Variantes = Ciblage × Quantité. Chaque variante porte un metafield mtp_service_id
 * et mtp_quantity pour que le webhook orders/paid sache quoi commander chez MTP.
 *
 * Usage :
 *   npx tsx scripts/migrate-services-to-shopify.ts [--dry-run] [--only=instagram]
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

// ── Quantités par groupe (calquées sur vyrlo.fr PlatformPageClient) ──────────
const QUANTITIES: Record<string, number[]> = {
  instagram_abonnes:        [1000, 2000, 5000, 10000, 25000, 50000, 100000],
  instagram_likes:          [1000, 2000, 5000, 10000],
  instagram_vues:           [1000, 2500, 5000, 10000, 25000, 50000, 100000],
  instagram_commentaires:   [5, 10, 25, 50, 100, 250, 500],
  tiktok_abonnes:           [1000, 2000, 5000, 10000, 25000, 50000],
  tiktok_likes:             [1000, 2000, 5000, 10000],
  tiktok_vues:              [1000, 2500, 5000, 10000, 25000, 50000, 100000],
  tiktok_enregistrements:   [1000, 2000, 5000, 10000],
  tiktok_partages:          [1000, 2000, 5000, 10000],
  tiktok_commentaires:      [5, 10, 25, 50, 100, 250, 500],
  youtube_abonnes:          [1000, 2000, 5000, 10000],
  youtube_likes:            [100, 250, 1000, 5000, 10000],
  youtube_vues:             [1000, 2500, 5000, 10000, 25000, 100000],
  youtube_commentaires:     [5, 10, 25, 50, 100, 250, 500],
  facebook_abonnes:         [1000, 2000, 5000, 10000],
  facebook_likes:           [100, 250, 1000, 5000, 10000],
  facebook_vues:            [1000, 2500, 5000, 10000, 50000],
  spotify_auditeurs:        [500, 1000, 5000, 10000, 25000, 50000],
  spotify_abonnes:          [500, 1000, 5000, 10000],
  twitter_abonnes:          [100, 250, 1000, 5000, 10000],
  twitter_likes:            [100, 250, 1000, 5000, 10000],
  twitter_retweets:         [100, 250, 1000, 5000, 10000],
  threads_likes:            [100, 250, 1000, 5000, 10000],
  threads_abonnes:          [100, 250, 1000, 5000, 10000],
};

const TARGETING_LABELS: Record<string, string> = {
  world:  "Monde",
  france: "France",
  europe: "Europe",
};

// Descriptions SEO-friendly par groupe (copiées de vyrlo.fr)
const GROUP_DESCRIPTIONS: Record<string, string> = {
  abonnes: `<p><strong>Livraison progressive et naturelle.</strong> Nos abonnés sont livrés progressivement pour imiter une croissance organique — aucun risque pour votre compte.</p>
<ul>
  <li>Démarrage sous 12h après le paiement</li>
  <li>Aucun mot de passe requis — juste votre lien public</li>
  <li>Ciblage France disponible pour des abonnés francophones</li>
  <li>Support 7j/7 en français · Remboursement garanti si non livré</li>
</ul>`,
  likes: `<p><strong>Des likes de qualité pour booster votre engagement.</strong> Livraison rapide et progressive, adaptée à l'algorithme de la plateforme.</p>
<ul>
  <li>Démarrage sous 1h · Livraison sur quelques heures</li>
  <li>Profils réels, engagement naturel</li>
  <li>Remboursement garanti si non livré</li>
</ul>`,
  vues: `<p><strong>Boostez la visibilité de votre vidéo.</strong> Des vues de qualité qui comptent pour l'algorithme et améliorent votre classement.</p>
<ul>
  <li>Démarrage sous 1h</li>
  <li>Livraison stable — aucune chute</li>
  <li>Idéal pour déclencher l'algorithme (FYP, suggestions, etc.)</li>
</ul>`,
  commentaires: `<p><strong>Commentaires personnalisés ou custom</strong> pour crédibiliser votre publication et encourager l'engagement réel de votre audience.</p>`,
  partages: `<p><strong>Augmentez la portée virale</strong> de votre publication avec des partages de qualité.</p>`,
  enregistrements: `<p><strong>Les enregistrements (saves)</strong> sont un signal fort pour l'algorithme TikTok — boostez la distribution de votre vidéo.</p>`,
  retweets: `<p><strong>Amplifiez votre message sur Twitter/X</strong> avec des retweets livrés progressivement.</p>`,
  auditeurs: `<p><strong>Auditeurs mensuels Spotify</strong> de qualité pour booster la visibilité de votre musique et améliorer votre classement.</p>`,
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  // Throttle baseline : Shopify autorise 2 req/s, on reste en dessous
  await sleep(600);
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
      method,
      headers: {
        "X-Shopify-Access-Token": TOKEN!,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("retry-after") ?? "2");
      const backoff = Math.max(retryAfter * 1000, 2000 * (attempt + 1));
      console.log(`    (429, retry dans ${backoff}ms)`);
      await sleep(backoff);
      continue;
    }
    const text = await res.text();
    if (!res.ok) throw new Error(`Shopify ${method} ${path} ${res.status} ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error(`Shopify ${method} ${path} — abandonné après 5 tentatives (429)`);
}

interface MtpService {
  id: number;
  name: string;
  category: string;
  ourRate: number;
  min: number;
  max: number;
  targeting: string;
  platformSlug: string | null;
  groupSlug: string | null;
  active: boolean;
}

function formatQty(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000) return `${n / 1_000}K`;
  return String(n);
}

function getQuantities(platformSlug: string, groupSlug: string): number[] {
  const key = `${platformSlug}_${groupSlug}`;
  return QUANTITIES[key] ?? [1000, 2000, 5000, 10000];
}

function priceFor(service: MtpService, quantity: number): string {
  return ((quantity / 1000) * service.ourRate).toFixed(2);
}

/**
 * Pour un (plateforme, groupe) donné, retourne les services MTP regroupés par targeting,
 * en prenant le moins cher de chaque targeting (= même logique que PlatformPageClient).
 */
function pickServicesByTargeting(
  services: MtpService[],
  platformSlug: string,
  groupSlug: string
): Record<string, MtpService> {
  const candidates = services.filter(s => {
    if (s.platformSlug === platformSlug && s.groupSlug === groupSlug) return true;
    // fallback keyword-based (même règle que app/api/boutique/[platform]/route.ts)
    if (s.platformSlug || s.groupSlug) return false;
    return matchService(s.category, s.name, groupSlug, platformSlug);
  });

  const byTargeting: Record<string, MtpService> = {};
  for (const target of ["world", "france", "europe"]) {
    const forTarget = candidates
      .filter(s => s.targeting === target)
      .sort((a, b) => a.ourRate - b.ourRate);
    if (forTarget[0]) byTargeting[target] = forTarget[0];
  }
  return byTargeting;
}

interface VariantPayload {
  option1: string;
  option2?: string;
  price: string;
  sku: string;
  inventory_management: null;
  requires_shipping: false;
  taxable: true;
  inventory_policy: "continue";
  _mtpServiceId: number;
  _mtpQuantity: number;
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL!.trim() });
  const prisma = new PrismaClient({ adapter });

  const services = (await prisma.service.findMany({ where: { active: true } })) as MtpService[];
  console.log(`→ ${services.length} services MTP actifs chargés`);
  if (dryRun) console.log("  [dry-run — aucune modification Shopify]");

  const platforms = onlyPlatform
    ? CATALOG.filter(p => p.slug === onlyPlatform)
    : CATALOG;

  let created = 0;
  let skipped = 0;

  for (const platform of platforms) {
    console.log(`\n━━━ ${platform.label} ━━━`);

    for (const group of platform.services) {
      const byTargeting = pickServicesByTargeting(services, platform.slug, group.slug);
      const targetings = Object.keys(byTargeting);

      if (targetings.length === 0) {
        console.warn(`  skip ${platform.slug}/${group.slug} — aucun service MTP trouvé`);
        skipped++;
        continue;
      }

      const qtys = getQuantities(platform.slug, group.slug);
      const hasMultipleTargetings = targetings.length > 1;

      const variants: VariantPayload[] = [];
      for (const targeting of targetings) {
        const svc = byTargeting[targeting];
        const validQtys = qtys.filter(q => q >= svc.min && q <= svc.max);
        if (validQtys.length === 0) continue;

        for (const q of validQtys) {
          variants.push({
            option1: formatQty(q),
            option2: hasMultipleTargetings ? TARGETING_LABELS[targeting] : undefined,
            price: priceFor(svc, q),
            sku: `VYR-${platform.slug}-${group.slug}-${targeting}-${q}`,
            inventory_management: null,
            requires_shipping: false,
            taxable: true,
            inventory_policy: "continue",
            _mtpServiceId: svc.id,
            _mtpQuantity: q,
          });
        }
      }

      if (variants.length === 0) {
        console.warn(`  skip ${platform.slug}/${group.slug} — aucune variante valide`);
        skipped++;
        continue;
      }

      // Shopify limite à 100 variantes par produit
      if (variants.length > 100) {
        console.warn(`  ${platform.slug}/${group.slug} a ${variants.length} variantes → tronqué à 100`);
        variants.length = 100;
      }

      const title = `${group.label} ${platform.label}`;
      const body_html = (GROUP_DESCRIPTIONS[group.slug] ?? "") +
        `<p><em>Service Vyrlo — livraison automatique après paiement.</em></p>`;

      const options = hasMultipleTargetings
        ? [{ name: "Quantité" }, { name: "Ciblage" }]
        : [{ name: "Quantité" }];

      const productPayload = {
        product: {
          title,
          body_html,
          vendor: "Vyrlo",
          product_type: `${platform.label} ${group.label}`,
          tags: [platform.slug, group.slug, "vyrlo"].join(", "),
          status: "draft",
          options,
          variants: variants.map(v => {
            const clean: Record<string, unknown> = {
              option1: v.option1,
              price: v.price,
              sku: v.sku,
              inventory_management: v.inventory_management,
              requires_shipping: v.requires_shipping,
              taxable: v.taxable,
              inventory_policy: v.inventory_policy,
            };
            if (v.option2) clean.option2 = v.option2;
            return clean;
          }),
        },
      };

      if (dryRun) {
        const preview = variants.slice(0, 3).map(v =>
          `${v.option1}${v.option2 ? `·${v.option2}` : ""} ${v.price}€`
        ).join(", ");
        console.log(
          `  [dry] "${title}" — ${variants.length} variantes (${preview}${variants.length > 3 ? ", …" : ""})`
        );
        created++;
        continue;
      }

      try {
        const r = await shopify<{ product: { id: number; handle: string; variants: { id: number; option1: string; option2?: string }[] } }>(
          "POST",
          "/products.json",
          productPayload
        );
        console.log(`  ✓ "${title}" → produit ${r.product.id} (${r.product.handle}) avec ${r.product.variants.length} variantes`);

        // Écriture des metafields variante pour router vers MTP depuis le webhook
        for (const retVar of r.product.variants) {
          const match = variants.find(v =>
            v.option1 === retVar.option1 && (v.option2 ?? undefined) === (retVar.option2 ?? undefined)
          );
          if (!match) continue;
          try {
            await shopify("POST", `/variants/${retVar.id}/metafields.json`, {
              metafield: { namespace: "custom", key: "mtp_service_id", value: String(match._mtpServiceId), type: "number_integer" },
            });
            await shopify("POST", `/variants/${retVar.id}/metafields.json`, {
              metafield: { namespace: "custom", key: "mtp_quantity", value: String(match._mtpQuantity), type: "number_integer" },
            });
          } catch (e) {
            console.error(`    ⚠ metafield variante ${retVar.id}: ${e instanceof Error ? e.message : String(e)}`);
          }
        }

        created++;
      } catch (e) {
        console.error(`  ✗ "${title}": ${e instanceof Error ? e.message : String(e)}`);
        skipped++;
      }
    }
  }

  console.log(`\nTerminé. Créés: ${created}, skippés: ${skipped}`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
