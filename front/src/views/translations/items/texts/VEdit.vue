<template>
  <template v-if="current_data && current_data.translators.length">
    <template v-if="current_data.books[0].sections">
      <template v-if="current_data.books[0].sections[0].items">
        <template
          v-if="(current_data.books[0].sections[0].items[0].itemable as ItemText).item_text_versions"
        >
          <CHr
            :color="'dark'"
            :title="$t('routers.translations.edit')"
            :icon="'bi-trash-fill'"
            @click-button="deleteTtanslate"
          />

          <div class="row justify-content-md-center mb-2 table-responsive">
            <table class="table table-hover table-sm">
              <thead>
                <tr class="row m-0">
                  <th class="col-sm-12 col-md-6">
                    {{ $t("pages.books_sections_items_edit.labels.original") }}
                  </th>
                  <th class="col-sm-12 col-md-6">
                    {{
                      $t("pages.books_sections_items_edit.labels.translation")
                    }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="row m-0">
                  <td class="col-sm-12 col-md-6">
                    <p>
                      {{
                        current_data.books[0].sections[0].items[0].itemable
                          .value
                      }}
                    </p>
                  </td>
                  <td class="col-sm-12 col-md-6">
                    <div class="form-floating h-100">
                      <textarea
                        class="form-control h-100 p-1"
                        v-model="translate"
                      ></textarea>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="row justify-content-md-center mb-2">
            <div class="col-sm-12 col-md-6"></div>

            <div class="col-sm-12 col-md-6">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="bookIsPrivate"
                  v-model="is_main"
                />
                <label class="form-check-label" for="bookIsPrivate">
                  {{ $t("pages.books_sections_items_edit.labels.is_main") }}
                  <b
                    >({{
                      $t(
                        "pages.books_sections_items_edit.labels.is_main_selected"
                      )
                    }}
                    {{ is_main }})</b
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="row justify-content-md-center">
            <div class="col-sm-12 col-md-6"></div>
            <div class="col-sm-12 col-md-6">
              <button
                type="button"
                class="btn btn-primary"
                @click="updateTransalte"
              >
                {{ $t("pages.books_sections_items_edit.buttons.save") }}
              </button>
            </div>
          </div>
        </template>
      </template>
    </template>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue";
import { useToast } from "vue-toastification";

import { useApi } from "@/api/api";
import router from "@/router";

import CHr from "@/components/CHr.vue";

import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import {
  ItemText,
  ItemTextVersion,
  TextVersionDelete,
  TextVersionUpdate,
  type ItemTextVersionQuery,
  type ItemTextVersionQueryVariables,
  type TextVersionDeleteMutation,
  type TextVersionDeleteMutationVariables,
  type TextVersionUpdateMutation,
  type TextVersionUpdateMutationVariables,
} from "@/generated/graphql";

const api = useApi();
const toast = useToast();

const breadcrumbs_store = breadcrumbsStore();
const current_user_store = currentUserStore();
const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

const current_data: Ref<ItemTextVersionQuery | null> = ref(null);

const props = defineProps({
  book_id: { type: String, required: true },
  section_id: { type: String, required: true },
  item_id: { type: String, required: true },
  item_version_id: { type: String, required: true },
});

const translate: Ref<string> = ref("");
const is_main: Ref<boolean> = ref(false);

onBeforeMount(async () => {
  const book_id = props.book_id;
  const section_id = props.section_id;
  const item_id = props.item_id;
  const item_version_id = props.item_version_id;

  const { data } = await api.graphql<
    ItemTextVersionQuery,
    ItemTextVersionQueryVariables
  >(ItemTextVersion, {
    book_id,
    section_id,
    item_id,
    item_version_id,
    user_id: current_user.value!.id,
  });

  current_data.value = data;

  translate.value = (
    current_data.value.books![0].sections![0].items![0].itemable as ItemText
  ).item_text_versions![0].value;
  is_main.value = (
    current_data.value.books![0].sections![0].items![0].itemable as ItemText
  ).item_text_versions![0].is_main;

  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.translations.self",
      is_current: false,
      is_i18n: true,
      to: "VTranslationBookList",
    },
    {
      name: current_data.value.books[0].title,
      is_i18n: false,
      is_current: false,
      to: "VTranslationBookEdit",
      params: { book_id },
    },
    {
      name: current_data.value.books[0].sections![0].title,
      to: "VTranslationSectionEdit",
      params: { book_id, section_id },
      is_current: false,
      is_i18n: false,
    },
    {
      name: "routers.translations.edit",
      is_current: true,
      is_i18n: true,
    },
  ]);
});

async function updateTransalte() {
  try {
    await api.graphql<
      TextVersionUpdateMutation,
      TextVersionUpdateMutationVariables
    >(TextVersionUpdate, {
      id: (
        current_data.value!.books![0].sections![0].items![0]
          .itemable as ItemText
      ).item_text_versions![0].id,
      data: {
        is_main: is_main.value,
        value: translate.value,
      },
    });

    toast.success("UPDATE_SUCCESS", {
      timeout: 2500,
    });

    router.push({
      name: "VTranslationSectionEdit",
      params: {
        book_id: props.book_id,
        section_id: props.section_id,
      },
    });
  } catch (error: any) {
    toast.error(error.message, {
      timeout: 2500,
    });
  }
}

async function deleteTtanslate() {
  if (!window.confirm("delete?")) {
    return;
  }

  try {
    await api.graphql<
      TextVersionDeleteMutation,
      TextVersionDeleteMutationVariables
    >(TextVersionDelete, {
      id: (
        current_data.value!.books![0].sections![0].items![0]
          .itemable as ItemText
      ).item_text_versions![0].id,
    });

    toast.success("DELETE_SUCCESS", {
      timeout: 2500,
    });

    router.push({
      name: "VTranslationSectionEdit",
      params: {
        book_id: props.book_id,
        section_id: props.section_id,
      },
    });
  } catch (error: any) {
    toast.error(error.message, {
      timeout: 2500,
    });
  }
}
</script>

<style></style>
