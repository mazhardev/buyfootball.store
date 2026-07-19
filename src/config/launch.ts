export interface LaunchCheck {
  id: string;
  label: string;
  complete: boolean;
  critical: boolean;
  manualAction: string;
}

export const launchChecks: readonly LaunchCheck[] = [
  { id: "domain", label: "Production domain configured", complete: true, critical: true, manualAction: "Keep buyfootball.store and HTTPS active." },
  { id: "email", label: "Business email configured", complete: true, critical: true, manualAction: "Confirm the mailbox is monitored." },
  { id: "whatsapp", label: "Business WhatsApp configured", complete: true, critical: true, manualAction: "Confirm the number is owned and monitored." },
  { id: "prices", label: "Product prices verified", complete: false, critical: true, manualAction: "Replace demonstration prices with approved commercial prices." },
  { id: "photos", label: "Product appearance verified against imagery", complete: false, critical: true, manualAction: "Replace illustrative product images with verified product photography or approve exact visual accuracy." },
  { id: "specifications", label: "Product specifications verified", complete: false, critical: true, manualAction: "Approve construction, material, weight, size, use and care data product by product." },
  { id: "availability", label: "Product availability verified", complete: false, critical: true, manualAction: "Confirm real stock or made-to-order status." },
  { id: "shipping", label: "Shipping policy verified", complete: false, critical: true, manualAction: "Approve destinations, delivery terms, charges and carrier process." },
  { id: "returns", label: "Returns policy verified", complete: false, critical: true, manualAction: "Approve return window, method, fees and exceptions with qualified review." },
  { id: "factory", label: "Factory claims verified", complete: false, critical: true, manualAction: "Verify visible Sialkot manufacturing statements and replace illustrative scenes with real evidence where required." },
  { id: "certifications", label: "Certification claims verified", complete: false, critical: true, manualAction: "Add only product-specific documented certifications." },
  { id: "legal", label: "Legal pages reviewed", complete: false, critical: true, manualAction: "Obtain qualified review for privacy, cookies, sales terms and returns." },
  { id: "analytics", label: "Analytics configured", complete: false, critical: false, manualAction: "Set NEXT_PUBLIC_GA_ID after consent review." },
  { id: "search-console", label: "Search Console verification configured", complete: false, critical: false, manualAction: "Set the public verification token and verify the DNS property." },
  { id: "sitemap", label: "Sitemap validation implemented", complete: true, critical: true, manualAction: "Run npm run seo:validate after every production build." },
  { id: "merchant-feed", label: "Merchant feed has launch-ready products", complete: false, critical: false, manualAction: "Mark only verified, purchasable products launchReady before Merchant Center submission." },
  { id: "reviews", label: "Demo reviews removed", complete: true, critical: true, manualAction: "Keep decorative stars aria-hidden and never publish Review or AggregateRating schema without genuine displayed evidence." },
  { id: "placeholders", label: "Placeholder and demonstration copy removed", complete: false, critical: true, manualAction: "Replace all visible demonstration content before production commerce launch." },
] as const;
