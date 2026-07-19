import { failIfErrors, htmlDocuments, metaContent, titleFromHtml } from "./seo-validation-utils.mjs";

const errors = [];
const warnings = [];
for (const { route, html } of htmlDocuments()) {
  if (route === "/404/") continue;
  const title = titleFromHtml(html);
  const description = metaContent(html, "description");
  const robots = metaContent(html, "robots").toLowerCase();
  const h1Count = [...html.matchAll(/<h1\b/giu)].length;
  if (!title) errors.push(`${route} has no title.`);
  if (!description) errors.push(`${route} has no meta description.`);
  if (h1Count !== 1) errors.push(`${route} has ${h1Count} H1 elements; expected one.`);
  if (!metaContent(html, "og:title") || !metaContent(html, "og:description") || !metaContent(html, "og:image")) errors.push(`${route} is missing required Open Graph metadata.`);
  if (!metaContent(html, "twitter:card") || !metaContent(html, "twitter:title")) errors.push(`${route} is missing required Twitter metadata.`);
  const mustNoIndex = /^\/(?:cart|order|products\/|blog\/[^/]+\/|usa\/|uk\/|canada\/|germany\/|france\/|spain\/|italy\/|netherlands\/)/u.test(route);
  if (mustNoIndex && !robots.includes("noindex")) errors.push(`${route} must be noindex while it is utility, demo, or unreviewed content.`);
  if (title.length > 70) warnings.push(`${route} title is ${title.length} characters.`);
  if (description.length > 170) warnings.push(`${route} description is ${description.length} characters.`);
}
failIfErrors("Metadata validation", errors, warnings);
