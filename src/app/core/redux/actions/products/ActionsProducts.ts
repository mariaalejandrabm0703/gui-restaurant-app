import {
  DEFAULT_STATE,
  IActionTypesProducts,
  SET_PRODUCTS
} from '../products/ActionTypesProducts';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import { IErrorToast } from '../../modelo/IStateMain';
import { IProduct } from '../../../../feature/Home/models/Home';
import { ProdsRepository } from '../../../api/prods.repository';
const errorDefault = { message: '', type: '' };

export function defaultState(prods:  Array<IProduct>): IActionTypesProducts {
  return {
    type: DEFAULT_STATE,
    payload: prods,
  };
}

export function setProducts(products: Array<IProduct>): IActionTypesProducts {
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

export function setProductsAsync() {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await ProdsRepository.getAllProducts()
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setProducts(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'prods',
            message:
              'Error al cargar los productos. Por favor, intente nuevamente',
          })
        );
        return dispacth(setProducts([]));
      });
  };
}