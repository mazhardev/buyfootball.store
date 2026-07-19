"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/types/commerce";

interface CartValue {
  items: CartItem[];
  ready: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalUsd: number;
}
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("bfs-cart");
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch { window.localStorage.removeItem("bfs-cart"); }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (ready) window.localStorage.setItem("bfs-cart", JSON.stringify(items)); }, [items, ready]);
  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.lineId === item.lineId);
      return existing ? current.map((entry) => entry.lineId === item.lineId ? { ...entry, quantity: Math.min(99, entry.quantity + item.quantity) } : entry) : [...current, item];
    });
    setDrawerOpen(true);
  }, []);
  const removeItem = useCallback((lineId: string) => setItems((current) => current.filter((item) => item.lineId !== lineId)), []);
  const updateQuantity = useCallback((lineId: string, quantity: number) => setItems((current) => quantity < 1 ? current.filter((item) => item.lineId !== lineId) : current.map((item) => item.lineId === lineId ? { ...item, quantity: Math.min(99, quantity) } : item)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalUsd = items.reduce((total, item) => total + item.priceUsd * item.quantity, 0);
  return <CartContext.Provider value={{ items, ready, drawerOpen, setDrawerOpen, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotalUsd }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
