import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://justanotherpanel.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ key: process.env.JAP_API_KEY!, action: "balance" }),
    });
    const data = await res.json();
    return NextResponse.json({ balance: data.balance, currency: data.currency });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
