import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";
import About from "@/pages/about.vue";
import Contact from "@/pages/contact.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import Dashboard from "@/pages/dashboard/index.vue";
import { isAuthenticated } from "@/lib/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta && to.meta.public) {
    // If already logged in, redirect away from auth pages
    if (isAuthenticated()) {
      return { path: "/dashboard" };
    }
    return true;
  }
  if (to.meta && to.meta.requiresAuth && !isAuthenticated()) {
    return { path: "/login", query: { redirect: to.fullPath } };
  }
  return true;
});

export default router;
