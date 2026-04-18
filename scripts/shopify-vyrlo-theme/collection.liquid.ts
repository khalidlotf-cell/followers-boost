export const VYRLO_COLLECTION_LIQUID = String.raw`{% comment %}
  Vyrlo Collection template — reproduit /app/boutique/[platform]/page.tsx
{% endcomment %}

{%- liquid
  assign slug = collection.handle
  assign platform_solid = '#7c3aed'
  case slug
    when 'instagram' then assign platform_solid = '#e1306c'
    when 'tiktok'    then assign platform_solid = '#010101'
    when 'youtube'   then assign platform_solid = '#FF0000'
    when 'facebook'  then assign platform_solid = '#1877F2'
    when 'twitter'   then assign platform_solid = '#000000'
    when 'spotify'   then assign platform_solid = '#1DB954'
    when 'threads'   then assign platform_solid = '#000000'
  endcase
-%}

{% style %}
  .vyrlo-col { font-family: Inter, system-ui, sans-serif; color: #0f172a; background: #f8fafc; min-height: 100vh; }
  .vyrlo-col * { box-sizing: border-box; }
  .vyrlo-col .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-col a { text-decoration: none; color: inherit; }

  .vyrlo-col-announce {
    background: linear-gradient(90deg, #7c3aed, #4f46e5);
    color: #fff; text-align: center; padding: 10px 16px;
    font-size: 13px; font-weight: 600;
  }

  /* ── Hero ── */
  .vyrlo-col-hero {
    position: relative; padding: 72px 20px 0; color: #fff; text-align: center;
    overflow: hidden;
  }
  .vyrlo-col-hero::before {
    content: ""; position: absolute; inset: 0;
    background: rgba(0,0,0,0.08); pointer-events: none;
  }
  .vyrlo-col-hero-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; padding: 44px 0 0; }
  .vyrlo-col-breadcrumb {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 28px;
  }
  .vyrlo-col-breadcrumb a { color: rgba(255,255,255,0.6); }
  .vyrlo-col-breadcrumb .sep { opacity: 0.4; }
  .vyrlo-col-breadcrumb .current { color: #fff; font-weight: 600; }
  .vyrlo-col-logo-wrap {
    display: flex; justify-content: center; margin-bottom: 28px;
  }
  .vyrlo-col-logo-bg {
    position: relative; width: 96px; height: 96px; border-radius: 24px;
    background: rgba(255,255,255,0.18); backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  }
  .vyrlo-col-logo-bg::before {
    content: ""; position: absolute; inset: -12px; border-radius: 32px;
    background: rgba(255,255,255,0.2); filter: blur(16px);
    pointer-events: none; z-index: -1;
  }
  .vyrlo-col-h1 {
    font-size: clamp(32px, 4.5vw, 52px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.08; margin: 0 0 18px;
    text-shadow: 0 2px 12px rgba(0,0,0,0.15);
  }
  .vyrlo-col-intro {
    font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.88);
    max-width: 540px; margin: 0 auto 36px;
  }
  .vyrlo-col-trust-strip {
    display: inline-flex; gap: 20px; flex-wrap: wrap; justify-content: center;
    background: rgba(255,255,255,0.1); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.18); border-radius: 16px;
    padding: 14px 24px; margin-bottom: 48px;
  }
  .vyrlo-col-trust-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; color: #fff;
  }

  /* ── Product grid ── */
  .vyrlo-col-products { background: #fff; padding: 56px 0 72px; border-radius: 32px 32px 0 0; margin-top: -32px; position: relative; z-index: 2; }
  .vyrlo-col-products-head { margin-bottom: 32px; text-align: center; }
  .vyrlo-col-eyebrow {
    font-size: 12px; font-weight: 700; color: #7c3aed;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;
  }
  .vyrlo-col-section-h2 {
    font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 8px;
    letter-spacing: -0.025em;
  }
  .vyrlo-col-section-sub { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-col-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 40px;
  }
  @media (max-width: 900px) { .vyrlo-col-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .vyrlo-col-grid { grid-template-columns: 1fr; } }
  .vyrlo-col-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px;
    padding: 24px; transition: all 0.2s;
    display: flex; flex-direction: column; gap: 12px;
  }
  .vyrlo-col-card:hover {
    border-color: var(--platform); transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(15,23,42,0.08);
  }
  .vyrlo-col-card-title {
    font-size: 18px; font-weight: 800; color: #0f172a;
    letter-spacing: -0.015em; margin: 0;
  }
  .vyrlo-col-card-desc { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0; flex-grow: 1; }
  .vyrlo-col-card-foot {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 12px; border-top: 1px solid #f1f5f9;
  }
  .vyrlo-col-card-price {
    font-size: 14px; font-weight: 700; color: var(--platform);
  }
  .vyrlo-col-card-cta {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 13px; font-weight: 700; color: #fff;
    background: #0f172a; padding: 8px 16px; border-radius: 100px;
    transition: background 0.15s;
  }
  .vyrlo-col-card:hover .vyrlo-col-card-cta { background: var(--platform); }

  /* ── Benefits ── */
  .vyrlo-col-benefits { padding: 72px 0; background: #fafbff; }
  .vyrlo-col-benefits-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
    margin-top: 40px;
  }
  @media (max-width: 640px) { .vyrlo-col-benefits-grid { grid-template-columns: 1fr; } }
  .vyrlo-col-benefit {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 16px;
    padding: 20px; display: flex; gap: 14px; align-items: flex-start;
  }
  .vyrlo-col-benefit-num {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--platform); color: #fff; font-weight: 800; font-size: 14px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .vyrlo-col-benefit-text { flex: 1; }
  .vyrlo-col-benefit-title { font-weight: 700; font-size: 15px; margin: 0 0 4px; color: #0f172a; }
  .vyrlo-col-benefit-desc { font-size: 13.5px; color: #64748b; line-height: 1.65; margin: 0; }

  /* ── FAQ ── */
  .vyrlo-col-faq { padding: 72px 0; background: #fff; border-top: 1px solid #f1f5f9; }
  .vyrlo-col-faq-inner { max-width: 720px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-col-faq-item { border-bottom: 1px solid #e2e8f0; padding: 20px 0; }
  .vyrlo-col-faq-item summary {
    list-style: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    font-weight: 600; font-size: 15.5px; color: #0f172a;
  }
  .vyrlo-col-faq-item summary::-webkit-details-marker { display: none; }
  .vyrlo-col-faq-item summary::after {
    content: "+"; width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid #e2e8f0; display: inline-flex;
    align-items: center; justify-content: center; color: #94a3b8;
  }
  .vyrlo-col-faq-item[open] summary::after {
    content: "−"; background: var(--platform); border-color: var(--platform); color: #fff;
  }
  .vyrlo-col-faq-item p { margin: 14px 0 0; color: #64748b; font-size: 14px; line-height: 1.75; }

  /* ── Additional info ── */
  .vyrlo-col-description { padding: 64px 0; background: #fafbff; border-top: 1px solid #f1f5f9; }
  .vyrlo-col-description-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-col-description h3 { font-size: clamp(20px, 2.5vw, 28px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.02em; margin: 0 0 16px; }
  .vyrlo-col-description p { font-size: 15px; color: #475569; line-height: 1.85; margin: 0 0 14px; }
  .vyrlo-col-description ul { padding-left: 22px; margin: 0 0 14px; }
  .vyrlo-col-description li { margin: 6px 0; color: #475569; line-height: 1.7; }
{% endstyle %}

<div class="vyrlo-col" style="--platform: {{ platform_solid }};">

  <div class="vyrlo-col-announce">⚡ Livraison express · Démarrage sous 12h · Satisfait ou remboursé</div>

  {% comment %} ── HERO colored by platform ── {% endcomment %}
  <section class="vyrlo-col-hero" style="background: {{ platform_solid }}; {% if slug == 'instagram' %}background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%);{% endif %}">
    <div class="vyrlo-col-hero-inner">
      <div class="vyrlo-col-breadcrumb">
        <a href="/">Accueil</a>
        <span class="sep">/</span>
        <a href="/collections">Boutique</a>
        <span class="sep">/</span>
        <span class="current">{{ collection.title }}</span>
      </div>
      <div class="vyrlo-col-logo-wrap">
        <div class="vyrlo-col-logo-bg">{% render 'vyrlo-logo', slug: slug, size: 56 %}</div>
      </div>
      <h1 class="vyrlo-col-h1">Services {{ collection.title }}</h1>
      <div class="vyrlo-col-intro">{{ collection.description }}</div>
      <div class="vyrlo-col-trust-strip">
        <div class="vyrlo-col-trust-item">⚡ Démarrage 20 min</div>
        <div class="vyrlo-col-trust-item">🔒 Zéro mot de passe</div>
        <div class="vyrlo-col-trust-item">↻ Remboursement garanti</div>
        <div class="vyrlo-col-trust-item">💬 Support 7j/7</div>
      </div>
    </div>
  </section>

  {% comment %} ── PRODUCTS grid ── {% endcomment %}
  <section class="vyrlo-col-products">
    <div class="container">
      <div class="vyrlo-col-products-head">
        <p class="vyrlo-col-eyebrow">Catalogue {{ collection.title }}</p>
        <h2 class="vyrlo-col-section-h2">Nos services {{ collection.title }}</h2>
        <p class="vyrlo-col-section-sub">{{ collection.products_count }} service{% if collection.products_count > 1 %}s{% endif %} disponibles</p>
      </div>
      <div class="vyrlo-col-grid">
        {%- for product in collection.products -%}
          <a href="{{ product.url }}" class="vyrlo-col-card">
            <h3 class="vyrlo-col-card-title">{{ product.title }}</h3>
            <p class="vyrlo-col-card-desc">
              {%- assign first_variant = product.variants | first -%}
              Livraison progressive · Sans mot de passe · Support 7j/7
            </p>
            <div class="vyrlo-col-card-foot">
              <span class="vyrlo-col-card-price">Dès {{ product.price_min | money_without_trailing_zeros }}</span>
              <span class="vyrlo-col-card-cta">Commander →</span>
            </div>
          </a>
        {%- endfor -%}
      </div>
    </div>
  </section>

  {% comment %} ── BENEFITS (from collection body_html or static fallback) ── {% endcomment %}
  <section class="vyrlo-col-benefits">
    <div class="container">
      <div class="vyrlo-col-products-head">
        <p class="vyrlo-col-eyebrow">Pourquoi Vyrlo</p>
        <h2 class="vyrlo-col-section-h2">Ce que vous obtenez</h2>
      </div>
      <div class="vyrlo-col-benefits-grid">
        <div class="vyrlo-col-benefit">
          <div class="vyrlo-col-benefit-num">1</div>
          <div class="vyrlo-col-benefit-text">
            <p class="vyrlo-col-benefit-title">Livraison progressive et naturelle</p>
            <p class="vyrlo-col-benefit-desc">Aucun risque de bannissement. Les followers/likes arrivent sur plusieurs heures pour imiter la croissance organique.</p>
          </div>
        </div>
        <div class="vyrlo-col-benefit">
          <div class="vyrlo-col-benefit-num">2</div>
          <div class="vyrlo-col-benefit-text">
            <p class="vyrlo-col-benefit-title">Zéro mot de passe requis</p>
            <p class="vyrlo-col-benefit-desc">On a juste besoin du lien public de votre profil ou publication. Vos accès restent privés.</p>
          </div>
        </div>
        <div class="vyrlo-col-benefit">
          <div class="vyrlo-col-benefit-num">3</div>
          <div class="vyrlo-col-benefit-text">
            <p class="vyrlo-col-benefit-title">Ciblage France disponible</p>
            <p class="vyrlo-col-benefit-desc">Pour une audience francophone qui comprend votre contenu et s'engage réellement.</p>
          </div>
        </div>
        <div class="vyrlo-col-benefit">
          <div class="vyrlo-col-benefit-num">4</div>
          <div class="vyrlo-col-benefit-text">
            <p class="vyrlo-col-benefit-title">Remboursement garanti</p>
            <p class="vyrlo-col-benefit-desc">Si votre commande n'est pas livrée dans les délais, remboursement ou remplacement sur demande.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  {% comment %} ── DESCRIPTION longue (from collection.description / body_html) ── {% endcomment %}
  {% if collection.description != blank %}
  <section class="vyrlo-col-description">
    <div class="vyrlo-col-description-inner">
      {{ collection.description }}
    </div>
  </section>
  {% endif %}

</div>

{% schema %}
{
  "name": "Vyrlo Collection",
  "settings": [],
  "presets": [
    { "name": "Vyrlo Collection", "category": "Advanced" }
  ]
}
{% endschema %}
`;
