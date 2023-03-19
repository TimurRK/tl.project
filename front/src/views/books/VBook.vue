<template>
  <template v-if="current_data?.books?.length">
    <CHr :color="'dark'" :title="current_data.books[0].title" />

    <div class="row justify-content-md-center"></div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import { useApi } from "@/api/api";
import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import {
  Book,
  type BookQuery,
  type BookQueryVariables,
} from "@/generated/graphql";

const props = defineProps({
  book_id: { type: String, required: true },
});

const api = useApi();
const current_user_store = currentUserStore();
const breadcrumbs_store = breadcrumbsStore();

const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

current_user_store.$subscribe((_mutation, state) => {
  current_user.value = state.current_user;
});

const current_data: Ref<BookQuery | null> = ref(null);

onBeforeMount(async () => {
  const { data } = await api.graphql<BookQuery, BookQueryVariables>(Book, {
    book_id: props.book_id,
  });

  current_data.value = data;

  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.community.books",
      is_current: false,
      is_i18n: true,
    },
    {
      name: current_data.value.books[0].title,
      is_current: true,
      is_i18n: false,
    },
  ]);
});
</script>

<style></style>
