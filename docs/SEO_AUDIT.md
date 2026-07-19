# SEO audit

Audit date: 20 July 2026. Scope: the complete Next.js static export, its source data, build workflow, GitHub Pages configuration, generated crawl files, commerce flow, content and accessibility fundamentals.

## Executive summary

The site had sound static-export foundations but fragmented metadata, an over-inclusive sitemap, handwritten structured data, indexable demonstration catalogue content, unreviewed country pages, sample reviews and no automated SEO launch gate. The implementation now centralizes metadata and schema, assigns explicit content states, excludes unsafe URLs from the sitemap, removes demo testimonials, produces a gated empty merchant feed, validates the exported HTML and blocks deployment while critical business facts remain unverified.

No ranking, rich-result or indexing outcome is guaranteed. Search engines make those decisions independently.

## Findings and resolution

| Area | Severity | Finding and impact | Primary files | Resolution | Status / manual action |
|---|---|---|---|---|---|
| Indexing | Critical | Demo products, draft articles and unreviewed country pages could enter the sitemap and search results. | `src/data/*`, `scripts/generate-sitemap.mjs` | Added status/indexability/review flags, noindex metadata and an allowlisted sitemap. | Implemented; publish flags only after owner approval. |
| Commercial truth | Critical | Prices, availability, MOQ, specifications, imagery and policies are demonstration data. Search and shopping surfaces could mislead buyers. | `src/data/products.ts`, policy pages | Added launch flags, removed Offers until verified and created a deployment gate. | Blocked pending owner verification. |
| Reviews | Critical | Sample testimonials resembled customer evidence. | `src/app/page.tsx` | Removed the section. Kept user-requested decorative stars aria-hidden and added no rating schema. | Implemented. |
| Metadata | High | Page files used inconsistent title, description, canonical and social metadata. | `src/app/**/page.tsx` | Added centralized config and typed metadata factories with canonical, OG, Twitter and robots output. | Implemented. |
| Canonicals | High | No exported-HTML check protected the custom-domain/trailing-slash convention. | `src/config/seo.ts`, `scripts/validate-canonicals.mjs` | Centralized absolute canonical generation and validation. | Implemented. |
| Sitemap | High | Utility, demo and review routes were included; invented priority/changefreq/current lastmod were emitted. | `scripts/generate-sitemap.mjs` | Sitemap now includes only approved canonical routes and omits unsupported hints. | Implemented. |
| Structured data | High | Product Offers could describe unverified prices/availability; schema code was duplicated. | product pages, `src/lib/seo/schema.ts` | Typed builders now omit Offers until every required launch flag is true. | Implemented; validate future Offers before publication. |
| International | High | Country pages were English, unreviewed, and lacked a safe hreflang lifecycle. | `src/data/countries.ts` | All market pages are noindex and omitted from hreflang/sitemap until reviewed and localized where promised. | Manual translation and market review required. |
| Merchant Center | High | Product data was not suitable for Shopping policies or a real feed. | product data, feed generator | Added a valid empty gated feed and setup documentation. | Manual policy, checkout, shipping, returns and product approval required. |
| Internal linking | Medium | Linking existed but had no export-level broken-link or fragment check. | site pages, `scripts/check-internal-links.mjs` | Expanded contextual links and added validation. | Implemented. |
| Content depth | Medium | Category and product pages needed selection guidance, FAQs, care, surface, shipping and related resources. | category/product components | Added practical visible guidance and related links without inventing performance claims. | Implemented; factual review still required. |
| Images | Medium | Generated imagery could be mistaken for documentary factory/product proof. | image assets and visible disclaimers | Retained accurate disclaimers, descriptive filenames/dimensions and documented replacement workflow. | Replace or approve exact imagery before launch. |
| Analytics | Medium | Optional GA existed without an event taxonomy or consent decision. | `src/components/analytics.tsx` | Kept analytics disabled by default and documented privacy-safe events/KPIs. | Manual consent and measurement-ID setup required. |
| Legal | Critical | Privacy, terms, cookie and returns text is a starting template, not approved advice. | legal pages | Marked claims as pending and included the launch gate/checklists. | Qualified legal review required. |
| Accessibility | Medium | SEO-sensitive navigation and breadcrumbs needed semantic validation. | shared components | Breadcrumbs now use nav/ol/current-page semantics; existing skip link, labels and headings retained. | Manual keyboard, contrast and screen-reader QA required. |
| Performance | Medium | Image dimensions existed but responsive sizing and production CWV were not fully measured. | image components | Retained optimized local WebP assets and explicit dimensions; documented field testing. | Measure deployed CWV and refine responsive sizes. |
| Deployment | High | GitHub Actions could publish even with commercial blockers. | `.github/workflows/deploy.yml` | Added lint/typecheck/build/SEO validators and a critical launch-readiness gate before upload. | Implemented; expected to block until checklist completion. |

## Architecture and crawlability

Next.js uses `output: "export"`, `trailingSlash: true`, static parameters for product/article routes, no dynamic server-only commerce and unoptimized local images for GitHub Pages compatibility. `robots.txt` allows crawling and references the custom-domain sitemap. Cart and order-request pages are noindex and absent from the sitemap.

The custom domain is the only canonical origin. Any `github.io` host should redirect through GitHub Pages domain configuration; do not add a second canonical host.

## On-page and information architecture

Each exported content route has one visible H1, a descriptive title/description and contextual navigation. Categories link to guides, shipping and wholesale; products link to categories, related products and guides; articles link to catalogue concepts and related articles; country pages link to categories, private label, wholesale and shipping. Automated checks protect those paths after each build.

## Structured data policy

Published schema is limited to visible, supportable entities: Organization, WebSite, WebPage/CollectionPage, BreadcrumbList, FAQPage, ItemList, Product and Article/Blog. No Review or AggregateRating is emitted. Product Offer appears only when launch readiness, price and availability are verified and the commerce mode supports it. Schema eligibility never guarantees a rich result.

## Launch blockers

The deployment gate remains intentionally red for product prices, product photos, specifications, availability, shipping, returns, factory claims, certifications, legal review and remaining placeholder/demo copy. Owners must complete `src/config/launch.ts`, publish records deliberately, regenerate, validate and review the built HTML before deployment.
