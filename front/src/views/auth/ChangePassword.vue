<template>
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

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

function onChangePassword(event: Event) {
  event.preventDefault();

  console.log(route.meta);
}
</script>

<style></style>
