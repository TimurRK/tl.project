<template>
  <span v-if="props.gender === EUserGender.Female">
    {{ $t("gender.female") }}
  </span>
  <span v-else>
    {{ $t("gender.male") }}
  </span>
</template>

<script setup lang="ts">
import { EUserGender } from "@/generated/graphql";

const props = defineProps({
  gender: { type: String, required: true },
});
</script>

<style>
@import "@/assets/main.css";
</style>
