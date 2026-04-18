// Données des blocks par défaut à injecter dans les templates JSON.
// Sans ça, les sections basées sur des blocks (platforms, steps, reviews…) s'afficheraient vides.

type BlockMap = Record<string, { type: string; settings: Record<string, unknown> }>;

function blocks(entries: Array<[string, string, Record<string, unknown>]>): { blocks: BlockMap; block_order: string[] } {
  const map: BlockMap = {};
  const order: string[] = [];
  for (const [id, type, settings] of entries) {
    map[id] = { type, settings };
    order.push(id);
  }
  return { blocks: map, block_order: order };
}

export const PLATFORMS_BLOCKS = blocks([
  ["ig", "platform", { slug: "instagram", label: "Instagram", color: "#e1306c", tags: "Abonnés, Likes, Vues, Commentaires", price: "À partir de 8,90 €", big: true }],
  ["tk", "platform", { slug: "tiktok", label: "TikTok", color: "#010101", tags: "Abonnés, Likes, Vues", price: "À partir de 8,90 €", big: false }],
  ["yt", "platform", { slug: "youtube", label: "YouTube", color: "#FF0000", tags: "Abonnés, Vues, Likes", price: "À partir de 8,90 €", big: false }],
  ["fb", "platform", { slug: "facebook", label: "Facebook", color: "#1877F2", tags: "Abonnés, Likes, Vues", price: "À partir de 8,90 €", big: false }],
  ["tw", "platform", { slug: "twitter", label: "Twitter / X", color: "#14171A", tags: "Abonnés, Likes, Retweets", price: "À partir de 8,90 €", big: false }],
  ["sp", "platform", { slug: "spotify", label: "Spotify", color: "#1DB954", tags: "Streams, Auditeurs", price: "À partir de 8,90 €", big: false }],
  ["th", "platform", { slug: "threads", label: "Threads", color: "#101010", tags: "Abonnés, Likes", price: "À partir de 8,90 €", big: false }],
]);

export const STEPS_BLOCKS = blocks([
  ["s1", "step", { title: "Choisissez votre service", desc: "Sélectionnez la plateforme et le service qui vous correspond parmi notre catalogue." }],
  ["s2", "step", { title: "Entrez vos informations", desc: "Indiquez le lien de votre profil ou publication. Aucun mot de passe requis." }],
  ["s3", "step", { title: "Livraison automatique", desc: "Votre commande est traitée et livrée en quelques minutes de façon 100% sécurisée." }],
]);

export const COMPARATIF_BLOCKS = blocks([
  ["t1k", "tier", { tab_label: "1K", title: "1 000 abonnés", organic_duree: "2 à 5 mois", service_duree: "24 à 72h", organic_effort: "2–3h par jour", service_effort: "2 minutes", organic_cout: "300 – 500 €", service_cout: "À partir de 8,90 €" }],
  ["t5k", "tier", { tab_label: "5K", title: "5 000 abonnés", organic_duree: "8 à 18 mois", service_duree: "3 à 5 jours", organic_effort: "3–4h par jour", service_effort: "2 minutes", organic_cout: "500 – 1 500 €", service_cout: "À partir de 29,90 €" }],
  ["t10k", "tier", { tab_label: "10K", title: "10 000 abonnés", organic_duree: "1 à 3 ans", service_duree: "5 à 8 jours", organic_effort: "4–5h par jour", service_effort: "2 minutes", organic_cout: "2 000 – 3 000 €", service_cout: "À partir de 74,90 €" }],
]);

export const GUARANTEES_BLOCKS = blocks([
  ["g1", "guarantee", { title: "Livraison progressive", desc: "Les abonnés arrivent sur plusieurs heures, pas d'un coup. L'algorithme ne détecte rien d'anormal et continue à vous pousser." }],
  ["g2", "guarantee", { title: "Profils ciblés France", desc: "Option France disponible pour attirer une audience qui parle français et qui s'engage réellement sur votre contenu." }],
  ["g3", "guarantee", { title: "Refill automatique", desc: "Un drop ? Le refill compense sans que vous ayez à faire quoi que ce soit. Disponible sur les offres sélectionnées." }],
  ["g4", "guarantee", { title: "Démarrage en quelques heures", desc: "Pas besoin d'attendre des semaines. La plupart des commandes démarrent dans les 6 à 12 premières heures." }],
  ["g5", "guarantee", { title: "Aucun mot de passe requis", desc: "Vos accès restent privés. On a seulement besoin du lien de votre profil ou de votre publication." }],
  ["g6", "guarantee", { title: "Support humain 7j/7", desc: "Une vraie équipe qui répond en moins d'une heure. Pas un bot, pas une FAQ automatique." }],
]);

