import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { failIfErrors, htmlDocuments, outRoot } from "./seo-validation-utils.mjs";

const errors = [];
const routeFile = (path) => path === "/" ? join(outRoot, "index.html") : join(outRoot, path.replace(/^\//u, ""), "index.html");
for (const { route, html } of htmlDocuments()) {
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/giu)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
    const url = new URL(href, "https://buyfootball.store");
    const target = routeFile(url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`);
    if (!existsSync(target)) { errors.push(`${route} links to missing ${href}.`); continue; }
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetHtml = readFileSync(target, "utf8");
      if (!new RegExp(`(?:id|name)=["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "u").test(targetHtml)) errors.push(`${route} links to missing fragment ${href}.`);
    }
  }
}
failIfErrors("Internal-link validation", [...new Set(errors)]);
