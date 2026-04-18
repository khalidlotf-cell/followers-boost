export const SECTION = String.raw`{% comment %}
  Vyrlo Collection Hero — gradient plateforme, logo glass grand, H1 "Services X",
  3 badges glass, tabs vers produits de la collection.
{% endcomment %}

{%- liquid
  assign slug = collection.handle
  assign platform_color = '#7c3aed'
  assign bg_style = ''
  case slug
    when 'instagram'
      assign bg_style = 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
    when 'tiktok'    then assign platform_color = '#010101'
                          assign bg_style = '#010101'
    when 'youtube'   then assign platform_color = '#FF0000'
                          assign bg_style = '#FF0000'
    when 'facebook'  then assign platform_color = '#1877F2'
                          assign bg_style = '#1877F2'
    when 'twitter'   then assign platform_color = '#000000'
                          assign bg_style = '#000000'
    when 'spotify'   then assign platform_color = '#1DB954'
                          assign bg_style = '#1DB954'
    else
      assign bg_style = '#7c3aed'
  endcase
-%}

{% style %}
  .vyrlo-chero-{{ section.id }} { position: relative; color: #fff; text-align: center; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-chero-{{ section.id }} .chero-bg { position: absolute; inset: 0; background: {{ bg_style }}; }
  .vyrlo-chero-{{ section.id }} .chero-bg::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.08); }
  .vyrlo-chero-{{ section.id }} .chero-inner { position: relative; z-index: 1; max-width: 880px; margin: 0 auto; padding: 56px 24px 0; }
  .vyrlo-chero-{{ section.id }} .chero-crumb {
    display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;
    font-size: 13px; color: rgba(255,255,255,0.65); margin-bottom: 36px;
  }
  .vyrlo-chero-{{ section.id }} .chero-crumb a { color: rgba(255,255,255,0.65); text-decoration: none; }
  .vyrlo-chero-{{ section.id }} .chero-crumb .chero-cur { color: #fff; font-weight: 700; }
  .vyrlo-chero-{{ section.id }} .chero-logo-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .vyrlo-chero-{{ section.id }} .chero-logo-bg {
    position: relative; width: 120px; height: 120px; border-radius: 28px;
    background: rgba(255,255,255,0.22); backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  }
  .vyrlo-chero-{{ section.id }} .chero-logo-bg::before {
    content: ""; position: absolute; inset: -16px; border-radius: 36px;
    background: rgba(255,255,255,0.15); filter: blur(20px); pointer-events: none; z-index: -1;
  }
  .vyrlo-chero-{{ section.id }} .chero-h1 {
    font-size: clamp(36px, 5.5vw, 64px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.05; margin: 0 auto 36px; max-width: 760px;
    text-shadow: 0 4px 20px rgba(0,0,0,0.22); color: #fff;
  }
  .vyrlo-chero-{{ section.id }} .chero-badges {
    display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 52px;
  }
  .vyrlo-chero-{{ section.id }} .chero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 100px;
    background: rgba(255,255,255,0.2); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.25);
    font-size: 14px; font-weight: 600; color: #fff; white-space: nowrap;
  }
  .vyrlo-chero-{{ section.id }} .chero-badge-stars { color: #fde047; font-size: 13px; letter-spacing: 1px; }
  .vyrlo-chero-{{ section.id }} .chero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px rgba(34,197,94,0.8); }
  .vyrlo-chero-{{ section.id }} .chero-tabs-wrap { position: relative; z-index: 1; background: rgba(0,0,0,0.18); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.1); }
  .vyrlo-chero-{{ section.id }} .chero-tabs { max-width: 1080px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: center; flex-wrap: wrap; }
  .vyrlo-chero-{{ section.id }} .chero-tab {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 18px 24px; text-decoration: none;
    font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.7);
    border-bottom: 3px solid transparent;
    transition: color 0.15s, border-color 0.15s; white-space: nowrap;
  }
  .vyrlo-chero-{{ section.id }} .chero-tab:hover { color: #fff; }
{% endstyle %}

<section class="vyrlo-chero-{{ section.id }}">
  <div class="chero-bg"></div>

  <div class="chero-inner">
    <div class="chero-crumb">
      <a href="/">Accueil</a>
      <span>/</span>
      <a href="/collections">Boutique</a>
      <span>/</span>
      <span class="chero-cur">{{ collection.title }}</span>
    </div>

    <div class="chero-logo-wrap">
      <div class="chero-logo-bg">{% render 'vyrlo-logo', slug: slug, size: 68 %}</div>
    </div>

    <h1 class="chero-h1">{{ section.settings.title_prefix | default: 'Services' }} {{ collection.title }}</h1>

    <div class="chero-badges">
      <div class="chero-badge"><span class="chero-badge-stars">★★★★★</span> <span>{{ section.settings.badge_rating | default: '4.9/5' }}</span></div>
      <div class="chero-badge"><span>✓</span> <span>{{ section.settings.badge_orders | default: '2 500+ commandes' }}</span></div>
      <div class="chero-badge"><span class="chero-badge-dot"></span> <span>{{ section.settings.badge_status | default: 'Service actif' }}</span></div>
    </div>
  </div>

  {% if collection.products.size > 0 %}
    {%- assign tab_order = 'abonnes,likes,vues,commentaires,partages,enregistrements,retweets,auditeurs' | split: ',' -%}
    <div class="chero-tabs-wrap">
      <div class="chero-tabs">
        {%- for ord in tab_order -%}
          {%- for p in collection.products -%}
            {%- if p.handle contains ord -%}
              <a href="{{ p.url }}" class="chero-tab">{{ p.title | remove: collection.title | strip }}</a>
            {%- endif -%}
          {%- endfor -%}
        {%- endfor -%}
      </div>
    </div>
  {% endif %}
</section>

{% schema %}
{
  "name": "Vyrlo · Hero collection",
  "tag": "section",
  "class": "section-vyrlo-col-hero",
  "settings": [
    { "type": "text", "id": "title_prefix", "label": "Préfixe titre", "default": "Services" },
    { "type": "text", "id": "badge_rating", "label": "Badge note", "default": "4.9/5" },
    { "type": "text", "id": "badge_orders", "label": "Badge commandes", "default": "2 500+ commandes" },
    { "type": "text", "id": "badge_status", "label": "Badge statut", "default": "Service actif" }
  ],
  "presets": [{ "name": "Vyrlo · Hero collection", "category": "Vyrlo" }]
}
{% endschema %}
`;
