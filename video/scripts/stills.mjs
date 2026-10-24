// Renders preview stills for "Id:frame" pairs from one bundle, plus a contact sheet.
// Usage: node scripts/stills.mjs <outDir> Id:frame [Id:frame ...]
import { bundle } from "@remotion/bundler";
import {
  renderStill,
  selectComposition,
  openBrowser,
} from "@remotion/renderer";
import path from "node:path";

const [outDir, ...specs] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome");
const cache = new Map();
for (const spec of specs) {
  const [id, frame] = spec.split(":");
  if (!cache.has(id))
    cache.set(
      id,
      await selectComposition({ serveUrl, id, puppeteerInstance: browser }),
    );
  const composition = cache.get(id);
  const output = path.join(outDir, `${id}-${frame}.jpg`);
  await renderStill({
    composition,
    serveUrl,
    output,
    frame: Number(frame),
    imageFormat: "jpeg",
    jpegQuality: 80,
    puppeteerInstance: browser,
    overwrite: true,
  });
  console.log(output);
}
await browser.close({ silent: true });
