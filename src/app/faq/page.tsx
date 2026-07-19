import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/config/page-metadata";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";

const faqs = [
  { q: "Are the catalogue products ready for launch?", a: "No. Product names, prices, specifications, stock, images and minimum quantities are demonstration content and must be replaced with verified business information." },
  { q: "Where are the footballs manufactured?", a: "The brand position is factory-developed footballs manufactured in Sialkot, Pakistan." },
  { q: "Do you offer certified footballs?", a: "Certification information is available on request. A product should not be described as certified or approved unless documentation confirms the exact claim." },
  { q: "Can I order one football?", a: "The demonstration catalogue supports individual cart requests, but actual retail availability and stock must be confirmed before launch." },
  { q: "What is the minimum custom order?", a: "Minimum quantities depend on construction, materials, printing and packaging and must be confirmed for the request." },
  { q: "Can I get a sample?", a: "Samples may be available depending on the product and project. Cost, timing and shipping are confirmed during the inquiry." },
  { q: "How long does custom production take?", a: "A production timeline is confirmed after specifications, artwork and any sample requirements are approved." },
  { q: "Do prices include shipping and tax?", a: "No. Catalogue prices are demonstration base prices. Shipping, duties and taxes are confirmed during order processing." },
  { q: "Are currency conversions live?", a: "No. EUR, GBP and CAD values use centralized static exchange-rate estimates and retain the original USD price." },
  { q: "How does ordering work without online checkout?", a: "The cart generates a structured WhatsApp or email order request. No payment is taken on this static website unless a verified external hosted-payment link is added to a product." },
  { q: "Can retailers create private-label products?", a: "Yes. Product specification, original artwork, packaging, documentation, quantities and destination requirements can be discussed." },
  { q: "Can I return a custom football?", a: "Custom goods generally cannot be returned for preference changes. The final returns terms must be verified for the business and applicable law before launch." },
];

export const metadata = pageMetadata.faq;

export default function Page() {
  const schemaFaqs = faqs.map(({ q, a }) => ({ question: q, answer: a }));
  return <>
    <PageHero eyebrow="Straight answers" title="Frequently asked questions." description="A practical starting point for catalogue, customization, wholesale, delivery and ordering questions." crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
    <section className="section"><div className="container faq-page-list">{faqs.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>
    <JsonLd data={[buildWebPageSchema("/faq/", "Football ordering and customization FAQs", "Practical answers about football products, customization, wholesale, shipping and order requests."), buildFaqSchema(schemaFaqs)]} />
  </>;
}
