"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../_components/Navbar"), { ssr: false });
import Footer from "../_components/Footer";
import { addToCart } from "@/lib/useCart";

interface Service {
  id: number; name: string; ourRate: number;
  min: number; max: number; refill: boolean; cancel: boolean;
  targeting: string;
}
interface Group { slug: string; label: string; icon: string; items: Service[] }
interface PlatformInfo { slug: string; label: string; emoji: string; color: string }
interface PlatformData { platform: PlatformInfo; groups: Group[] }

// ── Quantités par type ────────────────────────────────────────────────────────
const QUANTITIES: Record<string, number[]> = {
  abonnes:        [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000],
  likes:          [100, 250, 500, 1000, 2500, 5000, 10000, 20000, 50000, 100000],
  vues:           [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
  commentaires:   [5, 10, 25, 50, 100],
  partages:       [100, 250, 500, 1000, 2500, 5000],
  enregistrements:[100, 250, 500, 1000, 2500, 5000],
  retweets:       [100, 250, 500, 1000, 2500, 5000],
  auditeurs:      [500, 1000, 2500, 5000, 10000, 25000],
};
function getQuantities(slug: string) { return QUANTITIES[slug] ?? [100, 250, 500, 1000, 2500, 5000]; }

function formatQty(n: number) {
  if (n >= 1_000_000) return `${n / 1_000_000}M`;
  if (n >= 1_000)     return `${n / 1_000}K`;
  return n.toLocaleString("fr-FR");
}
function formatPrice(n: number) {
  if (n < 0.01) return "< 0,01 €";
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Couleurs & logo par plateforme ────────────────────────────────────────────
const PLATFORM_STYLE: Record<string, { bg: string }> = {
  instagram: { bg: "radialGradient" },
  tiktok:    { bg: "#010101" },
  youtube:   { bg: "linear-gradient(135deg,#FF0000,#cc0000)" },
  facebook:  { bg: "linear-gradient(135deg,#1877F2,#1565c0)" },
  twitter:   { bg: "#000" },
  spotify:   { bg: "linear-gradient(135deg,#1DB954,#138040)" },
  threads:   { bg: "#000" },
};

function PlatformLogoLarge({ slug }: { slug: string }) {
  const s = 120;
  if (slug === "instagram") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="igl" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="50%" stopColor="#fd5949"/>
          <stop offset="68%" stopColor="#d6249f"/>
          <stop offset="100%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#igl)"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.8" fill="none"/>
    </svg>
  );
  if (slug === "tiktok") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#010101"/>
      <path d="M16.6 5.82a4.02 4.02 0 0 1-.77-2.32h-2.62v10.4c-.05 1.06-.92 1.9-2 1.9a2 2 0 0 1-2-2 2 2 0 0 1 2-2c.2 0 .38.03.56.08V9.2a4.63 4.63 0 0 0-.56-.04 4.62 4.62 0 0 0-4.62 4.62 4.62 4.62 0 0 0 4.62 4.62 4.62 4.62 0 0 0 4.62-4.62V9.22A6.6 6.6 0 0 0 19.5 10V7.4a4.03 4.03 0 0 1-2.9-1.58z" fill="white"/>
    </svg>
  );
  if (slug === "youtube") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M21.8 8.04s-.2-1.4-.8-2c-.78-.82-1.65-.82-2.04-.87C16.4 5 12 5 12 5s-4.4 0-6.96.17c-.4.05-1.26.05-2.04.87-.6.6-.8 2-.8 2S2 9.6 2 11.16v1.5c0 1.57.2 3.13.2 3.13s.2 1.4.8 2c.78.82 1.8.8 2.26.88C6.8 18.86 12 18.9 12 18.9s4.4 0 6.96-.2c.4-.05 1.26-.06 2.04-.88.6-.6.8-2 .8-2S22 14.23 22 12.66v-1.5c0-1.57-.2-3.12-.2-3.12zM9.75 14.85V9.05l5.5 2.9-5.5 2.9z" fill="white"/>
    </svg>
  );
  if (slug === "facebook") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16 3.5h-2.5A4.5 4.5 0 0 0 9 8v2.5H6.5V14H9v7h3.5v-7h2.5l.5-3.5H12.5V8a1 1 0 0 1 1-1H16V3.5z" fill="white"/>
    </svg>
  );
  if (slug === "twitter" || slug === "x") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M18.3 4h-2.1L12 9.3 7.8 4H3.7l6.1 8.1L3.6 20H5.7l4.5-5.7 4.5 5.7H18.3l-6.4-8.5L18.3 4zM14.6 18.4l-9.5-12.8H9.4l9.5 12.8h-4.3z" fill="white"/>
    </svg>
  );
  if (slug === "spotify") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#1DB954"/>
      <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm3.67 11.57a.5.5 0 0 1-.69.16c-1.88-1.15-4.25-1.41-7.04-.77a.5.5 0 1 1-.22-.97c3.05-.7 5.67-.4 7.79.9a.5.5 0 0 1 .16.68zm.98-2.18a.62.62 0 0 1-.86.2c-2.15-1.32-5.43-1.7-7.97-.93a.63.63 0 0 1-.37-1.2c2.9-.88 6.5-.45 8.97 1.06a.63.63 0 0 1 .23.87zm.08-2.27C14.1 9.55 10.1 9.42 7.58 10.2a.75.75 0 0 1-.43-1.43c2.9-.87 7.3-.7 10.18 1.1a.75.75 0 1 1-.6 1.25z" fill="white"/>
    </svg>
  );
  if (slug === "threads") return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M16.27 11.43c-.1-.05-.21-.09-.32-.13-.19-2.52-1.51-3.96-3.82-3.97h-.04c-1.38 0-2.53.59-3.23 1.66l1.31.9c.53-.8 1.35-.97 1.92-.97h.03c.74 0 1.3.22 1.67.65.26.3.44.72.52 1.25a8.3 8.3 0 0 0-2.13-.1c-2.14.12-3.52 1.35-3.42 3.06.05.87.5 1.62 1.26 2.1.64.4 1.47.6 2.33.56 1.14-.06 2.03-.5 2.65-1.3.47-.62.77-1.43.9-2.45.54.32.94.74 1.17 1.25.38.84.4 2.21-.78 3.39-1.02 1.02-2.25 1.46-4.1 1.47-2.06-.01-3.62-.68-4.63-1.97-.95-1.22-1.44-2.98-1.46-5.23.02-2.25.51-4.01 1.46-5.23 1.01-1.3 2.57-1.96 4.63-1.97 2.07.01 3.64.67 4.67 1.98.5.64.88 1.43 1.12 2.35l1.54-.41c-.29-1.14-.77-2.12-1.43-2.93-1.32-1.68-3.28-2.55-5.9-2.56h-.01c-2.61.01-4.56.88-5.81 2.6-1.1 1.53-1.67 3.62-1.7 6.23.03 2.6.6 4.7 1.7 6.23 1.25 1.72 3.2 2.59 5.81 2.6h.02c2.34-.01 3.99-.63 5.35-1.99 1.78-1.77 1.72-3.98 1.14-5.34-.41-.93-1.18-1.68-2.26-2.22z" fill="white"/>
    </svg>
  );
  return <span style={{ fontSize: 80, lineHeight: 1 }}>{slug[0].toUpperCase()}</span>;
}

