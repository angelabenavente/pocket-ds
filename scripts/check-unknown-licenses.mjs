import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const licenseCheckerBin = require.resolve("license-checker/bin/license-checker");

const raw = execFileSync(
  process.execPath,
  [licenseCheckerBin, "--json", "--excludePrivatePackages"],
  { encoding: "utf8" },
);

const inventory = JSON.parse(raw);
const unknown = Object.entries(inventory).filter(([, info]) => {
  const license = info.licenses?.trim();
  return !license || license === "UNKNOWN";
});

if (unknown.length > 0) {
  console.error("Packages with unknown or missing licenses:");
  for (const [name, info] of unknown) {
    console.error(`- ${name}: ${info.licenses ?? "(none)"}`);
  }
  process.exit(1);
}

console.log("No unknown or missing licenses in the dependency inventory.");
