import axios from 'axios';

import { baseUrl } from '../config/AxiosConfig';

export const RankingRepository = {
  /**
   * Obtiene los productos mas vendidos
   * @returns arreglo de productos
   */
  getProductsRanking: () => axios.get(`${baseUrl}/productos/masvendidos`),
};
