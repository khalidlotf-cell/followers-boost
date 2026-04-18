export const SECTION = String.raw`{% comment %}
  Vyrlo Product FAQ — FAQ spécifique au groupe du produit (abonnes/likes/vues/etc.)
{% endcomment %}

{%- liquid
  assign group = 'abonnes'
  if product.handle contains 'like'
    assign group = 'likes'
  elsif product.handle contains 'vue' or product.handle contains 'reel'
    assign group = 'vues'
  elsif product.handle contains 'commentaire'
    assign group = 'commentaires'
  elsif product.handle contains 'partage'
    assign group = 'partages'
  elsif product.handle contains 'enregistrement'
    assign group = 'enregistrements'
  elsif product.handle contains 'retweet'
    assign group = 'retweets'
  elsif product.handle contains 'auditeur'
    assign group = 'auditeurs'
  endif

  case group
    when 'abonnes'
      assign q1 = "Est-ce que ça peut bloquer mon compte ?"
      assign a1 = "Non. On travaille uniquement avec des profils de qualité, livrés progressivement. Pas de comportement suspect, pas de risque."
      assign q2 = "Combien de temps durent les abonnés ?"
      assign a2 = "La plupart restent indéfiniment. Quelques drops sont normaux sur n'importe quel compte, c'est pour ça qu'on propose le Refill sur certains services."
      assign q3 = "Mon profil doit-il être public ?"
      assign a3 = "Oui, pendant toute la durée de la livraison. Une fois terminée, vous pouvez repasser en privé si vous le souhaitez."
      assign q4 = "Et si je ne suis pas satisfait ?"
      assign a4 = "Contactez le support avec votre numéro de commande. On vérifie et on arrange ça : refill ou remboursement selon la situation."
      assign q5 = "C'est quoi la différence entre Monde et Français ?"
      assign a5 = "Le ciblage Monde envoie des profils internationaux. Le ciblage Français envoie des profils Français qui comprennent et interagissent avec votre contenu local."
    when 'likes'
      assign q1 = "Combien de temps mettent les likes à arriver ?"
      assign a1 = "Selon l'offre choisie, entre quelques minutes et quelques heures. L'express démarre en moins de 30 min."
      assign q2 = "Les likes partent-ils après un moment ?"
      assign a2 = "Rarement. Dans les cas où des drops surviennent, les offres avec Refill compensent automatiquement."
      assign q3 = "Ça marche pour les Reels aussi ?"
      assign a3 = "Oui. Le lien de votre Reel suffit. Copiez l'URL directement depuis l'application."
      assign q4 = "Puis-je commander pour plusieurs posts ?"
      assign a4 = "Oui, une commande par post. Entrez le lien de chaque publication séparément."
      assign q5 = "Mon compte peut-il être pénalisé ?"
      assign a5 = "Non. Les likes arrivent progressivement depuis des profils actifs. Aucun comportement qui sort de l'ordinaire."
    when 'vues'
      assign q1 = "Les vues restent-elles définitivement ?"
      assign a1 = "Oui. Une fois comptabilisées, elles ne disparaissent pas."
      assign q2 = "Ça fonctionne pour YouTube Shorts et TikTok ?"
      assign a2 = "Oui, précisez simplement le lien de la vidéo ou du Short concerné."
      assign q3 = "La vitesse d'arrivée est-elle contrôlable ?"
      assign a3 = "Chaque service a sa propre vitesse. Consultez les détails dans la description ou contactez le support pour une offre sur-mesure."
      assign q4 = "Est-ce que ça aide vraiment pour la monétisation ?"
      assign a4 = "Ça dépend de la plateforme. Nos vues sont de qualité mais on recommande de combiner avec de la croissance organique pour la monétisation long terme."
      assign q5 = "Puis-je commander pour une vieille vidéo ?"
      assign a5 = "Oui, totalement. C'est même une bonne stratégie pour redonner une chance à un contenu qui n'a pas décollé."
    when 'commentaires'
      assign q1 = "Les commentaires sont-ils en français ?"
      assign a1 = "Ça dépend du service sélectionné. Certains proposent du français, d'autres sont internationaux. Regardez la description de l'offre."
      assign q2 = "Peut-on personnaliser les commentaires ?"
      assign a2 = "Sur certaines offres, oui. Mentionnez-le dans le champ lien ou contactez le support avant de passer commande."
      assign q3 = "Les commentaires peuvent-ils être supprimés par la plateforme ?"
      assign a3 = "Dans de rares cas, oui. C'est pour ça qu'on recommande les offres avec Refill pour ce type de service."
      assign q4 = "Ça marche sur les Reels et TikToks ?"
      assign a4 = "Oui. Collez le lien direct vers votre vidéo ou publication et la livraison démarre normalement."
      assign q5 = "Combien de commentaires pour un effet visible ?"
      assign a5 = "Dès 10-20 commentaires bien placés, l'algorithme commence à pousser le post. 50+ pour un effet fort."
    else
      assign q1 = "Je dois créer un compte pour commander ?"
      assign a1 = "Non. Entrez juste votre lien et payez par carte. Vous recevrez une confirmation par email."
      assign q2 = "Combien de temps avant que ça démarre ?"
      assign a2 = "Entre quelques minutes et quelques heures selon le service. La plupart démarrent dans l'heure."
      assign q3 = "Et si ça ne fonctionne pas ?"
      assign a3 = "Contactez le support avec votre numéro de commande. On vérifie et on arrange ça."
      assign q4 = "Mon compte est-il en sécurité ?"
      assign a4 = "Oui. On ne demande jamais votre mot de passe. On ne peut pas accéder à votre compte."
      assign q5 = "Comment suivre ma commande ?"
      assign a5 = "Un email de confirmation est envoyé après paiement avec les détails. Le suivi est également accessible depuis votre espace client."
  endcase
-%}

{% style %}
  .vyrlo-pfaq-{{ section.id }} { padding: 64px 16px; background: {{ section.settings.bg | default: '#ffffff' }}; font-family: Inter, system-ui, sans-serif; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-wrap { max-width: 680px; margin: 0 auto; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-h2 { font-size: clamp(22px, 3vw, 30px); font-weight: 800; color: #0a0a0a; letter-spacing: -0.025em; margin: 0 0 28px; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-item { border-bottom: 1px solid #f1f5f9; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-item:last-child { border-bottom: none; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-item[open] { background: #fafbff; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-q { list-style: none; cursor: pointer; padding: 20px 22px; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-weight: 600; font-size: 15px; color: #0f172a; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-q::-webkit-details-marker { display: none; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-q::after { content: "+"; flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: #f1f5f9; display: inline-flex; align-items: center; justify-content: center; color: #64748b; font-size: 16px; font-weight: 600; transition: all 0.2s; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-item[open] .pfaq-q::after { content: "−"; background: #7c3aed; color: #fff; }
  .vyrlo-pfaq-{{ section.id }} .pfaq-a { padding: 0 22px 20px; color: #64748b; font-size: 14px; line-height: 1.75; margin: 0; }
{% endstyle %}

<section class="vyrlo-pfaq-{{ section.id }}">
  <div class="pfaq-wrap">
    <h2 class="pfaq-h2">{{ section.settings.title | default: 'Questions fréquentes' }}</h2>
    <div class="pfaq-card">
      <details class="pfaq-item"><summary class="pfaq-q">{{ q1 }}</summary><p class="pfaq-a">{{ a1 }}</p></details>
      <details class="pfaq-item"><summary class="pfaq-q">{{ q2 }}</summary><p class="pfaq-a">{{ a2 }}</p></details>
      <details class="pfaq-item"><summary class="pfaq-q">{{ q3 }}</summary><p class="pfaq-a">{{ a3 }}</p></details>
      <details class="pfaq-item"><summary class="pfaq-q">{{ q4 }}</summary><p class="pfaq-a">{{ a4 }}</p></details>
      <details class="pfaq-item"><summary class="pfaq-q">{{ q5 }}</summary><p class="pfaq-a">{{ a5 }}</p></details>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Vyrlo · FAQ produit",
  "tag": "section",
  "class": "section-vyrlo-pfaq",
  "settings": [
    { "type": "text", "id": "title", "label": "Titre", "default": "Questions fréquentes" },
    { "type": "color", "id": "bg", "label": "Fond", "default": "#ffffff" }
  ],
  "presets": [{ "name": "Vyrlo · FAQ produit", "category": "Vyrlo" }]
}
{% endschema %}
`;
