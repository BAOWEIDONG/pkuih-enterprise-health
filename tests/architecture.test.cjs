const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const app = read("assets/app.js");
const api = read("assets/api.js");
const config = read("assets/config.js");
const legacyHtml = read("index.legacy.html");
const productionHtml = read("index.html");
const applicationConfig = read("server/src/main/resources/application.yml");
const expertAdminController = read(
  "server/src/main/java/com/pkuih/enterprisehealth/expert/ExpertAdminController.java"
);

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
  legacyHtml.indexOf("assets/config.js") < legacyHtml.indexOf("assets/api.min.js") &&
    legacyHtml.indexOf("assets/api.min.js") < legacyHtml.indexOf("assets/app.min.js"),
  "legacy 入口脚本顺序必须为 config → api → app"
);
assert(
  productionHtml.includes('id="vue-root"') && productionHtml.includes("static/app."),
  "生产入口必须由 Vue 3 构建产物承载"
);
assert(
  config.includes("apiMode") &&
    config.includes("apiBaseUrl") &&
    config.includes("authMode") &&
    config.includes("apiCredentials"),
  "运行时配置必须提供 API 模式、基础地址与登录态传输策略"
);
assert(
  api.includes('create: "/admin/experts"') &&
    api.includes('update: "/admin/experts/:id"') &&
    expertAdminController.includes('@RequestMapping("/api/v1/admin/experts")'),
  "专家管理接口必须与院方后端路由保持一致"
);
for (const client of ["experts", "slots", "appointments", "demands"]) {
  assert(
    api.includes(`const ${client} = Object.freeze`),
    `业务 API 客户端缺少模块：${client}`
  );
}
assert(
  api.includes('"Idempotency-Key"'),
  "预约创建客户端必须支持 Idempotency-Key"
);
assert(
  applicationConfig.includes("ddl-auto: validate") &&
    applicationConfig.includes("flyway:"),
  "生产配置必须启用 Flyway 并使用 validate 校验实体结构"
);
for (const migration of [
  "server/src/main/resources/db/migration/h2/V1__baseline.sql",
  "server/src/main/resources/db/migration/h2/V2__appointment_production_fields.sql",
  "server/src/main/resources/db/migration/postgresql/V1__baseline.sql",
  "server/src/main/resources/db/migration/postgresql/V2__appointment_production_fields.sql"
]) {
  assert(fs.existsSync(path.join(root, migration)), `数据库迁移缺失：${migration}`);
}

const iconBlock = app.slice(app.indexOf("const ICONS = {"), app.indexOf("  };", app.indexOf("const ICONS = {")));
const usedIcons = new Set([...app.matchAll(/icon\("([^"]+)"/g)].map((match) => match[1]));
const definedIcons = new Set([...iconBlock.matchAll(/^\s{4}([A-Za-z0-9_]+):/gm)].map((match) => match[1]));
const missingIcons = [...usedIcons].filter((name) => !definedIcons.has(name)).sort();
assert.deepEqual(missingIcons, [], `图标名称未定义：${missingIcons.join(", ")}`);

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
  "X-XSRF-TOKEN",
  "REQUEST_TIMEOUT",
  "NETWORK_ERROR",
  "credentials"
]) {
  assert(api.includes(contract), `HTTP 客户端缺少契约能力：${contract}`);
}

console.log("architecture contract OK");
