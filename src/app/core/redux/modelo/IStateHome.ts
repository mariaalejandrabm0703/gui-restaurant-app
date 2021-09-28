import { IFilters, IProduct } from '../../../feature/Home/models/Home';

export interface IStateHome {
    listProductsHome: IProduct[];
    filters: IFilters;
  }
  