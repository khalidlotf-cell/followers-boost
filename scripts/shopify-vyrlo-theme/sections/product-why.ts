export const SECTION = String.raw`{% comment %}
  Vyrlo Product Why — "Pourquoi acheter des X ?" avec texte + 4 benefits
  Contenu switché automatiquement selon le handle du produit (abonnes/likes/vues/etc.)
{% endcomment %}

{%- liquid
  assign platform = ''
  for tag in product.tags
    case tag
      when 'instagram','tiktok','youtube','facebook','twitter','spotify'
        assign platform = tag
    endcase
  endfor
  assign platform_label = 'Instagram'
  case platform
    when 'instagram' then assign platform_label = 'Instagram'
    when 'tiktok'    then assign platform_label = 'TikTok'
    when 'youtube'   then assign platform_label = 'YouTube'
    when 'facebook'  then assign platform_label = 'Facebook'
    when 'twitter'   then assign platform_label = 'Twitter'
    when 'spotify'   then assign platform_label = 'Spotify'
  endcase

  assign group = 'abonnes'
  assign group_label = 'abonnés'
  if product.handle contains 'like'
    assign group = 'likes'
    assign group_label = 'likes'
  elsif product.handle contains 'vue' or product.handle contains 'reel'
    assign group = 'vues'
    assign group_label = 'vues'
  elsif product.handle contains 'commentaire'
    assign group = 'commentaires'
    assign group_label = 'commentaires'
  elsif product.handle contains 'partage'
    assign group = 'partages'
    assign group_label = 'partages'
  elsif product.handle contains 'enregistrement'
    assign group = 'enregistrements'
    assign group_label = 'enregistrements'
  elsif product.handle contains 'retweet'
    assign group = 'retweets'
    assign group_label = 'retweets'
  elsif product.handle contains 'auditeur'
    assign group = 'auditeurs'
    assign group_label = 'auditeurs'
  endif

  case group
    when 'abonnes'
      assign why = "L'algorithme récompense les comptes qui grossissent vite. Quand votre compteur monte, de vraies personnes suivent. Personne ne veut s'abonner à un compte que personne ne suit. C'est la preuve sociale : simple, efficace, et utilisée par des milliers de créateurs chaque mois."
      assign b1_icon = '📈'
      assign b1_title = 'Livraison progressive'
      assign b1_desc = "Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser."
      assign b2_icon = '🎯'
      assign b2_title = 'Profils ciblés'
      assign b2_desc = "Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu."
      assign b3_icon = '🔄'
      assign b3_title = 'Refill automatique'
      assign b3_desc = 'Un drop ? Le Refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées.'
      assign b4_icon = '⚡'
      assign b4_title = 'Démarrage en quelques heures'
      assign b4_desc = "Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures."
    when 'likes'
      assign why = "Un post sans likes, ça reste dans l'ombre. L'algorithme ne pousse pas le contenu qu'il ne voit pas performer. Ajouter des likes au bon moment, c'est donner à votre post la fenêtre de visibilité dont il a besoin pour que les gens réels prennent le relais."
      assign b1_icon = '⏱️'
      assign b1_title = 'Timing parfait'
      assign b1_desc = "Commandez juste après votre publication pour maximiser l'effet sur l'algorithme dans la fenêtre critique des 30 premières minutes."
      assign b2_icon = '📊'
      assign b2_title = "Taux d'engagement boosté"
      assign b2_desc = 'Plus de likes = meilleur taux = plus de reach organique sur vos prochaines publications.'
      assign b3_icon = '👁️'
      assign b3_title = 'Explorer & Tendances'
      assign b3_desc = "Les posts avec un fort engagement initial apparaissent sur les pages de découverte."
      assign b4_icon = '🔄'
      assign b4_title = 'Livraison naturelle'
      assign b4_desc = 'Les likes arrivent progressivement sur plusieurs minutes. Aucun pic suspect.'
    when 'vues'
      assign why = "Les plateformes mesurent en temps réel le ratio vues/abonnés. Un contenu qui performe vite est immédiatement recommandé à d'autres utilisateurs. Acheter des vues, c'est passer ce premier filtre et laisser l'algorithme faire le reste."
      assign b1_icon = '🚀'
      assign b1_title = 'Effet de levier algorithme'
      assign b1_desc = "Un bon compteur de vues déclenche les recommandations automatiques. Plus de vues achetées = plus de vues organiques derrière."
      assign b2_icon = '💰'
      assign b2_title = 'Monétisation plus rapide'
      assign b2_desc = 'Sur YouTube, TikTok ou Spotify, les seuils se franchissent bien plus vite avec un coup de pouce initial.'
      assign b3_icon = '🔢'
      assign b3_title = 'Preuve sociale visible'
      assign b3_desc = "100 000 vues sur une vidéo, ça convainc un inconnu de cliquer. 200 vues, beaucoup moins."
      assign b4_icon = '📅'
      assign b4_title = 'Idéal pour les vieux contenus'
      assign b4_desc = "Vous avez une vidéo qui méritait mieux ? Boostez-la maintenant pour lui redonner sa chance."
    when 'commentaires'
      assign why = "Un like prend une seconde, un commentaire prend 10 secondes. L'algorithme le sait et valorise bien plus l'engagement commentaire. Une publication avec des commentaires actifs est traitée comme du contenu populaire et poussée en conséquence."
      assign b1_icon = '🏆'
      assign b1_title = 'Engagement de qualité'
      assign b1_desc = "Les commentaires pèsent 3 à 5× plus que les likes dans les algorithmes Instagram et TikTok."
      assign b2_icon = '👥'
      assign b2_title = 'Effet communauté'
      assign b2_desc = "Un post avec des commentaires donne l'impression d'une vraie discussion. Les visiteurs rejoignent naturellement l'échange."
      assign b3_icon = '📌'
      assign b3_title = 'Permanents et réels'
      assign b3_desc = 'Les commentaires restent sur votre publication. Aucune expiration.'
      assign b4_icon = '🇫🇷'
      assign b4_title = 'Option commentaires FR'
      assign b4_desc = 'Des commentaires rédigés en français pour une cohérence totale avec votre audience.'
    else
      assign why = "Un service rapide, discret et efficace. Pas de compte à créer, pas de mot de passe à donner. Juste votre lien et un paiement sécurisé."
      assign b1_icon = '⚡'
      assign b1_title = 'Démarrage rapide'
      assign b1_desc = "La commande est traitée dès validation du paiement. Pas d'attente inutile."
      assign b2_icon = '🔒'
      assign b2_title = 'Zéro accès compte'
      assign b2_desc = "On n'a jamais besoin de votre mot de passe. Juste un lien public suffit."
      assign b3_icon = '✓'
      assign b3_title = 'Sans inscription'
      assign b3_desc = 'Pas besoin de créer un compte. Commandez directement.'
      assign b4_icon = '💬'
      assign b4_title = 'Support 7j/7'
      assign b4_desc = 'Une question ? Un problème ? On répond vite, en français.'
  endcase
-%}

{% style %}
  .vyrlo-why-{{ section.id }} { padding: 64px 16px; background: {{ section.settings.bg | default: '#f8fafc' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-why-{{ section.id }} .vw-wrap { max-width: 680px; margin: 0 auto; }
  .vyrlo-why-{{ section.id }} .vw-h2 { font-size: clamp(22px, 3vw, 30px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 16px; line-height: 1.2; }
  .vyrlo-why-{{ section.id }} .vw-p { font-size: 15px; color: #475569; line-height: 1.75; margin: 0 0 32px; }
  .vyrlo-why-{{ section.id }} .vw-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
  .vyrlo-why-{{ section.id }} .vw-item { display: grid; grid-template-columns: 56px 1fr; gap: 18px; padding: 22px 24px; border-bottom: 1px solid #f1f5f9; align-items: start; }
  .vyrlo-why-{{ section.id }} .vw-item:last-child { border-bottom: none; }
  .vyrlo-why-{{ section.id }} .vw-icon {
    width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center;
    font-size: 24px;
  }
  .vyrlo-why-{{ section.id }} .vw-item:nth-child(1) .vw-icon { background: #fef3c7; }
  .vyrlo-why-{{ section.id }} .vw-item:nth-child(2) .vw-icon { background: #fce7f3; }
  .vyrlo-why-{{ section.id }} .vw-item:nth-child(3) .vw-icon { background: #dbeafe; }
  .vyrlo-why-{{ section.id }} .vw-item:nth-child(4) .vw-icon { background: #fef3c7; }
  .vyrlo-why-{{ section.id }} .vw-title { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0 0 6px; letter-spacing: -0.01em; }
  .vyrlo-why-{{ section.id }} .vw-desc { font-size: 14px; color: #64748b; line-height: 1.65; margin: 0; }
{% endstyle %}

<section class="vyrlo-why-{{ section.id }}">
  <div class="vw-wrap">
    <h2 class="vw-h2">Pourquoi acheter des {{ group_label }} {{ platform_label }} ?</h2>
    <p class="vw-p">{{ why }}</p>
    <div class="vw-card">
      <div class="vw-item">
        <div class="vw-icon">{{ b1_icon }}</div>
        <div><p class="vw-title">{{ b1_title }}</p><p class="vw-desc">{{ b1_desc }}</p></div>
      </div>
      <div class="vw-item">
        <div class="vw-icon">{{ b2_icon }}</div>
        <div><p class="vw-title">{{ b2_title }}</p><p class="vw-desc">{{ b2_desc }}</p></div>
      </div>
      <div class="vw-item">
        <div class="vw-icon">{{ b3_icon }}</div>
        <div><p class="vw-title">{{ b3_title }}</p><p class="vw-desc">{{ b3_desc }}</p></div>
      </div>
      <div class="vw-item">
        <div class="vw-icon">{{ b4_icon }}</div>
        <div><p class="vw-title">{{ b4_title }}</p><p class="vw-desc">{{ b4_desc }}</p></div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · Pourquoi acheter",
  "tag": "section",
  "class": "section-vyrlo-why",
  "settings": [
    { "type": "color", "id": "bg", "label": "Fond", "default": "#f8fafc" }
  ],
  "presets": [{ "name": "Vyrlo · Pourquoi acheter", "category": "Vyrlo" }]
}
{% endschema %}
`;
