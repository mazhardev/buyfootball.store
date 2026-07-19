import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/config/page-metadata";
import { articles } from "@/data/blog";
import { buildBlogSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata.blog;

export default function Page() {
  const visibleArticles = articles.filter((article) => article.status !== "draft");
  return <>
    <PageHero eyebrow="The football field guide" title="Buy with better information." description="Original, practical guidance for players, parents, coaches, schools, clubs, retailers and custom-order teams." crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
    <section className="section"><div className="container article-grid">{visibleArticles.map((article) => <article className="article-card" key={article.slug}>
      <Link href={`/blog/${article.slug}/`}><Image src={article.heroImage} alt={`Editorial illustration about ${article.title}`} width={720} height={440} sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw" /></Link>
      <div><span className="eyebrow">{article.category}</span><h2><Link href={`/blog/${article.slug}/`}>{article.title}</Link></h2><p>{article.description}</p><div><span><Clock />{article.readingTime}</span><Link className="text-link" href={`/blog/${article.slug}/`}>Read guide <ArrowRight /></Link></div></div>
    </article>)}</div></section>
    <JsonLd data={[buildWebPageSchema("/blog/", "Football buying and manufacturing guides", "Practical guides about football sizes, construction, playing surfaces, manufacturing and custom orders.", "CollectionPage"), buildBlogSchema()]} />
  </>;
}
