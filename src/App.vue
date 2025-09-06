<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserProfile } from "@/composables/useUserProfile";

const route = useRoute();
const isAuthLayout = computed(() => route.meta && route.meta.layout === "auth");

// Initialize user profile management globally
const { fetchUserProfile } = useUserProfile();

// Handle global page refresh scenarios
onMounted(() => {
  // Check if we're coming from an installation page or need to refresh profile
  const urlParams = new URLSearchParams(window.location.search);
  const fromInstallation = urlParams.get('from') === 'installation';
  const refreshProfile = urlParams.get('refresh') === 'profile';
  
  if (fromInstallation || refreshProfile) {
    console.log("App: Detected installation page refresh, refreshing user profile...");
    setTimeout(() => {
      fetchUserProfile(true); // Force refresh
    }, 500); // Small delay to ensure everything is loaded
  }
});
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
