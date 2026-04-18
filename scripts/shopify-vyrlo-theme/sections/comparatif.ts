export const SECTION = String.raw`{% comment %}
  Vyrlo Comparatif — tabs + table.
{% endcomment %}

{% style %}
  .vyrlo-cmp-{{ section.id }} { padding: 88px 0; background: {{ section.settings.bg | default: '#fafbff' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-cmp-{{ section.id }} .cmp-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-cmp-{{ section.id }} .cmp-head { text-align: center; margin-bottom: 48px; }
  .vyrlo-cmp-{{ section.id }} .cmp-eyebrow { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 10px; }
  .vyrlo-cmp-{{ section.id }} .cmp-h2 { font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 12px; }
  .vyrlo-cmp-{{ section.id }} .cmp-sub { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-cmp-{{ section.id }} .cmp-tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 48px; flex-wrap: wrap; }
  .vyrlo-cmp-{{ section.id }} .cmp-tab {
    padding: 10px 28px; border-radius: 100px; font-weight: 700; font-size: 15px;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
  }
  .vyrlo-cmp-{{ section.id }} .cmp-tab[aria-selected="true"] { border-color: #7c3aed; background: #7c3aed; color: #fff; }
  .vyrlo-cmp-{{ section.id }} .cmp-table { max-width: 780px; margin: 0 auto; border: 1.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; background: #fff; }
  .vyrlo-cmp-{{ section.id }} .cmp-row { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; border-bottom: 1px solid #f1f5f9; }
  .vyrlo-cmp-{{ section.id }} .cmp-row:last-child { border-bottom: none; }
  .vyrlo-cmp-{{ section.id }} .cmp-row.cmp-head-row { background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
  .vyrlo-cmp-{{ section.id }} .cmp-cell { padding: 20px 24px; font-size: 14px; color: #64748b; border-left: 1px solid #f1f5f9; min-width: 0; }
  .vyrlo-cmp-{{ section.id }} .cmp-cell:first-child { border-left: none; font-weight: 600; color: #475569; }
  .vyrlo-cmp-{{ section.id }} .cmp-row.cmp-head-row .cmp-cell { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; }
  .vyrlo-cmp-{{ section.id }} .cmp-cell.cmp-srv { background: rgba(124,58,237,0.02); color: #0f172a; font-weight: 600; }
  .vyrlo-cmp-{{ section.id }} .cmp-row.cmp-head-row .cmp-cell.cmp-srv { color: #7c3aed; }
  .vyrlo-cmp-{{ section.id }} .cmp-panel { display: none; }
  .vyrlo-cmp-{{ section.id }} .cmp-panel.cmp-active { display: block; }
{% endstyle %}

<section class="vyrlo-cmp-{{ section.id }}" id="{{ section.settings.anchor | default: 'comparatif' }}" data-vyrlo-cmp>
  <div class="cmp-container">
    <div class="cmp-head">
      <p class="cmp-eyebrow">{{ section.settings.eyebrow | default: 'Comparatif' }}</p>
      <h2 class="cmp-h2">{{ section.settings.title | default: 'Croissance organique vs notre service' }}</h2>
      <p class="cmp-sub">{{ section.settings.subtitle | default: 'Même objectif, deux réalités très différentes.' }}</p>
    </div>

    <div class="cmp-tabs" role="tablist">
      {%- for block in section.blocks -%}
        <button class="cmp-tab" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" data-panel="{{ block.id }}" {{ block.shopify_attributes }}>{{ block.settings.tab_label }}</button>
      {%- endfor -%}
    </div>

    {%- for block in section.blocks -%}
      {%- assign b = block.settings -%}
      <div class="cmp-panel {% if forloop.first %}cmp-active{% endif %}" data-panel="{{ block.id }}">
        <div class="cmp-table">
          <div class="cmp-row cmp-head-row">
            <div class="cmp-cell">{{ b.title }}</div>
            <div class="cmp-cell">{{ section.settings.col_organic | default: 'Croissance organique' }}</div>
            <div class="cmp-cell cmp-srv">{{ section.settings.col_service | default: 'Notre service' }}</div>
          </div>
          <div class="cmp-row">
            <div class="cmp-cell">{{ section.settings.row1_label | default: 'Durée estimée' }}</div>
            <div class="cmp-cell">{{ b.organic_duree }}</div>
            <div class="cmp-cell cmp-srv">{{ b.service_duree }}</div>
          </div>
          <div class="cmp-row">
            <div class="cmp-cell">{{ section.settings.row2_label | default: 'Effort quotidien' }}</div>
            <div class="cmp-cell">{{ b.organic_effort }}</div>
            <div class="cmp-cell cmp-srv">{{ b.service_effort }}</div>
          </div>
          <div class="cmp-row">
            <div class="cmp-cell">{{ section.settings.row3_label | default: 'Coût réel' }}</div>
            <div class="cmp-cell">{{ b.organic_cout }}</div>
            <div class="cmp-cell cmp-srv">{{ b.service_cout }}</div>
          </div>
          <div class="cmp-row">
            <div class="cmp-cell">{{ section.settings.row4_label | default: 'Résultat garanti' }}</div>
            <div class="cmp-cell"><span style="color:#f87171;font-weight:700;">✕</span> Non garanti</div>
            <div class="cmp-cell cmp-srv" style="color:#059669;"><span style="font-weight:700;">✓</span> Oui</div>
          </div>
        </div>
      </div>
    {%- endfor -%}

    <p style="text-align:center;font-size:13px;color:#94a3b8;margin-top:20px;">{% if section.settings.note != blank %}{{ section.settings.note }}{% else %}* Les coûts organiques incluent le temps, l'équipement et les outils.{% endif %}</p>
  </div>
</section>

<script>
  (function(){
    var root = document.querySelector('.vyrlo-cmp-{{ section.id }}');
    if (!root) return;
    root.querySelectorAll('.cmp-tab').forEach(function(btn){
      btn.addEventListener('click', function(){
        var p = btn.getAttribute('data-panel');
        root.querySelectorAll('.cmp-tab').forEach(function(b){ b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        root.querySelectorAll('.cmp-panel').forEach(function(panel){ panel.classList.toggle('cmp-active', panel.getAttribute('data-panel') === p); });
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
    { "type": "text", "id": "row4_label", "label": "Ligne 4", "default": "Résultat garanti" },
    { "type": "text", "id": "note", "label": "Note bas", "default": "* Les coûts organiques incluent le temps, l'équipement et les outils." },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#fafbff" }
  ],
  "blocks": [
    {
      "type": "tier",
      "name": "Palier",
      "settings": [
        { "type": "text", "id": "tab_label", "label": "Onglet", "default": "1K" },
        { "type": "text", "id": "title", "label": "Titre palier", "default": "1 000 abonnés" },
        { "type": "text", "id": "organic_duree", "label": "Org · Durée", "default": "2 à 5 mois" },
        { "type": "text", "id": "service_duree", "label": "Srv · Durée", "default": "24 à 72h" },
        { "type": "text", "id": "organic_effort", "label": "Org · Effort", "default": "2–3h par jour" },
        { "type": "text", "id": "service_effort", "label": "Srv · Effort", "default": "2 minutes" },
        { "type": "text", "id": "organic_cout", "label": "Org · Coût", "default": "300 – 500 €" },
        { "type": "text", "id": "service_cout", "label": "Srv · Coût", "default": "À partir de 8,90 €" }
      ]
    }
  ],
  "presets": [{ "name": "Vyrlo · Comparatif", "category": "Vyrlo" }]
}
{% endschema %}
`;
