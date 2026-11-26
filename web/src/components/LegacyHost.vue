<template>
  <Teleport to="body">
    <div id="app"></div>
    <div id="overlay-root"></div>
    <div id="toast" class="toast" aria-live="polite" aria-atomic="true"></div>
  </Teleport>
</template>

<script setup>
import { onMounted } from "vue";

const version = import.meta.env.VITE_CLIENT_VERSION || "20261126-9";

function applyRuntimeConfig() {
  window.PKUHI_CONFIG = {
    apiMode: import.meta.env.VITE_API_MODE || "local",
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api/v1",
    authMode: import.meta.env.VITE_AUTH_MODE || "cookie",
    apiCredentials: "include",
    apiTimeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 15000,
    csrfCookieName: "XSRF-TOKEN",
    csrfHeaderName: "X-XSRF-TOKEN",
    clientVersion: version,
    ...(window.PKUHI_CONFIG || {})
  };
}

onMounted(async () => {
  if (window.__PKUIH_VUE_BOOTED__) return;
  window.__PKUIH_VUE_BOOTED__ = true;
  window.PKUHI_LEGACY_MANUAL_BOOT = true;
  applyRuntimeConfig();

  try {
    await import("@legacy/config.js");
    await import("@legacy/api.js");
    await import("@legacy/app.js");
    if (!window.PkuihLegacy?.boot) {
      throw new Error("页面运行层加载失败。");
    }
    await window.PkuihLegacy.boot();
  } catch (error) {
    console.error("Vue host failed to start legacy application:", error);
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = `
      <div class="loading-screen">
        <img src="assets/logo.svg" alt="北京大学国际医院">
        <h2>页面加载失败</h2>
        <p>${String(error?.message || "请检查网络后刷新页面。")}</p>
        <button class="btn btn--primary" type="button" onclick="location.reload()">重新加载</button>
      </div>
    `;
  }
});
</script>
