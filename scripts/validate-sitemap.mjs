import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { canonicalFromHtml, failIfErrors, htmlDocuments, origin } from "./seo-validation-utils.mjs";

const xml = readFileSync(resolve("public/sitemap.xml"), "utf8");
const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1]);
const errors = [];
if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) errors.push("sitemap.xml is missing the sitemap urlset namespace.");
if (!locations.length) errors.push("sitemap.xml has no URL entries.");
if (new Set(locations).size !== locations.length) errors.push("sitemap.xml contains duplicate URLs.");
for (const location of locations) {
  if (!location.startsWith(`${origin}/`)) errors.push(`Non-production sitemap URL: ${location}`);
  if (!location.endsWith("/")) errors.push(`URL does not use the trailing-slash convention: ${location}`);
  if (/\/(?:cart|order)\/$/u.test(location)) errors.push(`Utility route must not be in the sitemap: ${location}`);
}
const canonicalSet = new Set(htmlDocuments().flatMap(({ html }) => canonicalFromHtml(html)));
locations.forEach((location) => { if (!canonicalSet.has(location)) errors.push(`Sitemap URL has no matching exported canonical: ${location}`); });
failIfErrors("Sitemap validation", errors);
