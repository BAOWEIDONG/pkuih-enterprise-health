import { existsSync, readdirSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright";
import { serveDirectory } from "./static-server.mjs";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

const webRoot = fileURLToPath(new URL("..", import.meta.url));
const repoRoot = resolve(webRoot, "..");
const outputRoot = resolve(webRoot, "test-results/parity");
const widths = [320, 390, 430];
const tabs = ["home", "experts", "appointments", "me"];

function digest(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function comparePng(actual, expected) {
  const left = PNG.sync.read(actual);
  const right = PNG.sync.read(expected);
  if (left.width !== right.width || left.height !== right.height) {
    return {
      pixels: Math.max(left.width * left.height, right.width * right.height),
      total: Math.max(left.width * left.height, right.width * right.height),
      diff: null
    };
  }
  const diff = new PNG({ width: left.width, height: left.height });
  const pixels = pixelmatch(left.data, right.data, diff.data, left.width, left.height, {
    threshold: 0
  });
  return { pixels, total: left.width * left.height, diff };
}

async function ready(page) {
  await page.waitForSelector(".app-frame", { state: "attached" });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(650);
}

function browserExecutable() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const bundled = chromium.executablePath();
  if (bundled && existsSync(bundled)) return bundled;
  const cacheRoot = join(homedir(), "Library/Caches/ms-playwright");
  if (!existsSync(cacheRoot)) return undefined;
  const candidates = readdirSync(cacheRoot)
    .filter((name) => name.startsWith("chromium-"))
    .sort()
    .reverse()
    .map((name) =>
      join(
        cacheRoot,
        name,
        "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
      )
    );
  return candidates.find((candidate) => existsSync(candidate));
}

const [staticServer, vueServer] = await Promise.all([
  serveDirectory(repoRoot),
  serveDirectory(resolve(webRoot, "dist"))
]);
await mkdir(outputRoot, { recursive: true });

const browser = await chromium.launch({
  executablePath: browserExecutable(),
  headless: true
});
const failures = [];

try {
  for (const width of widths) {
    const viewport = { width, height: 844 };
    const [staticContext, vueContext] = await Promise.all([
      browser.newContext({ viewport, deviceScaleFactor: 1, locale: "zh-CN" }),
      browser.newContext({ viewport, deviceScaleFactor: 1, locale: "zh-CN" })
    ]);
    const [staticPage, vuePage] = await Promise.all([
      staticContext.newPage(),
      vueContext.newPage()
    ]);
    const runtimeErrors = [];
    vuePage.on("pageerror", (error) => runtimeErrors.push(error.message));
    vuePage.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });

    await Promise.all([
      staticPage.goto(`${staticServer.url}/index.legacy.html`, { waitUntil: "networkidle" }),
      vuePage.goto(`${vueServer.url}/`, { waitUntil: "networkidle" })
    ]);
    await Promise.all([ready(staticPage), ready(vuePage)]);

    for (const tab of tabs) {
      if (tab !== "home") {
        await Promise.all([
          staticPage.click(`[data-action="tab"][data-tab="${tab}"]`),
          vuePage.click(`[data-action="tab"][data-tab="${tab}"]`)
        ]);
        await Promise.all([staticPage.waitForTimeout(650), vuePage.waitForTimeout(650)]);
      }
      const [staticShot, vueShot] = await Promise.all([
        staticPage.screenshot({ fullPage: false }),
        vuePage.screenshot({ fullPage: false })
      ]);
      const name = `${width}-${tab}`;
      await writeFile(resolve(outputRoot, `${name}-static.png`), staticShot);
      await writeFile(resolve(outputRoot, `${name}-vue.png`), vueShot);
      if (digest(staticShot) !== digest(vueShot)) {
        const result = comparePng(vueShot, staticShot);
        if (result.diff) {
          await writeFile(resolve(outputRoot, `${name}-diff.png`), PNG.sync.write(result.diff));
        }
        failures.push(
          `${name}: ${result.pixels}/${result.total} pixels differ (${(
            (result.pixels / result.total) * 100
          ).toFixed(3)}%)`
        );
      }
    }
    if (runtimeErrors.length) {
      failures.push(`${width}px runtime errors: ${runtimeErrors.join(" | ")}`);
    }
    await Promise.all([staticContext.close(), vueContext.close()]);
  }
} finally {
  await browser.close();
  await Promise.all([staticServer.close(), vueServer.close()]);
}

if (failures.length) {
  console.error("Visual parity failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `Visual parity passed: ${widths.length * tabs.length} screenshots across ${widths.join(
      ", "
    )}px are pixel-identical.`
  );
}
