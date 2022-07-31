<template>
  <template v-if="recovery_keys?.length">
    <div class="row justify-content-md-center">
      <div class="col-lg-12 col-md-12 col-12 md-auto">
        <h1 class="text-center">Ключи для восстановления аккаунта</h1>
      </div>
    </div>

    <div
      class="row justify-content-md-center mt-3 alert alert-warning"
      role="alert"
    >
      Сохраните эти ключи. Без них невозможно будет восстановить аккаунт в
      случае утраты пароля.
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
          Скачать
        </button>
      </div>
    </div>

    <div class="row justify-content-md-center mt-3">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <br />
        <router-link :to="{ name: 'VSignIn' }">
          Войти в уже существующий аккаунт
        </router-link>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <h1>Регистрация</h1>

        <form @submit="onSignUp" autocomplete="off" id="sign-up-form">
          <div class="mb-3">
            <label for="input-login" class="form-label">Введите логин</label>
            <input
              type="text"
              v-model="login"
              class="form-control"
              id="input-login"
              aria-describedby="input-login-help"
              autocomplete="off"
            />
            <div id="input-login-help" class="form-text">
              Логин не чувствителен к регистру
            </div>
          </div>

          <div class="mb-3">
            <label for="input-password" class="form-label"
              >Введите пароль</label
            >
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="input-password"
              aria-describedby="input-password-help"
              autocomplete="off"
            />
            <div id="input-password-help" class="form-text">
              Пароль чувствителен к регистру
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <br />
        <router-link :to="{ name: 'VSignIn' }">
          Войти в уже существующий аккаунт
        </router-link>
        <br />
        <router-link :to="{ name: 'VChangePassword' }">
          Забыли пароль?
        </router-link>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useApi } from "@/api/api";
import { ref, type Ref } from "vue";
import { useToast } from "vue-toastification";
import { saveAs } from "file-saver";

const api = useApi();
const toast = useToast();

const login: Ref<string | null> = ref(null);
const password: Ref<string | null> = ref(null);
const recovery_keys: Ref<string[] | null> = ref(null);

const cookie_domain = import.meta.env.VITE_APP_COOKIE_DOMAIN;

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
