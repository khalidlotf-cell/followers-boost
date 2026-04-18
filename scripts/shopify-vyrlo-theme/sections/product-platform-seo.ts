export const SECTION = String.raw`{% comment %}
  Vyrlo Product Platform SEO — contenu éditorial par plateforme, en DA claire.
  4 benefits + 4 FAQ. Détection via tags produit.
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify'
        assign platform = tag
    endcase
  endfor

  case platform
    when 'instagram'
      assign intro = "Vyrlo vous propose des followers Instagram de qualité, livrés progressivement pour ne pas alerter l'algorithme. Aucun mot de passe requis, livraison démarrant en moins de 20 minutes."
      assign pf_label = "Instagram"
      assign b1 = "Livraison progressive et naturelle, aucun risque de bannissement"
      assign b2 = "Zéro mot de passe requis, seulement votre lien public"
      assign b3 = "Ciblage France disponible pour des abonnés Instagram français"
      assign b4 = "Support 7j/7 et garantie si non livré"
      assign q1 = "Est-il légal d'acheter des followers Instagram en France ?"
      assign a1 = "Oui, acheter des followers Instagram est légal en France. Vyrlo livre des abonnés de manière progressive et discrète."
      assign q2 = "Mon compte Instagram risque-t-il d'être banni ?"
      assign a2 = "Non. Vyrlo utilise une livraison progressive qui imite une croissance naturelle. Nous ne demandons jamais votre mot de passe."
      assign q3 = "Combien de temps pour recevoir mes followers Instagram ?"
      assign a3 = "La livraison démarre en moins de 20 minutes. Selon la quantité, la livraison complète prend entre quelques heures et 72 heures."
      assign q4 = "Puis-je acheter des followers Instagram français ?"
      assign a4 = "Oui. Sélectionnez l'option ciblage Français lors de votre commande pour recevoir des abonnés Instagram francophones."
    when 'tiktok'
      assign intro = "Vyrlo propose des followers TikTok livrés naturellement pour ne pas alerter l'algorithme. Une commande de likes ou de vues peut suffire à propulser votre vidéo sur la page Pour Toi."
      assign pf_label = "TikTok"
      assign b1 = "Livraison progressive adaptée à l'algorithme TikTok"
      assign b2 = "Followers, likes et vues disponibles en quelques clics"
      assign b3 = "Aucun accès à votre compte, juste votre nom d'utilisateur"
      assign b4 = "Idéal pour booster une vidéo vers la page Pour Toi (FYP)"
      assign q1 = "Acheter des abonnés TikTok est-il sans risque ?"
      assign a1 = "Oui. Vyrlo livre les abonnés progressivement, ce qui respecte les conditions d'utilisation de TikTok. Aucun mot de passe n'est demandé."
      assign q2 = "Les vues TikTok achetées comptent-elles pour l'algorithme ?"
      assign a2 = "Oui. Des vues supplémentaires augmentent le taux d'engagement, ce qui favorise la distribution sur la page Pour Toi."
      assign q3 = "Quel est le délai de livraison ?"
      assign a3 = "Démarrage sous 20 minutes. Pour 10 000+, le délai peut aller jusqu'à 72 heures pour une livraison naturelle."
      assign q4 = "Peut-on acheter des likes séparément des abonnés ?"
      assign a4 = "Oui, vous pouvez commander des likes, vues, partages ou enregistrements indépendamment."
    when 'youtube'
      assign intro = "Acheter des abonnés YouTube est la solution la plus rapide pour atteindre le seuil de monétisation. Livraison progressive, sans mot de passe."
      assign pf_label = "YouTube"
      assign b1 = "Atteignez le seuil de monétisation (1 000 abonnés) plus vite"
      assign b2 = "Abonnés stables et durables, pas de chute après livraison"
      assign b3 = "Vues YouTube pour améliorer vos recommandations"
      assign b4 = "Aucun accès à votre compte requis"
      assign q1 = "Les abonnés YouTube restent-ils après la livraison ?"
      assign a1 = "Oui. Les abonnés sont stables et durables. Une légère variation est normale, mais ils ne disparaissent pas massivement."
      assign q2 = "Acheter des vues YouTube aide-t-il à monétiser ?"
      assign a2 = "Oui. Les vues comptent pour atteindre le seuil de 4 000 heures de visionnage requis pour la monétisation."
      assign q3 = "Peut-on acheter sans mot de passe ?"
      assign a3 = "Absolument. Vyrlo ne demande jamais votre mot de passe YouTube ou Google. Seule l'URL de votre chaîne est nécessaire."
      assign q4 = "Combien d'abonnés par commande ?"
      assign a4 = "De 100 à 50 000 abonnés en une commande. Pour des besoins plus importants, contactez notre support."
    when 'facebook'
      assign intro = "Acheter des abonnés Facebook vous permet de démarrer avec une base crédible et d'attirer naturellement plus d'interactions. Livraison rapide, sans mot de passe."
      assign pf_label = "Facebook"
      assign b1 = "Augmentez rapidement la crédibilité de votre page"
      assign b2 = "Likes disponibles pour vos publications et votre page"
      assign b3 = "Aucun accès à votre compte Facebook requis"
      assign b4 = "Idéal pour les entreprises, associations et créateurs"
      assign q1 = "Peut-on acheter des likes pour une page Facebook ?"
      assign a1 = "Oui. Vyrlo propose des likes pour votre page Facebook ainsi que pour vos publications individuelles."
      assign q2 = "Les abonnés verront-ils mes publications ?"
      assign a2 = "Ils s'abonnent à votre page, mais la portée dépend de l'algorithme Facebook. Les abonnés augmentent surtout votre crédibilité."
      assign q3 = "Combien de temps pour la livraison ?"
      assign a3 = "Démarrage sous 20 minutes. Livraison progressive pour respecter les limites de Facebook."
      assign q4 = "C'est risqué pour ma page ?"
      assign a4 = "Non, si la livraison est progressive (c'est notre méthode). Vyrlo ne demande jamais vos identifiants."
    when 'twitter'
      assign intro = "Sur X, la taille de votre audience détermine votre influence. Acheter des followers est le moyen le plus rapide d'asseoir votre crédibilité. Livraison en moins de 20 minutes."
      assign pf_label = "Twitter / X"
      assign b1 = "Followers actifs, livraison progressive et naturelle"
      assign b2 = "Likes et retweets pour augmenter la portée de vos tweets"
      assign b3 = "Sans mot de passe, juste votre nom d'utilisateur X"
      assign b4 = "Boostez votre crédibilité et votre taux d'engagement"
      assign q1 = "Acheter des followers X est-il sûr en 2026 ?"
      assign a1 = "Oui, à condition d'utiliser un service qui livre progressivement comme Vyrlo. Notre méthode progressive ne présente aucun risque."
      assign q2 = "Les retweets améliorent-ils la visibilité ?"
      assign a2 = "Oui. Plus un tweet est retweeté, plus X l'affiche à de nouveaux utilisateurs. Les retweets boostent directement la portée."
      assign q3 = "Peut-on acheter pour un compte privé ?"
      assign a3 = "Non. Votre compte doit être public pour que les followers puissent vous rejoindre."
      assign q4 = "Quel est le prix de départ ?"
      assign a4 = "Les offres démarrent à 8,90 € pour les premiers followers. Plusieurs paliers selon vos besoins."
    when 'spotify'
      assign intro = "L'algorithme Spotify récompense les titres avec un fort taux d'écoute. Acheter des streams vous aide à atteindre le seuil pour les playlists algorithmiques."
      assign pf_label = "Spotify"
      assign b1 = "Augmentez vos auditeurs mensuels rapidement"
      assign b2 = "Déclenchez les playlists algorithmiques (Découvertes, Radio)"
      assign b3 = "Service discret conçu pour les artistes indépendants"
      assign b4 = "Aucun accès à votre compte Spotify requis"
      assign q1 = "Acheter des streams est-il détectable ?"
      assign a1 = "Non, si les streams sont livrés progressivement comme chez Vyrlo. Nous imitons un comportement d'écoute naturel."
      assign q2 = "Les streams comptent-ils pour les royalties ?"
      assign a2 = "Non. Leur but est d'améliorer vos statistiques et de déclencher l'algorithme, pas de générer des royalties."
      assign q3 = "Combien de streams pour une playlist ?"
      assign a3 = "Pas de seuil officiel, mais les titres avec 1 000+ auditeurs mensuels actifs commencent à être recommandés."
      assign q4 = "Peut-on acheter des auditeurs mensuels ?"
      assign a4 = "Oui. Vyrlo propose des streams (par titre) et des auditeurs mensuels séparément."
    else
      assign intro = "Vyrlo vous propose des services de croissance pour toutes les grandes plateformes. Livraison progressive, sans mot de passe, support 7j/7."
      assign pf_label = "Vyrlo"
      assign b1 = "Livraison progressive et naturelle"
      assign b2 = "Sans mot de passe, juste votre lien public"
      assign b3 = "Support 7j/7 en français"
      assign b4 = "Garantie si non livré"
      assign q1 = "Comment passer commande ?"
      assign a1 = "Choisissez votre plateforme, la quantité, entrez le lien public et payez. C'est tout."
      assign q2 = "Quel délai de livraison ?"
      assign a2 = "Démarrage sous 20 minutes. Livraison complète en quelques heures à 72h selon la quantité."
      assign q3 = "Est-ce sécurisé ?"
      assign a3 = "Oui. Aucun mot de passe requis, paiement via Shopify Payments sécurisé."
      assign q4 = "Et si ça ne marche pas ?"
      assign a4 = "Contactez le support. On corrige ou on arrange ça."
  endcase
-%}

{% style %}
  .vyrlo-pseo-{{ section.id }} {
    padding: 64px 16px;
    background: {{ section.settings.bg | default: '#ffffff' }};
    font-family: Inter, system-ui, sans-serif;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-wrap { max-width: 680px; margin: 0 auto; }
  .vyrlo-pseo-{{ section.id }} .pseo-intro {
    font-size: 14.5px; color: #64748b; line-height: 1.75;
    margin: 0 0 36px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-h2 {
    font-size: clamp(20px, 2.5vw, 26px); font-weight: 800;
    color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 20px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-benefits {
    list-style: none; margin: 0 0 44px; padding: 0;
    display: grid; grid-template-columns: 1fr; gap: 8px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-benefits li {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 12px 14px; font-size: 14px; color: #334155; line-height: 1.55;
    background: #f8fafc; border-radius: 12px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-check {
    flex-shrink: 0; width: 20px; height: 20px; display: inline-flex;
    align-items: center; justify-content: center; border-radius: 50%;
    background: #ede9fe; color: #7c3aed; font-weight: 800; font-size: 11px;
    margin-top: 1px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-card {
    background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px;
    overflow: hidden;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-item { border-bottom: 1px solid #f1f5f9; }
  .vyrlo-pseo-{{ section.id }} .pseo-item:last-child { border-bottom: none; }
  .vyrlo-pseo-{{ section.id }} .pseo-item[open] { background: #fafbff; }
  .vyrlo-pseo-{{ section.id }} .pseo-q {
    list-style: none; cursor: pointer; padding: 18px 22px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
    font-weight: 600; font-size: 14.5px; color: #0f172a;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-q::-webkit-details-marker { display: none; }
  .vyrlo-pseo-{{ section.id }} .pseo-q::after {
    content: "+"; flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
    background: #f1f5f9; display: inline-flex; align-items: center; justify-content: center;
    color: #64748b; font-size: 16px; font-weight: 600; transition: all 0.2s;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-item[open] .pseo-q::after {
    content: "−"; background: #7c3aed; color: #fff;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-a {
    padding: 0 22px 18px; color: #64748b; font-size: 14px; line-height: 1.75; margin: 0;
  }
{% endstyle %}

<section class="vyrlo-pseo-{{ section.id }}">
  <div class="pseo-wrap">
    <p class="pseo-intro">{{ intro }}</p>

    <h2 class="pseo-h2">Pourquoi Vyrlo pour {{ pf_label }} ?</h2>
    <ul class="pseo-benefits">
      <li><span class="pseo-check">✓</span><span>{{ b1 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b2 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b3 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b4 }}</span></li>
    </ul>

    <h2 class="pseo-h2">Questions fréquentes {{ pf_label }}</h2>
    <div class="pseo-card">
      <details class="pseo-item"><summary class="pseo-q">{{ q1 }}</summary><p class="pseo-a">{{ a1 }}</p></details>
      <details class="pseo-item"><summary class="pseo-q">{{ q2 }}</summary><p class="pseo-a">{{ a2 }}</p></details>
      <details class="pseo-item"><summary class="pseo-q">{{ q3 }}</summary><p class="pseo-a">{{ a3 }}</p></details>
      <details class="pseo-item"><summary class="pseo-q">{{ q4 }}</summary><p class="pseo-a">{{ a4 }}</p></details>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · SEO plateforme",
  "tag": "section",
  "class": "section-vyrlo-pseo",
  "settings": [
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Vyrlo · SEO plateforme", "category": "Vyrlo" }]
}
{% endschema %}
`;
