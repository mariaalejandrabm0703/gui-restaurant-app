import { IFilters, IProduct } from 'app/feature/Home/models/Home';

export const DEFAULT_STATE = '[HOME] DEFAULT_STATE';
export const SET_FILTERS = '[HOME] SETEAR_FILTERS';
export const SET_PRODUCTS = '[HOME] SETEAR_PRODUCTOS';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: number;
}

interface ISetFiltersAction {
  type: typeof SET_FILTERS;
  payload: IFilters;
}

interface ISetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IProduct[];
}

export type IActionTypesHome =
  | IDefaultState
  | ISetProductsAction
  | ISetFiltersAction;
