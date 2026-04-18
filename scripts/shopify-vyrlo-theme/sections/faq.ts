export const SECTION = String.raw`{% comment %}
  Vyrlo FAQ — accordéon.
{% endcomment %}

{% style %}
  .vyrlo-faq-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#fafbff' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-faq-{{ section.id }} .faq-inner { max-width: 720px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-faq-{{ section.id }} .faq-head { text-align: center; margin-bottom: 52px; }
  .vyrlo-faq-{{ section.id }} .faq-eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .vyrlo-faq-{{ section.id }} .faq-h2 { font-size: clamp(28px, 3vw, 42px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0; }
  .vyrlo-faq-{{ section.id }} .faq-item { border-bottom: 1px solid #e2e8f0; padding: 20px 0; }
  .vyrlo-faq-{{ section.id }} .faq-item[open] { border-color: #7c3aed; }
  .vyrlo-faq-{{ section.id }} .faq-q { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-weight: 600; font-size: 16px; color: #0f172a; }
  .vyrlo-faq-{{ section.id }} .faq-q::-webkit-details-marker { display: none; }
  .vyrlo-faq-{{ section.id }} .faq-q::after { content: "+"; flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid #e2e8f0; display: inline-flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 16px; transition: all 0.2s; }
  .vyrlo-faq-{{ section.id }} .faq-item[open] .faq-q::after { content: "−"; background: #7c3aed; border-color: #7c3aed; color: #fff; }
  .vyrlo-faq-{{ section.id }} .faq-a { margin: 14px 0 0; color: #64748b; font-size: 14.5px; line-height: 1.75; }
{% endstyle %}

<section class="vyrlo-faq-{{ section.id }}" {% if section.settings.anchor != blank %}id="{{ section.settings.anchor }}"{% endif %}>
  <div class="faq-inner">
    <div class="faq-head">
      <p class="faq-eyebrow">{{ section.settings.eyebrow | default: 'FAQ' }}</p>
      <h2 class="faq-h2">{{ section.settings.title | default: 'Questions fréquentes' }}</h2>
    </div>
    {%- for block in section.blocks -%}
      <details class="faq-item" {{ block.shopify_attributes }}>
        <summary class="faq-q">{{ block.settings.q }}</summary>
        <p class="faq-a">{{ block.settings.a }}</p>
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
  "presets": [{ "name": "Vyrlo · FAQ", "category": "Vyrlo" }]
}
{% endschema %}
`;
