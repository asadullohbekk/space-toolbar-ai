/**
 * Utility functions for triggering user profile refresh
 * This can be used from external sources like installation pages
 */

/**
 * Triggers a user profile refresh by dispatching a custom event
 * This is useful when coming from installation pages or external sources
 */
export const triggerProfileRefresh = () => {
  console.log("profileRefresh: Triggering user profile refresh...");
  window.dispatchEvent(new CustomEvent('refreshUserProfile'));
};

/**
 * Redirects to dashboard with installation flag to trigger profile refresh
 * @param baseUrl - Base URL for the dashboard (defaults to current origin)
 */
export const redirectToDashboardWithRefresh = (baseUrl?: string) => {
  const url = baseUrl || window.location.origin;
  const dashboardUrl = `${url}/dashboard?from=installation&refresh=profile`;
  console.log("profileRefresh: Redirecting to dashboard with refresh flag:", dashboardUrl);
  window.location.href = dashboardUrl;
};

/**
 * Checks if current page was accessed from installation
 */
export const isFromInstallation = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('from') === 'installation';
};

/**
 * Removes installation parameters from URL without refreshing
 */
export const cleanInstallationParams = () => {
  if (isFromInstallation()) {
    const url = new URL(window.location.href);
    url.searchParams.delete('from');
    url.searchParams.delete('refresh');
    window.history.replaceState({}, '', url.toString());
    console.log("profileRefresh: Cleaned installation parameters from URL");
  }
};

/**
 * Sets up automatic profile refresh for installation scenarios
 * Call this from installation pages or after successful installations
 */
export const setupInstallationRefresh = () => {
  // Trigger immediate refresh
  triggerProfileRefresh();
  
  // Clean URL parameters after a delay
  setTimeout(cleanInstallationParams, 2000);
};
