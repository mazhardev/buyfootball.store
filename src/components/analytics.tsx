import Script from "next/script";
import { siteConfig } from "@/config/site";

const GOOGLE_TAG_ID = /^(?:G|GTM)-[A-Z0-9]+$/u;

export function Analytics() {
  const id = siteConfig.googleAnalyticsId;
  if (!GOOGLE_TAG_ID.test(id)) return null;

  // Google tag container (GTM-…) as provided by GA4 "Install manually"; legacy GA4 measurement IDs (G-…) still use gtag.js + config.
  const isContainer = id.startsWith("GTM-");
  const src = isContainer
    ? `https://www.googletagmanager.com/gtm.js?id=${id}`
    : `https://www.googletagmanager.com/gtag/js?id=${id}`;
  const init = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());${isContainer ? "" : `gtag('config','${id}');`}`;

  return <>
    <Script id="google-tag" src={src} strategy="afterInteractive" />
    <Script id="google-tag-init" strategy="afterInteractive">
      {init}
    </Script>
  </>;
}
