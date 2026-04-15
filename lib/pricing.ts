export const MAX_CHARGE_EUR = 1000;

export function computeCharge(quantity: number, ourRate: number): number {
  return parseFloat(((quantity / 1000) * ourRate).toFixed(2));
}

export function assertChargeWithinLimit(charge: number): void {
  if (!Number.isFinite(charge) || charge <= 0 || charge > MAX_CHARGE_EUR) {
    throw new Error(`Montant hors limites (max ${MAX_CHARGE_EUR}€)`);
  }
}
