import { siteConfig } from "@/config/site";
import type { Currency } from "@/types/commerce";

export const SITE_URL = "https://buyfootball.store";

export type LocaleCode = "en-US" | "en-GB" | "en-CA" | "de-DE" | "fr-FR" | "es-ES" | "it-IT" | "nl-NL";

export interface LocaleSeoConfig {
  code: LocaleCode;
  language: string;
  region: string;
  currency: Currency;
  routePrefix: string;
  label: string;
  nativeName: string;
  indexable: boolean;
  humanReviewed: boolean;
  translationComplete: boolean;
}

export const localeConfig: readonly LocaleSeoConfig[] = [
  { code: "en-US", language: "en", region: "US", currency: "USD", routePrefix: "/usa/", label: "English (United States)", nativeName: "English", indexable: false, humanReviewed: false, translationComplete: true },
  { code: "en-GB", language: "en", region: "GB", currency: "GBP", routePrefix: "/uk/", label: "English (United Kingdom)", nativeName: "English", indexable: false, humanReviewed: false, translationComplete: true },
  { code: "en-CA", language: "en", region: "CA", currency: "CAD", routePrefix: "/canada/", label: "English (Canada)", nativeName: "English", indexable: false, humanReviewed: false, translationComplete: true },
  { code: "de-DE", language: "de", region: "DE", currency: "EUR", routePrefix: "/germany/", label: "German (Germany)", nativeName: "Deutsch", indexable: false, humanReviewed: false, translationComplete: false },
  { code: "fr-FR", language: "fr", region: "FR", currency: "EUR", routePrefix: "/france/", label: "French (France)", nativeName: "Français", indexable: false, humanReviewed: false, translationComplete: false },
  { code: "es-ES", language: "es", region: "ES", currency: "EUR", routePrefix: "/spain/", label: "Spanish (Spain)", nativeName: "Español", indexable: false, humanReviewed: false, translationComplete: false },
  { code: "it-IT", language: "it", region: "IT", currency: "EUR", routePrefix: "/italy/", label: "Italian (Italy)", nativeName: "Italiano", indexable: false, humanReviewed: false, translationComplete: false },
  { code: "nl-NL", language: "nl", region: "NL", currency: "EUR", routePrefix: "/netherlands/", label: "Dutch (Netherlands)", nativeName: "Nederlands", indexable: false, humanReviewed: false, translationComplete: false },
] as const;

const isProductionBuild = process.env.NODE_ENV === "production";
const indexingEnabled = isProductionBuild
  ? process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false"
  : process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const seoConfig = {
  brandName: siteConfig.name,
  legalBusinessName: process.env.NEXT_PUBLIC_LEGAL_BUSINESS_NAME ?? "",
  defaultTitle: "Factory-Direct Footballs from Sialkot | BuyFootball.Store",
  titleTemplate: "%s | BuyFootball.Store",
  defaultDescription: "Explore footballs manufactured in Sialkot for retail, wholesale and custom orders worldwide. Compare match, training, futsal, youth and branded options.",
  productionOrigin: SITE_URL,
  defaultLocale: "en-US" as LocaleCode,
  supportedLocales: localeConfig,
  defaultOpenGraphImage: "/images/open-graph-football.webp",
  twitterCard: "summary_large_image" as const,
  contactEmail: siteConfig.email,
  customerSupportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || siteConfig.email,
  whatsappNumber: siteConfig.whatsapp,
  factoryCity: "Sialkot",
  factoryCountry: "PK",
  socialProfiles: Object.values(siteConfig.socialLinks),
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  merchantCenterVerification: process.env.NEXT_PUBLIC_MERCHANT_CENTER_VERIFICATION ?? "",
  defaultProductCurrency: "USD" as Currency,
  countryTargets: localeConfig,
  indexingEnabled,
  launchReady: false,
} as const;

export function normalizePath(path = "/") {
  const [pathname, suffix = ""] = path.split(/(?=[?#])/u, 2);
  const normalized = `/${pathname}`.replace(/\/{2,}/gu, "/");
  return `${normalized}${suffix}`;
}

export function withTrailingSlash(path = "/") {
  const normalized = normalizePath(path);
  const match = normalized.match(/^([^?#]*)(.*)$/u);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";
  return `${pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`}${suffix}`;
}

export function canonicalUrl(path = "/") {
  return new URL(withTrailingSlash(path), `${SITE_URL}/`).toString();
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//iu.test(path)) return path;
  return new URL(normalizePath(path), `${SITE_URL}/`).toString();
}

export function resolveOpenGraphImage(path = seoConfig.defaultOpenGraphImage) {
  return absoluteUrl(path);
}

export function createPageTitle(title: string) {
  const clean = title.trim();
  return clean.includes(seoConfig.brandName) ? clean : `${clean} | ${seoConfig.brandName}`;
}

export function truncateWhenNecessary(value: string, maximum = 300) {
  if (value.length <= maximum) return value;
  const slice = value.slice(0, maximum - 1);
  const boundary = slice.lastIndexOf(" ");
  return `${slice.slice(0, boundary > maximum * 0.7 ? boundary : maximum - 1).trim()}…`;
}

export function sanitizeStructuredDataValue(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/gu, " ").replace(/\s+/gu, " ").trim();
}

export function localizedUrl(locale: LocaleCode, path = "/") {
  const localeEntry = localeConfig.find((entry) => entry.code === locale);
  if (!localeEntry) return canonicalUrl(path);
  const suffix = path === "/" ? "" : normalizePath(path).replace(/^\//u, "");
  return canonicalUrl(`${localeEntry.routePrefix}${suffix}`);
}
