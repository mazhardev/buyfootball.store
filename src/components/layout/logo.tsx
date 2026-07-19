import Link from "next/link";
import { CircleDot } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`brand-logo ${light ? "brand-logo-light" : ""}`} aria-label="BuyFootball.Store home"><span className="logo-mark"><CircleDot aria-hidden="true" /></span><span>BuyFootball<span>.Store</span></span></Link>;
}
