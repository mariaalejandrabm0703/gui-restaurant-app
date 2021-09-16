import { Producto } from 'app/feature/Producto/models/Producto';

export interface EstadoProducto {
  productos: Producto[];
  cantidadTotalProducto: number;
}
