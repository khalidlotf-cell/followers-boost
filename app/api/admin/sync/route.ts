import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { japGetServices } from "@/lib/jap";

export const maxDuration = 60; // Vercel Pro allows up to 60s, free tier 10s

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const markup: number = parseFloat(body.markup) || 2;
    const recalculate: boolean = body.recalculate === true;

    if (recalculate) {
      const all = await prisma.service.findMany({ select: { id: true, rate: true } });
      // Batch update in chunks of 50
      const chunks = [];
      for (let i = 0; i < all.length; i += 50) chunks.push(all.slice(i, i + 50));
      for (const chunk of chunks) {
        await Promise.all(chunk.map(s =>
          prisma.service.update({
            where: { id: s.id },
            data: { ourRate: parseFloat((s.rate * markup).toFixed(4)) },
          })
        ));
      }
      return NextResponse.json({ recalculated: all.length });
    }

    const japServices = await japGetServices();
    if (!Array.isArray(japServices)) {
      return NextResponse.json({ error: "Erreur API fournisseur: " + JSON.stringify(japServices) }, { status: 502 });
    }

    // Filter valid services
    const valid = japServices.filter(s => {
      const rate = parseFloat(s.rate);
      return !isNaN(rate) && rate > 0 && rate <= 500;
    });

    // Detect targeting from name
    function getTargeting(name: string, category: string) {
      const text = (name + " " + category).toLowerCase();
      if (text.includes("france") || text.includes("french") || text.includes("🇫🇷") || text.includes("francophone")) return "france";
      if (text.includes("europe") || text.includes("european") || text.includes("🇪🇺")) return "europe";
      return "world";
    }

    // Get existing service IDs
    const existingIds = new Set(
      (await prisma.service.findMany({ select: { id: true } })).map(s => s.id)
    );

    const toCreate = valid.filter(s => !existingIds.has(s.service));
    const toUpdate = valid.filter(s => existingIds.has(s.service));

    // Batch create new services in chunks of 100
    const createChunks = [];
    for (let i = 0; i < toCreate.length; i += 100) createChunks.push(toCreate.slice(i, i + 100));
    for (const chunk of createChunks) {
      await prisma.service.createMany({
        data: chunk.map(s => ({
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
        skipDuplicates: true,
      });
    }

    // Batch update existing in chunks of 20
    const updateChunks = [];
    for (let i = 0; i < toUpdate.length; i += 20) updateChunks.push(toUpdate.slice(i, i + 20));
    for (const chunk of updateChunks) {
      await Promise.all(chunk.map(s =>
        prisma.service.update({
          where: { id: s.service },
          data: {
            name: s.name,
            type: s.type ?? "Default",
            category: s.category,
            rate: parseFloat(s.rate),
            min: parseInt(s.min),
            max: parseInt(s.max),
            refill: s.refill ?? false,
            cancel: s.cancel ?? false,
            targeting: getTargeting(s.name, s.category),
          },
        })
      ));
    }

    return NextResponse.json({ created: toCreate.length, updated: toUpdate.length, total: valid.length });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur serveur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
