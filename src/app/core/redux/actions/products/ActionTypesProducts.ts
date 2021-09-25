import { IProduct } from '../../../../feature/Home/models/Home';

export const DEFAULT_STATE = '[PRODS]  DEFAULT_STATE';
export const SET_PRODUCTS = '[PRODS] SETEAR_PRODUCTOS';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: IProduct[];
}

interface ISetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IProduct[];
}

export type IActionTypesProducts =
  | IDefaultState
  | ISetProductsAction
