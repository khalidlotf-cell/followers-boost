export const SECTION = String.raw`{% comment %}
  Vyrlo Announce bar.
{% endcomment %}

{% style %}
  .vyrlo-ann-{{ section.id }} {
    background: linear-gradient(90deg, {{ section.settings.color_start | default: '#7c3aed' }} 0%, {{ section.settings.color_end | default: '#4f46e5' }} 100%);
    color: #fff; text-align: center; padding: 10px 16px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
    font-family: Inter, system-ui, sans-serif;
  }
{% endstyle %}

<div class="vyrlo-ann-{{ section.id }}">{{ section.settings.text | default: '⚡ Livraison express · Démarrage sous 20 min · Satisfait ou remboursé' }}</div>

{% schema %}
{
  "name": "Vyrlo · Bannière promo",
  "tag": "section",
  "class": "section-vyrlo-announce",
  "settings": [
    { "type": "text", "id": "text", "label": "Texte", "default": "⚡ Livraison express · Démarrage sous 20 min · Satisfait ou remboursé" },
    { "type": "color", "id": "color_start", "label": "Couleur début", "default": "#7c3aed" },
    { "type": "color", "id": "color_end", "label": "Couleur fin", "default": "#4f46e5" }
  ],
  "presets": [{ "name": "Vyrlo · Bannière promo", "category": "Vyrlo" }]
}
{% endschema %}
`;
