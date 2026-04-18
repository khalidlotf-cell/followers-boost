export const SECTION = String.raw`{% comment %}
  Vyrlo Product Platform SEO — contenu éditorial par plateforme (H1 + intro
  + 4 benefits checkmarks + 4 FAQ plateforme). Détection via tags produit.
  Clone de PLATFORM_META de lib/storefront-content.ts côté Next.
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
      assign h1 = "Acheter des followers Instagram — Livraison en 20 min"
      assign intro = "Vous cherchez à acheter des abonnés Instagram rapidement et en toute sécurité ? Vyrlo vous propose des followers Instagram de qualité, livrés progressivement pour ne pas alerter l'algorithme. Aucun mot de passe requis, livraison démarrant en moins de 20 minutes. Boostez votre crédibilité sur Instagram dès aujourd'hui à partir de 8,90 €."
      assign pf_label = "Instagram"
      assign b1 = "Livraison progressive et naturelle — aucun risque de bannissement"
      assign b2 = "Zéro mot de passe requis — seulement votre lien public"
      assign b3 = "Ciblage France disponible pour des abonnés Instagram français"
      assign b4 = "Support 7j/7 et remboursement garanti si non livré"
      assign q1 = "Est-il légal d'acheter des followers Instagram en France ?"
      assign a1 = "Oui, acheter des followers Instagram est légal en France. Cela reste une pratique courante pour booster la visibilité d'un compte. Vyrlo livre des abonnés de manière progressive et discrète."
      assign q2 = "Mon compte Instagram risque-t-il d'être banni ?"
      assign a2 = "Non. Vyrlo utilise une livraison progressive qui imite une croissance naturelle. Nous ne demandons jamais votre mot de passe. Le risque de bannissement est inexistant avec notre méthode."
      assign q3 = "Combien de temps pour recevoir mes followers Instagram ?"
      assign a3 = "La livraison démarre en moins de 20 minutes après votre commande. Selon la quantité, la livraison complète prend entre quelques heures et 72 heures."
      assign q4 = "Puis-je acheter des followers Instagram français ?"
      assign a4 = "Oui, Vyrlo propose un ciblage Français pour vous fournir des abonnés Instagram Français. Sélectionnez l'option ciblage Français lors de votre commande."
    when 'tiktok'
      assign h1 = "Acheter des abonnés TikTok — Boost garanti dès 8,90 €"
      assign intro = "Vous souhaitez acheter des abonnés TikTok pour déclencher l'algorithme et gagner en visibilité ? Vyrlo propose des followers TikTok livrés naturellement pour ne pas alerter TikTok. Une commande de likes ou de vues TikTok peut suffire à propulser votre vidéo sur la page Pour Toi. Résultats garantis, à partir de 8,90 €."
      assign pf_label = "TikTok"
      assign b1 = "Livraison progressive adaptée à l'algorithme TikTok"
      assign b2 = "Followers, likes et vues disponibles en quelques clics"
      assign b3 = "Aucun accès à votre compte — juste votre nom d'utilisateur"
      assign b4 = "Idéal pour booster une vidéo vers la page Pour Toi (FYP)"
      assign q1 = "Acheter des abonnés TikTok est-il sans risque ?"
      assign a1 = "Oui. Vyrlo livre les abonnés TikTok progressivement, ce qui respecte les conditions d'utilisation de TikTok. Aucun mot de passe n'est demandé."
      assign q2 = "Est-ce que les vues TikTok achetées comptent pour l'algorithme ?"
      assign a2 = "Oui. Des vues supplémentaires augmentent le taux d'engagement de votre vidéo, ce qui favorise sa distribution par l'algorithme TikTok sur la page Pour Toi."
      assign q3 = "Quel est le délai de livraison pour des abonnés TikTok ?"
      assign a3 = "La livraison démarre en moins de 20 minutes. Pour des quantités importantes (10 000+), le délai peut aller jusqu'à 72 heures pour une livraison naturelle."
      assign q4 = "Peut-on acheter des likes TikTok séparément des abonnés ?"
      assign a4 = "Oui, vous pouvez acheter des likes TikTok, des vues, des partages ou des enregistrements indépendamment, selon vos besoins."
    when 'youtube'
      assign h1 = "Acheter des abonnés YouTube — Atteignez 1 000 abonnés vite"
      assign intro = "Acheter des abonnés YouTube est la solution la plus rapide pour atteindre le seuil de monétisation YouTube (1 000 abonnés et 4 000 heures de visionnage). Vyrlo propose des abonnés YouTube stables et durables, ainsi que des vues et likes pour booster vos vidéos dans les recommandations. Livraison progressive, sans mot de passe, à partir de 8,90 €."
      assign pf_label = "YouTube"
      assign b1 = "Atteignez le seuil de monétisation YouTube (1 000 abonnés) plus vite"
      assign b2 = "Abonnés stables et durables — pas de chute après livraison"
      assign b3 = "Vues YouTube pour améliorer votre classement dans les recommandations"
      assign b4 = "Aucun accès à votre compte requis"
      assign q1 = "Les abonnés YouTube achetés restent-ils après la livraison ?"
      assign a1 = "Oui. Les abonnés Vyrlo sont stables et durables. Une légère variation est normale (comme pour toute croissance organique), mais ils ne disparaissent pas massivement."
      assign q2 = "Acheter des vues YouTube aide-t-il à monétiser ?"
      assign a2 = "Oui. Les vues YouTube comptent pour atteindre le seuil de 4 000 heures de visionnage requis pour la monétisation YouTube via le Programme Partenaires."
      assign q3 = "Peut-on acheter des abonnés YouTube sans mot de passe ?"
      assign a3 = "Absolument. Vyrlo ne demande jamais votre mot de passe YouTube ou Google. Seule l'URL de votre chaîne est nécessaire."
      assign q4 = "Combien d'abonnés YouTube peut-on acheter en une commande ?"
      assign a4 = "Vyrlo propose des offres allant de 100 à 50 000 abonnés YouTube en une seule commande. Pour des besoins plus importants, contactez notre support."
    when 'facebook'
      assign h1 = "Acheter des abonnés Facebook — Crédibilité instantanée"
      assign intro = "Une page Facebook avec peu d'abonnés inspire peu confiance. Acheter des abonnés Facebook avec Vyrlo vous permet de démarrer avec une base crédible et d'attirer naturellement plus d'interactions. Nous proposons également des likes Facebook pour vos publications. Livraison rapide, sans mot de passe, à partir de 8,90 €."
      assign pf_label = "Facebook"
      assign b1 = "Augmentez rapidement la crédibilité de votre page Facebook"
      assign b2 = "Likes Facebook disponibles pour vos publications et votre page"
      assign b3 = "Aucun accès à votre compte Facebook requis"
      assign b4 = "Idéal pour les entreprises, associations et créateurs de contenu"
      assign q1 = "Peut-on acheter des likes pour une page Facebook ?"
      assign a1 = "Oui. Vyrlo propose des likes pour votre page Facebook ainsi que pour vos publications individuelles. Les deux sont disponibles séparément."
      assign q2 = "Les abonnés Facebook achetés verront-ils mes publications ?"
      assign a2 = "Ils s'abonnent à votre page, mais la portée organique de vos publications dépend de l'algorithme Facebook. Les abonnés augmentent surtout votre crédibilité et votre preuve sociale."
      assign q3 = "Combien de temps pour recevoir des abonnés Facebook ?"
      assign a3 = "La livraison démarre en moins de 20 minutes. Elle est progressive pour respecter les limites de Facebook et éviter tout problème."
      assign q4 = "Acheter des abonnés Facebook est-il risqué pour ma page ?"
      assign a4 = "Non, si la livraison est progressive (c'est notre méthode par défaut). Vyrlo ne demande jamais vos identifiants, votre page reste entièrement sécurisée."
    when 'twitter'
      assign h1 = "Acheter des followers Twitter X — Influencez plus vite"
      assign intro = "Sur X (Twitter), la taille de votre audience détermine votre influence. Acheter des followers Twitter avec Vyrlo est le moyen le plus rapide d'asseoir votre crédibilité sur le réseau. Nous proposons également des likes et des retweets pour amplifier la portée de vos tweets. Livraison en moins de 20 minutes, aucun mot de passe."
      assign pf_label = "Twitter / X"
      assign b1 = "Followers Twitter actifs — livraison progressive et naturelle"
      assign b2 = "Likes et retweets disponibles pour augmenter la portée de vos tweets"
      assign b3 = "Sans mot de passe — juste votre nom d'utilisateur X"
      assign b4 = "Boostez votre crédibilité et votre taux d'engagement sur X"
      assign q1 = "Acheter des followers X (Twitter) est-il sûr en 2026 ?"
      assign a1 = "Oui, à condition d'utiliser un service qui livre progressivement comme Vyrlo. Une livraison brutale peut être détectée par X. Notre méthode progressive ne présente aucun risque."
      assign q2 = "Les retweets achetés améliorent-ils la visibilité sur X ?"
      assign a2 = "Oui. Plus un tweet est retweeté, plus X l'affiche à de nouveaux utilisateurs. Acheter des retweets booste directement la portée organique de vos publications."
      assign q3 = "Peut-on acheter des followers pour un compte X privé ?"
      assign a3 = "Non. Votre compte doit être public pour que les followers puissent vous rejoindre. Pensez à rendre votre compte public le temps de la livraison."
      assign q4 = "Combien coûte l'achat de followers Twitter sur Vyrlo ?"
      assign a4 = "Les offres démarrent à partir de 8,90 € pour les premiers followers Twitter. Vyrlo propose plusieurs paliers selon vos besoins et votre budget."
    when 'spotify'
      assign h1 = "Acheter des streams Spotify — Déclenchez les playlists"
      assign intro = "L'algorithme Spotify récompense les titres avec un fort taux d'écoute. Acheter des streams Spotify avec Vyrlo vous aide à atteindre le seuil nécessaire pour être intégré dans les playlists algorithmiques comme Découvertes de la semaine ou Radio d'artiste. Boostez vos auditeurs mensuels Spotify sans risque, à partir de 8,90 €."
      assign pf_label = "Spotify"
      assign b1 = "Augmentez vos auditeurs mensuels Spotify rapidement"
      assign b2 = "Déclenchez les playlists algorithmiques Spotify (Découvertes, Radio)"
      assign b3 = "Service discret conçu pour les artistes indépendants"
      assign b4 = "Aucun accès à votre compte Spotify requis"
      assign q1 = "Acheter des streams Spotify est-il détectable ?"
      assign a1 = "Non, si les streams sont livrés progressivement comme chez Vyrlo. Nous imitons un comportement d'écoute naturel pour ne pas déclencher les filtres Spotify."
      assign q2 = "Les streams Spotify achetés comptent-ils pour les royalties ?"
      assign a2 = "Non. Les streams artificiels ne génèrent pas de royalties Spotify. Leur but est exclusivement d'améliorer vos statistiques et de déclencher l'algorithme."
      assign q3 = "Combien de streams faut-il pour intégrer une playlist Spotify ?"
      assign a3 = "Il n'y a pas de seuil officiel, mais en général les titres avec plus de 1 000 auditeurs mensuels actifs commencent à être recommandés. Vyrlo peut vous aider à atteindre ce cap."
      assign q4 = "Peut-on acheter des auditeurs mensuels Spotify séparément ?"
      assign a4 = "Oui. Vyrlo propose des streams (par titre) et des auditeurs mensuels séparément. Les auditeurs mensuels ont un impact direct sur votre classement d'artiste Spotify."
    else
      assign h1 = "Acheter des services pour vos réseaux sociaux — Livraison rapide"
      assign intro = "Vyrlo vous propose des services de croissance pour toutes les grandes plateformes : Instagram, TikTok, YouTube, Facebook, Twitter et Spotify. Livraison progressive, sans mot de passe, support 7j/7."
      assign pf_label = "Vyrlo"
      assign b1 = "Livraison progressive et naturelle"
      assign b2 = "Sans mot de passe — juste votre lien public"
      assign b3 = "Support 7j/7 en français"
      assign b4 = "Remboursement garanti si non livré"
      assign q1 = "Comment passer commande ?"
      assign a1 = "Choisissez votre plateforme, la quantité, entrez le lien public et payez. C'est tout."
      assign q2 = "Quel délai de livraison ?"
      assign a2 = "Démarrage sous 20 minutes. Livraison complète en quelques heures à 72h selon la quantité."
      assign q3 = "Est-ce sécurisé ?"
      assign a3 = "Oui. Aucun mot de passe requis, paiement via Shopify Payments sécurisé."
      assign q4 = "Et si ça ne marche pas ?"
      assign a4 = "Contactez le support. On corrige ou on rembourse."
  endcase
-%}

{% style %}
  .vyrlo-pseo-{{ section.id }} { padding: 72px 16px; background: {{ section.settings.bg | default: '#0a0a14' }}; color: #fff; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-pseo-{{ section.id }} .pseo-wrap { max-width: 860px; margin: 0 auto; }
  .vyrlo-pseo-{{ section.id }} .pseo-h1 {
    font-size: clamp(26px, 4vw, 44px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.12; margin: 0 0 24px; color: #fff;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-intro {
    font-size: 15px; color: rgba(255,255,255,0.72); line-height: 1.85; margin: 0 0 48px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-h2 {
    font-size: clamp(20px, 2.5vw, 28px); font-weight: 800;
    letter-spacing: -0.025em; margin: 0 0 22px; color: #fff;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-benefits {
    list-style: none; margin: 0 0 52px; padding: 0;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-benefits li {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 14px 0; font-size: 15px; color: rgba(255,255,255,0.9); line-height: 1.55;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-check {
    flex-shrink: 0; width: 22px; height: 22px; display: inline-flex;
    align-items: center; justify-content: center;
    color: #a78bfa; font-weight: 800; font-size: 18px; margin-top: 2px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-faq-item {
    border-left: 3px solid #7c3aed;
    padding: 4px 0 4px 20px; margin-bottom: 26px;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-q {
    font-size: 16px; font-weight: 700; color: #fff;
    margin: 0 0 10px; letter-spacing: -0.01em;
  }
  .vyrlo-pseo-{{ section.id }} .pseo-a {
    font-size: 14.5px; color: rgba(255,255,255,0.7);
    line-height: 1.75; margin: 0;
  }
{% endstyle %}

<section class="vyrlo-pseo-{{ section.id }}">
  <div class="pseo-wrap">
    <h2 class="pseo-h1">{{ h1 }}</h2>
    <p class="pseo-intro">{{ intro }}</p>

    <h2 class="pseo-h2">Pourquoi acheter des followers, likes, vues, commentaires {{ pf_label }} sur Vyrlo ?</h2>
    <ul class="pseo-benefits">
      <li><span class="pseo-check">✓</span><span>{{ b1 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b2 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b3 }}</span></li>
      <li><span class="pseo-check">✓</span><span>{{ b4 }}</span></li>
    </ul>

    <h2 class="pseo-h2">Questions fréquentes — {{ pf_label }}</h2>
    <div class="pseo-faq-item">
      <p class="pseo-q">{{ q1 }}</p>
      <p class="pseo-a">{{ a1 }}</p>
    </div>
    <div class="pseo-faq-item">
      <p class="pseo-q">{{ q2 }}</p>
      <p class="pseo-a">{{ a2 }}</p>
    </div>
    <div class="pseo-faq-item">
      <p class="pseo-q">{{ q3 }}</p>
      <p class="pseo-a">{{ a3 }}</p>
    </div>
    <div class="pseo-faq-item">
      <p class="pseo-q">{{ q4 }}</p>
      <p class="pseo-a">{{ a4 }}</p>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · SEO plateforme",
  "tag": "section",
  "class": "section-vyrlo-pseo",
  "settings": [
    { "type": "color", "id": "bg", "label": "Fond", "default": "#0a0a14" }
  ],
  "presets": [{ "name": "Vyrlo · SEO plateforme", "category": "Vyrlo" }]
}
{% endschema %}
`;
