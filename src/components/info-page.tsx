import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export interface InfoSection { heading: string; paragraphs: string[]; bullets?: string[] }
export function InfoPage({ eyebrow, title, description, sections, asideTitle = "Ready to discuss your order?", asideCopy = "Share your intended use, quantity, destination and timing so we can start with the right questions." }: { eyebrow: string; title: string; description: string; sections: InfoSection[]; asideTitle?: string; asideCopy?: string }) {
  return <><PageHero eyebrow={eyebrow} title={title} description={description} crumbs={[{ label: "Home", href: "/" }, { label: title }]} /><section className="section"><div className="container prose-grid"><article className="prose">{sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</article><aside className="aside-card"><span className="eyebrow">Next step</span><h2>{asideTitle}</h2><p>{asideCopy}</p><Link className="button primary" href="/contact/">Contact us <ArrowRight /></Link><Link className="button secondary" href="/wholesale/">Wholesale inquiry</Link></aside></div></section></>;
}
