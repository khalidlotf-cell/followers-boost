"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: "◈" },
  { href: "/admin/services", label: "Services", icon: "⊞" },
  { href: "/admin/commandes", label: "Commandes", icon: "≡" },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: "◉" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#111118" }}>
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: "#1a1a24", borderRight: "1px solid #2e2e3e" }}>
        <div className="px-4 py-5 flex items-center gap-2 border-b" style={{ borderColor: "#2e2e3e" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#7c3aed" }}>
            <span className="text-white font-bold text-xs">FB</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Followers Boost</div>
            <div className="text-xs" style={{ color: "#7c3aed" }}>Admin</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? "#2e1f5e" : "transparent",
                  color: active ? "#a78bfa" : "#9ca3af",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t" style={{ borderColor: "#2e2e3e" }}>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1" style={{ color: "#9ca3af" }}>
            ← Mode client
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-red-900/20" style={{ color: "#f87171" }}>
            ⎋ Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
