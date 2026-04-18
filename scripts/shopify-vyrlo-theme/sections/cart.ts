export const SECTION = String.raw`{% comment %}
  Vyrlo Cart — page panier stylée Vyrlo.
{% endcomment %}

{% style %}
  .vyrlo-ct-{{ section.id }} { padding: 56px 0 88px; background: {{ section.settings.bg | default: '#f8fafc' }}; min-height: 70vh; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-ct-{{ section.id }} .ct-container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
  .vyrlo-ct-{{ section.id }} .ct-head { margin-bottom: 36px; }
  .vyrlo-ct-{{ section.id }} .ct-title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 6px; }
  .vyrlo-ct-{{ section.id }} .ct-sub { font-size: 14px; color: #64748b; margin: 0; }
  .vyrlo-ct-{{ section.id }} .ct-empty {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px;
    padding: 56px 32px; text-align: center; max-width: 480px; margin: 0 auto;
  }
  .vyrlo-ct-{{ section.id }} .ct-empty-icon { font-size: 48px; margin-bottom: 18px; }
  .vyrlo-ct-{{ section.id }} .ct-empty h2 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 10px; }
  .vyrlo-ct-{{ section.id }} .ct-empty p { font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.7; }
  .vyrlo-ct-{{ section.id }} .ct-empty a {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 13px 26px; border-radius: 100px;
    background: #0f172a; color: #fff;
    font-weight: 700; font-size: 14.5px; text-decoration: none;
    transition: transform 0.15s;
  }
  .vyrlo-ct-{{ section.id }} .ct-empty a:hover { transform: translateY(-2px); }

  .vyrlo-ct-{{ section.id }} .ct-grid { display: grid; grid-template-columns: 1fr 380px; gap: 28px; align-items: start; }
  @media (max-width: 900px) { .vyrlo-ct-{{ section.id }} .ct-grid { grid-template-columns: 1fr; } }

  .vyrlo-ct-{{ section.id }} .ct-items { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
  .vyrlo-ct-{{ section.id }} .ct-item { display: grid; grid-template-columns: 80px 1fr auto; gap: 16px; padding: 20px; border-bottom: 1px solid #f1f5f9; align-items: center; }
  .vyrlo-ct-{{ section.id }} .ct-item:last-child { border-bottom: none; }
  .vyrlo-ct-{{ section.id }} .ct-item-thumb { width: 80px; height: 80px; border-radius: 14px; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .vyrlo-ct-{{ section.id }} .ct-item-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .vyrlo-ct-{{ section.id }} .ct-item-body { min-width: 0; }
  .vyrlo-ct-{{ section.id }} .ct-item-title { font-weight: 700; font-size: 15px; color: #0f172a; margin: 0 0 4px; text-decoration: none; display: block; }
  .vyrlo-ct-{{ section.id }} .ct-item-variant { font-size: 13px; color: #64748b; margin: 0 0 4px; }
  .vyrlo-ct-{{ section.id }} .ct-item-props { font-size: 12px; color: #94a3b8; margin: 0; }
  .vyrlo-ct-{{ section.id }} .ct-item-props dt { display: inline; font-weight: 600; }
  .vyrlo-ct-{{ section.id }} .ct-item-props dd { display: inline; margin: 0; }
  .vyrlo-ct-{{ section.id }} .ct-item-right { text-align: right; display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
  .vyrlo-ct-{{ section.id }} .ct-item-price { font-weight: 800; font-size: 16px; color: #0f172a; }
  .vyrlo-ct-{{ section.id }} .ct-qty { display: flex; align-items: center; border: 1.5px solid #e2e8f0; border-radius: 100px; overflow: hidden; }
  .vyrlo-ct-{{ section.id }} .ct-qty button { width: 32px; height: 32px; background: none; border: none; cursor: pointer; font-size: 16px; color: #475569; font-family: inherit; }
  .vyrlo-ct-{{ section.id }} .ct-qty button:hover { background: #f8fafc; color: #0f172a; }
  .vyrlo-ct-{{ section.id }} .ct-qty input { width: 36px; text-align: center; border: none; font-weight: 700; font-size: 14px; color: #0f172a; background: transparent; font-family: inherit; }
  .vyrlo-ct-{{ section.id }} .ct-remove { background: none; border: none; color: #94a3b8; font-size: 12px; cursor: pointer; text-decoration: underline; padding: 0; font-family: inherit; }
  .vyrlo-ct-{{ section.id }} .ct-remove:hover { color: #ef4444; }

  .vyrlo-ct-{{ section.id }} .ct-summary { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 24px; position: sticky; top: 84px; }
  .vyrlo-ct-{{ section.id }} .ct-sum-title { font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 16px; }
  .vyrlo-ct-{{ section.id }} .ct-sum-row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #475569; margin-bottom: 10px; }
  .vyrlo-ct-{{ section.id }} .ct-sum-row.ct-sum-total { font-size: 18px; font-weight: 800; color: #0f172a; padding-top: 14px; margin-top: 14px; margin-bottom: 18px; border-top: 1px solid #f1f5f9; }
  .vyrlo-ct-{{ section.id }} .ct-checkout {
    display: block; width: 100%; text-align: center;
    padding: 15px; border-radius: 100px;
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%);
    background-size: 200% auto;
    color: #fff; font-weight: 700; font-size: 15px;
    text-decoration: none; border: none; cursor: pointer;
    box-shadow: 0 4px 24px rgba(124,58,237,0.35);
    animation: vyrlo-ct-shim-{{ section.id }} 3s linear infinite;
    font-family: inherit;
  }
  @keyframes vyrlo-ct-shim-{{ section.id }} { 0% { background-position: 0% center } 100% { background-position: 200% center } }
  .vyrlo-ct-{{ section.id }} .ct-checkout:hover { transform: translateY(-2px); }
  .vyrlo-ct-{{ section.id }} .ct-trust { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; font-size: 12.5px; color: #64748b; }
  .vyrlo-ct-{{ section.id }} .ct-trust-item { display: flex; align-items: center; gap: 8px; }
  .vyrlo-ct-{{ section.id }} .ct-note-label { font-size: 12px; font-weight: 600; color: #475569; margin: 16px 0 6px; display: block; }
  .vyrlo-ct-{{ section.id }} .ct-note-input { width: 100%; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-family: inherit; resize: vertical; min-height: 60px; }
{% endstyle %}

<section class="vyrlo-ct-{{ section.id }}">
  <div class="ct-container">
    <div class="ct-head">
      <h1 class="ct-title">Votre panier</h1>
      <p class="ct-sub">{% if cart.item_count > 0 %}{{ cart.item_count }} article{% if cart.item_count > 1 %}s{% endif %} — livraison progressive, sans mot de passe{% else %}Ajoutez des services à votre panier pour continuer{% endif %}</p>
    </div>

    {% if cart.item_count == 0 %}
      <div class="ct-empty">
        <div class="ct-empty-icon">🛒</div>
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos services pour booster votre compte Instagram, TikTok, YouTube et plus.</p>
        <a href="/collections/all">Voir la boutique →</a>
      </div>
    {% else %}
      <form action="{{ routes.cart_url }}" method="post" class="ct-grid">
        <div class="ct-items">
          {%- for item in cart.items -%}
            <div class="ct-item">
              <div class="ct-item-thumb">
                {% if item.image %}
                  <img src="{{ item.image | image_url: width: 160 }}" alt="{{ item.title }}" loading="lazy">
                {% else %}
                  <span style="font-size:24px;">📦</span>
                {% endif %}
              </div>
              <div class="ct-item-body">
                <a href="{{ item.url }}" class="ct-item-title">{{ item.product.title }}</a>
                {% unless item.variant.title contains 'Default' %}<div class="ct-item-variant">{{ item.variant.title }}</div>{% endunless %}
                {%- if item.properties.size > 0 -%}
                  <dl class="ct-item-props">
                    {%- for prop in item.properties -%}
                      {%- if prop.last != blank and prop.first != '_' -%}
                        <dt>{{ prop.first }}:</dt> <dd>{{ prop.last }}</dd>{% unless forloop.last %} · {% endunless %}
                      {%- endif -%}
                    {%- endfor -%}
                  </dl>
                {%- endif -%}
              </div>
              <div class="ct-item-right">
                <div class="ct-item-price">{{ item.final_line_price | money }}</div>
                <div class="ct-qty">
                  <button type="submit" name="updates[{{ item.key }}]" value="{{ item.quantity | minus: 1 }}" aria-label="Moins">−</button>
                  <input type="number" name="updates[{{ item.key }}]" value="{{ item.quantity }}" min="0" aria-label="Quantité">
                  <button type="submit" name="updates[{{ item.key }}]" value="{{ item.quantity | plus: 1 }}" aria-label="Plus">+</button>
                </div>
                <button type="submit" name="updates[{{ item.key }}]" value="0" class="ct-remove">Retirer</button>
              </div>
            </div>
          {%- endfor -%}
        </div>

        <aside class="ct-summary">
          <h2 class="ct-sum-title">Récapitulatif</h2>
          <div class="ct-sum-row"><span>Sous-total</span><span>{{ cart.items_subtotal_price | money }}</span></div>
          {% if cart.total_discount > 0 %}
            <div class="ct-sum-row" style="color:#059669;"><span>Réduction</span><span>− {{ cart.total_discount | money }}</span></div>
          {% endif %}
          <div class="ct-sum-row"><span>Livraison</span><span>Gratuite</span></div>
          <div class="ct-sum-row ct-sum-total"><span>Total</span><span>{{ cart.total_price | money }}</span></div>

          <label class="ct-note-label" for="ct-note-{{ section.id }}">Note pour votre commande (optionnel)</label>
          <textarea id="ct-note-{{ section.id }}" name="note" class="ct-note-input" placeholder="Une précision sur votre commande…">{{ cart.note }}</textarea>

          <button type="submit" name="checkout" class="ct-checkout" style="margin-top:18px;">Passer au paiement →</button>

          <div class="ct-trust">
            <div class="ct-trust-item">🔒 Paiement 100% sécurisé via Shopify</div>
            <div class="ct-trust-item">⚡ Démarrage sous 20 minutes</div>
            <div class="ct-trust-item">↻ Remboursement garanti si non livré</div>
          </div>
        </aside>
      </form>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Panier",
  "tag": "section",
  "class": "section-vyrlo-cart",
  "settings": [
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "presets": [{ "name": "Vyrlo · Panier", "category": "Vyrlo" }]
}
{% endschema %}
`;
