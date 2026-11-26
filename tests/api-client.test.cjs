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
assert(
  api.experts &&
    api.slots &&
    api.appointments &&
    api.demands &&
    api.institutionAccounts &&
    api.adminAccounts &&
    api.hospitals,
  "业务 API 客户端未暴露"
);
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
  assert.equal(lastRequest().options.headers.get("X-Client-Platform"), "browser");

  await api.appointments.accept("BD 1");
  assert.equal(lastRequest().url, "/api/v1/appointments/BD%201/accept");
  assert.equal(lastRequest().options.method, "POST");

  await api.demands.match("XQ-1", { doctorId: "expert-1", date: "2026-12-02" });
  assert.equal(lastRequest().url, "/api/v1/demands/XQ-1/match");
  assert.equal(lastRequest().options.method, "POST");

  await api.institutionAccounts.update("138 0000 0001", { active: false });
  assert.equal(
    lastRequest().url,
    "/api/v1/admin/institution-accounts/138%200000%200001"
  );
  assert.equal(lastRequest().options.method, "PATCH");

  await api.adminAccounts.create({
    username: "operator",
    password: "secret",
    name: "运营",
    phone: "13800000001",
    role: "OPERATOR",
    hospitalId: "pkuih"
  });
  assert.equal(lastRequest().url, "/api/v1/admin/operator-accounts");
  assert.equal(lastRequest().options.method, "POST");

  await api.hospitals.update("pkuih", { phone: "010-69007777" });
  assert.equal(lastRequest().url, "/api/v1/admin/hospitals/pkuih");
  assert.equal(lastRequest().options.method, "PATCH");

  console.log("api client OK");
}

async function runWechat() {
  const wechatRequests = [];
  const wechatWindow = {
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
      wechatRequests.push({ url, options });
      return new Response(JSON.stringify({ code: 0, message: "ok", data: { ok: true } }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }
  };
  const wechatContext = {
    window: wechatWindow,
    navigator: {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 " +
        "(KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323c) NetType/WIFI Language/zh_CN"
    },
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {}
    },
    Headers,
    AbortController,
    URLSearchParams,
    FormData,
    Response,
    document: { cookie: "" },
    console
  };
  vm.createContext(wechatContext);
  vm.runInContext(source, wechatContext, { filename: "assets/api.js" });

  const wechatApi = wechatWindow.PkuihApi;
  assert.equal(wechatApi.platform.isWeChat, true, "微信 UA 应被识别");
  assert.equal(wechatApi.platform.wechatVersion, "8.0.50", "应解析微信版本");
  assert.equal(wechatApi.platform.isIOS, true, "应识别 iOS");
  assert.equal(wechatApi.platform.isAndroid, false, "iOS 不应识别为 Android");

  await wechatApi.experts.list({ hospitalId: "pkuih" });
  const request = wechatRequests.at(-1);
  assert.equal(request.options.headers.get("X-Client-Platform"), "wechat");
  assert.equal(request.options.headers.get("X-WeChat-Version"), "8.0.50");
}

run()
  .then(runWechat)
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
