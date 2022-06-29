<template>
  <!-- <div id="VSignIn"> -->
  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-12 md-auto">
      <h1>Авторизация</h1>

      <form @submit="onSignIn" id="sign-in-form">
        <div class="mb-3">
          <label for="input-login" class="form-label">Введите логин</label>
          <input
            type="text"
            class="form-control"
            id="input-login"
            aria-describedby="input-login-help"
          />
          <div id="input-login-help" class="form-text">
            Логин не чувствителен к регистру
          </div>
        </div>

        <div class="mb-3">
          <label for="input-password" class="form-label">Введите пароль</label>
          <input
            type="password"
            class="form-control"
            id="input-password"
            aria-describedby="input-password-help"
          />
          <div id="input-password-help" class="form-text">
            Пароль чувствителен к регистру
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
            Оставаться в системе?
          </label>
        </div>

        <button type="submit" class="btn btn-primary">Войти</button>
      </form>
    </div>
  </div>

  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-12 md-auto">
      <br />
      <router-link :to="{ name: 'VSignUp' }">
        Зарегистрировать новый аккаунт
      </router-link>
      <br />
      <router-link :to="{ name: 'VChangePassword' }">
        Забыли пароль?
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
          Этот сайт использует cookie для хранения токенов авторизации.
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="refuseCookie">
            Отмена
          </button>
          <button type="button" class="btn btn-success" @click="acceptCookie">
            Согласиться
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from 'vue-router';
import { Modal } from "bootstrap";

const route = useRoute();

let use_cookie_modal_ref: Ref<HTMLDivElement | null> = ref(null);
let use_cookie_modal_value: Modal | null = null;

let accept_cookie: Ref<boolean> = ref(false);

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

function onSignIn(event: Event) {
  event.preventDefault();
}
</script>

<style></style>
