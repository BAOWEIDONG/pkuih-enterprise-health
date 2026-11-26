/* =========================================================
   名医入企 H5 · API / 基础设施层

   页面只依赖本模块暴露的数据源、持久化与 HTTP 能力。
   local 模式用于静态演示；api 模式用于正式后端。
   ========================================================= */
(() => {
  "use strict";

  const runtime = Object.assign(
    {
      apiMode: "local",
      apiBaseUrl: "/api/v1",
      authMode: "cookie",
      apiCredentials: "include",
      apiTimeoutMs: 15000,
      clientVersion: "20261126-9"
    },
    window.PKUHI_CONFIG || {}
  );

  const ENDPOINTS = Object.freeze({
    bootstrap: "/bootstrap",
    auth: Object.freeze({
      sendInstitutionCode: "/auth/institution/sms-code",
      loginInstitution: "/auth/institution/login",
      loginAdmin: "/auth/admin/login",
      session: "/auth/session",
      csrf: "/auth/csrf",
      logout: "/auth/logout"
    }),
    institutions: Object.freeze({
      list: "/admin/institutions",
      create: "/admin/institutions",
      update: "/admin/institutions/:id"
    }),
    institutionAccounts: Object.freeze({
      list: "/admin/institution-accounts",
      create: "/admin/institution-accounts",
      update: "/admin/institution-accounts/:phone"
    }),
    adminAccounts: Object.freeze({
      list: "/admin/operator-accounts",
      create: "/admin/operator-accounts",
      update: "/admin/operator-accounts/:username"
    }),
    hospitals: Object.freeze({
      list: "/hospitals",
      create: "/admin/hospitals",
      update: "/admin/hospitals/:id"
    }),
    experts: Object.freeze({
      list: "/experts",
      create: "/experts",
      update: "/experts/:id",
      remove: "/experts/:id"
    }),
    slots: Object.freeze({
      list: "/slots",
      batch: "/slots/batch"
    }),
    appointments: Object.freeze({
      list: "/appointments",
      create: "/appointments",
      detail: "/appointments/:id",
      accept: "/appointments/:id/accept",
      plan: "/appointments/:id/plan",
      confirm: "/appointments/:id/confirm",
      revise: "/appointments/:id/revisions",
      cancel: "/appointments/:id/cancel",
      complete: "/appointments/:id/complete",
      location: "/appointments/:id/location",
      internalNote: "/appointments/:id/internal-note"
    }),
    demands: Object.freeze({
      list: "/demands",
      create: "/demands",
      detail: "/demands/:id",
      contact: "/demands/:id/contact",
      match: "/demands/:id/match",
      close: "/demands/:id/close"
    }),
    themes: Object.freeze({
      list: "/themes",
      upsert: "/admin/hospitals/:hospitalId/themes/:month"
    }),
    planTemplates: Object.freeze({
      list: "/plan-templates",
      create: "/plan-templates",
      update: "/plan-templates/:id",
      remove: "/plan-templates/:id"
    }),
    posters: Object.freeze({
      list: "/marketing-posters",
      create: "/marketing-posters",
      remove: "/marketing-posters/:id"
    }),
    files: Object.freeze({
      upload: "/files",
      signedUrl: "/files/:id/url"
    }),
    notifications: Object.freeze({
      list: "/notifications",
      markSent: "/notifications/:id/sent"
    })
  });

  const STORAGE_KEYS = Object.freeze({
    token: "pkuih_api_token"
  });

  class ApiError extends Error {
    constructor(message, { status = 0, code = "API_ERROR", requestId = "", details = null } = {}) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.code = code;
      this.requestId = requestId;
      this.details = details;
    }
  }

  const storage = Object.freeze({
    available() {
      try {
        const probe = "__pkuih_storage_probe__";
        localStorage.setItem(probe, "1");
        localStorage.removeItem(probe);
        return true;
      } catch {
        return false;
      }
    },
    readText(key, fallback = "") {
      try {
        const value = localStorage.getItem(key);
        return value == null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    writeText(key, value) {
      try {
        localStorage.setItem(key, String(value));
        return true;
      } catch {
        return false;
      }
    },
    readJSON(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    writeJSON(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }
  });

  function buildPath(template, params = {}) {
    return String(template || "").replace(/:([A-Za-z0-9_]+)/g, (match, key) => {
      if (!Object.prototype.hasOwnProperty.call(params, key)) {
        throw new ApiError(`接口路径缺少参数：${key}`, { code: "MISSING_PATH_PARAM" });
      }
      return encodeURIComponent(params[key]);
    });
  }

  function buildQuery(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value == null || value === "") return;
      if (Array.isArray(value)) {
        value.filter((item) => item != null && item !== "").forEach((item) => {
          query.append(key, String(item));
        });
        return;
      }
      query.set(key, String(value));
    });
    const text = query.toString();
    return text ? `?${text}` : "";
  }

  function createRequestId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function resolveUrl(path) {
    if (/^https?:\/\//i.test(path)) return path;
    const base = String(runtime.apiBaseUrl || "").replace(/\/+$/, "");
    const suffix = String(path || "").replace(/^\/+/, "");
    return base ? `${base}/${suffix}` : `/${suffix}`;
  }

  let authToken = "";
  let unauthorizedHandler = null;
  let csrfToken = "";
  let csrfPromise = null;

  function usesBearerToken() {
    return runtime.authMode === "bearer";
  }

  function usesCookieAuth() {
    return runtime.authMode !== "bearer";
  }

  function readCookie(name) {
    const prefix = `${name}=`;
    return String(document.cookie || "")
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix))
      ?.slice(prefix.length) || "";
  }

  function csrfHeaderName() {
    return runtime.csrfHeaderName || "X-XSRF-TOKEN";
  }

  async function ensureCsrf(force = false) {
    if (!usesCookieAuth()) return "";
    const cookieToken = readCookie(runtime.csrfCookieName || "XSRF-TOKEN");
    if (cookieToken && !force) {
      csrfToken = decodeURIComponent(cookieToken);
      return csrfToken;
    }
    if (!force && csrfToken) return csrfToken;
    if (csrfPromise) return csrfPromise;
    csrfPromise = (async () => {
      try {
        const token = await request(ENDPOINTS.auth.csrf, {
          method: "GET",
          credentials: "include",
          skipCsrf: true,
          cache: "no-store"
        });
        csrfToken = String(token?.token || readCookie(runtime.csrfCookieName || "XSRF-TOKEN") || "");
        return csrfToken;
      } finally {
        csrfPromise = null;
      }
    })();
    return csrfPromise;
  }

  const session = Object.freeze({
    getToken() {
      if (!usesBearerToken()) return "";
      if (!authToken) authToken = storage.readText(STORAGE_KEYS.token, "");
      return authToken;
    },
    setToken(token) {
      authToken = String(token || "");
      if (!usesBearerToken()) return;
      if (authToken) storage.writeText(STORAGE_KEYS.token, authToken);
      else storage.remove(STORAGE_KEYS.token);
    },
    clear() {
      authToken = "";
      storage.remove(STORAGE_KEYS.token);
    },
    onUnauthorized(handler) {
      unauthorizedHandler = typeof handler === "function" ? handler : null;
    }
  });

  async function request(path, options = {}) {
    const controller = new AbortController();
    let didTimeout = false;
    const timeout = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, Number(options.timeoutMs || runtime.apiTimeoutMs || 15000));
    const externalSignal = options.signal;
    const relayAbort = () => controller.abort();
    if (externalSignal) {
      if (externalSignal.aborted) controller.abort();
      else externalSignal.addEventListener("abort", relayAbort, { once: true });
    }

    const headers = new Headers({
      Accept: "application/json",
      "X-Client-Version": runtime.clientVersion,
      "X-Request-Id": createRequestId(),
      ...(options.headers || {})
    });
    const method = String(options.method || (options.body == null ? "GET" : "POST")).toUpperCase();
    const mutating = !["GET", "HEAD", "OPTIONS"].includes(method);
    if (mutating && usesCookieAuth() && !options.skipCsrf) {
      const token = await ensureCsrf();
      if (token) headers.set(csrfHeaderName(), token);
    }
    const token = session.getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);

    let body = options.body;
    if (body != null && !(body instanceof FormData) && typeof body !== "string") {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(body);
    }

    try {
      const response = await window.fetch(resolveUrl(path), {
        method,
        headers,
        body,
        signal: controller.signal,
        credentials: options.credentials || runtime.apiCredentials || "same-origin",
        cache: options.cache || "no-store"
      });
      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => "");
      const requestId =
        payload?.requestId || response.headers.get("X-Request-Id") || headers.get("X-Request-Id");
      const code = payload && typeof payload === "object" ? payload.code : undefined;
      const successCode = code == null || code === 0 || code === "0";

      if (!response.ok || !successCode) {
        const message =
          (payload && typeof payload === "object" && (payload.message || payload.errorMessage)) ||
          `请求失败（HTTP ${response.status}）`;
        const error = new ApiError(message, {
          status: response.status,
          code: payload?.code || `HTTP_${response.status}`,
          requestId,
          details: payload?.details || null
        });
        if (response.status === 401) {
          session.clear();
          unauthorizedHandler?.(error);
        }
        if (
          response.status === 403 &&
          mutating &&
          usesCookieAuth() &&
          !options.skipCsrf &&
          !options.csrfRetried
        ) {
          csrfToken = "";
          await ensureCsrf(true);
          return request(path, { ...options, csrfRetried: true });
        }
        throw error;
      }

      if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "data")) {
        return payload.data;
      }
      return payload;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      const aborted = error?.name === "AbortError";
      const cancelled = aborted && !didTimeout;
      throw new ApiError(
        aborted
          ? cancelled
            ? "请求已取消。"
            : "请求超时，请稍后重试。"
          : "网络异常，请检查网络后重试。",
        {
          code: aborted ? (cancelled ? "REQUEST_CANCELLED" : "REQUEST_TIMEOUT") : "NETWORK_ERROR"
        }
      );
    } finally {
      window.clearTimeout(timeout);
      externalSignal?.removeEventListener("abort", relayAbort);
    }
  }

  const http = Object.freeze({
    request,
    get(path, options = {}) {
      return request(path, { ...options, method: "GET" });
    },
    post(path, body, options = {}) {
      return request(path, { ...options, method: "POST", body });
    },
    put(path, body, options = {}) {
      return request(path, { ...options, method: "PUT", body });
    },
    patch(path, body, options = {}) {
      return request(path, { ...options, method: "PATCH", body });
    },
    remove(path, options = {}) {
      return request(path, { ...options, method: "DELETE" });
    }
  });

  const STATIC_DATA = Object.freeze({
    experts: "assets/data/experts.json",
    hospitals: "assets/data/hospitals.json",
    seasonal: "assets/data/seasonal.json",
    themeMatches: "assets/data/theme-matches.json",
    chinaCities: "assets/china-cities.json"
  });

  async function fetchJson(path, version, { optional = false } = {}) {
    const separator = path.includes("?") ? "&" : "?";
    const response = await window.fetch(`${path}${separator}v=${encodeURIComponent(version)}`, {
      cache: "no-cache"
    });
    if (!response.ok) {
      if (optional) return null;
      throw new ApiError(`${path} 加载失败（HTTP ${response.status}）`, {
        status: response.status,
        code: "STATIC_DATA_ERROR"
      });
    }
    return response.json();
  }

  function validateBootstrap(data) {
    if (!data || typeof data !== "object") {
      throw new ApiError("基础数据格式不正确。", { code: "INVALID_BOOTSTRAP" });
    }
    if (!Array.isArray(data.experts) || data.experts.length === 0) {
      throw new ApiError("专家数据为空。", { code: "EMPTY_EXPERTS" });
    }
    if (!Array.isArray(data.hospitals) || data.hospitals.length === 0) {
      throw new ApiError("医院数据为空。", { code: "EMPTY_HOSPITALS" });
    }
    return {
      experts: data.experts,
      hospitals: data.hospitals,
      seasonal: Array.isArray(data.seasonal) ? data.seasonal : [],
      themeMatches: Array.isArray(data.themeMatches) ? data.themeMatches : [],
      chinaCities:
        data.chinaCities && typeof data.chinaCities === "object" && !Array.isArray(data.chinaCities)
          ? data.chinaCities
          : {}
    };
  }

  const data = Object.freeze({
    async bootstrap(version = runtime.clientVersion) {
      if (runtime.apiMode === "api") {
        return validateBootstrap(await http.get(ENDPOINTS.bootstrap));
      }
      const [experts, hospitals, seasonal, themeMatches, chinaCities] = await Promise.all([
        fetchJson(STATIC_DATA.experts, version),
        fetchJson(STATIC_DATA.hospitals, version),
        fetchJson(STATIC_DATA.seasonal, version),
        fetchJson(STATIC_DATA.themeMatches, version),
        fetchJson(STATIC_DATA.chinaCities, version, { optional: true }).catch(() => null)
      ]);
      return validateBootstrap({ experts, hospitals, seasonal, themeMatches, chinaCities });
    }
  });

  function requireApiMode() {
    if (runtime.apiMode !== "api") {
      throw new ApiError("当前为本地演示模式，请先切换 apiMode 并配置后端地址。", {
        code: "LOCAL_MODE_ONLY"
      });
    }
  }

  const auth = Object.freeze({
    csrf() {
      return ensureCsrf(true);
    },
    sendInstitutionCode(phone) {
      requireApiMode();
      return http.post(ENDPOINTS.auth.sendInstitutionCode, { phone });
    },
    async loginInstitution(payload) {
      requireApiMode();
      const result = await http.post(ENDPOINTS.auth.loginInstitution, payload);
      if (result?.token) session.setToken(result.token);
      return result;
    },
    async loginAdmin(payload) {
      requireApiMode();
      const result = await http.post(ENDPOINTS.auth.loginAdmin, payload);
      if (result?.token) session.setToken(result.token);
      return result;
    },
    resume() {
      requireApiMode();
      return http.get(ENDPOINTS.auth.session);
    },
    async logout() {
      requireApiMode();
      try {
        return await http.post(ENDPOINTS.auth.logout);
      } finally {
        session.clear();
      }
    }
  });

  window.PkuihApi = Object.freeze({
    config: Object.freeze(runtime),
    endpoints: ENDPOINTS,
    storage,
    http,
    data,
    auth,
    session,
    ApiError,
    buildPath,
    buildQuery
  });
})();
