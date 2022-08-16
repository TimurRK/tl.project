<template>
  <CNavigation />

  <div class="container">
    <CBreadcrumb />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";

import { useApi } from "@/api/api";

import CBreadcrumb from "@/components/CBreadcrumb.vue";
import CNavigation from "@/components/CNavigation.vue";

const api = useApi();

onBeforeMount(async () => {
  await api.restoreAuth();
});
</script>

<style>
body {
  font-family: Open Sans, Helvetica Neue, Arial, Verdana, sans-serif;
}
</style>
