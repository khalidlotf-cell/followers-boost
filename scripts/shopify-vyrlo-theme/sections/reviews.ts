export const SECTION = String.raw`{% comment %}
  Vyrlo Reviews — double marquee.
{% endcomment %}

{% style %}
  .vyrlo-rv-{{ section.id }} { padding: 88px 0 72px; background: {{ section.settings.bg | default: '#ffffff' }}; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-rv-{{ section.id }} .rv-head { text-align: center; margin-bottom: 56px; max-width: 1180px; margin-left: auto; margin-right: auto; padding: 0 24px; }
  .vyrlo-rv-{{ section.id }} .rv-eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .vyrlo-rv-{{ section.id }} .rv-h2 { font-size: clamp(28px, 3vw, 42px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 12px; }
  .vyrlo-rv-{{ section.id }} .rv-badge { display: inline-flex; align-items: center; gap: 6px; background: #fefce8; border: 1px solid #fde68a; border-radius: 100px; padding: 6px 16px; }
  .vyrlo-rv-{{ section.id }} .rv-badge-stars { color: #f59e0b; font-size: 14px; }
  .vyrlo-rv-{{ section.id }} .rv-badge-rating { font-size: 13px; font-weight: 600; color: #92400e; }
  .vyrlo-rv-{{ section.id }} .rv-marquee { overflow: hidden; margin-bottom: 16px; }
  .vyrlo-rv-{{ section.id }} .rv-track { display: flex; gap: 14px; width: max-content; animation: vyrlo-mrq-{{ section.id }} {{ section.settings.speed | default: 50 }}s linear infinite; }
  .vyrlo-rv-{{ section.id }} .rv-track:hover { animation-play-state: paused; }
  .vyrlo-rv-{{ section.id }} .rv-track.rv-r { animation: vyrlo-mrq-r-{{ section.id }} {{ section.settings.speed | default: 50 }}s linear infinite; }
  .vyrlo-rv-{{ section.id }} .rv-track.rv-r:hover { animation-play-state: paused; }
  @keyframes vyrlo-mrq-{{ section.id }} { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  @keyframes vyrlo-mrq-r-{{ section.id }} { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
  .vyrlo-rv-{{ section.id }} .rv-card { min-width: 300px; max-width: 300px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background: #fff; display: flex; flex-direction: column; flex-shrink: 0; }
  .vyrlo-rv-{{ section.id }} .rv-text { font-size: 13.5px; color: #475569; line-height: 1.7; margin: 0 0 16px; flex-grow: 1; }
  .vyrlo-rv-{{ section.id }} .rv-name { font-weight: 700; font-size: 13px; color: #0f172a; }
  .vyrlo-rv-{{ section.id }} .rv-handle { font-size: 12px; color: #94a3b8; }
  .vyrlo-rv-{{ section.id }} .rv-stars { display: flex; gap: 2px; margin-bottom: 12px; color: #f59e0b; font-size: 13px; }
{% endstyle %}

<section class="vyrlo-rv-{{ section.id }}">
  <div class="rv-head">
    <p class="rv-eyebrow">{{ section.settings.eyebrow | default: 'Avis clients' }}</p>
    <h2 class="rv-h2">{{ section.settings.title | default: 'Ce que disent nos clients' }}</h2>
    <div class="rv-badge">
      <span class="rv-badge-stars">★★★★★</span>
      <span class="rv-badge-rating">{{ section.settings.badge_text | default: '4.9/5 · 6 000+ commandes livrées' }}</span>
    </div>
  </div>

  {%- assign row1_blocks = section.blocks | where: 'settings.row', '1' -%}
  {%- assign row2_blocks = section.blocks | where: 'settings.row', '2' -%}
  {%- if row1_blocks.size == 0 and row2_blocks.size == 0 -%}
    {%- assign row1_blocks = section.blocks -%}
  {%- endif -%}

  {%- if row1_blocks.size > 0 -%}
  <div class="rv-marquee">
    <div class="rv-track">
      {%- for block in row1_blocks -%}<div class="rv-card"><div class="rv-stars">★★★★★</div><p class="rv-text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="rv-name">{{ block.settings.name }}</div><div class="rv-handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
      {%- for block in row1_blocks -%}<div class="rv-card"><div class="rv-stars">★★★★★</div><p class="rv-text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="rv-name">{{ block.settings.name }}</div><div class="rv-handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
    </div>
  </div>
  {%- endif -%}

  {%- if row2_blocks.size > 0 -%}
  <div class="rv-marquee">
    <div class="rv-track rv-r">
      {%- for block in row2_blocks -%}<div class="rv-card"><div class="rv-stars">★★★★★</div><p class="rv-text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="rv-name">{{ block.settings.name }}</div><div class="rv-handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
      {%- for block in row2_blocks -%}<div class="rv-card"><div class="rv-stars">★★★★★</div><p class="rv-text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="rv-name">{{ block.settings.name }}</div><div class="rv-handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
    </div>
  </div>
  {%- endif -%}
</section>

{% schema %}
{
  "name": "Vyrlo · Avis clients",
  "tag": "section",
  "class": "section-vyrlo-reviews",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Avis clients" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Ce que disent nos clients" },
    { "type": "text", "id": "badge_text", "label": "Badge étoiles", "default": "4.9/5 · 6 000+ commandes livrées" },
    { "type": "range", "id": "speed", "label": "Vitesse (sec)", "min": 20, "max": 120, "step": 5, "default": 50 },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Avis",
      "settings": [
        { "type": "text", "id": "name", "label": "Nom", "default": "Yasmine K." },
        { "type": "text", "id": "handle", "label": "Handle", "default": "@yasminekadri" },
        { "type": "textarea", "id": "text", "label": "Texte", "default": "Super service." },
        { "type": "select", "id": "row", "label": "Rangée",
          "options": [{ "value": "1", "label": "Rangée 1" }, { "value": "2", "label": "Rangée 2" }],
          "default": "1" }
      ]
    }
  ],
  "presets": [{ "name": "Vyrlo · Avis clients", "category": "Vyrlo" }]
}
{% endschema %}
`;
