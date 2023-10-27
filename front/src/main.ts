import { createApp } from "vue";

import "vue-toastification/dist/index.css";
import "vue-select/dist/vue-select.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import api from "@/api/api";
import { currentUserStore } from "@/stores/current-user";

import App from "./App.vue";
const app = createApp(App);

import { createPinia } from "pinia";
app.use(createPinia());

import router from "@/router";
app.use(router);

import Toast, { POSITION, useToast } from "vue-toastification";
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  position: POSITION.BOTTOM_RIGHT,
});

const toast = useToast();
app.use(api, { currentUserStore, router, toast });

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";
app.use(FloatingVue);

import { i18n } from "@/locales/i18n";
app.use(i18n);

import vSelect from "vue-select";
app.component("v-select", vSelect);

app.mount("#app");
