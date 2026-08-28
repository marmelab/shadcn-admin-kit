#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const cwd = process.cwd();
const registryPath = path.resolve(cwd, "registry.json");
const outputDir = path.resolve(cwd, "public/r");
const registryItemSchema = "https://ui.shadcn.com/schema/registry-item.json";

// The shadcn registry builder currently OOMs on this large, highly-connected block.
// Build it manually from the declared file list while still using shadcn for the rest.
const manualBuildItems = new Set(["rich-text-input"]);

const dedupeBy = (items, keySelector) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// "react-hook-form@^7.65.0" -> "react-hook-form", "@types/lodash" -> "@types/lodash"
const packageName = (dep) => {
  const separator = dep.lastIndexOf("@");
  return separator > 0 ? dep.slice(0, separator) : dep;
};

// The ranges declared in registry.json, indexed by package name.
const declaredRanges = (registry) => {
  const ranges = new Map();

  for (const item of registry.items) {
    for (const dep of item.dependencies ?? []) {
      const name = packageName(dep);

      if (dep !== name) {
        ranges.set(name, dep);
      }
    }
  }

  return ranges;
};

// shadcn registry:build appends the dependencies of every registry dependency
// and derives more from the imports it finds, all without a version range. A
// built item ends up with both "react-hook-form@^7.65.0" and "react-hook-form",
// and npm keeps the last spec it sees, so the unversioned one wins and the range
// we declare is silently dropped. Restore the declared range and keep a single
// entry per package.
const pinDependencies = (dependencies, ranges) => {
  const byName = new Map();

  for (const dep of dependencies) {
    const name = packageName(dep);
    const declared = ranges.get(name);

    if (declared) {
      byName.set(name, declared);
      continue;
    }

    const kept = byName.get(name);

    // Prefer whichever spec carries a range over the bare package name.
    if (kept === undefined || kept === name) {
      byName.set(name, dep);
    }
  }

  return [...byName.values()];
};

const withFileContents = async (item) => {
  if (!item.files?.length) {
    return item;
  }

  item.files = dedupeBy(item.files, (file) => file.path);

  for (const file of item.files) {
    const filePath = path.resolve(cwd, file.path);
    const fileStat = await stat(filePath).catch(() => null);

    if (!fileStat?.isFile()) {
      throw new Error(
        `Manual registry build failed: file not found for item "${item.name}": ${file.path}`,
      );
    }

    file.content = await readFile(filePath, "utf8");
  }

  return item;
};

const run = async () => {
  const rawRegistry = await readFile(registryPath, "utf8");
  const registry = JSON.parse(rawRegistry);

  await mkdir(outputDir, { recursive: true });

  const autoBuiltItems = registry.items.filter(
    (item) => !manualBuildItems.has(item.name),
  );

  if (autoBuiltItems.length > 0) {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "shadcn-registry-"));
    const tempRegistryPath = path.join(tempDir, "registry.json");

    await writeFile(
      tempRegistryPath,
      JSON.stringify({ ...registry, items: autoBuiltItems }, null, 2),
    );

    execFileSync(
      "pnpm",
      ["exec", "shadcn", "registry:build", tempRegistryPath, "-o", outputDir],
      { cwd, stdio: "inherit" },
    );

    await rm(tempDir, { recursive: true, force: true });

    const ranges = declaredRanges(registry);

    for (const item of autoBuiltItems) {
      const builtPath = path.join(outputDir, `${item.name}.json`);
      const built = JSON.parse(await readFile(builtPath, "utf8"));

      if (!built.dependencies?.length) {
        continue;
      }

      built.dependencies = pinDependencies(built.dependencies, ranges);
      await writeFile(builtPath, `${JSON.stringify(built, null, 2)}\n`);
    }
  }

  const manualItems = registry.items.filter((item) => manualBuildItems.has(item.name));

  for (const item of manualItems) {
    const itemCopy = JSON.parse(JSON.stringify(item));
    itemCopy.$schema = registryItemSchema;

    if (itemCopy.dependencies) {
      itemCopy.dependencies = dedupeBy(itemCopy.dependencies, (dep) => dep);
    }

    if (itemCopy.devDependencies) {
      itemCopy.devDependencies = dedupeBy(
        itemCopy.devDependencies,
        (dep) => dep,
      );
    }

    if (itemCopy.registryDependencies) {
      itemCopy.registryDependencies = dedupeBy(
        itemCopy.registryDependencies,
        (dep) => dep,
      );
    }

    await withFileContents(itemCopy);

    await writeFile(
      path.join(outputDir, `${itemCopy.name}.json`),
      `${JSON.stringify(itemCopy, null, 2)}\n`,
    );
  }

  await copyFile(registryPath, path.join(outputDir, "registry.json"));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
