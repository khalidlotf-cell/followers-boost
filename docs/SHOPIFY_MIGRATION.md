# Migration Shopify — Guide pas à pas

Ce backend Vercel reste le "cerveau" : il reçoit les webhooks Shopify et appelle MTP. Shopify s'occupe juste de la vitrine + checkout.

## Architecture

```
Client → Shopify (catalogue + checkout) → webhook orders/paid → Vercel → MTP /add
                                                                    ↑
                                                   Vercel Cron (15 min) ← MTP /status
                                                                    ↓
                                                     fulfill la commande Shopify
```

## Prérequis côté Shopify

1. Boutique créée sur `vyrlo.myshopify.com`
2. **Shopify Payments activé et approuvé pour ton activité SMM** (étape bloquante)
3. App custom créée via **Settings → Apps and sales channels → Develop apps**, avec ces scopes :
   - `read_products`, `write_products`
   - `read_orders`, `write_orders`
   - `read_merchandise`, `write_merchandise` (pour les metafields)
   - `write_fulfillments`, `read_fulfillments`
4. Token `shpat_...` récupéré
5. Line-item property "Lien" activée sur les produits (via code thème ou app type Globo Product Options)

## Variables d'environnement à ajouter dans Vercel

```
SHOPIFY_STORE_DOMAIN=vyrlo.myshopify.com
SHOPIFY_ADMIN_TOKEN=shpat_...
SHOPIFY_WEBHOOK_SECRET=...        # copié depuis Shopify → Settings → Notifications → "Your webhooks will be signed with"
CRON_SECRET=...                   # token aléatoire (openssl rand -hex 32)
```

## Étapes dans l'ordre

### 1. Migration DB (nouvelle table + colonne)

```bash
npx prisma migrate deploy
```

Ajoute `Order.shopifyOrderId` et la table `ProcessedShopifyEvent`.

### 2. Migration du catalogue MTP → produits Shopify

```bash
# Dry-run d'abord pour voir ce qui va être créé
npx tsx scripts/migrate-services-to-shopify.ts --dry-run

# Par plateforme, une par une (plus safe)
npx tsx scripts/migrate-services-to-shopify.ts --only=instagram
npx tsx scripts/migrate-services-to-shopify.ts --only=tiktok
# ... etc.
```

Chaque service MTP devient un produit Shopify avec :
- Variantes = paliers de quantité (min, 1K, 5K, 10K, 25K)
- Metafield `custom.mtp_service_id` = id du service MTP (permet au webhook de router)
- Status = `draft` → tu review manuellement puis tu passes en `active`

### 3. Configurer la line-item property "Lien"

Le webhook lit `item.properties[name="Lien"]`. Deux options :

- **App tierce** : Globo Product Options (~10€/mois), champ "Lien" obligatoire
- **Code thème** : ajouter un `<input name="properties[Lien]" required>` dans le form `product.liquid`

### 4. Enregistrer le webhook Shopify

```bash
npx tsx scripts/register-shopify-webhooks.ts
```

Crée le webhook `orders/paid` pointant vers `https://vyrlo.fr/api/webhooks/shopify/orders-paid`.

### 5. Copier le secret webhook dans Vercel

Shopify Admin → Settings → Notifications → scroll en bas → "Your webhooks will be signed with" → copier dans `SHOPIFY_WEBHOOK_SECRET`.

### 6. Tester en mode test

- Activer le gateway "Bogus" de Shopify (Settings → Payments → Manage → Test mode)
- Passer une commande de test avec un lien fictif
- Vérifier dans Vercel logs que le webhook arrive et que l'ordre MTP part
- Vérifier dans Shopify que la commande a le metafield `custom.mtp_order_id`

### 7. Générer les redirects SEO

```bash
npx tsx scripts/generate-shopify-redirects.ts
# Sortie : tmp/shopify-redirects.csv
```

Shopify Admin → Marketing → URL Redirects → Import → upload le CSV.

### 8. Cron de sync

Dès le premier deploy Vercel avec le nouveau `vercel.json`, le cron `/api/cron/sync-mtp` tourne toutes les 15 min. Vérifier dans Vercel → Cron Jobs.

### 9. Bascule DNS

Quand tout marche en test :
1. Shopify Admin → Settings → Domains → Connect existing domain → `vyrlo.fr`
2. Mettre à jour le DNS OVH (ou autre) selon les instructions Shopify
3. Déployer une dernière version Next.js avec le webhook Shopify actif **avant** de basculer

## Fichiers impliqués

| Fichier | Rôle |
|---|---|
| `app/api/webhooks/shopify/orders-paid/route.ts` | Reçoit la commande payée, appelle MTP |
| `app/api/cron/sync-mtp/route.ts` | Cron 15 min, update statut + fulfill Shopify |
| `lib/shopify.ts` | Client Admin API + HMAC + metafields |
| `lib/mtp.ts` | Client MTP (réutilisé tel quel) |
| `scripts/migrate-services-to-shopify.ts` | Pousse le catalogue MTP → produits Shopify |
| `scripts/register-shopify-webhooks.ts` | Enregistre les webhooks |
| `scripts/generate-shopify-redirects.ts` | Génère le CSV redirects SEO |
| `vercel.json` | Config du cron |

## Risques / pièges connus

- **Shopify Payments peut refuser l'activité SMM** → tester avant tout le reste.
- **Metafield `mtp_service_id` manquant sur un produit** → commande silencieusement ignorée, à monitorer dans les logs.
- **Double webhook Shopify** → couvert par `ProcessedShopifyEvent` (PK unique sur `x-shopify-webhook-id`).
- **Line-item property "Lien" absent** → log + skip ; le client reçoit l'email Shopify "commande reçue" mais rien chez MTP → prévoir alerting.
- **API MTP en panne** → commande marquée `FAILED` en DB, à rejouer avec `scripts/fix-stuck-order.ts` (mais celui-ci cherche par `orderId` Next.js, pas Shopify — à adapter si besoin).
