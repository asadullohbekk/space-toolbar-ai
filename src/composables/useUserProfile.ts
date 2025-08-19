import { ref, readonly } from "vue";
import { useApi } from "./useApi";

interface UserProfile {
  username: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  is_active: boolean;
  voice_status: boolean;
  balance: string;
}

// Global state - singleton pattern
let globalUser: ReturnType<typeof ref<UserProfile | null>> | null = null;
let globalLoading: ReturnType<typeof ref<boolean>> | null = null;
let globalError: ReturnType<typeof ref<string | null>> | null = null;

export function useUserProfile() {
  // Initialize global state if it doesn't exist
  if (!globalUser) {
    globalUser = ref<UserProfile | null>(null);
    globalLoading = ref(false);
    globalError = ref<string | null>(null);
  }

  const { getUserProfile } = useApi();
  
  const user = globalUser!;
  const loading = globalLoading!;
  const error = globalError!;

  const fetchUserProfile = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      console.log("fetchUserProfile: Starting to fetch profile...");
      const profile = await getUserProfile();
      console.log("fetchUserProfile: Received profile:", profile);
      console.log("fetchUserProfile: Profile type:", typeof profile);
      console.log("fetchUserProfile: Profile keys:", Object.keys(profile || {}));
      console.log("fetchUserProfile: Profile.username:", profile?.username);
      console.log("fetchUserProfile: Profile.email:", profile?.email);
      console.log("fetchUserProfile: Profile.balance:", profile?.balance);
      
      user.value = profile;
      console.log("fetchUserProfile: Set user.value to:", user.value);
      console.log("fetchUserProfile: user.value.username:", user.value?.username);
      console.log("fetchUserProfile: user.value.email:", user.value?.email);
      console.log("fetchUserProfile: user.value.balance:", user.value?.balance);
      
      return profile;
    } catch (err: any) {
      console.error("fetchUserProfile: Error occurred:", err);
      error.value = err.message || "Failed to fetch user profile";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearUserProfile = () => {
    user.value = null;
    error.value = null;
  };

  // Listen for logout events to clear user profile
  const handleLogout = () => {
    clearUserProfile();
  };

  // Add event listener for logout
  if (typeof window !== 'undefined') {
    window.addEventListener('userLogout', handleLogout);
  }

  // Cleanup function to remove event listener
  const cleanup = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('userLogout', handleLogout);
    }
  };

  return {
    // State
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    
    // Actions
    fetchUserProfile,
    clearUserProfile,
    cleanup,
  };
}
