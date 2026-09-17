import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(path) : [path];
    }),
  );

  return files.flat();
}

const rows = [];
for (const file of (await collectFiles(distDirectory)).sort()) {
  if (![".css", ".js"].includes(extname(file))) {
    continue;
  }

  const content = await readFile(file);
  rows.push({
    file: relative(distDirectory, file),
    rawBytes: content.byteLength,
    gzipBytes: gzipSync(content).byteLength,
  });
}

console.table(rows);
