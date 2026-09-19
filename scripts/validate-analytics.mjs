import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { failIfErrors } from "./seo-validation-utils.mjs";

const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? "";
const errors = [];

function filesIn(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? filesIn(path) : [path];
  });
}

if (!/^G-[A-Z0-9]+$/u.test(measurementId)) {
  errors.push("NEXT_PUBLIC_GA_ID must be a valid GA4 measurement ID during the production build.");
} else {
  const outputFiles = filesIn(resolve("out")).filter((file) => /\.(?:html|js)$/u.test(file));
  const analyticsBundled = outputFiles.some((file) => readFileSync(file, "utf8").includes(measurementId));
  if (!analyticsBundled) errors.push(`The static export does not contain Google Analytics ID ${measurementId}.`);
}

failIfErrors("Google Analytics validation", errors);
