export const SECTION = String.raw`{% comment %}
  Vyrlo Collection Products — grille des produits de la collection.
{% endcomment %}

{%- liquid
  assign slug = collection.handle
  assign platform_color = '#7c3aed'
  case slug
    when 'instagram' then assign platform_color = '#e1306c'
    when 'tiktok'    then assign platform_color = '#010101'
    when 'youtube'   then assign platform_color = '#FF0000'
    when 'facebook'  then assign platform_color = '#1877F2'
    when 'twitter'   then assign platform_color = '#000000'
    when 'spotify'   then assign platform_color = '#1DB954'
    when 'threads'   then assign platform_color = '#000000'
  endcase
-%}

{% style %}
  .vyrlo-cp-{{ section.id }} { background: {{ section.settings.bg | default: '#ffffff' }}; padding: 56px 0 72px; border-radius: {{ section.settings.radius | default: 32 }}px {{ section.settings.radius | default: 32 }}px 0 0; margin-top: -32px; position: relative; z-index: 2; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-cp-{{ section.id }} .cp-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-cp-{{ section.id }} .cp-head { margin-bottom: 32px; text-align: center; }
  .vyrlo-cp-{{ section.id }} .cp-eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .vyrlo-cp-{{ section.id }} .cp-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 8px; letter-spacing: -0.025em; color: #0a0a0a; }
  .vyrlo-cp-{{ section.id }} .cp-sub { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-cp-{{ section.id }} .cp-grid { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 20px !important; margin-top: 40px; }
  @media (max-width: 900px) { .vyrlo-cp-{{ section.id }} .cp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
  @media (max-width: 560px) { .vyrlo-cp-{{ section.id }} .cp-grid { grid-template-columns: minmax(0, 1fr) !important; } }
  .vyrlo-cp-{{ section.id }} .cp-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 24px; transition: all 0.2s; display: flex; flex-direction: column; gap: 12px; text-decoration: none; color: inherit; min-width: 0; }
  .vyrlo-cp-{{ section.id }} .cp-card:hover { border-color: {{ platform_color }}; transform: translateY(-4px); box-shadow: 0 12px 30px rgba(15,23,42,0.08); }
  .vyrlo-cp-{{ section.id }} .cp-title { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.015em; margin: 0; }
  .vyrlo-cp-{{ section.id }} .cp-desc { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0; flex-grow: 1; }
  .vyrlo-cp-{{ section.id }} .cp-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f1f5f9; }
  .vyrlo-cp-{{ section.id }} .cp-price { font-size: 14px; font-weight: 700; color: {{ platform_color }}; }
  .vyrlo-cp-{{ section.id }} .cp-cta { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 700; color: #fff; background: #0f172a; padding: 8px 16px; border-radius: 100px; transition: background 0.15s; white-space: nowrap; }
  .vyrlo-cp-{{ section.id }} .cp-card:hover .cp-cta { background: {{ platform_color }}; }
{% endstyle %}

<section class="vyrlo-cp-{{ section.id }}">
  <div class="cp-container">
    <div class="cp-head">
      <p class="cp-eyebrow">{{ section.settings.eyebrow | default: 'Catalogue' }}</p>
      <h2 class="cp-h2">{{ section.settings.title_prefix | default: 'Nos services' }} {{ collection.title }}</h2>
      <p class="cp-sub">{{ collection.products_count }} service{% if collection.products_count > 1 %}s{% endif %} disponibles</p>
    </div>
    <div class="cp-grid">
      {%- for product in collection.products -%}
        <a href="{{ product.url }}" class="cp-card">
          <h3 class="cp-title">{{ product.title }}</h3>
          <p class="cp-desc">{{ section.settings.card_desc | default: 'Livraison progressive · Sans mot de passe · Support 7j/7' }}</p>
          <div class="cp-foot">
            <span class="cp-price">Dès {{ product.price_min | money_without_trailing_zeros }}</span>
            <span class="cp-cta">Commander →</span>
          </div>
        </a>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Produits",
  "tag": "section",
  "class": "section-vyrlo-col-products",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Catalogue" },
    { "type": "text", "id": "title_prefix", "label": "Préfixe titre", "default": "Nos services" },
    { "type": "textarea", "id": "card_desc", "label": "Description carte", "default": "Livraison progressive · Sans mot de passe · Support 7j/7" },
    { "type": "range", "id": "radius", "label": "Radius", "min": 0, "max": 40, "step": 4, "default": 32, "unit": "px" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Vyrlo · Produits", "category": "Vyrlo" }]
}
{% endschema %}
`;
