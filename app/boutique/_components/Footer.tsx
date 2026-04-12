"use client";
import Link from "next/link";
import Image from "next/image";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Instagram", href: "/boutique/instagram" },
      { label: "TikTok",    href: "/boutique/tiktok" },
      { label: "YouTube",   href: "/boutique/youtube" },
      { label: "Facebook",  href: "/boutique/facebook" },
      { label: "Spotify",   href: "/boutique/spotify" },
      { label: "X / Twitter", href: "/boutique/twitter" },
      { label: "Threads",   href: "/boutique/threads" },
    ],
  },
  {
    title: "Compte",
    links: [
      { label: "Connexion",      href: "/connexion" },
      { label: "Inscription",    href: "/inscription" },
      { label: "Mes commandes",  href: "/dashboard/commandes" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "FAQ",     href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "CGU",     href: "/cgu" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#06040f", padding: "56px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          marginBottom: 48,
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <Image src="/logo-dark.png" alt="Vyrlo" width={110} height={44} style={{ objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.75, maxWidth: 240 }}>
              Services SMM premium pour booster votre présence sur les réseaux sociaux.
            </p>
          </div>

          {/* Columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <div key={l.label} style={{ marginBottom: 10 }}>
                  <Link href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} Vyrlo. Tous droits réservés.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["Visa", "MC", "CB", "PayPal"].map(m => (
              <span key={m} style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "4px 9px", letterSpacing: "0.02em" }}>
                {m}
              </span>
            ))}
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginLeft: 4 }}>· SSL</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  );
}
