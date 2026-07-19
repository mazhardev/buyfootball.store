import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCatalogue } from "@/components/products/product-catalogue";
import { categoryLabels, products } from "@/data/products";
import type { ProductCategory } from "@/types/commerce";

const content: Record<ProductCategory, { eyebrow: string; description: string; guide: string; points: string[] }> = {
  match: { eyebrow: "Match-day confidence", description: "Explore demonstration match footballs shaped around touch, flight and organized play on natural grass and artificial turf.", guide: "Match selection starts with competition requirements, surface and construction—not a badge or marketing claim.", points: ["Fixture-focused construction options", "Size 5 and selected junior formats", "Certification information available on request"] },
  training: { eyebrow: "Built for repetition", description: "Training football concepts for academies, schools, clubs and individual players working session after session.", guide: "For training fleets, balance feel, surface durability, size mix and replacement cost across the expected weekly workload.", points: ["Repeated-drill specifications", "Outdoor and multi-surface concepts", "Bulk academy planning available"] },
  futsal: { eyebrow: "Close control indoors", description: "Reduced-bounce futsal ball concepts for technical sessions and organized indoor court play.", guide: "A futsal ball is a distinct playing format. Confirm the required size, rebound characteristics and court use before ordering.", points: ["Controlled-rebound concepts", "Indoor-court recommendations", "Match and training starting points"] },
  kids: { eyebrow: "Sized for development", description: "Size 3 and size 4 demonstration football options for young players learning first touch, passing and control.", guide: "Age guidance varies across organizations. Always confirm the size required by the child’s coach, school or competition.", points: ["Approachable size formats", "High-visibility concepts", "Soft-touch specification options"] },
  custom: { eyebrow: "Make the ball yours", description: "Custom football starting points for clubs, academies, retailers, events, promotions and private labels.", guide: "A clear brief makes custom development faster: quantity, use, size, construction, artwork, packaging, testing and destination.", points: ["Logo and color planning", "Packaging and private-label options", "Minimum quantities confirmed per request"] },
};

export function CategoryPage({ category }: { category: ProductCategory }) {
  const page = content[category];
  return <><PageHero eyebrow={page.eyebrow} title={categoryLabels[category]} description={page.description} crumbs={[{ label: "Home", href: "/" }, { label: categoryLabels[category] }]} /><div className="container"><section className="category-intro"><div><h2>Choose against the real use case.</h2><p>{page.guide}</p></div><ul>{page.points.map((point) => <li key={point}><CheckCircle2 />{point}</li>)}</ul><Link href="/contact/" className="text-link">Need specification help? <ArrowRight /></Link></section><ProductCatalogue products={products} initialCategory={category} /></div></>;
}
