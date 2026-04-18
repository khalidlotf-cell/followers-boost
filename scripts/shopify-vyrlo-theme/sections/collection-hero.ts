export const SECTION = String.raw`{% comment %}
  Vyrlo Collection Hero — bannière colorée par plateforme.
  Lit la plateforme depuis collection.handle.
{% endcomment %}

{%- liquid
  assign slug = collection.handle
  assign bg = section.settings.fallback_color
  case slug
    when 'instagram' then assign bg = 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
    when 'tiktok'    then assign bg = '#010101'
    when 'youtube'   then assign bg = '#FF0000'
    when 'facebook'  then assign bg = '#1877F2'
    when 'twitter'   then assign bg = '#000000'
    when 'spotify'   then assign bg = '#1DB954'
    when 'threads'   then assign bg = '#000000'
  endcase
-%}

{% style %}
  .vyrlo-ch-{{ section.id }} { position: relative; padding: 72px 20px 64px; color: #fff; text-align: center; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-ch-{{ section.id }}::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.08); pointer-events: none; }
  .vyrlo-ch-{{ section.id }} .inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; padding: 44px 0 0; }
  .vyrlo-ch-{{ section.id }} .breadcrumb { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 28px; }
  .vyrlo-ch-{{ section.id }} .breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
  .vyrlo-ch-{{ section.id }} .breadcrumb .current { color: #fff; font-weight: 600; }
  .vyrlo-ch-{{ section.id }} .logo-wrap { display: flex; justify-content: center; margin-bottom: 28px; }
  .vyrlo-ch-{{ section.id }} .logo-bg { position: relative; width: 96px; height: 96px; border-radius: 24px; background: rgba(255,255,255,0.18); backdrop-filter: blur(12px); border: 1.5px solid rgba(255,255,255,0.35); display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
  .vyrlo-ch-{{ section.id }} h1 { font-size: clamp(32px, 4.5vw, 52px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; margin: 0 0 18px; text-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .vyrlo-ch-{{ section.id }} .intro { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.88); max-width: 540px; margin: 0 auto 36px; }
  .vyrlo-ch-{{ section.id }} .trust { display: inline-flex; gap: 20px; flex-wrap: wrap; justify-content: center; background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.18); border-radius: 16px; padding: 14px 24px; }
  .vyrlo-ch-{{ section.id }} .trust-item { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #fff; }
{% endstyle %}

<section class="vyrlo-ch-{{ section.id }}" style="background: {{ bg }};">
  <div class="inner">
    <div class="breadcrumb">
      <a href="/">Accueil</a>
      <span>/</span>
      <a href="/collections">Boutique</a>
      <span>/</span>
      <span class="current">{{ collection.title }}</span>
    </div>
    <div class="logo-wrap">
      <div class="logo-bg">{% render 'vyrlo-logo', slug: slug, size: 56 %}</div>
    </div>
    <h1>{{ section.settings.title_prefix }} {{ collection.title }}</h1>
    <div class="intro">{{ section.settings.intro }}</div>
    <div class="trust">
      <div class="trust-item">⚡ Démarrage 20 min</div>
      <div class="trust-item">🔒 Zéro mot de passe</div>
      <div class="trust-item">↻ Remboursement garanti</div>
      <div class="trust-item">💬 Support 7j/7</div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Hero collection",
  "tag": "section",
  "class": "section-vyrlo-col-hero",
  "settings": [
    { "type": "text", "id": "title_prefix", "label": "Préfixe du titre", "default": "Services" },
    { "type": "textarea", "id": "intro", "label": "Intro", "default": "Livraison progressive · Zéro mot de passe · Remboursement garanti" },
    { "type": "color", "id": "fallback_color", "label": "Couleur par défaut", "default": "#7c3aed" }
  ],
  "presets": [{ "name": "Vyrlo · Hero collection", "category": "Vyrlo" }]
}
{% endschema %}
`;
