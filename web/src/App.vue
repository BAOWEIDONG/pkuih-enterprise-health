<template>
  <ConfigProvider :theme-vars="themeVars">
    <LegacyHost />
  </ConfigProvider>
</template>

<script setup>
import ConfigProvider from "vant/es/config-provider";
import LegacyHost from "./components/LegacyHost.vue";

const themeVars = Object.freeze({
  primaryColor: "#0b318f"
});
</script>
