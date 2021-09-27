import { IMyOrder, IMyOrderReg } from 'app/feature/MyOrder/models/MyOrder';
import axios from 'axios';

import { baseUrl } from '../config/AxiosConfig';

export const OrderRepository = {
  /**
   * Obtiene la información del pedido según el id
   * @returns información del pedido
   */
  findOrderById: (id: number) => axios.get(`${baseUrl}/pedidos/` + id),
  /**
   * Registra la información del pedido
   * @returns información del pedido
   */
  registryOrder: (order: IMyOrderReg) => axios.post(`${baseUrl}/pedidos`, order),
};
