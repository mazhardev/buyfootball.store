# BuyFootball.Store

Production-oriented static commerce frontend for factory-developed footballs manufactured in Sialkot, Pakistan. The site serves individual buyers, clubs, academies, schools, retailers, wholesalers, promotional teams and private-label customers without pretending to provide backend checkout.

> Launch warning: the catalogue is demonstration content. Product names, prices, compare-at prices, specifications, stock, minimum quantities, images, certification labels and sample testimonials must be replaced or verified before publication.

## Architecture

- Next.js 16 App Router, React 19 and strict TypeScript
- Tailwind CSS 4 plus project CSS for the visual system
- React Server Components for static content; small client components for filters, cart, currency, forms and mobile navigation
- `output: "export"`, trailing slashes and unoptimized local images for GitHub Pages
- No API routes, route handlers, middleware, server actions, authentication, database, sessions, ISR or runtime Node.js requirement
- Client cart and currency preference stored in `localStorage`
- Static product/blog sources with `generateStaticParams()`
- Build-time sitemap generation and static structured data

## Local setup

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Useful commands:

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run build` runs the sitemap generator first and creates the deployable `out/` directory. `npm run preview` serves that exported folder locally.

## Static-hosting limitations

- Cart and currency choices live only in the current browser/device.
- No inventory reservation, payment capture, account, server validation, shipping calculation, tax calculation or order database exists.
- Order and inquiry flows generate WhatsApp, email or clipboard content. An optional external form endpoint can receive forms.
- Currency rates are static display estimates in `src/config/site.ts`; USD remains the source price.
- Hosted payment links are external and configured per product. Missing links correctly show “Request order”.
- Analytics and third-party forms need privacy/consent review for each target market.

## Manage products and prices

Edit `src/data/products.ts`. The `Product` contract is in `src/types/commerce.ts`. Keep IDs and slugs unique, use original non-infringing names, and verify every price, claim and specification. `basePriceUsd` is the authoritative catalogue value. Update static display rates separately in `src/config/site.ts`.

See `docs/PRODUCT_MANAGEMENT.md` for the full checklist.

## Replace images

All current visuals in `public/images/` are local placeholders with explicit dimensions. Replace them with optimized, rights-cleared files while preserving the referenced filenames or updating product/blog data.

Required real photography before launch:

- Product front, detail and alternate-angle photographs
- Factory and production-process photographs
- Packaging and carton photographs
- Quality-control and testing photographs
- Custom printing, artwork approval and private-label photographs

Use descriptive lower-case filenames, record image dimensions and write accurate alt text. Do not use protected club or tournament marks without permission.

## Business configuration

Update `src/config/site.ts`:

- Contact email
- WhatsApp number in international digits-only format
- Factory/contact location and social profiles
- Shipping message and supported currencies
- Static exchange-rate estimates

Copy `.env.example` to `.env.local` for local configuration:

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=
```

Only public identifiers belong in `NEXT_PUBLIC_*` variables. Never add secret API keys to browser code or the repository.

### WhatsApp and email

The number and email come from the central site config. Order messages use `encodeURIComponent()`, preserve the USD subtotal and include the selected display-currency estimate. Verify links on mobile and desktop before launch.

### External forms

Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` only to a trusted HTTPS form service configured to accept the form fields. With no endpoint, the interface gives a useful message and keeps WhatsApp/email/copy options.

### Hosted payment links

Add a verified HTTPS URL to `externalPaymentLink` for a product. The external provider owns payment security, settlement, refund and privacy behavior. Without a link the product remains an order request—never a fake checkout.

### Analytics

Set `NEXT_PUBLIC_GA_ID` to a valid public GA measurement ID. The analytics scripts are omitted completely when blank. Review consent obligations and update the privacy/cookie text before enabling it.

## SEO checklist

- Replace demonstration metadata, catalogue and business details.
- Replace SVG social/product placeholders with high-quality optimized images.
- Confirm canonical production origin remains `https://buyfootball.store`.
- Run the build to regenerate `public/sitemap.xml`.
- Test `robots.txt`, structured data, internal links, 404 and country-page originality.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Add review markup only for genuine, displayed, eligible reviews.

Full instructions: `docs/SEO_SETUP.md`.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch. It installs with `npm ci`, lints, type-checks, builds, verifies `out/`, adds `.nojekyll`, uploads the Pages artifact and deploys it using official actions.

1. Create a repository and push this project to `main`.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Let the workflow complete.
4. Add `buyfootball.store` as the custom domain and configure DNS.
5. Enable HTTPS after DNS verification.

`public/CNAME` is included, but repository Pages settings are authoritative. See `docs/GITHUB_PAGES_DEPLOYMENT.md`.

## Launch checklist

1. Replace all demonstration catalogue, testimonials and imagery.
2. Verify company identity, email, WhatsApp, social links and address.
3. Approve pricing, MOQ, stock, shipping, returns, terms and privacy text.
4. Test all product variants and order/inquiry channels.
5. Run lint, typecheck and build; inspect the exported site.
6. Configure Search Console, DNS, HTTPS and optional analytics/forms.

Use `docs/CONTENT_REPLACEMENT_CHECKLIST.md` and `docs/LAUNCH_CHECKLIST.md` for the full owner sign-off.

## Future backend migration

Keep the current UI and replace data/adapters in stages:

- Shopify Storefront API for catalogue and inventory
- Stripe Checkout or PayPal for hosted payment
- Order database, shipping-rate API and tax service
- Customer accounts and an admin dashboard
- Locale-aware routing and translations
- Live exchange-rate service
- Moderated product reviews
- Consent-aware email marketing

Move secrets and privileged calls to a secured backend. Do not bolt private credentials onto the current static client.
