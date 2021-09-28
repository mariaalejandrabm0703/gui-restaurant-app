import {
  DEFAULT_STATE,
  IActionTypesHome,
  SET_FILTERS,
  SET_PRODUCTS,
} from './ActionTypesHome';
import { IFilters, IProduct } from '../../../../feature/Home/models/Home';

export function defaultState(id: number): IActionTypesHome {
  return {
    type: DEFAULT_STATE,
    payload: id,
  };
}

export function setProducts(products: Array<IProduct>): IActionTypesHome {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
}

export function setFilters(filters: IFilters): IActionTypesHome {
  return {
    type: SET_FILTERS,
    payload: filters,
  };
}
