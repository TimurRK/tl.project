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
    name: "VUserProfile",
    path: "/community/:login",
    props: true,
    component: () => import("../views/community/VUserProfile.vue"),
    meta: {
      name: "routers.community.profile",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VUserBookList",
    path: "/community/:login/bookmarks",
    props: true,
    component: () => import("../views/community/VUserBookmark.vue"),
    meta: {
      name: "routers.community.bookmarks",
      icon: "person",
      protected: false,
    },
  },
];

export const user_translation_nav_routers: RouteRecordRaw[] = [
  {
    name: "VTranslationBookList",
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
    name: "VTranslationBookNew",
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
    name: "VTranslationBookEdit",
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
    name: "VTranslationSectionEdit",
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
    name: "VTranslationItemTextNew",
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
    name: "VTranslationItemItemTextVersionEdit",
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

export const book_routers: RouteRecordRaw[] = [
  {
    name: "VBook",
    path: "/books/:book_id",
    props: true,
    component: () => import("../views/books/VBook.vue"),
    meta: {
      name: "routers.books.self",
      icon: "book",
      protected: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 250);
    });
  },
  routes: [
    ...auth_routes,
    ...dashboard_routes,
    ...user_nav_routers,
    ...user_translation_nav_routers,
    ...translation_routers,
    ...book_routers,
  ],
});

export default router;
