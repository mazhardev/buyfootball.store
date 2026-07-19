import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export interface BreadcrumbItem { label: string; href?: string }
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 && <ChevronRight aria-hidden="true" />}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav><JsonLd data={buildBreadcrumbSchema(items.map((item) => ({ name: item.label, href: item.href })))} /></>;
}
