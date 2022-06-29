import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const auth_routes: RouteRecordRaw[] = [
  {
    name: "VSignIn",
    path: "/auth/sign-in",
    component: () => import("../views/auth/SignIn.vue"),
    meta: {
      name: 'Пользователь',
      icon: 'person'
    }
  },
  {
    name: "VSignUp",
    path: "/auth/sign-up",
    component: () => import("../views/auth/SignUp.vue"),
    meta: {
      name: 'Пользователь',
      icon: 'person'
    }
  },
  {
    name: "VChangePassword",
    path: "/auth/change-password",
    component: () => import("../views/auth/ChangePassword.vue"),
    meta: {
      name: 'Пользователь',
      icon: 'person'
    }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...auth_routes],
});

export default router;
