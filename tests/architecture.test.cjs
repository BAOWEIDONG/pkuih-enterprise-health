const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const app = read("assets/app.js");
const api = read("assets/api.js");
const config = read("assets/config.js");
const html = read("index.html");

assert(
  !/localStorage\.(getItem|setItem|removeItem)/.test(app),
  "业务页面不得直接访问 localStorage，应通过 PkuihApi.storage"
);
assert(
  app.includes("window.PkuihApi.data.bootstrap(DATA_VERSION)"),
  "业务页面必须通过统一数据源加载基础数据"
);
assert(
  !/fetch\(\s*`assets\/data\//.test(app),
  "业务页面不得直接请求 assets/data 静态文件"
);
assert(
  html.indexOf("assets/config.js") < html.indexOf("assets/api.min.js") &&
    html.indexOf("assets/api.min.js") < html.indexOf("assets/app.min.js"),
  "index.html 脚本顺序必须为 config → api → app"
);
assert(
  config.includes("apiMode") &&
    config.includes("apiBaseUrl") &&
    config.includes("authMode") &&
    config.includes("apiCredentials"),
  "运行时配置必须提供 API 模式、基础地址与登录态传输策略"
);

for (const section of [
  "auth",
  "institutions",
  "hospitals",
  "experts",
  "slots",
  "appointments",
  "demands",
  "themes",
  "planTemplates",
  "posters",
  "files",
  "notifications"
]) {
  assert(api.includes(`${section}: Object.freeze`), `API 端点缺少模块：${section}`);
}

for (const contract of [
  "Authorization",
  "X-Request-Id",
  "X-Client-Version",
  "REQUEST_TIMEOUT",
  "NETWORK_ERROR",
  "credentials"
]) {
  assert(api.includes(contract), `HTTP 客户端缺少契约能力：${contract}`);
}

console.log("architecture contract OK");
