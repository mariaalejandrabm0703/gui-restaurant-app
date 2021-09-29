import {defaultState, setProducts} from '../../actions/products/ActionsProducts';
import { IProduct } from '../../../../feature/Home/models/Home';
import {IStateProducts} from '../../modelo/IStateProducts';
import { productInfo } from '../../../../shared/utils/data';
import productsReducer from './productsReducer';

describe('Reductor de productos', () => {
    const prods: Array<IProduct> = [productInfo];

    it('debería retornar el estado por defecto', () => {
        const initialState: IStateProducts = {
            listProducts: Array<IProduct>(),
        };
    
        const newState = productsReducer(initialState, defaultState(prods));
        expect(newState).toStrictEqual(initialState);
      });
      
      it('debería retornar establecer todos los productos', () => {
        const initialState: IStateProducts = {
            listProducts: Array<IProduct>(),
        };
    
        const expectedState: IStateProducts = {
            listProducts: prods
          };
    
        const newState = productsReducer(initialState, setProducts(prods));
        expect(newState).toStrictEqual(expectedState);
      });
});