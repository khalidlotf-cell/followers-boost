export const SECTION = String.raw`{% comment %}
  Vyrlo FAQ — accordéon <details> natif. Items = blocks.
{% endcomment %}

{% style %}
  .vyrlo-faq-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-faq-{{ section.id }} .inner { max-width: 720px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-faq-{{ section.id }} .head { text-align: center; margin-bottom: 52px; }
  .vyrlo-faq-{{ section.id }} .eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .vyrlo-faq-{{ section.id }} h2 { font-size: clamp(28px, 3vw, 42px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0; }
  .vyrlo-faq-{{ section.id }} .item { border-bottom: 1px solid #e2e8f0; padding: 20px 0; }
  .vyrlo-faq-{{ section.id }} .item[open] { border-color: #7c3aed; }
  .vyrlo-faq-{{ section.id }} summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: 600; font-size: 16px; color: #0f172a; }
  .vyrlo-faq-{{ section.id }} summary::-webkit-details-marker { display: none; }
  .vyrlo-faq-{{ section.id }} summary::after { content: "+"; width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid #e2e8f0; display: inline-flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 16px; transition: all 0.2s; }
  .vyrlo-faq-{{ section.id }} .item[open] summary::after { content: "−"; background: #7c3aed; border-color: #7c3aed; color: #fff; }
  .vyrlo-faq-{{ section.id }} .answer { margin: 14px 0 0; color: #64748b; font-size: 14.5px; line-height: 1.75; }
{% endstyle %}

<section class="vyrlo-faq-{{ section.id }}" {% if section.settings.anchor != blank %}id="{{ section.settings.anchor }}"{% endif %}>
  <div class="inner">
    <div class="head">
      <p class="eyebrow">{{ section.settings.eyebrow }}</p>
      <h2>{{ section.settings.title }}</h2>
    </div>
    {%- for block in section.blocks -%}
      <details class="item" {{ block.shopify_attributes }}>
        <summary>{{ block.settings.q }}</summary>
        <p class="answer">{{ block.settings.a }}</p>
      </details>
    {%- endfor -%}
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · FAQ",
  "tag": "section",
  "class": "section-vyrlo-faq",
  "settings": [
    { "type": "text", "id": "anchor", "label": "Ancre (ID)", "default": "faq" },
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "FAQ" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Questions fréquentes" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#fafbff" }
  ],
  "blocks": [
    {
      "type": "faq_item",
      "name": "Question",
      "settings": [
        { "type": "text", "id": "q", "label": "Question", "default": "Est-ce que c'est sécurisé ?" },
        { "type": "textarea", "id": "a", "label": "Réponse", "default": "Oui, totalement." }
      ]
    }
  ],
  "presets": [{
    "name": "Vyrlo · FAQ",
    "category": "Vyrlo",
    "blocks": [
      { "type": "faq_item", "settings": { "q": "Est-ce que c'est sécurisé ?", "a": "Oui, totalement. Nous n'avons jamais besoin de votre mot de passe. Nos méthodes respectent les conditions d'utilisation des plateformes." } },
      { "type": "faq_item", "settings": { "q": "Combien de temps prend la livraison ?", "a": "La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée." } },
      { "type": "faq_item", "settings": { "q": "Les followers/likes sont-ils réels ?", "a": "Nos services varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des comptes de haute qualité." } },
      { "type": "faq_item", "settings": { "q": "Que faire si ma commande ne démarre pas ?", "a": "Contactez notre support disponible 7j/7. Nous garantissons le remboursement ou le remplacement si la commande n'est pas livrée." } },
      { "type": "faq_item", "settings": { "q": "Puis-je commander pour n'importe quel compte ?", "a": "Oui, tant que le compte est public au moment de la commande. Pour les likes et vues, la publication doit être accessible." } }
    ]
  }]
}
{% endschema %}
`;
