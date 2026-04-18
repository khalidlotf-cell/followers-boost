import dotenv from "dotenv";
import http from "node:http";
// Charger .env.local EN PREMIER (prioritaire), puis .env pour compléter.
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import crypto from "node:crypto";
import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Récupère un Admin API access token via le flow OAuth de Shopify.
 *
 * Préréquis dans .env.local :
 *   SHOPIFY_STORE_DOMAIN     ex: 8snnsx-2p.myshopify.com
 *   SHOPIFY_CLIENT_ID        Client ID de l'app (dev dashboard → Settings)
 *   SHOPIFY_CLIENT_SECRET    Client Secret de l'app (idem, à révéler)
 *
 * Préréquis côté app Shopify :
 *   - Redirect URL = http://localhost:3456/callback
 *   - Scopes configurés sur la version active
 *
 * Usage :
 *   npx tsx scripts/shopify-get-token.ts
 *
 * Résultat : écrit SHOPIFY_ADMIN_TOKEN=shpat_... dans .env.local
 */

const SHOP = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID?.trim();
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET?.trim();
const PORT = 3456;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = [
  "read_products", "write_products",
  "read_orders", "write_orders",
  "read_product_listings",
  "read_fulfillments", "write_fulfillments",
  "read_themes", "write_themes",
  "read_content", "write_content",
].join(",");

if (!SHOP || !CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Il manque SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID ou SHOPIFY_CLIENT_SECRET dans .env.local");
  process.exit(1);
}

const state = crypto.randomBytes(16).toString("hex");
const authUrl =
  `https://${SHOP}/admin/oauth/authorize` +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&state=${state}` +
  `&grant_options[]=value`; // offline token

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400); res.end(); return;
  }
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404); res.end("Not found"); return;
  }

  const returnedState = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const shop = url.searchParams.get("shop");

  if (returnedState !== state) {
    res.writeHead(400); res.end("State mismatch (CSRF?)");
    console.error("❌ State mismatch");
    process.exit(1);
  }
  if (!code) {
    res.writeHead(400); res.end("No code");
    console.error("❌ Pas de code reçu");
    process.exit(1);
  }

  // Shopify vérifie aussi que shop matche
  if (shop && shop !== SHOP) {
    res.writeHead(400); res.end("Shop mismatch");
    console.error(`❌ Shop mismatch : reçu ${shop}, attendu ${SHOP}`);
    process.exit(1);
  }

  try {
    const tokenRes = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    });
    const data = (await tokenRes.json()) as { access_token?: string; scope?: string; error?: string };

    if (!data.access_token) {
      throw new Error(`Échec : ${data.error ?? JSON.stringify(data)}`);
    }

    // Écrit / met à jour .env.local
    const envPath = path.join(process.cwd(), ".env.local");
    let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
    if (/^SHOPIFY_ADMIN_TOKEN=.*/m.test(content)) {
      content = content.replace(/^SHOPIFY_ADMIN_TOKEN=.*/m, `SHOPIFY_ADMIN_TOKEN=${data.access_token}`);
    } else {
      content += `\nSHOPIFY_ADMIN_TOKEN=${data.access_token}\n`;
    }
    fs.writeFileSync(envPath, content);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!doctype html><meta charset=utf-8><h1>✓ Token sauvegardé dans .env.local</h1><p>Tu peux fermer cette fenêtre et retourner dans Claude Code.</p><p>Scope : <code>${data.scope ?? "?"}</code></p>`);

    console.log(`\n✓ SHOPIFY_ADMIN_TOKEN sauvegardé dans .env.local`);
    console.log(`  Scope accordé : ${data.scope ?? "?"}`);
    setTimeout(() => process.exit(0), 300);
  } catch (e) {
    res.writeHead(500); res.end(`Erreur : ${e instanceof Error ? e.message : String(e)}`);
    console.error("❌", e);
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`→ Serveur local sur http://localhost:${PORT}`);
  console.log(`→ Ouverture du navigateur pour autoriser l'app...\n`);
  console.log(`   (si ça ne s'ouvre pas, copie cette URL dans ton navigateur :)\n   ${authUrl}\n`);
  exec(`open "${authUrl}"`);
});
