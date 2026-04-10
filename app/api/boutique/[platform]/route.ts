import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlatform } from "@/lib/catalog";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/boutique/[platform]">
) {
  const { platform: platformSlug } = await ctx.params;

  const platform = getPlatform(platformSlug);
  if (!platform) {
    return NextResponse.json({ error: "Plateforme introuvable" }, { status: 404 });
  }

  const allActive = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ ourRate: "asc" }],
  });

  // Grouper selon les types définis dans le catalogue
  const groups = platform.services.map(svcDef => {
    // 1. Services assignés manuellement (priorité)
    const explicit = allActive.filter(s =>
      s.platformSlug === platformSlug && s.groupSlug === svcDef.slug
    );

    // 2. Si aucun explicite, fallback par mots-clés
    const byKeyword = explicit.length === 0 ? allActive.filter(s => {
      if (s.platformSlug && s.groupSlug) return false; // déjà assigné ailleurs
      const haystack = (s.category + " " + s.name).toLowerCase();
      const isPlatform = haystack.includes(platformSlug) ||
        haystack.includes(platform.label.toLowerCase().split("/")[0].trim());
      if (!isPlatform) return false;
      const hasKeyword = svcDef.keywords.some(k => haystack.includes(k));
      if (!hasKeyword) return false;
      return !svcDef.excludeKeywords.some(k => haystack.includes(k));
    }) : [];

    const items = explicit.length > 0 ? explicit : byKeyword;
    return { slug: svcDef.slug, label: svcDef.label, icon: svcDef.icon, items };
  }).filter(g => g.items.length > 0);

  return NextResponse.json({ platform, groups });
}
