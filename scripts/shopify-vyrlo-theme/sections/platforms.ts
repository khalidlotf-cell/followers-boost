export const SECTION = String.raw`{% comment %}
  Vyrlo Platforms — bento grid des 7 plateformes.
{% endcomment %}

{% style %}
  .vyrlo-pf-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-pf-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-pf-{{ section.id }} .head { margin-bottom: 44px; }
  .vyrlo-pf-{{ section.id }} .eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .vyrlo-pf-{{ section.id }} h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 8px; }
  .vyrlo-pf-{{ section.id }} .head p { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-pf-{{ section.id }} .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 900px) { .vyrlo-pf-{{ section.id }} .grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .vyrlo-pf-{{ section.id }} .grid { grid-template-columns: 1fr; } }
  .vyrlo-pf-{{ section.id }} .cell {
    position: relative; border-radius: 20px; overflow: hidden;
    background: #fff; border: 1.5px solid #f1f5f9; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 180px; transition: all 0.2s; text-decoration: none;
  }
  .vyrlo-pf-{{ section.id }} .cell:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(15,23,42,0.08); border-color: #e2e8f0; }
  .vyrlo-pf-{{ section.id }} .cell.big { grid-column: span 2; min-height: 240px; }
  @media (max-width: 560px) { .vyrlo-pf-{{ section.id }} .cell.big { grid-column: span 1; } }
  .vyrlo-pf-{{ section.id }} .top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto; }
  .vyrlo-pf-{{ section.id }} .icon { width: 44px; height: 44px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
  .vyrlo-pf-{{ section.id }} .cell.big .icon { width: 52px; height: 52px; }
  .vyrlo-pf-{{ section.id }} .price { font-size: 12px; font-weight: 600; color: #94a3b8; background: #f1f5f9; border-radius: 100px; padding: 4px 12px; }
  .vyrlo-pf-{{ section.id }} .name { font-weight: 800; font-size: 20px; color: #0f172a; letter-spacing: -0.02em; margin: 0 0 10px; }
  .vyrlo-pf-{{ section.id }} .cell.big .name { font-size: 26px; }
  .vyrlo-pf-{{ section.id }} .tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .vyrlo-pf-{{ section.id }} .tag { font-size: 11px; font-weight: 600; border-radius: 100px; padding: 3px 10px; }
{% endstyle %}

<section class="vyrlo-pf-{{ section.id }}">
  <div class="container">
    <div class="head">
      <p class="eyebrow">{{ section.settings.eyebrow }}</p>
      <h2>{{ section.settings.title }}</h2>
      <p>{{ section.settings.subtitle }}</p>
    </div>
    <div class="grid">
      {%- for block in section.blocks -%}
        {%- assign b = block.settings -%}
        <a href="/collections/{{ b.slug }}" class="cell {% if b.big %}big{% endif %}" {{ block.shopify_attributes }}>
          <div class="top">
            <div class="icon" style="background: {{ b.color }}18;">{% render 'vyrlo-logo', slug: b.slug, size: 32 %}</div>
            <span class="price">{{ b.price }}</span>
          </div>
          <div>
            <p class="name">{{ b.label }}</p>
            <div class="tags">
              {%- assign tags = b.tags | split: ',' -%}
              {%- for t in tags -%}
                <span class="tag" style="color: {{ b.color }}; background: {{ b.color }}14;">{{ t | strip }}</span>
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
        { "type": "text", "id": "tags", "label": "Tags (séparés par virgules)", "default": "Abonnés, Likes, Vues, Commentaires" },
        { "type": "text", "id": "price", "label": "Prix à partir de", "default": "À partir de 8,90 €" },
        { "type": "checkbox", "id": "big", "label": "Affichage grande taille", "default": false }
      ]
    }
  ],
  "presets": [
    {
      "name": "Vyrlo · Plateformes",
      "category": "Vyrlo",
      "blocks": [
        { "type": "platform", "settings": { "slug": "instagram", "label": "Instagram", "color": "#e1306c", "tags": "Abonnés, Likes, Vues, Commentaires", "big": true } },
        { "type": "platform", "settings": { "slug": "tiktok", "label": "TikTok", "color": "#010101", "tags": "Abonnés, Likes, Vues" } },
        { "type": "platform", "settings": { "slug": "youtube", "label": "YouTube", "color": "#FF0000", "tags": "Abonnés, Vues, Likes" } },
        { "type": "platform", "settings": { "slug": "facebook", "label": "Facebook", "color": "#1877F2", "tags": "Abonnés, Likes, Vues" } },
        { "type": "platform", "settings": { "slug": "twitter", "label": "Twitter / X", "color": "#14171A", "tags": "Abonnés, Likes, Retweets" } },
        { "type": "platform", "settings": { "slug": "spotify", "label": "Spotify", "color": "#1DB954", "tags": "Streams, Auditeurs" } },
        { "type": "platform", "settings": { "slug": "threads", "label": "Threads", "color": "#101010", "tags": "Abonnés, Likes" } }
      ]
    }
  ]
}
{% endschema %}
`;
