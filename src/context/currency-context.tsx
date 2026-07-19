"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { currencies, type Currency } from "@/types/commerce";
import { convertFromUsd, formatCurrency } from "@/lib/commerce";

interface CurrencyValue { currency: Currency; setCurrency: (currency: Currency) => void; displayPrice: (usd: number) => string; convert: (usd: number) => number }
const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("bfs-currency");
      if (currencies.includes(saved as Currency)) setCurrencyState(saved as Currency);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const setCurrency = (next: Currency) => { setCurrencyState(next); window.localStorage.setItem("bfs-currency", next); };
  const value = useMemo(() => ({ currency, setCurrency, convert: (usd: number) => convertFromUsd(usd, currency), displayPrice: (usd: number) => formatCurrency(convertFromUsd(usd, currency), currency) }), [currency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) throw new Error("useCurrency must be used within CurrencyProvider");
  return value;
}
