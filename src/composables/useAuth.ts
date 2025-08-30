import { computed, ref } from "vue";
import router from "@/router";
import { useApi } from "./useApi";
import { isAuthenticated as checkAuth, setAuthToken } from "@/lib/auth";

interface user {
  message: string;
  result: {
    balance: number;
    email: string | null;
    full_name: string;
    is_active: boolean;
    phone: string;
    username: string;
    voice_status: boolean;
  };
}

export const useAuth = () => {
  const user = ref<user | null>(null);
  const { $post, setTokens } = useApi();

  // Use the centralized auth function
  const isAuthenticated = computed(() => checkAuth() || !!user.value);

  const googleClientId =
    "235010568573-94c45tulqla31fbsrpcpl18avkgb91go.apps.googleusercontent.com";
  // const googleRedirectUri = "http://localhost:5173/auth/callback";
  const googleRedirectUri = "https://space.asadullohdev.uz/auth/callback";

  const loginWithOAuth = () => {
    const scope = "email profile openid";
    // Use response_type=code for authorization code flow (more secure)
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=${scope}&include_granted_scopes=true`;
    window.location.href = authUrl;
  };

  const handleOAuthCallback = async (): Promise<void> => {
    // Check if user is already authenticated
    if (isAuthenticated.value) {
      router.push("/");
      return;
    }

    // Get the authorization code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let error = urlParams.get("error");

    // Fallback: check URL hash for OAuth response (some flows use hash)
    if (!code && !error && window.location.hash) {
      console.log("No code in search params, checking hash...");
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      code = code || hashParams.get("code");
      error = error || hashParams.get("error");
      console.log("Hash params - code:", code, "error:", error);
    }

    console.log("OAuth callback - final code:", code, "final error:", error);

    if (error) {
      console.error("OAuth error:", error);
      // Handle OAuth error
      // router.push("/auth/login");
      return;
    }

    if (code) {
      try {
        const res = await $post("/v1/auth/google/", { code: code });

        // Store tokens using both methods for compatibility
        if (res.access_token && res.refresh_token) {
          setTokens(res.access_token, res.refresh_token);
          setAuthToken(res.access_token, res.refresh_token);
        } else {
        }

        // Update user state if user data is returned
        if (res.user) {
          user.value = res.user;
        }

        router.push("/");
      } catch (err: any) {
        console.error("OAuth callback failed:", err);
        // Handle error - redirect to login
        // router.push("/auth/login");
      }
    } else {
      console.error("No authorization code received");
      if (window.location.hash) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
      }
      // No code received, redirect to login
      // router.push("/auth/login");
    }
  };

  return {
    user,
    isAuthenticated,
    loginWithOAuth,
    handleOAuthCallback,
  };
};
