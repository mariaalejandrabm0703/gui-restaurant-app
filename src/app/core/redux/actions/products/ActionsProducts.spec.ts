import {
  isLoading,
  setError,
  setProducts,
  setProductsAsync,
} from '../products/ActionsProducts';
import { IProduct } from '../../../../feature/Home/models/Home';
import { IStateProducts } from '../../modelo/IStateProducts';
import { baseUrl } from '../../../config/AxiosConfig';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { productInfo } from '../../../../shared/utils/data';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState: IStateProducts = {
  listProducts: Array<IProduct>(),
};

const errorDefault = { message: '', type: '' };

describe('Test servicios asincronos ActionsProducts', () => {
  let store;

  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Debería establecer los productos', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError(errorDefault),
      setProducts([productInfo]),
    ];

    moxios.stubRequest(baseUrl + '/productos', {
      status: 200,
      response: [productInfo],
    });

    await store.dispatch(setProductsAsync()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });

  it('No debería establecer los productos', async (done) => {
    const expectedActions = [
      isLoading(true),
      isLoading(false),
      setError({
        type: 'prods',
        message: 'Error al cargar los productos. Por favor, intente nuevamente',
      }),
      setProducts([]),
    ];

    moxios.stubRequest(baseUrl + '/productos', {
      status: 400,
      response: [],
    });

    await store.dispatch(setProductsAsync()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
    done();
  });
});