// ── Avis clients par type de service ─────────────────────────────────────────
const REVIEWS_BY_TYPE: Record<string, { name: string; handle: string; stars: number; date: string; text: string }[]> = {
  abonnes: [
    { name: "Yasmine K.", handle: "@yasminekadri", stars: 5, date: "Il y a 2 jours", text: "J'avais 2 300 followers Instagram depuis 3 ans. Après une commande de 5K, l'algo m'a poussé. Maintenant j'ai 14K en organique." },
    { name: "Romain C.", handle: "@romain.coach_", stars: 5, date: "Il y a 1 semaine", text: "Le ciblage France c'est la vraie différence. Des abonnés qui répondent à mes sondages dès le lendemain. Pas des fantômes." },
    { name: "Léa M.", handle: "@lea.moreau.off", stars: 5, date: "Il y a 2 semaines", text: "Commandé 1 000 abonnés un mardi soir. Le jeudi j'étais à 980. 6 mois plus tard mon compte grossit tout seul." },
    { name: "Anaïs T.", handle: "@anais.travel.ig", stars: 5, date: "Il y a 2 semaines", text: "3ème commande. Je le fais avant chaque collab pour avoir un profil crédible. Ça marche à chaque fois." },
    { name: "Théo D.", handle: "@theo.drops.fr", stars: 5, date: "Il y a 3 semaines", text: "Le refill a compensé automatiquement quand j'ai eu des drops. Vraiment tranquille, je n'ai rien eu à faire." },
    { name: "Marie-Lou P.", handle: "@marielouperrin", stars: 5, date: "Il y a 1 mois", text: "Comparé 4 panels différents. C'est le seul où les abonnés étaient encore là 3 mois après la commande." },
    { name: "Camille R.", handle: "@cam.rousseau_", stars: 5, date: "Il y a 1 mois", text: "Les nouveaux abonnés regardent mes stories et répondent à mes questions. C'est pas des fantômes." },
    { name: "Julie M.", handle: "@julie.martin.crea", stars: 5, date: "Il y a 5 semaines", text: "De 800 à 15 000 en 8 mois, moitié organique moitié boost. Les deux se combinent vraiment bien." },
    { name: "Maxime G.", handle: "@maxgirard.fit", stars: 5, date: "Il y a 6 semaines", text: "J'avais des doutes. Les stats ont parlé : taux d'engagement inchangé, abonnés restés. Je reviens." },
    { name: "Clémence V.", handle: "@clemence.video", stars: 5, date: "Il y a 6 semaines", text: "Pour YouTube : 2 000 abonnés commandés. Ma chaîne recommandée dans des playlists 2 semaines après." },
    { name: "Florian M.", handle: "@floriandumas.mkt", stars: 5, date: "Il y a 2 mois", text: "Livraison progressive sur 8h, aucun pic suspect. Exactement ce qu'il faut pour ne pas alerter l'algo." },
    { name: "Sarah B.", handle: "@sarahb.lifestyle", stars: 4, date: "Il y a 2 mois", text: "Livraison un peu plus longue que prévu mais la qualité est là. Le support a répondu en moins d'une heure." },
  ],
  likes: [
    { name: "Nassim O.", handle: "@nassimoff_", stars: 5, date: "Il y a 3 jours", text: "Commandé 500 likes sur un post test. En 2h tout était là. Mon taux d'engagement a explosé, le post a été poussé par l'algo." },
    { name: "Hugo L.", handle: "@hugolaffon_", stars: 5, date: "Il y a 5 jours", text: "Les likes express arrivent avant que j'aie fermé l'app. Parfait pour les publications où le timing est crucial." },
    { name: "Inès B.", handle: "@ines.beauty.fr", stars: 5, date: "Il y a 1 semaine", text: "Mon Reel a décollé le premier jour grâce aux likes initiaux. L'algo a fait le reste, 200K vues organiques derrière." },
    { name: "Antoine B.", handle: "@antoinebru.off", stars: 5, date: "Il y a 2 semaines", text: "Commande passée juste après publication. Le post est passé sur la page Explorer en moins de 3h." },
    { name: "Sofia R.", handle: "@sofiar.create", stars: 5, date: "Il y a 2 semaines", text: "Interface simple, paiement rapide, likes arrivés en 45 min. Je l'utilise sur tous mes posts importants." },
    { name: "Mathieu G.", handle: "@mathieu.gym_", stars: 5, date: "Il y a 3 semaines", text: "Avant j'avais 20-30 likes par post. Maintenant mes posts organiques font 200-300. L'algo a appris." },
    { name: "Lucie F.", handle: "@luciefaure.art", stars: 5, date: "Il y a 1 mois", text: "J'ai commandé sur un vieux post que je voulais ressortir. Le post a été remis en avant par l'algorithme." },
    { name: "Kevin A.", handle: "@kevinab.pro", stars: 5, date: "Il y a 1 mois", text: "Très utile pour les posts de lancement produit. Les likes initiaux donnent de la crédibilité aux premiers visiteurs." },
    { name: "Sandra K.", handle: "@sandrak.food", stars: 5, date: "Il y a 5 semaines", text: "Le rapport qualité/prix est imbattable. Pour des likes France c'est nickel, les comptes ont l'air actifs." },
    { name: "Youssef A.", handle: "@youssefamrani", stars: 4, date: "Il y a 6 semaines", text: "Refill automatique sur quelques drops. Vraiment propre comme service, je recommande." },
    { name: "Baptiste M.", handle: "@bap.music31", stars: 5, date: "Il y a 2 mois", text: "TikTok et Instagram, ça marche sur les deux. J'ai trouvé la même qualité sur les deux plateformes." },
    { name: "Thomas L.", handle: "@thomas.lef.photo", stars: 5, date: "Il y a 2 mois", text: "Mon dernier post a atteint 47K impressions organiques après avoir commandé les premiers likes. Effet levier réel." },
  ],
  vues: [
    { name: "Florian M.", handle: "@floriandumas.mkt", stars: 5, date: "Il y a 3 jours", text: "TikTok : commandé 10K vues, la vidéo est passée de 300 à 47K naturellement dans la semaine. Impressionnant." },
    { name: "Clémence V.", handle: "@clemence.video", stars: 5, date: "Il y a 1 semaine", text: "Ma vidéo YouTube trainait à 200 vues depuis 3 mois. 5 000 vues commandées, elle est passée dans les recommandées." },
    { name: "Thomas L.", handle: "@thomas.lef.photo", stars: 5, date: "Il y a 1 semaine", text: "J'utilise ça pour passer le seuil de monétisation YouTube. Les vues sont stables, ne disparaissent pas." },
    { name: "Marie-Lou P.", handle: "@marielouperrin", stars: 5, date: "Il y a 2 semaines", text: "Short YouTube : 50K vues commandées. Recommandations déclenchées dans les 48h. Ça marche vraiment." },
    { name: "Antoine B.", handle: "@antoinebru.off", stars: 5, date: "Il y a 2 semaines", text: "Parfait pour ressortir un vieux contenu que j'avais sous-estimé. L'algo lui a redonné une chance." },
    { name: "Anaïs T.", handle: "@anais.travel.ig", stars: 5, date: "Il y a 3 semaines", text: "Spotify : auditeurs mensuels passés de 800 à 6 200 en 3 semaines. Playlist algorithmique déclenchée derrière." },
    { name: "Nassim O.", handle: "@nassimoff_", stars: 5, date: "Il y a 1 mois", text: "La preuve sociale ça compte. Une vidéo avec 100K vues se vend mieux qu'une à 2K. Simple et efficace." },
    { name: "Hugo L.", handle: "@hugolaffon_", stars: 5, date: "Il y a 1 mois", text: "Livraison stable, aucun pic, aucune alerte. Les vues arrivent sur plusieurs jours de façon naturelle." },
    { name: "Romain C.", handle: "@romain.coach_", stars: 5, date: "Il y a 5 semaines", text: "Pour TikTok c'est redoutable. Les vues initiales font tout : FYP, recommandations, partages organiques derrière." },
    { name: "Sofia R.", handle: "@sofiar.create", stars: 5, date: "Il y a 6 semaines", text: "J'ai franchi le seuil de monétisation YouTube 3 mois avant mes prévisions grâce à ce service." },
    { name: "Kevin A.", handle: "@kevinab.pro", stars: 5, date: "Il y a 2 mois", text: "Ça fait 4 commandes sur des vidéos différentes. Résultat cohérent à chaque fois, livraison propre." },
    { name: "Inès B.", handle: "@ines.beauty.fr", stars: 5, date: "Il y a 2 mois", text: "Le rapport vues payées sur reach organique obtenu est incroyable si vous faites le calcul." },
  ],
  commentaires: [
    { name: "Camille R.", handle: "@cam.rousseau_", stars: 5, date: "Il y a 2 jours", text: "Les commentaires en français, c'est ce qui manquait. Ça donne une vraie ambiance communauté sous le post." },
    { name: "Romain C.", handle: "@romain.coach_", stars: 5, date: "Il y a 4 jours", text: "J'ai commandé 20 commentaires pour un post important. L'engagement a attiré de vrais commentaires derrière." },
    { name: "Léa M.", handle: "@lea.moreau.off", stars: 5, date: "Il y a 1 semaine", text: "Les commentaires sont pertinents, pas des générique. Vraiment utile pour crédibiliser un post." },
    { name: "Baptiste M.", handle: "@bap.music31", stars: 5, date: "Il y a 2 semaines", text: "Pour les posts de lancement, 15 commentaires positifs en avance, ça change tout. Les visiteurs restent." },
    { name: "Inès B.", handle: "@ines.beauty.fr", stars: 5, date: "Il y a 2 semaines", text: "L'algorithme Instagram adore les commentaires. Combiné aux likes, mon post a explosé en reach." },
    { name: "Thomas L.", handle: "@thomas.lef.photo", stars: 5, date: "Il y a 3 semaines", text: "Commentaires livrés progressivement sur 4h. Aucun spike suspect. Le post est resté en haut des recommandés." },
    { name: "Sandra K.", handle: "@sandrak.food", stars: 5, date: "Il y a 1 mois", text: "L'option français est disponible. J'ai eu des commentaires cohérents avec mon contenu lifestyle. Impeccable." },
    { name: "Maxime G.", handle: "@maxgirard.fit", stars: 5, date: "Il y a 1 mois", text: "Les commentaires créent un effet d'entraînement. Des vrais utilisateurs ont commencé à commenter après." },
    { name: "Julie M.", handle: "@julie.martin.crea", stars: 5, date: "Il y a 5 semaines", text: "Parfait pour les giveaways et les posts viraux. Donne l'impression d'une vraie communauté active." },
    { name: "Nicolas D.", handle: "@nicodu31", stars: 5, date: "Il y a 2 mois", text: "Propre, rapide, efficace. Les commentaires sont crédibles. Je recommande pour tout créateur qui veut percer." },
  ],
};

