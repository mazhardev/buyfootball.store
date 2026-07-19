import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve("src/config/launch.ts"), "utf8");
const checks = [...source.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", complete: (true|false), critical: (true|false)/gu)].map((match) => ({ id: match[1], label: match[2], complete: match[3] === "true", critical: match[4] === "true" }));
const unresolved = checks.filter((check) => !check.complete);
const critical = unresolved.filter((check) => check.critical);
const deploymentMode = process.argv.includes("--deployment") || process.env.SEO_DEPLOYMENT_CHECK === "true";

console.log(`Launch readiness: ${checks.length - unresolved.length}/${checks.length} checks complete.`);
unresolved.forEach((check) => console.warn(`${check.critical ? "CRITICAL" : "MANUAL"} ${check.id}: ${check.label}`));
if (deploymentMode && critical.length) {
  console.error(`Deployment blocked by ${critical.length} unresolved critical launch check(s).`);
  process.exitCode = 1;
} else if (critical.length) {
  console.warn(`Local check completed with ${critical.length} critical blocker(s); deployment mode will fail.`);
} else {
  console.log("Launch-readiness gate passed.");
}
