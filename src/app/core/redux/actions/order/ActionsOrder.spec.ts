import {
  deleteClient,
  deleteCountProduct,
  setProducts,
} from '../cart/ActionsCart';
import {
  isLoading,
  searchOrderAsync,
  setError,
  setOrder,
  setOrderAsync,
} from './ActionsOrder';
import {
  myOrderInfo,
  myOrderRegInfor,
  rankingInfo,
} from '../../../../shared/utils/data';
import { IProductOrder } from '../../../../feature/Home/models/Home';
import { IStateOrder } from '../../modelo/IStateOrder';
import { baseUrl } from '../../../config/AxiosConfig';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import moxios from 'moxios';
import { setProducts as setProductsRank } from '../ranking/ActionsRanking';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

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

const errorDefault = { message: '', type: '' };

describe('Test servicios asincronos ActionsOrder', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Debería establecer el pedido correctamente en modo registry', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setProducts(p),
      deleteCountProduct(),
      deleteClient(),
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setProductsRank([rankingInfo]),
      setOrder(myOrderInfo),
    ];

    moxios.stubRequest(baseUrl + '/pedidos', {
      status: 201,
      response: [myOrderInfo],
    });

    moxios.stubRequest(baseUrl + '/productos/masvendidos', {
      status: 200,
      response: [rankingInfo],
    });

    await store
      .dispatch(setOrderAsync(myOrderRegInfor, 'registry', 1))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('No debería establecer el pedido en modo registry cuando no actualiza productos mas vendidos', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setProducts(p),
      deleteCountProduct(),
      deleteClient(),
      isLoading(true),
      isLoading(false),
      setError({
        type: 'ranking',
        message: 'Error al cargar los productos. Por favor, intente nuevamente',
      }),
      setProductsRank([]),
      setOrder(myOrderInfo),
    ];

    moxios.stubRequest(baseUrl + '/pedidos', {
      status: 201,
      response: [myOrderInfo],
    });

    moxios.stubRequest(baseUrl + '/productos/masvendidos', {
      status: 400,
      response: [rankingInfo],
    });

    await store
      .dispatch(setOrderAsync(myOrderRegInfor, 'registry', 1))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('Debería establecer el pedido correctamente en modo edit', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      setProducts(p),
      deleteCountProduct(),
      deleteClient(),
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setOrder(myOrderInfo),
    ];

    moxios.stubRequest(baseUrl + '/pedidos/1', {
      status: 201,
      response: [myOrderInfo],
    });

    await store.dispatch(setOrderAsync(myOrderRegInfor, 'edit', 1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería establecer el pedido correctamente en modo edit', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      setProducts(p),
      deleteCountProduct(),
      deleteClient(),
      isLoading(true),
      isLoading(false),
      setError({
        type: 'order',
        message: 'Error al editar el pedido. Por favor, intente nuevamente',
      }),
    ];

    moxios.stubRequest(baseUrl + '/pedidos/1', {
      status: 400,
      response: [myOrderInfo],
    });

    await store.dispatch(setOrderAsync(myOrderRegInfor, 'edit', 1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería establecer el pedido en modo registry', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'order',
        message: 'Error al cargar el pedido. Por favor, intente nuevamente',
      }),
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
      }),
    ];

    moxios.stubRequest(baseUrl + '/pedidos', {
      status: 400,
      response: [myOrderInfo],
    });

    moxios.stubRequest(baseUrl + '/productos/masvendidos', {
      status: 200,
      response: [rankingInfo],
    });

    await store
      .dispatch(setOrderAsync(myOrderRegInfor, 'registry', 1))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('Debería buscar el pedido correctamente', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setOrder(myOrderInfo),
    ];

    moxios.stubRequest(baseUrl + '/pedidos/1', {
      status: 200,
      response: [myOrderInfo],
    });

    await store.dispatch(searchOrderAsync(1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería buscar el pedido correctamente', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'order',
        message: 'Error al cargar el pedido. Por favor, intente nuevamente',
      }),
    ];

    moxios.stubRequest(baseUrl + '/pedidos/1', {
      status: 400,
      response: [myOrderInfo],
    });

    await store.dispatch(searchOrderAsync(1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería encontrar el pedido que no existe', async (done) => {
    const p = Array<IProductOrder>();
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'order',
        message: 'El pedido no existe.',
      }),
    ];

    moxios.stubRequest(baseUrl + '/pedidos/1', {
      status: 200,
      response: [],
    });

    await store.dispatch(searchOrderAsync(1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });
});
