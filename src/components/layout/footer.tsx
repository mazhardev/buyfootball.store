import Link from "next/link";
import { AtSign, Globe2, Mail, MapPin, MessageCircle, Network } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/logo";
import { CurrencySelector } from "@/components/layout/currency-selector";

const groups = [
  { title: "Shopping", links: [["All footballs", "/shop/"], ["Match balls", "/match-balls/"], ["Training balls", "/training-balls/"], ["Futsal balls", "/futsal-balls/"], ["Kids footballs", "/kids-footballs/"]] },
  { title: "Company", links: [["Our story", "/about/"], ["Sialkot factory", "/factory/"], ["Quality process", "/quality/"], ["Journal", "/blog/"], ["Contact", "/contact/"]] },
  { title: "Wholesale", links: [["Wholesale orders", "/wholesale/"], ["Custom footballs", "/custom-footballs/"], ["Private label", "/private-label/"], ["Shipping", "/shipping/"]] },
  { title: "Customer care", links: [["FAQs", "/faq/"], ["Returns policy", "/returns-policy/"], ["Privacy policy", "/privacy-policy/"], ["Terms & conditions", "/terms-and-conditions/"], ["Cookie policy", "/cookie-policy/"]] },
];

export function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Logo light /><p>Premium factory-direct footballs from Sialkot, delivered worldwide.</p><ul className="contact-list"><li><MapPin />{siteConfig.factoryLocation}</li><li><Mail /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li><li><MessageCircle /><a href={`https://wa.me/${siteConfig.whatsapp}`}>WhatsApp inquiry</a></li></ul><div className="social-row"><a href={siteConfig.socialLinks.instagram} aria-label="Instagram"><AtSign /></a><a href={siteConfig.socialLinks.facebook} aria-label="Facebook"><Globe2 /></a><a href={siteConfig.socialLinks.linkedin} aria-label="LinkedIn"><Network /></a></div></div>{groups.map((group) => <nav key={group.title} aria-label={group.title}><h2>{group.title}</h2>{group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav>)}</div>
  <div className="container country-links" aria-label="Country pages"><span>Shop by country:</span>{[["USA", "/usa/"], ["UK", "/uk/"], ["Germany", "/germany/"], ["France", "/france/"], ["Spain", "/spain/"], ["Italy", "/italy/"], ["Netherlands", "/netherlands/"], ["Canada", "/canada/"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
  <div className="footer-bottom"><div className="container"><div><CurrencySelector /><small>Rates are display estimates, not live quotes.</small></div><p>© {new Date().getFullYear()} BuyFootball.Store. Manufactured in Sialkot, Pakistan.</p></div></div></footer>;
}
