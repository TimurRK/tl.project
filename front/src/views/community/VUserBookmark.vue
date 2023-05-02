<template>
  <CHr :color="'dark'" :title="$t('routers.community.bookmarks')" />

  <div class="row justify-content-md-center"></div>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const props = defineProps({
  login: { type: String, required: true },
});

const breadcrumbs_store = breadcrumbsStore();

onBeforeMount(async () => {
  breadcrumbs_store.setBreadcrumbs([
    {
      name: props.login,
      is_current: false,
      is_i18n: false,
      to: "VUserProfile",
      params: { login: props.login },
    },
    {
      name: "routers.community.bookmarks",
      is_current: true,
      is_i18n: true,
    },
  ]);
});
</script>

<style></style>
