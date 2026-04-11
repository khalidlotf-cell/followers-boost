import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlatform } from "@/lib/catalog";
import { requireAdminAuth } from "@/lib/adminAuth";

// GET /api/admin/link-service?platform=instagram&group=abonnes&q=france
// Retourne les services du fournisseur correspondant à la plateforme+groupe, filtrés par recherche
export async function GET(req: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const { searchParams } = req.nextUrl;
  const platformSlug = searchParams.get("platform") ?? "";
  const groupSlug    = searchParams.get("group") ?? "";
  const q            = (searchParams.get("q") ?? "").toLowerCase().trim();

  const platform = getPlatform(platformSlug);
  if (!platform) return NextResponse.json({ error: "Plateforme introuvable" }, { status: 404 });

  const svcDef = platform.services.find(s => s.slug === groupSlug);
  if (!svcDef) return NextResponse.json({ error: "Groupe introuvable" }, { status: 404 });

  // Récupère tous les services (actifs ou non) correspondant à platform+groupe
  const all = await prisma.service.findMany({
    orderBy: [{ active: "desc" }, { ourRate: "asc" }],
  });

  const matched = all.filter(s => {
    const haystack = (s.category + " " + s.name).toLowerCase();
    // Doit correspondre à la plateforme
    const isPlatform = haystack.includes(platformSlug) || haystack.includes(platform.label.toLowerCase());
    if (!isPlatform) return false;
    // Doit avoir les keywords du groupe
    const hasKeyword = svcDef.keywords.some(k => haystack.includes(k));
    if (!hasKeyword) return false;
    const isExcluded = svcDef.excludeKeywords.some(k => haystack.includes(k));
    if (isExcluded) return false;
    // Filtre par recherche si fournie
    if (q && !haystack.includes(q)) return false;
    return true;
  });

  return NextResponse.json(matched.slice(0, 50));
}

// POST /api/admin/link-service
// { serviceId, platformSlug, groupSlug, targeting }
// Lie le service au type+ciblage (désactive les autres du même type+ciblage, active celui-ci)
export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const { serviceId, platformSlug, groupSlug, targeting } = await req.json();

    const platform = getPlatform(platformSlug);
    if (!platform) return NextResponse.json({ error: "Plateforme introuvable" }, { status: 404 });

    const svcDef = platform.services.find(s => s.slug === groupSlug);
    if (!svcDef) return NextResponse.json({ error: "Groupe introuvable" }, { status: 404 });

    // Trouve tous les services correspondant à platform+groupe
    const all = await prisma.service.findMany();
    const sameGroup = all.filter(s => {
      const haystack = (s.category + " " + s.name).toLowerCase();
      const isPlatform = haystack.includes(platformSlug) || haystack.includes(platform.label.toLowerCase());
      if (!isPlatform) return false;
      const hasKeyword = svcDef.keywords.some(k => haystack.includes(k));
      if (!hasKeyword) return false;
      return !svcDef.excludeKeywords.some(k => haystack.includes(k));
    });

    // Désactive ceux qui ont le même ciblage (pour éviter les doublons)
    const toDeactivate = sameGroup
      .filter(s => s.id !== serviceId && s.targeting === targeting && s.active);

    for (const s of toDeactivate) {
      await prisma.service.update({ where: { id: s.id }, data: { active: false } });
    }

    // Active le service choisi avec le bon ciblage
    const updated = await prisma.service.update({
      where: { id: serviceId },
      data: { active: true, targeting },
    });

    return NextResponse.json({ ok: true, service: updated, deactivated: toDeactivate.length });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
