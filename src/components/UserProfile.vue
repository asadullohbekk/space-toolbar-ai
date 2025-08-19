<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="relative h-10 w-10 rounded-full cursor-pointer"
        :disabled="userLoading"
      >
        <Avatar class="h-10 w-10">
          <AvatarFallback>
            <span v-if="userLoading" class="text-xs">...</span>
            <span v-else>{{ userInitials }}</span>
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-80" align="end" :side-offset="4">
      <!-- Loading State -->
      <div v-if="userLoading" class="p-4 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"
        ></div>
        <p class="text-sm text-gray-500">Loading user profile...</p>
      </div>

      <!-- User Info Section -->
      <div v-else class="flex items-center space-x-3 p-4 border-b mb-1">
        <Avatar class="h-12 w-12">
          <AvatarFallback>{{ userInitials }}</AvatarFallback>
        </Avatar>
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">{{ displayName }}</p>
          <p class="text-xs text-muted-foreground">
            {{ user?.email || "No email" }}
          </p>
          <p class="text-xs text-muted-foreground">
            @{{ user?.username || "no-username" }}
          </p>
          <p v-if="user?.phone" class="text-xs text-muted-foreground">
            {{ user.phone }}
          </p>
        </div>
      </div>

      <!-- Balance Section -->
      <div v-if="!userLoading" class="px-4 py-3 border-b mb-1 bg-gray-50/50">
        <div class="flex items-center space-x-2">
          <Wallet class="h-4 w-4 text-green-600" />
          <span class="text-sm font-medium text-gray-900">Balance:</span>
          <span class="text-sm font-bold text-green-600">
            {{ user?.balance ? `${user.balance}` : "$0.00" }} Sum
          </span>
        </div>
        <div class="mt-1 text-xs text-gray-500">
          Status:
          <span :class="user?.is_active ? 'text-green-600' : 'text-red-600'">
            {{ user?.is_active ? "Active" : "Inactive" }}
          </span>
        </div>
      </div>

      <!-- Profile Actions -->
      <DropdownMenuGroup v-if="!userLoading">
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
        <span>{{ loading ? "Logging out..." : "Log out" }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit, LogOut, Wallet } from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import { useUserProfile } from "@/composables/useUserProfile";
import { useToast } from "vue-toast-notification";

const { logout, loading } = useApi();
const { user, loading: userLoading } = useUserProfile();
const toast = useToast();

// Helper function to get user initials
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Computed properties for user display
const displayName = computed(() => {
  console.log("displayName computed - user.value:", user.value);
  const name = user.value?.full_name || user.value?.username || "User";
  console.log("displayName computed - result:", name);
  return name;
});

const userInitials = computed(() => {
  console.log("userInitials computed - displayName.value:", displayName.value);
  const initials = getInitials(displayName.value);
  console.log("userInitials computed - result:", initials);
  return initials;
});

// Watch for user data changes
watch(
  user,
  (newUser, oldUser) => {
    console.log("UserProfile: user changed from", oldUser, "to", newUser);
    if (newUser) {
      console.log("UserProfile: newUser.username:", newUser.username);
      console.log("UserProfile: newUser.email:", newUser.email);
      console.log("UserProfile: newUser.balance:", newUser.balance);
      console.log("UserProfile: newUser.full_name:", newUser.full_name);
    }
  },
  { immediate: true }
);

// Also log the current user value when component mounts
console.log("UserProfile: Component mounted, current user.value:", user.value);
console.log(
  "UserProfile: Component mounted, current user.value?.username:",
  user.value?.username
);
console.log(
  "UserProfile: Component mounted, current user.value?.email:",
  user.value?.email
);
console.log(
  "UserProfile: Component mounted, current user.value?.balance:",
  user.value?.balance
);

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
    console.error("Logout failed:", err);
    toast.error("Logout failed, but you have been signed out locally", {
      position: "top-right",
      duration: 3000,
    });
  }
};
</script>
