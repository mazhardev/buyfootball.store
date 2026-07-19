import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const origin = "https://buyfootball.store";
const staticRoutes = ["", "shop", "match-balls", "training-balls", "futsal-balls", "kids-footballs", "custom-footballs", "wholesale", "private-label", "about", "factory", "quality", "shipping", "contact", "faq", "cart", "order", "blog", "privacy-policy", "terms-and-conditions", "returns-policy", "cookie-policy", "usa", "uk", "germany", "france", "spain", "italy", "netherlands", "canada"];

function slugsFrom(file) {
  const source = readFileSync(resolve(file), "utf8");
  return [...source.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
}

const productRoutes = slugsFrom("src/data/products.ts").map((slug) => `products/${slug}`);
const blogRoutes = slugsFrom("src/data/blog.ts").map((slug) => `blog/${slug}`);
const routes = [...new Set([...staticRoutes, ...productRoutes, ...blogRoutes])];
const lastmod = new Date().toISOString().slice(0, 10);
const entries = routes.map((route) => {
  const loc = route ? `${origin}/${route}/` : `${origin}/`;
  const priority = route === "" ? "1.0" : route.startsWith("products/") ? "0.8" : "0.7";
  const changefreq = route.startsWith("blog/") ? "monthly" : "weekly";
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}).join("\n");
writeFileSync(resolve("public/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
console.log(`Generated public/sitemap.xml with ${routes.length} routes.`);
