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
      v-for="(translator, index) of current_data.translators"
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
                <CBadge
                  :title="$t('badges.private')"
                  :color="'dark'"
                  v-if="translator.book.is_private"
                />
                <CBookStatus :status="translator.book.book_status" />
              </small>
            </p>
            <p class="card-text">
              <small class="text-muted"
                >{{ $t("views.translations.books.list.labels.created") }}:
                {{ toBlogDateTime(translator.book.created_at) }}</small
              >
            </p>
          </div>
          <div class="card-footer text-muted">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-2">
                <div class="row plr-base">
                  <router-link
                    :to="{
                      name: 'VTranslationBookEdit',
                      params: { book_id: translator.book.id },
                    }"
                    class="btn btn-primary"
                  >
                    {{ $t("views.translations.books.list.buttons.translate") }}
                  </router-link>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-2">
                <div class="row plr-base">
                  <router-link
                    :to="{
                      name: 'VBook',
                      params: { book_id: translator.book.id },
                    }"
                    class="btn btn-outline-success"
                  >
                    {{ $t("views.translations.books.list.buttons.read") }}
                  </router-link>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6"></div>
              <div class="col-sm-12 col-md-12 col-lg-2">
                <div class="row plr-base">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteBook(translator.book.id, index)"
                  >
                    {{ $t("views.translations.books.list.buttons.delete") }}
                  </button>
                </div>
              </div>
            </div>
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
import CBookStatus from "@/components/CBookStatus.vue";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import {
  BookDelete,
  UserTranslations,
  type BookDeleteMutation,
  type BookDeleteMutationVariables,
  type UserTranslationsQuery,
  type UserTranslationsQueryVariables,
} from "@/generated/graphql";
import router from "@/router/index";

const api = useApi();
const current_user_store = currentUserStore();
const breadcrumbs_store = breadcrumbsStore();

const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

current_user_store.$subscribe((_mutation, state) => {
  current_user.value = state.current_user;
});

const current_data: Ref<UserTranslationsQuery | null> = ref(null);

function newBook() {
  router.push({ name: "VTranslationBookNew" });
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

async function deleteBook(book_id: string, index: number) {
  if (!window.confirm("delete?")) {
    return;
  }

  const { data } = await api.graphql<
    BookDeleteMutation,
    BookDeleteMutationVariables
  >(BookDelete, { book_id });

  if (data.bookDelete.id) {
    current_data.value?.translators.splice(index, 1);
  }
}

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);
});
</script>

<style>
@import "@/assets/main.css";
</style>
