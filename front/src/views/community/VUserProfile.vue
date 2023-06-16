<template>
  <template v-if="current_data && current_data.users.length">
    <CHr :color="'dark'" :title="$t('routers.community.profile')" />

    <div class="row">
      <img
        src="@/assets/not_found/avatar.png"
        class="rounded float-start"
        style="width: 150px"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import { useApi } from "@/api/api";

import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import {
  UserProfile,
  type UserProfileQuery,
  type UserProfileQueryVariables,
} from "@/generated/graphql";

const api = useApi();

const current_data: Ref<UserProfileQuery | null> = ref(null);

const props = defineProps({
  login: { type: String, required: true },
});

const breadcrumbs_store = breadcrumbsStore();

onBeforeMount(async () => {
  const { data } = await api.graphql<
    UserProfileQuery,
    UserProfileQueryVariables
  >(UserProfile, { login: props.login });

  current_data.value = data;

  if (!current_data.value.users?.length) {
    /**
     * TODO 404 redirect
     */
  }

  breadcrumbs_store.setBreadcrumbs([
    {
      name: props.login,
      is_current: true,
      is_i18n: false,
    },
  ]);
});

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);
});
</script>

<style></style>
