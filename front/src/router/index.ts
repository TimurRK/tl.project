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
      name: "routers.dashboard",
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
      name: "routers.auth.sign_in",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VSignUp",
    path: "/auth/sign-up",
    component: () => import("../views/auth/VSignUp.vue"),
    meta: {
      name: "routers.auth.sign_up",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VChangePassword",
    path: "/auth/change-password",
    component: () => import("../views/auth/VChangePassword.vue"),
    meta: {
      name: "routers.auth.change_password",
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
      name: "routers.translations.self",
      icon: "book",
      protected: true,
    },
  },
];

export const translation_routers: RouteRecordRaw[] = [
  {
    name: "VBookNew",
    path: "/translations/new",
    props: true,
    component: () => import("../views/translations/books/VNew.vue"),
    meta: {
      name: "routers.translations.new",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VBookEdit",
    path: "/translations/books/:book_id",
    props: true,
    component: () => import("../views/translations/books/VEdit.vue"),
    meta: {
      name: "routers.translations.edit",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VSectionEdit",
    path: "/translations/books/:book_id/sections/:section_id",
    props: true,
    component: () => import("../views/translations/sections/VEdit.vue"),
    meta: {
      name: "routers.translations.edit",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VItemTextEdit",
    path: "/translations/books/:book_id/sections/:section_id/items/:item_id",
    props: true,
    component: () => import("../views/translations/items/texts/VEdit.vue"),
    meta: {
      name: "routers.translations.edit",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VItemTextNew",
    path: "/translations/books/:book_id/sections/:section_id/items/:item_id/new",
    props: true,
    component: () => import("../views/translations/items/texts/VNew.vue"),
    meta: {
      name: "routers.translations.edit",
      icon: "book",
      protected: true,
    },
  },
  {
    name: "VItemTextEdit",
    path: "/translations/books/:book_id/sections/:section_id/items/:item_id/versions/:item_version_id",
    props: true,
    component: () => import("../views/translations/items/texts/VEdit.vue"),
    meta: {
      name: "routers.translations.edit",
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
