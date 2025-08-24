import { computed, ref } from "vue";
import router from "@/router";

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
  //   const { $post } = useApi();

  //   const token = useCookie("access_token", { secure: true, httpOnly: true });
  const isAuthenticated = computed(() => !!user.value || !!token.value);

  const googleClientId =
    "184942330142-v8r4lrq2h2a03oreg5164le9ail9br7a.apps.googleusercontent.com";
  const googleRedirectUri = "http://localhost:5173/auth/callback";

  const loginWithOAuth = () => {
    const scope = "email profile openid";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=token&scope=${scope}&include_granted_scopes=true`;
    window.location.href = authUrl;
  };

  const handleOAuthCallback = async (): Promise<void> => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (isAuthenticated.value) {
      router.push("/");
      return;
    }

    if (accessToken) {
      try {
        const res = await $post("api/v1/auth/google/", {
          body: { access_token: accessToken },
        });
        // authStore.setToken(res);
        router.push("/");
        // showToast(getToastMessages("loggedIn"), "success");
      } catch (err: any) {
        showToast(err._data.error, "error");
        router.push("/auth/login");
      }
    } else {
      // showToast(getToastMessages("oauthFailed"), "error");
      router.push("/auth/login");
    }
  };

  return {
    user,
    isAuthenticated,
    loginWithOAuth,
    handleOAuthCallback,
  };
};
