import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels } from "@/data/products";
import type { Product } from "@/types/commerce";
import { ProductBadges } from "@/components/products/product-badges";
import { ProductPrice } from "@/components/products/product-price";

export function ProductCard({ product, view = "grid" }: { product: Product; view?: "grid" | "list" }) {
  return <article className={`product-card ${view === "list" ? "product-card-list" : ""}`}><Link className="product-image" href={`/products/${product.slug}/`}><Image src={product.images[0]} alt={product.imageAlt} width={640} height={640} /><ProductBadges product={product} /></Link><div className="product-card-body"><span className="product-category">{categoryLabels[product.category]}</span><h3><Link href={`/products/${product.slug}/`}>{product.name}</Link></h3><p>{product.shortDescription}</p>{view === "list" && <ul className="quick-specs"><li>{product.constructionType}</li><li>Sizes {product.sizeOptions.join(", ")}</li><li>{product.surfaceRecommendation.join(", ")}</li></ul>}<div className="product-card-foot"><ProductPrice priceUsd={product.basePriceUsd} compareAtUsd={product.compareAtPriceUsd} /><Link className="round-link" href={`/products/${product.slug}/`} aria-label={`View ${product.name}`}><ArrowUpRight /></Link></div></div></article>;
}
