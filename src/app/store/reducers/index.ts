import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

// listens to Angular's routing events. Anytime something is changed in the URL
// the state will be updated and listened to at all times.
export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    //takes router state from Angular and binds it to NGRX store
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state.params;

    return { url, queryParams, params };
  }
}
