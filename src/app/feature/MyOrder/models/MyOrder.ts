import { IProductOrder } from 'app/feature/Home/models/Home';

export interface IMyClient {
  /**
   * Identificador del cliente
   */
  id: number;
  /**
   * Nombre del cliente
   */
  nombre: string;
  /**
   * Indetificación del cliente
   */
  identificacion: string;
  /**
   * Telefono del cliente
   */
  telefono: string;
  /**
   * Email del cliente
   */
  email: string;
  /**
   * Estado del cliente
   */
  activo: string;
}
export interface IMyOrder {
  /**
   * Identificador del pedido
   */
  id: number | 0 ;
  /**
   * Descripción del pedido
   */
  fechaEntrega: string;
  /**
   * Precio del pedido
   */
  precio: number;
  /**
   * Estado del pedido
   */
  activo: string;
  /**
   * Productos
   */
  productosPedidos: IProductOrder[];
  /**
   * cliente del pedido
   */
  cliente: IMyClient;
}

export interface IMyOrderReg {
  /**
   * Descripción del pedido
   */
  fechaEntrega: string;
  /**
   * Precio del pedido
   */
  precio: number;
  /**
   * Estado del pedido
   */
  activo: string;
  /**
   * Productos
   */
  productos: IProductOrder[];
  /**
   * cliente del pedido
   */
  cliente: number;
}