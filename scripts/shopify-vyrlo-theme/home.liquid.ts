// Gabarit Liquid de la homepage Vyrlo — 1 seul section géant "vyrlo-home".
// Voir scripts/shopify-push-vyrlo-theme.ts pour le push dans le thème.

export const VYRLO_HOME_LIQUID = String.raw`{% comment %}
  Vyrlo Homepage — section Liquid custom.
  Reproduit /app/page.tsx + /app/boutique/_components/ShopHome.tsx
{% endcomment %}

{%- liquid
  assign platform_slugs = 'instagram,tiktok,youtube,facebook,twitter,spotify,threads' | split: ','
-%}

{% style %}
  .vyrlo-home { --accent: #7c3aed; --accent-2: #4f46e5; font-family: Inter, system-ui, sans-serif; color: #0f172a; }
  .vyrlo-home * { box-sizing: border-box; }
  .vyrlo-home .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-home a { text-decoration: none; color: inherit; }

  /* ── Announcement ── */
  .vyrlo-announce {
    background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%);
    color: #fff; text-align: center; padding: 10px 16px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
  }

  /* ── Hero ── */
  .vyrlo-hero {
    position: relative; padding: 120px 0 100px;
    background: #0a0a0a;
    overflow: hidden; color: #fff; text-align: center;
  }
  .vyrlo-hero::before {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 30% 0%, rgba(124,58,237,0.4) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 100%, rgba(79,70,229,0.3) 0%, transparent 60%);
    pointer-events: none;
  }
  .vyrlo-hero-content { position: relative; z-index: 1; }
  .vyrlo-live-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 100px;
    padding: 7px 18px 7px 12px; margin-bottom: 32px;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
  }
  .vyrlo-live-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 12px rgba(34,197,94,0.8);
    animation: vyrlo-pulse 2s infinite;
  }
  @keyframes vyrlo-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
  .vyrlo-hero h1 {
    font-size: clamp(40px, 5.5vw, 72px); font-weight: 800;
    line-height: 1.06; letter-spacing: -0.03em;
    max-width: 860px; margin: 0 auto 24px; color: #fff;
  }
  .vyrlo-grad-text {
    background: linear-gradient(90deg, #a78bfa, #818cf8, #60a5fa);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .vyrlo-hero p.sub {
    font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.5);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.7;
  }
  .vyrlo-hero p.sub b { color: rgba(255,255,255,0.85); }
  .vyrlo-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
  .vyrlo-btn-primary {
    background: #fff; color: #0a0a0a; padding: 14px 28px;
    border-radius: 100px; font-weight: 700; font-size: 15px;
    transition: transform 0.15s, box-shadow 0.15s;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .vyrlo-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.2); }
  .vyrlo-btn-glass {
    background: rgba(255,255,255,0.08); color: #fff; padding: 14px 28px;
    border-radius: 100px; font-weight: 600; font-size: 15px;
    border: 1px solid rgba(255,255,255,0.16);
    backdrop-filter: blur(12px);
  }
  .vyrlo-btn-glass:hover { background: rgba(255,255,255,0.14); }
  .vyrlo-platform-strip {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; flex-wrap: wrap; margin-bottom: 56px;
  }
  .vyrlo-platform-strip .strip-label {
    font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .vyrlo-platform-logo-btn {
    width: 40px; height: 40px; border-radius: 12px;
    background: rgba(255,255,255,0.06); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    display: inline-flex; align-items: center; justify-content: center;
    transition: transform 0.15s, background 0.15s;
  }
  .vyrlo-platform-logo-btn:hover { transform: translateY(-2px); background: rgba(255,255,255,0.12); }
  .vyrlo-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; max-width: 720px; margin: 0 auto;
  }
  .vyrlo-stat {
    background: rgba(255,255,255,0.04); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;
    padding: 20px; text-align: center;
  }
  .vyrlo-stat-value { font-size: 26px; font-weight: 800; color: #fff; letter-spacing: -0.03em; }
  .vyrlo-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 4px; font-weight: 500; }

  /* ── Platforms bento ── */
  .vyrlo-platforms { padding: 88px 0; background: #fff; }
  .vyrlo-section-head { margin-bottom: 44px; }
  .vyrlo-eyebrow {
    font-size: 12px; font-weight: 700; color: var(--accent);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;
  }
  .vyrlo-section-head h2 {
    font-size: clamp(26px, 3vw, 40px); font-weight: 800; color: #0a0a0a;
    letter-spacing: -0.025em; margin: 0 0 8px;
  }
  .vyrlo-section-head p { font-size: 15px; color: #94a3b8; margin: 0; }
  .vyrlo-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 900px) { .vyrlo-bento { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .vyrlo-bento { grid-template-columns: 1fr; } }
  .vyrlo-bento-cell {
    position: relative; border-radius: 20px; overflow: hidden;
    background: #fff; border: 1.5px solid #f1f5f9; padding: 24px;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 180px; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .vyrlo-bento-cell:hover {
    transform: translateY(-4px); box-shadow: 0 20px 40px rgba(15,23,42,0.08);
    border-color: #e2e8f0;
  }
  .vyrlo-bento-cell.big { grid-column: span 2; min-height: 240px; }
  @media (max-width: 560px) { .vyrlo-bento-cell.big { grid-column: span 1; } }
  .vyrlo-bento-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: auto;
  }
  .vyrlo-bento-icon {
    width: 44px; height: 44px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .vyrlo-bento-cell.big .vyrlo-bento-icon { width: 52px; height: 52px; }
  .vyrlo-bento-price {
    font-size: 12px; font-weight: 600; color: #94a3b8;
    background: #f1f5f9; border-radius: 100px; padding: 4px 12px;
  }
  .vyrlo-bento-name {
    font-weight: 800; font-size: 20px; color: #0f172a;
    letter-spacing: -0.02em; margin: 0 0 10px;
  }
  .vyrlo-bento-cell.big .vyrlo-bento-name { font-size: 26px; }
  .vyrlo-bento-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .vyrlo-bento-tag { font-size: 11px; font-weight: 600; border-radius: 100px; padding: 3px 10px; }

  /* ── Steps ── */
  .vyrlo-steps { padding: 88px 0; background: #fafbff; }
  .vyrlo-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
  @media (max-width: 768px) { .vyrlo-steps-grid { grid-template-columns: 1fr; gap: 32px; } }
  .vyrlo-steps-grid .step { text-align: center; padding: 0 40px; }
  .vyrlo-step-num {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    box-shadow: 0 4px 20px rgba(124,58,237,0.35);
    color: #fff; font-weight: 800; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
  }
  .vyrlo-step h3 { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 10px; }
  .vyrlo-step p { font-size: 14px; color: #64748b; line-height: 1.75; margin: 0; }

  /* ── Comparatif ── */
  .vyrlo-comparatif { padding: 88px 0; background: #fafbff; }
  .vyrlo-tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 48px; }
  .vyrlo-tab {
    padding: 10px 28px; border-radius: 100px; font-weight: 700; font-size: 15px;
    border: 1.5px solid #e2e8f0; background: #fff; color: #64748b;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
  }
  .vyrlo-tab[aria-selected="true"] { border-color: var(--accent); background: var(--accent); color: #fff; }
  .vyrlo-compare-table {
    max-width: 780px; margin: 0 auto; border: 1.5px solid #e2e8f0;
    border-radius: 20px; overflow: hidden; background: #fff;
  }
  .vyrlo-compare-row { display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f1f5f9; }
  .vyrlo-compare-row:last-child { border-bottom: none; }
  .vyrlo-compare-row.head { background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; }
  .vyrlo-compare-cell {
    padding: 20px 24px; font-size: 14px; color: #64748b;
    border-left: 1px solid #f1f5f9;
  }
  .vyrlo-compare-cell:first-child { border-left: none; font-weight: 600; color: #475569; }
  .vyrlo-compare-row.head .vyrlo-compare-cell {
    font-size: 12px; font-weight: 700; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .vyrlo-compare-cell.service { background: rgba(124,58,237,0.02); color: #0f172a; font-weight: 600; }
  .vyrlo-compare-row.head .vyrlo-compare-cell.service { color: var(--accent); }
  .vyrlo-compare-panel { display: none; }
  .vyrlo-compare-panel.active { display: block; }

  /* ── Guarantees ── */
  .vyrlo-guarantees { padding: 88px 0; background: #fff; border-top: 1px solid #f1f5f9; }
  .vyrlo-guarantees .head {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 64px; flex-wrap: wrap; gap: 20px;
  }
  .vyrlo-guarantees-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  @media (max-width: 768px) { .vyrlo-guarantees-grid { grid-template-columns: 1fr; } }
  .vyrlo-guarantee-item {
    padding: 32px 0; border-bottom: 1px solid #f1f5f9;
    display: flex; gap: 24px; align-items: flex-start;
  }
  .vyrlo-guarantee-item:nth-child(odd) { border-right: 1px solid #f1f5f9; padding-right: 48px; }
  .vyrlo-guarantee-item:nth-child(even) { padding-left: 48px; }
  @media (max-width: 768px) {
    .vyrlo-guarantee-item:nth-child(odd), .vyrlo-guarantee-item:nth-child(even) {
      border-right: none; padding: 24px 0;
    }
  }
  .vyrlo-guarantee-num {
    font-size: 11px; font-weight: 800; color: #cbd5e1;
    letter-spacing: 0.05em; flex-shrink: 0; margin-top: 4px;
  }
  .vyrlo-guarantee-title { font-size: 17px; font-weight: 700; color: #0f172a; margin: 0 0 8px; letter-spacing: -0.015em; }
  .vyrlo-guarantee-desc { font-size: 14px; color: #64748b; line-height: 1.7; margin: 0; }

  /* ── Reviews marquee ── */
  .vyrlo-reviews { padding: 88px 0 72px; background: #fff; overflow: hidden; }
  .vyrlo-reviews .head { text-align: center; margin-bottom: 56px; }
  .vyrlo-reviews-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fefce8; border: 1px solid #fde68a; border-radius: 100px;
    padding: 6px 16px;
  }
  .vyrlo-reviews-badge .stars { color: #f59e0b; font-size: 14px; }
  .vyrlo-reviews-badge .rating { font-size: 13px; font-weight: 600; color: #92400e; }
  .vyrlo-marquee { overflow: hidden; margin-bottom: 16px; }
  .vyrlo-marquee-track { display: flex; gap: 14px; width: max-content; animation: vyrlo-marquee 50s linear infinite; }
  .vyrlo-marquee-track.reverse { animation: vyrlo-marquee-r 50s linear infinite; }
  @keyframes vyrlo-marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  @keyframes vyrlo-marquee-r { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
  .vyrlo-review-card {
    min-width: 300px; max-width: 300px; padding: 20px;
    border: 1px solid #e2e8f0; border-radius: 16px; background: #fff;
    display: flex; flex-direction: column; flex-shrink: 0;
  }
  .vyrlo-review-card .text { font-size: 13.5px; color: #475569; line-height: 1.7; margin: 0 0 16px; flex-grow: 1; }
  .vyrlo-review-card .name { font-weight: 700; font-size: 13px; color: #0f172a; }
  .vyrlo-review-card .handle { font-size: 12px; color: #94a3b8; }
  .vyrlo-review-stars { display: flex; gap: 2px; margin-bottom: 12px; color: #f59e0b; font-size: 13px; }

  /* ── FAQ ── */
  .vyrlo-faq { padding: 88px 0; background: #fafbff; }
  .vyrlo-faq-inner { max-width: 720px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-faq-head { text-align: center; margin-bottom: 52px; }
  .vyrlo-faq-item {
    border-bottom: 1px solid #e2e8f0; padding: 20px 0;
  }
  .vyrlo-faq-item[open] { border-color: var(--accent); }
  .vyrlo-faq-q {
    list-style: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    font-weight: 600; font-size: 16px; color: #0f172a;
  }
  .vyrlo-faq-q::-webkit-details-marker { display: none; }
  .vyrlo-faq-q::after {
    content: "+"; width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid #e2e8f0; display: inline-flex;
    align-items: center; justify-content: center; color: #94a3b8;
    font-size: 16px; transition: all 0.2s;
  }
  .vyrlo-faq-item[open] .vyrlo-faq-q::after { content: "−"; background: var(--accent); border-color: var(--accent); color: #fff; }
  .vyrlo-faq-a { margin: 14px 0 0; color: #64748b; font-size: 14.5px; line-height: 1.75; }

  /* ── SEO content ── */
  .vyrlo-seo { padding: 88px 0; background: #fff; border-top: 1px solid #f1f5f9; }
  .vyrlo-seo-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-seo h2 { font-size: clamp(22px, 2.5vw, 32px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 16px; }
  .vyrlo-seo p { font-size: 15px; color: #475569; line-height: 1.85; margin-bottom: 14px; }

  /* Responsive small */
  @media (max-width: 640px) {
    .vyrlo-stats { grid-template-columns: repeat(2, 1fr); }
  }
{% endstyle %}

<div class="vyrlo-home">

  {% comment %} ── Announcement bar ── {% endcomment %}
  <div class="vyrlo-announce">⚡ Livraison express · Démarrage sous 12h · Satisfait ou remboursé</div>

  {% comment %} ── HERO ── {% endcomment %}
  <section class="vyrlo-hero">
    <div class="vyrlo-hero-content container">
      <div class="vyrlo-live-badge">
        <span class="vyrlo-live-dot"></span>
        <span>Service actif · Livraison en 20 min</span>
      </div>
      <h1>Boostez votre présence<br><span class="vyrlo-grad-text">sur les réseaux sociaux</span></h1>
      <p class="sub">
        Followers, likes, vues : des services premium pour Instagram, TikTok, YouTube et bien plus.<br>
        <span style="font-size:13px;opacity:0.6;">À partir de <b>8,90 €</b> · Livraison en 24h · Sans mot de passe</span>
      </p>
      <div class="vyrlo-cta-row">
        <a href="#plateformes" class="vyrlo-btn-primary">Découvrir les services →</a>
        <a href="#comparatif" class="vyrlo-btn-glass">Voir le comparatif</a>
      </div>

      <div class="vyrlo-platform-strip">
        <span class="strip-label">Disponible sur</span>
        {%- for slug in platform_slugs -%}
          <a href="/collections/{{ slug }}" class="vyrlo-platform-logo-btn" aria-label="{{ slug }}">{% render 'vyrlo-logo', slug: slug, size: 24 %}</a>
        {%- endfor -%}
      </div>

      <div class="vyrlo-stats">
        <div class="vyrlo-stat"><div class="vyrlo-stat-value">6 000+</div><div class="vyrlo-stat-label">Commandes livrées</div></div>
        <div class="vyrlo-stat"><div class="vyrlo-stat-value">4.9/5</div><div class="vyrlo-stat-label">Satisfaction</div></div>
        <div class="vyrlo-stat"><div class="vyrlo-stat-value">20 min</div><div class="vyrlo-stat-label">Délai moyen</div></div>
        <div class="vyrlo-stat"><div class="vyrlo-stat-value">7j/7</div><div class="vyrlo-stat-label">Support</div></div>
      </div>
    </div>
  </section>

  {% comment %} ── PLATFORMS ── {% endcomment %}
  <section id="plateformes" class="vyrlo-platforms">
    <div class="container">
      <div class="vyrlo-section-head">
        <p class="vyrlo-eyebrow">Catalogue</p>
        <h2>Choisissez votre plateforme</h2>
        <p>Services disponibles pour toutes les grandes plateformes</p>
      </div>
      <div class="vyrlo-bento">
        {%- assign platforms_data = 'instagram|Instagram|#e1306c|Abonnés,Likes,Vues,Commentaires|À partir de 8,90 €|big,tiktok|TikTok|#010101|Abonnés,Likes,Vues||normal,youtube|YouTube|#FF0000|Abonnés,Vues,Likes||normal,facebook|Facebook|#1877F2|Abonnés,Likes,Vues||normal,twitter|Twitter / X|#14171A|Abonnés,Likes,Retweets||normal,spotify|Spotify|#1DB954|Streams,Auditeurs||normal,threads|Threads|#101010|Abonnés,Likes||normal' | split: ',' -%}
        {%- for row in platforms_data -%}
          {%- assign cols = row | split: '|' -%}
          {%- assign p_slug = cols[0] -%}
          {%- assign p_label = cols[1] -%}
          {%- assign p_color = cols[2] -%}
          {%- assign p_tags = cols[3] | split: ',' -%}
          {%- assign p_price = cols[4] | default: 'À partir de 8,90 €' -%}
          {%- assign p_size = cols[5] -%}
          <a href="/collections/{{ p_slug }}" class="vyrlo-bento-cell {% if p_size == 'big' %}big{% endif %}">
            <div class="vyrlo-bento-top">
              <div class="vyrlo-bento-icon" style="background: {{ p_color }}18;">
                {% render 'vyrlo-logo', slug: p_slug, size: 32 %}
              </div>
              <span class="vyrlo-bento-price">{{ p_price }}</span>
            </div>
            <div>
              <p class="vyrlo-bento-name">{{ p_label }}</p>
              <div class="vyrlo-bento-tags">
                {%- for tag in p_tags -%}
                  <span class="vyrlo-bento-tag" style="color: {{ p_color }}; background: {{ p_color }}14;">{{ tag }}</span>
                {%- endfor -%}
              </div>
            </div>
          </a>
        {%- endfor -%}
      </div>
    </div>
  </section>

  {% comment %} ── HOW IT WORKS ── {% endcomment %}
  <section class="vyrlo-steps">
    <div class="container">
      <div class="vyrlo-section-head" style="text-align:center;">
        <p class="vyrlo-eyebrow">Simple & rapide</p>
        <h2>Comment ça marche ?</h2>
        <p>3 étapes, moins de 2 minutes</p>
      </div>
      <div class="vyrlo-steps-grid">
        <div class="step vyrlo-step"><div class="vyrlo-step-num">1</div><h3>Choisissez votre service</h3><p>Sélectionnez la plateforme et le service qui vous correspond parmi notre catalogue.</p></div>
        <div class="step vyrlo-step"><div class="vyrlo-step-num">2</div><h3>Entrez vos informations</h3><p>Indiquez le lien de votre profil ou publication. Aucun mot de passe requis.</p></div>
        <div class="step vyrlo-step"><div class="vyrlo-step-num">3</div><h3>Livraison automatique</h3><p>Votre commande est traitée et livrée en quelques minutes de façon 100% sécurisée.</p></div>
      </div>
    </div>
  </section>

  {% comment %} ── COMPARATIF ── {% endcomment %}
  <section id="comparatif" class="vyrlo-comparatif" data-vyrlo-compare>
    <div class="container">
      <div class="vyrlo-section-head" style="text-align:center;">
        <p class="vyrlo-eyebrow">Comparatif</p>
        <h2>Croissance organique vs notre service</h2>
        <p>Même objectif, deux réalités très différentes.</p>
      </div>
      <div class="vyrlo-tabs" role="tablist">
        <button class="vyrlo-tab" role="tab" aria-selected="true" data-panel="1k">1K</button>
        <button class="vyrlo-tab" role="tab" aria-selected="false" data-panel="5k">5K</button>
        <button class="vyrlo-tab" role="tab" aria-selected="false" data-panel="10k">10K</button>
      </div>

      {%- assign compare_rows = '1k|1 000 abonnés|2 à 5 mois|24 à 72h|2–3h par jour|2 minutes|300 – 500 €|À partir de 8,90 €,5k|5 000 abonnés|8 à 18 mois|3 à 5 jours|3–4h par jour|2 minutes|500 – 1 500 €|À partir de 29,90 €,10k|10 000 abonnés|1 à 3 ans|5 à 8 jours|4–5h par jour|2 minutes|2 000 – 3 000 €|À partir de 74,90 €' | split: ',' -%}
      {%- for row in compare_rows -%}
        {%- assign c = row | split: '|' -%}
        <div class="vyrlo-compare-panel {% if c[0] == '1k' %}active{% endif %}" data-panel="{{ c[0] }}">
          <div class="vyrlo-compare-table">
            <div class="vyrlo-compare-row head">
              <div class="vyrlo-compare-cell">{{ c[1] }}</div>
              <div class="vyrlo-compare-cell">Croissance organique</div>
              <div class="vyrlo-compare-cell service">Notre service</div>
            </div>
            <div class="vyrlo-compare-row">
              <div class="vyrlo-compare-cell">Durée estimée</div>
              <div class="vyrlo-compare-cell">{{ c[2] }}</div>
              <div class="vyrlo-compare-cell service">{{ c[3] }}</div>
            </div>
            <div class="vyrlo-compare-row">
              <div class="vyrlo-compare-cell">Effort quotidien</div>
              <div class="vyrlo-compare-cell">{{ c[4] }}</div>
              <div class="vyrlo-compare-cell service">{{ c[5] }}</div>
            </div>
            <div class="vyrlo-compare-row">
              <div class="vyrlo-compare-cell">Coût réel</div>
              <div class="vyrlo-compare-cell">{{ c[6] }}</div>
              <div class="vyrlo-compare-cell service">{{ c[7] }}</div>
            </div>
            <div class="vyrlo-compare-row">
              <div class="vyrlo-compare-cell">Résultat garanti</div>
              <div class="vyrlo-compare-cell"><span style="color:#f87171;font-weight:700;">✕</span> Non garanti</div>
              <div class="vyrlo-compare-cell service" style="color:#059669;"><span style="font-weight:700;">✓</span> Oui</div>
            </div>
          </div>
        </div>
      {%- endfor -%}

      <p style="text-align:center;font-size:13px;color:#94a3b8;margin-top:20px;">* Les coûts organiques incluent le temps, l'équipement et les outils.</p>
    </div>
  </section>

  {% comment %} ── GUARANTEES ── {% endcomment %}
  <section class="vyrlo-guarantees">
    <div class="container">
      <div class="head">
        <div>
          <p class="vyrlo-eyebrow">Nos engagements</p>
          <h2 style="font-size:clamp(28px,3.5vw,44px);font-weight:800;margin:0;letter-spacing:-0.03em;line-height:1.1;">Ce qui nous différencie</h2>
        </div>
        <p style="font-size:15px;color:#94a3b8;max-width:320px;line-height:1.75;">Des services pensés pour votre croissance réelle, pas juste pour les chiffres.</p>
      </div>
      <div class="vyrlo-guarantees-grid">
        {%- assign guarantees = "01|Livraison progressive|Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser.;;02|Profils ciblés France|Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu.;;03|Refill automatique|Un drop ? Le refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées.;;04|Démarrage en quelques heures|Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures.;;05|Aucun mot de passe requis|Vos accès restent privés. On a seulement besoin du lien de votre profil ou de votre publication.;;06|Support humain 7j/7|Une vraie équipe qui répond en moins d'une heure. Pas un bot, pas une FAQ automatique." | split: ";;" -%}
        {%- for g in guarantees -%}
          {%- assign parts = g | split: '|' -%}
          <div class="vyrlo-guarantee-item">
            <span class="vyrlo-guarantee-num">{{ parts[0] }}</span>
            <div>
              <p class="vyrlo-guarantee-title">{{ parts[1] }}</p>
              <p class="vyrlo-guarantee-desc">{{ parts[2] }}</p>
            </div>
          </div>
        {%- endfor -%}
      </div>
    </div>
  </section>

  {% comment %} ── REVIEWS marquee ── {% endcomment %}
  <section class="vyrlo-reviews">
    <div class="head container">
      <p class="vyrlo-eyebrow">Avis clients</p>
      <h2 style="font-size:clamp(28px,3vw,42px);font-weight:800;margin:0 0 12px;letter-spacing:-0.025em;">Ce que disent nos clients</h2>
      <div class="vyrlo-reviews-badge">
        <span class="stars">★★★★★</span>
        <span class="rating">4.9/5 · 6 000+ commandes livrées</span>
      </div>
    </div>

    {%- assign reviews1 = "Yasmine K.|@yasminekadri|J'avais 2 300 followers Instagram depuis 3 ans. Après une commande de 5K, l'algo m'a poussé. Maintenant j'ai 14K en organique.;;Florian M.|@floriandumas.mkt|TikTok : commandé 10K vues, la vidéo est passée de 300 à 47K naturellement dans la semaine. Je recommande.;;Inès B.|@ines.beauty.fr|Le ciblage France c'est la vraie différence. J'ai eu des abonnés qui répondaient à mes sondages dès le lendemain.;;Romain C.|@romain.coach_|Livraison en 6h, prix honnête, support qui répond le soir. C'est tout ce que je voulais.;;Léa M.|@lea.moreau.off|Commandé 1 000 abonnés un mardi soir. Le jeudi j'étais à 980. 6 mois plus tard mon compte grossit tout seul.;;Anaïs T.|@anais.travel.ig|3ème commande. Je le fais avant chaque collab pour avoir un profil crédible. Ça marche à chaque fois.;;Nassim O.|@nassimoff_|Commandé 500 likes sur un post test. En 2h tout était là. Depuis j'ai commandé 4 fois.;;Théo D.|@theo.drops.fr|Le refill a compensé automatiquement quand j'ai eu des drops. Vraiment tranquille.;;Marie-Lou P.|@marielouperrin|Comparé 4 panels différents. C'est le seul où les abonnés étaient encore là 3 mois après.;;Antoine B.|@antoinebru.off|Commande passée à minuit, livraison démarrée à 6h du matin. Propre et sans mauvaise surprise.;;Clémence V.|@clemence.video|Pour YouTube : 2 000 abonnés commandés. Ma chaîne recommandée dans des playlists 2 semaines après.;;Kevin A.|@kevinab.pro|Spotify : auditeurs mensuels passés de 800 à 6 200 en 3 semaines." | split: ";;" -%}
    {%- assign reviews2 = "Sofia R.|@sofiar.create|Interface simple, pas besoin de compte, paiement en 30 secondes. Exactement ce que j'attendais.;;Hugo L.|@hugolaffon_|Les likes express arrivent avant que j'aie fermé l'app. Parfait pour les publications où le timing est crucial.;;Camille R.|@cam.rousseau_|Les nouveaux abonnés regardent mes stories et répondent à mes questions. C'est pas des fantômes.;;Baptiste M.|@bap.music31|Pour les streams Spotify c'est propre. J'y vais par paliers de 1 000. Résultat nickel à chaque fois.;;Lucie F.|@luciefaure.art|Compte Facebook pro : 2 000 abonnés commandés. Tout livré en 18h. Rien à redire sur la qualité.;;Mathieu G.|@mathieu.gym_|J'ai une communauté de 22K maintenant, moitié organique moitié boost. Les deux se combinent très bien.;;Sandra K.|@sandrak.food|Le support m'a répondu en 45 min un dimanche soir. Ce niveau de réactivité c'est rare.;;Julie M.|@julie.martin.crea|3ème commande. Ça marche à chaque fois. De 800 à 15 000 en 8 mois.;;Youssef A.|@youssefamrani|Quelques abonnés sont partis après 3 semaines mais le refill a compensé automatiquement.;;Nicolas D.|@nicodu31|Rapide, propre, prix correct. J'ai commandé pour ma page Facebook pro. Tout arrivé en moins de 24h.;;Amina K.|@amina_kaci_art|Les abonnés qui arrivent s'engagent aussi sur mes stories. On sent que c'est des profils actifs.;;Thomas L.|@thomas.lef.photo|Ma chaîne YouTube stagnait à 200 abonnés depuis un an. Commandé 2 000. 3 semaines après j'étais à 3 500." | split: ";;" -%}

    <div class="vyrlo-marquee">
      <div class="vyrlo-marquee-track">
        {%- for r in reviews1 -%}{%- assign rp = r | split: '|' -%}<div class="vyrlo-review-card"><div class="vyrlo-review-stars">★★★★★</div><p class="text">&ldquo;{{ rp[2] }}&rdquo;</p><div><div class="name">{{ rp[0] }}</div><div class="handle">{{ rp[1] }}</div></div></div>{%- endfor -%}
        {%- for r in reviews1 -%}{%- assign rp = r | split: '|' -%}<div class="vyrlo-review-card"><div class="vyrlo-review-stars">★★★★★</div><p class="text">&ldquo;{{ rp[2] }}&rdquo;</p><div><div class="name">{{ rp[0] }}</div><div class="handle">{{ rp[1] }}</div></div></div>{%- endfor -%}
      </div>
    </div>
    <div class="vyrlo-marquee">
      <div class="vyrlo-marquee-track reverse">
        {%- for r in reviews2 -%}{%- assign rp = r | split: '|' -%}<div class="vyrlo-review-card"><div class="vyrlo-review-stars">★★★★★</div><p class="text">&ldquo;{{ rp[2] }}&rdquo;</p><div><div class="name">{{ rp[0] }}</div><div class="handle">{{ rp[1] }}</div></div></div>{%- endfor -%}
        {%- for r in reviews2 -%}{%- assign rp = r | split: '|' -%}<div class="vyrlo-review-card"><div class="vyrlo-review-stars">★★★★★</div><p class="text">&ldquo;{{ rp[2] }}&rdquo;</p><div><div class="name">{{ rp[0] }}</div><div class="handle">{{ rp[1] }}</div></div></div>{%- endfor -%}
      </div>
    </div>
  </section>

  {% comment %} ── FAQ ── {% endcomment %}
  <section id="faq" class="vyrlo-faq">
    <div class="vyrlo-faq-inner">
      <div class="vyrlo-faq-head">
        <p class="vyrlo-eyebrow">FAQ</p>
        <h2 style="font-size:clamp(28px,3vw,42px);font-weight:800;margin:0;letter-spacing:-0.025em;">Questions fréquentes</h2>
      </div>
      {%- assign faqs = "Est-ce que c'est sécurisé ?|Oui, totalement. Nous n'avons jamais besoin de votre mot de passe. Nos méthodes respectent les conditions d'utilisation des plateformes.;;Combien de temps prend la livraison ?|La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée.;;Les followers/likes sont-ils réels ?|Nos services varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des comptes de haute qualité.;;Que faire si ma commande ne démarre pas ?|Contactez notre support disponible 7j/7. Nous garantissons le remboursement ou le remplacement si la commande n'est pas livrée.;;Puis-je commander pour n'importe quel compte ?|Oui, tant que le compte est public au moment de la commande. Pour les likes et vues, la publication doit être accessible." | split: ";;" -%}
      {%- for f in faqs -%}
        {%- assign fp = f | split: '|' -%}
        <details class="vyrlo-faq-item">
          <summary class="vyrlo-faq-q">{{ fp[0] }}</summary>
          <p class="vyrlo-faq-a">{{ fp[1] }}</p>
        </details>
      {%- endfor -%}
    </div>
  </section>

  {% comment %} ── SEO content ── {% endcomment %}
  <section class="vyrlo-seo">
    <div class="vyrlo-seo-inner">
      <h2>Pourquoi acheter des followers sur les réseaux sociaux ?</h2>
      <p>Le nombre d'abonnés d'un profil est la première chose qu'un visiteur regarde avant de décider de s'abonner ou d'acheter. Un compte avec 500 followers et un compte avec 20 000 followers proposant le même contenu n'obtiendront pas le même taux de conversion — c'est la preuve sociale. Les algorithmes de toutes les plateformes (Instagram, TikTok, YouTube) fonctionnent pareil : ils poussent les comptes qui grossissent vite vers de nouvelles audiences. Acheter des followers ou des likes, c'est enclencher ce mécanisme et donner à votre compte la visibilité initiale qu'il mérite.</p>
      <p>Combiné à du contenu de qualité, un boost initial peut multiplier votre portée organique par 5 à 20 dans les semaines qui suivent. Des créateurs et des marques utilisent ces services régulièrement avant des lancements, des collaborations ou des campagnes pour maximiser leur impact dès le départ.</p>
    </div>
  </section>

</div>

<script>
  (function(){
    document.querySelectorAll('[data-vyrlo-compare]').forEach(function(root){
      root.querySelectorAll('.vyrlo-tab').forEach(function(btn){
        btn.addEventListener('click', function(){
          var p = btn.getAttribute('data-panel');
          root.querySelectorAll('.vyrlo-tab').forEach(function(b){ b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
          root.querySelectorAll('.vyrlo-compare-panel').forEach(function(panel){
            panel.classList.toggle('active', panel.getAttribute('data-panel') === p);
          });
        });
      });
    });
  })();
</script>

{% schema %}
{
  "name": "Vyrlo Homepage",
  "settings": [],
  "presets": [
    { "name": "Vyrlo Homepage", "category": "Advanced" }
  ]
}
{% endschema %}
`;
