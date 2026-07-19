"use client";

import { CartProvider } from "@/context/cart-context";
import { CurrencyProvider } from "@/context/currency-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CurrencyProvider><CartProvider>{children}</CartProvider></CurrencyProvider>;
}
