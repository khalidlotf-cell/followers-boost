export const SECTION = String.raw`{% comment %}
  Vyrlo Product Hero — clone exact /app/boutique/[platform] :
  breadcrumb fin, logo 96×96 glass avec halo, H1 "Achetez des X\n<platform>"
  sur 2 lignes, 3 pills trust (★4.9/5, ✓ commandes, ● actif), tabs icon+texte
  sur fond noir translucide.
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
  assign short_title = product.title | remove: platform_label | strip
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
    max-width: 680px; margin: 0 auto; padding: 44px 20px 0;
  }
  .vyrlo-phero-{{ section.id }} .phero-crumb {
    display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;
    font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 28px;
  }
  .vyrlo-phero-{{ section.id }} .phero-crumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
  .vyrlo-phero-{{ section.id }} .phero-crumb .phero-sep { opacity: 0.4; }
  .vyrlo-phero-{{ section.id }} .phero-crumb .phero-cur { color: #fff; font-weight: 600; }

  .vyrlo-phero-{{ section.id }} .phero-logo-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .vyrlo-phero-{{ section.id }} .phero-logo-holder { position: relative; }
  .vyrlo-phero-{{ section.id }} .phero-logo-halo {
    position: absolute; inset: -12px; border-radius: 32px;
    background: rgba(255,255,255,0.2); filter: blur(16px); pointer-events: none;
  }
  .vyrlo-phero-{{ section.id }} .phero-logo-bg {
    position: relative; width: 96px; height: 96px; border-radius: 24px;
    background: rgba(255,255,255,0.18); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid rgba(255,255,255,0.35);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  }

  .vyrlo-phero-{{ section.id }} .phero-h1 {
    font-size: clamp(30px, 6vw, 48px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.08; margin: 0 auto 18px;
    color: #fff; text-shadow: 0 2px 20px rgba(0,0,0,0.2);
  }

  .vyrlo-phero-{{ section.id }} .phero-badges {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; flex-wrap: wrap; margin-bottom: 36px;
  }
  .vyrlo-phero-{{ section.id }} .phero-badge {
    display: flex; align-items: center; gap: 5px;
    background: rgba(255,255,255,0.18); backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.25); border-radius: 100px;
    padding: 7px 14px;
    font-size: 13px; font-weight: 600; color: #fff;
  }
  .vyrlo-phero-{{ section.id }} .phero-badge.phero-badge-green {
    background: rgba(74,222,128,0.2); border-color: rgba(74,222,128,0.4);
  }
  .vyrlo-phero-{{ section.id }} .phero-stars { display: inline-flex; gap: 1px; color: #fbbf24; font-size: 12px; }
  .vyrlo-phero-{{ section.id }} .phero-star-rate { margin-left: 4px; font-weight: 700; }
  .vyrlo-phero-{{ section.id }} .phero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #4ade80; box-shadow: 0 0 6px #4ade80;
  }

  .vyrlo-phero-{{ section.id }} .phero-tabs-wrap {
    position: relative; z-index: 1;
    background: rgba(0,0,0,0.55); backdrop-filter: blur(14px);
    border-top: 1px solid rgba(255,255,255,0.18);
  }
  .vyrlo-phero-{{ section.id }} .phero-tabs {
    max-width: 680px; margin: 0 auto; padding: 0 16px;
    display: flex; gap: 2px; overflow-x: auto;
    scrollbar-width: none;
  }
  .vyrlo-phero-{{ section.id }} .phero-tabs::-webkit-scrollbar { display: none; }
  .vyrlo-phero-{{ section.id }} .phero-tab {
    flex-shrink: 0; padding: 16px 24px; text-decoration: none;
    font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.85);
    border-bottom: 3px solid transparent;
    transition: all 0.15s; white-space: nowrap; letter-spacing: 0.01em;
    text-shadow: 0 1px 8px rgba(0,0,0,0.4);
  }
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
      <span class="phero-cur">{{ short_title }}</span>
    </div>

    {% if platform != blank %}
      <div class="phero-logo-wrap">
        <div class="phero-logo-holder">
          <span class="phero-logo-halo"></span>
          <div class="phero-logo-bg">{% render 'vyrlo-logo', slug: platform, size: 60 %}</div>
        </div>
      </div>
    {% endif %}

    <h1 class="phero-h1">{{ section.settings.title_prefix | default: 'Achetez des' }} {{ short_title }}<br>{{ platform_label }}</h1>

    <div class="phero-badges">
      <div class="phero-badge">
        <span class="phero-stars">★★★★★</span>
        <span class="phero-star-rate">{{ section.settings.badge_rating | default: '4.9/5' }}</span>
      </div>
      <div class="phero-badge">
        <span>✓</span>
        <span>{{ section.settings.badge_orders | default: '600+ commandes' }}</span>
      </div>
      <div class="phero-badge phero-badge-green">
        <span class="phero-dot"></span>
        <span>{{ section.settings.badge_status | default: 'Service actif' }}</span>
      </div>
    </div>
  </div>

  {% if platform_collection.products.size > 1 %}
    {%- assign ptab_order = 'abonnes,likes,vues,commentaires,partages,enregistrements,retweets,auditeurs' | split: ',' -%}
    {%- assign ptab_icons = '👤,❤️,▶️,💬,🔁,🔖,🔁,🎵' | split: ',' -%}
    <div class="phero-tabs-wrap">
      <div class="phero-tabs">
        {%- for ord in ptab_order -%}
          {%- for p in platform_collection.products -%}
            {%- if p.handle contains ord -%}
              {%- assign icon = ptab_icons[forloop.parentloop.index0] -%}
              <a href="{{ p.url }}" class="phero-tab {% if p.id == product.id %}phero-active{% endif %}">
                {{ icon }} {{ p.title | remove: platform_label | strip }}
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
