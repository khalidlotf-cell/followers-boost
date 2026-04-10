# FollowersBoost

Panel SMM reseller — achat de followers, likes et vues pour Instagram, TikTok, YouTube, Facebook, Spotify.

## Stack

- Next.js 16 App Router
- Prisma + SQLite
- Stripe (paiement)
- JAP API (fournisseur SMM)

## Lancer en local

```bash
npm install
npm run dev
```

## Variables d'environnement

Copier `.env.example` en `.env` et remplir les clés.

## Structure

- `app/boutique/` — pages publiques de la boutique
- `app/admin/` — panel d'administration (services, commandes, utilisateurs)
- `app/api/` — routes API
- `lib/` — utilitaires (auth, Stripe, JAP, catalogue)
- `prisma/` — schéma et migrations
