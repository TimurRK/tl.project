import type { App, Plugin } from "vue";
import { inject } from "vue";
import type { Router } from "vue-router";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import axios from "axios";
import jwtDecode from "jwt-decode";

import type {
  ICurrentUser,
  TUserStore,
  TUserStoreDefinition,
} from "@/stores/current-user";
import { clearCookie, setCookie } from "@/helpers/cookie.helper";

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
    private readonly router: Router
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
            /**
             * redirect to sign-in
             */
            break;
          case "ACCESS_TOKEN_EXPIRED":
            /**
             * refresh
             */
            break;
          case "AUTHORIZATION_FAILED":
            if (this.current_user_store) {
              this.current_user_store.setCurrentUser(null);
              this.current_user_store.setTokens(null);
            }

            clearCookie();

            break;
        }

        return Promise.reject(error.response.data);
      }
    );
  }

  private defaultHeaders() {
    const headers: AxiosRequestHeaders = {
      "Content-Type": "application/json; charset=utf-8",
    };

    if (this.current_user_store?.accessToken) {
      headers.Authorization = this.current_user_store.accessToken;
    }

    return headers;
  }

  public async get(url: string) {
    return await this.http_client!.get(url, {
      headers: {
        ...this.defaultHeaders,
      },
    });
  }

  public async post(url: string, body: Record<string, unknown>) {
    return await this.http_client!.post(url, body, {
      headers: {
        ...this.defaultHeaders,
      },
    });
  }

  public async put(url: string, body: Record<string, unknown>) {
    return await this.http_client!.put(url, body, {
      headers: {
        ...this.defaultHeaders,
      },
    });
  }

  public async patch(url: string, body: Record<string, unknown>) {
    return await this.http_client!.patch(url, body, {
      headers: {
        ...this.defaultHeaders,
      },
    });
  }

  public async delete(url: string) {
    return await this.http_client!.delete(url, {
      headers: {
        ...this.defaultHeaders,
      },
    });
  }

  public async graphql<T>(query: string, variables: Record<string, unknown>) {
    const { data: res }: { data: { data: T; errors?: IGraphQLError[] } } =
      await this.post("/graphql", { query, variables });

    return res;
  }

  public async signIn(login: string, password: string, use_cookie = false) {
    clearCookie();

    const { data: res }: { data: IAuthResponse } = await this.post(
      `/oauth/token?username=${login}&password=${password}&grand_type=password`,
      {}
    );

    const { current_user }: { current_user: ICurrentUser } = jwtDecode(
      res.access_token
    );

    if (use_cookie) {
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
    }

    if (this.current_user_store) {
      this.current_user_store.setCurrentUser(current_user);
      this.current_user_store.setTokens(res);
    }

    this.router.push({ name: "VDashboard" });
  }

  public signOut() {
    clearCookie();

    this.current_user_store.setCurrentUser(null);
    this.current_user_store.setTokens(null);
  }
}

export function useApi() {
  return inject(api_key) as ApiService;
}

export default {
  install(
    app: App,
    options: { currentUserStore: TUserStoreDefinition; router: Router }
  ) {
    const api = new ApiService(options.currentUserStore, options.router);

    app.config.globalProperties.$api = api;
    app.provide(api_key, api);
  },
} as Plugin;
