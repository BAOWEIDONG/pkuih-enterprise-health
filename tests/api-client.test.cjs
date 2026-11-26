const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { randomUUID } = require("node:crypto");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets/api.js"), "utf8");
const data = new Map();
const requests = [];

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

const window = {
  PKUHI_CONFIG: {
    apiMode: "api",
    apiBaseUrl: "/api/v1",
    authMode: "bearer",
    apiCredentials: "include",
    apiTimeoutMs: 15000,
    clientVersion: "test"
  },
  crypto: { randomUUID },
  setTimeout,
  clearTimeout,
  async fetch(url, options) {
    requests.push({ url, options });
    return new Response(JSON.stringify({ code: 0, message: "ok", data: { ok: true } }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }
};

const context = {
  window,
  localStorage,
  Headers,
  AbortController,
  URLSearchParams,
  FormData,
  Response,
  document: { cookie: "" },
  console
};
vm.createContext(context);
vm.runInContext(source, context, { filename: "assets/api.js" });

const api = window.PkuihApi;
assert(api.experts && api.slots && api.appointments && api.demands, "业务 API 客户端未暴露");
api.session.setToken("test-token");

function lastRequest() {
  return requests.at(-1);
}

async function run() {
  await api.experts.list({ hospitalId: "pkuih", service: "讲座" });
  assert.equal(lastRequest().url, "/api/v1/experts?hospitalId=pkuih&service=%E8%AE%B2%E5%BA%A7");
  assert.equal(lastRequest().options.method, "GET");

  await api.slots.list({ doctorId: "expert 1", from: "2026-11-01" });
  assert.equal(
    lastRequest().url,
    "/api/v1/slots?doctorId=expert+1&from=2026-11-01"
  );

  await api.appointments.create(
    { doctorId: "expert-1", date: "2026-12-01" },
    { idempotencyKey: "idem-1" }
  );
  assert.equal(lastRequest().url, "/api/v1/appointments");
  assert.equal(lastRequest().options.method, "POST");
  assert.equal(lastRequest().options.headers.get("Idempotency-Key"), "idem-1");
  assert.equal(lastRequest().options.headers.get("Authorization"), "Bearer test-token");

  await api.appointments.accept("BD 1");
  assert.equal(lastRequest().url, "/api/v1/appointments/BD%201/accept");
  assert.equal(lastRequest().options.method, "POST");

  await api.demands.match("XQ-1", { doctorId: "expert-1", date: "2026-12-02" });
  assert.equal(lastRequest().url, "/api/v1/demands/XQ-1/match");
  assert.equal(lastRequest().options.method, "POST");

  console.log("api client OK");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
