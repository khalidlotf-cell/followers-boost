"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Platform { slug: string; label: string; emoji: string; count: number }

function PlatformIcon({ slug, size = 16 }: { slug: string; size?: number }) {
  const s = size;
  const base: React.CSSProperties = { display: "inline-block", verticalAlign: "middle", flexShrink: 0 };
  if (slug === "instagram") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={base}>
      <defs><radialGradient id="nig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="10%" stopColor="#fdf497"/><stop offset="50%" stopColor="#fd5949"/><stop offset="68%" stopColor="#d6249f"/><stop offset="100%" stopColor="#285AEB"/></radialGradient></defs>
      <rect width="24" height="24" rx="6" fill="url(#nig)"/>
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.8" fill="none"/>
    </svg>
  );
  if (slug === "tiktok") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#010101"/>
      <path d="M16.6 5.82a4.02 4.02 0 0 1-.77-2.32h-2.62v10.4c-.05 1.06-.92 1.9-2 1.9a2 2 0 0 1-2-2 2 2 0 0 1 2-2c.2 0 .38.03.56.08V9.2a4.63 4.63 0 0 0-.56-.04 4.62 4.62 0 0 0-4.62 4.62 4.62 4.62 0 0 0 4.62 4.62 4.62 4.62 0 0 0 4.62-4.62V9.22A6.6 6.6 0 0 0 19.5 10V7.4a4.03 4.03 0 0 1-2.9-1.58z" fill="white"/>
    </svg>
  );
  if (slug === "youtube") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#FF0000"/>
      <path d="M21.8 8.04s-.2-1.4-.8-2c-.78-.82-1.65-.82-2.04-.87C16.4 5 12 5 12 5s-4.4 0-6.96.17c-.4.05-1.26.05-2.04.87-.6.6-.8 2-.8 2S2 9.6 2 11.16v1.5c0 1.57.2 3.13.2 3.13s.2 1.4.8 2c.78.82 1.8.8 2.26.88C6.8 18.86 12 18.9 12 18.9s4.4 0 6.96-.2c.4-.05 1.26-.06 2.04-.88.6-.6.8-2 .8-2S22 14.23 22 12.66v-1.5c0-1.57-.2-3.12-.2-3.12zM9.75 14.85V9.05l5.5 2.9-5.5 2.9z" fill="white"/>
    </svg>
  );
  if (slug === "facebook") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#1877F2"/>
      <path d="M16 3.5h-2.5A4.5 4.5 0 0 0 9 8v2.5H6.5V14H9v7h3.5v-7h2.5l.5-3.5H12.5V8a1 1 0 0 1 1-1H16V3.5z" fill="white"/>
    </svg>
  );
  if (slug === "twitter" || slug === "x") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M14.6 18.4 5.1 5.6H9.4l9.5 12.8h-4.3zM3.6 5.6l6.1 8.1L3.7 20H5.7l4.5-5.7 4.5 5.7h4.1l-6.4-8.5L18.3 4h-2.1L12 9.3 7.8 4H3.7z" fill="white"/>
    </svg>
  );
  if (slug === "spotify") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#1DB954"/>
      <path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm3.67 11.57a.5.5 0 0 1-.69.16c-1.88-1.15-4.25-1.41-7.04-.77a.5.5 0 1 1-.22-.97c3.05-.7 5.67-.4 7.79.9a.5.5 0 0 1 .16.68zm.98-2.18a.62.62 0 0 1-.86.2c-2.15-1.32-5.43-1.7-7.97-.93a.63.63 0 0 1-.37-1.2c2.9-.88 6.5-.45 8.97 1.06a.63.63 0 0 1 .23.87zm.08-2.27C14.1 9.55 10.1 9.42 7.58 10.2a.75.75 0 0 1-.43-1.43c2.9-.87 7.3-.7 10.18 1.1a.75.75 0 1 1-.6 1.25z" fill="white"/>
    </svg>
  );
  if (slug === "threads") return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={base}>
      <rect width="24" height="24" rx="6" fill="#000"/>
      <path d="M16.27 11.43c-.1-.05-.21-.09-.32-.13-.19-2.52-1.51-3.96-3.82-3.97h-.04c-1.38 0-2.53.59-3.23 1.66l1.31.9c.53-.8 1.35-.97 1.92-.97h.03c.74 0 1.3.22 1.67.65.26.3.44.72.52 1.25a8.3 8.3 0 0 0-2.13-.1c-2.14.12-3.52 1.35-3.42 3.06.05.87.5 1.62 1.26 2.1.64.4 1.47.6 2.33.56 1.14-.06 2.03-.5 2.65-1.3.47-.62.77-1.43.9-2.45.54.32.94.74 1.17 1.25.38.84.4 2.21-.78 3.39-1.02 1.02-2.25 1.46-4.1 1.47-2.06-.01-3.62-.68-4.63-1.97-.95-1.22-1.44-2.98-1.46-5.23.02-2.25.51-4.01 1.46-5.23 1.01-1.3 2.57-1.96 4.63-1.97 2.07.01 3.64.67 4.67 1.98.5.64.88 1.43 1.12 2.35l1.54-.41c-.29-1.14-.77-2.12-1.43-2.93-1.32-1.68-3.28-2.55-5.9-2.56h-.01c-2.61.01-4.56.88-5.81 2.6-1.1 1.53-1.67 3.62-1.7 6.23.03 2.6.6 4.7 1.7 6.23 1.25 1.72 3.2 2.59 5.81 2.6h.02c2.34-.01 3.99-.63 5.35-1.99 1.78-1.77 1.72-3.98 1.14-5.34-.41-.93-1.18-1.68-2.26-2.22zm-4.04 3.83c-.94.05-1.91-.37-1.95-1.28-.03-.66.47-1.4 1.97-1.49.17-.01.34-.02.5-.02.57 0 1.1.06 1.59.17-.18 2.25-1.18 2.58-2.11 2.62z" fill="white"/>
    </svg>
  );
  return null;
}

