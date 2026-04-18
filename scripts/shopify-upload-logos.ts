import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });
import fs from "node:fs";
import path from "node:path";

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, pth: string, body?: unknown): Promise<T> {
  await sleep(600);
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${pth}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${pth} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");

  for (const [key, file] of [
    ["assets/vyrlo-logo-light.png", "public/logo-light.png"],
    ["assets/vyrlo-logo-dark.png", "public/logo-dark.png"],
  ]) {
    const data = fs.readFileSync(path.resolve(file));
    const b64 = data.toString("base64");
    await shopify("PUT", `/themes/${main.id}/assets.json`, {
      asset: { key, attachment: b64 },
    });
    console.log(`✓ ${key} (${(data.length / 1024).toFixed(1)}KB)`);
  }
  console.log("Terminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
