export interface IProduct {
  /**
   * Identificador del producto
   */
  id: number;
  /**
   * Descripción del producto
   */
  descripcion: string;
  /**
   * Categoría del producto
   */
  categoria: string;
  /**
   * Precio del producto
   */
  precio: number;
  /**
   * Estado del producto
   */
  activo: string;
  /**
   * Imagen del producto
   */
  img: string;
}

export interface IProductOrderRegistred {
  /**
   * Identificador del producto
   */
  id: number;
 /**
   * Cantidad del producto
   */
  cantidad: number;
  /**
   * Precio del producto
   */
  precio: number;
  /**
   * Estado del producto
   */
  activo: string;
  /**
   * Producto del pedidoProducto
   */
  producto: IProduct;
}

export interface IProductOrder {
  /**
   * Identificador del producto
   */
   producto: number;
  /**
   * Precio del producto
   */
  precio: number;
  /**
   * Cantidad del producto
   */
  cantidad: number;
}
export interface IRanking {
  /**
   * Identificador del producto
   */
  id: number;
  /**
   * Descripción del producto
   */
  descripcion: string;
  /**
   * Categoría del producto
   */
  categoria: string;
  /**
   * Precio del producto
   */
  precio: number;
  /**
   * Estado del producto
   */
  activo: string;
  /**
   * Imagen del producto
   */
  img: string;
  /**
   * Cantidad vendida del producto
   */
  cantidad: number;
}
