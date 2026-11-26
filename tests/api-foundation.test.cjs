const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets/api.js"), "utf8");
const data = new Map();
const localStorage = {
  getItem(key) {
    return data.has(key) ? data.get(key) : null;
  },
  setItem(key, value) {
    data.set(key, String(value));
  },
  removeItem(key) {
    data.delete(key);
  }
};
const context = {
  window: {
    PKUHI_CONFIG: {
      apiMode: "local",
      apiBaseUrl: "/api/v1",
      authMode: "cookie",
      apiCredentials: "include",
      apiTimeoutMs: 15000,
      clientVersion: "test"
    }
  },
  localStorage,
  URLSearchParams,
  console
};
vm.createContext(context);
vm.runInContext(source, context, { filename: "assets/api.js" });

const api = context.window.PkuihApi;
assert(api, "PkuihApi 未正确暴露");
assert.equal(api.config.apiMode, "local");
assert.equal(api.config.authMode, "cookie");
assert.equal(api.session.getToken(), "", "Cookie 模式不得持久化 Bearer token");
assert.equal(api.buildPath("/experts/:id", { id: "A B" }), "/experts/A%20B");
assert.equal(
  api.buildQuery({ hospitalId: "pkuih", service: ["lecture", "consult"], empty: "" }),
  "?hospitalId=pkuih&service=lecture&service=consult"
);
assert(api.storage.writeJSON("demo", { ok: true }), "存储写入失败");
assert.equal(JSON.stringify(api.storage.readJSON("demo", null)), '{"ok":true}');
assert(api.storage.remove("demo"));
assert.equal(api.storage.readJSON("demo", null), null);

console.log("api foundation OK");
