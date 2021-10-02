import { IClient } from 'app/feature/Cart/models/Cart';
import axios from 'axios';

import { baseUrl } from '../config/AxiosConfig';

export const CartRepository = {
  /**
   * Obtiene la información del pedido según el id
   * @returns información del pedido
   */
  findProductsByOrder: (id: number) => axios.get(`${baseUrl}/pedidos/` + id),
  /**
   * Obtiene la información del cliente según la identificacion
   * @returns información del cliente
   */
  findClient: (id: string) => axios.get(`${baseUrl}/clientes/${id}`),
  /**
   * Registrar el cliente
   * @returns id del cliente
   */
  registryClient: (client: IClient) =>
    axios.post(`${baseUrl}/clientes`, client),
};
