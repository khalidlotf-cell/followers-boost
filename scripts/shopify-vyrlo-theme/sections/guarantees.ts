export const SECTION = String.raw`{% comment %}
  Vyrlo Guarantees — liste éditoriale 2 colonnes.
{% endcomment %}

{% style %}
  .vyrlo-gua-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg }}; border-top: 1px solid #f1f5f9; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-gua-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-gua-{{ section.id }} .head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 64px; flex-wrap: wrap; gap: 20px; }
  .vyrlo-gua-{{ section.id }} .eyebrow { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
  .vyrlo-gua-{{ section.id }} h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.03em; margin: 0; line-height: 1.1; }
  .vyrlo-gua-{{ section.id }} .head p { font-size: 15px; color: #94a3b8; max-width: 320px; line-height: 1.75; margin: 0; }
  .vyrlo-gua-{{ section.id }} .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  @media (max-width: 768px) { .vyrlo-gua-{{ section.id }} .grid { grid-template-columns: 1fr; } }
  .vyrlo-gua-{{ section.id }} .item { padding: 32px 0; border-bottom: 1px solid #f1f5f9; display: flex; gap: 24px; align-items: flex-start; }
  .vyrlo-gua-{{ section.id }} .item:nth-child(odd) { border-right: 1px solid #f1f5f9; padding-right: 48px; }
  .vyrlo-gua-{{ section.id }} .item:nth-child(even) { padding-left: 48px; }
  @media (max-width: 768px) {
    .vyrlo-gua-{{ section.id }} .item:nth-child(odd), .vyrlo-gua-{{ section.id }} .item:nth-child(even) {
      border-right: none; padding: 24px 0;
    }
  }
  .vyrlo-gua-{{ section.id }} .num { font-size: 11px; font-weight: 800; color: #cbd5e1; letter-spacing: 0.05em; flex-shrink: 0; margin-top: 4px; }
  .vyrlo-gua-{{ section.id }} .item-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.015em; }
  .vyrlo-gua-{{ section.id }} .item-desc { font-size: 14px; color: #64748b; line-height: 1.7; margin: 0; }
{% endstyle %}

<section class="vyrlo-gua-{{ section.id }}">
  <div class="container">
    <div class="head">
      <div>
        <p class="eyebrow">{{ section.settings.eyebrow }}</p>
        <h2>{{ section.settings.title }}</h2>
      </div>
      <p>{{ section.settings.subtitle }}</p>
    </div>
    <div class="grid">
      {%- for block in section.blocks -%}
        <div class="item" {{ block.shopify_attributes }}>
          <span class="num">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>
          <div>
            <p class="item-title">{{ block.settings.title }}</p>
            <p class="item-desc">{{ block.settings.desc }}</p>
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
  "presets": [{
    "name": "Vyrlo · Garanties",
    "category": "Vyrlo",
    "blocks": [
      { "type": "guarantee", "settings": { "title": "Livraison progressive", "desc": "Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser." } },
      { "type": "guarantee", "settings": { "title": "Profils ciblés France", "desc": "Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu." } },
      { "type": "guarantee", "settings": { "title": "Refill automatique", "desc": "Un drop ? Le refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées." } },
      { "type": "guarantee", "settings": { "title": "Démarrage en quelques heures", "desc": "Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures." } },
      { "type": "guarantee", "settings": { "title": "Aucun mot de passe requis", "desc": "Vos accès restent privés. On a seulement besoin du lien de votre profil ou de votre publication." } },
      { "type": "guarantee", "settings": { "title": "Support humain 7j/7", "desc": "Une vraie équipe qui répond en moins d'une heure. Pas un bot, pas une FAQ automatique." } }
    ]
  }]
}
{% endschema %}
`;
