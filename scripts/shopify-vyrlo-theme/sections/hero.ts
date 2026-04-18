export const SECTION = String.raw`{% comment %}
  Vyrlo Hero — clone vyrlo.fr avec blobs violets animés + bouton gradient shimmer.
{% endcomment %}

{%- liquid
  assign platform_slugs = 'instagram,tiktok,youtube,facebook,twitter,spotify,threads' | split: ','
-%}

{% style %}
  .vhero-{{ section.id }} {
    position: relative; padding-top: 136px; padding-bottom: 88px;
    background: {{ section.settings.bg_color | default: '#0a0a14' }};
    overflow: hidden; color: #fff; text-align: center;
    font-family: Inter, system-ui, -apple-system, sans-serif;
  }
  .vhero-{{ section.id }} .blob {
    position: absolute; border-radius: 50%;
    filter: blur(80px); pointer-events: none; will-change: transform;
  }
  .vhero-{{ section.id }} .blob-1 {
    width: 520px; height: 520px; top: -120px; left: -100px;
    background: radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%);
    animation: vhero-float-{{ section.id }} 12s ease-in-out infinite;
  }
  .vhero-{{ section.id }} .blob-2 {
    width: 400px; height: 400px; top: 40px; right: -80px;
    background: radial-gradient(circle, rgba(79,70,229,0.28) 0%, transparent 70%);
    animation: vhero-float-{{ section.id }} 16s ease-in-out infinite reverse;
  }
  .vhero-{{ section.id }} .blob-3 {
    width: 300px; height: 300px; bottom: -80px; left: 40%;
    background: radial-gradient(circle, rgba(147,51,234,0.22) 0%, transparent 70%);
    animation: vhero-float-{{ section.id }} 20s ease-in-out infinite;
  }
  @keyframes vhero-float-{{ section.id }} {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(30px,-20px) scale(1.05); }
    66%      { transform: translate(-20px,15px) scale(0.97); }
  }

  .vhero-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

  .vhero-{{ section.id }} .live-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 100px;
    padding: 7px 18px 7px 12px; margin-bottom: 32px;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.85);
  }
  .vhero-{{ section.id }} .dot {
    display: inline-block; width: 8px; height: 8px; border-radius: 50%;
    background: #22c55e; animation: vhero-pulse-{{ section.id }} 2s ease-in-out infinite;
  }
  @keyframes vhero-pulse-{{ section.id }} {
    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
    50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
  }

  .vhero-{{ section.id }} h1 {
    font-size: clamp(40px, 5.5vw, 72px); font-weight: 800;
    line-height: 1.06; letter-spacing: -0.03em;
    max-width: 860px; margin: 0 auto 24px; color: #fff;
  }
  .vhero-{{ section.id }} .grad {
    background: linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #67e8f9 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; color: transparent;
  }
  .vhero-{{ section.id }} .sub {
    font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.55);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.7;
  }
  .vhero-{{ section.id }} .sub b { color: rgba(255,255,255,0.9); }

  .vhero-{{ section.id }} .ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }

  .vhero-{{ section.id }} .btn-p {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 100px;
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%);
    background-size: 200% auto;
    color: #fff; font-weight: 700; font-size: 15px;
    text-decoration: none; letter-spacing: -0.01em;
    box-shadow: 0 4px 24px rgba(124,58,237,0.45);
    animation: vhero-shimmer-{{ section.id }} 3s linear infinite;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .vhero-{{ section.id }} .btn-p:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(124,58,237,0.55), 0 0 0 4px rgba(124,58,237,0.15);
  }
  @keyframes vhero-shimmer-{{ section.id }} {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  .vhero-{{ section.id }} .btn-g {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px; border-radius: 100px;
    background: rgba(255,255,255,0.07); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.85); font-weight: 600; font-size: 15px;
    text-decoration: none; transition: all 0.2s;
  }
  .vhero-{{ section.id }} .btn-g:hover {
    background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25);
    transform: translateY(-2px);
  }

  .vhero-{{ section.id }} .strip {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; margin-bottom: 56px;
  }
  .vhero-{{ section.id }} .strip-label {
    font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .vhero-{{ section.id }} .logo-btn {
    opacity: 0.5; transition: opacity 0.2s, transform 0.2s;
    display: flex; align-items: center;
  }
  .vhero-{{ section.id }} .logo-btn:hover { opacity: 1; transform: scale(1.1); }

  .vhero-{{ section.id }} .stats-wrap {
    display: inline-flex; gap: 0; border-radius: 20px;
    background: rgba(255,255,255,0.05); backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.1); overflow: hidden;
  }
  .vhero-{{ section.id }} .stat { padding: 22px 36px; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
  .vhero-{{ section.id }} .stat:last-child { border-right: none; }
  .vhero-{{ section.id }} .stat-v { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
  .vhero-{{ section.id }} .stat-l { font-size: 12px; color: rgba(255,255,255,0.45); margin-top: 4px; font-weight: 500; }

  @media (max-width: 768px) {
    .vhero-{{ section.id }} { padding-top: 100px; padding-bottom: 60px; }
    .vhero-{{ section.id }} .stats-wrap { display: grid !important; grid-template-columns: 1fr 1fr; }
    .vhero-{{ section.id }} .stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .vhero-{{ section.id }} .stat:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08); }
    .vhero-{{ section.id }} .stat:nth-last-child(-n+2) { border-bottom: none; }
    .vhero-{{ section.id }} .btn-p, .vhero-{{ section.id }} .btn-g { padding: 13px 22px; font-size: 14px; }
  }
{% endstyle %}

<section class="vhero-{{ section.id }}">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>

  <div class="container">
    <div class="live-badge"><span class="dot"></span><span>{{ section.settings.badge_text | default: 'Service actif · Livraison en 20 min' }}</span></div>
    <h1>{{ section.settings.title_1 | default: 'Boostez votre présence' }}<br><span class="grad">{{ section.settings.title_2 | default: 'sur les réseaux sociaux' }}</span></h1>
    <p class="sub">
      {{ section.settings.subtitle | default: 'Followers, likes, vues : des services premium pour Instagram, TikTok, YouTube et bien plus.' }}<br>
      <span style="font-size:13px;opacity:0.7;">À partir de <b>{{ section.settings.price | default: '8,90 €' }}</b> · {{ section.settings.subtitle_2 | default: 'Livraison en 24h · Sans mot de passe' }}</span>
    </p>
    <div class="ctas">
      <a href="{{ section.settings.cta1_url | default: '#platforms' }}" class="btn-p">{{ section.settings.cta1_text | default: 'Découvrir les services' }} →</a>
      <a href="{{ section.settings.cta2_url | default: '#comparatif' }}" class="btn-g">{{ section.settings.cta2_text | default: 'Voir le comparatif' }}</a>
    </div>

    <div class="strip">
      <span class="strip-label">{{ section.settings.strip_label | default: 'Disponible sur' }}</span>
      {%- for slug in platform_slugs -%}
        <a href="/collections/{{ slug }}" class="logo-btn" aria-label="{{ slug }}">{% render 'vyrlo-logo', slug: slug, size: 24 %}</a>
      {%- endfor -%}
    </div>

    <div class="stats-wrap">
      <div class="stat"><div class="stat-v">{{ section.settings.stat1_v | default: '6 000+' }}</div><div class="stat-l">{{ section.settings.stat1_l | default: 'Commandes' }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat2_v | default: '4.9/5' }}</div><div class="stat-l">{{ section.settings.stat2_l | default: 'Satisfaction' }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat3_v | default: '20 min' }}</div><div class="stat-l">{{ section.settings.stat3_l | default: 'Délai' }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat4_v | default: '7j/7' }}</div><div class="stat-l">{{ section.settings.stat4_l | default: 'Support' }}</div></div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Hero",
  "tag": "section",
  "class": "section-vyrlo-hero",
  "settings": [
    { "type": "header", "content": "Contenu" },
    { "type": "text", "id": "badge_text", "label": "Badge live", "default": "Service actif · Livraison en 20 min" },
    { "type": "text", "id": "title_1", "label": "Titre ligne 1", "default": "Boostez votre présence" },
    { "type": "text", "id": "title_2", "label": "Titre ligne 2 (gradient)", "default": "sur les réseaux sociaux" },
    { "type": "textarea", "id": "subtitle", "label": "Sous-titre", "default": "Followers, likes, vues : des services premium pour Instagram, TikTok, YouTube et bien plus." },
    { "type": "text", "id": "price", "label": "Prix starter", "default": "8,90 €" },
    { "type": "text", "id": "subtitle_2", "label": "Sous-titre ligne 2", "default": "Livraison en 24h · Sans mot de passe" },

    { "type": "header", "content": "Boutons" },
    { "type": "text", "id": "cta1_text", "label": "Bouton 1 texte", "default": "Découvrir les services" },
    { "type": "text", "id": "cta1_url", "label": "Bouton 1 lien", "default": "#platforms" },
    { "type": "text", "id": "cta2_text", "label": "Bouton 2 texte", "default": "Voir le comparatif" },
    { "type": "text", "id": "cta2_url", "label": "Bouton 2 lien", "default": "#comparatif" },

    { "type": "header", "content": "Bandeau plateformes" },
    { "type": "text", "id": "strip_label", "label": "Label", "default": "Disponible sur" },

    { "type": "header", "content": "Stats" },
    { "type": "text", "id": "stat1_v", "label": "Stat 1 valeur", "default": "6 000+" },
    { "type": "text", "id": "stat1_l", "label": "Stat 1 label", "default": "Commandes" },
    { "type": "text", "id": "stat2_v", "label": "Stat 2 valeur", "default": "4.9/5" },
    { "type": "text", "id": "stat2_l", "label": "Stat 2 label", "default": "Satisfaction" },
    { "type": "text", "id": "stat3_v", "label": "Stat 3 valeur", "default": "20 min" },
    { "type": "text", "id": "stat3_l", "label": "Stat 3 label", "default": "Délai" },
    { "type": "text", "id": "stat4_v", "label": "Stat 4 valeur", "default": "7j/7" },
    { "type": "text", "id": "stat4_l", "label": "Stat 4 label", "default": "Support" },

    { "type": "header", "content": "Apparence" },
    { "type": "color", "id": "bg_color", "label": "Fond", "default": "#0a0a14" }
  ],
  "presets": [{ "name": "Vyrlo · Hero", "category": "Vyrlo" }]
}
{% endschema %}
`;
