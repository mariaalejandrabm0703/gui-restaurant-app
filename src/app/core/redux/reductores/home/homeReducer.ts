import {
  IActionTypesHome,
  SET_FILTERS,
  SET_PRODUCTS,
} from '../../actions/home/ActionTypesHome';
import { IProduct } from 'app/feature/Home/models/Home';
import { IStateHome } from '../../modelo/IStateHome';

const initialState: IStateHome = {
  listProductsHome: Array<IProduct>(),
  filters: {
    description: '',
    price: 0,
    category: '',
  },
};

export default function (
  state = initialState,
  action: IActionTypesHome
): IStateHome {
  switch (action.type) {
    case SET_FILTERS: {
      const filters = action.payload;
      return {
        ...state,
        filters: filters,
      };
    }
    case SET_PRODUCTS: {
      const listProductsHome = action.payload;
      return {
        ...state,
        listProductsHome: listProductsHome,
      };
    }

    default:
      return state;
  }
}
