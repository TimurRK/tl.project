<template>
  <template v-if="current_data && current_data.translators.length">
    <template v-if="current_data.books[0].sections">
      <CHr :color="'dark'" :title="current_data.books[0].sections[0].title" />

      <div class="row justify-content-md-center mb-2">
        <div class="col-sm-12 col-md-6 mb-2">
          <ul class="list-group">
            <li class="list-group-item disabled" aria-disabled="true">
              {{ $t("pages.books_edit.labels.book_status") }}
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-md-6">
          <ul class="list-group">
            <li class="list-group-item list-group-item-fp" aria-disabled="true">
              <v-select
                :options="section_statuses"
                label="label"
                value="value"
                :appendToBody="true"
                v-model="current_data.books[0].sections[0].section_status"
                :reduce="(c: Record<string, string>) => c.value"
              >
                <template #selected-option="{ value }">
                  <CSectionStatus :status="value" />
                </template>
                <template #option="{ value }">
                  <CSectionStatus :status="value" />
                </template>
              </v-select>
            </li>
          </ul>
        </div>
      </div>

      <CHr
        :color="'dark'"
        :title="$t('pages.books_sections_edit.labels.items_list')"
      />

      <div class="row justify-content-md-center mb-2 table-responsive">
        <table class="table table-hover table-sm table-striped">
          <thead>
            <tr class="row m-0">
              <th
                class="col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center"
              >
                №
              </th>
              <th class="col-sm-12 col-md-5 col-lg-5 col-xl-5 break-word">
                {{ $t("pages.books_sections_edit.labels.original") }}
              </th>
              <th
                class="col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center"
              >
                #
              </th>
              <th
                class="col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center"
              >
                {{ $t("pages.books_sections_edit.labels.translation") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="row m-0"
              v-for="item in current_data.books[0].sections[0].items"
              :key="item.id"
            >
              <td
                class="col-sm-12 col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center"
              >
                {{ item.position }}
              </td>
              <td class="col-sm-12 col-md-4 col-lg-5 col-xl-5">
                <template v-if="item.itemable.__typename === 'ItemImage'">
                  <img :src="item.itemable.value" />
                </template>
                <template v-else>
                  <p>{{ item.itemable.value }}</p>
                </template>
              </td>
              <td
                class="col-sm-12 col-md-2 col-lg-1 col-xl-1 d-flex justify-content-center"
              >
                <template v-if="item.itemable.__typename === 'ItemText'">
                  <router-link
                    :to="{
                      name: 'VItemTextNew',
                      params: {
                        book_id: current_data.books[0].id,
                        section_id: current_data.books[0].sections[0].id,
                        item_id: item.id,
                      },
                    }"
                  >
                    {{ $t("pages.books_sections_edit.buttons.add") }}
                  </router-link>
                </template>
              </td>
              <td class="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <template
                  v-if="
                    item.itemable.__typename === 'ItemText' &&
                    item.itemable.item_text_versions
                  "
                >
                  <ul>
                    <li
                      class="d-flex justify-content-between align-items-center"
                      v-for="item_text_version of item.itemable
                        .item_text_versions"
                      :key="item_text_version.id"
                    >
                      <span>
                        <span>{{ item_text_version.user.login }}</span>
                        <span class="mlr-base">от</span>
                        <span>
                          <router-link
                            :to="{
                              name: 'VItemTextEdit',
                              params: {
                                book_id: current_data.books[0].id,
                                section_id:
                                  current_data.books[0].sections[0].id,
                                item_id: item.id,
                                item_version_id: item_text_version.id,
                              },
                            }"
                          >
                            {{ item_text_version.created_at }}
                          </router-link>
                        </span>
                      </span>
                      <span
                        v-if="item_text_version.is_main"
                        class="badge bg-info text-dark"
                      >
                        {{ $t("pages.books_sections_edit.labels.is_main") }}
                      </span>
                    </li>
                  </ul>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount, watch } from "vue";
import { useToast } from "vue-toastification";

import { useApi } from "@/api/api";

import CHr from "@/components/CHr.vue";
import CSectionStatus from "@/components/CSectionStatus.vue";

import {
  ESectionStatus,
  SectionChangeStatus,
  SectionItems,
  type SectionChangeStatusMutation,
  type SectionChangeStatusMutationVariables,
  type SectionItemsQuery,
  type SectionItemsQueryVariables,
} from "@/generated/graphql";
import { currentUserStore, type ICurrentUser } from "@/stores/current-user";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const api = useApi();
const toast = useToast();

const breadcrumbs_store = breadcrumbsStore();
const current_user_store = currentUserStore();
const current_user: Ref<ICurrentUser | null> = ref(null);
current_user.value = current_user_store.currentUser;

const current_data: Ref<SectionItemsQuery | null> = ref(null);

const props = defineProps({
  book_id: { type: String, required: true },
  section_id: { type: String, required: true },
});

const section_statuses = Object.values(ESectionStatus).map((value) => {
  return { label: value.toLowerCase(), value };
});

onBeforeMount(async () => {
  const book_id = props.book_id;
  const section_id = props.section_id;

  const { data } = await api.graphql<
    SectionItemsQuery,
    SectionItemsQueryVariables
  >(SectionItems, { book_id, section_id, user_id: current_user.value!.id });

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
      is_i18n: false,
      is_current: false,
      to: "VBookEdit",
      params: { book_id },
    },
    {
      name: current_data.value.books[0].sections![0].title,
      is_current: true,
      is_i18n: false,
    },
  ]);
});

/**
 * @TODO костыль. Почему-то у v-select не работают события.
 * @input, @change, @selected.
 */
const unwatch = watch(
  () => current_data.value?.books[0]?.sections?.[0].section_status,
  async (curr_name, prev_name) => {
    if (curr_name && prev_name) {
      await sectionChangeStatus();
    }
  }
);

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);

  unwatch();
});

async function sectionChangeStatus() {
  try {
    await api.graphql<
      SectionChangeStatusMutation,
      SectionChangeStatusMutationVariables
    >(SectionChangeStatus, {
      section_id: current_data.value!.books![0].sections![0].id,
      section_status: current_data.value!.books![0].sections![0].section_status,
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
</style>
