import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { copyFile, cp, readdir } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const webRoot = fileURLToPath(new URL(".", import.meta.url));
const repoRoot = resolve(webRoot, "..");
const assetRoot = resolve(repoRoot, "assets");

const MIME = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

function safeAssetPath(url = "") {
  const pathname = decodeURIComponent(url.split("?")[0]).replace(/^\/+/, "");
  const absolute = normalize(join(assetRoot, pathname));
  return absolute === assetRoot || absolute.startsWith(`${assetRoot}${sep}`) ? absolute : "";
}

function legacyAssets() {
  return {
    name: "pkuih-legacy-assets",
    configureServer(server) {
      server.middlewares.use("/assets", (request, response, next) => {
        const file = safeAssetPath(request.url || "");
        if (!file || !existsSync(file) || !statSync(file).isFile()) {
          next();
          return;
        }
        response.setHeader(
          "Content-Type",
          MIME[extname(file).toLowerCase()] || "application/octet-stream"
        );
        response.setHeader("Cache-Control", "no-cache");
        createReadStream(file).pipe(response);
      });
    },
    async closeBundle() {
      const output = resolve(webRoot, "dist/assets");
      mkdirSync(output, { recursive: true });
      const directories = ["avatars", "doctors", "themes", "posters", "data"];
      for (const directory of directories) {
        const source = resolve(assetRoot, directory);
        if (existsSync(source)) {
          await cp(source, resolve(output, directory), { recursive: true, force: true });
        }
      }
      const files = [
        "china-cities.json",
        "logo.svg",
        "hero-campus-960.jpg",
        "hero-campus.webp",
        "pptx-preview.umd.js"
      ];
      for (const file of files) {
        const source = resolve(assetRoot, file);
        if (existsSync(source)) {
          await copyFile(source, resolve(output, file));
        }
      }
      const themeRoot = resolve(output, "themes");
      if (existsSync(themeRoot)) {
        const expected = Array.from({ length: 12 }, (_, index) =>
          `theme-${String(index + 1).padStart(2, "0")}.jpg`
        );
        const actual = new Set(await readdir(themeRoot));
        const missing = expected.filter((file) => !actual.has(file));
        if (missing.length) {
          this.warn(`时令主题图片缺失：${missing.join(", ")}`);
        }
      }
    }
  };
}

export default defineConfig({
  root: webRoot,
  base: process.env.VITE_BASE || "/",
  publicDir: false,
  plugins: [vue(), legacyAssets()],
  resolve: {
    alias: {
      "@legacy": assetRoot,
      "@": resolve(webRoot, "src")
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_DEV_API_TARGET || "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "dist",
    assetsDir: "static",
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    target: "es2020",
    rollupOptions: {
      output: {
        entryFileNames: "static/app.[hash].js",
        chunkFileNames: "static/chunk.[hash].js",
        assetFileNames: "static/[name].[hash][extname]"
      }
    }
  }
});
