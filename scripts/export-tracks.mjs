/**
 * Gera server/data/tracks.json a partir de src/data/lessons.ts
 * Executar: node --import tsx scripts/export-tracks.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lessonsUrl = pathToFileURL(join(root, "src", "data", "lessons.ts")).href;
const { tracks } = await import(lessonsUrl);
const outDir = join(root, "server", "data");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "tracks.json");
writeFileSync(outFile, JSON.stringify(tracks));
console.log("Escrito:", outFile);
