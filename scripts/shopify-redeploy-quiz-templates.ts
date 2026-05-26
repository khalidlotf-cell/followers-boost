import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

dotenv.config({ path: ".env.local" });

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API = "2025-10";
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Mapping: nom plateforme → handle du template Shopify
const TEMPLATES = [
  "page.quiz-insta",
  "page.quiz-tiktok",
  "page.quiz-yt",
  "page.quiz-telegram",
  "page.quiz-twitter",
  "page.quiz-spotify",
  "page.quiz-facebook",
];

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://${SHOP}/admin/api/${API}${path}`, {
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

async function main() {
  const themes = await shopify<{ themes: Array<{ id: number; role: string; name: string }> }>("GET", "/themes.json");
  const theme = themes.themes.find(t => t.role === "main")!;
  console.log(`Theme: ${theme.name} (${theme.id})\n`);

  const quizRoot = resolve(__dirname, "../../meta-safe/quiz");
  const newJs = readFileSync(`${quizRoot}/assets/quiz.js`, "utf8");
  console.log(`Local quiz.js: ${(newJs.length / 1024).toFixed(1)}KB\n`);

  for (const tplKey of TEMPLATES) {
    const key = `templates/${tplKey}.liquid`;
    process.stdout.write(`${key} … `);

    const r = await shopify<{ asset?: { value: string } }>(
      "GET",
      `/themes/${theme.id}/assets.json?asset[key]=${encodeURIComponent(key)}`,
    );
    if (!r.asset) { console.log("not found, skipped"); continue; }
    const html = r.asset.value;

    // Le template a 3 blocs <script> :
    //   1) window.VYQ_CONFIG = {...};       ← on garde
    //   2) <contenu de quiz.js inliné>      ← on remplace
    //   3) setTimeout failsafe              ← on garde
    // On localise par les marqueurs window.VYQ_CONFIG et setTimeout(function.
    const configEnd = html.indexOf("</script>", html.indexOf("window.VYQ_CONFIG"));
    const failsafeStart = html.indexOf("<script>", configEnd + 9);
    const failsafe = html.indexOf("setTimeout(function", failsafeStart);
    if (configEnd === -1 || failsafeStart === -1 || failsafe === -1 || failsafe < failsafeStart) {
      console.log("structure mismatch, skipped");
      continue;
    }

    const before = html.slice(0, configEnd + "</script>".length);
    const after = html.slice(failsafeStart);
    const newTemplate = `${before}\n\n<script>\n${newJs}\n</script>\n\n${after}`;

    await shopify("PUT", `/themes/${theme.id}/assets.json`, {
      asset: { key, value: newTemplate },
    });
    console.log(`✓ (${(newTemplate.length / 1024).toFixed(1)}KB)`);
    await sleep(600);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
