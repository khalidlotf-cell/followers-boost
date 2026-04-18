export const SECTION = String.raw`{% comment %}
  Vyrlo Product Trust Bar — barre horizontale avec 5 items de confiance.
{% endcomment %}

{% style %}
  .vyrlo-ptr-{{ section.id }} { padding: 0 16px 56px; background: {{ section.settings.bg | default: '#f8fafc' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-ptr-{{ section.id }} .ptr-bar {
    max-width: 680px; margin: 0 auto;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 18px;
    padding: 16px 20px;
    display: flex; flex-wrap: wrap; gap: 8px 24px;
    align-items: center; justify-content: center;
  }
  .vyrlo-ptr-{{ section.id }} .ptr-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 600; color: #334155;
    white-space: nowrap;
  }
  .vyrlo-ptr-{{ section.id }} .ptr-icon {
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .vyrlo-ptr-{{ section.id }} .ptr-item:nth-child(1) .ptr-icon { background: #fef3c7; }
  .vyrlo-ptr-{{ section.id }} .ptr-item:nth-child(2) .ptr-icon { background: #e0e7ff; }
  .vyrlo-ptr-{{ section.id }} .ptr-item:nth-child(3) .ptr-icon { background: #fee2e2; }
  .vyrlo-ptr-{{ section.id }} .ptr-item:nth-child(4) .ptr-icon { background: #dcfce7; }
  .vyrlo-ptr-{{ section.id }} .ptr-item:nth-child(5) .ptr-icon { background: #e0e7ff; }
{% endstyle %}

<section class="vyrlo-ptr-{{ section.id }}">
  <div class="ptr-bar">
    <div class="ptr-item"><span class="ptr-icon">⚡</span><span>{{ section.settings.item1 | default: 'Livraison en 20 min' }}</span></div>
    <div class="ptr-item"><span class="ptr-icon">🔒</span><span>{{ section.settings.item2 | default: 'Shopify sécurisé' }}</span></div>
    <div class="ptr-item"><span class="ptr-icon">🛡️</span><span>{{ section.settings.item3 | default: 'Livraison garantie' }}</span></div>
    <div class="ptr-item"><span class="ptr-icon">👥</span><span>{{ section.settings.item4 | default: '+6 000 clients' }}</span></div>
    <div class="ptr-item"><span class="ptr-icon">💬</span><span>{{ section.settings.item5 | default: 'Support 7j/7' }}</span></div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Trust bar produit",
  "tag": "section",
  "class": "section-vyrlo-ptr",
  "settings": [
    { "type": "text", "id": "item1", "label": "Item 1", "default": "Livraison en 20 min" },
    { "type": "text", "id": "item2", "label": "Item 2", "default": "Shopify sécurisé" },
    { "type": "text", "id": "item3", "label": "Item 3", "default": "Livraison garantie" },
    { "type": "text", "id": "item4", "label": "Item 4", "default": "+6 000 clients" },
    { "type": "text", "id": "item5", "label": "Item 5", "default": "Support 7j/7" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "presets": [{ "name": "Vyrlo · Trust bar produit", "category": "Vyrlo" }]
}
{% endschema %}
`;
