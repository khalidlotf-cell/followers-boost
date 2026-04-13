"use client";
import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  serviceId: number;
  serviceName: string;
  platform: string;
  platformLabel: string;
  groupLabel: string;
  link: string;
  quantity: number;
  price: number;
}

const CART_KEY = "vyrlo_cart";
const CART_EVENT = "vyrlo_cart_updated";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]"); }
  catch { return []; }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: Omit<CartItem, "id">) {
  writeCart([...readCart(), { ...item, id: crypto.randomUUID() }]);
}

export function removeFromCart(id: string) {
  writeCart(readCart().filter(i => i.id !== id));
}

export function clearCart() {
  writeCart([]);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    const sync = () => setItems(readCart());
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return {
    items,
    count: items.length,
    total: items.reduce((s, i) => s + i.price, 0),
    add: (item: Omit<CartItem, "id">) => addToCart(item),
    remove: (id: string) => removeFromCart(id),
    clear: clearCart,
  };
}
