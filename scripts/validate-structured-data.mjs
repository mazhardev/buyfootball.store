import { failIfErrors, htmlDocuments, jsonLdFromHtml, schemaTypes } from "./seo-validation-utils.mjs";

const errors = [];
for (const { route, html } of htmlDocuments()) {
  if (route === "/404/" || route === "/_not-found/") continue;
  let blocks;
  try { blocks = jsonLdFromHtml(html); } catch (error) { errors.push(`${route} contains invalid JSON-LD: ${error.message}`); continue; }
  const types = schemaTypes(blocks);
  if (!types.includes("Organization") || !types.includes("WebSite")) errors.push(`${route} is missing root Organization or WebSite schema.`);
  if (html.includes('class="breadcrumbs"') && !types.includes("BreadcrumbList")) errors.push(`${route} has visible breadcrumbs without BreadcrumbList schema.`);
  if (route.startsWith("/products/") && !types.includes("Product")) errors.push(`${route} is missing Product schema.`);
  if (/^\/blog\/[^/]+\/$/u.test(route) && !types.includes("Article")) errors.push(`${route} is missing Article schema.`);
  if (html.includes('class="faq-list"') || route === "/faq/") { if (!types.includes("FAQPage")) errors.push(`${route} has visible FAQs without FAQPage schema.`); }
}
failIfErrors("Structured-data validation", errors);
