export const SECTION = String.raw`{% comment %}
  Vyrlo Reviews — double marquee d'avis clients.
  Les avis sont des blocks : éditables/réordonnables.
{% endcomment %}

{% style %}
  .vyrlo-rv-{{ section.id }} { padding: 88px 0 72px; background: {{ section.settings.bg }}; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-rv-{{ section.id }} .head { text-align: center; margin-bottom: 56px; max-width: 1180px; margin-left: auto; margin-right: auto; padding: 0 24px; }
  .vyrlo-rv-{{ section.id }} .eyebrow { font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .vyrlo-rv-{{ section.id }} h2 { font-size: clamp(28px, 3vw, 42px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 12px; }
  .vyrlo-rv-{{ section.id }} .badge { display: inline-flex; align-items: center; gap: 6px; background: #fefce8; border: 1px solid #fde68a; border-radius: 100px; padding: 6px 16px; }
  .vyrlo-rv-{{ section.id }} .badge .stars { color: #f59e0b; font-size: 14px; }
  .vyrlo-rv-{{ section.id }} .badge .rating { font-size: 13px; font-weight: 600; color: #92400e; }
  .vyrlo-rv-{{ section.id }} .marquee { overflow: hidden; margin-bottom: 16px; }
  .vyrlo-rv-{{ section.id }} .track { display: flex; gap: 14px; width: max-content; animation: vyrlo-mrq-{{ section.id }} {{ section.settings.speed }}s linear infinite; }
  .vyrlo-rv-{{ section.id }} .track.r { animation: vyrlo-mrq-r-{{ section.id }} {{ section.settings.speed }}s linear infinite; }
  @keyframes vyrlo-mrq-{{ section.id }} { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  @keyframes vyrlo-mrq-r-{{ section.id }} { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
  .vyrlo-rv-{{ section.id }} .card { min-width: 300px; max-width: 300px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px; background: #fff; display: flex; flex-direction: column; flex-shrink: 0; }
  .vyrlo-rv-{{ section.id }} .text { font-size: 13.5px; color: #475569; line-height: 1.7; margin: 0 0 16px; flex-grow: 1; }
  .vyrlo-rv-{{ section.id }} .name { font-weight: 700; font-size: 13px; color: #0f172a; }
  .vyrlo-rv-{{ section.id }} .handle { font-size: 12px; color: #94a3b8; }
  .vyrlo-rv-{{ section.id }} .stars { display: flex; gap: 2px; margin-bottom: 12px; color: #f59e0b; font-size: 13px; }
{% endstyle %}

<section class="vyrlo-rv-{{ section.id }}">
  <div class="head">
    <p class="eyebrow">{{ section.settings.eyebrow }}</p>
    <h2>{{ section.settings.title }}</h2>
    <div class="badge">
      <span class="stars">★★★★★</span>
      <span class="rating">{{ section.settings.badge_text }}</span>
    </div>
  </div>

  {%- assign row1_blocks = section.blocks | where: 'settings.row', 1 -%}
  {%- assign row2_blocks = section.blocks | where: 'settings.row', 2 -%}
  {%- if row1_blocks.size == 0 -%}{%- assign row1_blocks = section.blocks -%}{%- endif -%}

  <div class="marquee">
    <div class="track">
      {%- for block in row1_blocks -%}<div class="card"><div class="stars">★★★★★</div><p class="text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="name">{{ block.settings.name }}</div><div class="handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
      {%- for block in row1_blocks -%}<div class="card"><div class="stars">★★★★★</div><p class="text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="name">{{ block.settings.name }}</div><div class="handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
    </div>
  </div>

  {%- if row2_blocks.size > 0 -%}
  <div class="marquee">
    <div class="track r">
      {%- for block in row2_blocks -%}<div class="card"><div class="stars">★★★★★</div><p class="text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="name">{{ block.settings.name }}</div><div class="handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
      {%- for block in row2_blocks -%}<div class="card"><div class="stars">★★★★★</div><p class="text">&ldquo;{{ block.settings.text }}&rdquo;</p><div><div class="name">{{ block.settings.name }}</div><div class="handle">{{ block.settings.handle }}</div></div></div>{%- endfor -%}
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
    { "type": "text", "id": "badge_text", "label": "Texte badge étoiles", "default": "4.9/5 · 6 000+ commandes livrées" },
    { "type": "range", "id": "speed", "label": "Vitesse défilement (sec)", "min": 20, "max": 120, "step": 5, "default": 50 },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "blocks": [
    {
      "type": "review",
      "name": "Avis",
      "settings": [
        { "type": "text", "id": "name", "label": "Nom", "default": "Yasmine K." },
        { "type": "text", "id": "handle", "label": "Handle", "default": "@yasminekadri" },
        { "type": "textarea", "id": "text", "label": "Témoignage", "default": "Super service, livraison rapide et efficace." },
        { "type": "select", "id": "row", "label": "Rangée",
          "options": [{ "value": "1", "label": "Rangée 1 (↔)" }, { "value": "2", "label": "Rangée 2 (↔ inversée)" }],
          "default": "1" }
      ]
    }
  ],
  "presets": [{
    "name": "Vyrlo · Avis clients",
    "category": "Vyrlo",
    "blocks": [
      { "type": "review", "settings": { "name": "Yasmine K.", "handle": "@yasminekadri", "text": "J'avais 2 300 followers Instagram depuis 3 ans. Après une commande de 5K, l'algo m'a poussé. Maintenant j'ai 14K en organique.", "row": "1" } },
      { "type": "review", "settings": { "name": "Florian M.", "handle": "@floriandumas.mkt", "text": "TikTok : commandé 10K vues, la vidéo est passée de 300 à 47K naturellement dans la semaine.", "row": "1" } },
      { "type": "review", "settings": { "name": "Inès B.", "handle": "@ines.beauty.fr", "text": "Le ciblage France c'est la vraie différence. J'ai eu des abonnés qui répondaient à mes sondages dès le lendemain.", "row": "1" } },
      { "type": "review", "settings": { "name": "Romain C.", "handle": "@romain.coach_", "text": "Livraison en 6h, prix honnête, support qui répond le soir. C'est tout ce que je voulais.", "row": "1" } },
      { "type": "review", "settings": { "name": "Léa M.", "handle": "@lea.moreau.off", "text": "Commandé 1 000 abonnés un mardi soir. Le jeudi j'étais à 980. 6 mois plus tard mon compte grossit tout seul.", "row": "1" } },
      { "type": "review", "settings": { "name": "Nassim O.", "handle": "@nassimoff_", "text": "Commandé 500 likes sur un post test. En 2h tout était là. Depuis j'ai commandé 4 fois.", "row": "1" } },
      { "type": "review", "settings": { "name": "Sofia R.", "handle": "@sofiar.create", "text": "Interface simple, pas besoin de compte, paiement en 30 secondes. Exactement ce que j'attendais.", "row": "2" } },
      { "type": "review", "settings": { "name": "Hugo L.", "handle": "@hugolaffon_", "text": "Les likes express arrivent avant que j'aie fermé l'app. Parfait pour les publications où le timing est crucial.", "row": "2" } },
      { "type": "review", "settings": { "name": "Camille R.", "handle": "@cam.rousseau_", "text": "Les nouveaux abonnés regardent mes stories et répondent à mes questions. C'est pas des fantômes.", "row": "2" } },
      { "type": "review", "settings": { "name": "Mathieu G.", "handle": "@mathieu.gym_", "text": "J'ai une communauté de 22K maintenant, moitié organique moitié boost. Les deux se combinent très bien.", "row": "2" } },
      { "type": "review", "settings": { "name": "Thomas L.", "handle": "@thomas.lef.photo", "text": "Ma chaîne YouTube stagnait à 200 abonnés depuis un an. Commandé 2 000. 3 semaines après j'étais à 3 500.", "row": "2" } }
    ]
  }]
}
{% endschema %}
`;
