import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";
import { mtpGetBalance } from "@/lib/mtp";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  try {
    const data = await mtpGetBalance();
    return NextResponse.json({ balance: data.balance, currency: data.currency });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    console.error(`ADMIN_BALANCE_ERROR | ${msg}`);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
