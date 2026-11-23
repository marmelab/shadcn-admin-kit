#!/usr/bin/env node

// Regenerates the files of the registry.json items. Runs in the pre-commit hook.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const registryPath = "registry.json";

// Lists the git index rather than the disk, so the hook only registers files
// that are part of the commit: no untracked WIP files, no gitignored screenshots.
// --error-unmatch fails on a directory without tracked files, e.g. after a rename.
const trackedFiles = (dir, type) =>
  execFileSync("git", ["ls-files", "--error-unmatch", "-z", dir], {
    encoding: "utf8",
  })
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

for (const [name, files] of Object.entries(generatedFiles)) {
  const item = registry.items.find((item) => item.name === name);
  if (!item) {
    throw new Error(`${registryPath} has no "${name}" item`);
  }
  item.files = files;
}

writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
