export const SECTION = String.raw`{% comment %}
  Vyrlo Page — style éditorial propre pour les pages (CGU, Confidentialité, etc.)
{% endcomment %}

{% style %}
  .vyrlo-pg-{{ section.id }} { padding: 72px 0 88px; background: {{ section.settings.bg | default: '#ffffff' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-pg-{{ section.id }} .pg-inner { max-width: 780px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-pg-{{ section.id }} .pg-eyebrow {
    font-size: 12px; font-weight: 700; color: #7c3aed;
    text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;
  }
  .vyrlo-pg-{{ section.id }} .pg-title {
    font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: #0a0a0a;
    letter-spacing: -0.025em; margin: 0 0 8px; line-height: 1.08;
  }
  .vyrlo-pg-{{ section.id }} .pg-meta {
    font-size: 14px; color: #94a3b8; margin: 0 0 48px;
  }
  .vyrlo-pg-{{ section.id }} .pg-rte { font-size: 15.5px; color: #334155; line-height: 1.85; }
  .vyrlo-pg-{{ section.id }} .pg-rte h1, .vyrlo-pg-{{ section.id }} .pg-rte h2 {
    font-size: 22px; font-weight: 700; color: #0f172a;
    letter-spacing: -0.01em; margin: 40px 0 12px;
  }
  .vyrlo-pg-{{ section.id }} .pg-rte h3 {
    font-size: 18px; font-weight: 700; color: #0f172a; margin: 32px 0 10px;
  }
  .vyrlo-pg-{{ section.id }} .pg-rte p { margin: 0 0 14px; }
  .vyrlo-pg-{{ section.id }} .pg-rte ul, .vyrlo-pg-{{ section.id }} .pg-rte ol { padding-left: 22px; margin: 0 0 14px; }
  .vyrlo-pg-{{ section.id }} .pg-rte li { margin: 6px 0; line-height: 1.7; }
  .vyrlo-pg-{{ section.id }} .pg-rte a { color: #7c3aed; text-decoration: underline; text-underline-offset: 2px; }
  .vyrlo-pg-{{ section.id }} .pg-rte a:hover { color: #4f46e5; }
  .vyrlo-pg-{{ section.id }} .pg-rte strong { color: #0f172a; }
  .vyrlo-pg-{{ section.id }} .pg-rte blockquote {
    border-left: 3px solid #7c3aed; padding: 4px 0 4px 18px; margin: 18px 0;
    color: #475569; font-style: italic;
  }
{% endstyle %}

<section class="vyrlo-pg-{{ section.id }}">
  <div class="pg-inner">
    {% if section.settings.eyebrow != blank %}<p class="pg-eyebrow">{{ section.settings.eyebrow }}</p>{% endif %}
    <h1 class="pg-title">{{ page.title }}</h1>
    {% if section.settings.show_updated %}<p class="pg-meta">Dernière mise à jour : avril 2026</p>{% endif %}
    <div class="pg-rte">{{ page.content }}</div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Page",
  "tag": "section",
  "class": "section-vyrlo-page",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow (surtitre)", "default": "Légal" },
    { "type": "checkbox", "id": "show_updated", "label": "Afficher 'dernière mise à jour'", "default": true },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Vyrlo · Page", "category": "Vyrlo" }]
}
{% endschema %}
`;
