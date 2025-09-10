<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/useApi";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { setAuthToken } from "@/lib/auth";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const route = useRoute();
const { $post } = useApi();
const { loginWithOAuth } = useAuth();
const toast = useToast();

const loading = ref(false);

const formData = ref({
  username_or_email: "",
  password: "",
});

const errorMessage = ref("");

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  errorMessage.value = "";

  try {
    loading.value = true;
    const response = await $post("/auth/login", formData.value);

    if (response.success) {
      // Store tokens in cookies (using auth.js function)
      setAuthToken(response.access, response.refresh);

      // Also store in localStorage for useApi compatibility
      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);

      // Show success toast
      toast.success("Successfully logged into the system.", {
        position: "top-right",
        duration: 2000,
      });

      // Get redirect path from query parameter or default to dashboard
      const redirectPath = (route.query.redirect as string) || "/dashboard";

      // Navigate to the redirect path
      router.push(redirectPath);
    } else {
      errorMessage.value = response.error || "Login failed";
    }
  } catch (error: any) {
    console.error("Login error:", error);
    errorMessage.value = "An error occurred during login";
  } finally {
    loading.value = false;
  }
};

// Check if user is already authenticated and redirect if needed
onMounted(() => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    const redirectPath = (route.query.redirect as string) || "/dashboard";
    router.push(redirectPath);
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Card class="mx-auto min-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Welcome to Toolbar AI
        </CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="handleSubmit" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username_or_email">Email or Username</Label>
            <Input
              id="username_or_email"
              v-model="formData.username_or_email"
              type="text"
              placeholder="Enter your email or username"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input
              v-model="formData.password"
              placeholder="Enter your password"
              id="password"
              type="password"
              required
            />
          </div>

          <Button
            type="submit"
            class="w-full"
            :disabled="loading"
            :loading="loading"
          >
            Login
          </Button>

          <Button
            variant="outline"
            class="w-full"
            type="button"
            @click="loginWithOAuth"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1712 8.36792H17.5V8.33333H10V11.6667H14.7096C14.0225 13.6071 12.1763 15 10 15C7.23875 15 5 12.7612 5 10C5 7.23875 7.23875 5 10 5C11.2746 5 12.4342 5.48083 13.3171 6.26625L15.6742 3.90917C14.1858 2.52208 12.195 1.66667 10 1.66667C5.39792 1.66667 1.66667 5.39792 1.66667 10C1.66667 14.6021 5.39792 18.3333 10 18.3333C14.6021 18.3333 18.3333 14.6021 18.3333 10C18.3333 9.44125 18.2758 8.89583 18.1712 8.36792Z"
                fill="#FFC107"
              ></path>
              <path
                d="M2.62695 6.12125L5.36487 8.12917C6.1057 6.295 7.89987 5 9.99942 5C11.274 5 12.4336 5.48083 13.3165 6.26625L15.6736 3.90917C14.1853 2.52208 12.1944 1.66667 9.99942 1.66667C6.79862 1.66667 4.02278 3.47375 2.62695 6.12125Z"
                fill="#FF3D00"
              ></path>
              <path
                d="M10.0002 18.3336C12.1527 18.3336 14.1085 17.5098 15.5873 16.1703L13.0081 13.9877C12.1433 14.6454 11.0866 15.0012 10.0002 15.0003C7.83263 15.0003 5.99222 13.6182 5.29888 11.6894L2.58138 13.7832C3.96055 16.4819 6.76138 18.3336 10.0002 18.3336Z"
                fill="#4CAF50"
              ></path>
              <path
                d="M18.1712 8.36792H17.5V8.33333H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1667 18.3333 10C18.3333 9.44125 18.2758 8.89583 18.1712 8.36792Z"
                fill="#1976D2"
              ></path>
            </svg>
            <span>Login with Google</span>
          </Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline"> Sign up </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
