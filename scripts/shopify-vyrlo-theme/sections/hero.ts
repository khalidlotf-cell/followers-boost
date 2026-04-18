export const SECTION = String.raw`{% comment %}
  Vyrlo Hero — bloc d'accueil sombre avec gradient text + CTA + stats.
{% endcomment %}

{%- liquid
  assign platform_slugs = 'instagram,tiktok,youtube,facebook,twitter,spotify,threads' | split: ','
-%}

{% style %}
  .vyrlo-hero-{{ section.id }} {
    position: relative; padding: 120px 0 100px;
    background: {{ section.settings.bg_color }};
    overflow: hidden; color: #fff; text-align: center;
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-hero-{{ section.id }}::before {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 30% 0%, {{ section.settings.glow_1 }}66 0%, transparent 60%),
      radial-gradient(ellipse at 70% 100%, {{ section.settings.glow_2 }}4d 0%, transparent 60%);
    pointer-events: none;
  }
  .vyrlo-hero-{{ section.id }} .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
  .vyrlo-hero-{{ section.id }} .live-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 100px;
    padding: 7px 18px 7px 12px; margin-bottom: 32px;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
  }
  .vyrlo-hero-{{ section.id }} .dot {
    width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 12px rgba(34,197,94,0.8);
    animation: vyrlo-pulse-{{ section.id }} 2s infinite;
  }
  @keyframes vyrlo-pulse-{{ section.id }} { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
  .vyrlo-hero-{{ section.id }} h1 {
    font-size: clamp(40px, 5.5vw, 72px); font-weight: 800;
    line-height: 1.06; letter-spacing: -0.03em;
    max-width: 860px; margin: 0 auto 24px; color: #fff;
  }
  .vyrlo-hero-{{ section.id }} .grad {
    background: linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .vyrlo-hero-{{ section.id }} .sub {
    font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.5);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.7;
  }
  .vyrlo-hero-{{ section.id }} .sub b { color: rgba(255,255,255,0.85); }
  .vyrlo-hero-{{ section.id }} .ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
  .vyrlo-hero-{{ section.id }} .btn-p {
    background: #fff; color: #0a0a0a; padding: 14px 28px;
    border-radius: 100px; font-weight: 700; font-size: 15px;
    transition: transform 0.15s; display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none;
  }
  .vyrlo-hero-{{ section.id }} .btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.2); }
  .vyrlo-hero-{{ section.id }} .btn-g {
    background: rgba(255,255,255,0.08); color: #fff; padding: 14px 28px;
    border-radius: 100px; font-weight: 600; font-size: 15px;
    border: 1px solid rgba(255,255,255,0.16);
    backdrop-filter: blur(12px); text-decoration: none;
  }
  .vyrlo-hero-{{ section.id }} .btn-g:hover { background: rgba(255,255,255,0.14); }
  .vyrlo-hero-{{ section.id }} .strip {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; margin-bottom: 56px;
  }
  .vyrlo-hero-{{ section.id }} .strip-label {
    font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .vyrlo-hero-{{ section.id }} .logo-btn {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(255,255,255,0.06); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    display: inline-flex; align-items: center; justify-content: center;
    transition: transform 0.15s;
  }
  .vyrlo-hero-{{ section.id }} .logo-btn:hover { transform: translateY(-2px); background: rgba(255,255,255,0.12); }
  .vyrlo-hero-{{ section.id }} .stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; max-width: 720px; margin: 0 auto;
  }
  .vyrlo-hero-{{ section.id }} .stat {
    background: rgba(255,255,255,0.04); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
    padding: 20px; text-align: center;
  }
  .vyrlo-hero-{{ section.id }} .stat-v { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
  .vyrlo-hero-{{ section.id }} .stat-l { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; font-weight: 500; }
  @media (max-width: 640px) { .vyrlo-hero-{{ section.id }} .stats { grid-template-columns: repeat(2, 1fr); } }
{% endstyle %}

<section class="vyrlo-hero-{{ section.id }}">
  <div class="container">
    <div class="live-badge"><span class="dot"></span><span>{{ section.settings.badge_text }}</span></div>
    <h1>{{ section.settings.title_1 }}<br><span class="grad">{{ section.settings.title_2 }}</span></h1>
    <p class="sub">
      {{ section.settings.subtitle }}<br>
      <span style="font-size:13px;opacity:0.6;">{{ section.settings.subtitle_2 }}</span>
    </p>
    <div class="ctas">
      <a href="{{ section.settings.cta1_url }}" class="btn-p">{{ section.settings.cta1_text }} →</a>
      <a href="{{ section.settings.cta2_url }}" class="btn-g">{{ section.settings.cta2_text }}</a>
    </div>

    <div class="strip">
      <span class="strip-label">{{ section.settings.strip_label }}</span>
      {%- for slug in platform_slugs -%}
        <a href="/collections/{{ slug }}" class="logo-btn" aria-label="{{ slug }}">{% render 'vyrlo-logo', slug: slug, size: 24 %}</a>
      {%- endfor -%}
    </div>

    <div class="stats">
      <div class="stat"><div class="stat-v">{{ section.settings.stat1_v }}</div><div class="stat-l">{{ section.settings.stat1_l }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat2_v }}</div><div class="stat-l">{{ section.settings.stat2_l }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat3_v }}</div><div class="stat-l">{{ section.settings.stat3_l }}</div></div>
      <div class="stat"><div class="stat-v">{{ section.settings.stat4_v }}</div><div class="stat-l">{{ section.settings.stat4_l }}</div></div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Hero",
  "tag": "section",
  "class": "section-vyrlo-hero",
  "settings": [
    { "type": "header", "content": "Contenu principal" },
    { "type": "text", "id": "badge_text", "label": "Texte du badge live", "default": "Service actif · Livraison en 20 min" },
    { "type": "text", "id": "title_1", "label": "Titre ligne 1", "default": "Boostez votre présence" },
    { "type": "text", "id": "title_2", "label": "Titre ligne 2 (gradient)", "default": "sur les réseaux sociaux" },
    { "type": "textarea", "id": "subtitle", "label": "Sous-titre", "default": "Followers, likes, vues : des services premium pour Instagram, TikTok, YouTube et bien plus." },
    { "type": "text", "id": "subtitle_2", "label": "Sous-titre ligne 2", "default": "À partir de 8,90 € · Livraison en 24h · Sans mot de passe" },

    { "type": "header", "content": "Boutons" },
    { "type": "text", "id": "cta1_text", "label": "Bouton 1 texte", "default": "Découvrir les services" },
    { "type": "text", "id": "cta1_url", "label": "Bouton 1 lien", "default": "#platforms" },
    { "type": "text", "id": "cta2_text", "label": "Bouton 2 texte", "default": "Voir le comparatif" },
    { "type": "text", "id": "cta2_url", "label": "Bouton 2 lien", "default": "#comparatif" },

    { "type": "header", "content": "Bandeau plateformes" },
    { "type": "text", "id": "strip_label", "label": "Label", "default": "Disponible sur" },

    { "type": "header", "content": "Statistiques" },
    { "type": "text", "id": "stat1_v", "label": "Stat 1 valeur", "default": "6 000+" },
    { "type": "text", "id": "stat1_l", "label": "Stat 1 label", "default": "Commandes livrées" },
    { "type": "text", "id": "stat2_v", "label": "Stat 2 valeur", "default": "4.9/5" },
    { "type": "text", "id": "stat2_l", "label": "Stat 2 label", "default": "Satisfaction" },
    { "type": "text", "id": "stat3_v", "label": "Stat 3 valeur", "default": "20 min" },
    { "type": "text", "id": "stat3_l", "label": "Stat 3 label", "default": "Délai moyen" },
    { "type": "text", "id": "stat4_v", "label": "Stat 4 valeur", "default": "7j/7" },
    { "type": "text", "id": "stat4_l", "label": "Stat 4 label", "default": "Support" },

    { "type": "header", "content": "Apparence" },
    { "type": "color", "id": "bg_color", "label": "Fond", "default": "#0a0a0a" },
    { "type": "color", "id": "glow_1", "label": "Glow haut gauche", "default": "#7c3aed" },
    { "type": "color", "id": "glow_2", "label": "Glow bas droit", "default": "#4f46e5" }
  ],
  "presets": [{ "name": "Vyrlo · Hero", "category": "Vyrlo" }]
}
{% endschema %}
`;
