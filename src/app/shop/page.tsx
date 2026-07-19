import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCatalogue } from "@/components/products/product-catalogue";
import { products } from "@/data/products";
import { canonicalUrl } from "@/lib/commerce";

export const metadata: Metadata = { title: "Shop Footballs", description: "Browse demonstration match, training, futsal, kids and custom footballs from Sialkot.", alternates: { canonical: canonicalUrl("/shop/") } };
export default function ShopPage() { return <><PageHero eyebrow="Static catalogue · live browser filters" title="Find the right football." description="Search, filter and compare demonstration products by category, size, price, construction and recommended surface." crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} /><div className="container"><ProductCatalogue products={products} /></div></>; }
