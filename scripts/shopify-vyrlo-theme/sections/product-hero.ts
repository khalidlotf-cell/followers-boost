export const SECTION = String.raw`{% comment %}
  Vyrlo Product Hero — bannière colorée par plateforme (lue depuis les tags produit).
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify','threads'
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
    when 'threads'   then assign platform_color = '#000000'
                          assign platform_label = 'Threads'
  endcase
-%}

{% style %}
  .vyrlo-ph-{{ section.id }} { position: relative; padding: 56px 20px 56px; color: #fff; text-align: center; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-ph-{{ section.id }}::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.08); pointer-events: none; }
  .vyrlo-ph-{{ section.id }} .inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
  .vyrlo-ph-{{ section.id }} .breadcrumb { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 20px; }
  .vyrlo-ph-{{ section.id }} .breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
  .vyrlo-ph-{{ section.id }} .logo-wrap { display: flex; justify-content: center; margin-bottom: 20px; }
  .vyrlo-ph-{{ section.id }} .logo-bg { width: 72px; height: 72px; border-radius: 20px; background: rgba(255,255,255,0.18); backdrop-filter: blur(12px); border: 1.5px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
  .vyrlo-ph-{{ section.id }} h1 { font-size: clamp(26px, 3.5vw, 42px); font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; margin: 0 0 14px; text-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .vyrlo-ph-{{ section.id }} .pitch { font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.88); max-width: 500px; margin: 0 auto 24px; }
  .vyrlo-ph-{{ section.id }} .trust { display: inline-flex; gap: 18px; flex-wrap: wrap; justify-content: center; background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.18); border-radius: 100px; padding: 10px 20px; }
  .vyrlo-ph-{{ section.id }} .trust-item { display: flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 600; color: #fff; }
{% endstyle %}

<section class="vyrlo-ph-{{ section.id }}" style="background: {{ platform_color }}; {% if platform == 'instagram' %}background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%);{% endif %}">
  <div class="inner">
    <div class="breadcrumb">
      <a href="/">Accueil</a><span>/</span>
      {% if platform != blank %}<a href="/collections/{{ platform }}">{{ platform_label }}</a><span>/</span>{% endif %}
      <span style="color:#fff;font-weight:600;">{{ product.title }}</span>
    </div>
    {% if platform != blank %}
      <div class="logo-wrap">
        <div class="logo-bg">{% render 'vyrlo-logo', slug: platform, size: 40 %}</div>
      </div>
    {% endif %}
    <h1>{{ product.title }}</h1>
    <p class="pitch">{{ section.settings.pitch | default: 'Livraison progressive · Sans mot de passe · Remboursement garanti si non livré' }}</p>
    <div class="trust">
      <div class="trust-item">⚡ Démarrage 20 min</div>
      <div class="trust-item">🔒 Zéro password</div>
      <div class="trust-item">↻ Remboursement</div>
      <div class="trust-item">💬 Support FR 7j/7</div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Hero produit",
  "tag": "section",
  "class": "section-vyrlo-product-hero",
  "settings": [
    { "type": "text", "id": "pitch", "label": "Pitch", "default": "Livraison progressive · Sans mot de passe · Remboursement garanti si non livré" }
  ],
  "presets": [{ "name": "Vyrlo · Hero produit", "category": "Vyrlo" }]
}
{% endschema %}
`;
