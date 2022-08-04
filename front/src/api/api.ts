import type { App, Plugin } from "vue";
import { inject } from "vue";
import type { Router } from "vue-router";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { stringify } from "qs";
import { print, type DocumentNode } from "graphql";

import type {
  ICurrentUser,
  TUserStore,
  TUserStoreDefinition,
} from "@/stores/current-user";
import { clearCookie, getCookie, setCookie } from "@/helpers/cookie.helper";
import type { ToastInterface } from "vue-toastification";

const api_endpoint = import.meta.env.VITE_APP_API;
const api_key = "api";

export interface IGraphQLError {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  extensions: {
    code: string;
    exception: {
      stacktrace: string[];
    };
  };
}

export interface IAuthResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
}

class ApiService {
  private http_client: AxiosInstance | null = null;

  public current_user_store: TUserStore;

  constructor(
    currentUserStore: TUserStoreDefinition,
    private readonly router: Router,
    private readonly toast: ToastInterface
  ) {
    this.http_client = axios.create({ baseURL: api_endpoint });

    this.current_user_store = currentUserStore();

    this.http_client.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        const { data } = error.response;

        switch (data.error) {
          case "UNAUTHORIZED":
          case "REFRESH_TOKEN_EXPIRED":
            this.toast.error(data.error, {
              timeout: 2500,
            });

            this.signOut();

            return this.router.push({ name: "VSignIn" });
          case "ACCESS_TOKEN_EXPIRED":
            this.toast.error(data.error, {
              timeout: 2500,
            });

            await this.refreshAccessToken();

            return await this.retryReq(error.config);
          case "AUTHORIZATION_FAILED":
            this.toast.error(data.error, {
              timeout: 2500,
            });

            this.signOut();

            break;
        }

        return await Promise.reject(data);
      }
    );
  }

  private async retryReq(config: AxiosRequestConfig) {
    return await this.http_client?.request({
      ...config,
      ...{
        headers: {
          ...this.defaultAuthHeaders(),
        },
      },
    });
  }

  private defaultHeaders() {
    return {
      "Content-Type": "application/json; charset=utf-8",
      ...this.defaultAuthHeaders()
    } as AxiosRequestHeaders;
  }

  private defaultAuthHeaders() {
    const headers: AxiosRequestHeaders = {}

    if (this.current_user_store?.accessToken) {
      headers.Authorization = this.current_user_store.accessToken;
    }

    return headers;
  }

  public async get(url: string) {
    return await this.http_client!.get(url, {
      headers: {
        ...this.defaultHeaders(),
      },
    });
  }

  public async post(url: string, body: Record<string, unknown> | FormData, headers: AxiosRequestHeaders = {}) {
    return await this.http_client!.post(url, body, {
      headers: {
        ...this.defaultHeaders(),
        ...headers,
      },
    });
  }

  public async put(url: string, body: Record<string, unknown>) {
    return await this.http_client!.put(url, body, {
      headers: {
        ...this.defaultHeaders(),
      },
    });
  }

  public async patch(url: string, body: Record<string, unknown>) {
    return await this.http_client!.patch(url, body, {
      headers: {
        ...this.defaultHeaders(),
      },
    });
  }

  public async delete(url: string) {
    return await this.http_client!.delete(url, {
      headers: {
        ...this.defaultHeaders(),
      },
    });
  }

  public async graphql<Q, V>(query: string | DocumentNode, variables?: V) {
    if (typeof query !== 'string') {
      query = print(query)
    }

    const { data: res }: { data: { data: Q; errors?: IGraphQLError[] } } =
      await this.post("/graphql", { query, variables });

    return res;
  }

  public async upload(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const { data: res } = await this.post('/uploads', formData, { 'Content-Type': 'multipart/form-data' })

    return res;
  }

  public async signIn(data: Record<string, unknown>, accept_cookie = false) {
    clearCookie(["accept_cookie"]);

    const { data: res }: { data: IAuthResponse } = await this.post(
      `/oauth/token?${stringify(data)}`,
      {}
    );

    const { current_user }: { current_user: ICurrentUser } = jwtDecode(
      res.access_token
    );

    if (accept_cookie) {
      setCookie("accept_cookie", "true");

      setCookie("access_token", res.access_token, res.access_token_expires_at);
      setCookie(
        "access_token_expires_at",
        res.access_token_expires_at,
        res.access_token_expires_at
      );
      setCookie(
        "refresh_token",
        res.refresh_token,
        res.refresh_token_expires_at
      );
      setCookie(
        "refresh_token_expires_at",
        res.refresh_token_expires_at,
        res.refresh_token_expires_at
      );
    } else {
      setCookie("accept_cookie", "false");
    }

    if (this.current_user_store) {
      this.current_user_store.setCurrentUser(current_user);
      this.current_user_store.setTokens(res);
    }
  }

  public async signUp(login: string, password: string) {
    const { data: res }: { data: string[] } = await this.post(
      `/oauth/registration`,
      { login, password }
    );

    return res;
  }

  public signOut(redirect = false) {
    clearCookie();

    if (this.current_user_store) {
      this.current_user_store.setCurrentUser(null);
      this.current_user_store.setTokens(null);
    }

    if (redirect) {
      this.router.push({ name: "VDashboard" });
    }
  }

  public async changePassword(recovery_key: string, new_password: string) {
    const { data: res }: { data: string[] } = await this.post(
      `/oauth/change_password`,
      { recovery_key, new_password }
    );

    return res;
  }

  public async refreshAccessToken() {
    const accept_cookie = getCookie("accept_cookie");
    const refresh_token = this.current_user_store.refreshToken;

    if (refresh_token) {
      try {
        await this.signIn(
          { refresh_token, grand_type: "refresh_token" },
          accept_cookie === "true"
        );
      } catch (error) {
        this.signOut();
        this.router.push({ name: "VSignIn" });
      }
    }
  }

  public async restoreAuth() {
    const accept_cookie = getCookie("accept_cookie");

    if (accept_cookie === "true") {
      const access_token = getCookie("access_token");
      const access_token_expires_at = getCookie("access_token_expires_at");
      const refresh_token = getCookie("refresh_token");
      const refresh_token_expires_at = getCookie("refresh_token_expires_at");

      if (
        access_token?.length &&
        access_token_expires_at?.length &&
        refresh_token?.length &&
        refresh_token_expires_at?.length
      ) {
        const { current_user }: { current_user: ICurrentUser } =
          jwtDecode(access_token);

        this.current_user_store.setCurrentUser(current_user);
        this.current_user_store.setTokens({
          access_token,
          access_token_expires_at,
          refresh_token,
          refresh_token_expires_at,
        });

        await this.refreshAccessToken();
      }
    } else {
      clearCookie();
    }
  }
}

export function useApi() {
  return inject(api_key) as ApiService;
}

export default {
  install(
    app: App,
    options: {
      currentUserStore: TUserStoreDefinition;
      router: Router;
      toast: ToastInterface;
    }
  ) {
    const api = new ApiService(
      options.currentUserStore,
      options.router,
      options.toast
    );

    app.config.globalProperties.$api = api;
    app.provide(api_key, api);
  },
} as Plugin;
