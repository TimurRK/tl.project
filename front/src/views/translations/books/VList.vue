<template>
  <CHr
    :color="'dark'"
    :title="(route.meta!.name as string)"
    :icon="'bi-plus'"
    @click-button="newBook"
  />

  <!-- <div class="row justify-content-md-center mb-3"> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, type Ref, onBeforeMount } from "vue";

import { useApi } from "@/api/api";
import CHr from "@/components/CHr.vue";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import {
  UserTranslations,
  type UserTranslationsQuery,
  type UserTranslationsQueryVariables,
} from "@/generated/graphql";
import router from "@/router/index";

const route = useRoute();
const api = useApi();
const current_user_store = currentUserStore();

const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

current_user_store.$subscribe((_mutation, state) => {
  current_user.value = state.current_user;
});

function newBook() {
  router.push({ name: 'VBookNew' })
}

onBeforeMount(async () => {
  const { data } = await api.graphql<
    UserTranslationsQuery,
    UserTranslationsQueryVariables
  >(UserTranslations, { user_id: current_user.value?.id });

  console.log(data);
});
</script>

<style></style>
