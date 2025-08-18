import { ref, readonly } from "vue";
import { setAuthToken, clearAuthToken } from "@/lib/auth";
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
      const token =
        localStorage.getItem("access_token") ||
        document.cookie.match(/access_token=([^;]+)/)?.[1];
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, config);

      // Handle HTTP errors
      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          clearAuthToken();
          router.push("/login");
          throw new Error("Authentication expired. Please login again.");
        }

        // Handle other HTTP errors
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      return {
        data,
        message: data.message,
        success: true,
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
    email_or_username: string;
    password: string;
  }) => {
    try {
      const response = await post<{ token: string; user: any }>(
        "/api/auth/login",
        credentials
      );

      if (response.success && response.data.token) {
        setAuthToken(response.data.token);
        return response.data;
      }

      throw new Error("Login failed: No token received");
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await post("/api/auth/logout");
    } catch (err) {
      // Even if logout API fails, clear local auth
      console.warn("Logout API failed, clearing local auth:", err);
    } finally {
      clearAuthToken();
      router.push("/login");
    }
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
    logout,

    // Utility
    clearError: () => (error.value = null),
  };
}
