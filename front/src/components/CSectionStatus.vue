<template>
  <CBadge
    :title="$t('badges.in_process')"
    :color="'orange'"
    v-if="props.status === ESectionStatus.InProcess"
  />
  <CBadge
    :title="$t('badges.ready')"
    :color="'green'"
    v-else-if="props.status === ESectionStatus.Ready"
  />
  <CBadge
    :title="$t('badges.queue')"
    :color="'indigo'"
    v-else-if="props.status === ESectionStatus.Queue"
  />
</template>

<script setup lang="ts">
import CBadge from "./CBadge.vue";

import { ESectionStatus } from "@/generated/graphql";

const props = defineProps({
  status: { type: String, required: false },
});
</script>

<style>
@import "@/assets/main.css";
</style>
