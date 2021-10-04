import '@testing-library/jest-dom';
import {
  IFilters,
  IProduct,
  IProductOrder,
  IProductOrderRegistred,
  IRanking,
} from '../../../feature/Home/models/Home';
import { IMyClient, IMyOrder } from '../../../feature/MyOrder/models/MyOrder';
import {
  clientInfo,
  filtersInfo,
  myClientInfo,
  productInfo,
  productOrderInfor,
  productOrderRegistredInfo,
  rankingInfo,
} from '../../../shared/utils/data';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartRouter } from '../CartRouter';
import { IClient } from '../../../feature/Cart/models/Cart';
import { IStateCart } from '../../../core/redux/modelo/IStateCart';
import { IStateHome } from '../../../core/redux/modelo/IStateHome';
import { IStateMain } from '../../../core/redux/modelo/IStateMain';
import { IStateOrder } from '../../../core/redux/modelo/IStateOrder';
import { IStateProducts } from '../../../core/redux/modelo/IStateProducts';
import { IStateRanking } from '../../../core/redux/modelo/IStateRanking';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

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
const client: IClient = null;
const modo: string = 'registry';
const newProductOrder: IProductOrder = productOrderInfor;
const listProductsCart: IProductOrder[] = [];
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
const cliente: IMyClient = null;
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

describe('Prueba componente ManageCart con redux sin productos en el carrito', () => {
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
          <CartRouter />
        </BrowserRouter>
        ,
      </Provider>
    );
  });

  it('Compara snapshot del ManageCart renderizado sin productos en el carrito', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
