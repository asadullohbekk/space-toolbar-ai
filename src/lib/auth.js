export function setAuthToken(accessToken, refreshToken) {
  const accessCookieValue = encodeURIComponent(accessToken);
  const refreshCookieValue = encodeURIComponent(refreshToken);
  
  // Set access token cookie
  document.cookie = `access_token=${accessCookieValue}; path=/; secure; samesite=strict`;
  
  // Set refresh token cookie
  document.cookie = `refresh_token=${refreshCookieValue}; path=/; secure; samesite=strict`;
  
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


