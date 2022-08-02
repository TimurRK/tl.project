<template>
  <template v-if="password_changed">
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-12 md-auto">
        <h1>Восстановление</h1>
      </div>
    </div>

    <div
      class="row justify-content-md-center mt-3 alert alert-success"
      role="alert"
    >
      Пароль успешно изменен. Используйте установленный пароль для входа в
      аккаунт.
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
        <h1>Восстановление</h1>

        <form
          @submit="onChangePassword"
          autocomplete="off"
          id="change-password-form"
        >
          <div class="mb-3">
            <label for="input-recovery-key" class="form-label">
              Ключ восстановления
            </label>
            <input
              type="text"
              v-model="recovery_key"
              class="form-control"
              id="input-recovery-key"
              aria-describedby="input-recovery-key-help"
              autocomplete="off"
            />
            <div id="input-recovery-key-help" class="form-text">
              Ключ восстановления не чувствителен к регистру
            </div>
          </div>

          <div class="mb-3">
            <label for="input-password" class="form-label">
              Введите новый пароль
            </label>
            <input
              type="password"
              v-model="new_password"
              class="form-control"
              id="input-password"
              aria-describedby="input-password-help"
              autocomplete="off"
            />
            <div id="input-password-help" class="form-text">
              Пароль чувствителен к регистру
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Отправить</button>
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
        <router-link :to="{ name: 'VSignUp' }">
          Зарегистрировать новый аккаунт
        </router-link>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useToast } from "vue-toastification";

import { useApi } from "@/api/api";

const api = useApi();
const toast = useToast();

const recovery_key: Ref<string | null> = ref(null);
const new_password: Ref<string | null> = ref(null);
const password_changed: Ref<boolean> = ref(false);

async function onChangePassword(event: Event) {
  event.preventDefault();

  if (recovery_key.value && new_password.value) {
    try {
      await api.changePassword(recovery_key.value, new_password.value);

      toast.success("CHANGE_PASSWORD_SUCCESS", {
        timeout: 2500,
      });

      password_changed.value = true;
    } catch (error: any) {
      toast.error(error.message.join(", "), {
        timeout: 2500,
      });
    }
  }
}
</script>

<style></style>
