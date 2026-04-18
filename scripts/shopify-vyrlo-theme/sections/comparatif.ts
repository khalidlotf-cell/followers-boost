export const SECTION = String.raw`{% comment %}
  Vyrlo Comparatif — tabs 1K/5K/10K avec tableau organique vs service.
{% endcomment %}

{% style %}
  .vyrlo-cmp-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-cmp-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-cmp-{{ section.id }} .head { text-align: center; margin-bottom: 48px; }
  .vyrlo-cmp-{{ section.id }} .eyebrow { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
  .vyrlo-cmp-{{ section.id }} h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 12px; }
  .vyrlo-cmp-{{ section.id }} .head p { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-cmp-{{ section.id }} .tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 48px; }
  .vyrlo-cmp-{{ section.id }} .tab {
    padding: 10px 28px; border-radius: 100px; font-weight: 700; font-size: 15px;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
  }
  .vyrlo-cmp-{{ section.id }} .tab[aria-selected="true"] { border-color: #7c3aed; background: #7c3aed; color: #fff; }
  .vyrlo-cmp-{{ section.id }} .table { max-width: 780px; margin: 0 auto; border: 1.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; background: #fff; }
  .vyrlo-cmp-{{ section.id }} .row { display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f1f5f9; }
  .vyrlo-cmp-{{ section.id }} .row:last-child { border-bottom: none; }
  .vyrlo-cmp-{{ section.id }} .row.head { background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
  .vyrlo-cmp-{{ section.id }} .cell { padding: 20px 24px; font-size: 14px; color: #64748b; border-left: 1px solid #f1f5f9; }
  .vyrlo-cmp-{{ section.id }} .cell:first-child { border-left: none; font-weight: 600; color: #475569; }
  .vyrlo-cmp-{{ section.id }} .row.head .cell { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; }
  .vyrlo-cmp-{{ section.id }} .cell.srv { background: rgba(124,58,237,0.02); color: #0f172a; font-weight: 600; }
  .vyrlo-cmp-{{ section.id }} .row.head .cell.srv { color: #7c3aed; }
  .vyrlo-cmp-{{ section.id }} .panel { display: none; }
  .vyrlo-cmp-{{ section.id }} .panel.active { display: block; }
{% endstyle %}

<section class="vyrlo-cmp-{{ section.id }}" id="{{ section.settings.anchor }}" data-vyrlo-cmp>
  <div class="container">
    <div class="head">
      <p class="eyebrow">{{ section.settings.eyebrow }}</p>
      <h2>{{ section.settings.title }}</h2>
      <p>{{ section.settings.subtitle }}</p>
    </div>

    <div class="tabs" role="tablist">
      {%- for block in section.blocks -%}
        <button class="tab" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" data-panel="{{ block.id }}" {{ block.shopify_attributes }}>{{ block.settings.tab_label }}</button>
      {%- endfor -%}
    </div>

    {%- for block in section.blocks -%}
      {%- assign b = block.settings -%}
      <div class="panel {% if forloop.first %}active{% endif %}" data-panel="{{ block.id }}">
        <div class="table">
          <div class="row head">
            <div class="cell">{{ b.title }}</div>
            <div class="cell">{{ section.settings.col_organic }}</div>
            <div class="cell srv">{{ section.settings.col_service }}</div>
          </div>
          <div class="row">
            <div class="cell">{{ section.settings.row1_label }}</div>
            <div class="cell">{{ b.organic_duree }}</div>
            <div class="cell srv">{{ b.service_duree }}</div>
          </div>
          <div class="row">
            <div class="cell">{{ section.settings.row2_label }}</div>
            <div class="cell">{{ b.organic_effort }}</div>
            <div class="cell srv">{{ b.service_effort }}</div>
          </div>
          <div class="row">
            <div class="cell">{{ section.settings.row3_label }}</div>
            <div class="cell">{{ b.organic_cout }}</div>
            <div class="cell srv">{{ b.service_cout }}</div>
          </div>
          <div class="row">
            <div class="cell">{{ section.settings.row4_label }}</div>
            <div class="cell"><span style="color:#f87171;font-weight:700;">✕</span> Non garanti</div>
            <div class="cell srv" style="color:#059669;"><span style="font-weight:700;">✓</span> Oui</div>
          </div>
        </div>
      </div>
    {%- endfor -%}

    <p style="text-align:center;font-size:13px;color:#94a3b8;margin-top:20px;">{{ section.settings.note }}</p>
  </div>
</section>

<script>
  (function(){
    var root = document.querySelector('.vyrlo-cmp-{{ section.id }}');
    if (!root) return;
    root.querySelectorAll('.tab').forEach(function(btn){
      btn.addEventListener('click', function(){
        var p = btn.getAttribute('data-panel');
        root.querySelectorAll('.tab').forEach(function(b){ b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        root.querySelectorAll('.panel').forEach(function(panel){ panel.classList.toggle('active', panel.getAttribute('data-panel') === p); });
      });
    });
  })();
</script>

{% schema %}
{
  "name": "Vyrlo · Comparatif",
  "tag": "section",
  "class": "section-vyrlo-comparatif",
  "settings": [
    { "type": "text", "id": "anchor", "label": "Ancre (ID)", "default": "comparatif" },
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Comparatif" },
    { "type": "text", "id": "title", "label": "Titre", "default": "Croissance organique vs notre service" },
    { "type": "text", "id": "subtitle", "label": "Sous-titre", "default": "Même objectif, deux réalités très différentes." },
    { "type": "text", "id": "col_organic", "label": "Colonne organique", "default": "Croissance organique" },
    { "type": "text", "id": "col_service", "label": "Colonne service", "default": "Notre service" },
    { "type": "text", "id": "row1_label", "label": "Ligne 1", "default": "Durée estimée" },
    { "type": "text", "id": "row2_label", "label": "Ligne 2", "default": "Effort quotidien" },
    { "type": "text", "id": "row3_label", "label": "Ligne 3", "default": "Coût réel" },
    { "type": "text", "id": "row4_label", "label": "Ligne 4 (garanti)", "default": "Résultat garanti" },
    { "type": "text", "id": "note", "label": "Note bas de page", "default": "* Les coûts organiques incluent le temps, l'équipement et les outils." },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#fafbff" }
  ],
  "blocks": [
    {
      "type": "tier",
      "name": "Palier",
      "settings": [
        { "type": "text", "id": "tab_label", "label": "Label de l'onglet", "default": "1K" },
        { "type": "text", "id": "title", "label": "Titre du palier", "default": "1 000 abonnés" },
        { "type": "text", "id": "organic_duree", "label": "Organique · Durée", "default": "2 à 5 mois" },
        { "type": "text", "id": "service_duree", "label": "Service · Durée", "default": "24 à 72h" },
        { "type": "text", "id": "organic_effort", "label": "Organique · Effort", "default": "2–3h par jour" },
        { "type": "text", "id": "service_effort", "label": "Service · Effort", "default": "2 minutes" },
        { "type": "text", "id": "organic_cout", "label": "Organique · Coût", "default": "300 – 500 €" },
        { "type": "text", "id": "service_cout", "label": "Service · Coût", "default": "À partir de 8,90 €" }
      ]
    }
  ],
  "presets": [{
    "name": "Vyrlo · Comparatif",
    "category": "Vyrlo",
    "blocks": [
      { "type": "tier", "settings": { "tab_label": "1K", "title": "1 000 abonnés", "organic_duree": "2 à 5 mois", "service_duree": "24 à 72h", "organic_effort": "2–3h par jour", "service_effort": "2 minutes", "organic_cout": "300 – 500 €", "service_cout": "À partir de 8,90 €" } },
      { "type": "tier", "settings": { "tab_label": "5K", "title": "5 000 abonnés", "organic_duree": "8 à 18 mois", "service_duree": "3 à 5 jours", "organic_effort": "3–4h par jour", "service_effort": "2 minutes", "organic_cout": "500 – 1 500 €", "service_cout": "À partir de 29,90 €" } },
      { "type": "tier", "settings": { "tab_label": "10K", "title": "10 000 abonnés", "organic_duree": "1 à 3 ans", "service_duree": "5 à 8 jours", "organic_effort": "4–5h par jour", "service_effort": "2 minutes", "organic_cout": "2 000 – 3 000 €", "service_cout": "À partir de 74,90 €" } }
    ]
  }]
}
{% endschema %}
`;
