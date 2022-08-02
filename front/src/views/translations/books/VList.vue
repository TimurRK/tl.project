<template>
  <div class="row justify-content-md-center">
    <CHr
      :color="'dark'"
      :title="(route.meta!.name as string)"
      :icon="'bi-plus'"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
// import { gql } from 'graphql-tag';

import { useApi } from "@/api/api";
import CHr from "@/components/CHr.vue";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user.js";
import { onBeforeMount, ref, type Ref } from "vue";

const route = useRoute();
const api = useApi();
const current_user_store = currentUserStore();

const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

current_user_store.$subscribe((_mutation, state) => {
  current_user.value = state.current_user;
});

async function loadTranslateBooks() {
  const query = `
    query UserTranslations($user_id: ID) {
      translators(
        WHERE: { user_id: { EQ: $user_id }}
        ORDER: { created_at: { SORT: ASC, NULLS: LAST }}
      ) {
        id
        book_id
        book {
          id
          title
          book_versions(WHERE: { is_main: { EQ: true } }) {
            id
            title
          }
        }
      }
    }
  `;

  // console.log(query)

  await api.graphql(query, { user_id: current_user.value?.id });
}

onBeforeMount(async () => {
  await loadTranslateBooks();
});
</script>

<style></style>
