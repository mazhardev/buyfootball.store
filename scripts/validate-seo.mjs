import { spawnSync } from "node:child_process";

const scripts = ["validate-sitemap.mjs", "validate-canonicals.mjs", "validate-metadata.mjs", "validate-structured-data.mjs", "check-internal-links.mjs", "validate-merchant-feed.mjs"];
let failed = false;
for (const script of scripts) {
  const result = spawnSync(process.execPath, [`scripts/${script}`], { stdio: "inherit" });
  if (result.status !== 0) failed = true;
}
if (failed) process.exitCode = 1;
else console.log("All automated SEO validators passed.");
