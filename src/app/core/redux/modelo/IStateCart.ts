import { IProduct } from '../../../feature/Home/models/Home';

export interface IStateCart {
  listProductsCart: IProduct[];
  count: number;
}
