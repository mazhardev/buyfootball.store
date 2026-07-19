import { PageHero } from "@/components/page-hero";
import { ProductCatalogue } from "@/components/products/product-catalogue";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/config/page-metadata";
import { products } from "@/data/products";
import { buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = pageMetadata.shop;

export default function ShopPage() {
  const visibleProducts = products.filter((product) => product.status !== "draft");
  return <>
    <PageHero eyebrow="Static catalogue · live browser filters" title="Find the right football." description="Search, filter and compare demonstration products by category, size, price, construction and recommended surface." crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
    <div className="container"><ProductCatalogue products={visibleProducts} /></div>
    <JsonLd data={[buildWebPageSchema("/shop/", "Shop footballs online", "Compare match, training, futsal, youth and custom football concepts manufactured in Sialkot.", "CollectionPage"), buildItemListSchema(visibleProducts)]} />
  </>;
}
