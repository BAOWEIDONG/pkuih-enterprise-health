/* =========================================================
   名医入企 H5 · 运行时配置

   本地演示默认使用 local 模式，数据保存在浏览器中。
   接入正式后端时，将 apiMode 改为 "api"、填写 apiBaseUrl，
   并按服务端登录方案设置 authMode（cookie 或 bearer）。
   endpoints 与响应包约定见 docs/API-CONTRACT-V1.md。
   ========================================================= */
(() => {
  "use strict";

  window.PKUHI_CONFIG = Object.assign(
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
})();
