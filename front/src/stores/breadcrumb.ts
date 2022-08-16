import {
  defineStore,
  type StoreDefinition,
  type Store,
  type _GettersTree,
} from "pinia";
import type { RouteParamsRaw } from "vue-router";

export interface IBreadcrumb {
  name: string;
  is_current: boolean;
  to?: string;
  params?: RouteParamsRaw;
}

interface IState {
  _breadcrumbs: IBreadcrumb[] | null;
}

interface IGetters extends _GettersTree<IState> {
  breadcrumbs: (stage: IState) => IBreadcrumb[] | null;
}

interface IActions {
  setBreadcrumbs: (breadcrumbs: IBreadcrumb[] | null) => void;
}

export type TBreadcrumbStore = Store<
  "breadcrumbsStore",
  IState,
  IGetters,
  IActions
>;
export type TBreadcrumbStoreDefinition = StoreDefinition<
  "breadcrumbsStore",
  IState,
  IGetters,
  IActions
>;

export const breadcrumbsStore = defineStore<
  "breadcrumbsStore",
  IState,
  IGetters,
  IActions
>({
  id: "breadcrumbsStore",
  state: (): IState => {
    return {
      _breadcrumbs: null,
    };
  },
  getters: {
    breadcrumbs: (state: IState) => state._breadcrumbs,
  },
  actions: {
    setBreadcrumbs(breadcrumbs: IBreadcrumb[] | null) {
      this._breadcrumbs = breadcrumbs;
    },
  },
});
