import {
  IActionTypesOrder,
  SET_ORDER,
} from '../../actions/order/ActionTypesOrder';
import { IStateOrder } from '../../modelo/IStateOrder';

const initialState: IStateOrder = {
  myOrder: {
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
    }
  },
};

export default function (
  state = initialState,
  action: IActionTypesOrder
): IStateOrder {
  switch (action.type) {
    case SET_ORDER: {
      const order = action.payload;
      return {
        ...state,
        myOrder: order,
      };
    }
    default:
      return state;
  }
}
