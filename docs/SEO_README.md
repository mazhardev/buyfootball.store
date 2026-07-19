# SEO operations

## Source of truth

- Global identity, locales, canonicals and indexing: `src/config/seo.ts`
- Page metadata registry: `src/config/page-metadata.ts`
- Product/article/country publishing state: `src/data/`
- Launch blockers: `src/config/launch.ts`
- Typed structured data: `src/lib/seo/schema.ts`
- Sitemap/feed and validators: `scripts/`

## Commands

```text
npm install
npm run lint
npm run typecheck
npm run build
npm run seo:validate
npm run seo:launch-check
```

`build` regenerates the sitemap and merchant feed before exporting. The normal launch check reports blockers without failing local work; `npm run seo:launch-check:deploy` fails on unresolved critical checks and is enforced by GitHub Actions.

## Publishing a product or article

Verify the complete record, replace demonstration text/images, set `status: "published"` and `indexable: true`, and satisfy the relevant launch flags. Product Offers require launch, price and availability verification. Update the sitemap/feed generator when a newly eligible record class should be included; then build and inspect the exported page, canonical, robots, JSON-LD and links.

## International pages

Do not enable market pages or hreflang until human review and promised translation are complete. Follow `INTERNATIONAL_SEO.md`.

## Environment

Copy `.env.example` values through the deployment environment. Verification tokens are public by design, but credentials and secrets must never enter `NEXT_PUBLIC_*` variables. Keep indexing disabled for previews. Production indexing is a deliberate release decision.

## Release review

Run all automated checks, manually inspect mobile/desktop rendering, keyboard behavior and real contact flows, then complete the owner/legal checklist. A passing validator proves technical consistency, not factual truth, policy approval, indexing or ranking.
