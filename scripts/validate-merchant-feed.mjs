import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { failIfErrors } from "./seo-validation-utils.mjs";

const xml = readFileSync(resolve("public/feeds/google-merchant.xml"), "utf8");
const errors = [];
if (!xml.includes('<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">')) errors.push("Merchant feed is missing the Google namespace or RSS version.");
if (!xml.includes("<channel>") || !xml.includes("</channel>")) errors.push("Merchant feed has no complete channel.");
for (const item of xml.matchAll(/<item>([\s\S]*?)<\/item>/gu)) {
  ["g:id", "g:title", "g:description", "g:link", "g:image_link", "g:availability", "g:price", "g:condition"].forEach((field) => { if (!item[1].includes(`<${field}>`)) errors.push(`Merchant item is missing ${field}.`); });
}
failIfErrors("Merchant-feed validation", errors);
