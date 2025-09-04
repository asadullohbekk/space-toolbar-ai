export function setAuthToken(accessToken, refreshToken) {
  const accessCookieValue = encodeURIComponent(accessToken);
  const refreshCookieValue = encodeURIComponent(refreshToken);

  // Calculate expiration dates
  const accessExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const refreshExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  try {
    // Determine if we should use secure flag (only for HTTPS)
    const isSecure = window.location.protocol === "https:";
    const secureFlag = isSecure ? "; secure" : "";

    // Set access token cookie with expiration
    document.cookie = `access_token=${accessCookieValue}; path=/; samesite=strict; expires=${accessExpiry.toUTCString()}${secureFlag}`;

    // Set refresh token cookie with expiration
    document.cookie = `refresh_token=${refreshCookieValue}; path=/; samesite=strict; expires=${refreshExpiry.toUTCString()}${secureFlag}`;
  } catch (error) {
    console.error("Failed to set cookies:", error);
  }

  // Also store in localStorage for compatibility with useApi
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function setAccessToken(token) {
  const cookieValue = encodeURIComponent(token);
  document.cookie = `access_token=${cookieValue}; path=/; secure; samesite=strict`;
}

export function setRefreshToken(token) {
  const cookieValue = encodeURIComponent(token);
  document.cookie = `refresh_token=${cookieValue}; path=/; secure; samesite=strict`;
}

export function getAuthToken() {
  return getAccessToken();
}

export function getAccessToken() {
  const name = "access_token=";
  const decodedCookie = decodeURIComponent(document.cookie || "");
  const parts = decodedCookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(name)) {
      return part.substring(name.length);
    }
  }
  return null;
}

export function getRefreshToken() {
  const name = "refresh_token=";
  const decodedCookie = decodeURIComponent(document.cookie || "");
  const parts = decodedCookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(name)) {
      return part.substring(name.length);
    }
  }
  return null;
}

export function clearAuthToken() {
  // Clear access token
  document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  // Clear refresh token
  document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

  // Also clear localStorage tokens
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function isAuthenticated() {
  // Check both cookies and localStorage for compatibility
  const cookieToken = getAccessToken();
  const localStorageToken = localStorage.getItem("access_token");

  return Boolean(cookieToken || localStorageToken);
}

export function verifyCookies() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  // Also check localStorage for comparison
  const localStorageAccess = localStorage.getItem("access_token");
  const localStorageRefresh = localStorage.getItem("refresh_token");

  return {
    accessToken: !!accessToken,
    refreshToken: !!refreshToken,
    localStorageAccess: !!localStorageAccess,
    localStorageRefresh: !!localStorageRefresh,
  };
}

// Function to test cookie functionality
export function testCookieFunctionality() {
  // Test setting cookies
  const testAccessToken = "test_access_token_123";
  const testRefreshToken = "test_refresh_token_456";

  setAuthToken(testAccessToken, testRefreshToken);

  // Verify cookies were set
  const verification = verifyCookies();

  // Clean up test cookies
  clearAuthToken();

  return verification;
}

// Function to refresh tokens
export async function refreshTokens() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("No refresh token available");
    return false;
  }

  try {
    // Call your refresh token endpoint
    const response = await fetch(
      "https://backend.toolbar-ai.com/api/v1/auth/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.access) {
        // Update the access token
        setAccessToken(data.access);
        localStorage.setItem("access_token", data.access);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Failed to refresh tokens:", error);
    return false;
  }
}

// Function to check if access token is expired
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error parsing token:", error);
    return true;
  }
}

// Function to check if tokens need refreshing
export function shouldRefreshTokens() {
  const accessToken = getAccessToken();

  if (!accessToken) return true;

  // Check if token expires in the next 5 minutes
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const currentTime = Date.now() / 1000;
    const fiveMinutes = 5 * 60;

    return payload.exp < currentTime + fiveMinutes;
  } catch (error) {
    console.error("Error parsing token:", error);
    return true;
  }
}
