export interface IProduct {
  /**
   * Identificador del producto
   */
  id: number;
  /**
   * Descripción del producto
   */
  description: string;
  /**
   * Categoría del producto
   */
  category: string;
  /**
   * Precio del producto
   */
  price: number;
  /**
   * Estado del producto
   */
  active: string;
  /**
   * Imagen del producto
   */
  img: string;
}
export interface IRanking {
  /**
   * Identificador del producto
   */
  id: number;
  /**
   * Descripción del producto
   */
  description: string;
  /**
   * Categoría del producto
   */
  category: string;
  /**
   * Precio del producto
   */
  price: number;
  /**
   * Estado del producto
   */
  active: string;
  /**
   * Imagen del producto
   */
  img: string;
  /**
   * Cantidad vendida del producto
   */
  quantity: number;
}
