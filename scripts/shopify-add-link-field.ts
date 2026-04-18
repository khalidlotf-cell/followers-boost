import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Ajoute un champ "Lien" (product-custom-property, block Horizon natif) dans le template produit.
 * Idempotent : si le block custom_property_link existe déjà, ne fait rien.
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 300)}`);
  return JSON.parse(text) as T;
}

const LINK_BLOCK_ID = "custom_property_link_vyrlo";

const LINK_BLOCK = {
  type: "product-custom-property",
  name: "Lien",
  settings: {
    label: "Lien de votre profil ou publication",
    description: "Collez ici le lien public de votre profil ou de la publication à booster.",
    property_key: "Lien",
    input_type: "text",
    max_length: 250,
    required: true,
    placeholder: "https://www.instagram.com/votrenom/",
    placeholder_textarea: "https://www.instagram.com/votrenom/",
    checkbox_label: "",
    "padding-block-start": 8,
    "padding-block-end": 8,
    "padding-inline-start": 0,
    "padding-inline-end": 0,
  },
  blocks: {},
};

type AnyObj = Record<string, unknown>;

function findProductDetails(sections: AnyObj): AnyObj | null {
  for (const key of Object.keys(sections)) {
    const section = sections[key] as AnyObj;
    if ((section.type as string) === "product-information") {
      const blocks = section.blocks as AnyObj;
      for (const bkey of Object.keys(blocks)) {
        const b = blocks[bkey] as AnyObj;
        if ((b.type as string) === "_product-details") return b;
      }
    }
  }
  return null;
}

async function main() {
  const themes = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  const main = themes.themes.find(t => t.role === "main");
  if (!main) throw new Error("Pas de thème main");

  const asset = await shopify<{ asset: { value: string } }>(
    "GET",
    `/themes/${main.id}/assets.json?asset[key]=${encodeURIComponent("templates/product.json")}`
  );
  const template = JSON.parse(asset.asset.value) as AnyObj;

  const sections = template.sections as AnyObj;
  const details = findProductDetails(sections);
  if (!details) throw new Error("Impossible de trouver le block _product-details");

  const blocks = details.blocks as AnyObj;
  const blockOrder = details.block_order as string[];

  if (blocks[LINK_BLOCK_ID]) {
    console.log(`= ${LINK_BLOCK_ID} existe déjà dans le template → rien à faire`);
    return;
  }

  blocks[LINK_BLOCK_ID] = LINK_BLOCK;
  const insertIndex = blockOrder.indexOf("buy_buttons_eYQEYi");
  if (insertIndex === -1) {
    blockOrder.push(LINK_BLOCK_ID);
  } else {
    blockOrder.splice(insertIndex, 0, LINK_BLOCK_ID);
  }

  const newValue = JSON.stringify(template, null, 2);
  await shopify("PUT", `/themes/${main.id}/assets.json`, {
    asset: { key: "templates/product.json", value: newValue },
  });
  console.log(`✓ Bloc "Lien" injecté dans templates/product.json`);
  console.log(`  Ordre : [..., ${blockOrder.slice(Math.max(0, insertIndex - 1), insertIndex + 2).join(", ")}, ...]`);
}

main().catch(e => { console.error(e); process.exit(1); });
