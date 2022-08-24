<template>
  <CBadge
    :title="$t('badges.in_process')"
    :color="'orange'"
    v-if="props.status === EBookStatus.InProcess"
  />
  <CBadge
    :title="$t('badges.ready')"
    :color="'green'"
    v-else-if="props.status === EBookStatus.Ready"
  />
  <CBadge
    :title="$t('badges.suspended')"
    :color="'pink'"
    v-else-if="props.status === EBookStatus.Suspended"
  />
  <CBadge
    :title="$t('badges.thrown')"
    :color="'red'"
    v-else-if="props.status === EBookStatus.Thrown"
  />
  <CBadge
    :title="$t('badges.queue')"
    :color="'indigo'"
    v-else-if="props.status === EBookStatus.Queue"
  />
</template>

<script setup lang="ts">
import CBadge from "./CBadge.vue";

import { EBookStatus } from "@/generated/graphql";

const props = defineProps({
  status: { type: String, required: false },
});
</script>

<style>
@import "@/assets/main.css";
</style>
