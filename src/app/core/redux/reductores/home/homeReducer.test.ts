import {
  defaultState,
  setFilters,
  setProducts,
} from '../../actions/home/ActionsHome';
import { IProduct } from '../../../../feature/Home/models/Home';
import { IStateHome } from '../../modelo/IStateHome';
import homeReducer from './homeReducer';
import { productInfo } from '../../../../shared/utils/data';

describe('Reductor de Home', () => {
  const listProductsHome: Array<IProduct> = [productInfo];
  const filters = {
    description: 'Sopa',
    price: 10,
    category: 'Sopas',
  };

  it('debería retornar el estado por defecto', () => {
    const initialState: IStateHome = {
      listProductsHome: Array<IProduct>(),
      filters: {
        description: '',
        price: 0,
        category: '',
      },
    };

    const newState = homeReducer(initialState, defaultState(1));
    expect(newState).toStrictEqual(initialState);
  });

  it('debería retornar el filtro modificado', () => {
    const initialState: IStateHome = {
      listProductsHome: Array<IProduct>(),
      filters: filters,
    };

    const newState = homeReducer(initialState, setFilters(filters));
    expect(newState).toStrictEqual(initialState);
  });

  it('debería retornar el listado de productos modificado', () => {
    const initialState: IStateHome = {
      listProductsHome:listProductsHome,
      filters: {
        description: '',
        price: 0,
        category: '',
      },
    };

    const newState = homeReducer(initialState, setProducts(listProductsHome));
    expect(newState).toStrictEqual(initialState);
  });
});
