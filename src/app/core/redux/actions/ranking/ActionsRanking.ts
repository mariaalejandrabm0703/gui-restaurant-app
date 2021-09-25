import {
  DEFAULT_STATE,
  IActionTypesProducts,
  SET_PRODUCTS
} from '../products/ActionTypesProducts';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import { IErrorToast } from '../../modelo/IStateMain';
import { IRanking } from '../../../../feature/Home/models/Home';
import { RankingRepository } from '../../../api/ranking.repository';

const errorDefault = { message: '', type: '' };

export function defaultState(prods:  Array<IRanking>): IActionTypesProducts {
  return {
    type: DEFAULT_STATE,
    payload: prods,
  };
}

export function setProducts(products: Array<IRanking>): IActionTypesProducts {
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
    await RankingRepository.getProductsRanking()
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setProducts(response.data.pedidosProductos));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'ranking',
            message:
              'Error al cargar los productos. Por favor, intente nuevamente',
          })
        );
        return dispacth(setProducts([]));
      });
  };
}