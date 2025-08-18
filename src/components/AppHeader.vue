<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { SidebarTrigger } from "@/components/ui/sidebar";

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

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <button
            @click="navigateTo('/')"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/' }"
          >
            Home
          </button>
          <button
            @click="navigateTo('/about')"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/about' }"
          >
            About
          </button>
          <button
            @click="navigateTo('/contact')"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === '/contact' }"
          >
            Contact
          </button>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
          <button
            @click="navigateTo('/contact')"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Get Started
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-blue-600 p-2"
            aria-label="Toggle mobile menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 bg-white"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            @click="navigateTo('/')"
            class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/' }"
          >
            Home
          </button>
          <button
            @click="navigateTo('/about')"
            class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/about' }"
          >
            About
          </button>
          <button
            @click="navigateTo('/contact')"
            class="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === '/contact' }"
          >
            Contact
          </button>
          <div class="pt-4">
            <button
              @click="navigateTo('/contact')"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
