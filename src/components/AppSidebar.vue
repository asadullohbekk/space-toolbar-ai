<script setup lang="ts">
import { Eye, MessageCircle, ChevronRight, Home, Brain, Bot } from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

// Collapsible groups and sub-items.
const items = [
  {
    title: "Models",
    icon: Brain,
    items: [{ title: "Face recognition", url: "/face-recognition", icon: Eye }],
  },
  {
    title: "Agents",
    icon: Bot,
    items: [{ title: "Chatbot", url: "/chatbot", icon: MessageCircle }],
  },
];

// Check if a menu item is active
const isActive = (url: string) => {
  if (url === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(url);
};

const isGroupActive = (group: { items: Array<{ url: string }> }) => {
  return group.items.some((sub) => isActive(sub.url));
};
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Services</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild :tooltip="'Dashboard'" :is-active="isActive('/')" class="cursor-pointer">
                <RouterLink to="/">
                  <Home />
                  <span>Dashboard</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Collapsible
              v-for="item in items"
              :key="item.title"
              as-child
              :default-open="isGroupActive(item)"
              class="group/collapsible cursor-pointer"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title" class="cursor-pointer">
                    <component :is="item.icon" v-if="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child :is-active="isActive(subItem.url)">
                        <RouterLink :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </RouterLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
