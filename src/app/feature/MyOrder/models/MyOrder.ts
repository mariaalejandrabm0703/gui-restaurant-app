import { IProductOrder } from 'app/feature/Home/models/Home';

export interface IMyOrder {
  /**
   * Identificador del pedido
   */
  id: number;
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
  pedidosProductos: IProductOrder[];
  /**
   * cliente del pedido
   */
  cliente: {
    id: number,
    nombre: string,
    identificacion: string,
    telefono: string,
    email: string,
    activo: string
  };
}
