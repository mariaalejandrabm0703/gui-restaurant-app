import '@testing-library/jest-dom';
import {
  IFilters,
  IProduct,
  IProductOrder,
  IProductOrderRegistred,
  IRanking,
} from '../../../../Home/models/Home';
import { IMyClient, IMyOrder } from '../../../../MyOrder/models/MyOrder';
import {
  clientInfo,
  filtersInfo,
  myClientInfo,
  myOrderInfo,
  productInfo,
  productOrderInfor,
  productOrderRegistredInfo,
  rankingInfo,
} from '../../../../../shared/utils/data';
import { mount, shallow } from 'enzyme';
import { render, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {Home as HomeC} from '../index';
import { IClient } from '../../../../Cart/models/Cart';
import { IErrorToast } from '../../../../../core/redux/modelo/IStateMain';
import { IStateCart } from '../../../../../core/redux/modelo/IStateCart';
import { IStateHome } from '../../../../../core/redux/modelo/IStateHome';
import { IStateMain } from '../../../../../core/redux/modelo/IStateMain';
import { IStateOrder } from '../../../../../core/redux/modelo/IStateOrder';
import { IStateProducts } from '../../../../../core/redux/modelo/IStateProducts';
import { IStateRanking } from '../../../../../core/redux/modelo/IStateRanking';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
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

describe('Pruebas de container Home', () => {
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
          <HomeC
            listProducts={[]}
            listRanking={[]}
            listProductsFilter={[]}
            isLoading={true}
            errorMessage={ { message: '', type: '' }}
            getAllProducts={()=> null}
            getProductsRanking={()=> null}
            setProductFilters={()=> null}
          />
        </BrowserRouter>
        ,
      </Provider>
    );
  });

  it('Compara snapshot del HomeC renderizado', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renderiza el componente HomeC y verifica que exista componente titulo', () => {
    const { getByTestId } = render(
      <Provider store={store}>
      <BrowserRouter>
        <HomeC
          listProducts={[]}
          listRanking={[]}
          listProductsFilter={[]}
          isLoading={true}
          errorMessage={ { message: '', type: '' }}
          getAllProducts={()=> null}
          getProductsRanking={()=> null}
          setProductFilters={()=> null}
        />
      </BrowserRouter>
      ,
    </Provider>
    );
    expect(getByTestId('div-home')).toContainElement(getByTestId('title-home'));
  });

  it('renderiza el componente HomeC y verifica que exista componente de ranking', () => {
    const { getByTestId } = render(
      <Provider store={store}>
      <BrowserRouter>
        <HomeC
          listProducts={[productInfo]}
          listRanking={[]}
          listProductsFilter={[]}
          isLoading={true}
          errorMessage={ { message: '', type: '' }}
          getAllProducts={()=> null}
          getProductsRanking={()=> null}
          setProductFilters={()=> null}
        />
      </BrowserRouter>
      ,
    </Provider>
    );
    expect(getByTestId('div-home')).toContainElement(getByTestId('div-ranking'));
  });

  it('Debe dar click en el botón buscar producto', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
        <HomeC
          listProducts={[productInfo]}
          listRanking={listRanking}
          listProductsFilter={[productInfo]}
          isLoading={true}
          errorMessage={ { message: '', type: '' }}
          getAllProducts={()=> null}
          getProductsRanking={()=> null}
          setProductFilters={()=> null}
        />
        </BrowserRouter>
        ,
      </Provider>
    );

    const desc = wrapper.find('#description').first();
    const cate = wrapper.find('#category').first();
    const prec = wrapper.find('#price').first();


    await wait(() => {
      desc.simulate('change', {
        target: {
          name: 'description',
          value: 'Sopa',
        },
      });
    });

    await wait(() => {
      cate.simulate('change', {
        target: {
          name: 'category',
          value: 'Sopas',
        },
      });
    });

    await wait(() => {
      prec.simulate('change', {
        target: {
          name: 'price',
          value: 400,
        },
      });
    });

    const form = wrapper.find('#form-searh-prod').first();
    form.simulate('submit');
  });
});
