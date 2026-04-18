export const SECTION = String.raw`{% comment %}
  Vyrlo Product Buy Box — reproduction exacte de vyrlo.fr :
  Prix total (avec -% barré), Ciblage pills, Quantité pills, Voir plus,
  Lien du profil, Ajouter au panier, Commander direct, trust row.
{% endcomment %}

{%- liquid
  assign all_opt1 = product.variants | map: 'option1'
  assign quantities = all_opt1 | uniq
  assign all_opt2 = product.variants | map: 'option2'
  assign targetings = all_opt2 | compact | uniq
  assign has_targeting = false
  if targetings.size > 0 and targetings.first != blank
    assign has_targeting = true
  endif
-%}

{% style %}
  .vyrlo-buy-{{ section.id }} {
    padding: 48px 20px 72px; background: {{ section.settings.bg | default: '#f8fafc' }};
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-box {
    max-width: 720px; margin: 0 auto;
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 24px;
    padding: 32px; box-shadow: 0 12px 40px rgba(15,23,42,0.06);
  }

  /* ── Prix total ── */
  .vyrlo-buy-{{ section.id }} .vbuy-price-wrap {
    background: #f8fafc; border-radius: 18px; padding: 22px 24px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; margin-bottom: 28px; flex-wrap: wrap;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-label {
    font-size: 11px; font-weight: 700; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-row { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .vyrlo-buy-{{ section.id }} .vbuy-price {
    font-size: 34px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-price-old {
    font-size: 16px; color: #94a3b8; text-decoration: line-through; font-weight: 500;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-discount {
    background: #10b981; color: #fff; font-weight: 800; font-size: 13px;
    padding: 6px 14px; border-radius: 100px;
  }

  /* ── Sections ── */
  .vyrlo-buy-{{ section.id }} .vbuy-section { margin-bottom: 24px; }
  .vyrlo-buy-{{ section.id }} .vbuy-section-head {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-section-title {
    font-size: 15px; font-weight: 700; color: #0f172a;
    display: flex; align-items: center; gap: 8px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-selected {
    font-size: 12px; font-weight: 600; color: #ec4899;
    background: rgba(236,72,153,0.1); padding: 4px 12px; border-radius: 100px;
  }

  /* ── Pills ── */
  .vyrlo-buy-{{ section.id }} .vbuy-pills { display: flex; gap: 10px; flex-wrap: wrap; }
  .vyrlo-buy-{{ section.id }} .vbuy-pill {
    position: relative;
    padding: 14px 24px; border-radius: 100px;
    background: #fff; border: 2px solid #e2e8f0;
    font-weight: 700; font-size: 14.5px; color: #64748b;
    cursor: pointer; transition: all 0.15s; font-family: inherit;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-pill:hover { border-color: #cbd5e1; color: #0f172a; }
  .vyrlo-buy-{{ section.id }} .vbuy-pill.vbuy-active {
    background: #ec4899; border-color: #ec4899; color: #fff;
    box-shadow: 0 0 0 4px rgba(236,72,153,0.15);
  }
  .vyrlo-buy-{{ section.id }} .vbuy-pill[data-qty="5000"]::before {
    content: "POPULAIRE"; position: absolute; top: -12px; left: 50%;
    transform: translateX(-50%);
    background: #ec4899; color: #fff; font-size: 9px; font-weight: 800;
    padding: 3px 8px; border-radius: 100px; letter-spacing: 0.05em;
    pointer-events: none;
  }

  /* ── Voir plus ── */
  .vyrlo-buy-{{ section.id }} .vbuy-extra { display: none; margin-top: 12px; }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-extra { display: flex; flex-wrap: wrap; gap: 10px; }
  .vyrlo-buy-{{ section.id }} .vbuy-more-btn {
    width: 100%; margin-top: 16px; padding: 20px 24px;
    background: #0a0f1e; color: #fff; border: none; border-radius: 18px;
    font-weight: 800; font-size: 16px; cursor: pointer; font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 14px;
    transition: background 0.15s, transform 0.15s;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-more-btn:hover { background: #141a2e; transform: translateY(-1px); }
  .vyrlo-buy-{{ section.id }} .vbuy-more-icon { font-size: 18px; }
  .vyrlo-buy-{{ section.id }} .vbuy-more-count {
    background: #fff; color: #0a0f1e; font-weight: 800;
    padding: 5px 14px; border-radius: 100px; font-size: 14px;
    letter-spacing: -0.01em;
  }
  .vyrlo-buy-{{ section.id }}.vbuy-expanded .vbuy-more-btn { display: none; }

  /* ── Lien ── */
  .vyrlo-buy-{{ section.id }} .vbuy-input {
    width: 100%; padding: 14px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px;
    font-size: 14px; font-family: inherit; color: #0f172a;
    background: #f8fafc; transition: border-color 0.15s, box-shadow 0.15s;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-input:focus {
    outline: none; border-color: #ec4899;
    box-shadow: 0 0 0 3px rgba(236,72,153,0.12);
  }
  .vyrlo-buy-{{ section.id }} .vbuy-input-note {
    font-size: 12.5px; color: #64748b; margin: 8px 0 0;
    display: flex; align-items: center; gap: 6px;
  }

  /* ── Actions ── */
  .vyrlo-buy-{{ section.id }} .vbuy-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 28px; }
  .vyrlo-buy-{{ section.id }} .vbuy-btn-cart {
    width: 100%; padding: 16px; border-radius: 100px;
    background: #f1f5f9; color: #475569; border: 1.5px solid #e2e8f0;
    font-weight: 700; font-size: 15px; cursor: pointer; font-family: inherit;
    transition: all 0.15s;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-btn-cart:hover:not(:disabled) { background: #e2e8f0; color: #0f172a; }
  .vyrlo-buy-{{ section.id }} .vbuy-btn-buy {
    width: 100%; padding: 18px; border-radius: 100px;
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%);
    background-size: 200% auto;
    color: #fff; border: none;
    font-weight: 800; font-size: 16px; cursor: pointer; font-family: inherit;
    box-shadow: 0 4px 24px rgba(124,58,237,0.4);
    animation: vbuy-shim-{{ section.id }} 3s linear infinite;
    transition: transform 0.15s;
  }
  @keyframes vbuy-shim-{{ section.id }} { 0% { background-position: 0% center } 100% { background-position: 200% center } }
  .vyrlo-buy-{{ section.id }} .vbuy-btn-buy:hover:not(:disabled) { transform: translateY(-2px); }
  .vyrlo-buy-{{ section.id }} .vbuy-btn-cart:disabled, .vyrlo-buy-{{ section.id }} .vbuy-btn-buy:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

  /* ── Trust ── */
  .vyrlo-buy-{{ section.id }} .vbuy-trust {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 24px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-item {
    text-align: center; padding: 14px 10px;
    background: #f8fafc; border-radius: 12px;
  }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-icon { font-size: 18px; margin-bottom: 6px; }
  .vyrlo-buy-{{ section.id }} .vbuy-trust-label { font-size: 12px; font-weight: 600; color: #475569; }

  @media (max-width: 560px) {
    .vyrlo-buy-{{ section.id }} .vbuy-box { padding: 22px 18px; border-radius: 20px; }
    .vyrlo-buy-{{ section.id }} .vbuy-price { font-size: 28px; }
    .vyrlo-buy-{{ section.id }} .vbuy-trust { grid-template-columns: 1fr; }
  }
{% endstyle %}

<section class="vyrlo-buy-{{ section.id }}" data-buy-root>
  <form action="/cart/add" method="post" class="vbuy-box" data-buy-form>
    <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}" data-buy-variant-id>
    <input type="hidden" name="quantity" value="1">

    {% comment %} ── PRIX TOTAL ── {% endcomment %}
    <div class="vbuy-price-wrap">
      <div>
        <p class="vbuy-price-label">Prix total</p>
        <div class="vbuy-price-row">
          <span class="vbuy-price" data-buy-price>{{ product.selected_or_first_available_variant.price | money }}</span>
          <span class="vbuy-price-old" data-buy-price-old></span>
        </div>
      </div>
      <span class="vbuy-discount" data-buy-discount>-23%</span>
    </div>

    {% comment %} ── CIBLAGE ── {% endcomment %}
    {% if has_targeting %}
      <div class="vbuy-section">
        <div class="vbuy-section-head">
          <div class="vbuy-section-title"><span>🎯</span> Ciblage</div>
        </div>
        <div class="vbuy-pills" data-buy-targeting>
          {%- for t in targetings -%}
            {%- assign flag = '🌍' -%}
            {%- if t contains 'France' -%}{%- assign flag = '🇫🇷' -%}{%- endif -%}
            {%- if t contains 'Europe' -%}{%- assign flag = '🇪🇺' -%}{%- endif -%}
            <button type="button" class="vbuy-pill {% if forloop.first %}vbuy-active{% endif %}" data-target="{{ t }}">
              <span>{{ flag }}</span> <span>{{ t }}</span>
            </button>
          {%- endfor -%}
        </div>
      </div>
    {% endif %}

    {% comment %} ── QUANTITÉ ── {% endcomment %}
    <div class="vbuy-section">
      <div class="vbuy-section-head">
        <div class="vbuy-section-title"><span>📦</span> Quantité</div>
        <span class="vbuy-selected" data-buy-qty-label>{{ quantities[0] }} sélectionné·s</span>
      </div>

      {%- assign visible = 4 -%}
      <div class="vbuy-pills">
        {%- for q in quantities -%}
          {%- if forloop.index <= visible -%}
            <button type="button" class="vbuy-pill {% if forloop.first %}vbuy-active{% endif %}" data-qty="{{ q }}">{{ q }}</button>
          {%- endif -%}
        {%- endfor -%}
      </div>

      {% if quantities.size > visible %}
        <div class="vbuy-pills vbuy-extra">
          {%- for q in quantities -%}
            {%- if forloop.index > visible -%}
              <button type="button" class="vbuy-pill" data-qty="{{ q }}">{{ q }}</button>
            {%- endif -%}
          {%- endfor -%}
        </div>
        {%- assign extra_count = quantities.size | minus: visible -%}
        <button type="button" class="vbuy-more-btn" data-buy-more>
          <span class="vbuy-more-icon">⊕</span>
          <span>Voir plus</span>
          <span class="vbuy-more-count">+{{ extra_count }}</span>
        </button>
      {% endif %}
    </div>

    {% comment %} ── LIEN ── {% endcomment %}
    <div class="vbuy-section">
      <div class="vbuy-section-head">
        <div class="vbuy-section-title"><span>🔗</span> {{ section.settings.link_label | default: 'Lien du profil' }}</div>
      </div>
      <input
        type="url"
        class="vbuy-input"
        name="properties[Lien]"
        required
        placeholder="{{ section.settings.link_placeholder | default: 'https://www.instagram.com/votrenom/' }}"
        data-buy-link>
      <p class="vbuy-input-note"><span>🔒</span> Profil public requis pendant la livraison. Aucun mot de passe demandé.</p>
    </div>

    {% comment %} ── ACTIONS ── {% endcomment %}
    <div class="vbuy-actions">
      <button type="submit" name="add" class="vbuy-btn-cart" data-buy-add-cart>
        🛒 Ajouter au panier
      </button>
      <button type="submit" name="checkout" class="vbuy-btn-buy" formaction="/cart/add" data-buy-checkout>
        Commander · <span data-buy-checkout-price>{{ product.selected_or_first_available_variant.price | money }}</span> →
      </button>
    </div>

    {% comment %} ── TRUST ── {% endcomment %}
    <div class="vbuy-trust">
      <div class="vbuy-trust-item"><div class="vbuy-trust-icon">🔒</div><div class="vbuy-trust-label">Paiement sécurisé</div></div>
      <div class="vbuy-trust-item"><div class="vbuy-trust-icon">⚡</div><div class="vbuy-trust-label">Démarrage &lt;12h</div></div>
      <div class="vbuy-trust-item"><div class="vbuy-trust-icon">🛡️</div><div class="vbuy-trust-label">Livraison garantie</div></div>
    </div>
  </form>

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
        var n = (cents / 100).toFixed(2).replace('.', ',');
        return n + ' €';
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
      if (more) more.addEventListener('click', function(){ root.classList.add('vbuy-expanded'); });

      // Checkout button → submit vers /cart/add?checkout=true (redirige checkout direct)
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
    { "type": "text", "id": "link_label", "label": "Label champ Lien", "default": "Lien du profil" },
    { "type": "text", "id": "link_placeholder", "label": "Placeholder Lien", "default": "https://www.instagram.com/votrenom/" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "presets": [{ "name": "Vyrlo · Boîte d'achat", "category": "Vyrlo" }]
}
{% endschema %}
`;
