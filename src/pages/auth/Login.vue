<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
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
import { useApi } from "@/composables/useApi";
import { useToast } from "vue-toast-notification";

const router = useRouter();
const toast = useToast();
const { login, loading, error, clearError } = useApi();

const email = ref("");
const password = ref("");

async function onSubmit() {
  clearError();
  
  if (!email.value || !password.value) {
    toast.error("Please fill in all fields", {
      position: "top-right",
      duration: 3000,
    });
    return;
  }

  try {
    const response = await login({
      email_or_username: email.value,
      password: password.value,
    });
    
    // Show success toast
    toast.success("Login successful! Redirecting to dashboard...", {
      position: "top-right",
      duration: 2000,
    });
    
    // Login successful, redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  } catch (err: any) {
    // Show error toast
    toast.error(err.message || "Login failed. Please try again.", {
      position: "top-right",
      duration: 4000,
    });
  }
}
</script>

<template>
  <AuthLayout>
    <div class="flex flex-col gap-6">
      <Card>
        <CardHeader class="text-center">
          <CardTitle class="text-xl"> Welcome to Toolbar AI </CardTitle>
          <CardDescription> Login with your credentials </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit">
            <div class="grid gap-6">
              <div class="grid gap-2">
                <Label for="email">Email or Username</Label>
                <Input
                  id="email"
                  v-model="email"
                  type="text"
                  placeholder="Enter your email or username"
                  required
                  :disabled="loading"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="password">Password</Label>
                  <RouterLink
                    to="/reset-password"
                    class="ml-auto text-sm underline-offset-4 hover:underline"
                    >Forgot your password?</RouterLink
                  >
                </div>
                <Input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  :disabled="loading"
                />
              </div>
              <Button
                type="submit"
                class="w-full cursor-pointer"
                :disabled="loading"
              >
                <span v-if="loading">Logging in...</span>
                <span v-else>Login</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div class="text-center text-sm">
        Don't have an account?
        <RouterLink to="/register" class="underline underline-offset-4">
          Sign up
        </RouterLink>
      </div>
    </div>
  </AuthLayout>
</template>
