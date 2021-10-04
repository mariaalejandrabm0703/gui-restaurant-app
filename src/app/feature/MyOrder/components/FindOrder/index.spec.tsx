import '@testing-library/jest-dom';
import {
  IFilters,
  IProduct,
  IProductOrder,
  IProductOrderRegistred,
  IRanking,
} from '../../../Home/models/Home';
import { IMyClient, IMyOrder } from '../../models/MyOrder';
import {
  clientInfo,
  filtersInfo,
  myClientInfo,
  myOrderInfo,
  productInfo,
  productOrderInfor,
  productOrderRegistredInfo,
  rankingInfo,
} from '../../../../shared/utils/data';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import FindOrder from './index';
import { IClient } from '../../../Cart/models/Cart';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IStateCart } from '../../../../core/redux/modelo/IStateCart';
import { IStateHome } from '../../../../core/redux/modelo/IStateHome';
import { IStateMain } from '../../../../core/redux/modelo/IStateMain';
import { IStateOrder } from '../../../../core/redux/modelo/IStateOrder';
import { IStateProducts } from '../../../../core/redux/modelo/IStateProducts';
import { IStateRanking } from '../../../../core/redux/modelo/IStateRanking';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { render, wait } from '@testing-library/react';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

const newProduct: IProduct = productInfo;
const listProducts: IProduct[] = [newProduct];
const products: IStateProducts = {
  listProducts,
};

const newRamking: IRanking = rankingInfo;
const listRanking: IRanking[] = [newRamking];
const ranking: IStateRanking = {
  listRanking,
};

const count: number = 1;
const client: IClient = clientInfo;
const modo: string = 'registry';
const newProductOrder: IProductOrder = productOrderInfor;
const listProductsCart: IProductOrder[] = [newProductOrder];
const cart: IStateCart = {
  listProductsCart,
  count,
  client,
  modo,
};

const main: IStateMain = {
  isLoading: false,
  errorMessage: { message: '', type: '' },
};

const newProductRegistred: IProductOrderRegistred = productOrderRegistredInfo;
const pedidosProductos: IProductOrderRegistred[] = [newProductRegistred];
const cliente: IMyClient = myClientInfo;
const myOrder: IMyOrder = {
  id: 1,
  fechaEntrega: '01/10/2021',
  precio: 500,
  activo: '1',
  pedidosProductos,
  cliente: cliente,
};
const order: IStateOrder = {
  myOrder,
};

const listProductsHome: IProduct[] = [newProduct];
const filters: IFilters = filtersInfo;
const home: IStateHome = {
  listProductsHome,
  filters,
};

describe('Pruebas de componente FindOrder', () => {
  let store;

  let wrapper;
  beforeEach(() => {
    store = mockStore({
      products,
      ranking,
      cart,
      main,
      order,
      home,
    });

    wrapper = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <FindOrder searchOrderAsync={() => null} />
        </BrowserRouter>
        ,
      </Provider>
    );
  });

  it('rederizar el componente FindOrder sin errores', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <FindOrder searchOrderAsync={() => null} />
        </BrowserRouter>
        ,
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Compara snapshot del FindOrder renderizado', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renderiza el componente FindOrder y verifica existencia de componentes hijos', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <FindOrder searchOrderAsync={() => null} />
        </BrowserRouter>
        ,
      </Provider>
    );
    expect(getByTestId('div-find-order')).toContainElement(
      getByTestId('btn-find-order')
    );
    expect(getByTestId('form-find-order')).toHaveFormValues({
      id: 0,
    });
    expect(getByTestId('form-find-order')).toContainElement(
      getByTestId('form-find-order-id')
    );
  });

  it('Debe dar click en el botón y ejecutar el handleSumbit', async () => {
    const search = jest.fn(() => null);
    const fetchFunction = jest.fn(() => null);
    console.log(fetchFunction());

    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <FindOrder searchOrderAsync={() => search} />
        </BrowserRouter>
        ,
      </Provider>
    );

    const id = wrapper.find('#id').first();

    await wait(() => {
      id.simulate('change', {
        target: {
          name: 'id',
          value: '1',
        },
      });
    });

    const form = wrapper.find('#form-find-order').first();
    form.simulate('submit');

  });
});
