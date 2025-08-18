export function setAuthToken(token) {
  const cookieValue = encodeURIComponent(token);
  document.cookie = `access_token=${cookieValue}; path=/`;
}

export function getAuthToken() {
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

export function clearAuthToken() {
  document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}


