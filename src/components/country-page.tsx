import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, PackageCheck, Tags, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CountryPage as CountryData } from "@/data/countries";
import { createCountryMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";

export function countryMetadata(country: CountryData): Metadata {
  return createCountryMetadata(country);
}

export function CountryPage({ country }: { country: CountryData }) {
  return <>
    <header className="country-hero"><div className="container">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: country.name }]} />
      <span className="eyebrow">Factory direct to {country.name}</span>
      <h1>{country.title}</h1>
      <p className="lead">{country.intro}</p>
      <div><Link className="button gold" href="/custom-footballs/">Create custom {country.term} <ArrowRight /></Link><Link className="button hero-secondary" href="/wholesale/">Request wholesale quote</Link></div>
    </div></header>
    <section className="section"><div className="container country-content">
      <div className="country-main">
        <section>
          <span className="eyebrow">Available categories</span>
          <h2>Choose a specification for the way your organization plays.</h2>
          <p>Explore <Link href="/match-balls/">match</Link>, <Link href="/training-balls/">training</Link>, <Link href="/futsal-balls/">futsal</Link>, <Link href="/kids-footballs/">kids</Link> and <Link href="/custom-footballs/">custom {country.term}</Link>. Clubs and academies can plan training fleets, schools can compare size needs, and retailers can discuss <Link href="/private-label/">private-label development</Link>.</p>
          <div className="country-card-grid">{[
            [PackageCheck, "Match & training", "Compare use, construction, surface and size."],
            [Tags, "Custom & private label", "Plan artwork, colors, packaging and testing."],
            [Globe2, "Clubs & education", "Build quantity and size mixes around your program."],
            [Truck, "International delivery", "Confirm production, freight and destination costs."],
          ].map(([Icon, title, copy]) => { const I = Icon as typeof Globe2; return <div key={title as string}><I /><h3>{title as string}</h3><p>{copy as string}</p></div>; })}</div>
        </section>
        <section>
          <span className="eyebrow">Shipping to {country.name}</span>
          <h2>No invented local stock. No hidden freight assumption.</h2>
          <p>{country.shipping}</p><p>{country.marketNote}</p>
          <p>See the full <Link href="/shipping/">shipping and customs planning guide</Link> before requesting a quotation.</p>
          <div className="notice-box"><strong>Customs and tax notice</strong><p>Import duties, taxes, brokerage, documentation and product obligations vary. They are not included unless an approved quotation explicitly says so. This is general commercial information, not tax or legal advice.</p></div>
        </section>
        <section>
          <span className="eyebrow">Questions from {country.name}</span><h2>Frequently asked questions</h2>
          <div className="faq-list">{country.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </section>
      </div>
      <aside className="aside-card"><span className="eyebrow">Display currency</span><h2>{country.currency}</h2><p>Prices can be displayed in {country.currency}, but non-USD values use documented static estimates rather than live exchange rates.</p><Link className="button primary" href="/shop/">Browse {country.term}</Link><Link className="button secondary" href="/shipping/">Shipping guidance</Link></aside>
    </div></section>
    <JsonLd data={[buildWebPageSchema(`/${country.slug}/`, country.title, country.description), buildFaqSchema(country.faq)]} />
  </>;
}
