<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <Loader class="animate-spin text-blue-500 mb-4" size="50" />
    <p class="text-gray-600">Processing OAuth callback...</p>
  </div>
</template>

<script setup>
import { Loader } from "lucide-vue-next";
import { useAuth } from "@/composables/useAuth";
import { onMounted } from "vue";

const { handleOAuthCallback } = useAuth();

onMounted(async () => {
  await handleOAuthCallback();
});
</script>
