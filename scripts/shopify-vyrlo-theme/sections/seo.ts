export const SECTION = String.raw`{% comment %}
  Vyrlo SEO content — N blocs H2 + richtext pour du contenu éditorial long.
{% endcomment %}

{% style %}
  .vyrlo-seo-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#ffffff' }}; border-top: 1px solid #f1f5f9; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-seo-{{ section.id }} .seo-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-seo-{{ section.id }} .seo-block { margin-bottom: 64px; }
  .vyrlo-seo-{{ section.id }} .seo-block:last-child { margin-bottom: 0; }
  .vyrlo-seo-{{ section.id }} .seo-h2 { font-size: clamp(22px, 2.5vw, 32px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 16px; line-height: 1.2; }
  .vyrlo-seo-{{ section.id }} .seo-rte { font-size: 15px; color: #475569; line-height: 1.85; }
  .vyrlo-seo-{{ section.id }} .seo-rte p { margin: 0 0 14px; }
  .vyrlo-seo-{{ section.id }} .seo-rte p:last-child { margin-bottom: 0; }
  .vyrlo-seo-{{ section.id }} .seo-rte strong { color: #0f172a; font-weight: 700; }
  .vyrlo-seo-{{ section.id }} .seo-rte a { color: #7c3aed; text-decoration: underline; text-underline-offset: 2px; }
{% endstyle %}

<section class="vyrlo-seo-{{ section.id }}">
  <div class="seo-inner">
    {%- for block in section.blocks -%}
      <div class="seo-block" {{ block.shopify_attributes }}>
        <h2 class="seo-h2">{{ block.settings.title }}</h2>
        <div class="seo-rte">{{ block.settings.content }}</div>
      </div>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Contenu SEO",
  "tag": "section",
  "class": "section-vyrlo-seo",
  "settings": [
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "seo_block",
      "name": "Bloc SEO",
      "settings": [
        { "type": "text", "id": "title", "label": "Titre H2", "default": "Pourquoi acheter des followers sur les réseaux sociaux ?" },
        { "type": "richtext", "id": "content", "label": "Contenu",
          "default": "<p>Le nombre d'abonnés d'un profil est la première chose qu'un visiteur regarde. Un compte crédible convertit mieux.</p>" }
      ]
    }
  ],
  "presets": [{ "name": "Vyrlo · Contenu SEO", "category": "Vyrlo" }]
}
{% endschema %}
`;
