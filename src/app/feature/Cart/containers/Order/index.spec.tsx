import '@testing-library/jest-dom';
import {
  IFilters,
  IProduct,
  IProductOrder,
  IProductOrderRegistred,
  IRanking,
} from '../../../../feature/Home/models/Home';
import {
  IMyClient,
  IMyOrder,
} from '../../../../feature/MyOrder/models/MyOrder';
import {
  clientInfo,
  filtersInfo,
  myClientInfo,
  productInfo,
  productOrderInfor,
  productOrderRegistredInfo,
  rankingInfo,
} from '../../../../shared/utils/data';
import { mount, shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Cart } from './index';
import { IClient } from '../../../../feature/Cart/models/Cart';
import { IStateCart } from '../../../../core/redux/modelo/IStateCart';
import { IStateHome } from '../../../../core/redux/modelo/IStateHome';
import { IStateMain } from '../../../../core/redux/modelo/IStateMain';
import { IStateOrder } from '../../../../core/redux/modelo/IStateOrder';
import { IStateProducts } from '../../../../core/redux/modelo/IStateProducts';
import { IStateRanking } from '../../../../core/redux/modelo/IStateRanking';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';

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

const initialValues = {
  email: '',
  identificacion: '',
  nombre: '',
  telefono: '',
};

describe('Prueba componente Cart con redux', () => {
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
          <Cart
            listProducts={[]}
            listProductMenu={[]}
            client={null}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={null}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );
  });

  it('Compara snapshot del Cart renderizado', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Busca componente formulario', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[]}
            listProductMenu={[]}
            client={null}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={null}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );
    expect(screen.getByText(/Mis compras/i)).toBeInTheDocument();
  });

  it('Debe dar click en el bot??n confirmar', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[productOrderInfor]}
            listProductMenu={[productInfo]}
            client={clientInfo}
            modo={'registry'}
            myOrder={myOrder}
            isLoading={false}
            errorMessage={{ message: '', type: '' }}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );

    const form = wrapper.find('#btn-confirm-order').first();
    form.simulate('click');
  });

  it('No debe dar click en el bot??n confirmar sin un cliente', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[productOrderInfor]}
            listProductMenu={[productInfo]}
            client={{
                id: 0,
                nombre: '',
                identificacion: '',
                telefono: '',
                activo: '',
                email: '',
              }}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={{ message: '', type: '' }}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );

    const form = wrapper.find('#btn-confirm-order').first();
    form.simulate('click');
  });

  it('Debe vaciar el carrito', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[productOrderInfor]}
            listProductMenu={[productInfo]}
            client={{
                id: 0,
                nombre: '',
                identificacion: '',
                telefono: '',
                activo: '',
                email: '',
              }}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={{ message: '', type: '' }}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );

    const form = wrapper.find('#btn-vaciar').first();
    form.simulate('click');
  });

  it('Debe adicionar producto el carrito', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[productOrderInfor]}
            listProductMenu={[productInfo]}
            client={{
                id: 0,
                nombre: '',
                identificacion: '',
                telefono: '',
                activo: '',
                email: '',
              }}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={{ message: '', type: '' }}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );

    const form = wrapper.find('#btn-add').first();
    form.simulate('click');
  });

  it('Debe disminuir producto el carrito', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart
            listProducts={[productOrderInfor]}
            listProductMenu={[productInfo]}
            client={{
                id: 0,
                nombre: '',
                identificacion: '',
                telefono: '',
                activo: '',
                email: '',
              }}
            modo={'registry'}
            myOrder={null}
            isLoading={false}
            errorMessage={{ message: '', type: '' }}
            setClientAsync={() => null}
            addCountProduct={() => null}
            subtCountProduct={() => null}
            setProducts={() => null}
            setOrderAsync={() => null}
            deleteCountProduct={() => null}
            deleteClient={() => null}
            setModoReg={() => null}
            setConfigOrderAsync={() => null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );

    const form = wrapper.find('#btn-subt').first();
    form.simulate('click');
  });
});
