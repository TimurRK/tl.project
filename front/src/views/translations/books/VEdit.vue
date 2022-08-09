<template>
  <template v-if="current_data && current_data.translators.length">
    <CHr :color="'dark'" :title="current_data.books[0].title" />

    <div class="row justify-content-md-center mb-2">
      <div class="col-6 pl-0">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">Автор</li>
        </ul>
      </div>
      <div class="col-6 pr-0">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">
            {{ current_data.books[0].author }}
          </li>
        </ul>
      </div>
    </div>

    <CHr :color="'dark'" :title="'Список глав'" />

    <div class="row justify-content-md-center mb-2">
      <ol class="list-group list-group-numbered p-0">
        <li
          class="list-group-item d-flex justify-content-between align-items-start"
          v-for="section of current_data.books[0].sections"
          :key="section.id"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">
              <router-link
                :to="{
                  name: 'VSectionEdit',
                  params: {
                    book_id: current_data.books[0].id,
                    section_id: section.id,
                  },
                }"
              >
                {{ section.title }}
              </router-link>
            </div>
          </div>
          <CBadge :title="'В очереди'" :color="'indigo'" />
          <CBadge :title="'В процессе'" :color="'orange'" />
          <CBadge :title="'Готово'" :color="'green'" />
        </li>
      </ol>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";

import { useRoute } from "vue-router";
import { useApi } from "@/api/api";

import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";

import {
  BookSections,
  type BookSectionsQuery,
  type BookSectionsQueryVariables,
} from "@/generated/graphql";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";

const route = useRoute();
const api = useApi();

const current_user_store = currentUserStore();
const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

const current_data: Ref<BookSectionsQuery | null> = ref(null);

onBeforeMount(async () => {
  const book_id = route.params.book_id as string;

  const { data } = await api.graphql<
    BookSectionsQuery,
    BookSectionsQueryVariables
  >(BookSections, { book_id, user_id: current_user.value!.id });

  current_data.value = data;
});
</script>

<style>
@import "@/assets/main.css";
</style>
