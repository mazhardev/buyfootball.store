import type { Currency } from "@/types/commerce";

export const siteConfig = {
  name: "BuyFootball.Store",
  description: "Premium factory-direct footballs from Sialkot, delivered worldwide.",
  url: "https://buyfootball.store",
  email: "orders@buyfootball.store",
  whatsapp: "923340096557",
  factoryLocation: "Sialkot, Punjab, Pakistan",
  socialLinks: {
    instagram: "https://instagram.com/buyfootball.store",
    facebook: "https://facebook.com/buyfootball.store",
    linkedin: "https://linkedin.com/company/buyfootball-store",
  },
  supportedCurrencies: ["USD", "EUR", "GBP", "CAD"] as Currency[],
  shippingMessage: "Worldwide shipping is quoted after destination and order details are confirmed.",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  externalContactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
} as const;

/** Static display estimates only. Replace regularly or migrate to a live-rate service. */
export const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  CAD: 1.36,
};
