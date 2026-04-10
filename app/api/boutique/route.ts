import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CATALOG } from "@/lib/catalog";

// Retourne les plateformes du catalogue qui ont au moins 1 service actif
export async function GET() {
  const services = await prisma.service.findMany({
    where: { active: true },
    select: { category: true, name: true },
  });

  const result = CATALOG.map(platform => {
    const count = services.filter(s => {
      const haystack = (s.category + " " + s.name).toLowerCase();
      return haystack.includes(platform.slug) ||
        haystack.includes(platform.label.toLowerCase().split("/")[0].trim());
    }).length;
    return { ...platform, count, services: undefined };
  }).filter(p => p.count > 0);

  return NextResponse.json(result);
}
