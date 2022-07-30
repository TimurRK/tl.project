<template>
  <CNavigation />

  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";

import { useApi } from "@/api/api";

import CNavigation from "@/components/CNavigation.vue";

const api = useApi();

onBeforeMount(async () => {
  await api.restoreAuth();
});
</script>

<style></style>
