import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(root, "src/data/lessons.ts"), "utf8");
const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (new Set(slugs).size !== slugs.length) {
  console.error("duplicate slugs");
  process.exit(1);
}
console.log(`OK ${slugs.length} lessons`);
