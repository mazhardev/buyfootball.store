# Google Search Console setup

1. Add a Domain property for `buyfootball.store` using a durable business-owned Google account.
2. Add Google’s DNS TXT token at the authoritative DNS provider and verify it. A public environment token can optionally support URL-prefix verification, but DNS is preferred.
3. Confirm HTTPS and the GitHub Pages custom-domain redirect behavior.
4. Submit `https://buyfootball.store/sitemap.xml` only after the deployment launch gate passes.
5. Inspect the homepage, categories, custom, wholesale and representative published product/article URLs.
6. Review Page indexing, Sitemaps, Core Web Vitals, HTTPS, manual actions and enhancement reports after releases.

Do not request indexing for noindex demo product, review article or unreviewed country pages. Record verification ownership, recovery access and change dates. Never paste private account credentials into the repository.
