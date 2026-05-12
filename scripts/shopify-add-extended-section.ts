import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * 1. Crée la section sections/vyrlo-product-extended.liquid
 *    Cette section affiche product.description (= body_html long form SEO).
 * 2. Met à jour templates/product.json pour inclure cette section après "faq".
 *
 * Idempotent.
 */

const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;
const API = "2025-10";

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  const r = await fetch(`https://${SHOP}/admin/api/${API}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} ${r.status}: ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : (null as T);
}

async function getThemeId(): Promise<number> {
  const j = await shopify<{ themes: { id: number; role: string }[] }>("GET", "/themes.json");
  return j.themes.find(t => t.role === "main")!.id;
}

async function putAsset(themeId: number, key: string, value: string) {
  await shopify("PUT", `/themes/${themeId}/assets.json`, {
    asset: { key, value },
  });
}

async function getAsset(themeId: number, key: string): Promise<string> {
  const j = await shopify<{ asset?: { value: string } }>(
    "GET", `/themes/${themeId}/assets.json?asset[key]=${encodeURIComponent(key)}`
  );
  return j.asset?.value ?? "";
}

const SECTION_LIQUID = `{% comment %}
  Vyrlo Product Extended — affiche product.description (long-form SEO content).
  Géré par scripts/shopify-push-storefront-content.ts (lib/storefront-content.ts).
{% endcomment %}

{% if product.description != blank %}
<section class="vyrlo-extended-{{ section.id }}">
  <div class="ve-wrap">
    {{ product.description }}
  </div>
</section>

{% style %}
  .vyrlo-extended-{{ section.id }} {
    padding: 56px 16px;
    background: #fff;
    font-family: 'Outfit', Inter, system-ui, sans-serif;
    color: #1f2937;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap {
    max-width: 880px;
    margin: 0 auto;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap h3 {
    font-size: 22px;
    font-weight: 800;
    margin: 32px 0 12px;
    color: #111827;
    line-height: 1.3;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap h4 {
    font-size: 16px;
    font-weight: 700;
    margin: 20px 0 8px;
    color: #111827;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap p {
    font-size: 15px;
    line-height: 1.75;
    margin: 0 0 16px;
    color: #374151;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap ul,
  .vyrlo-extended-{{ section.id }} .ve-wrap ol {
    margin: 0 0 16px;
    padding-left: 22px;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap li {
    margin-bottom: 8px;
    line-height: 1.65;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }
  @media (min-width: 768px) {
    .vyrlo-extended-{{ section.id }} .ve-wrap table { display: table; }
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap details summary {
    list-style: none;
    cursor: pointer;
  }
  .vyrlo-extended-{{ section.id }} .ve-wrap details summary::-webkit-details-marker { display: none; }
{% endstyle %}
{% endif %}

{% schema %}
{
  "name": "Vyrlo · Contenu SEO",
  "tag": "section",
  "class": "section-vyrlo-extended",
  "settings": [],
  "presets": [{
    "name": "Vyrlo · Contenu SEO",
    "category": "Vyrlo"
  }]
}
{% endschema %}
`;

async function main() {
  const themeId = await getThemeId();
  console.log(`Thème : ${themeId}`);

  // 1. Pousser la section
  console.log("→ PUT sections/vyrlo-product-extended.liquid");
  await putAsset(themeId, "sections/vyrlo-product-extended.liquid", SECTION_LIQUID);
  console.log("  ✓ section créée/mise à jour");

  // 2. Mettre à jour templates/product.json
  const tpl = await getAsset(themeId, "templates/product.json");
  const json = JSON.parse(tpl);

  if (json.sections.extended) {
    console.log("  ↺ section 'extended' déjà dans le template — rien à faire côté JSON");
  } else {
    json.sections.extended = { type: "vyrlo-product-extended", settings: {} };
    // Insertion entre faq et cta
    const order: string[] = json.order;
    const faqIdx = order.indexOf("faq");
    const newOrder = [...order];
    if (faqIdx >= 0) {
      newOrder.splice(faqIdx + 1, 0, "extended");
    } else {
      newOrder.push("extended");
    }
    json.order = newOrder;

    console.log("→ PUT templates/product.json");
    await putAsset(themeId, "templates/product.json", JSON.stringify(json, null, 2));
    console.log("  ✓ template mis à jour, order=", newOrder.join(" → "));
  }

  console.log("\n✅ La section vyrlo-product-extended est active.");
  console.log("   Le contenu de product.description s'affiche désormais entre FAQ et CTA.");
}

main().catch(e => { console.error(e); process.exit(1); });
