import { readFile } from "node:fs/promises";

const minimumPerFile = 60;
const reportUrl = new URL("../coverage/coverage-summary.json", import.meta.url);
const report = JSON.parse(await readFile(reportUrl, "utf8"));
const failures = [];

for (const [file, metrics] of Object.entries(report)) {
  if (file === "total") {
    continue;
  }

  for (const metric of ["branches", "functions", "lines", "statements"]) {
    const percentage = metrics[metric].pct;
    if (percentage < minimumPerFile) {
      failures.push(`${file}: ${metric} ${percentage}% < ${minimumPerFile}%`);
    }
  }
}

if (failures.length > 0) {
  throw new Error(
    `Per-file coverage threshold failed:\n${failures.join("\n")}`,
  );
}

console.log(`Per-file coverage is at least ${minimumPerFile}%`);
