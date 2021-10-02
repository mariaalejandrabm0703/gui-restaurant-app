import {
  ADD_COUNT_PRODUCTS,
  DEFAULT_STATE,
  DELETE_CLIENT,
  DELETE_COUNT_PRODUCTS,
  IActionTypesCart,
  MODO_EDIT,
  MODO_REGISTER,
  SET_CLIENT,
  SET_COUNT_PRODUCTS,
  SET_PRODUCTS,
  SUBT_COUNT_PRODUCTS,
} from '../../actions/cart/ActionTypesCart';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import { CartRepository } from '../../../api/cart.repository';
import { IClient } from 'app/feature/Cart/models/Cart';
import { IErrorToast } from '../../modelo/IStateMain';
import { IProductOrder } from '../../../../feature/Home/models/Home';

const errorDefault = { message: '', type: '' };

export function defaultState(id: number): IActionTypesCart {
  return {
    type: DEFAULT_STATE,
    payload: id,
  };
}

export function setProducts(products: Array<IProductOrder>): IActionTypesCart {
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
      .catch(() => {
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

export function setClient(client: IClient): IActionTypesCart {
  return {
    type: SET_CLIENT,
    payload: client,
  };
}

export function deleteClient(): IActionTypesCart {
  return {
    type: DELETE_CLIENT,
    payload: {
      id: 0,
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      activo: '',
    },
  };
}

export function registryClientAsync(client: IClient) {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await CartRepository.registryClient(client)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        const c = {
          id: response.data,
          nombre: client.nombre,
          activo: '1',
          identificacion: client.identificacion,
          telefono: client.telefono,
          email: client.email,
        };
        return dispacth(setClient(c));
      })
      .catch(() => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'cart',
            message:
              'Error al cargar el cliente. Por favor, intente nuevamente',
          })
        );
        return dispacth(
          setClient({
            id: 0,
            nombre: '',
            identificacion: '',
            telefono: '',
            email: '',
            activo: '',
          })
        );
      });
  };
}
export function setClientAsync(id: string, client: IClient) {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await CartRepository.findClient(id)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        if (response.data[0] && response.data.length > 0) {
          return dispacth(setClient(response.data[0]));
        }
        return dispacth(registryClientAsync(client));
      })
      .catch(() => {
        dispacth(isLoading(false));
        return dispacth(
          setError({
            type: 'cart',
            message:
              'Error al cargar la información del cliente. Por favor, intente nuevamente',
          })
        );
      });
  };
}

export function setModoEdit(): IActionTypesCart {
  return {
    type: MODO_EDIT,
    payload: '',
  };
}

export function setModoReg(): IActionTypesCart {
  return {
    type: MODO_REGISTER,
    payload: '',
  };
}
