import { IStateCart } from './IStateCart';
import { IStateHome } from './IStateHome';
import { IStateMain } from './IStateMain';
import { IStateOrder } from './IStateOrder';
import { IStateProducts } from './IStateProducts';
import { IStateRanking } from './IStateRanking';

export interface Istate {
  products: IStateProducts;
  ranking: IStateRanking;
  cart: IStateCart;
  main: IStateMain;
  order: IStateOrder;
  home: IStateHome;
}
