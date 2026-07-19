import { absoluteUrl, canonicalUrl, sanitizeStructuredDataValue, seoConfig } from "@/config/seo";
import { categoryLabels } from "@/data/products";
import type { Article } from "@/data/blog";
import type { Product } from "@/types/commerce";

export type SchemaPrimitive = string | number | boolean | null;
export type SchemaValue = SchemaPrimitive | SchemaNode | SchemaValue[];
export interface SchemaNode { [key: string]: SchemaValue | undefined }
export interface SchemaBreadcrumb { name: string; href?: string }

const compact = (value: SchemaNode): SchemaNode => Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined && item !== ""));

export function buildOrganizationSchema(): SchemaNode {
  return compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seoConfig.productionOrigin}/#organization`,
    name: seoConfig.brandName,
    legalName: seoConfig.legalBusinessName || undefined,
    url: canonicalUrl("/"),
    logo: absoluteUrl("/images/favicon.svg"),
    description: seoConfig.defaultDescription,
    email: seoConfig.contactEmail,
    telephone: `+${seoConfig.whatsappNumber}`,
    address: { "@type": "PostalAddress", addressLocality: seoConfig.factoryCity, addressCountry: seoConfig.factoryCountry },
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: seoConfig.customerSupportEmail, telephone: `+${seoConfig.whatsappNumber}`, availableLanguage: ["English"] },
    sameAs: seoConfig.socialProfiles.filter(Boolean),
  });
}

export function buildWebSiteSchema(): SchemaNode {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${seoConfig.productionOrigin}/#website`, name: seoConfig.brandName, url: canonicalUrl("/"), description: seoConfig.defaultDescription, publisher: { "@id": `${seoConfig.productionOrigin}/#organization` }, inLanguage: "en" };
}

export function buildWebPageSchema(path: string, name: string, description: string, type: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage" = "WebPage"): SchemaNode {
  const url = canonicalUrl(path);
  return { "@context": "https://schema.org", "@type": type, "@id": `${url}#webpage`, url, name: sanitizeStructuredDataValue(name), description: sanitizeStructuredDataValue(description), isPartOf: { "@id": `${seoConfig.productionOrigin}/#website` }, about: { "@id": `${seoConfig.productionOrigin}/#organization` }, inLanguage: "en" };
}

export function buildBreadcrumbSchema(items: SchemaBreadcrumb[]): SchemaNode {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => compact({ "@type": "ListItem", position: index + 1, name: sanitizeStructuredDataValue(item.name), item: item.href ? canonicalUrl(item.href) : undefined })) };
}

export function buildFaqSchema(items: { question: string; answer: string }[]): SchemaNode {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: sanitizeStructuredDataValue(item.question), acceptedAnswer: { "@type": "Answer", text: sanitizeStructuredDataValue(item.answer) } })) };
}

export function buildItemListSchema(products: Product[]): SchemaNode {
  return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: canonicalUrl(`/products/${product.slug}/`), name: product.name, image: absoluteUrl(product.images[0]) })) };
}

export function buildProductSchema(product: Product): SchemaNode {
  const canPublishOffer = product.launchReady && product.priceVerified && product.availabilityVerified && product.commerceMode !== "quote-only";
  const availability = product.stockStatus === "In stock" ? "https://schema.org/InStock" : product.stockStatus === "Made to order" ? "https://schema.org/PreOrder" : "https://schema.org/OutOfStock";
  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl(`/products/${product.slug}/`)}#product`,
    name: product.name,
    description: product.description,
    sku: product.id,
    brand: { "@type": "Brand", name: seoConfig.brandName },
    image: product.images.map(absoluteUrl),
    category: categoryLabels[product.category],
    material: product.material,
    color: product.colorOptions,
    size: product.sizeOptions,
    url: canonicalUrl(`/products/${product.slug}/`),
    itemCondition: "https://schema.org/NewCondition",
    mpn: product.mpn,
    gtin: product.gtin,
    offers: canPublishOffer ? { "@type": "Offer", url: canonicalUrl(`/products/${product.slug}/`), priceCurrency: "USD", price: product.basePriceUsd.toFixed(2), availability, itemCondition: "https://schema.org/NewCondition", seller: { "@id": `${seoConfig.productionOrigin}/#organization` } } : undefined,
  });
}

export function buildArticleSchema(article: Article): SchemaNode {
  const url = canonicalUrl(`/blog/${article.slug}/`);
  return { "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description, image: absoluteUrl(article.heroImage), datePublished: article.publishedDate, dateModified: article.updatedDate, articleSection: article.category, author: { "@type": "Organization", name: article.author }, publisher: { "@id": `${seoConfig.productionOrigin}/#organization` }, mainEntityOfPage: { "@id": `${url}#webpage` }, inLanguage: "en" };
}

export function buildBlogSchema(): SchemaNode {
  return { "@context": "https://schema.org", "@type": "Blog", "@id": `${canonicalUrl("/blog/")}#blog`, name: "BuyFootball.Store Football Guides", url: canonicalUrl("/blog/"), publisher: { "@id": `${seoConfig.productionOrigin}/#organization` }, inLanguage: "en" };
}
