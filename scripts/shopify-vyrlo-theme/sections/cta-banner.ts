export const SECTION = String.raw`{% comment %}
  Vyrlo CTA Banner.
{% endcomment %}

{%- assign c1 = section.settings.c1 | default: '#4f46e5' -%}
{%- assign c2 = section.settings.c2 | default: '#7c3aed' -%}
{%- assign c3 = section.settings.c3 | default: '#9333ea' -%}

{% style %}
  .vyrlo-cta-{{ section.id }} {
    padding: 96px 0; position: relative; overflow: hidden;
    background: linear-gradient(135deg, {{ c1 }} 0%, {{ c2 }} 50%, {{ c3 }} 100%);
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-cta-{{ section.id }}::before {
    content: ""; position: absolute;
    top: -80px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
  }
  .vyrlo-cta-{{ section.id }} .cta-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; text-align: center; position: relative; z-index: 1; }
  .vyrlo-cta-{{ section.id }} .cta-h2 {
    font-size: clamp(28px, 3.5vw, 48px); font-weight: 800;
    color: #fff; letter-spacing: -0.025em; margin: 0 0 16px;
  }
  .vyrlo-cta-{{ section.id }} .cta-sub { font-size: 17px; color: rgba(255,255,255,0.75); margin: 0 0 40px; }
  .vyrlo-cta-{{ section.id }} .cta-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 36px; border-radius: 100px;
    background: #fff; color: {{ c2 }};
    font-weight: 800; font-size: 16px; text-decoration: none;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .vyrlo-cta-{{ section.id }} .cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 36px rgba(0,0,0,0.2);
  }
{% endstyle %}

<section class="vyrlo-cta-{{ section.id }}">
  <div class="cta-container">
    <h2 class="cta-h2">{{ section.settings.title | default: 'Prêt à booster votre compte ?' }}</h2>
    <p class="cta-sub">{{ section.settings.subtitle | default: 'Plus de 6 000 commandes livrées. Sans mot de passe. Livraison en 20 min.' }}</p>
    <a href="{{ section.settings.cta_url | default: '#platforms' }}" class="cta-btn">{{ section.settings.cta_text | default: 'Choisir mon offre' }} →</a>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · CTA Banner",
  "tag": "section",
  "class": "section-vyrlo-cta",
  "settings": [
    { "type": "text", "id": "title", "label": "Titre", "default": "Prêt à booster votre compte ?" },
    { "type": "text", "id": "subtitle", "label": "Sous-titre", "default": "Plus de 6 000 commandes livrées. Sans mot de passe. Livraison en 20 min." },
    { "type": "text", "id": "cta_text", "label": "Bouton texte", "default": "Choisir mon offre" },
    { "type": "text", "id": "cta_url", "label": "Bouton lien", "default": "#platforms" },
    { "type": "color", "id": "c1", "label": "Gradient début", "default": "#4f46e5" },
    { "type": "color", "id": "c2", "label": "Gradient milieu", "default": "#7c3aed" },
    { "type": "color", "id": "c3", "label": "Gradient fin", "default": "#9333ea" }
  ],
  "presets": [{ "name": "Vyrlo · CTA Banner", "category": "Vyrlo" }]
}
{% endschema %}
`;
