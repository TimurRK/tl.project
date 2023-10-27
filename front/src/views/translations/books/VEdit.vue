<template>
  <template v-if="current_data && current_data.translators.length">
    <CHr :color="'dark'" :title="current_data.books[0].title" />

    <div class="row mb-2">
      <div class="col-sm-12 col-md-6 mb-2">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">
            {{ $t("views.translations.books.edit.labels.author") }}
          </li>
        </ul>
      </div>
      <div class="col-sm-12 col-md-6">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">
            {{ current_data.books[0].author }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-sm-12 col-md-6 mb-2">
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">
            {{ $t("views.translations.books.edit.labels.book_status") }}
          </li>
        </ul>
      </div>
      <div class="col-sm-12 col-md-6">
        <ul class="list-group">
          <li class="list-group-item list-group-item-fp" aria-disabled="true">
            <v-select
              :options="book_statuses"
              label="label"
              value="value"
              :appendToBody="true"
              v-model="current_data.books[0].book_status"
              :reduce="(c: Record<string, string>) => c.value"
            >
              <template #selected-option="{ value }">
                <CBookStatus :status="value" />
              </template>
              <template #option="{ value }">
                <CBookStatus :status="value" />
              </template>
            </v-select>
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-12 mb-2">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="bookIsPrivate"
            v-model="current_data.books[0].is_private"
            @change="bookChangePrivate"
          />
          <label class="form-check-label" for="bookIsPrivate">
            {{ $t("views.translations.books.edit.labels.is_private") }}
            <b
              >({{
                $t("views.translations.books.edit.labels.is_private_selected")
              }}
              {{ current_data.books[0].is_private }})</b
            >
          </label>
        </div>
      </div>
    </div>

    <CHr
      :color="'dark'"
      :title="$t('views.translations.books.edit.labels.sections_list')"
    />

    <div class="table-responsive">
      <table class="table table-hover table-sm">
        <thead>
          <tr class="row m-0">
            <th
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
            >
              №
            </th>
            <th class="col-sm-8 col-md-8 col-lg-10 col-xl-10">
              {{ $t("views.translations.books.edit.labels.section_title") }}
            </th>
            <th
              class="col-sm-2 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
            >
              {{ $t("views.translations.books.edit.labels.section_status") }}
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
                  name: 'VTranslationSectionEdit',
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
              <CSectionStatus :status="section.section_status" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount, watch } from "vue";
import { useToast } from "vue-toastification";

import { useApi } from "@/api/api";

import CHr from "@/components/CHr.vue";
import CBookStatus from "@/components/CBookStatus.vue";
import CSectionStatus from "@/components/CSectionStatus.vue";

import {
  BookChangePrivate,
  BookChangeStatus,
  BookSections,
  EBookStatus,
  type BookChangePrivateMutation,
  type BookChangePrivateMutationVariables,
  type BookChangeStatusMutation,
  type BookChangeStatusMutationVariables,
  type BookSectionsQuery,
  type BookSectionsQueryVariables,
} from "@/generated/graphql";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const api = useApi();
const toast = useToast();

const breadcrumbs_store = breadcrumbsStore();
const current_user_store = currentUserStore();
const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

const current_data: Ref<BookSectionsQuery | null> = ref(null);

const book_statuses = Object.values(EBookStatus).map((value) => {
  return { label: value.toLowerCase(), value };
});

const props = defineProps({
  book_id: { type: String, required: true },
});

onBeforeMount(async () => {
  const book_id = props.book_id;

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
      to: "VTranslationBookList",
    },
    {
      name: current_data.value.books[0].title,
      is_current: true,
    },
  ]);
});

/**
 * TODO костыль. Почему-то у v-select не работают события.
 * @input, @change, @selected.
 */
const unwatch = watch(
  () => current_data.value?.books[0]?.book_status,
  async (curr_name, prev_name) => {
    if (curr_name && prev_name) {
      await bookChangeStatus();
    }
  },
);

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);

  unwatch();
});

async function bookChangePrivate() {
  try {
    await api.graphql<
      BookChangePrivateMutation,
      BookChangePrivateMutationVariables
    >(BookChangePrivate, {
      book_id: current_data.value!.books[0].id,
      is_private: current_data.value!.books[0].is_private,
    });

    toast.success("UPDATE_SUCCESS", {
      timeout: 2500,
    });
  } catch (error: any) {
    toast.error(error.message, {
      timeout: 2500,
    });
  }
}

async function bookChangeStatus() {
  try {
    await api.graphql<
      BookChangeStatusMutation,
      BookChangeStatusMutationVariables
    >(BookChangeStatus, {
      book_id: current_data.value!.books[0].id,
      book_status: current_data.value!.books[0].book_status,
    });

    toast.success("UPDATE_SUCCESS", {
      timeout: 2500,
    });
  } catch (error: any) {
    toast.error(error.message, {
      timeout: 2500,
    });
  }
}
</script>

<style>
@import "@/assets/main.css";

.list-group-item-fp {
  padding: 0.25rem 1rem !important;
}

.v-select .dropdown-toggle,
.v-select .vs__dropdown-toggle {
  border: none !important;
}

.vs__dropdown-menu {
  border: none !important;
}
</style>
