<template>
  <template v-if="recovery_keys?.length">
    <div class="row justify-content-md-center">
      <div class="col-lg-12 col-md-12 col-12 md-auto">
        <h1 class="text-center">
          {{ $t("views.auth.sign_up.labels.recovery_keys") }}
        </h1>
      </div>
    </div>

    <div
      class="row justify-content-md-center mt-3 alert alert-warning"
      role="alert"
    >
      {{ $t("views.auth.sign_up.labels.recovery_keys_alert") }}
    </div>

    <div class="row justify-content-md-center mt-3">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <ul class="list-group">
          <li
            class="list-group-item list-group-item-success"
            v-for="recovery_key of recovery_keys"
            :key="recovery_key"
          >
            {{ recovery_key }}
          </li>
        </ul>
      </div>
    </div>

    <div class="row justify-content-md-center mt-3">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <button class="btn btn-primary w-100" @click="downloadRecoveryKeys">
          {{ $t("views.auth.sign_up.buttons.download") }}
        </button>
      </div>
    </div>

    <div class="row justify-content-md-center mt-3">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <br />
        <router-link :to="{ name: 'VSignIn' }">
          {{ $t("views.auth.common.login_to_an_existing_account") }}
        </router-link>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <h1>{{ $t("routers.auth.sign_up") }}</h1>

        <form @submit="onSignUp" autocomplete="off" id="sign-up-form">
          <div class="mb-3">
            <label for="input-login" class="form-label">{{
              $t("views.auth.sign_up.labels.enter_login")
            }}</label>
            <input
              type="text"
              v-model="login"
              class="form-control"
              id="input-login"
              aria-describedby="input-login-help"
              autocomplete="off"
            />
            <div id="input-login-help" class="form-text">
              {{ $t("views.auth.sign_up.labels.login_is_not_case_sensitive") }}
            </div>
          </div>

          <div class="mb-3">
            <label for="input-password" class="form-label">
              {{ $t("views.auth.sign_up.labels.enter_password") }}
            </label>

            <input
              type="password"
              v-model="password"
              class="form-control"
              id="input-password"
              aria-describedby="input-password-help"
              autocomplete="off"
            />
            <div id="input-password-help" class="form-text">
              {{ $t("views.auth.sign_up.labels.password_is_case_sensitive") }}
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            {{ $t("views.auth.sign_up.buttons.registration") }}
          </button>
        </form>
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <br />
        <router-link :to="{ name: 'VSignIn' }">
          {{ $t("views.auth.common.register_a_new_account") }}
        </router-link>
        <br />
        <router-link :to="{ name: 'VChangePassword' }">
          {{ $t("views.auth.common.forgot_your_password") }}
        </router-link>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";
import { useToast } from "vue-toastification";
import { saveAs } from "file-saver";

import { useApi } from "@/api/api";
import { breadcrumbsStore } from "@/stores/breadcrumb";

const api = useApi();
const toast = useToast();
const breadcrumbs_store = breadcrumbsStore();

const login: Ref<string | null> = ref(null);
const password: Ref<string | null> = ref(null);
const recovery_keys: Ref<string[] | null> = ref(null);

const cookie_domain = import.meta.env.VITE_APP_COOKIE_DOMAIN;

onBeforeMount(() => {
  breadcrumbs_store.setBreadcrumbs([
    {
      name: "routers.auth.sign_up",
      is_current: true,
      is_i18n: true,
    },
  ]);
});

async function onSignUp(event: Event) {
  event.preventDefault();

  if (login.value && password.value) {
    try {
      recovery_keys.value = await api.signUp(login.value, password.value);

      toast.success("SIGN_UP_SUCCESS", {
        timeout: 2500,
      });
    } catch (error: any) {
      toast.error(error.message.join(", "), {
        timeout: 2500,
      });
    }
  }
}

function downloadRecoveryKeys(event: Event) {
  event.preventDefault();

  const data = [
    `site: ${cookie_domain}\n`,
    "\n",
    `login: ${login.value}\n`,
    `password: ${password.value}\n`,
    "\n",
    `recovery keys:\n`,
    ...recovery_keys.value!.map((k) => `${k}\n`),
  ];

  const blob_file = new Blob(data, { type: "text/plain; charset=utf-8" });

  saveAs(blob_file, `RECOVERY_KEYS_${cookie_domain}_${login.value}.txt`);
}
</script>

<style></style>
