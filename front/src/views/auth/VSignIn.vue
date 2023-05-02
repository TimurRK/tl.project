<template>
  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-12 md-auto">
      <h1>{{ $t("routers.auth.sign_in") }}</h1>

      <form @submit="onSignIn" id="sign-in-form">
        <div class="mb-3">
          <label for="input-login" class="form-label">{{
            $t("views.auth.sign_in.labels.enter_login")
          }}</label>
          <input
            v-model="login"
            type="text"
            class="form-control"
            id="input-login"
            aria-describedby="input-login-help"
            autocomplete="off"
          />
          <div id="input-login-help" class="form-text">
            {{ $t("views.auth.sign_in.labels.login_is_not_case_sensitive") }}
          </div>
        </div>

        <div class="mb-3">
          <label for="input-password" class="form-label">{{
            $t("views.auth.sign_in.labels.enter_password")
          }}</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="input-password"
            aria-describedby="input-password-help"
            autocomplete="off"
          />
          <div id="input-password-help" class="form-text">
            {{ $t("views.auth.sign_in.labels.password_is_case_sensitive") }}
          </div>
        </div>

        <div class="mb-3 form-check" @click="openCookieModal">
          <input
            type="checkbox"
            class="form-check-input"
            id="use-cookie"
            :v-model="accept_cookie"
            :checked="accept_cookie"
          />
          <label class="form-check-label" for="use-cookie">
            {{ $t("views.auth.sign_in.labels.remain_in_the_system") }}
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          {{ $t("views.auth.sign_in.buttons.sign_in") }}
        </button>
      </form>
    </div>
  </div>

  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-12 md-auto">
      <br />
      <router-link :to="{ name: 'VSignUp' }">
        {{ $t("views.auth.common.register_a_new_account") }}
      </router-link>
      <br />
      <router-link :to="{ name: 'VChangePassword' }">
        {{ $t("views.auth.common.forgot_your_password") }}
      </router-link>
    </div>
  </div>

  <!-- use-cookie-modal -->
  <div
    ref="use_cookie_modal_ref"
    class="modal"
    id="use_cookie_modal"
    tabindex="-1"
    aria-labelledby="use-cookie-modal-title"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="use-cookie-modal-title">Cookie</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Закрыть"
            @click="refuseCookie"
          ></button>
        </div>

        <div class="modal-body">
          {{ $t("views.auth.sign_in.labels.accept_cookie_info") }}
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="refuseCookie">
            {{ $t("views.auth.sign_in.buttons.cancel") }}
          </button>
          <button type="button" class="btn btn-success" @click="acceptCookie">
            {{ $t("views.auth.sign_in.buttons.accept") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { onMounted, ref, type Ref } from "vue";
import { useToast } from "vue-toastification";

import router from "@/router";
import { useApi } from "@/api/api";

const api = useApi();
const toast = useToast();

const use_cookie_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let use_cookie_modal_value: Modal | null = null;

const login: Ref<string | null> = ref(null);
const password: Ref<string | null> = ref(null);

const accept_cookie: Ref<boolean> = ref(false);

onMounted(() => {
  if (use_cookie_modal_ref.value instanceof HTMLDivElement) {
    use_cookie_modal_value = new Modal(use_cookie_modal_ref.value, {
      keyboard: false,
    });
  }
});

function openCookieModal(event: Event) {
  event.preventDefault();

  if (accept_cookie.value) {
    accept_cookie.value = false;
  } else {
    if (use_cookie_modal_value) {
      use_cookie_modal_value.show();
    }
  }
}

function acceptCookie() {
  accept_cookie.value = true;

  if (use_cookie_modal_value) {
    use_cookie_modal_value.hide();
  }
}

function refuseCookie() {
  accept_cookie.value = false;

  if (use_cookie_modal_value) {
    use_cookie_modal_value.hide();
  }
}

async function onSignIn(event: Event) {
  event.preventDefault();

  if (login.value && password.value) {
    try {
      await api.signIn(
        {
          username: login.value,
          password: password.value,
          grand_type: "password",
        },
        !!accept_cookie.value
      );

      toast.success("SIGN_IN_SUCCESS", {
        timeout: 2500,
      });

      router.push({ name: "VDashboard" });
    } catch (error: any) {
      toast.error(error.message.join(", "), {
        timeout: 2500,
      });
    }
  }
}
</script>

<style></style>
