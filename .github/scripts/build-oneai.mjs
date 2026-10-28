import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parseEnv } from "node:util";

// Standalone OneAI build:
//   1. Load .env.oneai (site URL, SEO overrides, BUILD_TARGET)
//      - values already present in the environment (e.g. CI) take precedence
//   2. Build and export the site with Next.js
//   3. Stage the OneAI-only static build into out-oneai/
const ENV_FILE = ".env.oneai";
const STEPS = [
  {
    command: "bun",
    args: ["run", "build"],
    label: "Build and export"
  },
  {
    command: "node",
    args: [".github/scripts/prepare-oneai-deploy.mjs"],
    label: "Prepare OneAI static deployment"
  }
];

let env = {};
try {
  env = parseEnv(readFileSync(ENV_FILE, "utf8"));
} catch (error) {
  console.error(`❌ Cannot read ${ENV_FILE}: ${error?.message ?? error}`);
  process.exit(1);
}

const loadedKeys = Object.keys(env).filter(
  (key) => process.env[key] === undefined
);
if (loadedKeys.length > 0) {
  console.info(`Loaded env from ${ENV_FILE}: ${loadedKeys.join(", ")}`);
}

// Variables from the current environment (local shell or CI) win over the file
const childEnv = { ...env, ...process.env };

for (const step of STEPS) {
  console.info(`\n▶ ${step.label}`);
  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    env: childEnv,
    shell: process.platform === "win32"
  });
  if (result.status !== 0) {
    console.error(`❌ ${step.label} failed with exit code ${result.status}`);
    process.exit(result.status ?? 1);
  }
}

console.info("\n✅ OneAI static build ready in out-oneai/");
