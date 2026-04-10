const WHOP_API_KEY = process.env.WHOP_API_KEY!;
const WHOP_PLAN_ID = process.env.WHOP_PLAN_ID!;

export async function createWhopCheckout({
  orderId,
  amountUsd,
  redirectUrl,
  email,
}: {
  orderId: string;
  amountUsd: number;
  redirectUrl: string;
  email?: string;
}) {
  const res = await fetch("https://api.whop.com/v2/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHOP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plan_id: WHOP_PLAN_ID,
      price: {
        initial_price: Math.round(amountUsd * 100), // centimes
        plan_type: "one_time",
      },
      redirect_url: redirectUrl,
      metadata: { order_id: orderId },
      ...(email && { prefill_email: email }),
    }),
  });

  return res.json() as Promise<{ purchase_url?: string; error?: string }>;
}
