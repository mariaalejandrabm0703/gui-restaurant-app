import {
  DEFAULT_STATE,
  DELETE_ORDER,
  IActionTypesOrder,
  SET_ORDER,
} from '../order/ActionTypesOrder';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import {
  IMyOrder,
  IMyOrderReg,
} from '../../../../feature/MyOrder/models/MyOrder';
import {
  deleteClient,
  deleteCountProduct,
  setProducts,
} from '../cart/ActionsCart';
import { IErrorToast } from '../../modelo/IStateMain';
import { IProductOrder } from 'app/feature/Home/models/Home';
import { OrderRepository } from '../../../api/order.repository';
const errorDefault = { message: '', type: '' };

export function defaultState(pedido: IMyOrder): IActionTypesOrder {
  return {
    type: DEFAULT_STATE,
    payload: pedido,
  };
}

export function setOrder(pedido: IMyOrder): IActionTypesOrder {
  return {
    type: SET_ORDER,
    payload: pedido,
  };
}

export function deleteOrder(pedido: IMyOrder): IActionTypesOrder {
  return {
    type: DELETE_ORDER,
    payload: pedido,
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

export function setOrderAsync(order: IMyOrderReg) {
  return async function (dispacth: any) {
    const p = Array<IProductOrder>();
    dispacth(isLoading(true));
    await OrderRepository.registryOrder(order)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        dispacth(setProducts(p));
        dispacth(deleteCountProduct());
        dispacth(deleteClient());
        return dispacth(setOrder(response.data));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'order',
            message: 'Error al cargar el pedido. Por favor, intente nuevamente',
          })
        );
        return dispacth(
          setOrder({
            id: 0,
            fechaEntrega: '',
            precio: 0,
            activo: '',
            productosPedidos: [],
            cliente: {
              id: 0,
              nombre: '',
              identificacion: '',
              telefono: '',
              email: '',
              activo: '',
            },
          })
        );
      });
  };
}

export function searchOrderAsync(id: number) {
  return async function (dispacth: any) {
    const p = Array<IProductOrder>();
    dispacth(isLoading(true));
    await OrderRepository.findOrderById(id)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setOrder(response.data));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'order',
            message: 'Error al cargar el pedido. Por favor, intente nuevamente',
          })
        );
        return dispacth(
          setOrder({
            id: 0,
            fechaEntrega: '',
            precio: 0,
            activo: '',
            productosPedidos: [],
            cliente: {
              id: 0,
              nombre: '',
              identificacion: '',
              telefono: '',
              email: '',
              activo: '',
            },
          })
        );
      });
  };
}
