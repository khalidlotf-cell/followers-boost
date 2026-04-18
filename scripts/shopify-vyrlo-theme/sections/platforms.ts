export const SECTION = String.raw`{% comment %}
  Vyrlo Platforms — bento grid des plateformes.
{% endcomment %}

{% style %}
  .vyrlo-pf-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#ffffff' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-pf-{{ section.id }} .pf-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-pf-{{ section.id }} .pf-head { margin-bottom: 44px; }
  .vyrlo-pf-{{ section.id }} .pf-eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .vyrlo-pf-{{ section.id }} .pf-h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 8px; }
  .vyrlo-pf-{{ section.id }} .pf-sub { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-pf-{{ section.id }} .pf-grid { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 16px !important; }
  @media (max-width: 900px) { .vyrlo-pf-{{ section.id }} .pf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
  @media (max-width: 560px) { .vyrlo-pf-{{ section.id }} .pf-grid { grid-template-columns: minmax(0, 1fr) !important; } }
  .vyrlo-pf-{{ section.id }} .pf-cell {
    position: relative; border-radius: 20px; overflow: hidden;
    background: #fff; border: 1.5px solid #f1f5f9; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 180px; min-width: 0; transition: all 0.2s; text-decoration: none; color: inherit;
  }
  .vyrlo-pf-{{ section.id }} .pf-cell:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(15,23,42,0.08); border-color: #e2e8f0; }
  .vyrlo-pf-{{ section.id }} .pf-cell.pf-big { grid-column: span 2; min-height: 240px; }
  @media (max-width: 560px) { .vyrlo-pf-{{ section.id }} .pf-cell.pf-big { grid-column: span 1; } }
  .vyrlo-pf-{{ section.id }} .pf-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto; gap: 12px; }
  .vyrlo-pf-{{ section.id }} .pf-icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .vyrlo-pf-{{ section.id }} .pf-cell.pf-big .pf-icon { width: 52px; height: 52px; }
  .vyrlo-pf-{{ section.id }} .pf-price { font-size: 12px; font-weight: 600; color: #94a3b8; background: #f1f5f9; border-radius: 100px; padding: 4px 12px; white-space: nowrap; }
  .vyrlo-pf-{{ section.id }} .pf-name { font-weight: 800; font-size: 20px; color: #0f172a; letter-spacing: -0.02em; margin: 0 0 10px; }
  .vyrlo-pf-{{ section.id }} .pf-cell.pf-big .pf-name { font-size: 26px; }
  .vyrlo-pf-{{ section.id }} .pf-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .vyrlo-pf-{{ section.id }} .pf-tag { font-size: 11px; font-weight: 600; border-radius: 100px; padding: 3px 10px; white-space: nowrap; }
{% endstyle %}

<section class="vyrlo-pf-{{ section.id }}">
  <div class="pf-container">
    <div class="pf-head">
      <p class="pf-eyebrow">{{ section.settings.eyebrow | default: 'Catalogue' }}</p>
      <h2 class="pf-h2">{{ section.settings.title | default: 'Choisissez votre plateforme' }}</h2>
      <p class="pf-sub">{{ section.settings.subtitle | default: 'Services disponibles pour toutes les grandes plateformes' }}</p>
    </div>
    <div class="pf-grid">
      {%- for block in section.blocks -%}
        {%- assign b = block.settings -%}
        <a href="/collections/{{ b.slug }}" class="pf-cell {% if b.big %}pf-big{% endif %}" {{ block.shopify_attributes }}>
          <div class="pf-top">
            <div class="pf-icon" style="background: {{ b.color }}18;">{% render 'vyrlo-logo', slug: b.slug, size: 32 %}</div>
            <span class="pf-price">{{ b.price }}</span>
          </div>
          <div>
            <p class="pf-name">{{ b.label }}</p>
            <div class="pf-tags">
              {%- assign tags = b.tags | split: ',' -%}
              {%- for t in tags -%}
                <span class="pf-tag" style="color: {{ b.color }}; background: {{ b.color }}14;">{{ t | strip }}</span>
              {%- endfor -%}
            </div>
          </div>
        </a>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Plateformes",
  "tag": "section",
  "class": "section-vyrlo-platforms",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Catalogue" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Choisissez votre plateforme" },
    { "type": "text", "id": "subtitle", "label": "Sous-titre", "default": "Services disponibles pour toutes les grandes plateformes" },
    { "type": "color", "id": "bg", "label": "Fond section", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "platform",
      "name": "Plateforme",
      "settings": [
        { "type": "select", "id": "slug", "label": "Plateforme",
          "options": [
            { "value": "instagram", "label": "Instagram" },
            { "value": "tiktok", "label": "TikTok" },
            { "value": "youtube", "label": "YouTube" },
            { "value": "facebook", "label": "Facebook" },
            { "value": "twitter", "label": "Twitter / X" },
            { "value": "spotify", "label": "Spotify" },
            { "value": "threads", "label": "Threads" }
          ], "default": "instagram" },
        { "type": "text", "id": "label", "label": "Nom affiché", "default": "Instagram" },
        { "type": "color", "id": "color", "label": "Couleur", "default": "#e1306c" },
        { "type": "text", "id": "tags", "label": "Tags (virgules)", "default": "Abonnés, Likes, Vues" },
        { "type": "text", "id": "price", "label": "Prix à partir de", "default": "À partir de 8,90 €" },
        { "type": "checkbox", "id": "big", "label": "Grande taille", "default": false }
      ]
    }
  ],
  "presets": [{ "name": "Vyrlo · Plateformes", "category": "Vyrlo" }]
}
{% endschema %}
`;
