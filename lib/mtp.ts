import { env } from "./env";

/**
 * Client pour le fournisseur SMM MTP (morethanpanel.com).
 * NB : historiquement ce fichier s'appelait `jap.ts` ; on a standardisé sur
 * "mtp" (le vrai nom du provider).
 */

const MTP_URL = "https://morethanpanel.com/api/v2";

async function mtpPost(params: Record<string, string>) {
  const body = new URLSearchParams({ key: env().MTP_API_KEY, ...params });
  const res = await fetch(MTP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return res.json();
}

export async function mtpGetServices() {
  return mtpPost({ action: "services" });
}

export async function mtpAddOrder(service: number, link: string, quantity: number) {
  return mtpPost({
    action: "add",
    service: String(service),
    link,
    quantity: String(quantity),
  });
}

export async function mtpGetOrderStatus(orderId: number) {
  return mtpPost({ action: "status", order: String(orderId) });
}

export async function mtpGetMultipleStatus(orderIds: number[]) {
  return mtpPost({ action: "status", orders: orderIds.join(",") });
}

export async function mtpRefillOrder(orderId: number) {
  return mtpPost({ action: "refill", order: String(orderId) });
}

export async function mtpCancelOrders(orderIds: number[]) {
  return mtpPost({ action: "cancel", orders: orderIds.join(",") });
}

export async function mtpGetBalance() {
  return mtpPost({ action: "balance" });
}
