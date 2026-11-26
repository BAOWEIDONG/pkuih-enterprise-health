import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const web = resolve(root, "web");
const dist = resolve(web, "dist");

function run(command, args, options = {}) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd || root,
      stdio: "inherit",
      env: { ...process.env, ...options.env }
    });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolveRun();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

await run("npm", ["run", "build"], {
  cwd: web,
  env: { VITE_BASE: "./" }
});

const html = await readFile(resolve(dist, "index.html"), "utf8");
await writeFile(resolve(root, "index.html"), html);
await rm(resolve(root, "static"), { recursive: true, force: true });
await mkdir(resolve(root, "static"), { recursive: true });
await cp(resolve(dist, "static"), resolve(root, "static"), { recursive: true });

console.log("Vue production build synchronized to repository root.");
