<template>
  <template v-if="current_data && current_data.users.length">
    <div class="row">
      <div class="col-sm-12 col-md-8">
        <CHr
          :color="'dark'"
          :title="$t('views.community.user_profile.labels.info')"
        />

        <div class="card">
          <div class="row">
            <div class="col-sm-12 col-md-5 col-lg-4 col-xl-3">
              <img
                src="@/assets/not_found/avatar.png"
                class="rounded float-start"
                style="width: 150px"
              />
            </div>
            <div class="col-sm-12 col-md-7 col-lg-8 col-xl-9">
              <div class="card-header">
                <h5 class="card-title">
                  <b>{{ current_data.users[0].login }}</b>
                </h5>
                <p class="card-text">
                  <small
                    class="text-muted"
                    v-if="
                      current_data.users[0].show_birthdate &&
                      current_data.users[0].birthdate
                    "
                  >
                    <CAge :date="current_data.users[0].birthdate" />
                    &nbsp;&frasl;&nbsp;
                  </small>
                  <small class="text-muted" v-if="current_data.users[0].gender">
                    <CGender :gender="current_data.users[0].gender"></CGender>
                    &nbsp;&frasl;&nbsp;
                  </small>
                  <small class="text-muted">
                    {{ $t("views.community.user_profile.labels.created_at") }}
                    <span
                      class="underline-dotted"
                      v-tooltip="current_data.users[0].created_at"
                    >
                      {{
                        new Date(current_data.users[0].created_at).getFullYear()
                      }}
                      {{
                        $t(
                          "views.community.user_profile.labels.created_at_year",
                        )
                      }}
                    </span>
                  </small>
                </p>
              </div>

              <div class="card-body">
                <h6 class="card-title">
                  <router-link
                    :to="{
                      name: 'VUserBookList',
                      params: { login: current_data.users[0].login },
                    }"
                    class="card-link"
                  >
                    {{ $t("routers.community.bookmarks") }}
                  </router-link>
                </h6>
                <div class="progress">
                  <div
                    class="progress-bar bg-warning bg-gradient"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span
                      class="underline-dotted"
                      v-tooltip="$t('bookmark_statuses.planned')"
                    >
                      20
                    </span>
                  </div>
                  <div
                    class="progress-bar bg-info bg-gradient"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span
                      class="underline-dotted"
                      v-tooltip="$t('bookmark_statuses.watching')"
                    >
                      20
                    </span>
                  </div>
                  <div
                    class="progress-bar bg-primary bg-gradient"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span
                      class="underline-dotted"
                      v-tooltip="$t('bookmark_statuses.completed')"
                    >
                      20
                    </span>
                  </div>
                  <div
                    class="progress-bar bg-secondary bg-gradient"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span
                      class="underline-dotted"
                      v-tooltip="$t('bookmark_statuses.on_hold')"
                    >
                      20
                    </span>
                  </div>
                  <div
                    class="progress-bar bg-danger bg-gradient"
                    role="progressbar"
                    style="width: 20%"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span
                      class="underline-dotted"
                      v-tooltip="$t('bookmark_statuses.dropped')"
                    >
                      20
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4">
        <CHr
          :color="'dark'"
          :title="$t('views.community.user_profile.labels.history')"
        />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount, onBeforeUnmount } from "vue";

import { useApi } from "@/api/api";

import CHr from "@/components/CHr.vue";
import CGender from "@/components/CGender.vue";
import CAge from "@/components/CAge.vue";
import CBadge from "@/components/CBadge.vue";
import { breadcrumbsStore } from "@/stores/breadcrumb";
import {
  UserProfile,
  type UserProfileQuery,
  type UserProfileQueryVariables,
} from "@/generated/graphql";

const api = useApi();

const current_data: Ref<UserProfileQuery | null> = ref(null);

const props = defineProps({
  login: { type: String, required: true },
});

const breadcrumbs_store = breadcrumbsStore();

onBeforeMount(async () => {
  const { data } = await api.graphql<
    UserProfileQuery,
    UserProfileQueryVariables
  >(UserProfile, { login: props.login });

  current_data.value = data;

  if (!current_data.value.users?.length) {
    /**
     * TODO 404 redirect
     */
  }

  breadcrumbs_store.setBreadcrumbs([
    {
      name: props.login,
      is_current: true,
      is_i18n: false,
    },
  ]);
});

onBeforeUnmount(async () => {
  breadcrumbs_store.setBreadcrumbs(null);
});
</script>

<style></style>
