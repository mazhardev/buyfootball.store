import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Products remain demonstration/review records. The feed stays valid but empty
// until launchReady, priceVerified, availabilityVerified and shippingEligible
// are all true in the catalogue and the generator is extended for those records.
const items = [];
const body = items.join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n  <channel>\n    <title>BuyFootball.Store products</title>\n    <link>https://buyfootball.store/</link>\n    <description>Verified, launch-ready football products only.</description>${body ? `\n${body}` : ""}\n  </channel>\n</rss>\n`;

mkdirSync(resolve("public", "feeds"), { recursive: true });
writeFileSync(resolve("public", "feeds", "google-merchant.xml"), xml);
console.log("Generated a valid empty merchant feed; no products pass the launch-readiness gate.");
