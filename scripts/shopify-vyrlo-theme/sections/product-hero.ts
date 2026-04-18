export const SECTION = String.raw`{% comment %}
  Vyrlo Product Hero — gradient plateforme, logo glass grand, H1 "Achetez des X",
  3 badges glass, tabs vers les autres services de la même plateforme.
  Reproduit /app/boutique/[platform] de vyrlo.fr.
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify'
        assign platform = tag
    endcase
  endfor
  assign platform_color = '#7c3aed'
  assign platform_label = 'Vyrlo'
  case platform
    when 'instagram' then assign platform_color = '#e1306c'
                          assign platform_label = 'Instagram'
    when 'tiktok'    then assign platform_color = '#010101'
                          assign platform_label = 'TikTok'
    when 'youtube'   then assign platform_color = '#FF0000'
                          assign platform_label = 'YouTube'
    when 'facebook'  then assign platform_color = '#1877F2'
                          assign platform_label = 'Facebook'
    when 'twitter'   then assign platform_color = '#000000'
                          assign platform_label = 'Twitter / X'
    when 'spotify'   then assign platform_color = '#1DB954'
                          assign platform_label = 'Spotify'
  endcase
  assign platform_collection = collections[platform]
-%}

{% style %}
  .vyrlo-phero-{{ section.id }} {
    position: relative; color: #fff; text-align: center; overflow: hidden;
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-phero-{{ section.id }} .phero-bg {
    position: absolute; inset: 0;
    background: {{ platform_color }};
    {% if platform == 'instagram' %}background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%);{% endif %}
  }
  .vyrlo-phero-{{ section.id }} .phero-bg::before {
    content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.08);
  }
  .vyrlo-phero-{{ section.id }} .phero-inner {
    position: relative; z-index: 1;
    max-width: 880px; margin: 0 auto; padding: 56px 24px 0;
  }
  .vyrlo-phero-{{ section.id }} .phero-crumb {
    display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;
    font-size: 13px; color: rgba(255,255,255,0.65); margin-bottom: 36px;
  }
  .vyrlo-phero-{{ section.id }} .phero-crumb a { color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.15s; }
  .vyrlo-phero-{{ section.id }} .phero-crumb a:hover { color: #fff; }
  .vyrlo-phero-{{ section.id }} .phero-crumb .phero-sep { opacity: 0.5; }
  .vyrlo-phero-{{ section.id }} .phero-crumb .phero-cur { color: #fff; font-weight: 700; }

  .vyrlo-phero-{{ section.id }} .phero-logo-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .vyrlo-phero-{{ section.id }} .phero-logo-bg {
    position: relative; width: 120px; height: 120px; border-radius: 28px;
    background: rgba(255,255,255,0.22); backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  }
  .vyrlo-phero-{{ section.id }} .phero-logo-bg::before {
    content: ""; position: absolute; inset: -16px; border-radius: 36px;
    background: rgba(255,255,255,0.15); filter: blur(20px);
    pointer-events: none; z-index: -1;
  }

  .vyrlo-phero-{{ section.id }} .phero-h1 {
    font-size: clamp(36px, 5.5vw, 64px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.05; margin: 0 auto 36px;
    max-width: 760px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.22);
    color: #fff;
  }

  .vyrlo-phero-{{ section.id }} .phero-badges {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 52px;
  }
  .vyrlo-phero-{{ section.id }} .phero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 100px;
    background: rgba(255,255,255,0.2); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.25);
    font-size: 14px; font-weight: 600; color: #fff;
    white-space: nowrap;
  }
  .vyrlo-phero-{{ section.id }} .phero-badge-stars { color: #fde047; font-size: 13px; letter-spacing: 1px; }
  .vyrlo-phero-{{ section.id }} .phero-badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.8);
  }

  .vyrlo-phero-{{ section.id }} .phero-tabs-wrap {
    position: relative; z-index: 1;
    background: rgba(0,0,0,0.18); backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .vyrlo-phero-{{ section.id }} .phero-tabs {
    max-width: 1080px; margin: 0 auto; padding: 0 24px;
    display: flex; justify-content: center; flex-wrap: wrap; gap: 0;
  }
  .vyrlo-phero-{{ section.id }} .phero-tab {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 18px 24px; text-decoration: none;
    font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.7);
    border-bottom: 3px solid transparent;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  .vyrlo-phero-{{ section.id }} .phero-tab:hover { color: #fff; }
  .vyrlo-phero-{{ section.id }} .phero-tab.phero-active {
    color: #fff; border-bottom-color: #fff;
  }
{% endstyle %}

<section class="vyrlo-phero-{{ section.id }}">
  <div class="phero-bg"></div>

  <div class="phero-inner">
    <div class="phero-crumb">
      <a href="/">Accueil</a>
      <span class="phero-sep">/</span>
      {% if platform != blank %}<a href="/collections/{{ platform }}">{{ platform_label }}</a><span class="phero-sep">/</span>{% endif %}
      <span class="phero-cur">{{ product.title | remove: platform_label | strip }}</span>
    </div>

    {% if platform != blank %}
      <div class="phero-logo-wrap">
        <div class="phero-logo-bg">{% render 'vyrlo-logo', slug: platform, size: 68 %}</div>
      </div>
    {% endif %}

    <h1 class="phero-h1">{{ section.settings.title_prefix | default: 'Achetez des' }} {{ product.title }}</h1>

    <div class="phero-badges">
      <div class="phero-badge"><span class="phero-badge-stars">★★★★★</span> <span>{{ section.settings.badge_rating | default: '4.9/5' }}</span></div>
      <div class="phero-badge"><span>✓</span> <span>{{ section.settings.badge_orders | default: '2 500+ commandes' }}</span></div>
      <div class="phero-badge"><span class="phero-badge-dot"></span> <span>{{ section.settings.badge_status | default: 'Service actif' }}</span></div>
    </div>
  </div>

  {% if platform_collection.products.size > 1 %}
    {%- assign ptab_order = 'abonnes,likes,vues,commentaires,partages,enregistrements,retweets,auditeurs' | split: ',' -%}
    <div class="phero-tabs-wrap">
      <div class="phero-tabs">
        {%- for ord in ptab_order -%}
          {%- for p in platform_collection.products -%}
            {%- if p.handle contains ord -%}
              <a href="{{ p.url }}" class="phero-tab {% if p.id == product.id %}phero-active{% endif %}">
                <span>{{ p.title | remove: platform_label | strip }}</span>
              </a>
            {%- endif -%}
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>
  {% endif %}
</section>

{% schema %}
{
  "name": "Vyrlo · Hero produit",
  "tag": "section",
  "class": "section-vyrlo-product-hero",
  "settings": [
    { "type": "text", "id": "title_prefix", "label": "Préfixe titre", "default": "Achetez des" },
    { "type": "text", "id": "badge_rating", "label": "Badge note", "default": "4.9/5" },
    { "type": "text", "id": "badge_orders", "label": "Badge commandes", "default": "2 500+ commandes" },
    { "type": "text", "id": "badge_status", "label": "Badge statut", "default": "Service actif" }
  ],
  "presets": [{ "name": "Vyrlo · Hero produit", "category": "Vyrlo" }]
}
{% endschema %}
`;
