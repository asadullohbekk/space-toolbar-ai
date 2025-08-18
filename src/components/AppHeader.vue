<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserProfile from "@/components/UserProfile.vue";

const router = useRouter();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
  closeMobileMenu();
};
</script>

<template>
  <header
    class="bg-white border-b border-gray-200 shadow-sm w-full sticky top-0 z-50"
  >
    <div class="w-full px-4 sm:px-6 lg:px-4">
      <div class="flex justify-between items-center h-16">
        <SidebarTrigger class="!text-3xl w-10 h-10 cursor-pointer" />
        <!-- Logo/Brand -->
        <!-- <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1
              class="text-xl font-bold text-blue-600 cursor-pointer"
              @click="navigateTo('/')"
            >
              CompanyName
            </h1>
          </div>
        </div> -->

        <!-- CTA Button -->
        <!-- <div class="hidden md:flex items-center">
          <button
            @click="navigateTo('/contact')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Get Started
          </button>
        </div> -->

        <!-- Mobile menu button -->
        <UserProfile />
      </div>
    </div>
  </header>
</template>
