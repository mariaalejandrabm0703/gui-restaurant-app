import {
  clientInfo,
  productInfo,
  productOrderInfor,
} from '../../../../shared/utils/data';
import {
  isLoading,
  registryClientAsync,
  setClient,
  setClientAsync,
  setError,
  setProducts,
  setProductsAsync,
} from './ActionsCart';
import { IProductOrder } from 'app/feature/Home/models/Home';
import { IStateCart } from '../../modelo/IStateCart';
import { baseUrl } from 'app/core/config/AxiosConfig';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState: IStateCart = {
  count: 0,
  listProductsCart: Array<IProductOrder>(),
  client: {
    id: 0,
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    activo: '',
  },
  modo: 'registry',
};

const errorDefault = { message: '', type: '' };

describe('Test servicios asincronos ActionsCart', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Debería buscar al buscar el cliente correctamente', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setClient(clientInfo),
    ];

    moxios.stubRequest('http://localhost:3001/api/clientes/109049544', {
      status: 201,
      response: [clientInfo],
    });

    await store
      .dispatch(setClientAsync(clientInfo.identificacion, clientInfo))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('Debería fallar al buscar el cliente', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'cart',
        message:
          'Error al cargar la información del cliente. Por favor, intente nuevamente',
      }),
    ];

    moxios.stubRequest('http://localhost:3001/api/clientes/109049544', {
      status: 400,
      response: { data: [clientInfo] },
    });

    await store
      .dispatch(setClientAsync(clientInfo.identificacion, clientInfo))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('Debería no encontrar el cliente e ir a registrarlo', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setClient(clientInfo),
    ];

    moxios.stubRequest('http://localhost:3001/api/clientes/109049544', {
      status: 200,
      response: [],
    });

    moxios.stubRequest(baseUrl + '/clientes', {
      status: 201,
      responseText: '1',
    });

    await store
      .dispatch(setClientAsync(clientInfo.identificacion, clientInfo))
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
      });
    done();
  });

  it('Debería almacenar el cliente correctamente', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setClient(clientInfo),
    ];

    moxios.stubRequest(baseUrl + '/clientes', {
      status: 201,
      responseText: '1',
    });

    await store.dispatch(registryClientAsync(clientInfo)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería almacenar un cliente que ya existe', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'cart',
        message: 'Error al cargar el cliente. Por favor, intente nuevamente',
      }),
      setClient({
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      }),
    ];

    moxios.stubRequest(baseUrl + '/clientes', {
      status: 400,
      responseText: '1',
    });

    await store.dispatch(registryClientAsync(clientInfo)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('Debería setear los productos de una orden correctamente', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setProducts([productOrderInfor]),
    ];

    moxios.stubRequest('http://localhost:3001/api/pedidos/1', {
      status: 201,
      response: { pedidosProductos: [productOrderInfor] },
    });

    await store.dispatch(setProductsAsync(1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería setear los productos de una orden correctamente', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'cart',
        message: 'Error al cargar los productos. Por favor, intente nuevamente',
      }),
      setProducts([]),
    ];

    moxios.stubRequest('http://localhost:3001/api/pedidos/1', {
      status: 400,
      response: { pedidosProductos: [productOrderInfor] },
    });

    await store.dispatch(setProductsAsync(1)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });
});
