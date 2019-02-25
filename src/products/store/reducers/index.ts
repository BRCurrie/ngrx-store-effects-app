import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

// create selector function - create base level of state object from pizza.reducer.ts
export const getProductState = createFeatureSelector<ProductsState>('products');
