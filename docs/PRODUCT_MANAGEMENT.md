# Product management

## Source of truth

Products live in `src/data/products.ts`; the strict interface lives in `src/types/commerce.ts`. Every record must supply identity, category, descriptions, features, construction, surfaces, variants, materials, physical specifications, use, skill level, price, status, MOQ, images, SEO and related-product IDs.

The current 12 records are demonstrations. Before launch, verify or replace every:

- ID, slug, name and description
- USD price and compare-at price
- Construction, surface, size, color, material, panel, bladder, use, skill and weight value
- Featured/new/bestseller flags, stock status and MOQ
- Image and alt text
- SEO title and description
- Hosted payment link and certification label
- Related-product ID

## Adding a product

1. Copy an existing record and assign a unique ID and lowercase hyphenated slug.
2. Use an original product name with no protected club, league, tournament or competitor naming.
3. Add local optimized images to `public/images/` and record accurate alt text.
4. Use only valid category, construction, surface and stock values allowed by the TypeScript model.
5. Add related IDs that exist.
6. Run `npm run typecheck` and `npm run build`; the build automatically adds the slug to the sitemap and export.
7. Confirm `out/products/<slug>/index.html` exists.

## Pricing and currency

`basePriceUsd` is authoritative. `compareAtPriceUsd` must represent a genuine, supportable comparison; remove it if not valid. EUR, GBP and CAD are static display estimates configured in `src/config/site.ts`, not settlement quotes. Review rates on a defined schedule and display the original USD total in order requests.

## Variants and inventory

Only values in `sizeOptions` and `colorOptions` can be added to cart. Stock here is informational and not reserved. If live inventory becomes essential, migrate to a commerce backend rather than treating static data as synchronized stock.

## Claims and testing

Never add FIFA, environmental, ethical, professional-use or certification claims without product-specific documentation and permission. Prefer “Certification information available on request” and document test requirements in wholesale specifications.
