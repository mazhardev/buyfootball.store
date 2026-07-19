"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Logo } from "@/components/layout/logo";
import { CurrencySelector } from "@/components/layout/currency-selector";

const links = [
  ["Shop", "/shop/"], ["Match Balls", "/match-balls/"], ["Training Balls", "/training-balls/"],
  ["Custom Footballs", "/custom-footballs/"], ["Wholesale", "/wholesale/"], ["About", "/about/"],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setDrawerOpen } = useCart();
  useEffect(() => { if (!menuOpen) document.body.style.overflow = ""; else document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  return <>
    <div className="announcement"><div className="container announcement-inner"><span>Worldwide shipping</span><span>Factory-direct customization</span><span>Wholesale inquiries welcome</span></div></div>
    <header className="site-header">
      <div className="container header-inner">
        <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <div className="header-actions"><CurrencySelector compact /><Link className="icon-button header-search" href="/shop/#catalogue" aria-label="Search products"><Search /></Link><button className="cart-button" onClick={() => setDrawerOpen(true)} aria-label={`Open cart with ${itemCount} items`}><ShoppingBag /><span>Cart</span><b aria-hidden="true">{itemCount}</b></button></div>
      </div>
    </header>
    {menuOpen && <div className="mobile-nav-layer"><button className="drawer-overlay" aria-label="Close navigation" onClick={() => setMenuOpen(false)} /><aside className="mobile-nav" aria-label="Mobile navigation"><div className="drawer-head"><Logo /><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></div><nav>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}<Link href="/futsal-balls/" onClick={() => setMenuOpen(false)}>Futsal Balls</Link><Link href="/kids-footballs/" onClick={() => setMenuOpen(false)}>Kids Footballs</Link><Link href="/contact/" onClick={() => setMenuOpen(false)}>Contact</Link></nav><CurrencySelector /></aside></div>}
  </>;
}
