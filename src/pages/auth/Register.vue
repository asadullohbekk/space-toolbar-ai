<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>

<template>
	<AuthLayout>
		<Card>
			<CardHeader class="text-center">
				<CardTitle class="text-xl"> Create account </CardTitle>
				<CardDescription> Register with your email </CardDescription>
			</CardHeader>
			<CardContent>
				<form @submit.prevent>
					<div class="grid gap-4">
						<div class="grid gap-2">
							<Label for="name">Name</Label>
							<Input id="name" type="text" placeholder="John Doe" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</div>
						<div class="grid gap-2">
							<Label for="password">Password</Label>
							<Input id="password" type="password" required />
						</div>
						<Button type="submit" class="w-full"> Sign up </Button>
						<div class="text-center text-sm">
							Already have an account?
							<RouterLink class="underline underline-offset-4" to="/auth/login"> Login </RouterLink>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	</AuthLayout>
</template>


