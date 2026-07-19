"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart-context";
import { makeLineId } from "@/lib/commerce";
import type { Product } from "@/types/commerce";
import { ProductPrice } from "@/components/products/product-price";
import { ProductBadges } from "@/components/products/product-badges";

export function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const add = () => {
    if (!product.sizeOptions.includes(size) || !product.colorOptions.includes(color)) { setError("Choose an available size and color before adding this football."); return; }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) { setError("Quantity must be between 1 and 99."); return; }
    addItem({ lineId: makeLineId(product.id, size, color), productId: product.id, slug: product.slug, name: product.name, image: product.images[0], priceUsd: product.basePriceUsd, size, color, quantity });
    setError(""); setAdded(true); window.setTimeout(() => setAdded(false), 1800);
  };
  const inquiry = encodeURIComponent(`Hello, I would like to ask about ${product.name} (${product.slug}). Please share order, shipping and wholesale details.`);
  return <div className="product-detail-grid"><div className="product-gallery"><div className="gallery-main"><Image src={product.images[0]} alt={product.imageAlt} width={900} height={900} priority /></div><p>Demonstration product visual — replace with verified photography before launch.</p></div><div className="product-buy-panel"><ProductBadges product={product} /><span className="eyebrow">{product.subcategory}</span><h1>{product.name}</h1><p className="lead compact">{product.shortDescription}</p><div className="sample-rating" aria-label="Sample rating placeholder">★★★★★ <span>Sample rating — not a verified review</span></div><ProductPrice priceUsd={product.basePriceUsd} compareAtUsd={product.compareAtPriceUsd} large /><p className="price-note">Demonstration price. Shipping, duty and taxes are not included.</p>
    <fieldset className="variant-field"><legend>Choose size</legend><div className="choice-row">{product.sizeOptions.map((item) => <button type="button" className={size === item ? "selected" : ""} aria-pressed={size === item} onClick={() => setSize(item)} key={item}>{item}</button>)}</div></fieldset>
    <fieldset className="variant-field"><legend>Choose color</legend><div className="choice-row color-choices">{product.colorOptions.map((item) => <button type="button" className={color === item ? "selected" : ""} aria-pressed={color === item} onClick={() => setColor(item)} key={item}>{color === item && <Check />} {item}</button>)}</div></fieldset>
    <div className="purchase-row"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus /></button><input aria-label="Quantity" type="number" min="1" max="99" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /><button aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(99, value + 1))}><Plus /></button></div><button className="button primary grow" onClick={add}><ShoppingBag />{added ? "Added to cart" : "Add to cart"}</button></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {product.externalPaymentLink ? <a className="button gold wide" href={product.externalPaymentLink} rel="noopener noreferrer">Buy through hosted checkout</a> : <Link className="button gold wide" href="/order/">Request order</Link>}
    <a className="button whatsapp wide" href={siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}?text=${inquiry}` : `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Inquiry: ${product.name}`)}`}>Ask on WhatsApp</a>
    <dl className="purchase-assurances"><div><dt>Shipping</dt><dd>Quoted for your destination after order details are confirmed.</dd></div><div><dt>Returns</dt><dd>Eligibility depends on product condition and whether it is customized.</dd></div><div><dt>Wholesale</dt><dd>MOQ shown as demonstration data: {product.minimumWholesaleQuantity} units.</dd></div></dl>
  </div></div>;
}
