import { IRanking } from '../../../../feature/Home/models/Home';

export const DEFAULT_STATE = '[RANK]  DEFAULT_STATE';
export const SET_PRODUCTS = '[RANK] SETEAR_PRODUCTOS';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: IRanking[];
}

interface ISetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IRanking[];
}

export type IActionTypesRanking =
  | IDefaultState
  | IDefaultState
  | ISetProductsAction;
