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
    products:    { type: "vyrlo-collection-products" },
    guarantees:  { type: "vyrlo-guarantees", ...GUARANTEES_BLOCKS },
    reviews:     { type: "vyrlo-reviews",    ...REVIEWS_BLOCKS },
    faq:         { type: "vyrlo-faq",        ...FAQ_BLOCKS },
    cta:         { type: "vyrlo-cta-banner" },
  },
  order: ["announce", "hero", "products", "guarantees", "reviews", "faq", "cta"],
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

  // templates/product.json : on garde le layout Horizon (product-information avec variant picker +
  // champ Lien + add-to-cart) et on ajoute des sections Vyrlo autour.
  // Ordre final souhaité : announce → product-hero → product-information (native) → guarantees →
  // reviews → faq → cta
  const prodAsset = await shopify<{ asset: { value: string } }>(
    "GET",
    `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent("templates/product.json")}`
  );
  const tpl = JSON.parse(prodAsset.asset.value) as Record<string, unknown>;
  const sections = tpl.sections as Record<string, unknown>;
  const order = tpl.order as string[];

  const EXTRAS = {
    vyrlo_p_announce:   "vyrlo-announce",
    vyrlo_p_hero:       "vyrlo-product-hero",
    vyrlo_p_guarantees: "vyrlo-guarantees",
    vyrlo_p_reviews:    "vyrlo-reviews",
    vyrlo_p_faq:        "vyrlo-faq",
    vyrlo_p_cta:        "vyrlo-cta-banner",
  };

  // Nettoyer : supprimer les anciennes sections mono-bloc Vyrlo
  for (const k of Object.keys(sections)) {
    const s = sections[k] as Record<string, unknown>;
    if (s.type === "vyrlo-home" || s.type === "vyrlo-collection") {
      delete sections[k];
      const idx = order.indexOf(k);
      if (idx >= 0) order.splice(idx, 1);
    }
  }

  // Retirer les clés Vyrlo existantes de order (mais garder les sections natives)
  const vyrloKeys = Object.keys(EXTRAS);
  const orderClean = order.filter(k => !vyrloKeys.includes(k) && !k.startsWith("vyrlo_product_hero"));
  for (const k of [...vyrloKeys, "vyrlo_product_hero"]) {
    if (sections[k]) delete sections[k];
  }

  // Injecter les sections Vyrlo (avec leurs blocks par défaut pour que ça s'affiche directement)
  const EXTRAS_BLOCKS: Record<string, object> = {
    vyrlo_p_guarantees: GUARANTEES_BLOCKS,
    vyrlo_p_reviews:    REVIEWS_BLOCKS,
    vyrlo_p_faq:        FAQ_BLOCKS,
  };
  for (const [key, type] of Object.entries(EXTRAS)) {
    const extra = EXTRAS_BLOCKS[key];
    sections[key] = extra ? { type, ...extra } : { type };
  }

  // Reconstruire l'ordre : announce, hero, [natives en place], guarantees, reviews, faq, cta
  const finalOrder = [
    "vyrlo_p_announce",
    "vyrlo_p_hero",
    ...orderClean,
    "vyrlo_p_guarantees",
    "vyrlo_p_reviews",
    "vyrlo_p_faq",
    "vyrlo_p_cta",
  ];
  tpl.order = finalOrder;

  await putAsset(main.id, "templates/product.json", JSON.stringify(tpl, null, 2));

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
