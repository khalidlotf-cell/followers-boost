import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * 1. Injecte Schema.org Organization JSON-LD dans layout/theme.liquid (entre <head>).
 * 2. Crée des sections custom qui injectent BreadcrumbList JSON-LD
 *    sur les pages produit et article.
 *
 * Idempotent — détecte les marqueurs et ne ré-injecte pas.
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

async function getAsset(themeId: number, key: string): Promise<string> {
  const j = await shopify<{ asset?: { value: string } }>(
    "GET", `/themes/${themeId}/assets.json?asset[key]=${encodeURIComponent(key)}`
  );
  return j.asset?.value ?? "";
}

async function putAsset(themeId: number, key: string, value: string) {
  await shopify("PUT", `/themes/${themeId}/assets.json`, { asset: { key, value } });
}

// ── 1. Schema Organization ──────────────────────────────────────────────────

const ORG_MARKER = "<!-- vyrlo:schema-organization -->";
const ORG_SCHEMA = `${ORG_MARKER}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vyrlo",
  "alternateName": "Vyrlo - Achat de followers et likes réseaux sociaux",
  "url": "https://vyrlo.fr",
  "logo": "https://vyrlo.fr/cdn/shop/files/logo.png",
  "description": "Vyrlo est une plateforme française fondée en 2024 pour acheter des followers, likes, vues et abonnés sur Instagram, TikTok, YouTube, Facebook, X (Twitter), Spotify et Telegram. Livraison rapide, sans mot de passe, support 7j/7.",
  "foundingDate": "2024",
  "areaServed": { "@type": "Country", "name": "France" },
  "knowsLanguage": "fr-FR",
  "sameAs": [
    "https://vyrlo.fr"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": ["French"],
    "email": "support@vyrlo.fr"
  }
}
</script>
`.trim();

async function injectOrganizationSchema(themeId: number) {
  console.log("\n━━━ Schema Organization (layout/theme.liquid) ━━━");
  const theme = await getAsset(themeId, "layout/theme.liquid");
  if (!theme) throw new Error("layout/theme.liquid introuvable");

  if (theme.includes(ORG_MARKER)) {
    console.log("  ↺ déjà présent — remplacement par version à jour");
    // Remplace le bloc existant entre le marker et </script>
    const re = new RegExp(`${ORG_MARKER}[\\s\\S]*?<\\/script>`, "g");
    const updated = theme.replace(re, ORG_SCHEMA);
    await putAsset(themeId, "layout/theme.liquid", updated);
    console.log("  ✓ mis à jour");
    return;
  }

  // Insère juste avant </head>
  const headCloseIdx = theme.lastIndexOf("</head>");
  if (headCloseIdx === -1) throw new Error("</head> introuvable dans theme.liquid");
  const updated = theme.slice(0, headCloseIdx) + "\n" + ORG_SCHEMA + "\n" + theme.slice(headCloseIdx);
  await putAsset(themeId, "layout/theme.liquid", updated);
  console.log("  ✓ injecté avant </head>");
}

// ── 2. Section BreadcrumbList pour produits ─────────────────────────────────

const PRODUCT_BREADCRUMB_LIQUID = `{% comment %}
  Vyrlo Schema Breadcrumb (produit) — JSON-LD BreadcrumbList pour rich snippets Google.
  Pas de rendu HTML visible : uniquement le schéma.
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify','telegram'
        assign platform = tag
    endcase
  endfor
  assign platform_label = platform | capitalize
  if platform == 'twitter'
    assign platform_label = 'X (Twitter)'
  endif
-%}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "{{ shop.url }}"
    }{% if platform != '' %},
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{ platform_label }}",
      "item": "{{ shop.url }}/collections/{{ platform }}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": {{ product.title | json }},
      "item": "{{ shop.url }}{{ product.url }}"
    }{% else %},
    {
      "@type": "ListItem",
      "position": 2,
      "name": {{ product.title | json }},
      "item": "{{ shop.url }}{{ product.url }}"
    }{% endif %}
  ]
}
</script>

{% schema %}
{
  "name": "Vyrlo · Fil produit",
  "tag": "section",
  "class": "section-vyrlo-breadcrumb",
  "settings": [],
  "presets": [{
    "name": "Vyrlo · Fil produit",
    "category": "Vyrlo"
  }]
}
{% endschema %}
`;

const ARTICLE_BREADCRUMB_LIQUID = `{% comment %}
  Vyrlo Schema Breadcrumb (article) — JSON-LD BreadcrumbList pour rich snippets.
{% endcomment %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "{{ shop.url }}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": {{ blog.title | json }},
      "item": "{{ shop.url }}/blogs/{{ blog.handle }}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": {{ article.title | json }},
      "item": "{{ shop.url }}/blogs/{{ blog.handle }}/{{ article.handle }}"
    }
  ]
}
</script>

{% schema %}
{
  "name": "Vyrlo · Fil article",
  "tag": "section",
  "class": "section-vyrlo-breadcrumb-article",
  "settings": [],
  "presets": [{
    "name": "Vyrlo · Fil article",
    "category": "Vyrlo"
  }]
}
{% endschema %}
`;

async function createBreadcrumbSections(themeId: number) {
  console.log("\n━━━ Sections BreadcrumbList ━━━");
  await putAsset(themeId, "sections/vyrlo-breadcrumb-product.liquid", PRODUCT_BREADCRUMB_LIQUID);
  console.log("  ✓ sections/vyrlo-breadcrumb-product.liquid");
  await putAsset(themeId, "sections/vyrlo-breadcrumb-article.liquid", ARTICLE_BREADCRUMB_LIQUID);
  console.log("  ✓ sections/vyrlo-breadcrumb-article.liquid");
}

// ── 3. Ajout dans templates/product.json et templates/article.json ──────────

async function addBreadcrumbToTemplate(themeId: number, templateKey: string, sectionType: string, sectionId = "breadcrumb") {
  const raw = await getAsset(themeId, templateKey);
  if (!raw) {
    console.log(`  ⚠ ${templateKey} introuvable, skip`);
    return;
  }
  const json = JSON.parse(raw);
  if (json.sections?.[sectionId]) {
    console.log(`  ↺ ${templateKey} : section "${sectionId}" déjà présente`);
    return;
  }
  json.sections[sectionId] = { type: sectionType, settings: {} };
  // Insère en première position
  const order: string[] = json.order;
  json.order = [sectionId, ...order];
  await putAsset(themeId, templateKey, JSON.stringify(json, null, 2));
  console.log(`  ✓ ${templateKey} : section "${sectionId}" ajoutée en tête (order=${json.order.join(" → ")})`);
}

async function main() {
  const themeId = await getThemeId();
  console.log(`Thème : ${themeId}`);

  await injectOrganizationSchema(themeId);
  await createBreadcrumbSections(themeId);

  console.log("\n━━━ Templates product/article ━━━");
  await addBreadcrumbToTemplate(themeId, "templates/product.json", "vyrlo-breadcrumb-product");
  await addBreadcrumbToTemplate(themeId, "templates/article.json", "vyrlo-breadcrumb-article");

  console.log("\n✅ Schemas Organization + BreadcrumbList injectés sur le thème live.");
}

main().catch(e => { console.error(e); process.exit(1); });
