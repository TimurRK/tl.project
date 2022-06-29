<template>
  <CNavigation />

  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import CNavigation from "@/components/Navigation.vue";
</script>

<style></style>
