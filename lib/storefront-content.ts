// Contenu SEO/marketing extrait de app/boutique/[platform] pour être réutilisé
// par le script de migration Shopify (pages collection + produit).

export interface PlatformSeo {
  label: string;
  h1: string;
  intro: string;
  benefits: string[];
  faq: { q: string; a: string }[];
}

export interface GroupSeo {
  desc: string;
  badges: string[];
  why: string;
  benefits: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const PLATFORM_SEO: Record<string, PlatformSeo> = {
  instagram: {
    label: "Instagram",
    h1: "Acheter des followers Instagram — Livraison en 20 min",
    intro: "Vous cherchez à acheter des abonnés Instagram rapidement et en toute sécurité ? Vyrlo vous propose des followers Instagram de qualité, livrés progressivement pour ne pas alerter l'algorithme. Aucun mot de passe requis, livraison démarrant en moins de 20 minutes. Boostez votre crédibilité sur Instagram dès aujourd'hui à partir de 8,90 €.",
    benefits: [
      "Livraison progressive et naturelle — aucun risque de bannissement",
      "Zéro mot de passe requis — seulement votre lien public",
      "Ciblage France disponible pour des abonnés Instagram français",
      "Support 7j/7 et remboursement garanti si non livré",
    ],
    faq: [
      { q: "Est-il légal d'acheter des followers Instagram en France ?", a: "Oui, acheter des followers Instagram est légal en France. Cela reste une pratique courante pour booster la visibilité d'un compte. Vyrlo livre des abonnés de manière progressive et discrète." },
      { q: "Mon compte Instagram risque-t-il d'être banni ?", a: "Non. Vyrlo utilise une livraison progressive qui imite une croissance naturelle. Nous ne demandons jamais votre mot de passe. Le risque de bannissement est inexistant avec notre méthode." },
      { q: "Combien de temps pour recevoir mes followers Instagram ?", a: "La livraison démarre en moins de 20 minutes après votre commande. Selon la quantité, la livraison complète prend entre quelques heures et 72 heures." },
      { q: "Puis-je acheter des followers Instagram français ?", a: "Oui, Vyrlo propose un ciblage Français pour vous fournir des abonnés Instagram Français. Sélectionnez l'option ciblage Français lors de votre commande." },
    ],
  },
  tiktok: {
    label: "TikTok",
    h1: "Acheter des abonnés TikTok — Boost garanti dès 8,90 €",
    intro: "Vous souhaitez acheter des abonnés TikTok pour déclencher l'algorithme et gagner en visibilité ? Vyrlo propose des followers TikTok livrés naturellement pour ne pas alerter TikTok. Une commande de likes ou de vues TikTok peut suffire à propulser votre vidéo sur la page Pour Toi. Résultats garantis, à partir de 8,90 €.",
    benefits: [
      "Livraison progressive adaptée à l'algorithme TikTok",
      "Followers, likes et vues disponibles en quelques clics",
      "Aucun accès à votre compte — juste votre nom d'utilisateur",
      "Idéal pour booster une vidéo vers la page Pour Toi (FYP)",
    ],
    faq: [
      { q: "Acheter des abonnés TikTok est-il sans risque ?", a: "Oui. Vyrlo livre les abonnés TikTok progressivement, ce qui respecte les conditions d'utilisation de TikTok. Aucun mot de passe n'est demandé." },
      { q: "Est-ce que les vues TikTok achetées comptent pour l'algorithme ?", a: "Oui. Des vues supplémentaires augmentent le taux d'engagement de votre vidéo, ce qui favorise sa distribution par l'algorithme TikTok sur la page Pour Toi." },
      { q: "Quel est le délai de livraison pour des abonnés TikTok ?", a: "La livraison démarre en moins de 20 minutes. Pour des quantités importantes (10 000+), le délai peut aller jusqu'à 72 heures pour une livraison naturelle." },
      { q: "Peut-on acheter des likes TikTok séparément des abonnés ?", a: "Oui, vous pouvez acheter des likes TikTok, des vues, des partages ou des enregistrements indépendamment, selon vos besoins." },
    ],
  },
  youtube: {
    label: "YouTube",
    h1: "Acheter des abonnés YouTube — Atteignez 1 000 abonnés vite",
    intro: "Acheter des abonnés YouTube est la solution la plus rapide pour atteindre le seuil de monétisation YouTube (1 000 abonnés et 4 000 heures de visionnage). Vyrlo propose des abonnés YouTube stables et durables, ainsi que des vues et likes pour booster vos vidéos dans les recommandations. Livraison progressive, sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Atteignez le seuil de monétisation YouTube (1 000 abonnés) plus vite",
      "Abonnés stables et durables — pas de chute après livraison",
      "Vues YouTube pour améliorer votre classement dans les recommandations",
      "Aucun accès à votre compte requis",
    ],
    faq: [
      { q: "Les abonnés YouTube achetés restent-ils après la livraison ?", a: "Oui. Les abonnés Vyrlo sont stables et durables. Une légère variation est normale (comme pour toute croissance organique), mais ils ne disparaissent pas massivement." },
      { q: "Acheter des vues YouTube aide-t-il à monétiser ?", a: "Oui. Les vues YouTube comptent pour atteindre le seuil de 4 000 heures de visionnage requis pour la monétisation YouTube via le Programme Partenaires." },
      { q: "Peut-on acheter des abonnés YouTube sans mot de passe ?", a: "Absolument. Vyrlo ne demande jamais votre mot de passe YouTube ou Google. Seule l'URL de votre chaîne est nécessaire." },
      { q: "Combien d'abonnés YouTube peut-on acheter en une commande ?", a: "Vyrlo propose des offres allant de 100 à 50 000 abonnés YouTube en une seule commande. Pour des besoins plus importants, contactez notre support." },
    ],
  },
  facebook: {
    label: "Facebook",
    h1: "Acheter des abonnés Facebook — Crédibilité instantanée",
    intro: "Une page Facebook avec peu d'abonnés inspire peu confiance. Acheter des abonnés Facebook avec Vyrlo vous permet de démarrer avec une base crédible et d'attirer naturellement plus d'interactions. Nous proposons également des likes Facebook pour vos publications. Livraison rapide, sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Augmentez rapidement la crédibilité de votre page Facebook",
      "Likes Facebook disponibles pour vos publications et votre page",
      "Aucun accès à votre compte Facebook requis",
      "Idéal pour les entreprises, associations et créateurs de contenu",
    ],
    faq: [
      { q: "Peut-on acheter des likes pour une page Facebook ?", a: "Oui. Vyrlo propose des likes pour votre page Facebook ainsi que pour vos publications individuelles. Les deux sont disponibles séparément." },
      { q: "Les abonnés Facebook achetés verront-ils mes publications ?", a: "Ils s'abonnent à votre page, mais la portée organique de vos publications dépend de l'algorithme Facebook. Les abonnés augmentent surtout votre crédibilité et votre preuve sociale." },
      { q: "Combien de temps pour recevoir des abonnés Facebook ?", a: "La livraison démarre en moins de 20 minutes. Elle est progressive pour respecter les limites de Facebook et éviter tout problème." },
      { q: "Acheter des abonnés Facebook est-il risqué pour ma page ?", a: "Non, si la livraison est progressive (c'est notre méthode par défaut). Vyrlo ne demande jamais vos identifiants, votre page reste entièrement sécurisée." },
    ],
  },
  twitter: {
    label: "X / Twitter",
    h1: "Acheter des followers Twitter X — Influencez plus vite",
    intro: "Sur X (Twitter), la taille de votre audience détermine votre influence. Acheter des followers Twitter avec Vyrlo est le moyen le plus rapide d'asseoir votre crédibilité sur le réseau. Nous proposons également des likes et des retweets pour amplifier la portée de vos tweets. Livraison en moins de 20 minutes, aucun mot de passe.",
    benefits: [
      "Followers Twitter actifs — livraison progressive et naturelle",
      "Likes et retweets disponibles pour augmenter la portée de vos tweets",
      "Sans mot de passe — juste votre nom d'utilisateur X",
      "Boostez votre crédibilité et votre taux d'engagement sur X",
    ],
    faq: [
      { q: "Acheter des followers X (Twitter) est-il sûr en 2026 ?", a: "Oui, à condition d'utiliser un service qui livre progressivement comme Vyrlo. Une livraison brutale peut être détectée par X. Notre méthode progressive ne présente aucun risque." },
      { q: "Les retweets achetés améliorent-ils la visibilité sur X ?", a: "Oui. Plus un tweet est retweeté, plus X l'affiche à de nouveaux utilisateurs. Acheter des retweets booste directement la portée organique de vos publications." },
      { q: "Peut-on acheter des followers pour un compte X privé ?", a: "Non. Votre compte doit être public pour que les followers puissent vous rejoindre. Pensez à rendre votre compte public le temps de la livraison." },
      { q: "Combien coûte l'achat de followers Twitter sur Vyrlo ?", a: "Les offres démarrent à partir de 8,90 € pour les premiers followers Twitter. Vyrlo propose plusieurs paliers selon vos besoins et votre budget." },
    ],
  },
  spotify: {
    label: "Spotify",
    h1: "Acheter des streams Spotify — Déclenchez les playlists",
    intro: "L'algorithme Spotify récompense les titres avec un fort taux d'écoute. Acheter des streams Spotify avec Vyrlo vous aide à atteindre le seuil nécessaire pour être intégré dans les playlists algorithmiques comme Découvertes de la semaine ou Radio d'artiste. Boostez vos auditeurs mensuels Spotify sans risque, à partir de 8,90 €.",
    benefits: [
      "Augmentez vos auditeurs mensuels Spotify rapidement",
      "Déclenchez les playlists algorithmiques Spotify (Découvertes, Radio)",
      "Service discret conçu pour les artistes indépendants",
      "Aucun accès à votre compte Spotify requis",
    ],
    faq: [
      { q: "Acheter des streams Spotify est-il détectable ?", a: "Non, si les streams sont livrés progressivement comme chez Vyrlo. Nous imitons un comportement d'écoute naturel pour ne pas déclencher les filtres Spotify." },
      { q: "Les streams Spotify achetés comptent-ils pour les royalties ?", a: "Non. Les streams artificiels ne génèrent pas de royalties Spotify. Leur but est exclusivement d'améliorer vos statistiques et de déclencher l'algorithme." },
      { q: "Combien de streams faut-il pour intégrer une playlist Spotify ?", a: "Il n'y a pas de seuil officiel, mais en général les titres avec plus de 1 000 auditeurs mensuels actifs commencent à être recommandés. Vyrlo peut vous aider à atteindre ce cap." },
      { q: "Peut-on acheter des auditeurs mensuels Spotify séparément ?", a: "Oui. Vyrlo propose des streams (par titre) et des auditeurs mensuels séparément. Les auditeurs mensuels ont un impact direct sur votre classement d'artiste Spotify." },
    ],
  },
  threads: {
    label: "Threads",
    h1: "Acheter des followers Threads — Présence Meta solide",
    intro: "Threads, le réseau social de Meta, est en pleine croissance. Acheter des followers Threads maintenant vous permet de bâtir une présence crédible avant que la concurrence ne s'installe. Vyrlo propose des abonnés et des likes Threads livrés rapidement et sans mot de passe, à partir de 8,90 €.",
    benefits: [
      "Bâtissez une présence Threads crédible dès maintenant",
      "Followers et likes Threads livrés rapidement",
      "Aucun mot de passe requis — votre compte reste sécurisé",
      "Profitez de la croissance rapide de Threads avant vos concurrents",
    ],
    faq: [
      { q: "Threads est-il lié à Instagram pour l'achat de followers ?", a: "Non. Threads et Instagram ont des audiences séparées. Acheter des followers Threads n'affecte pas votre compte Instagram, et vice versa." },
      { q: "Pourquoi acheter des followers Threads maintenant ?", a: "Threads est encore en phase de croissance. S'y positionner maintenant avec une audience solide vous donne un avantage compétitif fort avant la saturation du réseau." },
      { q: "Les followers Threads achetés sont-ils des vrais comptes ?", a: "Vyrlo propose des profils de haute qualité pour Threads. La qualité des comptes est précisée dans chaque offre avant votre achat." },
      { q: "Combien de temps prend la livraison de followers Threads ?", a: "La livraison démarre en moins de 20 minutes. Elle est progressive pour respecter les limites de Meta et garantir la sécurité de votre compte Threads." },
    ],
  },
};

