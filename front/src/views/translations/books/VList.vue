<template>
  <CHr
    :color="'dark'"
    :title="$t('routers.translations.self')"
    :icon="'bi-plus'"
    @click-button="newBook"
  />

  <div
    class="row justify-content-md-center"
    v-if="current_data?.translators?.length"
  >
    <div
      class="card mb-2"
      v-for="translator of current_data.translators"
      :key="translator.id"
    >
      <div class="row g-0">
        <div class="col-sm-12 col-md-2 text-center">
          <template v-if="translator.book.cover">
            <img
              :src="translator.book.cover"
              class="img-fluid rounded-start cover"
              :alt="translator.book.title"
              max-height="250px"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/missing_original.jpg"
              class="img-fluid rounded-start cover"
              :alt="translator.book.title"
            />
          </template>
        </div>
        <div class="col-sm-12 col-md-10">
          <div class="card-header">
            <h5 class="card-title">
              {{ translator.book.title }}
              <small class="text-muted">{{ translator.book.author }}</small>
            </h5>
            <h5
              class="card-title"
              v-if="translator.book.book_versions?.[0]?.title"
            >
              {{ translator.book.book_versions?.[0]?.title }}
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              <small class="text-muted">
                Стутус:
                <CBadge :title="$t('badges.private')" :color="'dark'" />
                <CBadge :title="$t('badges.in_process')" :color="'orange'" />
                <CBadge :title="$t('badges.ready')" :color="'green'" />
                <CBadge :title="$t('badges.suspended')" :color="'pink'" />
                <CBadge :title="$t('badges.thrown')" :color="'red'" />
                <CBadge :title="$t('badges.queue')" :color="'indigo'" />
              </small>
            </p>
            <p class="card-text">
              <small class="text-muted"
                >{{ $t("pages.books_list.labels.created") }}:
                {{ toBlogDateTime(translator.book.created_at) }}</small
              >
            </p>
          </div>
          <div class="card-footer text-muted">
            <router-link
              :to="{
                name: 'VBookEdit',
                params: { book_id: translator.book.id },
              }"
              class="btn btn-primary ml-rbase"
            >
              {{ $t("pages.books_list.buttons.translate") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import { toBlogDateTime } from "@/helpers/date.helper";
import { useApi } from "@/api/api";
import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import {
  UserTranslations,
  type UserTranslationsQuery,
  type UserTranslationsQueryVariables,
} from "@/generated/graphql";
import router from "@/router/index";

const api = useApi();
const current_user_store = currentUserStore();
const breadcrumbs_store = breadcrumbsStore();

const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

const current_data: Ref<UserTranslationsQuery | null> = ref(null);

current_user_store.$subscribe((_mutation, state) => {
  current_user.value = state.current_user;
});

function newBook() {
  router.push({ name: "VBookNew" });
}

onBeforeMount(async () => {
  const { data } = await api.graphql<
    UserTranslationsQuery,
    UserTranslationsQueryVariables
  >(UserTranslations, { user_id: current_user.value!.id });

  current_data.value = data;

  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.translations.self",
      is_current: true,
      is_i18n: true,
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
