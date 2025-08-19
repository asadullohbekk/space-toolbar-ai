import { ref, readonly } from "vue";
import { setAuthToken, clearAuthToken, getAccessToken } from "@/lib/auth";
import { useRouter } from "vue-router";

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiError {
  message: string;
  status?: number;
}

export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "https://space.toolbar-ai.com/";

  // Helper function to handle API errors
  const handleError = (err: any): ApiError => {
    if (err.response) {
      // Server responded with error status
      return {
        message:
          err.response.data?.message ||
          `HTTP ${err.response.status}: ${err.response.statusText}`,
        status: err.response.status,
      };
    } else if (err.request) {
      // Request was made but no response received
      return {
        message: "No response from server. Please check your connection.",
      };
    } else {
      // Something else happened
      return {
        message: err.message || "An unexpected error occurred",
      };
    }
  };

  // Generic request function
  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    loading.value = true;
    error.value = null;

    try {
      const url = `${baseURL.replace(/\/$/, "")}/${endpoint.replace(
        /^\//,
        ""
      )}`;

      const config: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      };

      // Add auth token if available
      const token = getAccessToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);

      // Handle HTTP errors
      if (!response.ok) {
        // Handle 401 Unauthorized - only for expired tokens, not login failures
        if (response.status === 401 && getAccessToken()) {
          // Only clear auth if we have a token (means it's expired)
          clearAuthToken();
          router.push("/login");
          throw new Error("Authentication expired. Please login again.");
        }

        // Handle other HTTP errors including login validation errors
        const errorData = await response.json().catch(() => ({}));
        // Extract error message from backend response format
        const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      return {
        data,
        message: data.message || data.success || "Success",
        success: data.success !== undefined ? data.success : true,
      };
    } catch (err: any) {
      const apiError = handleError(err);
      error.value = apiError.message;

      throw apiError;
    } finally {
      loading.value = false;
    }
  };

  // HTTP method helpers
  const get = <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" });

  const post = <T>(endpoint: string, data?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });

  const put = <T>(endpoint: string, data?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });

  const del = <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" });

  // Auth-specific methods
  const login = async (credentials: {
    username_or_email: string;
    password: string;
  }) => {
    try {
      const response = await post<{ 
        success: string; 
        refresh: string; 
        access: string; 
      }>(
        "/api/auth/login",
        credentials
      );

      if (response.success && response.data.access && response.data.refresh) {
        // Save both access and refresh tokens to cookies
        setAuthToken(response.data.access, response.data.refresh);
        return response.data;
      }

      throw new Error("Login failed: No tokens received");
    } catch (err) {
      throw err;
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await get<{
        message: string;
        result: {
          username: string;
          full_name: string | null;
          email: string;
          phone: string | null;
          is_active: boolean;
          voice_status: boolean;
          balance: string;
        };
      }>("/api/auth/me/");

      console.log("getUserProfile response:", response);
      console.log("response.data:", response.data);
      console.log("response.data.result:", response.data.result);
      
      // The request function wraps the response, so we need to access response.data
      // response.data contains the actual backend response
      return response.data.result;
    } catch (err) {
      console.error("getUserProfile error:", err);
      throw err;
    }
  };

  const logout = async () => {
    // Clear local auth tokens and redirect to login
    clearAuthToken();
    
    // Dispatch logout event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('userLogout'));
    }
    
    router.push("/login");
  };

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),

    // HTTP methods
    request,
    get,
    post,
    put,
    del,

    // Auth methods
    login,
    getUserProfile,
    logout,

    // Utility
    clearError: () => (error.value = null),
  };
}