export const GROUP_SEO: Record<string, GroupSeo> = {
  abonnes: {
    desc: "Pas de bots, pas de comptes vides. Des profils actifs qui renforcent votre crédibilité et déclenchent l'algorithme. Le ciblage France vous assure une audience qui comprend votre contenu et qui s'engage.",
    badges: ["✓ Zéro bot", "🇫🇷 Ciblage FR dispo", "↻ Refill inclus", "📞 SAV réactif"],
    why: "L'algorithme récompense les comptes qui grossissent vite. Quand votre compteur monte, de vraies personnes suivent. Personne ne veut s'abonner à un compte que personne ne suit. C'est la preuve sociale : simple, efficace, et utilisée par des milliers de créateurs chaque mois.",
    benefits: [
      { icon: "📈", title: "Livraison progressive", desc: "Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser." },
      { icon: "🎯", title: "Profils ciblés", desc: "Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu." },
      { icon: "🔄", title: "Refill automatique", desc: "Un drop ? Le Refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées." },
      { icon: "⚡", title: "Démarrage en quelques heures", desc: "Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures." },
    ],
    faq: [
      { q: "Est-ce que ça peut bloquer mon compte ?", a: "Non. On travaille uniquement avec des profils de qualité, livrés progressivement. Pas de comportement suspect, pas de risque." },
      { q: "Combien de temps durent les abonnés ?", a: "La plupart restent indéfiniment. Quelques drops sont normaux sur n'importe quel compte, c'est pour ça qu'on propose le Refill sur certains services." },
      { q: "Mon profil doit-il être public ?", a: "Oui, pendant toute la durée de la livraison. Une fois terminée, vous pouvez repasser en privé si vous le souhaitez." },
      { q: "Et si je ne suis pas satisfait ?", a: "Contactez le support avec votre numéro de commande. On vérifie et on arrange ça : refill ou remboursement selon la situation." },
      { q: "C'est quoi la différence entre Monde et Français ?", a: "Le ciblage Monde envoie des profils internationaux. Le ciblage Français envoie des profils Français qui comprennent et interagissent avec votre contenu local." },
    ],
  },
  likes: {
    desc: "Dans les 30 premières minutes après une publication, l'algorithme mesure l'engagement. Plus vous avez de likes vite, plus votre post est distribué. C'est mécanique, et on s'en occupe.",
    badges: ["🔥 Déclenche l'algo", "⚡ Express disponible", "✓ Profils actifs", "↻ Refill sur certains"],
    why: "Un post sans likes, ça reste dans l'ombre. L'algorithme ne pousse pas le contenu qu'il ne voit pas performer. Ajouter des likes au bon moment, c'est donner à votre post la fenêtre de visibilité dont il a besoin pour que les gens réels prennent le relais.",
    benefits: [
      { icon: "⏱️", title: "Timing parfait", desc: "Commandez juste après votre publication pour maximiser l'effet sur l'algorithme dans la fenêtre critique des 30 premières minutes." },
      { icon: "📊", title: "Taux d'engagement boosté", desc: "Plus de likes = meilleur taux d'engagement = plus de reach organique sur vos prochaines publications aussi." },
      { icon: "👁️", title: "Explorer & Tendances", desc: "Les posts avec un fort engagement initial ont bien plus de chances d'apparaître sur les pages de découverte." },
      { icon: "🔄", title: "Livraison naturelle", desc: "Les likes arrivent progressivement sur plusieurs minutes ou heures. Aucun pic suspect, aucune alerte côté plateforme." },
    ],
    faq: [
      { q: "Combien de temps mettent les likes à arriver ?", a: "Selon l'offre choisie, entre quelques minutes et quelques heures. L'express démarre en moins de 30 min." },
      { q: "Les likes partent-ils après un moment ?", a: "Rarement. Dans les cas où des drops surviennent, les offres avec Refill compensent automatiquement." },
      { q: "Ça marche pour les Reels aussi ?", a: "Oui. Le lien de votre Reel suffit. Copiez l'URL directement depuis l'application." },
      { q: "Puis-je commander pour plusieurs posts ?", a: "Oui, une commande par post. Entrez le lien de chaque publication séparément." },
      { q: "Mon compte peut-il être pénalisé ?", a: "Non. Les likes arrivent progressivement depuis des profils actifs. Aucun comportement qui sort de l'ordinaire." },
    ],
  },
  vues: {
    desc: "Un compteur de vues élevé, ça se voit tout de suite. Et l'algorithme le voit aussi. Nos vues sont stables, livrées proprement, et déclenchent la mécanique de recommandation.",
    badges: ["📊 Boost recommandations", "🎯 Vues stables", "⚡ Démarrage rapide", "✓ Aucun risque"],
    why: "Les plateformes comme YouTube, TikTok ou Instagram mesurent en temps réel le ratio vues/abonnés. Un contenu qui performe vite est immédiatement recommandé à d'autres utilisateurs. Acheter des vues, c'est passer ce premier filtre et laisser l'algorithme faire le reste.",
    benefits: [
      { icon: "🚀", title: "Effet de levier algorithme", desc: "Un bon compteur de vues déclenche les recommandations automatiques. Plus de vues achetées = plus de vues organiques derrière." },
      { icon: "💰", title: "Seuil de monétisation plus rapide", desc: "Sur YouTube, TikTok ou Spotify, les seuils de monétisation se franchissent bien plus vite avec un coup de pouce initial." },
      { icon: "🔢", title: "Preuve sociale visible", desc: "100 000 vues sur une vidéo, ça convainc un inconnu de cliquer. 200 vues, beaucoup moins. La perception compte." },
      { icon: "📅", title: "Idéal pour les vieux contenus", desc: "Vous avez une vidéo qui méritait mieux ? Boostez-la maintenant pour lui donner une seconde chance dans l'algorithme." },
    ],
    faq: [
      { q: "Les vues restent-elles définitivement ?", a: "Oui. Une fois comptabilisées, elles ne disparaissent pas." },
      { q: "Ça fonctionne pour YouTube Shorts et TikTok ?", a: "Oui, précisez simplement le lien de la vidéo ou du Short concerné." },
      { q: "La vitesse d'arrivée est-elle contrôlable ?", a: "Chaque service a sa propre vitesse. Consultez les détails dans la description ou contactez le support pour une offre sur-mesure." },
      { q: "Est-ce que ça aide vraiment pour la monétisation ?", a: "Ça dépend de la plateforme. Nos vues sont de qualité mais on recommande de combiner avec de la croissance organique pour la monétisation long terme." },
    ],
  },
  partages: {
    desc: "Le partage, c'est le signal algorithmique le plus fort. Sur TikTok, c'est ce qui déclenche la viralité exponentielle. Plus votre vidéo est partagée, plus elle est distribuée.",
    badges: ["🚀 Signal viral", "✓ Permanents", "⚡ Livraison rapide", "📈 Effet boule de neige"],
    why: "L'algorithme TikTok pousse en priorité les vidéos qui sont partagées. C'est le signal que le contenu résonne tellement que les gens veulent le faire circuler. En boostant les partages, vous envoyez ce signal fort à l'algorithme.",
    benefits: [
      { icon: "🚀", title: "Viralité algorithme", desc: "Les partages sont le signal n°1 pour la page Pour Toi. Une vidéo partagée est automatiquement pushée à plus de monde." },
      { icon: "📌", title: "Partages permanents", desc: "Les partages restent définitivement dans les stats de votre vidéo. Aucune disparition." },
      { icon: "⚡", title: "Démarrage en minutes", desc: "La livraison commence dans l'heure. Idéal pour booster une vidéo juste après publication." },
      { icon: "🎯", title: "Crédibilité maximale", desc: "Une vidéo avec beaucoup de partages inspire confiance : les gens pensent que c'est du contenu qui mérite d'être vu." },
    ],
    faq: [
      { q: "Pourquoi les partages sont-ils plus puissants que les likes ?", a: "Un partage nécessite une action forte (envoyer à quelqu'un). L'algorithme le valorise beaucoup plus qu'un like." },
      { q: "Les partages sont-ils visibles publiquement ?", a: "Le compteur de partages est visible sur TikTok, oui. C'est même un des premiers indicateurs que les visiteurs voient." },
      { q: "Combien de partages pour devenir viral ?", a: "Aucune règle fixe, mais 1 000+ partages sur une vidéo l'envoient souvent dans le FYP de masse." },
    ],
  },
  enregistrements: {
    desc: "Les enregistrements (saves) sont le signal le plus rare et le plus valorisé par l'algorithme TikTok. Un utilisateur qui sauvegarde, c'est un utilisateur qui valorise fortement votre contenu.",
    badges: ["💎 Signal premium", "🎯 Boost FYP", "✓ Discret", "⚡ Rapide"],
    why: "Sur TikTok, un save compte 5 à 10x plus qu'un like dans l'algorithme. C'est la preuve que l'utilisateur prévoit de revenir voir la vidéo — un signal extrêmement fort qui déclenche une distribution massive.",
    benefits: [
      { icon: "💎", title: "Signal le plus puissant", desc: "Les enregistrements pèsent bien plus lourd que les likes dans l'algo. C'est le signal de qualité par excellence." },
      { icon: "🎯", title: "Boost FYP garanti", desc: "Une vidéo avec beaucoup de saves a 10x plus de chances d'atterrir dans la page Pour Toi d'autres utilisateurs." },
      { icon: "📊", title: "Combinable", desc: "Parfaitement combinable avec vues et likes pour un boost complet qui coche toutes les cases de l'algorithme." },
    ],
    faq: [
      { q: "Qu'est-ce qu'un enregistrement TikTok ?", a: "C'est quand un utilisateur clique sur l'icône signet pour sauvegarder votre vidéo dans ses favoris. Signal d'engagement très fort." },
      { q: "Les saves sont-ils visibles par les autres ?", a: "Le compteur est visible. Les utilisateurs qui ont sauvegardé restent privés." },
      { q: "Pourquoi les saves sont plus importants que les likes ?", a: "Parce qu'ils indiquent une intention de revenir, ce que l'algo interprète comme du contenu précieux." },
    ],
  },
  retweets: {
    desc: "Sur X (Twitter), le retweet multiplie la portée d'un tweet. Chaque retweet l'expose aux followers d'un autre utilisateur — la viralité se construit par cascade.",
    badges: ["🔁 Effet cascade", "📈 Reach multiplié", "✓ Permanents", "⚡ Rapide"],
    why: "Un tweet sans retweet reste enfermé dans votre cercle. Un tweet retweeté est vu par des audiences que vous n'atteindriez jamais organiquement. C'est le carburant de la viralité sur X.",
    benefits: [
      { icon: "🚀", title: "Reach exponentiel", desc: "Chaque retweet expose votre tweet aux followers d'un autre compte. Effet de propagation immédiat." },
      { icon: "📈", title: "Signal d'engagement", desc: "X pousse les tweets avec fort ratio retweets/impressions. Boost algorithmique direct." },
      { icon: "✓", title: "Crédibilité", desc: "Un tweet avec 500 retweets sera pris bien plus au sérieux qu'un tweet avec 2 retweets." },
    ],
    faq: [
      { q: "Les retweets disparaissent-ils ?", a: "Très rarement. Dans quelques cas isolés, mais notre livraison progressive évite les détections." },
      { q: "Peut-on avoir des retweets français ?", a: "Oui, certains services proposent du ciblage FR. Demandez au support si ce n'est pas visible sur l'offre choisie." },
    ],
  },
  auditeurs: {
    desc: "Les auditeurs mensuels sont la métrique visible n°1 sur votre profil artiste Spotify. C'est ce que les labels, playlists et fans regardent en premier pour évaluer votre traction.",
    badges: ["🎧 Profil artiste", "📈 Classement", "✓ Discret", "🎼 Toutes les plateformes"],
    why: "Spotify utilise les auditeurs mensuels pour recommander des artistes dans ses playlists algorithmiques (Discover Weekly, Radio d'artiste). Plus vos auditeurs mensuels sont élevés, plus vous êtes poussés à de nouveaux fans.",
    benefits: [
      { icon: "🎧", title: "Crédibilité instantanée", desc: "Un profil avec 10K auditeurs mensuels est pris au sérieux par les labels, managers et curateurs de playlists." },
      { icon: "📈", title: "Déclenche les playlists", desc: "Spotify recommande les artistes qui montent. Passer un cap d'auditeurs peut déclencher Discover Weekly pour vos fans." },
      { icon: "🎼", title: "Aucun accès requis", desc: "Seule l'URL de votre profil artiste Spotify est nécessaire. On ne touche jamais à votre compte." },
    ],
    faq: [
      { q: "Est-ce détectable par Spotify ?", a: "Non si livré progressivement comme chez Vyrlo. On imite un comportement d'écoute naturel." },
      { q: "Ça génère des royalties ?", a: "Non. Les auditeurs achetés n'engagent pas de royalties. Leur but est purement statistique et algorithmique." },
      { q: "Combien de temps durent les auditeurs mensuels ?", a: "30 jours glissants comme pour tous les auditeurs Spotify. C'est pourquoi on recommande de maintenir un boost régulier." },
    ],
  },
};

