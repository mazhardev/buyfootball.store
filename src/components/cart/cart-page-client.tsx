"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";
import { formatCurrency } from "@/lib/commerce";

export function CartPageClient() {
  const cart = useCart();
  const { currency, displayPrice } = useCurrency();
  if (!cart.ready) return <div className="loading-card" aria-live="polite">Loading your saved cart…</div>;
  if (!cart.items.length) return <div className="empty-state bordered"><ShoppingBag size={48} /><h2>Your cart is empty</h2><p>Browse match, training, futsal, kids and custom football options.</p><Link className="button primary" href="/shop/">Explore footballs</Link></div>;
  return <div className="cart-page-grid"><div className="cart-lines">{cart.items.map((item) => <article className="cart-line" key={item.lineId}><Image src={item.image} alt="" width={130} height={130} /><div className="cart-line-copy"><h2><Link href={`/products/${item.slug}/`}>{item.name}</Link></h2><p>Size {item.size} · {item.color}</p><span>{displayPrice(item.priceUsd)} each</span><div className="quantity-row"><button aria-label={`Reduce ${item.name} quantity`} onClick={() => cart.updateQuantity(item.lineId, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => cart.updateQuantity(item.lineId, item.quantity + 1)}><Plus /></button><button className="text-button danger" onClick={() => cart.removeItem(item.lineId)}><Trash2 /> Remove</button></div></div><strong>{displayPrice(item.priceUsd * item.quantity)}</strong></article>)}</div><aside className="order-summary-card"><span className="eyebrow">Order request</span><h2>Cart summary</h2><div className="summary-line"><span>Items</span><span>{cart.itemCount}</span></div><div className="summary-line total"><span>Estimated subtotal</span><strong>{displayPrice(cart.subtotalUsd)}</strong></div>{currency !== "USD" && <div className="summary-line"><span>Original USD subtotal</span><span>{formatCurrency(cart.subtotalUsd, "USD")}</span></div>}<p>Display conversions use static estimates. Shipping, taxes and duties are confirmed during order processing.</p><Link href="/order/" className="button primary wide">Continue to order request</Link><Link href="/shop/" className="button secondary wide">Continue shopping</Link><button className="text-button center" onClick={cart.clearCart}>Clear cart</button></aside></div>;
}
