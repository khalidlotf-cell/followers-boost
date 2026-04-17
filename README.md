# FollowersBoost (vyrlo.fr)

Panel SMM reseller — achat de followers, likes et vues pour Instagram, TikTok, YouTube, Facebook, Spotify.

## Stack

- Next.js 16 App Router
- Prisma v7 + Neon PostgreSQL
- Stripe (paiement)
- MTP / morethanpanel.com (fournisseur SMM)

## Lancer en local

```bash
npm install
npm run dev
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les clés.
`lib/env.ts` valide toutes les variables au boot (Zod) — un démarrage avec une clé manquante crash immédiatement.

## Structure

- `app/boutique/` — pages publiques de la boutique
- `app/admin/` — panel d'administration (services, commandes, utilisateurs)
- `app/api/` — routes API (webhook Stripe, MTP, auth, commandes)
- `lib/` — utilitaires (auth JWT, Stripe, client MTP, catalogue, validation Zod)
- `prisma/` — schéma et migrations PostgreSQL
