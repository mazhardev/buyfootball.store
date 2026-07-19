import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieNotice } from "@/components/layout/cookie-notice";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "BuyFootball.Store | Factory-Direct Footballs from Sialkot", template: "%s | BuyFootball.Store" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, url: siteConfig.url, title: "BuyFootball.Store", description: siteConfig.description, images: [{ url: "/images/open-graph-football.svg", width: 1200, height: 630, alt: "BuyFootball.Store factory-direct footballs from Sialkot" }] },
  twitter: { card: "summary_large_image", title: "BuyFootball.Store", description: siteConfig.description, images: ["/images/open-graph-football.svg"] },
  icons: { icon: "/images/favicon.svg", apple: "/images/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><Providers><Header /><main id="main-content">{children}</main><Footer /><CartDrawer /><CookieNotice /></Providers><Analytics /><JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: siteConfig.name, url: siteConfig.url, email: siteConfig.email, address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressRegion: "Punjab", addressCountry: "PK" }, sameAs: Object.values(siteConfig.socialLinks) }, { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description }] }} /></body></html>;
}
