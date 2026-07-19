import { exchangeRates, siteConfig } from "@/config/site";
import type { CartItem, Currency, Product, ProductFilters, ProductSort } from "@/types/commerce";

export function formatCurrency(amount: number, currency: Currency = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
}

export function convertFromUsd(amount: number, currency: Currency) {
  return Math.round(amount * exchangeRates[currency] * 100) / 100;
}

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

export function assetUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  const query = filters.query.trim().toLowerCase();
  return products.filter((product) => {
    const haystack = `${product.name} ${product.shortDescription} ${product.category}`.toLowerCase();
    return (!query || haystack.includes(query))
      && (!filters.categories.length || filters.categories.includes(product.category))
      && (!filters.sizes.length || filters.sizes.some((size) => product.sizeOptions.includes(size)))
      && product.basePriceUsd <= filters.maxPrice
      && (!filters.constructions.length || filters.constructions.includes(product.constructionType))
      && (!filters.surfaces.length || filters.surfaces.some((surface) => product.surfaceRecommendation.includes(surface)));
  });
}

export function sortProducts(products: Product[], sort: ProductSort) {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.basePriceUsd - b.basePriceUsd;
    if (sort === "price-desc") return b.basePriceUsd - a.basePriceUsd;
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    return Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller);
  });
}

export function makeLineId(productId: string, size: string, color: string) {
  return `${productId}:${size}:${color}`;
}

export function generateOrderReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `BFS-${date}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function buildOrderSummary(params: {
  reference: string;
  customer: Record<string, string>;
  items: CartItem[];
  currency: Currency;
  subtotalUsd: number;
  displaySubtotal: number;
}) {
  const { reference, customer, items, currency, subtotalUsd, displaySubtotal } = params;
  const lines = items.map((item) => `- ${item.name} | ${item.size} | ${item.color} | Qty ${item.quantity} | ${formatCurrency(item.priceUsd * item.quantity, "USD")}`);
  return [
    `ORDER REQUEST ${reference}`,
    "",
    `Customer: ${customer.name || "Not provided"}`,
    `Email: ${customer.email || "Not provided"}`,
    `Phone: ${customer.phone || "Not provided"}`,
    `Contact preference: ${customer.preferredContact || "Not provided"}`,
    `Destination: ${[customer.city, customer.postalCode, customer.country].filter(Boolean).join(", ") || "Not provided"}`,
    `Address: ${customer.address || "Not provided"}`,
    "",
    "Items:",
    ...lines,
    "",
    `USD subtotal: ${formatCurrency(subtotalUsd, "USD")}`,
    `Display subtotal: ${formatCurrency(displaySubtotal, currency)} (static exchange-rate estimate)`,
    `Shipping: ${siteConfig.shippingMessage}`,
    `Notes: ${customer.notes || "None"}`,
  ].join("\n");
}

export function whatsappUrl(message: string) {
  return siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}` : "";
}

export function emailUrl(subject: string, body: string) {
  return siteConfig.email ? `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : "";
}