export const REVIEWS_BLOCKS = blocks([
  ["r1",  "review", { row: "1", name: "Yasmine K.",    handle: "@yasminekadri",       text: "J'avais 2 300 followers Instagram depuis 3 ans. Après une commande de 5K, l'algo m'a poussé. Maintenant j'ai 14K en organique." }],
  ["r2",  "review", { row: "1", name: "Florian M.",    handle: "@floriandumas.mkt",   text: "TikTok : commandé 10K vues, la vidéo est passée de 300 à 47K naturellement dans la semaine. Je recommande." }],
  ["r3",  "review", { row: "1", name: "Inès B.",       handle: "@ines.beauty.fr",     text: "Le ciblage France c'est la vraie différence. J'ai eu des abonnés qui répondaient à mes sondages dès le lendemain." }],
  ["r4",  "review", { row: "1", name: "Romain C.",     handle: "@romain.coach_",      text: "Livraison en 6h, prix honnête, support qui répond le soir. C'est tout ce que je voulais." }],
  ["r5",  "review", { row: "1", name: "Léa M.",        handle: "@lea.moreau.off",     text: "Commandé 1 000 abonnés un mardi soir. Le jeudi j'étais à 980. 6 mois plus tard mon compte grossit tout seul." }],
  ["r6",  "review", { row: "1", name: "Nassim O.",     handle: "@nassimoff_",         text: "Commandé 500 likes sur un post test. En 2h tout était là. Depuis j'ai commandé 4 fois." }],
  ["r7",  "review", { row: "1", name: "Clémence V.",   handle: "@clemence.video",     text: "Pour YouTube : 2 000 abonnés commandés. Ma chaîne recommandée dans des playlists 2 semaines après." }],
  ["r8",  "review", { row: "2", name: "Sofia R.",      handle: "@sofiar.create",      text: "Interface simple, pas besoin de compte, paiement en 30 secondes. Exactement ce que j'attendais." }],
  ["r9",  "review", { row: "2", name: "Hugo L.",       handle: "@hugolaffon_",        text: "Les likes express arrivent avant que j'aie fermé l'app. Parfait pour les publications où le timing est crucial." }],
  ["r10", "review", { row: "2", name: "Camille R.",    handle: "@cam.rousseau_",      text: "Les nouveaux abonnés regardent mes stories et répondent à mes questions. C'est pas des fantômes." }],
  ["r11", "review", { row: "2", name: "Mathieu G.",    handle: "@mathieu.gym_",       text: "J'ai une communauté de 22K maintenant, moitié organique moitié boost. Les deux se combinent très bien." }],
  ["r12", "review", { row: "2", name: "Thomas L.",     handle: "@thomas.lef.photo",   text: "Ma chaîne YouTube stagnait à 200 abonnés depuis un an. Commandé 2 000. 3 semaines après j'étais à 3 500." }],
  ["r13", "review", { row: "2", name: "Marie-Lou P.",  handle: "@marielouperrin",     text: "Comparé 4 panels différents. C'est le seul où les abonnés étaient encore là 3 mois après." }],
]);

export const FAQ_BLOCKS = blocks([
  ["f1", "faq_item", { q: "Est-ce que c'est sécurisé ?", a: "Oui, totalement. Nous n'avons jamais besoin de votre mot de passe. Nos méthodes respectent les conditions d'utilisation des plateformes." }],
  ["f2", "faq_item", { q: "Combien de temps prend la livraison ?", a: "La plupart des commandes démarrent en moins de 20 minutes. Le délai complet dépend de la quantité commandée." }],
  ["f3", "faq_item", { q: "Les followers/likes sont-ils réels ?", a: "Nos services varient selon les offres. Certains proviennent de vrais comptes actifs, d'autres sont des comptes de haute qualité." }],
  ["f4", "faq_item", { q: "Que faire si ma commande ne démarre pas ?", a: "Contactez notre support disponible 7j/7. Nous garantissons le remboursement ou le remplacement si la commande n'est pas livrée." }],
  ["f5", "faq_item", { q: "Puis-je commander pour n'importe quel compte ?", a: "Oui, tant que le compte est public au moment de la commande. Pour les likes et vues, la publication doit être accessible." }],
]);
