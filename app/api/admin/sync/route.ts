import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { japGetServices } from "@/lib/jap";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const markup: number = parseFloat(body.markup) || 2;
    const recalculate: boolean = body.recalculate === true;

    // Mode recalculate uniquement : applique markup × rate sur tous les services sans re-sync JAP
    if (recalculate) {
      const all = await prisma.service.findMany({ select: { id: true, rate: true } });
      for (const s of all) {
        await prisma.service.update({
          where: { id: s.id },
          data: { ourRate: parseFloat((s.rate * markup).toFixed(4)) },
        });
      }
      return NextResponse.json({ recalculated: all.length });
    }

    // Sync JAP
    const japServices = await japGetServices();
    if (!Array.isArray(japServices)) {
      return NextResponse.json({ error: "Erreur JAP API" }, { status: 502 });
    }

    let created = 0;
    let updated = 0;

    for (const s of japServices) {
      const rate = parseFloat(s.rate);

      // Ignorer les séparateurs de catégorie (taux aberrants)
      if (rate > 500 || isNaN(rate) || rate <= 0) continue;

      // Détecter le ciblage géographique depuis le nom du service
      const nameLower = (s.name + " " + s.category).toLowerCase();
      let targeting = "world";
      if (nameLower.includes("france") || nameLower.includes("french") || nameLower.includes("🇫🇷") || nameLower.includes("francophone")) {
        targeting = "france";
      } else if (nameLower.includes("europe") || nameLower.includes("european") || nameLower.includes("🇪🇺")) {
        targeting = "europe";
      }
      const existing = await prisma.service.findUnique({ where: { id: s.service } });

      if (existing) {
        // Préserve ourRate (prix manuel) — seules les métadonnées JAP sont mises à jour
        await prisma.service.update({
          where: { id: s.service },
          data: {
            name: s.name,
            type: s.type,
            category: s.category,
            rate,
            min: parseInt(s.min),
            max: parseInt(s.max),
            refill: s.refill,
            cancel: s.cancel,
            targeting,
          },
        });
        updated++;
      } else {
        // Nouveau service : applique le markup par défaut
        await prisma.service.create({
          data: {
            id: s.service,
            name: s.name,
            type: s.type,
            category: s.category,
            rate,
            ourRate: parseFloat((rate * markup).toFixed(4)),
            min: parseInt(s.min),
            max: parseInt(s.max),
            refill: s.refill,
            cancel: s.cancel,
            targeting,
            active: false,
          },
        });
        created++;
      }
    }

    return NextResponse.json({ created, updated, total: japServices.length });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    const status = msg === "Accès refusé" ? 403 : msg === "Non authentifié" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