// ── Contenu SEO / badges par type ─────────────────────────────────────────────
interface SeoData {
  desc: string;
  badges: string[];
  why: string;
  benefits: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  linkLabel: string;
  linkPlaceholder: string;
}

const SEO: Record<string, SeoData> = {
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
      { q: "C'est quoi la différence entre Monde et France ?", a: "Le ciblage Monde envoie des profils internationaux. Le ciblage France envoie des profils francophones qui comprennent et interagissent avec votre contenu local." },
    ],
    linkLabel: "Lien du profil",
    linkPlaceholder: "https://www.instagram.com/votrenom/",
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
    linkLabel: "Lien direct vers la publication",
    linkPlaceholder: "https://www.instagram.com/p/...",
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
    linkLabel: "Lien direct vers la vidéo",
    linkPlaceholder: "https://youtu.be/... ou https://www.tiktok.com/...",
  },
  commentaires: {
    desc: "Le commentaire, c'est l'engagement qui coûte le plus à l'utilisateur, et que l'algorithme valorise le plus. Quelques commentaires bien placés, et votre post change de dimension.",
    badges: ["💬 Signal fort algo", "🇫🇷 FR disponible", "⭐ Profils crédibles", "✓ Permanents"],
    why: "Un like, ça prend une seconde. Un commentaire, ça prend 10 secondes. L'algorithme le sait, et c'est pour ça qu'il valorise l'engagement commentaire bien plus que le like. Une publication avec des commentaires actifs est traitée comme du contenu populaire, et poussée en conséquence.",
    benefits: [
      { icon: "🏆", title: "Engagement de qualité", desc: "Les commentaires pèsent 3 à 5x plus que les likes dans les algorithmes Instagram et TikTok. C'est l'investissement le plus rentable." },
      { icon: "👥", title: "Effet communauté", desc: "Un post avec des commentaires donne l'impression d'une vraie discussion. Les visiteurs rejoignent naturellement l'échange." },
      { icon: "📌", title: "Permanents et réels", desc: "Les commentaires restent sur votre publication. Aucune expiration, aucun nettoyage automatique à craindre." },
      { icon: "🇫🇷", title: "Option commentaires FR", desc: "Disponible sur certains services : des commentaires rédigés en français pour une cohérence totale avec votre audience." },
    ],
    faq: [
      { q: "Les commentaires sont-ils en français ?", a: "Ça dépend du service sélectionné. Certains proposent du français, d'autres sont internationaux. Regardez la description de l'offre choisie." },
      { q: "Peut-on personnaliser les commentaires ?", a: "Sur certaines offres, oui. Mentionnez-le dans le champ lien ou contactez le support avant de passer commande." },
      { q: "Les commentaires peuvent-ils être supprimés par la plateforme ?", a: "Dans de rares cas, oui. C'est pour ça qu'on recommande les offres avec Refill pour ce type de service." },
      { q: "Ça marche sur les Reels et TikToks ?", a: "Oui. Collez le lien direct vers votre vidéo ou publication et la livraison démarre normalement." },
    ],
    linkLabel: "Lien direct vers la publication",
    linkPlaceholder: "https://www.instagram.com/p/...",
  },
};

