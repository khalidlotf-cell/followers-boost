import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(services);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 403 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    // Mise à jour en masse : { ids: number[], active: boolean }
    if (body.ids && Array.isArray(body.ids)) {
      await prisma.service.updateMany({
        where: { id: { in: body.ids } },
        data: { active: body.active },
      });
      return NextResponse.json({ updated: body.ids.length });
    }

    // Mise à jour individuelle : { id, ourRate?, active?, targeting?, platformSlug?, groupSlug? }
    const { id, ourRate, active, targeting, platformSlug, groupSlug } = body;
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(ourRate !== undefined && { ourRate }),
        ...(active !== undefined && { active }),
        ...(targeting !== undefined && { targeting }),
        ...(platformSlug !== undefined && { platformSlug }),
        ...(groupSlug !== undefined && { groupSlug }),
      },
    });
    return NextResponse.json(service);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
