<template>
  <CHr
    v-for="color of colors"
    :key="color"
    :color="color"
    :title="color"
    :to="'VSignIn'"
    @click-button="clicked"
  />
  <div class="row justify-content-md-center"></div>
</template>

<script setup lang="ts">
import CHr from "@/components/CHr.vue";

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

function clicked() {
  console.log("click-button");
}
</script>

<style></style>
