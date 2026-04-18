export const SECTION = String.raw`{% comment %}
  Vyrlo Footer — 4 colonnes sombres, comme vyrlo.fr.
{% endcomment %}

{% style %}
  .vyrlo-footer-{{ section.id }} {
    background: {{ section.settings.bg | default: '#06040f' }};
    padding: 56px 0 32px;
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-footer-{{ section.id }} .vf-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-footer-{{ section.id }} .vf-grid {
    display: grid !important;
    grid-template-columns: 2fr 1fr 1fr 1fr !important;
    gap: 40px !important; margin-bottom: 48px;
  }
  @media (max-width: 768px) {
    .vyrlo-footer-{{ section.id }} .vf-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
  }
  .vyrlo-footer-{{ section.id }} .vf-brand-wrap { min-width: 0; }
  .vyrlo-footer-{{ section.id }} .vf-brand {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 18px;
    text-decoration: none;
    font-weight: 900; font-size: 24px; color: #fff; letter-spacing: -0.02em;
  }
  .vyrlo-footer-{{ section.id }} .vf-brand-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: linear-gradient(135deg, #a78bfa, #818cf8, #67e8f9);
  }
  .vyrlo-footer-{{ section.id }} .vf-tagline {
    font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.75; max-width: 260px; margin: 0;
  }
  .vyrlo-footer-{{ section.id }} .vf-col-title {
    font-weight: 700; font-size: 13px; color: rgba(255,255,255,0.5);
    margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.06em;
  }
  .vyrlo-footer-{{ section.id }} .vf-col-link {
    display: block; margin-bottom: 10px;
    font-size: 14px; color: rgba(255,255,255,0.4); text-decoration: none;
    transition: color 0.15s;
  }
  .vyrlo-footer-{{ section.id }} .vf-col-link:hover { color: rgba(255,255,255,0.9); }
  .vyrlo-footer-{{ section.id }} .vf-bottom {
    border-top: 1px solid rgba(255,255,255,0.06); padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 12px;
  }
  .vyrlo-footer-{{ section.id }} .vf-copy {
    font-size: 13px; color: rgba(255,255,255,0.25);
  }
  .vyrlo-footer-{{ section.id }} .vf-pay {
    display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  }
  .vyrlo-footer-{{ section.id }} .vf-pay span.chip {
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35);
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 4px 9px; letter-spacing: 0.02em;
  }
  .vyrlo-footer-{{ section.id }} .vf-pay span.ssl {
    font-size: 12px; color: rgba(255,255,255,0.25); margin-left: 4px;
  }
{% endstyle %}

<footer class="vyrlo-footer-{{ section.id }}">
  <div class="vf-container">
    <div class="vf-grid">
      <div class="vf-brand-wrap">
        <a href="/" class="vf-brand" aria-label="{{ section.settings.brand | default: 'Vyrlo' }}">
          <img src="{{ 'vyrlo-logo-dark.png' | asset_url }}" alt="{{ section.settings.brand | default: 'Vyrlo' }}" width="120" height="44" style="height:44px;width:auto;object-fit:contain;display:block;">
        </a>
        <p class="vf-tagline">{{ section.settings.tagline | default: 'Développez votre audience sur les réseaux sociaux rapidement et en toute sécurité.' }}</p>
      </div>

      <div>
        <div class="vf-col-title">{{ section.settings.col1_title | default: 'Services' }}</div>
        <a href="/collections/instagram" class="vf-col-link">Instagram</a>
        <a href="/collections/tiktok" class="vf-col-link">TikTok</a>
        <a href="/collections/youtube" class="vf-col-link">YouTube</a>
        <a href="/collections/facebook" class="vf-col-link">Facebook</a>
        <a href="/collections/spotify" class="vf-col-link">Spotify</a>
        <a href="/collections/twitter" class="vf-col-link">X / Twitter</a>
      </div>

      <div>
        <div class="vf-col-title">{{ section.settings.col2_title | default: 'Compte' }}</div>
        <a href="/account/login" class="vf-col-link">Connexion</a>
        <a href="/account/register" class="vf-col-link">Inscription</a>
        <a href="/account" class="vf-col-link">Mes commandes</a>
      </div>

      <div>
        <div class="vf-col-title">{{ section.settings.col3_title | default: 'Aide' }}</div>
        <a href="/pages/contact" class="vf-col-link">Contact</a>
        <a href="/pages/a-propos" class="vf-col-link">À propos</a>
        <a href="/pages/cgu" class="vf-col-link">CGU</a>
        <a href="/pages/confidentialite" class="vf-col-link">Confidentialité</a>
        <a href="/pages/remboursement" class="vf-col-link">Remboursement</a>
        <a href="/pages/mentions-legales" class="vf-col-link">Mentions légales</a>
      </div>
    </div>

    <div class="vf-bottom">
      <span class="vf-copy">© {{ 'now' | date: '%Y' }} {{ section.settings.brand | default: 'Vyrlo' }}. Tous droits réservés.</span>
      <div class="vf-pay">
        <span class="chip">Visa</span>
        <span class="chip">MC</span>
        <span class="chip">Amex</span>
        <span class="chip">Apple Pay</span>
        <span class="ssl">· SSL sécurisé</span>
      </div>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Vyrlo · Footer",
  "tag": "footer",
  "class": "section-vyrlo-footer",
  "settings": [
    { "type": "text", "id": "brand", "label": "Marque", "default": "Vyrlo" },
    { "type": "textarea", "id": "tagline", "label": "Tagline", "default": "Développez votre audience sur les réseaux sociaux rapidement et en toute sécurité." },
    { "type": "text", "id": "col1_title", "label": "Col 1 titre", "default": "Services" },
    { "type": "text", "id": "col2_title", "label": "Col 2 titre", "default": "Compte" },
    { "type": "text", "id": "col3_title", "label": "Col 3 titre", "default": "Aide" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#06040f" }
  ],
  "presets": [{ "name": "Vyrlo · Footer", "category": "Vyrlo" }]
}
{% endschema %}
`;
