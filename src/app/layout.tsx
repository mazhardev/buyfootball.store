import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CookieNotice } from "@/components/layout/cookie-notice";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { seoConfig } from "@/config/seo";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.productionOrigin),
  title: { default: seoConfig.defaultTitle, template: seoConfig.titleTemplate },
  description: seoConfig.defaultDescription,
  applicationName: seoConfig.brandName,
  authors: [{ name: `${seoConfig.brandName} Editorial Team`, url: seoConfig.productionOrigin }],
  creator: seoConfig.brandName,
  publisher: seoConfig.brandName,
  category: "Sporting goods",
  keywords: ["footballs", "soccer balls", "custom footballs", "wholesale footballs", "Sialkot football manufacturer"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: seoConfig.brandName, url: seoConfig.productionOrigin, title: seoConfig.defaultTitle, description: seoConfig.defaultDescription, images: [{ url: seoConfig.defaultOpenGraphImage, width: 1200, height: 630, alt: "Original unbranded football in the BuyFootball.Store navy and green palette" }] },
  twitter: { card: seoConfig.twitterCard, title: seoConfig.defaultTitle, description: seoConfig.defaultDescription, images: [seoConfig.defaultOpenGraphImage] },
  robots: { index: seoConfig.indexingEnabled, follow: seoConfig.indexingEnabled, googleBot: { index: seoConfig.indexingEnabled, follow: seoConfig.indexingEnabled, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/images/favicon.svg", apple: "/images/favicon.svg" },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  verification: { google: seoConfig.googleSiteVerification || undefined, other: { "msvalidate.01": seoConfig.bingSiteVerification || "" } },
  other: seoConfig.merchantCenterVerification ? { "google-site-verification": seoConfig.merchantCenterVerification } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><Providers><Header /><main id="main-content">{children}</main><Footer /><CartDrawer /><CookieNotice /></Providers><Analytics /><JsonLd data={{ "@context": "https://schema.org", "@graph": [buildOrganizationSchema(), buildWebSiteSchema()] }} /></body></html>;
}
