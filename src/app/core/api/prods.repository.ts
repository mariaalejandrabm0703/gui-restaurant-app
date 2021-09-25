import axios from 'axios';

import { baseUrl } from '../config/AxiosConfig';

export const ProdsRepository = {
  /**
   * Obtiene los productos del restaurante
   * @returns arreglo de productos
   */
  getAllProducts: () => axios.get(`${baseUrl}/productos`),
};
