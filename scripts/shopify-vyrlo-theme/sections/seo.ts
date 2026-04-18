export const SECTION = String.raw`{% comment %}
  Vyrlo SEO content.
{% endcomment %}

{% style %}
  .vyrlo-seo-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#ffffff' }}; border-top: 1px solid #f1f5f9; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-seo-{{ section.id }} .seo-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-seo-{{ section.id }} .seo-h2 { font-size: clamp(22px, 2.5vw, 32px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 16px; }
  .vyrlo-seo-{{ section.id }} .seo-rte { font-size: 15px; color: #475569; line-height: 1.85; }
  .vyrlo-seo-{{ section.id }} .seo-rte p { margin: 0 0 14px; }
{% endstyle %}

<section class="vyrlo-seo-{{ section.id }}">
  <div class="seo-inner">
    <h2 class="seo-h2">{{ section.settings.title | default: 'Pourquoi acheter des followers sur les réseaux sociaux ?' }}</h2>
    <div class="seo-rte">{% if section.settings.content != blank %}{{ section.settings.content }}{% else %}<p>Le nombre d'abonnés d'un profil est la première chose qu'un visiteur regarde. Un compte crédible convertit mieux. Les algorithmes des plateformes récompensent la croissance rapide. Un boost initial combiné à du contenu de qualité peut multiplier votre portée organique.</p>{% endif %}</div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Contenu SEO",
  "tag": "section",
  "class": "section-vyrlo-seo",
  "settings": [
    { "type": "text", "id": "title", "label": "Titre", "default": "Pourquoi acheter des followers sur les réseaux sociaux ?" },
    { "type": "richtext", "id": "content", "label": "Contenu",
      "default": "<p>Le nombre d'abonnés d'un profil est la première chose qu'un visiteur regarde avant de décider de s'abonner ou d'acheter. C'est la preuve sociale. Les algorithmes de toutes les plateformes poussent les comptes qui grossissent vite vers de nouvelles audiences.</p><p>Combiné à du contenu de qualité, un boost initial peut multiplier votre portée organique par 5 à 20 dans les semaines qui suivent.</p>" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Vyrlo · Contenu SEO", "category": "Vyrlo" }]
}
{% endschema %}
`;
