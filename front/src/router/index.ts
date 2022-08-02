import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const dashboard_routes: RouteRecordRaw[] = [
  {
    name: "VDashboard",
    path: "/",
    component: () => import("../views/VDashboard.vue"),
    meta: {
      name: "Главная",
      icon: "house-door",
      protected: false,
    },
  },
];

export const auth_routes: RouteRecordRaw[] = [
  {
    name: "VSignIn",
    path: "/auth/sign-in",
    component: () => import("../views/auth/VSignIn.vue"),
    meta: {
      name: "Авторизация",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VSignUp",
    path: "/auth/sign-up",
    component: () => import("../views/auth/VSignUp.vue"),
    meta: {
      name: "Регистрация",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VChangePassword",
    path: "/auth/change-password",
    component: () => import("../views/auth/VChangePassword.vue"),
    meta: {
      name: "Восстановление",
      icon: "person",
      protected: false,
    },
  },
];

export const user_nav_routers: RouteRecordRaw[] = [
  {
    name: "VBookList",
    path: "/translations/books",
    props: true,
    component: () => import("../views/translations/books/VList.vue"),
    meta: {
      name: "Мои переводы",
      icon: "book",
      protected: true,
    },
  },
];

export const translation_routers: RouteRecordRaw[] = [
  {
    name: "VBookNew",
    path: "/translations/books/new",
    props: true,
    component: () => import("../views/translations/books/VNew.vue"),
    meta: {
      name: "Новый перевод",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VBookEdit",
    path: "/translations/books/:id",
    props: true,
    component: () => import("../views/translations/books/VEdit.vue"),
    meta: {
      name: "Редактировать перевод",
      icon: "book",
      protected: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...auth_routes,
    ...dashboard_routes,
    ...user_nav_routers,
    ...translation_routers,
  ],
});

export default router;
