import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const origin = "https://buyfootball.store";

// Only public, canonical, indexable routes belong here. Product, article and
// country pages are intentionally excluded until their data flags are published
// and human-reviewed. Utility routes are never included.
const indexableRoutes = [
  "/",
  "/shop/",
  "/match-balls/",
  "/training-balls/",
  "/futsal-balls/",
  "/kids-footballs/",
  "/custom-footballs/",
  "/wholesale/",
  "/private-label/",
  "/about/",
  "/factory/",
  "/quality/",
  "/shipping/",
  "/contact/",
  "/faq/",
  "/blog/",
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/returns-policy/",
  "/cookie-policy/",
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const entries = indexableRoutes.map((route) => `  <url><loc>${escapeXml(new URL(route, origin).toString())}</loc></url>`).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`Generated public/sitemap.xml with ${indexableRoutes.length} indexable routes.`);
