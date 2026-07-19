import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductCard } from "@/components/products/product-card";
import { articleBySlug, articles } from "@/data/blog";
import { products } from "@/data/products";
import { createArticleMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return articles.filter((article) => article.status !== "draft").map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  return article ? createArticleMetadata(article) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const related = article.relatedSlugs.flatMap((item) => {
    const relatedArticle = articleBySlug(item);
    return relatedArticle && relatedArticle.status !== "draft" ? [relatedArticle] : [];
  });
  const relatedProducts = products.filter((product) => product.status !== "draft").slice(0, 3);
  const crumbs = [{ label: "Home", href: "/" }, { label: "Journal", href: "/blog/" }, { label: article.title }];

  return <>
    <header className="article-hero"><div className="container"><Breadcrumbs items={crumbs} /><span className="eyebrow">{article.category}</span><h1>{article.title}</h1><p className="lead">{article.description}</p><div className="article-meta"><span><CalendarDays /> Published {article.publishedDate}</span><span><Clock />{article.readingTime}</span><span>By {article.author}</span></div><Image src={article.heroImage} alt={`Editorial image for ${article.title}`} width={1200} height={720} sizes="(max-width: 760px) 100vw, 1200px" priority /></div></header>
    <section className="section"><div className="container article-layout"><aside className="toc"><strong>In this guide</strong><nav aria-label="Article contents">{article.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}</nav></aside><article className="article-prose">{article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="article-note"><strong>Verify the final specification.</strong><p>Product claims, size guidance, surface recommendations and test information should be confirmed for the actual product and buyer context.</p></div><p><Link className="text-link" href="/shop/">Compare football categories and products <ArrowRight /></Link></p><p className="updated">Last updated {article.updatedDate}</p></article></div></section>
    <section className="section soft"><div className="container"><div className="section-head"><div><span className="eyebrow">Apply the guidance</span><h2>Related football concepts.</h2></div><Link className="text-link" href="/shop/">Browse the catalogue <ArrowRight /></Link></div><div className="product-grid">{relatedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">Continue learning</span><h2>Related guides.</h2></div></div><div className="related-articles">{related.map((item) => <Link href={`/blog/${item.slug}/`} key={item.slug}><span>{item.category}</span><h3>{item.title}</h3><b>Read guide <ArrowRight /></b></Link>)}</div></div></section>
    <JsonLd data={buildArticleSchema(article)} />
  </>;
}
