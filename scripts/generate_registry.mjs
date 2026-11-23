#!/usr/bin/env node

// Regenerates the files of the registry.json items. Runs in the pre-commit hook.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const registryPath = "registry.json";

// Lists the git index rather than the disk, so the hook only registers files
// that are part of the commit: no untracked WIP files, no gitignored screenshots.
const trackedFiles = (dir, type) =>
  execFileSync("git", ["ls-files", "-z", dir], { encoding: "utf8" })
    .split("\0")
    .filter((path) => path && !/\.(spec|test|stories)\./.test(path))
    .map((path) => ({ path, type }));

const generatedFiles = {
  admin: [
    ...trackedFiles("src/components/admin", "registry:component"),
    ...trackedFiles("src/lib", "registry:lib"),
    { path: "rules/AGENTS.md", type: "registry:file", target: "~/AGENTS.md" },
  ],
  "rich-text-input": trackedFiles(
    "src/components/rich-text-input",
    "registry:component",
  ),
};

const registry = JSON.parse(readFileSync(registryPath, "utf8"));

for (const item of registry.items) {
  if (generatedFiles[item.name]) {
    item.files = generatedFiles[item.name];
  }
}

writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
