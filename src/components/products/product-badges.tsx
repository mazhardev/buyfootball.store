import type { Product } from "@/types/commerce";

export function ProductBadges({ product }: { product: Product }) {
  return <div className="badge-row">{product.bestseller && <span className="badge gold">Bestseller</span>}{product.isNew && <span className="badge green">New</span>}{product.stockStatus === "Made to order" && <span className="badge neutral">Made to order</span>}</div>;
}
