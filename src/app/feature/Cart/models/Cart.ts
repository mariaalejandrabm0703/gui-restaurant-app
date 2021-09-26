export interface IClient {
    /**
     * Identificador del cliente
     */
    id?: number;
    /**
     * Nombre del cliente
     */
    nombre: string;
    /**
     * Identificacion del cliente
     */
    identificacion: string;
    /**
     * Telefono del cliente
     */
    telefono: string;
    /**
     * Estado del producto
     */
    activo?: string;
    /**
     * Email del cliente
     */
    email: string;
  }