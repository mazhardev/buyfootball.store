import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

export const projectRoot = resolve(".");
export const outRoot = resolve("out");
export const origin = "https://buyfootball.store";

export function assertExportExists() {
  if (!existsSync(outRoot)) throw new Error("Static export directory 'out' does not exist. Run npm run build first.");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

export function htmlDocuments() {
  assertExportExists();
  return walk(outRoot).filter((file) => file.endsWith(".html")).map((file) => ({ file, route: routeFromFile(file), html: readFileSync(file, "utf8") }));
}

export function routeFromFile(file) {
  const path = relative(outRoot, file).split(sep).join("/");
  if (path === "index.html") return "/";
  if (path.endsWith("/index.html")) return `/${path.slice(0, -"index.html".length)}`;
  return `/${path.replace(/\.html$/u, "/")}`;
}

export function canonicalFromHtml(html) {
  return [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/giu)].map(([tag]) => tag.match(/href=["']([^"']+)["']/iu)?.[1]).filter(Boolean);
}

export function metaContent(html, name) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/giu)].map(([tag]) => tag);
  const tag = tags.find((item) => new RegExp(`(?:name|property)=["']${name.replace(".", "\\.")}["']`, "iu").test(item));
  return tag?.match(/content=["']([^"']*)["']/iu)?.[1] ?? "";
}

export function titleFromHtml(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/iu)?.[1]?.trim() ?? "";
}

export function jsonLdFromHtml(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)].map((match) => JSON.parse(match[1]));
}

export function schemaTypes(value, types = []) {
  if (Array.isArray(value)) value.forEach((item) => schemaTypes(item, types));
  else if (value && typeof value === "object") {
    if (typeof value["@type"] === "string") types.push(value["@type"]);
    Object.values(value).forEach((item) => schemaTypes(item, types));
  }
  return types;
}

export function failIfErrors(label, errors, warnings = []) {
  warnings.forEach((warning) => console.warn(`WARN ${warning}`));
  if (errors.length) {
    errors.forEach((error) => console.error(`ERROR ${error}`));
    console.error(`${label} failed with ${errors.length} error(s).`);
    process.exitCode = 1;
    return;
  }
  console.log(`${label} passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`);
}
