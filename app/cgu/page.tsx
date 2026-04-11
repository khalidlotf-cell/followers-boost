import Link from "next/link";
import Footer from "../boutique/_components/Footer";

export const metadata = {
  title: "CGU — Zylis",
  description: "Conditions Générales d'Utilisation de Zylis.",
};

export default function CGUPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Simple header */}
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>Z</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#111" }}>Zylis</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: "#888", textDecoration: "none" }}>← Retour</Link>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 780, margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Légal</p>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.025em", marginBottom: 8 }}>
          Conditions Générales d&apos;Utilisation
        </h1>
        <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 56 }}>Dernière mise à jour : avril 2026</p>

        {[
          {
            title: "1. Objet",
            body: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site Zylis (ci-après « le Service »), proposant des prestations de marketing sur les réseaux sociaux (abonnés, likes, vues, etc.). En accédant au Service, l'utilisateur accepte sans réserve les présentes CGU.",
          },
          {
            title: "2. Identification de l'éditeur",
            body: "Le Service est édité par Zylis. Pour toute question, vous pouvez nous contacter via la page /contact de notre site.",
          },
          {
            title: "3. Description des services",
            body: "Zylis propose des services de promotion sur les réseaux sociaux : augmentation du nombre d'abonnés, de likes, de vues, de streams, etc. Les résultats peuvent varier selon la plateforme et le service choisi. Zylis ne garantit pas de résultats organiques supplémentaires consécutifs à l'utilisation du Service.",
          },
          {
            title: "4. Conditions d'accès",
            body: "L'utilisation du Service nécessite que le compte cible soit public au moment de la commande. Pour les services de likes et vues, la publication concernée doit être accessible. Aucun mot de passe n'est demandé. L'utilisateur est seul responsable des informations fournies.",
          },
          {
            title: "5. Prix et paiement",
            body: "Les prix sont indiqués en euros (€) toutes taxes comprises. Le paiement est effectué en ligne, de manière sécurisée. Zylis se réserve le droit de modifier ses tarifs à tout moment. Les commandes sont fermes dès validation du paiement.",
          },
          {
            title: "6. Droit de rétractation",
            body: "Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour des services pleinement exécutés avant la fin du délai de rétractation. Toutefois, si votre commande n'a pas été exécutée, vous pouvez nous contacter pour un remboursement.",
          },
          {
            title: "7. Responsabilité",
            body: "Zylis met en œuvre tous les moyens raisonnables pour assurer un service de qualité mais ne peut être tenu responsable des interruptions de service, des modifications de politique des plateformes tierces (Instagram, TikTok, YouTube, etc.) ou des pertes d'abonnés liées aux actions de ces plateformes.",
          },
          {
            title: "8. Protection des données personnelles (RGPD)",
            body: "Les données collectées (nom, email, lien de profil) sont utilisées uniquement pour l'exécution de la commande. Elles ne sont jamais revendues. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Exercez ces droits via /contact.",
          },
          {
            title: "9. Politique de remboursement",
            body: "Si une commande n'est pas livrée dans les délais indiqués, Zylis proposera soit un remplacement, soit un remboursement intégral. Toute demande doit être adressée au support dans les 30 jours suivant la commande.",
          },
          {
            title: "10. Modification des CGU",
            body: "Zylis se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il appartient à l'utilisateur de les consulter régulièrement.",
          },
          {
            title: "11. Droit applicable",
            body: "Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou leur exécution sera de la compétence exclusive des tribunaux français.",
          },
        ].map((section, i) => (
          <section key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 12, letterSpacing: "-0.01em" }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.8 }}>{section.body}</p>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
