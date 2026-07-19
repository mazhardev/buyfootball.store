import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCatalogue } from "@/components/products/product-catalogue";
import { JsonLd } from "@/components/seo/JsonLd";
import { categoryLabels, products } from "@/data/products";
import { buildFaqSchema, buildItemListSchema, buildWebPageSchema } from "@/lib/seo/schema";
import type { ProductCategory } from "@/types/commerce";

interface CategoryContent {
  eyebrow: string;
  description: string;
  guide: string;
  points: string[];
  path: string;
  faq: { question: string; answer: string }[];
}

const content: Record<ProductCategory, CategoryContent> = {
  match: {
    eyebrow: "Match-day confidence",
    description: "Explore demonstration match footballs shaped around touch, flight and organized play on natural grass and artificial turf.",
    guide: "Match selection starts with competition requirements, surface and construction—not a badge or marketing claim.",
    path: "/match-balls/",
    points: ["Fixture-focused construction options", "Size 5 and selected junior formats", "Certification information available on request"],
    faq: [
      { question: "What should I compare in a match football?", answer: "Compare the required size, construction, cover, bladder, playing surface and documented testing information for the specific product." },
      { question: "Does a match label mean the ball is certified?", answer: "No. Certification or approval should only be claimed when documentation confirms it for the exact product." },
    ],
  },
  training: {
    eyebrow: "Built for repetition",
    description: "Training football concepts for academies, schools, clubs and individual players working session after session.",
    guide: "For training fleets, balance feel, surface durability, size mix and replacement cost across the expected weekly workload.",
    path: "/training-balls/",
    points: ["Repeated-drill specifications", "Outdoor and multi-surface concepts", "Bulk academy planning available"],
    faq: [
      { question: "How are training footballs different from match footballs?", answer: "Training specifications commonly prioritize repeated use and practical replacement cost, while match specifications may prioritize fixture touch and flight." },
      { question: "Can an academy order mixed sizes?", answer: "Mixed-size planning can be discussed after the quantity, age groups, surfaces and training schedule are known." },
    ],
  },
  futsal: {
    eyebrow: "Close control indoors",
    description: "Reduced-bounce futsal ball concepts for technical sessions and organized indoor court play.",
    guide: "A futsal ball is a distinct playing format. Confirm the required size, rebound characteristics and court use before ordering.",
    path: "/futsal-balls/",
    points: ["Controlled-rebound concepts", "Indoor-court recommendations", "Match and training starting points"],
    faq: [
      { question: "Is a futsal ball the same as a size 4 outdoor ball?", answer: "No. Futsal balls are specified for controlled rebound and indoor court use; confirm the exact format required by the competition or coach." },
      { question: "Can futsal balls be customized?", answer: "Logo, color and packaging options can be discussed against the chosen construction and order quantity." },
    ],
  },
  kids: {
    eyebrow: "Sized for development",
    description: "Size 3 and size 4 demonstration football options for young players learning first touch, passing and control.",
    guide: "Age guidance varies across organizations. Always confirm the size required by the child’s coach, school or competition.",
    path: "/kids-footballs/",
    points: ["Approachable size formats", "High-visibility concepts", "Soft-touch specification options"],
    faq: [
      { question: "Which football size should a child use?", answer: "Rules vary by age group and organization. Confirm the size with the player’s coach, school or competition before ordering." },
      { question: "Do youth footballs come in custom colors?", answer: "Custom colors and logos can be discussed, subject to a confirmed construction, quantity and artwork brief." },
    ],
  },
  custom: {
    eyebrow: "Make the ball yours",
    description: "Custom football starting points for clubs, academies, retailers, events, promotions and private labels.",
    guide: "A clear brief makes custom development faster: quantity, use, size, construction, artwork, packaging, testing and destination.",
    path: "/custom-footballs/",
    points: ["Logo and color planning", "Packaging and private-label options", "Minimum quantities confirmed per request"],
    faq: [
      { question: "What information starts a custom football project?", answer: "Share intended use, sizes, quantity, construction, destination, artwork, packaging and any testing needs." },
      { question: "What is the minimum custom order?", answer: "Minimum quantities depend on construction, printing and packaging and are confirmed for the approved specification." },
    ],
  },
};

export function CategoryPage({ category }: { category: ProductCategory }) {
  const page = content[category];
  const visibleProducts = products.filter((product) => product.status !== "draft");
  const categoryProducts = visibleProducts.filter((product) => product.category === category);

  return <>
    <PageHero eyebrow={page.eyebrow} title={categoryLabels[category]} description={page.description} crumbs={[{ label: "Home", href: "/" }, { label: categoryLabels[category] }]} />
    <div className="container">
      <section className="category-intro">
        <div><h2>Choose against the real use case.</h2><p>{page.guide}</p></div>
        <ul>{page.points.map((point) => <li key={point}><CheckCircle2 />{point}</li>)}</ul>
        <Link href="/contact/" className="text-link">Need specification help? <ArrowRight /></Link>
      </section>
      <ProductCatalogue products={visibleProducts} initialCategory={category} />
      <section className="section"><div className="prose">
        <h2>{categoryLabels[category]} buying questions</h2>
        <div className="faq-list">{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        <p>Continue with our <Link href="/blog/match-football-vs-training-football/">match versus training guide</Link>, review <Link href="/shipping/">international shipping guidance</Link>, or <Link href="/wholesale/">plan a wholesale requirement</Link>.</p>
      </div></section>
    </div>
    <JsonLd data={[buildWebPageSchema(page.path, categoryLabels[category], page.description, "CollectionPage"), buildItemListSchema(categoryProducts), buildFaqSchema(page.faq)]} />
  </>;
}
