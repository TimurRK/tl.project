import type { IAuthResponse } from "@/api/api";
import {
  defineStore,
  type StoreDefinition,
  type Store,
  type _GettersTree,
} from "pinia";

export interface ICurrentUser {
  id: string;
  login: string;
  is_admin: boolean;
  is_blocked: boolean;
}

interface IState {
  current_user: ICurrentUser | null;
  access_token: string | null;
  access_token_expires_at: string | null;
  refresh_token: string | null;
  refresh_token_expires_at: string | null;
}

interface IGetters extends _GettersTree<IState> {
  currentUser: (stage: IState) => ICurrentUser | null;
  accessToken: (stage: IState) => string | null;
  accessTokenExpiresAt: (stage: IState) => string | null;
  refreshToken: (stage: IState) => string | null;
  refreshTokenExpiresAt: (stage: IState) => string | null;
}

interface IActions {
  setCurrentUser: (current_user: ICurrentUser | null) => void;
  setTokens: (data: IAuthResponse | null) => void;
}

export type TUserStore = Store<"currentUserStore", IState, IGetters, IActions>;
export type TUserStoreDefinition = StoreDefinition<
  "currentUserStore",
  IState,
  IGetters,
  IActions
>;

export const currentUserStore = defineStore<
  "currentUserStore",
  IState,
  IGetters,
  IActions
>({
  id: "currentUserStore",
  state: (): IState => {
    return {
      current_user: null,
      access_token: null,
      access_token_expires_at: null,
      refresh_token: null,
      refresh_token_expires_at: null,
    };
  },
  getters: {
    currentUser: (state: IState) => state.current_user,
    accessToken: (state: IState) => state.access_token,
    accessTokenExpiresAt: (state: IState) => state.access_token_expires_at,
    refreshToken: (state: IState) => state.refresh_token,
    refreshTokenExpiresAt: (state: IState) => state.refresh_token_expires_at,
  },
  actions: {
    setCurrentUser(current_user: ICurrentUser | null) {
      this.current_user = current_user;
    },
    setTokens(data: IAuthResponse | null) {
      if (data) {
        this.access_token = data.access_token;
        this.access_token_expires_at = data.access_token_expires_at;
        this.refresh_token = data.refresh_token;
        this.refresh_token_expires_at = data.refresh_token_expires_at;
      } else {
        this.access_token = null;
        this.access_token_expires_at = null;
        this.refresh_token = null;
        this.refresh_token_expires_at = null;
      }
    },
  },
});
