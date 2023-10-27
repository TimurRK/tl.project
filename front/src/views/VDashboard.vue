<template>
  <CHr
    v-for="color of colors"
    :key="color"
    :color="color"
    :title="color"
    :to="'VSignIn'"
    @click-button="clicked"
  />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";

import CHr from "@/components/CHr.vue";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const breadcrumbs_store = breadcrumbsStore();

const colors: string[] = [
  "dark",
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "pink",
  "indigo",
];

onBeforeMount(() => {
  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.dashboard",
      is_current: true,
      is_i18n: true,
    },
  ]);
});

function clicked() {
  console.log("click-button");
}
</script>

<style></style>
