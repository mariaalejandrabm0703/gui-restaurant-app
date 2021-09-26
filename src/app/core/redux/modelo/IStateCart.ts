import { IProductOrder } from '../../../feature/Home/models/Home';

export interface IStateCart {
  listProductsCart: IProductOrder[];
  count: number;
}
