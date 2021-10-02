import { clientInfo, productInfo } from '../../../../shared/utils/data';
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

describe('Test servicio de registrar cliente', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
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
});

describe('Test servicio de buscar cliente', () => {
    let store;
  
    beforeEach(() => {
      moxios.install();
      store = mockStore(initialState);
    });
    afterEach(() => {
      moxios.uninstall();
    });
});  
