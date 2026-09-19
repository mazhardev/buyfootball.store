import Script from "next/script";
import { siteConfig } from "@/config/site";

export function Analytics() {
  const id = siteConfig.googleAnalyticsId;
  if (!/^G-[A-Z0-9]+$/u.test(id)) return null;

  return <>
    <Script id="google-tag" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    <Script id="google-tag-init" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
    </Script>
  </>;
}
