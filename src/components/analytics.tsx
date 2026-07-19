import Script from "next/script";
import { siteConfig } from "@/config/site";

export function Analytics() {
  const id = siteConfig.googleAnalyticsId;
  if (!id) return null;
  return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /><Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}</Script></>;
}
