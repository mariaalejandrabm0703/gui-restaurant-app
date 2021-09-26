import {
  ADD_COUNT_PRODUCTS,
  DELETE_CLIENT,
  DELETE_COUNT_PRODUCTS,
  IActionTypesCart,
  SET_CLIENT,
  SET_COUNT_PRODUCTS,
  SET_PRODUCTS,
  SUBT_COUNT_PRODUCTS,
} from '../../actions/cart/ActionTypesCart';
import { IProductOrder } from '../../../../feature/Home/models/Home';
import { IStateCart } from '../../modelo/IStateCart';

const initialState: IStateCart = {
  count: 0,
  listProductsCart: Array<IProductOrder>(),
  client: {
    id: 0,
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    activo: '',
  },
};

export default function (
  state = initialState,
  action: IActionTypesCart
): IStateCart {
  switch (action.type) {
    case SET_PRODUCTS: {
      const prods = action.payload;
      return {
        ...state,
        listProductsCart: prods,
      };
    }
    case ADD_COUNT_PRODUCTS: {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case SUBT_COUNT_PRODUCTS: {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    case DELETE_COUNT_PRODUCTS: {
      return {
        ...state,
        count: 0,
      };
    }
    case SET_COUNT_PRODUCTS: {
      const count = action.payload;
      return {
        ...state,
        count: count,
      };
    }
    case SET_CLIENT: {
      const client = action.payload;
      return {
        ...state,
        client: client,
      };
    }
    case DELETE_CLIENT: {
      return {
        ...state,
        client: {
          id: 0,
          nombre: '',
          identificacion: '',
          telefono: '',
          email: '',
          activo: '',
        },
      };
    }
    default:
      return state;
  }
}
