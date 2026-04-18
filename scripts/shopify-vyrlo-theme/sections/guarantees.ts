export const SECTION = String.raw`{% comment %}
  Vyrlo Guarantees — liste éditoriale 2 colonnes.
{% endcomment %}

{% style %}
  .vyrlo-gua-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#ffffff' }}; border-top: 1px solid #f1f5f9; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-gua-{{ section.id }} .gua-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-gua-{{ section.id }} .gua-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 64px; flex-wrap: wrap; gap: 20px; }
  .vyrlo-gua-{{ section.id }} .gua-eyebrow { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
  .vyrlo-gua-{{ section.id }} .gua-h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.03em; margin: 0; line-height: 1.1; }
  .vyrlo-gua-{{ section.id }} .gua-sub { font-size: 15px; color: #94a3b8; max-width: 320px; line-height: 1.75; margin: 0; }
  .vyrlo-gua-{{ section.id }} .gua-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0 !important; }
  @media (max-width: 768px) { .vyrlo-gua-{{ section.id }} .gua-grid { grid-template-columns: minmax(0, 1fr) !important; } }
  .vyrlo-gua-{{ section.id }} .gua-item { padding: 32px 0; border-bottom: 1px solid #f1f5f9; display: flex; gap: 24px; align-items: flex-start; min-width: 0; }
  .vyrlo-gua-{{ section.id }} .gua-item:nth-child(odd) { border-right: 1px solid #f1f5f9; padding-right: 48px; }
  .vyrlo-gua-{{ section.id }} .gua-item:nth-child(even) { padding-left: 48px; }
  @media (max-width: 768px) {
    .vyrlo-gua-{{ section.id }} .gua-item:nth-child(odd), .vyrlo-gua-{{ section.id }} .gua-item:nth-child(even) {
      border-right: none; padding: 24px 0;
    }
  }
  .vyrlo-gua-{{ section.id }} .gua-num { font-size: 13px; font-weight: 800; color: #cbd5e1; letter-spacing: 0.05em; flex-shrink: 0; margin-top: 4px; }
  .vyrlo-gua-{{ section.id }} .gua-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.015em; }
  .vyrlo-gua-{{ section.id }} .gua-desc { font-size: 14px; color: #64748b; line-height: 1.7; margin: 0; }
{% endstyle %}

<section class="vyrlo-gua-{{ section.id }}">
  <div class="gua-container">
    <div class="gua-head">
      <div>
        <p class="gua-eyebrow">{{ section.settings.eyebrow | default: 'Nos engagements' }}</p>
        <h2 class="gua-h2">{{ section.settings.title | default: 'Ce qui nous différencie' }}</h2>
      </div>
      <p class="gua-sub">{{ section.settings.subtitle | default: 'Des services pensés pour votre croissance réelle, pas juste pour les chiffres.' }}</p>
    </div>
    <div class="gua-grid">
      {%- for block in section.blocks -%}
        <div class="gua-item" {{ block.shopify_attributes }}>
          <span class="gua-num">{%- assign n = forloop.index -%}{% if n < 10 %}0{% endif %}{{ n }}</span>
          <div>
            <p class="gua-title">{{ block.settings.title }}</p>
            <p class="gua-desc">{{ block.settings.desc }}</p>
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Garanties",
  "tag": "section",
  "class": "section-vyrlo-guarantees",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Nos engagements" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Ce qui nous différencie" },
    { "type": "textarea", "id": "subtitle", "label": "Sous-titre", "default": "Des services pensés pour votre croissance réelle, pas juste pour les chiffres." },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "guarantee",
      "name": "Garantie",
      "settings": [
        { "type": "text", "id": "title", "label": "Titre", "default": "Livraison progressive" },
        { "type": "textarea", "id": "desc", "label": "Description", "default": "Les abonnés arrivent sur plusieurs heures, pas d'un coup." }
      ]
    }
  ],
  "presets": [{ "name": "Vyrlo · Garanties", "category": "Vyrlo" }]
}
{% endschema %}
`;
