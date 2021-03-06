import {
  DEFAULT_STATE,
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
import { setProductsRanAsync } from '../ranking/ActionsRanking';
import { toast } from 'react-toastify';

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

export function setOrderAsync(order: IMyOrderReg, modo: string, id: number) {
  return async function (dispacth: any) {
    const p = Array<IProductOrder>();
    dispacth(isLoading(true));
    if (modo !== 'registry') {
      dispacth(setProducts(p));
      dispacth(deleteCountProduct());
      dispacth(deleteClient());
      return dispacth(setConfigOrderAsync(id, order));
    }
    await OrderRepository.registryOrder(order)
      .then(async (response: any)  => {
        dispacth(isLoading(false));      
        dispacth(setError(errorDefault));
        dispacth(setProducts(p));
        dispacth(deleteCountProduct());
        dispacth(deleteClient());
        await dispacth(setProductsRanAsync());
        return dispacth(setOrder(response.data[0]));
      })
      .catch(() => {
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
            pedidosProductos: [],
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
    dispacth(isLoading(true));
    await OrderRepository.findOrderById(id)
      .then((response: any) => {
        if (!response.data[0] && response.data.length === 0) {
          dispacth(isLoading(false));
          dispacth(
            setError({
              type: 'order',
              message: 'El pedido no existe.',
            })
          );
          toast.error('No se ha encontrado el pedido #'+id);
          return;
        }
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setOrder(response.data[0]));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'order',
            message: 'Error al cargar el pedido. Por favor, intente nuevamente',
          })
        );
      });
  };
}

export function setConfigOrderAsync(id: number, orderEdit: IMyOrderReg) {
  return async function (dispacth: any) {
    dispacth(isLoading(true));
    await OrderRepository.editOrderById(id, orderEdit)
      .then((response: any) => {
        dispacth(isLoading(false));
        dispacth(setError(errorDefault));
        return dispacth(setOrder(response.data[0]));
      })
      .catch((err) => {
        dispacth(isLoading(false));
        dispacth(
          setError({
            type: 'order',
            message: 'Error al editar el pedido. Por favor, intente nuevamente',
          })
        );
      });
  };
}
