import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast, { useToast } from "vue-toastification";

import "vue-toastification/dist/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from "./App.vue";
import router from "./router";
import api from "./api/api";

import { currentUserStore } from "./stores/current-user";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
});

const toast = useToast();

app.use(api, { currentUserStore, router, toast });

app.mount("#app");
