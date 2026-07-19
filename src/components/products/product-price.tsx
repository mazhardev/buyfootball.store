"use client";

import { useCurrency } from "@/context/currency-context";

export function ProductPrice({ priceUsd, compareAtUsd, large = false }: { priceUsd: number; compareAtUsd?: number; large?: boolean }) {
  const { currency, displayPrice } = useCurrency();
  return <div className={`product-price ${large ? "large" : ""}`}><strong>{displayPrice(priceUsd)}</strong>{compareAtUsd && <del>{displayPrice(compareAtUsd)}</del>}{currency !== "USD" && <small>USD {priceUsd.toFixed(2)} base</small>}</div>;
}
