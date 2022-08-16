<template>
  <template v-if="current_data && current_data.translators.length">
    <CHr :color="'dark'" :title="current_data.books[0].title" />

    <div class="row justify-content-md-center mb-2">
      <div class="col-6 pl-0">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">
            {{ $t("pages.books_edit.labels.author") }}
          </li>
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

    <CHr :color="'dark'" :title="$t('pages.books_edit.labels.sections_list')" />

    <div class="row justify-content-md-center mb-2 table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr class="row m-0">
            <th
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
            >
              №
            </th>
            <th class="col-sm-8 col-md-8 col-lg-10 col-xl-10">
              {{ $t("pages.books_edit.labels.section_title") }}
            </th>
            <th
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
            >
              {{ $t("pages.books_edit.labels.section_status") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="row m-0"
            v-for="section of current_data.books[0].sections"
            :key="section.id"
          >
            <td
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
              scope="row"
            >
              {{ section.position }}
            </td>
            <td class="col-sm-8 col-md-8 col-lg-10 col-xl-10">
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
            </td>
            <td
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
            >
              <CBadge :title="$t('badges.queue')" :color="'indigo'" />
              <!-- <CBadge :title="$t('badges.in_process')" :color="'orange'" /> -->
              <!-- <CBadge :title="$t('badges.ready')" :color="'green'" /> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

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
import { breadcrumbsStore } from "@/stores/breadcrumb";

const route = useRoute();
const api = useApi();

const breadcrumbs_store = breadcrumbsStore();
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

  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.translations.self",
      is_current: false,
      is_i18n: true,
      to: "VBookList",
    },
    {
      name: current_data.value.books[0].title,
      is_current: true,
    },
  ]);
});

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);
});
</script>

<style>
@import "@/assets/main.css";
</style>
