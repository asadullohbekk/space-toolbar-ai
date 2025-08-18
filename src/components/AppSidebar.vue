<script setup lang="ts">
import { Home, Eye, MessageCircle } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Face Recognition",
    url: "/face-recognition",
    icon: Eye,
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: MessageCircle,
  },
];

// Check if a menu item is active
const isActive = (url: string) => {
  if (url === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(url);
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Services</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton
                asChild
                :class="[
                  'transition-all duration-200',
                  isActive(item.url)
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900',
                ]"
              >
                <RouterLink
                  :to="item.url"
                  :class="[
                    'flex items-center space-x-3 px-3 py-2 rounded-lg w-full',
                    isActive(item.url)
                      ? 'text-blue-700'
                      : 'text-gray-700 hover:text-gray-900',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'w-5 h-5',
                      isActive(item.url)
                        ? 'text-blue-600'
                        : 'text-gray-500 group-hover:text-gray-700',
                    ]"
                  />
                  <span
                    :class="[
                      'font-medium',
                      isActive(item.url)
                        ? 'text-blue-700'
                        : 'text-gray-700 group-hover:text-gray-900',
                    ]"
                  >
                    {{ item.title }}
                  </span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
