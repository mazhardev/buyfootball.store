"use client";

import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Newsletter() {
  const configured = Boolean(siteConfig.externalContactFormEndpoint);
  return <section className="newsletter"><div><span className="eyebrow">Field notes</span><h2>Better football buying starts with better questions.</h2><p>Get practical product, customization and sourcing guidance. No inflated claims—just useful information.</p></div><form action={configured ? siteConfig.externalContactFormEndpoint : undefined} method={configured ? "post" : undefined} onSubmit={configured ? undefined : (event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" required placeholder="you@company.com" /><button className="button gold" type="submit" disabled={!configured}>Subscribe <ArrowRight /></button>{!configured && <small>Newsletter form endpoint is not configured yet. Add it in the environment settings.</small>}</form></section>;
}
