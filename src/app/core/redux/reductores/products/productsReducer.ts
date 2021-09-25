import {
  IActionTypesProducts,
  SET_PRODUCTS,
} from '../../actions/products/ActionTypesProducts';
import { IProduct } from 'app/feature/Home/models/Home';
import { IStateProducts } from '../../modelo/IStateProducts';

const initialState: IStateProducts = {
  listProducts: Array<IProduct>(),
};

export default function (
  state = initialState,
  action: IActionTypesProducts
): IStateProducts {
  switch (action.type) {
    case SET_PRODUCTS: {
      const prods = action.payload;
      return {
        ...state,
        listProducts: prods,
      };
    }
    default:
      return state;
  }
}