const DEFAULT_SEO: SeoData = {
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
  linkLabel: "Lien du profil ou de la publication",
  linkPlaceholder: "https://www.example.com/votrenom/",
};

export default function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = use(params);

  const [data, setData] = useState<PlatformData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeGroupSlug, setActiveGroupSlug] = useState("");
  const [targeting, setTargeting] = useState<"world" | "france" | "europe">("world");
  const [selectedQty, setSelectedQty] = useState<number>(0);
  const [link, setLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  useEffect(() => {
    setLoading(true); setNotFound(false); setData(null);
    setActiveGroupSlug(""); setError("");
    fetch(`/api/boutique/${platform}`)
      .then(r => r.json())
      .then(d => {
        if (d.error || !d.groups?.length) { setNotFound(true); return; }
        setData(d);
        const firstSlug = d.groups[0].slug;
        setActiveGroupSlug(firstSlug);
        const firstQty = (QUANTITIES[firstSlug] ?? [100])[0];
        setSelectedQty(firstQty);
      }).catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [platform]);

  // Reset qty when group changes
  useEffect(() => {
    if (!activeGroupSlug) return;
    setSelectedQty((QUANTITIES[activeGroupSlug] ?? [100])[0]);
    setTargeting("world");
    setError("");
  }, [activeGroupSlug]);

  // Update browser title
  const activeGroup = data?.groups.find(g => g.slug === activeGroupSlug);
  useEffect(() => {
    if (data && activeGroup) {
      document.title = `${activeGroup.label} ${data.platform.label} · Vyrlo`;
    }
  }, [data, activeGroup]);

  const allItems = activeGroup?.items ?? [];

  const worldService  = allItems.filter(s => s.targeting === "world").sort((a, b) => a.ourRate - b.ourRate)[0] ?? null;
  const franceService = allItems.filter(s => s.targeting === "france").sort((a, b) => a.ourRate - b.ourRate)[0] ?? null;
  const europeService = allItems.filter(s => s.targeting === "europe").sort((a, b) => a.ourRate - b.ourRate)[0] ?? null;

  const matchedService =
    targeting === "france" && franceService ? franceService :
    targeting === "europe" && europeService ? europeService :
    worldService ?? franceService ?? europeService;

  const quantities = getQuantities(activeGroupSlug).filter(q =>
    matchedService ? (q >= matchedService.min && q <= matchedService.max) : true
  );

  function price(qty: number) {
    if (!matchedService || qty <= 0) return 0;
    return parseFloat(((qty / 1000) * matchedService.ourRate).toFixed(2));
  }
  function originalPrice(qty: number) {
    return parseFloat((price(qty) * 1.3).toFixed(2));
  }

  const currentPrice = price(selectedQty);
  const currentOriginal = originalPrice(selectedQty);
  const canOrder = !!matchedService && selectedQty > 0 && link.trim().length > 0;

  async function handleOrder() {
    if (!canOrder) return;
    setError(""); setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: matchedService!.id, link: link.trim(), quantity: selectedQty }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error ?? "Erreur lors de la commande."); return; }
      window.location.href = d.url;
    } catch { setError("Erreur réseau, réessayez."); }
    finally { setSubmitting(false); }
  }

  function handleAddToCart() {
    if (!canOrder) return;
    addToCart({
      serviceId: matchedService!.id,
      serviceName: matchedService!.name ?? "",
      platform,
      platformLabel: data!.platform.label,
      groupLabel: activeGroup?.label ?? "",
      link: link.trim(),
      quantity: selectedQty,
      price: currentPrice,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <div style={{ paddingTop: 120, textAlign: "center", color: "#ccc" }}>Chargement…</div>
    </div>
  );

  if (notFound || !data) return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />
      <div style={{ paddingTop: 120, textAlign: "center", padding: "120px 24px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 12 }}>Services indisponibles</h1>
        <Link href="/" style={{ background: "#111", color: "#fff", padding: "12px 28px", borderRadius: 100, fontWeight: 600, textDecoration: "none" }}>← Retour</Link>
      </div>
    </div>
  );

  const seo = SEO[activeGroupSlug] ?? DEFAULT_SEO;
  const ptStyle = PLATFORM_STYLE[platform] ?? { bg: "#111" };
  const activeReviews = REVIEWS_BY_TYPE[activeGroupSlug] ?? REVIEWS_BY_TYPE.abonnes;

  // Compteurs par type de service (total ~6 000+)
  const SERVICE_COUNTS: Record<string, string> = {
    abonnes:         "2 500",
    likes:           "1 200",
    vues:            "950",
    commentaires:    "320",
    partages:        "280",
    enregistrements: "230",
    auditeurs:       "200",
    streams:         "180",
    retweets:        "140",
  };
  const serviceCount = SERVICE_COUNTS[activeGroupSlug] ?? "600";

  // Platform accent colors
  const ACCENT: Record<string, string> = { instagram: "#e1306c", tiktok: "#010101", youtube: "#FF0000", facebook: "#1877F2", twitter: "#000", spotify: "#1DB954", threads: "#000" };
  const accent = ACCENT[platform] ?? "#7c3aed";
  const heroBg = platform === "instagram"
    ? "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
    : ptStyle.bg;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Announcement bar ── */}
      <div style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)", color: "#fff", textAlign: "center", fontSize: 13, fontWeight: 600, padding: "10px 16px", letterSpacing: "0.01em" }}>
        <span style={{ marginRight: 6 }}>⚡</span> Livraison express · Démarrage sous 12h · Satisfait ou remboursé
      </div>

      <Navbar />

      {/* ── Hero header ── */}
      <div style={{ background: heroBg, paddingTop: 72, paddingBottom: 0, position: "relative", overflow: "hidden" }}>
        {/* subtle noise overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.08)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "44px 20px 0", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Accueil</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href={`/boutique/${platform}`} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{data.platform.label}</Link>
            {activeGroup && <><span style={{ opacity: 0.4 }}>/</span><span style={{ color: "#fff", fontWeight: 600 }}>{activeGroup.label}</span></>}
          </div>

          {/* Platform icon with glow */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -12, borderRadius: 32, background: "rgba(255,255,255,0.2)", filter: "blur(16px)", pointerEvents: "none" }} />
              <div style={{ width: 96, height: 96, borderRadius: 24, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.25)", position: "relative" }}>
                <PlatformLogoLarge slug={platform} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 18, textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}>
            Achetez des {activeGroup?.label}<br />{data.platform.label}
          </h1>

          {/* Trust pills row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "7px 14px" }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#fbbf24", fontSize: 12 }}>★</span>)}
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginLeft: 4 }}>4.9/5</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "7px 14px" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>✓</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{serviceCount}+ commandes</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(74,222,128,0.2)", backdropFilter: "blur(10px)", border: "1px solid rgba(74,222,128,0.4)", borderRadius: 100, padding: "7px 14px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Service actif</span>
            </div>
          </div>
        </div>

        {/* Tabs sticky below hero */}
        <div style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px", display: "flex", gap: 2, overflowX: "auto", scrollbarWidth: "none" }}>
            {data.groups.map(g => (
              <button key={g.slug} onClick={() => setActiveGroupSlug(g.slug)}
                style={{
                  flexShrink: 0, padding: "15px 22px", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", border: "none", background: "none",
                  color: activeGroupSlug === g.slug ? "#fff" : "rgba(255,255,255,0.5)",
                  borderBottom: activeGroupSlug === g.slug ? "2px solid #fff" : "2px solid transparent",
                  transition: "all 0.15s", whiteSpace: "nowrap", letterSpacing: "0.01em",
                }}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main product card ── */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "20px 16px 80px" }}>

        {/* Trust line */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 16, flexWrap: "wrap" }}>
          {["Démarrage rapide", "Sans mot de passe", "Refill inclus", "Support 7j/7"].map((label, i, arr) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#64748b", padding: "0 10px" }}>✓ {label}</span>
              {i < arr.length - 1 && <span style={{ color: "#cbd5e1", fontSize: 12 }}>·</span>}
            </span>
          ))}
        </div>

        {/* Order form card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Price header */}
          <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid #f1f5f9", background: "linear-gradient(to right, #fafbff, #fff)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Prix total</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {currentPrice > 0 ? formatPrice(currentPrice) : <span style={{ fontSize: 20, color: "#94a3b8", fontWeight: 600 }}>Choisissez une quantité</span>}
              </span>
              {currentOriginal > 0 && (
                <span style={{ fontSize: 15, color: "#cbd5e1", textDecoration: "line-through" }}>
                  {formatPrice(currentOriginal)}
                </span>
              )}
              {currentPrice > 0 && (
                <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: 100, padding: "4px 11px", marginLeft: "auto" }}>
                  -23%
                </span>
              )}
            </div>
          </div>

          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Ciblage */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                <span>🎯</span> Ciblage
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {(["world" as const, ...(franceService ? ["france" as const] : []), ...(europeService ? ["europe" as const] : [])]).map(t => {
                  const labels: Record<string, string> = { world: "🌍 Monde", france: "🇫🇷 Francophone", europe: "🇪🇺 Europe" };
                  const active = targeting === t;
                  return (
                    <button key={t} onClick={() => { setTargeting(t); setSelectedQty((QUANTITIES[activeGroupSlug] ?? [100])[0]); }}
                      style={{
                        padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: active ? 700 : 500,
                        border: `1.5px solid ${active ? accent : "#e2e8f0"}`,
                        background: active ? accent : "#f8fafc", color: active ? "#fff" : "#64748b",
                        cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s",
                        boxShadow: active ? `0 2px 12px ${accent}40` : "none",
                      }}>
                      {labels[t]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantité */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span>📦</span> Quantité</span>
                {selectedQty > 0 && <span style={{ fontSize: 12, color: accent, fontWeight: 700, background: `${accent}12`, padding: "2px 10px", borderRadius: 100 }}>{formatQty(selectedQty)} sélectionné·s</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 8 }}>
                {quantities.map((q, idx) => {
                  const active = selectedQty === q;
                  const isPopular = idx === 2;
                  return (
                    <div key={q} style={{ position: "relative" }}>
                      {isPopular && <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 800, color: "#fff", background: accent, borderRadius: 100, padding: "2px 7px", whiteSpace: "nowrap", zIndex: 1, letterSpacing: "0.04em" }}>POPULAIRE</div>}
                      <button onClick={() => setSelectedQty(q)}
                        style={{
                          width: "100%", padding: "11px 8px", borderRadius: 12, fontSize: 13, fontWeight: active ? 800 : 500,
                          border: `1.5px solid ${active ? accent : isPopular ? `${accent}50` : "#e2e8f0"}`,
                          background: active ? accent : "#f8fafc",
                          color: active ? "#fff" : "#475569",
                          cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s", textAlign: "center",
                          boxShadow: active ? `0 2px 12px ${accent}40` : "none",
                        }}>
                        {formatQty(q)}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lien */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <span>🔗</span> {seo.linkLabel}
              </div>
              <input type="text" value={link} onChange={e => setLink(e.target.value)}
                placeholder={seo.linkPlaceholder}
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid #e2e8f0", borderRadius: 14, fontSize: 14, color: "#0f172a", outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#f8fafc", transition: "border-color 0.15s, box-shadow 0.15s" }}
                onFocus={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}20`; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                <span>🔒</span> Profil public requis pendant la livraison. Aucun mot de passe demandé.
              </p>
            </div>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#dc2626", display: "flex", alignItems: "center", gap: 8 }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={handleAddToCart} disabled={!canOrder || addedToCart}
                style={{
                  width: "100%", padding: "16px", borderRadius: 14,
                  background: addedToCart ? "#16a34a" : canOrder ? "#f8fafc" : "#f1f5f9",
                  color: addedToCart ? "#fff" : canOrder ? accent : "#94a3b8",
                  fontWeight: 700, fontSize: 15, border: `2px solid ${addedToCart ? "#16a34a" : canOrder ? accent : "#e2e8f0"}`,
                  cursor: canOrder && !addedToCart ? "pointer" : "not-allowed",
                  fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.01em",
                }}>
                {addedToCart ? "✓ Ajouté au panier !" : "🛒 Ajouter au panier"}
              </button>

              <button onClick={handleOrder} disabled={submitting || !canOrder}
                style={{
                  width: "100%", padding: "16px", borderRadius: 14,
                  background: canOrder && !submitting
                    ? `linear-gradient(135deg, ${accent} 0%, #4f46e5 100%)`
                    : "#e2e8f0",
                  color: canOrder && !submitting ? "#fff" : "#94a3b8",
                  fontWeight: 800, fontSize: 15, border: "none",
                  cursor: canOrder && !submitting ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  boxShadow: canOrder && !submitting ? `0 4px 16px ${accent}50` : "none",
                  transition: "all 0.2s", letterSpacing: "0.01em",
                }}>
                {submitting ? "Redirection…" : currentPrice > 0 ? `Commander · ${formatPrice(currentPrice)} →` : "Commander →"}
              </button>
            </div>

            {/* Trust strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[["🔒", "Stripe sécurisé"], ["⚡", "Démarrage <12h"], ["🛡️", "Remboursé si échoue"]].map(([icon, label]) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: 12, padding: "10px 6px" }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textAlign: "center", lineHeight: 1.3 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description + badges */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "22px 24px", marginTop: 14, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>À propos de ce service</div>
          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 16px" }}>
            {seo.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {seo.badges.map((b, i) => {
              const colors = [
                { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
                { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
                { bg: "#fefce8", color: "#ca8a04", border: "#fde68a" },
                { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
              ];
              const c = colors[i % colors.length];
              return (
                <span key={b} style={{ fontSize: 12, fontWeight: 700, padding: "5px 13px", borderRadius: 100, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                  {b}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>

        {/* ── SEO Content ─────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 860, margin: "0 auto", paddingBottom: 80 }}>

          {/* Pourquoi */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 12 }}>
              Pourquoi acheter des {activeGroup?.label.toLowerCase()} {data.platform.label} ?
            </h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75 }}>{seo.why}</p>
          </div>

          {/* Avantages */}
          <div style={{ background: "#fff", border: "1.5px solid #ebebeb", borderRadius: 16, overflow: "hidden", marginBottom: 48 }}>
            {seo.benefits.map((b, i) => (
              <div key={i} style={{
                display: "flex", gap: 18, padding: "20px 24px", alignItems: "flex-start",
                borderBottom: i < seo.benefits.length - 1 ? "1px solid #f5f5f5" : "none",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: (["#f0fdf4", "#eff6ff", "#fffbeb", "#fdf4ff"] as string[])[i % 4],
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {b.icon}
                </div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Avis clients */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
              <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", margin: 0 }}>
                Avis clients
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#22c55e">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>4.9/5 · {serviceCount}+ avis vérifiés</span>
              </div>
            </div>
            {/* Marquee carousel */}
            <div style={{ overflow: "hidden", margin: "0 -20px" }}>
              <div className="reviews-marquee">
                {[...activeReviews, ...activeReviews].map((r, i) => (
                  <div key={i} style={{ width: 260, flexShrink: 0, background: "#fff", border: "1.5px solid #ebebeb", borderRadius: 14, padding: "18px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{r.name}</div>
                        <div style={{ fontSize: 12, color: "#aaa" }}>{r.handle}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "#bbb", whiteSpace: "nowrap" }}>{r.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= r.stars ? "#22c55e" : "#e5e7eb"}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Confiance banner */}
          <div style={{ background: "#111", borderRadius: 16, padding: "28px 24px", marginBottom: 48, display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-around" }}>
            {[["⚡", "Livraison en 20 min"], ["🔒", "Stripe sécurisé"], ["🛡️", "Garantie remboursement"], ["👥", "+50K clients"], ["💬", "Support 7j/7"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 20 }}>
              Questions fréquentes
            </h2>
            {seo.faq.map((f, i) => (
              <div key={i} style={{ borderTop: "1.5px solid #ebebeb", borderBottom: i === seo.faq.length - 1 ? "1.5px solid #ebebeb" : "none" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 4px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", gap: 16 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{f.q}</span>
                  <span style={{ fontSize: 20, color: "#bbb", flexShrink: 0, transition: "transform 0.2s", display: "block", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, padding: "0 4px 16px", margin: 0 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .product-inner {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 0;
        }
        .product-left {
          padding: 32px 28px;
          background: #fafafa;
          border-right: 1px solid #ebebeb;
        }
        .product-right {
          padding: 36px 40px;
        }
        .reviews-marquee {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: marquee-l 45s linear infinite;
          padding: 4px 20px;
        }
        .reviews-marquee:hover {
          animation-play-state: paused;
        }
        @media (max-width: 760px) {
          .product-inner {
            grid-template-columns: 1fr !important;
          }
          .product-left {
            border-right: none !important;
            border-bottom: 1px solid #ebebeb;
            padding: 24px 20px;
          }
          .product-left > div:first-child {
            max-width: 200px !important;
            margin: 0 auto;
          }
          .product-right {
            padding: 24px 20px !important;
          }
        }
      `}</style>

    </div>
  );
}
