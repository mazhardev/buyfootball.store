import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export function PageHero({ eyebrow, title, description, crumbs }: { eyebrow: string; title: string; description: string; crumbs?: { label: string; href?: string }[] }) {
  return <header className="page-hero"><div className="container">{crumbs && <Breadcrumbs items={crumbs} />}<span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="lead">{description}</p></div></header>;
}
