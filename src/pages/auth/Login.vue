<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthToken } from "@/lib/auth";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

function onSubmit() {
	error.value = "";
	if (email.value === "admin@gmail.com" && password.value === "12345") {
		setAuthToken("fake-token-123");
		router.push("/dashboard");
	} else {
		error.value = "Invalid email or password";
	}
}
</script>

<template>
	<AuthLayout>
		<div class="flex flex-col gap-6">
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl"> Welcome back </CardTitle>
					<CardDescription> Login with your credentials </CardDescription>
				</CardHeader>
				<CardContent>
					<form @submit.prevent="onSubmit">
						<div class="grid gap-6">
							<div class="grid gap-2">
								<Label for="email">Email</Label>
								<Input id="email" v-model="email" type="email" placeholder="admin@gmail.com" required />
							</div>
							<div class="grid gap-2">
								<div class="flex items-center">
									<Label for="password">Password</Label>
									<RouterLink to="/reset-password" class="ml-auto text-sm underline-offset-4 hover:underline">Forgot your password?</RouterLink>
								</div>
								<Input id="password" v-model="password" type="password" required />
							</div>
							<Button type="submit" class="w-full"> Login </Button>
							<p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
						</div>
					</form>
				</CardContent>
			</Card>
			<div class="text-center text-sm">
				Don't have an account?
				<RouterLink to="/register" class="underline underline-offset-4"> Sign up </RouterLink>
			</div>
		</div>
	</AuthLayout>
</template>
