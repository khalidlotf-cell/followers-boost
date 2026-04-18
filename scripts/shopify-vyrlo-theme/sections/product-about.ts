export const SECTION = String.raw`{% comment %}
  Vyrlo Product About — card "À propos de ce service" avec description + badges colorés.
{% endcomment %}

{% style %}
  .vyrlo-about-{{ section.id }} { padding: 0 16px 56px; background: {{ section.settings.bg | default: '#f8fafc' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-about-{{ section.id }} .va-card {
    max-width: 680px; margin: -66px auto 0;
    background: #fff; border-radius: 20px; padding: 22px 24px;
    border: 1px solid #e2e8f0;
  }
  .vyrlo-about-{{ section.id }} .va-eyebrow {
    font-size: 11px; font-weight: 700; color: #7c3aed;
    text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;
  }
  .vyrlo-about-{{ section.id }} .va-desc { font-size: 14px; color: #475569; line-height: 1.75; margin: 0 0 16px; }
  .vyrlo-about-{{ section.id }} .va-badges { display: flex; flex-wrap: wrap; gap: 7px; }
  .vyrlo-about-{{ section.id }} .va-badge {
    font-size: 12px; font-weight: 700; padding: 5px 13px; border-radius: 100px;
    border: 1px solid; white-space: nowrap;
  }
  .vyrlo-about-{{ section.id }} .va-b-1 { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
  .vyrlo-about-{{ section.id }} .va-b-2 { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
  .vyrlo-about-{{ section.id }} .va-b-3 { background: #fefce8; color: #ca8a04; border-color: #fde68a; }
  .vyrlo-about-{{ section.id }} .va-b-4 { background: #fdf4ff; color: #9333ea; border-color: #e9d5ff; }
{% endstyle %}

<section class="vyrlo-about-{{ section.id }}">
  <div class="va-card">
    <p class="va-eyebrow">{{ section.settings.eyebrow | default: 'À propos de ce service' }}</p>
    <p class="va-desc">{{ section.settings.description | default: 'Un service rapide, discret et efficace. Pas de compte à créer, pas de mot de passe à donner. Juste votre lien et un paiement sécurisé par carte.' }}</p>
    <div class="va-badges">
      {%- for block in section.blocks -%}
        {%- assign n = forloop.index | modulo: 4 -%}
        {%- if n == 0 -%}{%- assign cls = 'va-b-4' -%}
        {%- elsif n == 1 -%}{%- assign cls = 'va-b-1' -%}
        {%- elsif n == 2 -%}{%- assign cls = 'va-b-2' -%}
        {%- else -%}{%- assign cls = 'va-b-3' -%}
        {%- endif -%}
        <span class="va-badge {{ cls }}" {{ block.shopify_attributes }}>{{ block.settings.text }}</span>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · À propos service",
  "tag": "section",
  "class": "section-vyrlo-about",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "À propos de ce service" },
    { "type": "textarea", "id": "description", "label": "Description", "default": "Un service rapide, discret et efficace. Pas de compte à créer, pas de mot de passe à donner. Juste votre lien et un paiement sécurisé par carte." },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "blocks": [
    {
      "type": "badge",
      "name": "Badge",
      "settings": [
        { "type": "text", "id": "text", "label": "Texte", "default": "⚡ Livraison rapide" }
      ]
    }
  ],
  "presets": [{
    "name": "Vyrlo · À propos service",
    "category": "Vyrlo",
    "blocks": [
      { "type": "badge", "settings": { "text": "⚡ Livraison rapide" } },
      { "type": "badge", "settings": { "text": "🔒 Paiement sécurisé" } },
      { "type": "badge", "settings": { "text": "✓ Sans inscription" } },
      { "type": "badge", "settings": { "text": "💬 Support réactif" } }
    ]
  }]
}
{% endschema %}
`;
