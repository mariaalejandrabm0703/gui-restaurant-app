import { IClient } from '../../../feature/Cart/models/Cart';
import { IProductOrder } from '../../../feature/Home/models/Home';

export interface IStateCart {
  listProductsCart: IProductOrder[];
  count: number;
  client: IClient;
  modo: string;
}
