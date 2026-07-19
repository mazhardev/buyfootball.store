"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

export function CartDrawer() {
  const cart = useCart();
  const { displayPrice } = useCurrency();
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!cart.drawerOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") cart.setDrawerOpen(false);
      if (event.key === "Tab") {
        const focusable = [...(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [cart.drawerOpen, cart]);
  if (!cart.drawerOpen) return null;
  return <div className="drawer-layer" role="presentation">
    <button className="drawer-overlay" aria-label="Close shopping cart" onClick={() => cart.setDrawerOpen(false)} />
    <aside ref={drawerRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <div className="drawer-head"><div><span className="eyebrow">Your selection</span><h2 id="cart-drawer-title">Shopping cart</h2></div><button ref={closeRef} className="icon-button" onClick={() => cart.setDrawerOpen(false)} aria-label="Close cart"><X /></button></div>
      {!cart.items.length ? <div className="empty-state"><ShoppingBag size={42} /><h3>Your cart is ready for kick-off</h3><p>Explore the catalogue and add a product with a valid size and color.</p><Link className="button primary" href="/shop/" onClick={() => cart.setDrawerOpen(false)}>Shop footballs</Link></div> : <>
        <div className="drawer-items">{cart.items.map((item) => <article className="mini-cart-item" key={item.lineId}>
          <Image src={item.image} alt="" width={78} height={78} />
          <div><Link href={`/products/${item.slug}/`} onClick={() => cart.setDrawerOpen(false)}>{item.name}</Link><p>{item.size} · {item.color}</p><strong>{displayPrice(item.priceUsd)}</strong><div className="quantity-row"><button aria-label={`Reduce ${item.name} quantity`} onClick={() => cart.updateQuantity(item.lineId, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => cart.updateQuantity(item.lineId, item.quantity + 1)}><Plus /></button><button className="text-button" onClick={() => cart.removeItem(item.lineId)}>Remove</button></div></div>
        </article>)}</div>
        <div className="drawer-summary"><div><span>Estimated subtotal</span><strong>{displayPrice(cart.subtotalUsd)}</strong></div><p>Shipping is confirmed during order processing. Display currency uses static estimates.</p><Link href="/cart/" className="button secondary" onClick={() => cart.setDrawerOpen(false)}>View cart</Link><Link href="/order/" className="button primary" onClick={() => cart.setDrawerOpen(false)}>Request order</Link></div>
      </>}
    </aside>
  </div>;
}
