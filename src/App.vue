<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const route = useRoute();
const isAuthLayout = computed(() => route.meta && route.meta.layout === "auth");
</script>

<template>
  <div class="min-h-screen bg-gray-50 w-full">
    <template v-if="isAuthLayout">
      <RouterView />
    </template>
    <template v-else>
      <SidebarProvider>
        <div class="flex w-full">
          <AppSidebar />
          <div class="flex-1 flex flex-col">
            <AppHeader />
            <main class="flex-1 p-4 pt-6">
              <RouterView />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </template>
  </div>
</template>
