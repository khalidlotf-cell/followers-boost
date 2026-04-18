export const SECTION = String.raw`{% comment %}
  Vyrlo CTA Banner — "Prêt à booster votre compte ?" avec gradient violet.
{% endcomment %}

{% style %}
  .vcta-{{ section.id }} {
    padding: 96px 0; position: relative; overflow: hidden;
    background: linear-gradient(135deg, {{ section.settings.c1 }} 0%, {{ section.settings.c2 }} 50%, {{ section.settings.c3 }} 100%);
    font-family: Inter, system-ui, sans-serif;
  }
  .vcta-{{ section.id }}::before {
    content: ""; position: absolute;
    top: -80px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
    pointer-events: none;
  }
  .vcta-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; text-align: center; position: relative; z-index: 1; }
  .vcta-{{ section.id }} h2 {
    font-size: clamp(28px, 3.5vw, 48px); font-weight: 800;
    color: #fff; letter-spacing: -0.025em; margin: 0 0 16px;
  }
  .vcta-{{ section.id }} .sub { font-size: 17px; color: rgba(255,255,255,0.75); margin: 0 0 40px; }
  .vcta-{{ section.id }} .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 36px; border-radius: 100px;
    background: #fff; color: {{ section.settings.c2 }};
    font-weight: 800; font-size: 16px; text-decoration: none;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .vcta-{{ section.id }} .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 36px rgba(0,0,0,0.2);
  }
{% endstyle %}

<section class="vcta-{{ section.id }}">
  <div class="container">
    <h2>{{ section.settings.title }}</h2>
    <p class="sub">{{ section.settings.subtitle }}</p>
    <a href="{{ section.settings.cta_url }}" class="btn">{{ section.settings.cta_text }} →</a>
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
