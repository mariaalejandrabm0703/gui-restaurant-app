import axios from 'axios';

import { baseUrl } from '../config/AxiosConfig';

export const OrderRepository = {
  /**
   * Obtiene la información del pedido según el id
   * @returns información del pedido
   */
  findOrderById: (id: number) => axios.get(`${baseUrl}/pedidos/`+id),
};
