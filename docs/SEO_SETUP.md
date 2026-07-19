# SEO setup (legacy quick reference)

The current operational guide is `docs/SEO_README.md`; the audit and implementation record are `docs/SEO_AUDIT.md` and `docs/SEO_IMPLEMENTATION_REPORT.md`.

The site uses canonical origin `https://buyfootball.store`, page-level metadata, Open Graph/Twitter tags, semantic headings, internal links, local images, JSON-LD and a build-time sitemap. SEO is an accurate publishing practice, not a ranking guarantee.

## Google Search Console

1. Add a **Domain property** for `buyfootball.store`.
2. Copy Google’s TXT verification value into the DNS provider exactly.
3. Wait for DNS propagation and verify the property.
4. Submit `https://buyfootball.store/sitemap.xml` under **Sitemaps**.
5. Inspect the homepage, key categories, products, articles and country pages.
6. Monitor Page indexing, Core Web Vitals, HTTPS and structured-data reports.

Domain verification is preferred because it covers HTTPS, `www` and other protocol/host variants. Keep access with a durable business-owned Google account.

## Bing Webmaster Tools

Add the site directly or import the verified Search Console property. Verify ownership, submit the same sitemap and review crawl/index reports. Configure business-owned access rather than a contractor’s personal account.

## Sitemap and robots

`npm run build` generates an allowlisted sitemap and an empty gated merchant feed. Demo products, review articles, unreviewed country pages and utility routes are excluded. `public/robots.txt` allows crawling and references the production sitemap.

After changing a slug, build again and verify the old URL strategy. GitHub Pages has no native redirect rules; preserve valuable slugs or move to hosting that supports redirects.

## Metadata updates

- Root defaults: `src/app/layout.tsx`
- Page metadata: each route’s `page.tsx`
- Product metadata: `src/data/products.ts` plus the product dynamic route
- Article metadata: `src/data/blog.ts` plus the blog dynamic route
- Country metadata: `src/data/countries.ts`
- Production URL and business identity: `src/config/site.ts`

Titles and descriptions should accurately describe the visible page and avoid repetitive keyword lists. Keep one descriptive H1 and logical H2/H3 structure.

## Real product information

Replace all demonstration product records. Use stable, unique slugs; original names; verified descriptions; real prices; supportable comparison prices; correct variants; documented construction and surface guidance; accurate stock; real MOQ; and rights-cleared images. Do not expose internal cost or supplier secrets.

## Product feed / Google Merchant Center preparation

The site generates a valid empty Merchant Center feed. Before adding any item, establish:

- Stable product IDs and landing URLs
- Accurate price, currency, availability and condition
- High-quality product images without promotional overlays
- Destination-specific shipping and return settings
- Verified business identity and contact information
- A real purchase path accepted by the target program
- Product identifiers such as brand/GTIN/MPN where legitimately assigned

The current order-request-only flow may not meet every marketplace program’s checkout requirements. Review current Merchant Center policies before submission.

## Image naming and alt text

Use descriptive names such as `elite-pro-match-ball-front.webp`, not camera filenames. Alt text should identify the product and useful visible detail without keyword stuffing. Decorative graphics should use empty alt text. Keep explicit dimensions to reduce layout shift. The current AI-generated imagery is illustrative and must not be presented as proof of a product specification or facility.

## Internal linking

Connect categories to products, products to related products, articles to relevant categories, countries to custom/wholesale/shipping pages, and navigation/footer links to key routes. Review links whenever slugs change. Avoid orphaned pages and excessive repeated anchor text.

## Review markup restrictions

Do not add aggregate rating or review JSON-LD for sample, imported without permission, organization-written or unverifiable testimonials. Mark up reviews only when genuine reviews are visibly displayed and eligible under current search-engine rules. The product structured data intentionally has no rating.

## Country-content safeguards

Each country page must remain useful and materially distinct in terminology, shipping context, currency and FAQs. Do not swap only the country name, create claims of local inventory, hide duplicate content behind canonicals, or mass-produce keyword doorway pages. Consolidate pages that cannot sustain unique value.

## Monitoring

Monthly: review indexing, submitted/discovered URL counts, manual actions, rich-result reports, top landing pages and queries, broken links, Core Web Vitals and sitemap status. After releases, inspect changed URLs and compare coverage rather than expecting immediate ranking movement.
