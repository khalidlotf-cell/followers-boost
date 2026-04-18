export const SECTION = String.raw`{% comment %}
  Vyrlo Product Buy — clone exact de vyrlo.fr /boutique/[platform] :
  trust line · card avec header Prix total + -23% · Ciblage · Quantité grid
  auto-fill avec POPULAIRE sur idx 2 · Voir plus noir · Lien · CTAs outline
  + gradient accent · Trust strip 3 items.
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify'
        assign platform = tag
    endcase
  endfor
  assign accent = '#7c3aed'
  case platform
    when 'instagram' then assign accent = '#e1306c'
    when 'tiktok'    then assign accent = '#010101'
    when 'youtube'   then assign accent = '#FF0000'
    when 'facebook'  then assign accent = '#1877F2'
    when 'twitter'   then assign accent = '#000000'
    when 'spotify'   then assign accent = '#1DB954'
  endcase

  assign quantities = product.variants | map: 'option1' | uniq
  assign all_targetings = product.variants | map: 'option2' | compact | uniq
  assign has_targeting = false
  if all_targetings.size > 0 and all_targetings.first != blank
    assign has_targeting = true
  endif
-%}

{% style %}
  .vyrlo-buy-{{ section.id }} { padding: 20px 16px 80px; background: {{ section.settings.bg | default: '#f8fafc' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-buy-{{ section.id }} .vbuy-wrap { max-width: 680px; margin: 0 auto; }

  /* Trust line haut */
  .vyrlo-buy-{{ section.id }} .vbuy-trustline {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; margin-bottom: 16px; gap: 0;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trustline-item {
    display: flex; align-items: center;
    font-size: 12px; font-weight: 500; color: #64748b; padding: 0 10px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trustline-sep { color: #cbd5e1; font-size: 12px; }

  /* Order card */
  .vyrlo-buy-{{ section.id }} .vbuy-card {
    background: #fff; border-radius: 20px; border: 1.5px solid #e2e8f0;
    overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  }

  /* Price header */
  .vyrlo-buy-{{ section.id }} .vbuy-price-head {
    padding: 20px 24px 18px; border-bottom: 1px solid #f1f5f9;
    background: linear-gradient(to right, #fafbff, #fff);
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-label {
    font-size: 11px; font-weight: 700; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-row { display: flex; align-items: center; gap: 12px; }
  .vyrlo-buy-{{ section.id }} .vbuy-price {
    font-size: 36px; font-weight: 800; color: #0f172a;
    letter-spacing: -0.03em; line-height: 1;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-old {
    font-size: 15px; color: #cbd5e1; text-decoration: line-through;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-discount {
    font-size: 12px; font-weight: 800; color: #fff;
    background: linear-gradient(135deg, #16a34a, #15803d);
    border-radius: 100px; padding: 4px 11px; margin-left: auto;
  }

  /* Body */
  .vyrlo-buy-{{ section.id }} .vbuy-body {
    padding: 20px 24px; display: flex; flex-direction: column; gap: 22px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-label {
    font-size: 12px; font-weight: 700; color: #64748b;
    margin-bottom: 10px; display: flex; align-items: center; gap: 6px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-label-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 10px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-label-left { display: flex; align-items: center; gap: 6px; }
  .vyrlo-buy-{{ section.id }} .vbuy-selected {
    font-size: 12px; font-weight: 700; color: {{ accent }};
    background: {{ accent }}12; padding: 2px 10px; border-radius: 100px;
  }

  /* Ciblage pills */
  .vyrlo-buy-{{ section.id }} .vbuy-target-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .vyrlo-buy-{{ section.id }} .vbuy-target {
    padding: 10px 20px; border-radius: 12px;
    font-size: 13px; font-weight: 500;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b;
    cursor: pointer; font-family: inherit; transition: all 0.12s;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-target.vbuy-active {
    border-color: {{ accent }}; background: {{ accent }}; color: #fff; font-weight: 700;
    box-shadow: 0 2px 12px {{ accent }}40;
  }

  /* Quantité grid */
  .vyrlo-buy-{{ section.id }} .vbuy-qty-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 8px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-qty-wrap { position: relative; }
  .vyrlo-buy-{{ section.id }} .vbuy-popular {
    position: absolute; top: -8px; left: 50%; transform: translateX(-50%);
    font-size: 9px; font-weight: 800; color: #fff;
    background: {{ accent }}; border-radius: 100px; padding: 2px 7px;
    white-space: nowrap; z-index: 1; letter-spacing: 0.04em;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-qty {
    width: 100%; padding: 11px 8px; border-radius: 12px;
    font-size: 13px; font-weight: 500;
    border: 1.5px solid #e2e8f0; background: #f8fafc; color: #475569;
    cursor: pointer; font-family: inherit; transition: all 0.12s; text-align: center;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-qty.vbuy-popular-border { border-color: {{ accent }}50; }
  .vyrlo-buy-{{ section.id }} .vbuy-qty.vbuy-active {
    border-color: {{ accent }}; background: {{ accent }}; color: #fff; font-weight: 800;
    box-shadow: 0 2px 12px {{ accent }}40;
  }

  /* Voir plus */
  .vyrlo-buy-{{ section.id }} .vbuy-extra { display: none; }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-extra { display: grid !important; margin-top: 8px; }
  .vyrlo-buy-{{ section.id }} .vbuy-more {
    margin-top: 10px; width: 100%; padding: 12px 16px; border-radius: 12px;
    background: #0f172a; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.15s;
  }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-more { background: #f1f5f9; color: #64748b; }
  .vyrlo-buy-{{ section.id }} .vbuy-more-count {
    background: #fff; color: #0f172a; border-radius: 100px;
    padding: 2px 10px; font-size: 12px; font-weight: 800;
  }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-more-count { display: none; }
  .vyrlo-buy-{{ section.id }} .vbuy-more-label-collapsed { display: inline; }
  .vyrlo-buy-{{ section.id }} .vbuy-more-label-expanded { display: none; }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-more-label-collapsed { display: none; }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-more-label-expanded { display: inline; }

  /* Input lien */
  .vyrlo-buy-{{ section.id }} .vbuy-input {
    width: 100%; padding: 14px 16px;
    border: 1.5px solid #e2e8f0; border-radius: 14px;
    font-size: 14px; color: #0f172a; outline: none;
    font-family: inherit; box-sizing: border-box;
    background: #f8fafc; transition: border-color 0.15s, box-shadow 0.15s;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-input:focus {
    border-color: {{ accent }}; box-shadow: 0 0 0 3px {{ accent }}20;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-input-note {
    font-size: 12px; color: #94a3b8; margin-top: 6px;
    display: flex; align-items: center; gap: 4px;
  }

  /* CTA */
  .vyrlo-buy-{{ section.id }} .vbuy-ctas { display: flex; flex-direction: column; gap: 10px; }
  .vyrlo-buy-{{ section.id }} .vbuy-cta-cart {
    width: 100%; padding: 16px; border-radius: 14px;
    background: #f8fafc; color: {{ accent }};
    font-weight: 700; font-size: 15px;
    border: 2px solid {{ accent }};
    cursor: pointer; font-family: inherit; transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-cta-cart:disabled {
    background: #f1f5f9; color: #94a3b8; border-color: #e2e8f0;
    cursor: not-allowed;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-cta-buy {
    width: 100%; padding: 16px; border-radius: 14px;
    background: linear-gradient(135deg, {{ accent }} 0%, #4f46e5 100%);
    color: #fff; font-weight: 800; font-size: 15px; border: none;
    cursor: pointer; font-family: inherit; transition: all 0.2s;
    box-shadow: 0 4px 16px {{ accent }}50; letter-spacing: 0.01em;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-cta-buy:disabled {
    background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none;
  }

  /* Trust strip footer */
  .vyrlo-buy-{{ section.id }} .vbuy-trust-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-box {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    background: #f8fafc; border: 1px solid #f1f5f9;
    border-radius: 12px; padding: 10px 6px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-icon { font-size: 16px; }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-label {
    font-size: 11px; font-weight: 600; color: #64748b;
    text-align: center; line-height: 1.3;
  }
{% endstyle %}

<section class="vyrlo-buy-{{ section.id }}" data-buy-root>
  <div class="vbuy-wrap">

    {% comment %} ── Trust line top ── {% endcomment %}
    <div class="vbuy-trustline">
      <span class="vbuy-trustline-item">✓ Démarrage rapide</span>
      <span class="vbuy-trustline-sep">·</span>
      <span class="vbuy-trustline-item">✓ Sans mot de passe</span>
      <span class="vbuy-trustline-sep">·</span>
      <span class="vbuy-trustline-item">✓ Refill inclus</span>
      <span class="vbuy-trustline-sep">·</span>
      <span class="vbuy-trustline-item">✓ Support 7j/7</span>
    </div>

    <form action="/cart/add" method="post" class="vbuy-card" data-buy-form>
      <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}" data-buy-variant-id>
      <input type="hidden" name="quantity" value="1">

      {% comment %} ── Prix header ── {% endcomment %}
      <div class="vbuy-price-head">
        <p class="vbuy-price-label">Prix total</p>
        <div class="vbuy-price-row">
          <span class="vbuy-price" data-buy-price>{{ product.selected_or_first_available_variant.price | money }}</span>
          <span class="vbuy-price-old" data-buy-price-old></span>
          <span class="vbuy-discount" data-buy-discount>-23%</span>
        </div>
      </div>

      <div class="vbuy-body">

        {% if has_targeting %}
        {% comment %} ── Ciblage ── {% endcomment %}
        <div>
          <div class="vbuy-label"><span>🎯</span> Ciblage</div>
          <div class="vbuy-target-row" data-buy-targets>
            {%- for t in all_targetings -%}
              {%- assign emoji = '🌍' -%}
              {%- assign lbl = t -%}
              {%- if t contains 'France' -%}{%- assign emoji = '🇫🇷' -%}{%- assign lbl = 'Français' -%}{%- endif -%}
              {%- if t contains 'Europe' -%}{%- assign emoji = '🇪🇺' -%}{%- assign lbl = 'Europe' -%}{%- endif -%}
              {%- if t contains 'Monde' -%}{%- assign emoji = '🌍' -%}{%- assign lbl = 'Monde' -%}{%- endif -%}
              <button type="button" class="vbuy-target {% if forloop.first %}vbuy-active{% endif %}" data-target="{{ t }}">{{ emoji }} {{ lbl }}</button>
            {%- endfor -%}
          </div>
        </div>
        {% endif %}

        {% comment %} ── Quantité ── {% endcomment %}
        <div>
          <div class="vbuy-label-row">
            <span class="vbuy-label-left"><span>📦</span> Quantité</span>
            <span class="vbuy-selected" data-buy-qty-label>{{ quantities[0] }} sélectionné·s</span>
          </div>

          {%- assign visible = 4 -%}
          <div class="vbuy-qty-grid">
            {%- for q in quantities -%}
              {%- if forloop.index <= visible -%}
                <div class="vbuy-qty-wrap">
                  {% if forloop.index == 3 %}<span class="vbuy-popular">POPULAIRE</span>{% endif %}
                  <button type="button" class="vbuy-qty {% if forloop.index == 3 %}vbuy-popular-border{% endif %} {% if forloop.first %}vbuy-active{% endif %}" data-qty="{{ q }}">{{ q }}</button>
                </div>
              {%- endif -%}
            {%- endfor -%}
          </div>

          {% if quantities.size > visible %}
            <div class="vbuy-qty-grid vbuy-extra">
              {%- for q in quantities -%}
                {%- if forloop.index > visible -%}
                  <div class="vbuy-qty-wrap">
                    <button type="button" class="vbuy-qty" data-qty="{{ q }}">{{ q }}</button>
                  </div>
                {%- endif -%}
              {%- endfor -%}
            </div>
            {%- assign extra_count = quantities.size | minus: visible -%}
            <button type="button" class="vbuy-more" data-buy-more>
              <span class="vbuy-more-label-collapsed">⊕ Voir plus</span>
              <span class="vbuy-more-label-expanded">▲ Voir moins</span>
              <span class="vbuy-more-count">+{{ extra_count }}</span>
            </button>
          {% endif %}
        </div>

        {% comment %} ── Lien ── {% endcomment %}
        <div>
          <div class="vbuy-label"><span>🔗</span> {{ section.settings.link_label | default: 'Lien du profil' }}</div>
          <input
            type="url"
            class="vbuy-input"
            name="properties[Lien]"
            required
            placeholder="{{ section.settings.link_placeholder | default: 'https://www.instagram.com/votrenom/' }}">
          <p class="vbuy-input-note"><span>🔒</span> Profil public requis pendant la livraison. Aucun mot de passe demandé.</p>
        </div>

        {% comment %} ── CTA ── {% endcomment %}
        <div class="vbuy-ctas">
          <button type="submit" name="add" class="vbuy-cta-cart" data-buy-add-cart>🛒 Ajouter au panier</button>
          <button type="button" class="vbuy-cta-buy" data-buy-checkout>Commander · <span data-buy-checkout-price>{{ product.selected_or_first_available_variant.price | money }}</span> →</button>
        </div>

        {% comment %} ── Trust strip ── {% endcomment %}
        <div class="vbuy-trust-grid">
          <div class="vbuy-trust-box"><span class="vbuy-trust-icon">🔒</span><span class="vbuy-trust-label">Shopify sécurisé</span></div>
          <div class="vbuy-trust-box"><span class="vbuy-trust-icon">⚡</span><span class="vbuy-trust-label">Démarrage &lt;12h</span></div>
          <div class="vbuy-trust-box"><span class="vbuy-trust-icon">🛡️</span><span class="vbuy-trust-label">Livraison garantie</span></div>
        </div>
      </div>
    </form>
  </div>

  <script>
    (function(){
      var root = document.querySelector('.vyrlo-buy-{{ section.id }}');
      if (!root) return;
      var variants = {{ product.variants | json }};
      var form = root.querySelector('[data-buy-form]');
      var variantInput = root.querySelector('[data-buy-variant-id]');
      var priceEl = root.querySelector('[data-buy-price]');
      var priceOldEl = root.querySelector('[data-buy-price-old]');
      var discountEl = root.querySelector('[data-buy-discount]');
      var qtyLabelEl = root.querySelector('[data-buy-qty-label]');
      var checkoutPriceEl = root.querySelector('[data-buy-checkout-price]');
      var addBtn = root.querySelector('[data-buy-add-cart]');
      var buyBtn = root.querySelector('[data-buy-checkout]');

      var selectedQty = variants[0] ? variants[0].option1 : null;
      var selectedTarget = variants[0] ? variants[0].option2 : null;

      function formatMoney(cents) {
        return (cents / 100).toFixed(2).replace('.', ',') + ' €';
      }
      function findVariant() {
        return variants.find(function(v){
          if (selectedTarget && v.option2) return v.option1 === selectedQty && v.option2 === selectedTarget;
          return v.option1 === selectedQty;
        });
      }
      function update() {
        var v = findVariant();
        if (!v) {
          addBtn.disabled = true; buyBtn.disabled = true;
          priceEl.textContent = '—';
          qtyLabelEl.textContent = 'Indisponible';
          priceOldEl.textContent = '';
          discountEl.style.display = 'none';
          return;
        }
        addBtn.disabled = false; buyBtn.disabled = false;
        variantInput.value = v.id;
        priceEl.textContent = formatMoney(v.price);
        checkoutPriceEl.textContent = formatMoney(v.price);
        var oldPrice = Math.round(v.price * 1.3);
        priceOldEl.textContent = formatMoney(oldPrice);
        var pct = Math.round((1 - v.price / oldPrice) * 100);
        discountEl.textContent = '-' + pct + '%';
        discountEl.style.display = '';
        qtyLabelEl.textContent = selectedQty + ' sélectionné·s';
      }
      root.querySelectorAll('[data-qty]').forEach(function(btn){
        btn.addEventListener('click', function(){
          selectedQty = btn.getAttribute('data-qty');
          root.querySelectorAll('[data-qty]').forEach(function(b){ b.classList.toggle('vbuy-active', b === btn); });
          update();
        });
      });
      root.querySelectorAll('[data-target]').forEach(function(btn){
        btn.addEventListener('click', function(){
          selectedTarget = btn.getAttribute('data-target');
          root.querySelectorAll('[data-target]').forEach(function(b){ b.classList.toggle('vbuy-active', b === btn); });
          update();
        });
      });
      var more = root.querySelector('[data-buy-more]');
      if (more) more.addEventListener('click', function(){ root.classList.toggle('vbuy-expanded'); });

      buyBtn.addEventListener('click', function(e){
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        var fd = new FormData(form);
        fetch('/cart/add.js', { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } })
          .then(function(){ window.location.href = '/checkout'; })
          .catch(function(){ window.location.href = '/cart'; });
      });

      update();
    })();
  </script>
</section>

{% schema %}
{
  "name": "Vyrlo · Boîte d'achat",
  "tag": "section",
  "class": "section-vyrlo-buy",
  "settings": [
    { "type": "text", "id": "link_label", "label": "Label lien", "default": "Lien du profil" },
    { "type": "text", "id": "link_placeholder", "label": "Placeholder", "default": "https://www.instagram.com/votrenom/" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "presets": [{ "name": "Vyrlo · Boîte d'achat", "category": "Vyrlo" }]
}
{% endschema %}
`;
