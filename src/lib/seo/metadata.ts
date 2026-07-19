import type { Metadata } from "next";
import { categoryLabels } from "@/data/products";
import { canonicalUrl, createPageTitle, resolveOpenGraphImage, seoConfig, truncateWhenNecessary } from "@/config/seo";
import type { Article } from "@/data/blog";
import type { CountryPage } from "@/data/countries";
import type { Product, ProductCategory } from "@/types/commerce";

interface CreateMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  locale?: string;
  type?: "website" | "article";
  indexable?: boolean;
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

function robotsMetadata(indexable: boolean): Metadata["robots"] {
  const allowIndexing = indexable && seoConfig.indexingEnabled;
  return {
    index: allowIndexing,
    follow: allowIndexing || !indexable,
    googleBot: {
      index: allowIndexing,
      follow: allowIndexing || !indexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function createMetadata(input: CreateMetadataInput): Metadata {
  const description = truncateWhenNecessary(input.description.trim());
  const canonical = canonicalUrl(input.path);
  const image = resolveOpenGraphImage(input.image);
  const socialTitle = createPageTitle(input.title);
  const indexable = input.indexable ?? true;
  const openGraph = input.type === "article"
    ? { type: "article" as const, title: socialTitle, description, url: canonical, siteName: seoConfig.brandName, locale: input.locale ?? "en_US", images: [{ url: image, width: 1200, height: 630, alt: input.imageAlt ?? socialTitle }], publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: input.authors }
    : { type: "website" as const, title: socialTitle, description, url: canonical, siteName: seoConfig.brandName, locale: input.locale ?? "en_US", images: [{ url: image, width: 1200, height: 630, alt: input.imageAlt ?? socialTitle }] };

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description,
    alternates: { canonical },
    openGraph,
    twitter: { card: seoConfig.twitterCard, title: socialTitle, description, images: [{ url: image, alt: input.imageAlt ?? socialTitle }] },
    robots: robotsMetadata(indexable),
  };
}

export function createNoIndexMetadata(input: Omit<CreateMetadataInput, "indexable">) {
  return createMetadata({ ...input, indexable: false });
}

export function createProductMetadata(product: Product): Metadata {
  const category = categoryLabels[product.category];
  return createMetadata({
    title: `${product.name} | ${category}`,
    description: product.seoDescription,
    path: `/products/${product.slug}/`,
    image: product.images[0],
    imageAlt: product.imageAlt,
    indexable: product.indexable && product.status === "published",
  });
}

export function createArticleMetadata(article: Article): Metadata {
  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}/`,
    image: article.heroImage,
    imageAlt: `Editorial image for ${article.title}`,
    type: "article",
    indexable: article.indexable && article.status === "published",
    publishedTime: article.publishedDate,
    modifiedTime: article.updatedDate,
    authors: [article.author],
  });
}

export function createCategoryMetadata(category: ProductCategory, description: string): Metadata {
  const paths: Record<ProductCategory, string> = { match: "/match-balls/", training: "/training-balls/", futsal: "/futsal-balls/", kids: "/kids-footballs/", custom: "/custom-footballs/" };
  return createMetadata({ title: categoryLabels[category], description, path: paths[category] });
}

export function createCountryMetadata(country: CountryPage): Metadata {
  return createMetadata({ title: country.title, description: country.description, path: `/${country.slug}/`, locale: country.openGraphLocale, indexable: country.indexable && country.humanReviewed });
}

export const getCanonicalUrl = canonicalUrl;
export const getOpenGraphImage = resolveOpenGraphImage;
