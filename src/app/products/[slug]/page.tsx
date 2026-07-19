import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/products/product-card";
import { ProductPurchase } from "@/components/products/product-purchase";
import { categoryLabels, productBySlug, products } from "@/data/products";
import { createProductMetadata } from "@/lib/seo/metadata";
import { buildFaqSchema, buildProductSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return products.filter((product) => product.status !== "draft").map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  return product ? createProductMetadata(product) : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const related = product.relatedProductIds
    .map((id) => products.find((item) => item.id === id && item.status !== "draft"))
    .filter((item) => item !== undefined);
  const categoryHref: Record<typeof product.category, string> = { match: "/match-balls/", training: "/training-balls/", futsal: "/futsal-balls/", kids: "/kids-footballs/", custom: "/custom-footballs/" };
  const guideHref: Record<typeof product.category, string> = {
    match: "/blog/match-football-vs-training-football/",
    training: "/blog/match-football-vs-training-football/",
    futsal: "/blog/choosing-footballs-for-grass-and-artificial-turf/",
    kids: "/blog/how-to-choose-the-right-football-size/",
    custom: "/blog/how-to-order-custom-footballs-for-a-club/",
  };
  const crumbs = [{ label: "Home", href: "/" }, { label: "Shop", href: "/shop/" }, { label: categoryLabels[product.category], href: categoryHref[product.category] }, { label: product.name }];
  const faq = [
    { question: `Which surface suits the ${product.shortName}?`, answer: `The current demonstration recommendation is ${product.surfaceRecommendation.join(" and ")}. Confirm it against verified product testing before purchase.` },
    { question: `Which sizes are shown for the ${product.shortName}?`, answer: `The demonstration size options are ${product.sizeOptions.join(", ")}. The final available sizes must be confirmed with the order.` },
    { question: "Can this football be customized?", answer: "Customization may be discussed for organizational quantities. Construction, artwork, packaging, testing and minimum quantity must be confirmed in writing." },
  ];

  return <>
    <div className="container product-breadcrumb-wrap"><Breadcrumbs items={crumbs} /></div>
    <div className="container"><ProductPurchase product={product} /></div>
    <section className="section soft"><div className="container"><div className="section-head"><div><span className="eyebrow">Product overview</span><h2>Specification at a glance.</h2><p>Every value below remains demonstration content until the owner verifies it for this exact football.</p></div></div><div className="spec-grid">{[["Construction", product.constructionType], ["Material", product.material], ["Panel count", String(product.panelCount)], ["Bladder", product.bladderType], ["Sizes", product.sizeOptions.join(", ")], ["Weight range", product.weightRange], ["Recommended use", product.recommendedUse], ["Skill level", product.skillLevel], ["Availability", product.stockStatus]].map(([label, value]) => <div className="spec-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></section>
    <section className="section"><div className="container prose-grid"><article className="prose"><span className="eyebrow">Selection guidance</span><h2>Benefits and intended use</h2><p>{product.description}</p><ul>{product.features.map((feature) => <li key={feature}><CheckCircle2 />{feature}</li>)}</ul><h2>Construction, surface and sizing</h2><p>This {product.constructionType.toLowerCase()} concept is shown for {product.surfaceRecommendation.join(" and ").toLowerCase()}. Confirm the required size with the relevant competition, coach or organization and verify the final construction before ordering.</p><h2>Care and inflation</h2><p>Use the pressure range supplied with the verified product, inflate with a suitable lubricated needle and avoid prolonged heat or moisture exposure. Inspect the valve, seams and surface before play.</p><h2>Shipping and returns</h2><p>Shipping is quoted after quantity, packing and destination are confirmed. Return eligibility depends on condition, customization and the final approved terms.</p><h2>Related buying guidance</h2><p><Link className="text-link" href={guideHref[product.category]}>Read the relevant football selection guide <ArrowRight /></Link></p></article><aside className="aside-card"><span className="eyebrow">Customization and trade</span><h2>Need this in quantity?</h2><p>Share size mix, surface, branding, packaging, testing and destination requirements.</p><Link className="button primary" href="/wholesale/">Wholesale football inquiry <ArrowRight /></Link><Link className="button secondary" href="/custom-footballs/">Explore custom footballs</Link></aside></div></section>
    <section className="section soft"><div className="container"><div className="section-head"><div><span className="eyebrow">Continue comparing</span><h2>Related footballs.</h2></div></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>
    <section className="section"><div className="container faq-split"><div><span className="eyebrow">Product questions</span><h2>Before you decide.</h2></div><div className="faq-list">{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>
    <JsonLd data={buildProductSchema(product)} />
    <JsonLd data={buildFaqSchema(faq)} />
  </>;
}
