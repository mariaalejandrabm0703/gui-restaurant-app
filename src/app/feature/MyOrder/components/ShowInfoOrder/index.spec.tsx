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
import { IClient } from '../../../Cart/models/Cart';
import { IStateCart } from '../../../../core/redux/modelo/IStateCart';
import { IStateHome } from '../../../../core/redux/modelo/IStateHome';
import { IStateMain } from '../../../../core/redux/modelo/IStateMain';
import { IStateOrder } from '../../../../core/redux/modelo/IStateOrder';
import { IStateProducts } from '../../../../core/redux/modelo/IStateProducts';
import { IStateRanking } from '../../../../core/redux/modelo/IStateRanking';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import ShowInfoOrder from './index';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

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

describe('Pruebas de componente ShowInfoOrder', () => {
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
          <ShowInfoOrder 
            myOrder={myOrder}
            />
        </BrowserRouter>
        ,
      </Provider>
    );
  });

  it('rederizar el componente ShowInfoOrder sin errores', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <ShowInfoOrder myOrder={myOrder}/>
        </BrowserRouter>
        ,
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Compara snapshot del ShowInfoOrder renderizado', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
