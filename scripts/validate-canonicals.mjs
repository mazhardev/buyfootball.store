import { canonicalFromHtml, failIfErrors, htmlDocuments, origin } from "./seo-validation-utils.mjs";

const errors = [];
for (const { route, html } of htmlDocuments()) {
  if (route === "/404/" || route === "/_not-found/") continue;
  const canonicals = canonicalFromHtml(html);
  if (canonicals.length !== 1) { errors.push(`${route} has ${canonicals.length} canonical tags.`); continue; }
  const expected = new URL(route, origin).toString();
  if (canonicals[0] !== expected) errors.push(`${route} canonical is ${canonicals[0]}; expected ${expected}.`);
}
failIfErrors("Canonical validation", errors);
