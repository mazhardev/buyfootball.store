# Google Merchant Center setup

The generated feed at `/feeds/google-merchant.xml` is intentionally valid and empty. No current product passes the commercial launch gate. Do not submit demo price, availability, imagery, identifiers, shipping or return information.

## Readiness requirements

1. Verify the business, custom domain and contact channels.
2. Provide a landing page that matches feed title, description, image, price, currency, condition and availability.
3. Confirm whether each item supports direct purchase or a policy-eligible checkout path. The present request-order flow may not qualify.
4. Approve destination shipping services/costs and a visible return policy.
5. Use a legitimate GTIN where assigned; otherwise provide the correct brand/MPN and identifier-exists treatment. Never invent identifiers.
6. Set product launch, price, availability and shipping flags only after source records are approved.
7. Generate and validate the feed, then use Merchant Center diagnostics and automatic-update settings deliberately.

Merchant Center policies change. Review current official Google documentation at implementation time. Feed validity does not guarantee approval or free/paid Shopping visibility.
