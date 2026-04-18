import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

/**
 * Pousse les pages légales (CGU, Mentions légales, Confidentialité, Remboursement) vers Shopify.
 * Idempotent : met à jour la page si elle existe déjà (par handle).
 */

const API_VERSION = "2025-10";
const SHOP = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function shopify<T>(method: string, path: string, body?: unknown): Promise<T> {
  await sleep(600);
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    method,
    headers: { "X-Shopify-Access-Token": TOKEN, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${text.slice(0, 400)}`);
  return JSON.parse(text) as T;
}

interface LegalPage {
  handle: string;
  title: string;
  body_html: string;
}

const CGU_SECTIONS: { title: string; body: string }[] = [
  { title: "1. Objet", body: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site Vyrlo (ci-après « le Service »), proposant des prestations de marketing sur les réseaux sociaux (abonnés, likes, vues, etc.). En accédant au Service, l'utilisateur accepte sans réserve les présentes CGU." },
  { title: "2. Identification de l'éditeur", body: "Le Service est édité par Vyrlo. Pour toute question, vous pouvez nous contacter via la page /pages/contact de notre site." },
  { title: "3. Description des services", body: "Vyrlo propose des services de promotion sur les réseaux sociaux : augmentation du nombre d'abonnés, de likes, de vues, de streams, etc. Les résultats peuvent varier selon la plateforme et le service choisi. Vyrlo ne garantit pas de résultats organiques supplémentaires consécutifs à l'utilisation du Service." },
  { title: "4. Conditions d'accès", body: "L'utilisation du Service nécessite que le compte cible soit public au moment de la commande. Pour les services de likes et vues, la publication concernée doit être accessible. Aucun mot de passe n'est demandé. L'utilisateur est seul responsable des informations fournies." },
  { title: "5. Prix et paiement", body: "Les prix sont indiqués en euros (€) toutes taxes comprises. Le paiement est effectué en ligne, de manière sécurisée, via Shopify Payments. Vyrlo se réserve le droit de modifier ses tarifs à tout moment. Les commandes sont fermes dès validation du paiement." },
  { title: "6. Droit de rétractation", body: "Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour des services pleinement exécutés avant la fin du délai de rétractation. Toutefois, si votre commande n'a pas été exécutée, vous pouvez nous contacter pour un remboursement." },
  { title: "7. Responsabilité", body: "Vyrlo met en œuvre tous les moyens raisonnables pour assurer un service de qualité mais ne peut être tenu responsable des interruptions de service, des modifications de politique des plateformes tierces (Instagram, TikTok, YouTube, etc.) ou des pertes d'abonnés liées aux actions de ces plateformes." },
  { title: "8. Protection des données personnelles (RGPD)", body: "Les données collectées (nom, email, lien de profil) sont utilisées uniquement pour l'exécution de la commande. Elles ne sont jamais revendues. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Exercez ces droits via la page /pages/contact." },
  { title: "9. Politique de remboursement", body: "Si une commande n'est pas livrée dans les délais indiqués, Vyrlo proposera soit un remplacement, soit un remboursement intégral. Toute demande doit être adressée au support dans les 30 jours suivant la commande." },
  { title: "10. Modification des CGU", body: "Vyrlo se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il appartient à l'utilisateur de les consulter régulièrement." },
  { title: "11. Droit applicable", body: "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution sera de la compétence exclusive des tribunaux français." },
];

function htmlFromSections(sections: { title: string; body: string }[]): string {
  return sections.map(s => `<h2>${s.title}</h2>\n<p>${s.body}</p>`).join("\n\n");
}

const PAGES: LegalPage[] = [
  {
    handle: "cgu",
    title: "Conditions Générales d'Utilisation",
    body_html: `<p><em>Dernière mise à jour : avril 2026</em></p>\n\n${htmlFromSections(CGU_SECTIONS)}`,
  },
  {
    handle: "mentions-legales",
    title: "Mentions légales",
    body_html: `
<h2>Éditeur du site</h2>
<p>Le site <strong>vyrlo.fr</strong> est édité par Vyrlo.</p>
<p>Contact : <a href="/pages/contact">formulaire de contact</a></p>
<h2>Hébergement</h2>
<p>Le site est hébergé par <strong>Shopify Inc.</strong>, 150 Elgin Street, Ottawa, Ontario, Canada K2P 1L4.</p>
<h2>Propriété intellectuelle</h2>
<p>L'ensemble des contenus (textes, images, logos, visuels) présents sur le site vyrlo.fr sont la propriété exclusive de Vyrlo, sauf mention contraire. Toute reproduction, modification ou utilisation non autorisée est interdite.</p>
<h2>Données personnelles</h2>
<p>Consultez notre <a href="/pages/confidentialite">politique de confidentialité</a> pour le détail du traitement de vos données.</p>
`.trim(),
  },
  {
    handle: "confidentialite",
    title: "Politique de confidentialité",
    body_html: `
<p><em>Dernière mise à jour : avril 2026</em></p>

<h2>Données collectées</h2>
<p>Lors de votre commande, nous collectons uniquement :</p>
<ul>
  <li>Votre adresse email (pour la confirmation et le suivi)</li>
  <li>Le lien public de votre profil ou publication</li>
  <li>Les informations de paiement (traitées directement par Shopify Payments — nous n'y avons pas accès)</li>
</ul>

<h2>Utilisation</h2>
<p>Ces données sont utilisées exclusivement pour l'exécution de votre commande et le suivi de livraison. Elles ne sont <strong>jamais revendues</strong> à des tiers.</p>

<h2>Sous-traitants techniques</h2>
<p>Pour exécuter votre commande, nous transmettons votre lien public et la quantité commandée à notre prestataire technique (fournisseur SMM). Aucune donnée personnelle (email, nom, paiement) ne lui est transmise.</p>

<h2>Droits RGPD</h2>
<p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données. Exercez ces droits via notre <a href="/pages/contact">page contact</a>.</p>

<h2>Conservation</h2>
<p>Les données de commande sont conservées 3 ans à des fins de comptabilité légale, puis supprimées automatiquement.</p>

<h2>Cookies</h2>
<p>Le site utilise uniquement des cookies techniques nécessaires au bon fonctionnement du panier et du checkout. Aucun cookie publicitaire tiers n'est déposé.</p>
`.trim(),
  },
  {
    handle: "remboursement",
    title: "Politique de remboursement",
    body_html: `
<p>Chez Vyrlo, nous nous engageons à livrer chaque commande dans les délais annoncés. Si ce n'est pas le cas, voici nos garanties :</p>

<h2>Commande non livrée</h2>
<p>Si votre commande n'est pas livrée dans les délais indiqués sur la fiche produit, nous vous proposons au choix :</p>
<ul>
  <li><strong>Un remplacement gratuit</strong> (nouvelle livraison prioritaire)</li>
  <li><strong>Un remboursement intégral</strong> sous 7 jours ouvrés</li>
</ul>

<h2>Commande partiellement livrée</h2>
<p>Si une partie seulement de la quantité commandée a été livrée, nous remboursons au prorata du manquant.</p>

<h2>Chute après livraison</h2>
<p>Les services disposant d'une garantie "refill" bénéficient d'une recharge automatique en cas de chute dans la période indiquée (30, 60, 90 jours ou à vie selon le service).</p>

<h2>Droit de rétractation</h2>
<p>Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour des services <strong>déjà exécutés</strong>. Une commande non encore lancée peut en revanche être annulée et remboursée sur simple demande.</p>

<h2>Comment demander un remboursement</h2>
<p>Contactez-nous via la page <a href="/pages/contact">contact</a> avec votre numéro de commande. Nous traitons toute demande sous 48h ouvrées.</p>
`.trim(),
  },
  {
    handle: "contact",
    title: "Contact",
    body_html: `
<p>Une question, un souci avec une commande, besoin d'un conseil ? Nous répondons rapidement, en français.</p>

<h2>Email</h2>
<p><a href="mailto:tiktok@vyrlo.fr">tiktok@vyrlo.fr</a></p>

<h2>Support 7j/7</h2>
<p>Notre équipe support est disponible 7 jours sur 7. Nous nous engageons à répondre sous 24h ouvrées.</p>

<h2>Pour les demandes de remboursement</h2>
<p>Merci d'indiquer votre numéro de commande Shopify (visible dans l'email de confirmation) pour que nous puissions traiter votre demande rapidement.</p>
`.trim(),
  },
  {
    handle: "a-propos",
    title: "À propos de Vyrlo",
    body_html: `
<p>Vyrlo est un service français de marketing sur les réseaux sociaux. Nous aidons les créateurs, marques et entrepreneurs à développer leur visibilité sur Instagram, TikTok, YouTube, Facebook, Twitter/X, Spotify et Threads.</p>

<h2>Notre promesse</h2>
<ul>
  <li><strong>Livraison progressive et naturelle</strong> — aucun risque de bannissement</li>
  <li><strong>Aucun mot de passe requis</strong> — seulement votre lien public</li>
  <li><strong>Démarrage sous 12h</strong> après validation du paiement</li>
  <li><strong>Support 7j/7 en français</strong></li>
  <li><strong>Remboursement garanti</strong> en cas de non-livraison</li>
</ul>

<h2>Comment ça marche</h2>
<ol>
  <li>Choisissez le service et la quantité</li>
  <li>Collez le lien public de votre profil ou publication</li>
  <li>Payez en toute sécurité via Shopify Payments</li>
  <li>La livraison démarre automatiquement — suivez son avancée par email</li>
</ol>

<h2>Une question ?</h2>
<p><a href="/pages/contact">Contactez-nous</a>, nous répondons sous 24h ouvrées.</p>
`.trim(),
  },
];

interface ShopifyPage { id: number; handle: string; title: string; }

async function main() {
  const existing = await shopify<{ pages: ShopifyPage[] }>("GET", "/pages.json?limit=250");
  const byHandle = new Map(existing.pages.map(p => [p.handle, p]));

  console.log(`→ ${existing.pages.length} pages existantes`);

  for (const page of PAGES) {
    const current = byHandle.get(page.handle);
    if (current) {
      try {
        await shopify("PUT", `/pages/${current.id}.json`, {
          page: { id: current.id, title: page.title, body_html: page.body_html, published: true },
        });
        console.log(`  ↻ /pages/${page.handle} mise à jour`);
      } catch (e) {
        console.error(`  ✗ ${page.handle}: ${e instanceof Error ? e.message : String(e)}`);
      }
    } else {
      try {
        await shopify("POST", "/pages.json", {
          page: { handle: page.handle, title: page.title, body_html: page.body_html, published: true },
        });
        console.log(`  + /pages/${page.handle} créée`);
      } catch (e) {
        console.error(`  ✗ ${page.handle}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }
  console.log("Terminé.");
}
main().catch(e => { console.error(e); process.exit(1); });
