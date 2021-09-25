import {
  DEFAULT_STATE,
  DELETE_ORDER,
  IActionTypesOrder,
  SET_ORDER,  
} from '../order/ActionTypesOrder';
import { ERROR, IActionTypesMain, IS_LOADING } from '../main/ActionTypesMain';
import { IErrorToast } from '../../modelo/IStateMain';
import { IMyOrder } from '../../../../feature/MyOrder/models/MyOrder';
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

export function setOrderAsync(id: number) {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await OrderRepository.findOrderById(id)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        console.log(response.data);
        return dispacth(setOrder(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'order',
            message:
              'Error al cargar el pedido. Por favor, intente nuevamente',
          })
        );
        return dispacth(setOrder({
          id: 0,
          fechaEntrega: '',
          precio: 0,
          activo: '',
          pedidosProductos: [],
          cliente: {
            id: 0,
            nombre: '',
            identificacion: '',
            telefono: '',
            email: '',
            activo: '',
          },
        },));
      });
  };
}