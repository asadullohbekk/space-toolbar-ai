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
				<CardTitle class="text-xl"> Reset password </CardTitle>
				<CardDescription> We will email you a reset link </CardDescription>
			</CardHeader>
			<CardContent>
				<form @submit.prevent>
					<div class="grid gap-4">
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" required />
						</div>
						<Button type="submit" class="w-full"> Send reset link </Button>
						<div class="text-center text-sm">
							Remembered your password?
							<RouterLink class="underline underline-offset-4" to="/login"> Login </RouterLink>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	</AuthLayout>
</template>


