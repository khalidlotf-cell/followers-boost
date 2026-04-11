import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { japGetServices } from "@/lib/jap";
import { requireAdminAuth } from "@/lib/adminAuth";

function getTargeting(name: string, category: string) {
  const text = (name + " " + category).toLowerCase();
  if (text.includes("france") || text.includes("french") || text.includes("🇫🇷") || text.includes("francophone")) return "france";
  if (text.includes("europe") || text.includes("european") || text.includes("🇪🇺")) return "europe";
  return "world";
}

export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const body = await req.json().catch(() => ({}));
    const markup: number = parseFloat(body.markup) || 2;
    const recalculate: boolean = body.recalculate === true;

    // Recalculate prices only — no API call needed
    if (recalculate) {
      const all = await prisma.service.findMany({ select: { id: true, rate: true } });
      // Single batch using Promise.all in groups of 50
      for (let i = 0; i < all.length; i += 50) {
        await Promise.all(
          all.slice(i, i + 50).map(s =>
            prisma.service.update({
              where: { id: s.id },
              data: { ourRate: parseFloat((s.rate * markup).toFixed(4)) },
            })
          )
        );
      }
      return NextResponse.json({ recalculated: all.length });
    }

    // Fetch services from provider
    const japServices = await japGetServices();
    if (!Array.isArray(japServices)) {
      return NextResponse.json(
        { error: "Réponse inattendue du fournisseur: " + JSON.stringify(japServices).slice(0, 200) },
        { status: 502 }
      );
    }

    // Filter valid services (skip separators with aberrant rates)
    const valid = japServices.filter(s => {
      const rate = parseFloat(s.rate);
      return !isNaN(rate) && rate > 0 && rate <= 500;
    });

    // Single createMany — PostgreSQL handles 4000+ rows in one query, fast
    const result = await prisma.service.createMany({
      data: valid.map(s => ({
        id: s.service,
        name: s.name,
        type: s.type ?? "Default",
        category: s.category,
        rate: parseFloat(s.rate),
        ourRate: parseFloat((parseFloat(s.rate) * markup).toFixed(4)),
        min: parseInt(s.min),
        max: parseInt(s.max),
        refill: s.refill ?? false,
        cancel: s.cancel ?? false,
        targeting: getTargeting(s.name, s.category),
        active: false,
      })),
      skipDuplicates: true, // only insert new ones
    });

    return NextResponse.json({
      created: result.count,
      total: valid.length,
      skipped: valid.length - result.count,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
