# SEO measurement plan

## Outcomes

Primary outcomes are qualified product, custom and wholesale inquiries—not raw traffic. Supporting outcomes are useful guide engagement, category/product discovery and successful contact-channel transitions.

## KPIs

- Search visibility: valid indexed canonical pages, impressions, clicks, CTR and average position by page/query/market.
- Commerce intent: product views, variant selections, add-to-cart actions, order-request starts and outbound WhatsApp/email actions.
- B2B intent: custom/wholesale form starts and successful provider submissions where measurable.
- Content: guide entrances, engaged sessions, contextual category clicks and assisted inquiries.
- Quality: crawl errors, sitemap status, Core Web Vitals, structured-data validity and launch-gate status.

## Event taxonomy

Recommended events: `view_item`, `select_item_variant`, `add_to_cart`, `view_cart`, `begin_order_request`, `contact_whatsapp`, `contact_email`, `generate_lead` and `view_guide`. Send product ID/category/value/currency and non-sensitive interaction context only. Never send names, phone numbers, email addresses, message text, delivery addresses or artwork details to analytics.

Analytics remains disabled until `NEXT_PUBLIC_GA_ID` is configured and the consent/privacy approach is approved. Test in a non-production property, exclude internal traffic where practical, document retention, and reconcile analytics trends with actual qualified inquiries. Numbers from different systems will not match exactly.

## Cadence

Weekly after launch: deployment errors and lead delivery. Monthly: search/page/query trends, indexing, CWV and top landing pages. Quarterly: content pruning/updates, keyword-map changes, market expansion decisions and commercial-data re-verification.
