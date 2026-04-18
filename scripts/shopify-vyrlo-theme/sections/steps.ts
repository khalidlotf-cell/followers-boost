export const SECTION = String.raw`{% comment %}
  Vyrlo Steps — 3 étapes "Comment ça marche".
{% endcomment %}

{% style %}
  .vyrlo-st-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-st-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-st-{{ section.id }} .head { text-align: center; margin-bottom: 64px; }
  .vyrlo-st-{{ section.id }} .eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .vyrlo-st-{{ section.id }} h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 10px; }
  .vyrlo-st-{{ section.id }} .head p { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-st-{{ section.id }} .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
  @media (max-width: 768px) { .vyrlo-st-{{ section.id }} .grid { grid-template-columns: 1fr; gap: 32px; } }
  .vyrlo-st-{{ section.id }} .step { text-align: center; padding: 0 40px; }
  .vyrlo-st-{{ section.id }} .num {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    box-shadow: 0 4px 20px rgba(124,58,237,0.35);
    color: #fff; font-weight: 800; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
  }
  .vyrlo-st-{{ section.id }} h3 { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 10px; }
  .vyrlo-st-{{ section.id }} .step p { font-size: 14px; color: #64748b; line-height: 1.75; margin: 0; }
{% endstyle %}

<section class="vyrlo-st-{{ section.id }}">
  <div class="container">
    <div class="head">
      <p class="eyebrow">{{ section.settings.eyebrow }}</p>
      <h2>{{ section.settings.title }}</h2>
      <p>{{ section.settings.subtitle }}</p>
    </div>
    <div class="grid">
      {%- for block in section.blocks -%}
        <div class="step" {{ block.shopify_attributes }}>
          <div class="num">{{ forloop.index }}</div>
          <h3>{{ block.settings.title }}</h3>
          <p>{{ block.settings.desc }}</p>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Comment ça marche",
  "tag": "section",
  "class": "section-vyrlo-steps",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Simple & rapide" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Comment ça marche ?" },
    { "type": "text", "id": "subtitle", "label": "Sous-titre", "default": "3 étapes, moins de 2 minutes" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#fafbff" }
  ],
  "blocks": [
    {
      "type": "step",
      "name": "Étape",
      "settings": [
        { "type": "text", "id": "title", "label": "Titre", "default": "Choisissez votre service" },
        { "type": "textarea", "id": "desc", "label": "Description", "default": "Sélectionnez la plateforme et le service qui vous correspond." }
      ]
    }
  ],
  "presets": [{
    "name": "Vyrlo · Comment ça marche",
    "category": "Vyrlo",
    "blocks": [
      { "type": "step", "settings": { "title": "Choisissez votre service", "desc": "Sélectionnez la plateforme et le service qui vous correspond parmi notre catalogue." } },
      { "type": "step", "settings": { "title": "Entrez vos informations", "desc": "Indiquez le lien de votre profil ou publication. Aucun mot de passe requis." } },
      { "type": "step", "settings": { "title": "Livraison automatique", "desc": "Votre commande est traitée et livrée en quelques minutes de façon 100% sécurisée." } }
    ]
  }]
}
{% endschema %}
`;
