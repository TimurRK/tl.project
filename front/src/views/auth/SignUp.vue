<template>
  <!-- <div id="VSignUp" class="container"> -->
  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-12 md-auto">
      <h1>Регистрация</h1>

      <form @submit="onSignUp" autocomplete="off" id="sign-up-form">
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
  <!-- </div> -->
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

function onSignUp(event: Event) {
  event.preventDefault();

  console.log(route.meta);
}
</script>

<style></style>
