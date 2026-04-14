import { loadStripe, type Stripe } from "@stripe/stripe-js";

let _stripePromise: Promise<Stripe | null> | null = null;

export function getStripeClient() {
  if (!_stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY manquant");
    }
    _stripePromise = loadStripe(key.trim());
  }
  return _stripePromise;
}
