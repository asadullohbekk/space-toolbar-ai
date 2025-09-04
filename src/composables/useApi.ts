import { ref, computed } from "vue";
import { clearAuthToken, shouldRefreshTokens, refreshTokens } from "@/lib/auth";

export const useApi = (apiUrl?: string) => {
  const baseURL = apiUrl || "https://backend.toolbar-ai.com/api";

  const loading = ref(false);

  // Get tokens from localStorage
  const getAccessToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");

  const token = computed(() => getAccessToken());

  const headers = computed(() => {
    const baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token.value) {
      return {
        ...baseHeaders,
        Authorization: `Bearer ${token.value}`,
      };
    }

    return baseHeaders;
  });

  // Store tokens in localStorage
  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  };

  // Clear tokens
  const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API endpoint if needed
      // await $post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // Clear all tokens (both localStorage and cookies)
      clearAuthToken();

      // Redirect to login page
      window.location.href = "/auth/login";
    }
  };

  // Get user profile function
  const getUserProfile = async () => {
    try {
      const response = await $get("/auth/me/");

      // Extract user data - check both possible structures
      let userData;
      if (response.user) {
        // OAuth response structure
        userData = response.user;
      } else if (response.result) {
        // Legacy response structure
        userData = response.result;
      } else {
        // Direct response structure
        userData = response;
      }

      return userData;
    } catch (error) {
      console.error("Failed to get user profile:", error);
      throw error;
    }
  };

  async function $fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${baseURL}${endpoint}`;

    // Check if tokens need refreshing before making the request
    if (shouldRefreshTokens()) {
      const refreshed = await refreshTokens();
      if (!refreshed) {
        console.warn("Failed to refresh tokens, proceeding with current token");
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers.value,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  function $get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const response = await $fetch(endpoint, { ...options, method: "GET" });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  }

  function $post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const response = await $fetch(endpoint, {
          ...options,
          method: "POST",
          body: data ? JSON.stringify(data) : undefined,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  }

  function $put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const response = await $fetch(endpoint, {
          ...options,
          method: "PUT",
          body: data ? JSON.stringify(data) : undefined,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  }

  function $patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const response = await $fetch(endpoint, {
          ...options,
          method: "PATCH",
          body: data ? JSON.stringify(data) : undefined,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  }

  function $delete<T = any>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const response = await $fetch(endpoint, {
          ...options,
          method: "DELETE",
        });
        resolve(response);
      } catch (error) {
        reject(error);
      } finally {
        loading.value = false;
      }
    });
  }

  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
    setTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
    logout,
    getUserProfile,
  };
};
