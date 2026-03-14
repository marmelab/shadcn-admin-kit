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
      ["exec", "shadcn", "build", tempRegistryPath, "-o", outputDir],
      { cwd, stdio: "inherit" },
    );

    await rm(tempDir, { recursive: true, force: true });
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
