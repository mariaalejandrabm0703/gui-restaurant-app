import {
  ADD_COUNT_PRODUCTS,
  DEFAULT_STATE,
  DELETE_COUNT_PRODUCTS,
  IActionTypesCart,
  SET_COUNT_PRODUCTS,
  SET_PRODUCTS,
  SUBT_COUNT_PRODUCTS,
} from '../../actions/cart/ActionTypesCart';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import { CartRepository } from '../../../api/cart.repository';
import { IErrorToast } from '../../modelo/IStateMain';
import { IProduct } from '../../../../feature/Home/models/Home';
const errorDefault = { message: '', type: '' };

export function defaultState(id: number): IActionTypesCart {
  return {
    type: DEFAULT_STATE,
    payload: id,
  };
}

export function setProducts(products: Array<IProduct>): IActionTypesCart {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
}

export function isLoading(loading: boolean): IActionTypesMain {
  return {
    type: IS_LOADING,
    payload: loading,
  };
}

export function setError(error: IErrorToast): IActionTypesMain {
  return {
    type: ERROR,
    payload: error,
  };
}

export function setProductsAsync(id: number) {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await CartRepository.findProductsByOrder(id)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setProducts(response.data.pedidosProductos));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'cart',
            message:
              'Error al cargar los productos. Por favor, intente nuevamente',
          })
        );
        return dispacth(setProducts([]));
      });
  };
}

export function addCountProduct(): IActionTypesCart {
  return {
    type: ADD_COUNT_PRODUCTS,
    payload: 1,
  };
}

export function subtCountProduct(): IActionTypesCart {
  return {
    type: SUBT_COUNT_PRODUCTS,
    payload: 1,
  };
}

export function deleteCountProduct(): IActionTypesCart {
  return {
    type: DELETE_COUNT_PRODUCTS,
    payload: 0,
  };
}

export function setCountProduct(count: number): IActionTypesCart {
  return {
    type: SET_COUNT_PRODUCTS,
    payload: count,
  };
}