export { PlatformIcon };

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; balance: number; role: string } | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => setUser(d.user));
    fetch("/api/boutique").then(r => r.json()).then(d => setPlatforms(Array.isArray(d) ? d.slice(0, 7) : []));
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, []);

  async function logout() {
    await fetch("/api/auth/deconnexion", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <nav style={{
        position: "fixed", top: "0", left: "0", right: "0", zIndex: 200,
        background: scrolled || menuOpen ? "rgba(255,255,255,0.98)" : "#fff",
        borderBottom: "1.5px solid #ebebeb",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        transition: "background 0.2s",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>

          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo-light.png" alt="Vyrlo" width={100} height={40} style={{ objectFit: "contain" }} priority />
          </Link>

          {/* Desktop platform links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {platforms.map(p => (
              <Link key={p.slug} href={`/boutique/${p.slug}`}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 500, color: "#555", textDecoration: "none", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#111")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}
              >
                <PlatformIcon slug={p.slug} />
                {p.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link href="/admin" style={{ fontSize: 13, fontWeight: 600, color: "#888", textDecoration: "none", padding: "5px 13px", border: "1.5px solid #ddd", borderRadius: 100 }}>Admin</Link>
                )}
                <Link href="/dashboard/commandes" style={{ fontSize: 13.5, fontWeight: 500, color: "#555", textDecoration: "none" }}>Mes commandes</Link>
                <button onClick={logout} style={{ fontSize: 13.5, color: "#999", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/connexion" style={{ fontSize: 13.5, fontWeight: 500, color: "#555", textDecoration: "none" }}>Connexion</Link>
                <Link href="/inscription" style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", textDecoration: "none", background: "#111", padding: "8px 18px", borderRadius: 100 }}>S&apos;inscrire</Link>
              </>
            )}
          </div>

          {/* Mobile right side */}
          <div className="nav-mobile" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!user ? (
              <Link href="/connexion" style={{ fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none", background: "#111", padding: "7px 16px", borderRadius: 100 }}>
                Connexion
              </Link>
            ) : (
              <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>
                {user.name?.split(" ")[0]}
              </span>
            )}
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ width: 38, height: 38, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: "none", border: "1.5px solid #e8e8e8", borderRadius: 10, cursor: "pointer", padding: 0 }}>
              <span style={{ display: "block", width: 18, height: 1.5, background: menuOpen ? "#111" : "#555", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(0, 4.5px)" : "none" }} />
              <span style={{ display: "block", width: 18, height: 1.5, background: "#555", borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "opacity 0.15s" }} />
              <span style={{ display: "block", width: 18, height: 1.5, background: menuOpen ? "#111" : "#555", borderRadius: 2, transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(0, -4.5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div style={{ borderTop: "1.5px solid #f0f0f0", background: "#fff", padding: "16px 20px 24px" }}>

            {/* Platforms grid */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Plateformes</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {platforms.map(p => (
                  <Link key={p.slug} href={`/boutique/${p.slug}`}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "#f8f8f8", textDecoration: "none", color: "#111", fontWeight: 600, fontSize: 14 }}>
                    <PlatformIcon slug={p.slug} size={20} />
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth section */}
            <div style={{ borderTop: "1.5px solid #f0f0f0", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {user ? (
                <>
                  {user.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setMenuOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: "#f0ebff", color: "#7c3aed", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                      ⚙ Admin
                    </Link>
                  )}
                  <Link href="/dashboard/commandes" onClick={() => setMenuOpen(false)}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: "#f8f8f8", color: "#111", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
                    📦 Mes commandes
                  </Link>
                  <button onClick={logout}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 12, background: "#fff5f5", color: "#e84e4e", fontWeight: 500, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    ← Déconnexion
                  </button>
                </>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Link href="/connexion" onClick={() => setMenuOpen(false)}
                    style={{ padding: "13px", borderRadius: 12, border: "1.5px solid #e8e8e8", color: "#111", fontWeight: 600, fontSize: 14, textAlign: "center", textDecoration: "none" }}>
                    Connexion
                  </Link>
                  <Link href="/inscription" onClick={() => setMenuOpen(false)}
                    style={{ padding: "13px", borderRadius: 12, background: "#111", color: "#fff", fontWeight: 600, fontSize: 14, textAlign: "center", textDecoration: "none" }}>
                    S&apos;inscrire
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none !important; }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
