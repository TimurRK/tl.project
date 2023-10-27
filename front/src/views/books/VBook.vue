<template>
  <template v-if="current_data?.books?.length">
    <CHr :color="'dark'" :title="current_data.books[0].title" />

    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5">
        <CHr :color="'dark'" :title="'Информация'" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3">
        <CHr :color="'dark'" :title="'Рейтинг'" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <CHr :color="'dark'" :title="'Оценки'" />
      </div>

      <!-- <div class="col-sm-12 col-md-7">
        <CHr :color="'dark'" :title="current_data.books[0].title" />

        <div class="card">
          <div class="row">
            <div class="col-sm-12 col-md-5 col-lg-4 col-xl-3">
              <img
                v-if="current_data.books[0].cover"
                :src="current_data.books[0].cover"
                class="rounded float-start"
                style="width: 150px"
              />
              <img
                v-else
                src="@/assets/not_found/avatar.png"
                class="rounded float-start"
                style="width: 150px"
              />
            </div>
            <div class="col-sm-12 col-md-7 col-lg-8 col-xl-9">
              <div class="card-header">
                <h5 class="card-title">
                  <b>{{ current_data.books[0].title }}</b>
                </h5>
              </div>
              <div class="card-body">
                <p class="card-text">
                  <span class="text-muted">
                    {{ $t("views.books.book.labels.status") }}:
                  </span>
                  <span>
                    <CBookStatus :status="current_data.books[0].book_status" />
                  </span>
                </p>
                <p class="card-text" v-if="current_data.books[0].author">
                  <span class="text-muted">
                    {{ $t("views.books.book.labels.author") }}:
                  </span>
                  <span>
                    {{ current_data.books[0].author }}
                  </span>
                </p>
                <p class="card-text" v-if="current_data.books[0].annotation">
                  <span class="text-muted">
                    {{ $t("views.books.book.labels.annotation") }}:
                  </span>
                  <span>
                    {{ current_data.books[0].annotation }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4 offset-md-1">
        <CHr
          :color="'dark'"
          :title="$t('views.community.user_profile.labels.history')"
        />
      </div> -->
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import { useApi } from "@/api/api";
import CHr from "@/components/CHr.vue";
import CBadge from "@/components/CBadge.vue";
import CBookStatus from "@/components/CBookStatus.vue";
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
      name: "routers.books.self",
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
