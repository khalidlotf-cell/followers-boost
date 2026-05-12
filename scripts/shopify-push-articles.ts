import dotenv from "dotenv";
import { ARTICLES } from "../lib/blog-articles";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * 1. Renomme le blog "News" en "Blog" (handle "blog") pour URL SEO-friendly.
 * 2. Crée/met à jour les articles définis dans lib/blog-articles.ts (idempotent).
 * 3. Met à jour les metafields SEO (title_tag, description_tag).
 */

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API = "2025-10";
const BLOG_ID = 129721565533;
const BLOG_HANDLE = "blog";
const BLOG_TITLE = "Blog";

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`https://${SHOP}/admin/api/${API}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 500)}`);
  return text ? JSON.parse(text) : (null as T);
}

async function ensureBlog() {
  console.log(`→ Vérification du blog id=${BLOG_ID}`);
  const r = await shopify<{ blog: { id: number; handle: string; title: string } }>(
    "GET", `/blogs/${BLOG_ID}.json`
  );
  const current = r.blog;
  if (current.handle === BLOG_HANDLE && current.title === BLOG_TITLE) {
    console.log("  ✓ blog déjà au bon nom/handle");
    return;
  }
  console.log(`  → renommage : "${current.title}" (${current.handle}) → "${BLOG_TITLE}" (${BLOG_HANDLE})`);
  await shopify("PUT", `/blogs/${BLOG_ID}.json`, {
    blog: { id: BLOG_ID, handle: BLOG_HANDLE, title: BLOG_TITLE },
  });
  console.log("  ✓ blog renommé");
}

async function upsertArticle(article: typeof ARTICLES[number]) {
  console.log(`\n→ Article "${article.handle}"`);

  // Cherche un article existant avec ce handle
  const list = await shopify<{ articles: Array<{ id: number; handle: string }> }>(
    "GET", `/blogs/${BLOG_ID}/articles.json?handle=${article.handle}&fields=id,handle`
  );
  let existingId = list.articles?.find(a => a.handle === article.handle)?.id;

  const payload: Record<string, unknown> = {
    title: article.title,
    handle: article.handle,
    author: article.author,
    tags: article.tags.join(", "),
    summary_html: article.summaryHtml,
    body_html: article.bodyHtml,
    published_at: article.publishedAt,
    published: true,
  };

  let articleId: number;
  if (existingId) {
    console.log(`  ↺ existant, mise à jour (id=${existingId})`);
    const r = await shopify<{ article: { id: number } }>(
      "PUT", `/blogs/${BLOG_ID}/articles/${existingId}.json`, { article: { id: existingId, ...payload } }
    );
    articleId = r.article.id;
  } else {
    console.log(`  ✚ création`);
    const r = await shopify<{ article: { id: number } }>(
      "POST", `/blogs/${BLOG_ID}/articles.json`, { article: payload }
    );
    articleId = r.article.id;
  }
  console.log(`  ✓ id=${articleId}`);

  // Metafields SEO
  const metafields = [
    { namespace: "global", key: "title_tag", type: "single_line_text_field", value: article.titleSeo },
    { namespace: "global", key: "description_tag", type: "single_line_text_field", value: article.metaDescription },
  ];

  for (const mf of metafields) {
    try {
      await shopify("POST", `/articles/${articleId}/metafields.json`, { metafield: mf });
      console.log(`  ✓ metafield ${mf.key} créé`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (!msg.includes("422")) throw e;
      const existing = await shopify<{ metafields: Array<{ id: number; namespace: string; key: string }> }>(
        "GET", `/articles/${articleId}/metafields.json`
      );
      const found = existing.metafields.find(m => m.namespace === mf.namespace && m.key === mf.key);
      if (!found) throw new Error(`Metafield ${mf.key} introuvable après 422`);
      await shopify("PUT", `/metafields/${found.id}.json`, {
        metafield: { id: found.id, value: mf.value, type: mf.type },
      });
      console.log(`  ✓ metafield ${mf.key} mis à jour`);
    }
  }
}

async function main() {
  await ensureBlog();
  for (const a of ARTICLES) {
    await upsertArticle(a);
  }
  console.log(`\n✅ ${ARTICLES.length} articles publiés sur https://vyrlo.fr/blogs/${BLOG_HANDLE}`);
  for (const a of ARTICLES) {
    console.log(`   https://vyrlo.fr/blogs/${BLOG_HANDLE}/${a.handle}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
