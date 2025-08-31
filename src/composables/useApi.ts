import { ref, computed } from "vue";
import { clearAuthToken, shouldRefreshTokens, refreshTokens } from "@/lib/auth";

export const useApi = (apiUrl?: string) => {
  const baseURL = apiUrl || "https://space.toolbar-ai.com/api";

  const loading = ref(false);

  // Get tokens from localStorage
  const getAccessToken = () => {
    const token = localStorage.getItem("access_token");
    console.log("useApi: getAccessToken called, token:", token ? token.substring(0, 20) + "..." : "null");
    return token;
  };
  const getRefreshToken = () => {
    const token = localStorage.getItem("refresh_token");
    console.log("useApi: getRefreshToken called, token:", token ? token.substring(0, 20) + "..." : "null");
    return token;
  };

  const token = computed(() => getAccessToken());

  const headers = computed(() => {
    const baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token.value) {
      console.log("useApi: Setting Authorization header with token:", token.value.substring(0, 20) + "...");
      return {
        ...baseHeaders,
        Authorization: `Bearer ${token.value}`,
      };
    } else {
      console.log("useApi: No token available, headers without Authorization");
    }

    return baseHeaders;
  });

  // Store tokens in localStorage
  const setTokens = (access: string, refresh: string) => {
    console.log("useApi: Setting tokens in localStorage");
    console.log("useApi: Access token:", access.substring(0, 20) + "...");
    console.log("useApi: Refresh token:", refresh.substring(0, 20) + "...");
    
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    
    console.log("useApi: Tokens stored in localStorage");
    console.log("useApi: Verification - access token from localStorage:", localStorage.getItem("access_token") ? "Present" : "Missing");
    console.log("useApi: Verification - refresh token from localStorage:", localStorage.getItem("refresh_token") ? "Present" : "Missing");
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
      console.log("getUserProfile: Starting to fetch user profile...");
      console.log("getUserProfile: Current access token:", getAccessToken());
      console.log("getUserProfile: Current refresh token:", getRefreshToken());
      
      // Try multiple possible endpoints
      let response;
      let endpoint;
      
      try {
        endpoint = "/v1/auth/me/";
        console.log("getUserProfile: Trying endpoint:", endpoint);
        response = await $get(endpoint);
      } catch (error) {
        console.log("getUserProfile: First endpoint failed, trying alternative...");
        try {
          endpoint = "/auth/me/";
          console.log("getUserProfile: Trying endpoint:", endpoint);
          response = await $get(endpoint);
        } catch (secondError) {
          console.log("getUserProfile: Second endpoint failed, trying user endpoint...");
          try {
            endpoint = "/v1/user/";
            console.log("getUserProfile: Trying endpoint:", endpoint);
            response = await $get(endpoint);
          } catch (thirdError) {
            console.error("getUserProfile: All endpoints failed:", {
              first: error,
              second: secondError,
              third: thirdError
            });
            throw new Error("Failed to fetch user profile from all endpoints");
          }
        }
      }
      
      console.log("getUserProfile: Successful response from endpoint:", endpoint);
      console.log("getUserProfile: Full API response:", response);

      // Extract user data - check multiple possible structures
      let userData;
      if (response.user) {
        // OAuth response structure
        userData = response.user;
        console.log("getUserProfile: Found user data in response.user");
      } else if (response.result) {
        // Legacy response structure
        userData = response.result;
        console.log("getUserProfile: Found user data in response.result");
      } else if (response.data) {
        // Data wrapper structure
        userData = response.data;
        console.log("getUserProfile: Found user data in response.data");
      } else {
        // Direct response structure
        userData = response;
        console.log("getUserProfile: Using direct response as user data");
      }
      
      console.log("getUserProfile: Final extracted user data:", userData);
      console.log("getUserProfile: User data type:", typeof userData);
      console.log("getUserProfile: User data keys:", Object.keys(userData || {}));

      return userData;
    } catch (error) {
      console.error("getUserProfile: Failed to get user profile:", error);
      console.error("getUserProfile: Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  };

  async function $fetch(endpoint: string, options: RequestInit = {}) {
    const url = `${baseURL}${endpoint}`;
    console.log("$fetch: Making request to:", url);

    // Check if tokens need refreshing before making the request
    if (shouldRefreshTokens()) {
      console.log("$fetch: Tokens need refreshing, attempting to refresh...");
      const refreshed = await refreshTokens();
      if (!refreshed) {
        console.warn("$fetch: Failed to refresh tokens, proceeding with current token");
      }
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...headers.value,
        ...options.headers,
      },
    };

    console.log("$fetch: Request config:", {
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body ? 'Present' : 'None'
    });

    try {
      console.log("$fetch: Sending request...");
      const response = await fetch(url, config);
      console.log("$fetch: Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: response.headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("$fetch: Response not ok. Status:", response.status, "Body:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("$fetch: Response data:", responseData);
      return responseData;
    } catch (error) {
      console.error("$fetch: API request failed:", error);
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

  // Test function to manually test user profile fetch
  const testUserProfileFetch = async () => {
    console.log("=== Testing User Profile Fetch ===");
    console.log("Current tokens:");
    console.log("Access token:", getAccessToken());
    console.log("Refresh token:", getRefreshToken());
    console.log("Headers:", headers.value);
    
    try {
      const profile = await getUserProfile();
      console.log("✅ User profile fetch successful:", profile);
      return profile;
    } catch (error) {
      console.error("❌ User profile fetch failed:", error);
      throw error;
    }
  };

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
    testUserProfileFetch,
  };
};
