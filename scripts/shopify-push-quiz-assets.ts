import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

if (!SHOP || !TOKEN) {
  console.error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_TOKEN");
  process.exit(1);
}

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
      method,
      headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429) { await sleep(2000 * (attempt + 1)); continue; }
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 400)}`);
    return text ? JSON.parse(text) : (null as T);
  }
  throw new Error("max retries");
}

async function getMainThemeId(): Promise<number> {
  const r = await shopify<{ themes: Array<{ id: number; role: string; name: string }> }>("GET", "/themes.json");
  const main = r.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme found");
  console.log(`Theme: ${main.name} (id=${main.id})`);
  return main.id;
}

async function putAsset(themeId: number, key: string, localPath: string) {
  const value = readFileSync(localPath, "utf8");
  await shopify("PUT", `/themes/${themeId}/assets.json`, { asset: { key, value } });
  console.log(`  ✓ ${key} (${(value.length / 1024).toFixed(1)}KB)`);
}

async function main() {
  const themeId = await getMainThemeId();
  const root = resolve(__dirname, "../../meta-safe/quiz");
  await putAsset(themeId, "assets/quiz.css", `${root}/assets/quiz.css`);
  await sleep(600);
  await putAsset(themeId, "assets/quiz.js",  `${root}/assets/quiz.js`);
  console.log("Done.");
}

main().catch(e => { console.error(e); process.exit(1); });
