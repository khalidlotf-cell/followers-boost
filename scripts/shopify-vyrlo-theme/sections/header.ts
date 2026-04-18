export const SECTION = String.raw`{% comment %}
  Vyrlo Header — logo image + liens plateformes + cart.
{% endcomment %}

{%- assign platform_slugs = 'instagram,tiktok,youtube,facebook,twitter,spotify' | split: ',' -%}
{%- assign platform_labels = 'Instagram,TikTok,YouTube,Facebook,Twitter,Spotify' | split: ',' -%}

{%- comment -%}
  Charge la police Outfit (Google Fonts) utilisée globalement sur vyrlo.fr.
  Le preconnect puis le link stylesheet sont injectés une seule fois ici (header).
{%- endcomment -%}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap">

{% style %}
  /* Applique Outfit globalement au store, comme sur vyrlo.fr */
  html, body, button, input, textarea, select,
  [class*="vyrlo-"], [class*="vhero-"], [class*="vbuy-"],
  [class*="vyr-"], .section-vyrlo-header, .section-vyrlo-footer {
    font-family: 'Outfit', Inter, system-ui, -apple-system, sans-serif !important;
  }

  .vyrlo-header-{{ section.id }} {
    position: sticky; top: 0; z-index: 200;
    background: #fff;
    border-bottom: 1.5px solid #ebebeb;
    font-family: 'Outfit', Inter, system-ui, sans-serif;
  }
  .vyrlo-header-{{ section.id }} .vh-inner {
    max-width: 1180px; margin: 0 auto; padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between;
    height: 60px; gap: 16px;
  }
  .vyrlo-header-{{ section.id }} .vh-logo {
    display: flex; align-items: center;
    text-decoration: none; flex-shrink: 0;
  }
  .vyrlo-header-{{ section.id }} .vh-logo img {
    height: 40px; width: auto; display: block; object-fit: contain;
  }
  .vyrlo-header-{{ section.id }} .vh-nav {
    display: flex; align-items: center; gap: 22px; flex: 1;
    justify-content: center; min-width: 0;
  }
  .vyrlo-header-{{ section.id }} .vh-link {
    display: flex; align-items: center; gap: 6px;
    font-size: 13.5px; font-weight: 500; color: #555;
    text-decoration: none; white-space: nowrap;
    transition: color 0.15s;
  }
  .vyrlo-header-{{ section.id }} .vh-link:hover { color: #0a0a0a; }
  .vyrlo-header-{{ section.id }} .vh-right {
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }
  .vyrlo-header-{{ section.id }} .vh-cart {
    position: relative; width: 40px; height: 40px;
    border-radius: 10px; border: 1.5px solid #e8e8e8;
    background: #f8f8f8; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #0a0a0a; text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
  }
  .vyrlo-header-{{ section.id }} .vh-cart:hover { background: #f0f0f0; border-color: #d4d4d4; }
  .vyrlo-header-{{ section.id }} .vh-cart-count {
    position: absolute; top: -6px; right: -6px;
    background: #7c3aed; color: #fff;
    font-size: 10px; font-weight: 800;
    border-radius: 50%; min-width: 20px; height: 20px;
    padding: 0 5px; display: flex; align-items: center; justify-content: center;
    border: 2px solid #fff;
  }
  .vyrlo-header-{{ section.id }} .vh-hamburger {
    display: none; width: 40px; height: 40px;
    flex-direction: column; align-items: center; justify-content: center; gap: 5px;
    background: none; border: 1.5px solid #e8e8e8; border-radius: 10px;
    cursor: pointer; padding: 0;
  }
  .vyrlo-header-{{ section.id }} .vh-hamburger span {
    display: block; width: 18px; height: 1.5px; background: #555; border-radius: 2px;
  }
  .vyrlo-header-{{ section.id }} .vh-mobile-panel { display: none; }
  .vyrlo-header-{{ section.id }} input[id^="vh-toggle-"] { display: none; }
  .vyrlo-header-{{ section.id }} input[id^="vh-toggle-"]:checked ~ .vh-mobile-panel {
    display: block; border-top: 1.5px solid #f0f0f0; background: #fff;
    padding: 16px 20px 24px;
  }

  @media (max-width: 860px) {
    .vyrlo-header-{{ section.id }} .vh-inner { height: 56px; }
    .vyrlo-header-{{ section.id }} .vh-nav { display: none; }
    .vyrlo-header-{{ section.id }} .vh-hamburger { display: flex; width: 36px; height: 36px; }
    .vyrlo-header-{{ section.id }} .vh-logo img { height: 34px; }
    .vyrlo-header-{{ section.id }} .vh-cart { width: 36px; height: 36px; }
  }

  .vyrlo-header-{{ section.id }} .vh-mobile-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  }
  .vyrlo-header-{{ section.id }} .vh-mobile-link {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px; border-radius: 12px;
    background: #f8f8f8; text-decoration: none; color: #0a0a0a;
    font-weight: 600; font-size: 14px;
  }
  .vyrlo-header-{{ section.id }} .vh-mobile-label {
    font-size: 11px; font-weight: 700; color: #bbb;
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;
  }
{% endstyle %}

<header class="vyrlo-header-{{ section.id }}">
  <div class="vh-inner">
    <a href="/" class="vh-logo" aria-label="{{ section.settings.brand | default: 'Vyrlo' }}">
      <img src="{{ 'vyrlo-logo-light.png' | asset_url }}" alt="{{ section.settings.brand | default: 'Vyrlo' }}" width="110" height="40" loading="eager">
    </a>

    <nav class="vh-nav">
      {%- assign nav_priority = 'abonnes,likes,vues,commentaires,partages,enregistrements,retweets,auditeurs' | split: ',' -%}
      {%- for slug in platform_slugs -%}
        {%- assign nav_col = collections[slug] -%}
        {%- assign nav_url = '/collections/' | append: slug -%}
        {%- assign nav_match = '' -%}
        {%- for ord in nav_priority -%}
          {%- if nav_match == '' -%}
            {%- for pp in nav_col.products -%}
              {%- if nav_match == '' and pp.handle contains ord -%}
                {%- assign nav_match = pp.url -%}
              {%- endif -%}
            {%- endfor -%}
          {%- endif -%}
        {%- endfor -%}
        {%- if nav_match != '' -%}{%- assign nav_url = nav_match -%}{%- endif -%}
        <a href="{{ nav_url }}" class="vh-link">
          {% render 'vyrlo-logo', slug: slug, size: 18 %}
          <span>{{ platform_labels[forloop.index0] }}</span>
        </a>
      {%- endfor -%}
    </nav>

    <div class="vh-right">
      <a href="/cart" class="vh-cart" aria-label="Panier">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {%- if cart.item_count > 0 -%}
          <span class="vh-cart-count">{{ cart.item_count }}</span>
        {%- endif -%}
      </a>

      <label for="vh-toggle-{{ section.id }}" class="vh-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </label>
    </div>

    <input type="checkbox" id="vh-toggle-{{ section.id }}">
    <div class="vh-mobile-panel">
      <div class="vh-mobile-label">Plateformes</div>
      <div class="vh-mobile-grid">
        {%- for slug in platform_slugs -%}
          {%- assign mob_col = collections[slug] -%}
          {%- assign mob_url = '/collections/' | append: slug -%}
          {%- assign mob_match = '' -%}
          {%- for ord in nav_priority -%}
            {%- if mob_match == '' -%}
              {%- for pp in mob_col.products -%}
                {%- if mob_match == '' and pp.handle contains ord -%}
                  {%- assign mob_match = pp.url -%}
                {%- endif -%}
              {%- endfor -%}
            {%- endif -%}
          {%- endfor -%}
          {%- if mob_match != '' -%}{%- assign mob_url = mob_match -%}{%- endif -%}
          <a href="{{ mob_url }}" class="vh-mobile-link">
            {% render 'vyrlo-logo', slug: slug, size: 20 %}
            <span>{{ platform_labels[forloop.index0] }}</span>
          </a>
        {%- endfor -%}
      </div>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Vyrlo · Header",
  "tag": "header",
  "class": "section-vyrlo-header",
  "settings": [
    { "type": "text", "id": "brand", "label": "Nom marque (alt)", "default": "Vyrlo" }
  ],
  "presets": [{ "name": "Vyrlo · Header", "category": "Vyrlo" }]
}
{% endschema %}
`;