export const DEFAULT_GROUP_SEO: GroupSeo = {
  desc: "Un service rapide, discret et efficace. Pas de compte à créer, pas de mot de passe à donner. Juste votre lien et un paiement sécurisé par carte.",
  badges: ["⚡ Livraison rapide", "🔒 Paiement sécurisé", "✓ Sans inscription", "💬 Support réactif"],
  why: "Chaque plateforme a ses propres mécaniques. Ce qui fonctionne sur Instagram n'est pas forcément la même chose sur TikTok ou Spotify. Nos services sont calibrés spécifiquement pour chaque réseau.",
  benefits: [
    { icon: "⚡", title: "Démarrage rapide", desc: "La commande est traitée dès validation du paiement. Pas d'attente inutile." },
    { icon: "🔒", title: "Zéro accès à votre compte", desc: "On n'a jamais besoin de votre mot de passe. Juste un lien public suffit." },
    { icon: "✓", title: "Sans inscription obligatoire", desc: "Pas besoin de créer un compte. Commandez directement et suivez par email." },
    { icon: "💬", title: "Support disponible 7j/7", desc: "Une question ? Un problème ? On répond vite, en français." },
  ],
  faq: [
    { q: "Je dois créer un compte pour commander ?", a: "Non. Entrez juste votre lien et payez par carte. Vous recevrez une confirmation par email." },
    { q: "Combien de temps avant que ça démarre ?", a: "Entre quelques minutes et quelques heures selon le service. La plupart démarrent dans l'heure." },
    { q: "Et si ça ne fonctionne pas ?", a: "Contactez le support avec votre numéro de commande. On vérifie et on arrange ça." },
    { q: "Mon compte est-il en sécurité ?", a: "Oui. On ne demande jamais votre mot de passe. On ne peut pas accéder à votre compte." },
  ],
};
