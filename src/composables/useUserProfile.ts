import { ref, readonly, onMounted, onUnmounted } from "vue";
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
let globalRefreshListeners: Array<() => void> = [];

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

  const fetchUserProfile = async (forceRefresh = false) => {
    // If already loading and not forcing refresh, return current promise
    if (loading.value && !forceRefresh) {
      return user.value;
    }

    loading.value = true;
    error.value = null;
    
    try {
      console.log("fetchUserProfile: Starting to fetch profile...", forceRefresh ? "(forced refresh)" : "");
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

  // Handle page refresh and visibility change events
  const handlePageRefresh = async () => {
    console.log("useUserProfile: Page refresh detected, refreshing user profile...");
    try {
      await fetchUserProfile(true); // Force refresh
    } catch (error) {
      console.error("useUserProfile: Failed to refresh profile on page refresh:", error);
    }
  };

  const handleVisibilityChange = async () => {
    if (!document.hidden && !user.value) {
      console.log("useUserProfile: Page became visible and no user data, fetching profile...");
      try {
        await fetchUserProfile(true); // Force refresh
      } catch (error) {
        console.error("useUserProfile: Failed to fetch profile on visibility change:", error);
      }
    }
  };

  // Listen for logout events to clear user profile
  const handleLogout = () => {
    clearUserProfile();
  };

  // Add event listeners
  if (typeof window !== 'undefined') {
    // Page refresh detection
    window.addEventListener('beforeunload', () => {
      // Mark that we're about to refresh
      sessionStorage.setItem('pageRefreshing', 'true');
    });

    // Check if page was refreshed
    const wasRefreshed = sessionStorage.getItem('pageRefreshing');
    if (wasRefreshed) {
      sessionStorage.removeItem('pageRefreshing');
      // Small delay to ensure everything is loaded
      setTimeout(handlePageRefresh, 100);
    }

    // Visibility change events
    window.addEventListener('focus', handleVisibilityChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Logout events
    window.addEventListener('userLogout', handleLogout);

    // Custom refresh event for installation page
    window.addEventListener('refreshUserProfile', handlePageRefresh);
  }

  // Cleanup function to remove event listeners
  const cleanup = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('userLogout', handleLogout);
      window.removeEventListener('refreshUserProfile', handlePageRefresh);
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
    
    // Utility functions
    refreshProfile: () => fetchUserProfile(true),
  };
}
