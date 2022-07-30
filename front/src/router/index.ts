import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const dashboard_routes: RouteRecordRaw[] = [
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

const auth_routes: RouteRecordRaw[] = [
  {
    name: "VSignIn",
    path: "/auth/sign-in",
    component: () => import("../views/auth/VSignIn.vue"),
    meta: {
      name: "Пользователь",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VSignUp",
    path: "/auth/sign-up",
    component: () => import("../views/auth/VSignUp.vue"),
    meta: {
      name: "Пользователь",
      icon: "person",
      protected: false,
    },
  },
  {
    name: "VChangePassword",
    path: "/auth/change-password",
    component: () => import("../views/auth/VChangePassword.vue"),
    meta: {
      name: "Пользователь",
      icon: "person",
      protected: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...auth_routes, ...dashboard_routes],
});

export default router;
