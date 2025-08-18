<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="relative h-10 w-10 rounded-full cursor-pointer"
      >
        <Avatar class="h-10 w-10">
          <AvatarImage :src="user.avatar" :alt="user.name" />
          <AvatarFallback>{{ getInitials(user.name) }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-80" align="end" :side-offset="4">
      <!-- User Info Section -->
      <div class="flex items-center space-x-3 p-4 border-b mb-1">
        <Avatar class="h-12 w-12">
          <AvatarImage :src="user.avatar" :alt="user.name" />
          <AvatarFallback>{{ getInitials(user.name) }}</AvatarFallback>
        </Avatar>
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">{{ user.name }}</p>
          <p class="text-xs text-muted-foreground">{{ user.email }}</p>
          <p class="text-xs text-muted-foreground">@{{ user.username }}</p>
        </div>
      </div>

      <!-- Profile Actions -->
      <DropdownMenuGroup>
        <DropdownMenuItem @click="viewProfile" class="cursor-pointer">
          <User class="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem @click="editProfile" class="cursor-pointer">
          <Edit class="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <!-- Logout -->
      <DropdownMenuItem
        @click="handleLogout"
        class="cursor-pointer text-red-600 focus:text-red-600"
        :disabled="loading"
      >
        <LogOut class="mr-2 h-4 w-4" />
        <span>{{ loading ? 'Logging out...' : 'Log out' }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, LogOut } from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import { useToast } from "vue-toast-notification";

const { logout, loading } = useApi();
const toast = useToast();

// User data (in real app, this would come from a store or API)
const user = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: "/placeholder.svg?height=40&width=40",
});

// Helper function to get user initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Action handlers
const viewProfile = () => {
  console.log("[v0] Viewing profile");
  // Navigate to profile page
};

const editProfile = () => {
  console.log("[v0] Editing profile");
  // Open edit profile modal or navigate to edit page
};

const handleLogout = async () => {
  try {
    await logout();
    toast.success("Successfully logged out", {
      position: "top-right",
      duration: 2000,
    });
  } catch (err) {
    console.error('Logout failed:', err);
    toast.error("Logout failed, but you have been signed out locally", {
      position: "top-right",
      duration: 3000,
    });
  }
};
</script>
