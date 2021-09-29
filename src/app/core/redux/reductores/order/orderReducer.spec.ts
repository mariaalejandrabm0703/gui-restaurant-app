import { defaultState, setOrder } from '../../actions/order/ActionsOrder';
import { IMyOrder } from '../../../../feature/MyOrder/models/MyOrder';
import { IStateOrder } from '../../modelo/IStateOrder';
import { myOrderInfo } from '../../../../shared/utils/data';
import orderReducer from './orderReducer';


describe('Reductor de pedido', () => {
  const pedido: IMyOrder = myOrderInfo;

  it('debería retornar el estado por defecto', () => {
    const initialState: IStateOrder = {
      myOrder: {
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
      },
    };

    const newState = orderReducer(initialState, defaultState(pedido));
    expect(newState).toStrictEqual(initialState);
  });

  it('debería establecer la orden', () => {
    const initialState: IStateOrder = {
        myOrder: {
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
        },
      };

    const expectedState: IStateOrder = {
        myOrder: pedido
      };

      const newState = orderReducer(initialState, setOrder(pedido));
      expect(newState).toStrictEqual(expectedState);
  });
});
