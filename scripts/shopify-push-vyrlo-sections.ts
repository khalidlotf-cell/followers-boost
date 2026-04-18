import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

// Sections réutilisables (homepage + collection + product)
import { SECTION as ANNOUNCE } from "./shopify-vyrlo-theme/sections/announce";
import { SECTION as HERO } from "./shopify-vyrlo-theme/sections/hero";
import { SECTION as PLATFORMS } from "./shopify-vyrlo-theme/sections/platforms";
import { SECTION as STEPS } from "./shopify-vyrlo-theme/sections/steps";
import { SECTION as COMPARATIF } from "./shopify-vyrlo-theme/sections/comparatif";
import { SECTION as GUARANTEES } from "./shopify-vyrlo-theme/sections/guarantees";
import { SECTION as REVIEWS } from "./shopify-vyrlo-theme/sections/reviews";
import { SECTION as FAQ } from "./shopify-vyrlo-theme/sections/faq";
import { SECTION as SEO } from "./shopify-vyrlo-theme/sections/seo";
import { SECTION as CTA_BANNER } from "./shopify-vyrlo-theme/sections/cta-banner";
import { SECTION as COLLECTION_HERO } from "./shopify-vyrlo-theme/sections/collection-hero";
import { SECTION as COLLECTION_PRODUCTS } from "./shopify-vyrlo-theme/sections/collection-products";
import { SECTION as PRODUCT_HERO } from "./shopify-vyrlo-theme/sections/product-hero";
import { SECTION as PRODUCT_BUY } from "./shopify-vyrlo-theme/sections/product-buy";
import { SECTION as PRODUCT_ABOUT } from "./shopify-vyrlo-theme/sections/product-about";
import { SECTION as PRODUCT_WHY } from "./shopify-vyrlo-theme/sections/product-why";
import { SECTION as PRODUCT_TRUST } from "./shopify-vyrlo-theme/sections/product-trust";
import { SECTION as PRODUCT_FAQ } from "./shopify-vyrlo-theme/sections/product-faq";
import { SECTION as PRODUCT_PLATFORM_SEO } from "./shopify-vyrlo-theme/sections/product-platform-seo";
import { SECTION as HEADER } from "./shopify-vyrlo-theme/sections/header";
import { SECTION as FOOTER } from "./shopify-vyrlo-theme/sections/footer";
import { SECTION as PAGE_SEC } from "./shopify-vyrlo-theme/sections/page";
import { SECTION as CART_SEC } from "./shopify-vyrlo-theme/sections/cart";
import {
  PLATFORMS_BLOCKS, STEPS_BLOCKS, COMPARATIF_BLOCKS,
  GUARANTEES_BLOCKS, REVIEWS_BLOCKS, FAQ_BLOCKS, SEO_BLOCKS,
} from "./shopify-vyrlo-theme/template-blocks";

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
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

async function putAsset(themeId: number, key: string, value: string) {
  await shopify("PUT", `/themes/${themeId}/assets.json`, { asset: { key, value } });
  console.log(`  ✓ ${key} (${(value.length / 1024).toFixed(1)}KB)`);
}

const SECTIONS_TO_PUSH: Array<{ key: string; content: string }> = [
  // réutilisables
  { key: "sections/vyrlo-announce.liquid",       content: ANNOUNCE },
  { key: "sections/vyrlo-steps.liquid",          content: STEPS },
  { key: "sections/vyrlo-guarantees.liquid",     content: GUARANTEES },
  { key: "sections/vyrlo-reviews.liquid",        content: REVIEWS },
  { key: "sections/vyrlo-faq.liquid",            content: FAQ },
  { key: "sections/vyrlo-seo.liquid",            content: SEO },
  { key: "sections/vyrlo-cta-banner.liquid",     content: CTA_BANNER },
  // homepage specific
  { key: "sections/vyrlo-hero.liquid",           content: HERO },
  { key: "sections/vyrlo-platforms.liquid",      content: PLATFORMS },
  { key: "sections/vyrlo-comparatif.liquid",     content: COMPARATIF },
  // collection specific
  { key: "sections/vyrlo-collection-hero.liquid",     content: COLLECTION_HERO },
  { key: "sections/vyrlo-collection-products.liquid", content: COLLECTION_PRODUCTS },
  // product
  { key: "sections/vyrlo-product-hero.liquid", content: PRODUCT_HERO },
  { key: "sections/vyrlo-product-buy.liquid", content: PRODUCT_BUY },
  { key: "sections/vyrlo-product-about.liquid", content: PRODUCT_ABOUT },
  { key: "sections/vyrlo-product-why.liquid", content: PRODUCT_WHY },
  { key: "sections/vyrlo-product-trust.liquid", content: PRODUCT_TRUST },
  { key: "sections/vyrlo-product-faq.liquid", content: PRODUCT_FAQ },
  { key: "sections/vyrlo-product-platform-seo.liquid", content: PRODUCT_PLATFORM_SEO },
  // header & footer
  { key: "sections/vyrlo-header.liquid", content: HEADER },
  { key: "sections/vyrlo-footer.liquid", content: FOOTER },
  // page + cart
  { key: "sections/vyrlo-page.liquid", content: PAGE_SEC },
  { key: "sections/vyrlo-cart.liquid", content: CART_SEC },
];

