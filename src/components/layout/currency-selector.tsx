"use client";

import { useCurrency } from "@/context/currency-context";
import { currencies, type Currency } from "@/types/commerce";

export function CurrencySelector({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  return <label className="currency-control"><span className={compact ? "sr-only" : "currency-label"}>Display currency</span><select aria-label="Display currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>{currencies.map((item) => <option key={item}>{item}</option>)}</select></label>;
}
