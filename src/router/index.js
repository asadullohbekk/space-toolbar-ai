import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";
import About from "@/pages/about.vue";
import Contact from "@/pages/contact.vue";
import Login from "@/pages/auth/Login.vue";
import Register from "@/pages/auth/Register.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import Dashboard from "@/pages/dashboard/index.vue";
import FaceRecognition from "@/pages/face-recognition.vue";
import Chatbot from "@/pages/chatbot.vue";
import TestInstallation from "@/pages/test-installation.vue";
import { isAuthenticated } from "@/lib/auth";
import Callback from "@/pages/auth/Callback.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/auth/callback",
    name: "Callback",
    component: Callback,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: Register,
    meta: { public: true, layout: "auth" },
  },
  {
    path: "/auth/reset-password",
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
  {
    path: "/face-recognition",
    name: "FaceRecognition",
    component: FaceRecognition,
    meta: { requiresAuth: true },
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    component: Chatbot,
    meta: { requiresAuth: true },
  },
  {
    path: "/test-installation",
    name: "TestInstallation",
    component: TestInstallation,
    meta: { requiresAuth: true },
  },
  // Catch-all route for non-existent URLs
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: (to) => {
      // Check if user is authenticated
      if (isAuthenticated()) {
        // If authenticated, redirect to dashboard
        return { path: "/dashboard" };
      } else {
        // If not authenticated, redirect to login with the attempted path
        return { path: "/auth/login" };
      }
    },
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
    return { path: "/auth/login" };
  }
  return true;
});

export default router;
