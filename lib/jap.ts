const JAP_URL = "https://morethanpanel.com/api/v2";
const JAP_KEY = process.env.MTP_API_KEY!;

async function japPost(params: Record<string, string>) {
  const body = new URLSearchParams({ key: JAP_KEY, ...params });
  const res = await fetch(JAP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return res.json();
}

export async function japGetServices() {
  return japPost({ action: "services" });
}

export async function japAddOrder(
  service: number,
  link: string,
  quantity: number
) {
  return japPost({
    action: "add",
    service: String(service),
    link,
    quantity: String(quantity),
  });
}

export async function japGetOrderStatus(orderId: number) {
  return japPost({ action: "status", order: String(orderId) });
}

export async function japGetMultipleStatus(orderIds: number[]) {
  return japPost({ action: "status", orders: orderIds.join(",") });
}

export async function japRefillOrder(orderId: number) {
  return japPost({ action: "refill", order: String(orderId) });
}

export async function japCancelOrders(orderIds: number[]) {
  return japPost({ action: "cancel", orders: orderIds.join(",") });
}

export async function japGetBalance() {
  return japPost({ action: "balance" });
}
