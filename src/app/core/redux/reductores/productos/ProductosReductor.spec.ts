import { EstadoProducto } from 'app/core/redux/modelo/EstadoProducto';
import { Producto } from 'app/feature/Producto/models/Producto';
import { agregarNuevoProducto } from 'app/core/redux/acciones/productos/ProductosAcciones';
import reductorProductos from './productosReductor';

describe('Reductor productos', () => {
  it('debería agregar productos', () => {
    // Arrange
    const estadoInicial: EstadoProducto = {
      cantidadTotalProducto: 2,
      productos: [],
    };
    const nuevoProducto: Producto = {
      title: 'nuevo',
      slug: 'Juan Pablo Botero',
      body: 'posting the article accessing using constant',
      createdAt: '2020-03-03T03:20:27.795Z',
      updatedAt: '2020-03-03T03:20:27.795Z',
    };
    const estadoEsperado: EstadoProducto = {
      ...estadoInicial,
      productos: [nuevoProducto],
    };

    // Act
    const nuevoEstado = reductorProductos(
      estadoInicial,
      agregarNuevoProducto(nuevoProducto)
    );

    // Assert
    expect(nuevoEstado).toStrictEqual(estadoEsperado);
  });
});