const PAGE_TEMPLATE = {
  sections: {
    announce: { type: "vyrlo-announce" },
    content:  { type: "vyrlo-page", settings: { eyebrow: "", show_updated: false } },
    cta:      { type: "vyrlo-cta-banner" },
  },
  order: ["announce", "content", "cta"],
};

const CART_TEMPLATE = {
  sections: {
    announce: { type: "vyrlo-announce" },
    cart:     { type: "vyrlo-cart" },
  },
  order: ["announce", "cart"],
};

const HEADER_GROUP = {
  type: "header",
  name: "Header",
  sections: { vyrlo_header: { type: "vyrlo-header", settings: {} } },
  order: ["vyrlo_header"],
};

const FOOTER_GROUP = {
  type: "footer",
  name: "Footer",
  sections: { vyrlo_footer: { type: "vyrlo-footer", settings: {} } },
  order: ["vyrlo_footer"],
};

// ── Templates qui composent les sections ────────────────────────────────────

const INDEX_TEMPLATE = {
  sections: {
    announce:    { type: "vyrlo-announce" },
    hero:        { type: "vyrlo-hero" },
    platforms:   { type: "vyrlo-platforms",  ...PLATFORMS_BLOCKS },
    steps:       { type: "vyrlo-steps",      ...STEPS_BLOCKS },
    comparatif:  { type: "vyrlo-comparatif", ...COMPARATIF_BLOCKS },
    guarantees:  { type: "vyrlo-guarantees", ...GUARANTEES_BLOCKS },
    reviews:     { type: "vyrlo-reviews",    ...REVIEWS_BLOCKS },
    faq:         { type: "vyrlo-faq",        ...FAQ_BLOCKS },
    seo:         { type: "vyrlo-seo", ...SEO_BLOCKS },
    cta:         { type: "vyrlo-cta-banner" },
  },
  order: ["announce", "hero", "platforms", "steps", "comparatif", "guarantees", "reviews", "faq", "seo", "cta"],
};

const COLLECTION_TEMPLATE = {
  sections: {
    announce:    { type: "vyrlo-announce" },
    hero:        { type: "vyrlo-collection-hero" },
    guarantees:  { type: "vyrlo-guarantees", ...GUARANTEES_BLOCKS },
    reviews:     { type: "vyrlo-reviews",    ...REVIEWS_BLOCKS },
    faq:         { type: "vyrlo-faq",        ...FAQ_BLOCKS },
    cta:         { type: "vyrlo-cta-banner" },
  },
  order: ["announce", "hero", "guarantees", "reviews", "faq", "cta"],
};

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("No main theme");
  console.log(`→ Thème : ${main.id}`);

  console.log("\n━━━ Sections Liquid ━━━");
  for (const s of SECTIONS_TO_PUSH) await putAsset(main.id, s.key, s.content);

  console.log("\n━━━ Section groups (header/footer) ━━━");
  await putAsset(main.id, "sections/header-group.json", JSON.stringify(HEADER_GROUP, null, 2));
  await putAsset(main.id, "sections/footer-group.json", JSON.stringify(FOOTER_GROUP, null, 2));

  console.log("\n━━━ Templates ━━━");
  await putAsset(main.id, "templates/index.json", JSON.stringify(INDEX_TEMPLATE, null, 2));
  await putAsset(main.id, "templates/collection.json", JSON.stringify(COLLECTION_TEMPLATE, null, 2));
  await putAsset(main.id, "templates/page.json", JSON.stringify(PAGE_TEMPLATE, null, 2));
  await putAsset(main.id, "templates/cart.json", JSON.stringify(CART_TEMPLATE, null, 2));

  // templates/product.json : intégralement Vyrlo (on remplace le layout Horizon).
  const ABOUT_BLOCKS = {
    blocks: {
      b1: { type: "badge", settings: { text: "⚡ Livraison rapide" } },
      b2: { type: "badge", settings: { text: "🔒 Paiement sécurisé" } },
      b3: { type: "badge", settings: { text: "✓ Sans inscription" } },
      b4: { type: "badge", settings: { text: "💬 Support réactif" } },
    },
    block_order: ["b1", "b2", "b3", "b4"],
  };
  const PRODUCT_TEMPLATE = {
    sections: {
      announce:   { type: "vyrlo-announce" },
      hero:       { type: "vyrlo-product-hero" },
      buy:        { type: "vyrlo-product-buy" },
      why:        { type: "vyrlo-product-why" },
      pseo:       { type: "vyrlo-product-platform-seo" },
      reviews:    { type: "vyrlo-reviews",    ...REVIEWS_BLOCKS },
      trust:      { type: "vyrlo-product-trust" },
      faq:        { type: "vyrlo-product-faq" },
      cta:        { type: "vyrlo-cta-banner" },
    },
    order: ["announce", "hero", "buy", "why", "pseo", "reviews", "trust", "faq", "cta"],
  };
  await putAsset(main.id, "templates/product.json", JSON.stringify(PRODUCT_TEMPLATE, null, 2));

  // Purger les anciens fichiers mono-bloc
  console.log("\n━━━ Purge anciennes sections mono-bloc ━━━");
  for (const key of ["sections/vyrlo-home.liquid", "sections/vyrlo-collection.liquid"]) {
    try {
      await shopify("DELETE", `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent(key)}`);
      console.log(`  ✓ ${key} supprimé`);
    } catch (e) {
      console.log(`  = ${key} (${e instanceof Error ? e.message : String(e)})`);
    }
  }

  console.log("\nTerminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
